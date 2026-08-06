import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { UnauthorizedError } from '../_error/unauthorized-error'
import { BadRequestError } from '../_error/bad-request-error'
import { env } from '@saas/env'

export async function authenticateWithGithub(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/github',
    {
      schema: {
        tags: ['auth'],
        summary: 'Autheticate with Github',
        body: z.object({
          code: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const gitHubOAuthURL = new URL(
        'https://github.com/login/oauth/access_token'
      )

      gitHubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
      gitHubOAuthURL.searchParams.set(
        'client_secret',
        env.GITHUB_OAUTH_CLIENT_SECRET
      )
      gitHubOAuthURL.searchParams.set(
        'redirect_uri',
        env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
      )
      gitHubOAuthURL.searchParams.set('code', code)

      const githubAccessTokenResponse = await fetch(gitHubOAuthURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })

      const githubAccessTokenData = await githubAccessTokenResponse.json()

      const { access_token } = z
        .object({
          access_token: z.string(),
          token_type: z.literal('bearer'),
          scope: z.string(),
        })
        .parse(githubAccessTokenData)

      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      const githubUserData = await githubUserResponse.json()

      const {
        avatar_url: avatarUrl,
        email,
        id: gitHubId,
        name,
      } = z
        .object({
          id: z.number().int().transform(String),
          avatar_url: z.url(),
          name: z.string().nullable(),
          email: z.email().nullable(),
        })
        .parse(githubUserData)

      if (email === null) {
        throw new BadRequestError(
          'Your GitHub account must have an email to authenticate.'
        )
      }

      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            avatarUrl,
          },
        })
      }

      let account = await prisma.account.findUnique({
        where: {
          provider_userId: {
            provider: 'GITHUB',
            userId: user.id,
          },
        },
      })

      if (!account) {
        account = await prisma.account.create({
          data: {
            provider: 'GITHUB',
            providerAccountId: gitHubId,
            userId: user.id,
          },
        })
      }
      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        }
      )
      return reply.status(201).send({ token })
    }
  )
}

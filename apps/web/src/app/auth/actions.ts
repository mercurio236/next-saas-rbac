'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGitHub() {
  const gitHubSignURL = new URL('login/oauth/authorize', 'https://github.com')

  gitHubSignURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  gitHubSignURL.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
  )
  gitHubSignURL.searchParams.set('scope', 'user')

  redirect(gitHubSignURL.toString())
}

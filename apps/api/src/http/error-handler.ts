import { FastifyInstance } from 'fastify'
import z, { ZodError } from 'zod'
import { BadRequestError } from './routes/_error/bad-request-error'
import { UnauthorizedError } from './routes/_error/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    const flattened = z.flattenError(error)
    reply.status(400).send({
      message: 'VAlidation error',
      errors: flattened.fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    reply.status(401).send({
      message: error.message,
    })
  }

  console.log(error)

  //send error to some observability platform

  reply.status(500).send({ message: 'Internal server error' })
}

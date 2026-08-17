'use server'

import { signInWithPassword } from '@/src/http/sign-in-with-password'
import { HTTPError } from 'ky'
import { z } from 'zod'

const signSchema = z.object({
  email: z.email('Please, provide a valid e-mail address.'),
  password: z.string().min(1, 'Please, provide your password'),
})

export async function singInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = signSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const flattenError = z.flattenError(result.error)
    const errors = flattenError.fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = err.data as { message: string }

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}

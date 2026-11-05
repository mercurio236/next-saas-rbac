'use server'

import { signUp } from '@/src/http/sign-up'
import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signupSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      error: 'Please, enter your full name.',
    }),
    email: z.email('Please, provide a valid e-mail address.'),
    password: z.string().min(6, 'Password should have at last 6 characters'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    error: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

type SignUpState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export async function signUpAction(
  _: unknown,
  data: FormData
): Promise<SignUpState> {
  const result = signupSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const flattenError = z.flattenError(result.error)
    const errors = flattenError.fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
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

  redirect('/auth/sign-in')
}

'use client'

import { Label } from '@saas/ui/components/label'
import { singInWithEmailAndPassword } from './actions'
import { Input } from '@saas/ui/components/input'
import Link from 'next/link'
import { Button } from '@saas/ui/components/button'
import { Separator } from '@saas/ui/components/separator'
import Image from 'next/image'

import githubIcon from '@/src/assets/github.svg'
import { useActionState, startTransition } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@saas/ui/components/alert'

export function SignForm() {
  const [{ success, message, errors }, formAction, isPending] = useActionState(
    singInWithEmailAndPassword,
    { success: false, message: null, errors: null }
  )

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    startTransition(() => formAction(data))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}

        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot yout password?
        </Link>
      </div>
      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with email'
        )}
      </Button>

      <Button className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />
      <Button className="w-full" variant="outline" type="submit">
        <Image
          src={githubIcon}
          className="mr-2 size-4 dark:invert"
          alt=""
          width={10}
          height={10}
        />
        Sign in with github
      </Button>
    </form>
  )
}

'use client'

import { Button } from '@saas/ui/components/button'
import { Input } from '@saas/ui/components/input'
import { Label } from '@saas/ui/components/label'
import { Separator } from '@saas/ui/components/separator'
import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/src/assets/github.svg'
import { Alert, AlertDescription, AlertTitle } from '@saas/ui/components/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { startTransition, useActionState } from 'react'
import { signInWithGitHub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const [{ success, message, errors }, formAction, isPending] = useActionState(
    signUpAction,
    { success: false, message: null, errors: null }
  )

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    startTransition(() => formAction(data))
    console.log(success)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="" className="space-y-4">
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
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" />
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>
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
        </div>
        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
          {errors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>
      <form action={signInWithGitHub}>
        <Separator />
        <Button className="w-full" variant="outline" type="submit">
          <Image
            src={githubIcon}
            className="mr-2 size-4 dark:invert"
            alt=""
            width={10}
            height={10}
          />
          Sign up with github
        </Button>
      </form>
    </div>
  )
}

'use client'

import { Label } from '@saas/ui/components/label'
import { singInWithEmailAndPassword } from './actions'
import { Input } from '@saas/ui/components/input'
import Link from 'next/link'
import { Button } from '@saas/ui/components/button'
import { Separator } from '@saas/ui/components/separator'
import Image from 'next/image'

import githubIcon from '@/src/assets/github.svg'
import { useActionState } from 'react'
import { Loader2 } from 'lucide-react'

export function SignForm() {
  const [state, formAction, isPending] = useActionState(
    singInWithEmailAndPassword,
    null
  )
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

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

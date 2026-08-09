import { Button } from '@saas/ui/components/button'
import { Input } from '@saas/ui/components/input'
import { Label } from '@saas/ui/components/label'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>
      <Button className="w-full" type="submit">
        Recover password
      </Button>

      <Button className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-in">Sign instead</Link>
      </Button>
    </form>
  )
}

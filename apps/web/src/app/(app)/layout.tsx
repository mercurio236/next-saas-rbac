import { ability, auth, getCurrentOrg, isAuthenticated } from '@/src/auth/auth'
import { getOrganizations } from '@/src/http/get-organizations'
import { Headers } from '@saas/ui/components/header'
import { redirect } from 'next/navigation'

interface Props {
  children: React.ReactNode
  sheet: React.ReactNode
}

export default async function AppLayout({ children, sheet }: Props) {
  if (await !isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}

import { isAuthenticated } from '@/src/auth/auth'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: React.PropsWithChildren) {
  if (await !isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}

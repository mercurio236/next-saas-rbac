import { ability, auth, getCurrentOrg, isAuthenticated } from '@/src/auth/auth'
import { getOrganizations } from '@/src/http/get-organizations'
import { Headers } from '@saas/ui/components/header'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: React.PropsWithChildren) {
  if (await !isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  const { user } = await auth()
  const { organizations } = await getOrganizations()
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  return (
    <div className="space-y-4 py-4">
      <Headers
        user={user ?? null}
        currentOrg={currentOrg}
        organization={organizations ?? []}
        permissions={permissions}
      />
      <main className="mx-auto w-full max-w-300">{children}</main>
    </div>
  )
}

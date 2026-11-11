import { ability, auth, getCurrentOrg } from '@/src/auth/auth'
import { getOrganizations } from '@/src/http/get-organizations'
import { Headers } from '@saas/ui/components/header'

export default async function Home() {
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
      <main className="mx-auto w-full max-w-300 space-y-4">
        <p className="text-muted-foreground text-sm">Select an organization</p>
      </main>
    </div>
  )
}

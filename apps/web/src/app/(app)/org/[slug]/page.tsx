import { auth, getCurrentOrg } from '@/src/auth/auth'
import { getOrganizations } from '@/src/http/get-organizations'
import { Headers } from '@saas/ui/components/header'

export default async function Projects() {
  const { user } = await auth()
  const { organizations } = await getOrganizations()
  const currentOrg = await getCurrentOrg()

  return (
    <div>
      <Headers
        user={user ?? null}
        currentOrg={currentOrg}
        organization={organizations ?? []}
      />
      <main></main>
    </div>
  )
}

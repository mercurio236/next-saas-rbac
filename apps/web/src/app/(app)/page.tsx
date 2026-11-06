import { auth } from '@/src/auth/auth'
import { getOrganizations } from '@/src/http/get-organizations'
import { Headers } from '@saas/ui/components/header'

export default async function Home() {
  const { user } = await auth()
  const { organizations } = await getOrganizations()
  return (
    <div>
      <Headers user={user ?? null} organization={organizations ?? []} />
      <main></main>
    </div>
  )
}

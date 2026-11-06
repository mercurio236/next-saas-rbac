import { auth } from '@/src/auth/auth'
import { Headers } from '@saas/ui/components/header'

export default async function Home() {
  const { user } = await auth()
  return (
    <div>
      <Headers
        email={user.email}
        imgAvatar={user.avatarUrl}
        name={user.name ?? ''}
      />
      <main></main>
    </div>
  )
}

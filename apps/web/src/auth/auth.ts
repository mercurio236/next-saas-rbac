import { cookies } from 'next/headers'

export async function isAuthenticated() {
  const cookesStore = await cookies()
  return !!cookesStore.get('token')?.value
}

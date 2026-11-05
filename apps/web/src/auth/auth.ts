import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getProfile } from '../http/get-profile'

export async function isAuthenticated() {
  const cookesStore = await cookies()
  return !!cookesStore.get('token')?.value
}

export async function auth() {
  const cookesStore = await cookies()
  const token = cookesStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }
  try {
    const { user } = await getProfile()
    console.log(user)
    return { user }
  } catch (err) {
    console.log(err)
  }

  redirect('/api/auth/sign-out')
}

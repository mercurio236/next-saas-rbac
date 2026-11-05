import ky from 'ky'
import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next'

export const api = ky.create({
  prefix: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        let cookiesStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          cookiesStore = serverCookies
        }

        const token = await getCookie('token', { cookies: cookiesStore })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})

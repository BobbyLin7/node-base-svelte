import { getRequestEvent } from '$app/server'
import { env } from '$env/dynamic/private'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { sveltekitCookies } from 'better-auth/svelte-kit'
import { db } from './db'

if (!env.BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET is not set')
}

if (!env.BETTER_AUTH_URL) {
  throw new Error('BETTER_AUTH_URL is not set')
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID || '',
      clientSecret: env.GITHUB_CLIENT_SECRET || '',
      enabled: !!env.GITHUB_CLIENT_ID && !!env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      enabled: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [sveltekitCookies(getRequestEvent)],
})

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { router } from '$lib/server/orpc/router'
import type { RouterClient } from '@orpc/server'

declare global {
  // Global client for SSR optimization
  // eslint-disable-next-line vars-on-top
  var $client: RouterClient<typeof router> | undefined

  namespace App {
    // interface Error {}
    interface Locals {
      session?: {
        id: string
        userId: string
        expiresAt: Date
        token: string
        ipAddress?: string | null
        userAgent?: string | null
        createdAt: Date
        updatedAt: Date
      }
      user?: {
        id: string
        email: string
        emailVerified: boolean
        name: string
        image?: string | null
        createdAt: Date
        updatedAt: Date
      }
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {}

import type { Router } from '$lib/server/orpc/router'
import type { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'

// Client-side RPC link that makes HTTP requests
const link = new RPCLink({
  url: () => {
    if (typeof window === 'undefined') {
      throw new TypeError('RPCLink is not allowed on the server side.')
    }
    return `${window.location.origin}/rpc`
  },
})

/**
 * Unified oRPC client that works on both server and client.
 * - On the server (SSR): Uses the direct router client (no HTTP overhead)
 * - On the client: Uses RPCLink to make HTTP requests to /rpc endpoint
 */
export const client: RouterClient<Router> = globalThis.$client ?? createORPCClient(link)

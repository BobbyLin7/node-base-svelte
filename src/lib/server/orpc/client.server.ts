import { createRouterClient } from '@orpc/server'
import { router } from './router'

if (typeof window !== 'undefined') {
  throw new TypeError('This file should only be imported on the server')
}

// Create a server-side router client for SSR optimization
// This allows direct procedure calls without HTTP overhead during SSR
const serverClient = createRouterClient(router, {
  context: {}, // Provide initial context if needed
})

// Store in globalThis to share across requests without bundling into client code
globalThis.$client = serverClient

export { serverClient }

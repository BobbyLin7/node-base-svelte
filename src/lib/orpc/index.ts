// Export types
export type { Router } from '$lib/server/orpc/router'

// Export the unified client
export { client } from './client'

// Export TanStack Query utilities
export { orpc } from './query'

// Re-export commonly used TanStack Query functions
export { createInfiniteQuery, createMutation, createQuery } from '@tanstack/svelte-query'

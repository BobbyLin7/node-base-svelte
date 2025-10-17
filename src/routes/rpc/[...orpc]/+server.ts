import type { RequestEvent } from '@sveltejs/kit'
import { router } from '$lib/server/orpc/router'
import { RPCHandler } from '@orpc/server/fetch'

const handler = new RPCHandler(router)

async function handle({ request }: RequestEvent) {
  const { response } = await handler.handle(request, {
    prefix: '/rpc',
    context: {}, // Provide initial context if needed
  })

  return response ?? new Response('Not Found', { status: 404 })
}

export const GET = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle

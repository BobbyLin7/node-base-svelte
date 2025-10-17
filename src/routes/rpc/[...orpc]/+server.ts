import type { RequestEvent } from '@sveltejs/kit'
import { router } from '$lib/server/orpc/router'
import { RPCHandler } from '@orpc/server/fetch'

const handler = new RPCHandler(router)

async function handle(event: RequestEvent) {
  const { response } = await handler.handle(event.request, {
    prefix: '/rpc',
    context: {
      event,
      session: event.locals.session,
      user: event.locals.user,
    },
  })

  return response ?? new Response('Not Found', { status: 404 })
}

export const GET = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle

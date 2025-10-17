export async function load() {
  // Import server client to initialize globalThis.$client during SSR
  // This runs only on the server side
  if (typeof window === 'undefined') {
    await import('$lib/server/orpc/client.server')
  }

  return {}
}

import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  // If user is not logged in, redirect to login
  if (!locals.user) {
    throw redirect(303, '/login')
  }

  return {
    user: locals.user,
  }
}

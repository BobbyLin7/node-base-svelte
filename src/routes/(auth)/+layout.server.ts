import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals }) => {
  // If user is already logged in, redirect to home
  if (locals.user) {
    throw redirect(303, '/')
  }

  return {}
}

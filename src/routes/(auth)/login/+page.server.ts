import type { Actions, PageServerLoad } from './$types'
import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'
import { loginSchema } from './schema'

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(loginSchema)),
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod4(loginSchema))

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    return {
      form,
    }
  },
}

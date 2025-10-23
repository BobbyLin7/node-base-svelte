<script lang='ts'>
  import type { PageData } from './$types'
  import SignupForm from '$lib/components/auth/signup-form.svelte'

  let { data }: { data: PageData } = $props()
</script>

<SignupForm data={data} />

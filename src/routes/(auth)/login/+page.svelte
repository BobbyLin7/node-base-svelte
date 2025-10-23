<script lang='ts'>
  import type { PageData } from './$types'
  import LoginForm from '$lib/components/auth/login-form.svelte'

  let { data }: { data: PageData } = $props()
</script>

<LoginForm data={data} />

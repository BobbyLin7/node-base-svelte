<script lang='ts'>
  import { goto } from '$app/navigation'
  import { authClient } from '$lib/auth-client'
  import { onMount } from 'svelte'

  const session = authClient.useSession()

  onMount(() => {
    // If user is already logged in, redirect to home
    if ($session.data) {
      goto('/')
    }
  })
</script>

<div class='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4'>
  <div class='w-full max-w-md'>
    <slot />
  </div>
</div>

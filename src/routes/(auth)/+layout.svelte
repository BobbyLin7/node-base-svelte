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

<div class='flex min-h-svh justify-center bg-muted p-6 md:p-10 gap-6'>
  <div class='flex flex-col gap-6 w-full max-w-sm'>
    <a href='/' class='flex justify-center items-center gap-2 font-medium'>
      <img src='/logo.svg' alt='Logo' width='30' height='30' />
      <span>NodeBase</span>
    </a>
    <slot />
  </div>
</div>

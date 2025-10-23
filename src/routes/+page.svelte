<script lang='ts'>
  import { goto } from '$app/navigation'
  import { authClient } from '$lib/auth-client'
  import Button from '$lib/components/ui/button/button.svelte'

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          goto('/login')
        },
      },
    })
  }
</script>

<Button type='button' onclick={handleLogout}>
  Log out
</Button>

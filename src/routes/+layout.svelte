<script lang='ts'>
  import { browser } from '$app/environment'
  import favicon from '$lib/assets/favicon.svg'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import '../app.css'

  let { children }: { children: any } = $props()

  // Create QueryClient in the component, not in load function
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1000, // 1 minute
      },
    },
  })
</script>

<svelte:head>
  <link rel='icon' href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
  {@render children?.()}
</QueryClientProvider>

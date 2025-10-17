<script lang='ts'>
  import { orpc } from '$lib/orpc/query'
  import { createInfiniteQuery } from '@tanstack/svelte-query'

  // Infinite query example - paginated user list
  const usersQuery = createInfiniteQuery(() =>
    orpc.listUsers.infiniteOptions({
      input: (pageParam: number | undefined) => ({
        limit: 10,
        offset: pageParam ?? 0,
      }),
      initialPageParam: 0,
      getNextPageParam: lastPage => lastPage.nextPageParam,
    }),
  )

  function loadMore() {
    if (usersQuery.hasNextPage && !usersQuery.isFetchingNextPage) {
      usersQuery.fetchNextPage()
    }
  }
</script>

<div class='container mx-auto p-8 max-w-4xl'>
  <h1 class='text-4xl font-bold mb-8'>Infinite Query Example</h1>

  <section class='mb-8 p-6 bg-white rounded-lg shadow'>
    <h2 class='text-2xl font-semibold mb-4'>Paginated User List</h2>

    {#if usersQuery.isPending}
      <p class='text-gray-500'>Loading users...</p>
    {:else if usersQuery.isError}
      <p class='text-red-500'>Error: {usersQuery.error.message}</p>
    {:else if usersQuery.data}
      <div class='space-y-4'>
        {#each usersQuery.data.pages as page}
          <div class='space-y-2'>
            {#each page.items as user}
              <div class='p-4 border border-gray-200 rounded-md hover:bg-gray-50'>
                <p class='font-semibold'>{user.name}</p>
                <p class='text-sm text-gray-600'>{user.email}</p>
                <p class='text-xs text-gray-400'>ID: {user.id}</p>
              </div>
            {/each}
          </div>
        {/each}

        <div class='mt-6 flex justify-center'>
          {#if usersQuery.hasNextPage}
            <button
              onclick={loadMore}
              disabled={usersQuery.isFetchingNextPage}
              class='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {usersQuery.isFetchingNextPage ? 'Loading more...' : 'Load More'}
            </button>
          {:else}
            <p class='text-gray-500'>No more users to load</p>
          {/if}
        </div>

        {#if usersQuery.isFetching && !usersQuery.isFetchingNextPage}
          <p class='text-center text-gray-500 mt-4'>Refreshing...</p>
        {/if}
      </div>
    {/if}
  </section>

  <section class='p-6 bg-gray-50 rounded-lg'>
    <h2 class='text-xl font-semibold mb-2'>Infinite Query Features</h2>
    <ul class='list-disc list-inside space-y-1 text-gray-700'>
      <li>Automatic pagination with type-safe page parameters</li>
      <li>Load more functionality with loading states</li>
      <li>Efficient data caching across pages</li>
      <li>Background refetching support</li>
      <li>Optimistic updates and error handling</li>
    </ul>
  </section>

  <div class='mt-6'>
    <a href='/' class='text-blue-600 hover:underline'>← Back to main demo</a>
  </div>
</div>

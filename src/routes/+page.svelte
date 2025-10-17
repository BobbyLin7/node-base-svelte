<script lang='ts'>
  import { orpc } from '$lib/orpc/query'
  import { createMutation, createQuery } from '@tanstack/svelte-query'

  // Example query - fetch hello message
  const helloQuery = createQuery(() =>
    orpc.hello.queryOptions({
      input: { name: 'SvelteKit' },
    }),
  )

  // Example query - fetch user
  let userId = $state(1)
  const userQuery = createQuery(() =>
    orpc.getUser.queryOptions({
      input: { id: userId },
    }),
  )

  // Example mutation - create user
  const createUserMutation = createMutation(() =>
    orpc.createUser.mutationOptions(),
  )

  let newUserName = $state('')
  let newUserEmail = $state('')

  function handleCreateUser() {
    if (newUserName && newUserEmail) {
      createUserMutation.mutate(
        { name: newUserName, email: newUserEmail },
        {
          onSuccess: () => {
            newUserName = ''
            newUserEmail = ''
          },
        },
      )
    }
  }
</script>

<div class='container mx-auto p-8 max-w-4xl'>
  <h1 class='text-4xl font-bold mb-8'>oRPC + TanStack Query Demo</h1>

  <!-- Hello Query Example -->
  <section class='mb-8 p-6 bg-white rounded-lg shadow'>
    <h2 class='text-2xl font-semibold mb-4'>Simple Query Example</h2>
    {#if helloQuery.isPending}
      <p class='text-gray-500'>Loading...</p>
    {:else if helloQuery.isError}
      <p class='text-red-500'>Error: {helloQuery.error.message}</p>
    {:else if helloQuery.data}
      <div class='space-y-2'>
        <p class='text-lg'>{helloQuery.data.message}</p>
        <p class='text-sm text-gray-500'>Timestamp: {helloQuery.data.timestamp}</p>
      </div>
    {/if}
  </section>

  <!-- Get User Query Example -->
  <section class='mb-8 p-6 bg-white rounded-lg shadow'>
    <h2 class='text-2xl font-semibold mb-4'>Reactive Query Example</h2>
    <div class='mb-4'>
      <label for='userId' class='block text-sm font-medium mb-2'>
        User ID:
        <input
          id='userId'
          type='number'
          bind:value={userId}
          class='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
          min='1'
        />
      </label>
    </div>
    {#if userQuery.isPending}
      <p class='text-gray-500'>Loading user...</p>
    {:else if userQuery.isError}
      <p class='text-red-500'>Error: {userQuery.error.message}</p>
    {:else if userQuery.data}
      <div class='space-y-2'>
        <p><strong>ID:</strong> {userQuery.data.id}</p>
        <p><strong>Name:</strong> {userQuery.data.name}</p>
        <p><strong>Email:</strong> {userQuery.data.email}</p>
        <p class='text-sm text-gray-500'>Created: {userQuery.data.createdAt}</p>
      </div>
    {/if}
  </section>

  <!-- Create User Mutation Example -->
  <section class='mb-8 p-6 bg-white rounded-lg shadow'>
    <h2 class='text-2xl font-semibold mb-4'>Mutation Example</h2>
    <form
      onsubmit={(e) => {
        e.preventDefault()
        handleCreateUser()
      }}
      class='space-y-4'
    >
      <div>
        <label for='name' class='block text-sm font-medium mb-2'>
          Name:
          <input
            id='name'
            type='text'
            bind:value={newUserName}
            class='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
        </label>
      </div>
      <div>
        <label for='email' class='block text-sm font-medium mb-2'>
          Email:
          <input
            id='email'
            type='email'
            bind:value={newUserEmail}
            class='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
        </label>
      </div>
      <button
        type='submit'
        disabled={createUserMutation.isPending}
        class='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
      >
        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>

    {#if createUserMutation.isSuccess && createUserMutation.data}
      <div class='mt-4 p-4 bg-green-50 border border-green-200 rounded-md'>
        <p class='text-green-800 font-semibold'>User created successfully!</p>
        <div class='mt-2 space-y-1 text-sm'>
          <p><strong>ID:</strong> {createUserMutation.data.id}</p>
          <p><strong>Name:</strong> {createUserMutation.data.name}</p>
          <p><strong>Email:</strong> {createUserMutation.data.email}</p>
        </div>
      </div>
    {/if}

    {#if createUserMutation.isError}
      <div class='mt-4 p-4 bg-red-50 border border-red-200 rounded-md'>
        <p class='text-red-800'>Error: {createUserMutation.error.message}</p>
      </div>
    {/if}
  </section>

  <section class='p-6 bg-gray-50 rounded-lg'>
    <h2 class='text-xl font-semibold mb-2'>Integration Complete! 🎉</h2>
    <p class='text-gray-700'>
      This page demonstrates oRPC with TanStack Query in SvelteKit, including:
    </p>
    <ul class='list-disc list-inside mt-2 space-y-1 text-gray-700'>
      <li>Type-safe API calls with automatic TypeScript inference</li>
      <li>Reactive queries that update when inputs change</li>
      <li>Mutations with loading and error states</li>
      <li>SSR optimization using direct router calls on the server</li>
      <li>Client-side HTTP requests with automatic caching</li>
    </ul>
    <div class='mt-4'>
      <a href='/users' class='text-blue-600 hover:underline font-medium'>
        → View Infinite Query Example
      </a>
    </div>
  </section>
</div>

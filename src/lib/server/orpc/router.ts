import { os } from '@orpc/server'
import { z } from 'zod'

// Example router with some basic procedures
export const router = os
  .router({
    // Simple query procedure
    hello: os
      .input(z.object({ name: z.string().optional() }))
      .handler(async ({ input }) => {
        return {
          message: `Hello, ${input.name || 'World'}!`,
          timestamp: new Date().toISOString(),
        }
      }),

    // Get user by ID
    getUser: os
      .input(z.object({ id: z.number() }))
      .handler(async ({ input }) => {
        // Simulate database query
        return {
          id: input.id,
          name: `User ${input.id}`,
          email: `user${input.id}@example.com`,
          createdAt: new Date().toISOString(),
        }
      }),

    // List users with pagination
    listUsers: os
      .input(
        z.object({
          limit: z.number().min(1).max(100).default(10),
          offset: z.number().min(0).default(0),
        }),
      )
      .handler(async ({ input }) => {
        // Simulate database query with pagination
        const users = Array.from({ length: input.limit }, (_, i) => ({
          id: input.offset + i + 1,
          name: `User ${input.offset + i + 1}`,
          email: `user${input.offset + i + 1}@example.com`,
        }))

        return {
          items: users,
          total: 100,
          limit: input.limit,
          offset: input.offset,
          nextPageParam: input.offset + input.limit < 100 ? input.offset + input.limit : undefined,
        }
      }),

    // Mutation example - create user
    createUser: os
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
        }),
      )
      .handler(async ({ input }) => {
        // Simulate database insert
        return {
          id: Math.floor(Math.random() * 1000),
          name: input.name,
          email: input.email,
          createdAt: new Date().toISOString(),
        }
      }),

    // Mutation example - update user
    updateUser: os
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1).optional(),
          email: z.string().email().optional(),
        }),
      )
      .handler(async ({ input }) => {
        // Simulate database update
        return {
          id: input.id,
          name: input.name || `User ${input.id}`,
          email: input.email || `user${input.id}@example.com`,
          updatedAt: new Date().toISOString(),
        }
      }),
  })

export type Router = typeof router

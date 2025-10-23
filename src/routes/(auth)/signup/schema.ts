import { z } from 'zod'

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type SignupSchema = typeof signupSchema

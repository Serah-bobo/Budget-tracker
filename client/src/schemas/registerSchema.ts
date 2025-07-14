import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' }),

    email: z
      .string()
      .email({ message: 'Invalid email address' }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Include at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Include at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Include at least one number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Include at least one special character' }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(60),
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, 'Password is required'),
});

export const mindspaceSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  description: z.string().trim().max(300).optional(),
  emoji: z.string().max(8).optional(),
});

export const addItemSchema = z.object({
  url: z.string().trim().url('Enter a valid link'),
  note: z.string().trim().max(500).optional(),
});

export const updateItemSchema = z.object({
  note: z.string().trim().max(500).optional(),
  title: z.string().trim().max(200).optional(),
});

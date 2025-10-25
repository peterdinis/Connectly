import { z } from 'zod';

export const createPageSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'slug must be URL-safe'),
  description: z.string().optional(),
  theme: z.string().default('default'),
  isPublished: z.boolean().optional(),
});

export const updatePageSchema = z.object({
  title: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be URL-safe').optional(),
  description: z.string().optional(),
  theme: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
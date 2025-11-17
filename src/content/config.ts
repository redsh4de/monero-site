import { defineCollection, z } from 'astro:content';

const moneropedia = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    terms: z.array(z.string()),
    summary: z.string(),
    locale: z.string().optional(),
  }),
});

export const collections = {
  moneropedia,
};
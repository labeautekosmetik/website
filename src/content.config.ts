import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const magazin = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/magazin' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    treatment: z.enum(['klassische-gesichtsbehandlungen', 'aquafacial-microneedling', 'green-peel', 'wimpern-augenbrauen']),
    excerpt: z.string(),
    // Statements Florentine still has to confirm. Never rendered.
    pruefen: z.array(z.string()).default([]),
  }),
});

export const collections = { magazin };

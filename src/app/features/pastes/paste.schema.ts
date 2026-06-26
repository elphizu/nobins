import { z } from 'zod';

export const createPasteSchema = z.object({
  ciphertext: z.string().min(1),
  nonce: z.string().min(1),
  algorithm: z.enum(['AES-256-GCM']),
  expiresInSeconds: z
    .number()
    .int()
    .min(60)
    .max(60 * 60 * 24 * 30),
  burnAfterRead: z.boolean().default(false),
});

export type CreatePasteInput = z.infer<typeof createPasteSchema>;

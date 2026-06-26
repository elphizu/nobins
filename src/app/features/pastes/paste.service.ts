import { type CreatePasteInput } from '@/app/features/pastes/paste.schema';
import { db } from '@/lib/db';
import { pastes } from '@/lib/db/schema';
import { generateId } from '@/lib/ids';

export const createPaste = async (data: CreatePasteInput) => {
  const id = generateId('pst');

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + data.expiresInSeconds * 1000);

  await db.insert(pastes).values({
    id,
    ciphertext: data.ciphertext,
    nonce: data.nonce,
    algorithm: data.algorithm,
    createdAt,
    expiresAt,
    burnAfterRead: data.burnAfterRead,
    sizeBytes: Buffer.byteLength(data.ciphertext),
  });

  return { id, createdAt: createdAt.toISOString(), expiresAt: expiresAt.toISOString() };
};

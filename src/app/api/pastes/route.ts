import { createPasteSchema } from '@/pastes/paste.schema';
import { createPaste } from '@/pastes/paste.service';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = createPasteSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = await createPaste(parsed.data);

  return Response.json(result, { status: 201 });
}

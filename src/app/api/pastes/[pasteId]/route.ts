import { deletePaste, getPaste } from '@/pastes/paste.service';

export async function GET(request: Request, { params }: { params: Promise<{ pasteId: string }> }) {
  const { pasteId } = await params;
  const burnKey = new URL(request.url).searchParams.get('burnKey');

  const paste = await getPaste(pasteId, burnKey);

  if (!paste) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(paste);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ pasteId: string }> },
) {
  const { pasteId } = await params;
  const token = new URL(request.url).searchParams.get('token');

  if (!token) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  const deleted = await deletePaste(pasteId, token);

  if (!deleted) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json({ ok: true });
}

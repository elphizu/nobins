import { deletePaste } from '@/pastes/paste.service';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ pasteId: string; burnToken: string }> },
) {
  const { pasteId, burnToken } = await params;
  const deleted = await deletePaste(pasteId, burnToken);

  if (!deleted) {
    return new Response('Paste not found or already deleted', { status: 404 });
  }

  return new Response('Paste deleted');
}

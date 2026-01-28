import { kv } from "@vercel/kv";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const content = await kv.get(params.id);

  if (!content) {
    return new Response("Paste not found", { status: 404 });
  }

  return Response.json({ content });
}
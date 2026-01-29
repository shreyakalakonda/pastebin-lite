import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { getNowMs } from "@/lib/now";

export async function GET(
   req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = await kv.get<{
    content: string;
    remainingViews: number;
    expiresAt: number;
    createdAt: number;
  }>(id);

  if (!data) {
    return NextResponse.json(
      { error: "Paste expired or not found" },
      { status: 404 }
    );
  }

  const now = getNowMs(req.headers);

  // ⏱ Time-based expiry
  if (now && data.expiresAt > data.expiresAt) {
    await kv.del(id);
    return NextResponse.json(
      { error: "Paste expired (time limit reached)" },
      { status: 404 }
    );
  }

  // 👀 View-based expiry
  if (data.remainingViews <= 0) {
    await kv.del(id);
    return NextResponse.json(
      { error: "Paste expired (view limit reached)" },
      { status: 410 }
    );
  }

  // decrement views
  const updatedViews = data.remainingViews - 1;

  await kv.set(id, {
    ...data,
    remainingViews: updatedViews,
  });

  return NextResponse.json({
    content: data.content,
    remainingViews: updatedViews,
    expiresAt: data.expiresAt,
  });
}

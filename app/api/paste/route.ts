import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import crypto from "crypto";

export async function POST(req: Request) {
  const { content, expiresIn, maxViews } = await req.json();

  if (!content || expiresIn <= 1 || maxViews < 1) {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  const id = crypto.randomBytes(4).toString("hex");

  const expiresAt = Date.now() + expiresIn * 1000;

  await kv.set(
    id,
    {
      content,
      remainingViews: maxViews,
      createdAt: Date.now(),
      expiresAt,
    },
    { ex: expiresIn } // TTL backup (not authority)
  );

  return NextResponse.json({ id });
}
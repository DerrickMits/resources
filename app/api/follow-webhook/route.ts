import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://hook.eu1.make.com/s3quoxyplnumfny27ybe5dk6n7nohs5e";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json(
      { ok: res.ok },
      { status: res.ok ? 200 : res.status }
    );
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
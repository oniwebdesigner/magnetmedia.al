import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken } from "@/app/lib/admin";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({}));

   console.log("ENV:", JSON.stringify(process.env.ADMIN_PASSWORD), "GOT:", JSON.stringify(password));

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Password i gabuar" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 ditë
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
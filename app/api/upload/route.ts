import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isAdmin } from "@/app/lib/admin";

const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "S'u dërgua asnjë file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Lejohen vetëm JPG, PNG, WEBP, GIF" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Foto max 4MB" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const media = await prisma.media.create({
    data: { mime: file.type, data: bytes },
  });

  return NextResponse.json({ url: `/api/img/${media.id}` }, { status: 201 });
}
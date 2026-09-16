import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isAdmin } from "@/app/lib/admin";

/* PATCH  /api/posts/:id → përditëso (vetëm admin)
   DELETE /api/posts/:id → fshi (vetëm admin) */

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      ...(body.title !== undefined && { title: body.title.trim() }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt.trim().slice(0, 300) }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.category !== undefined && { category: body.category.trim() }),
      ...(body.image !== undefined && { image: body.image.trim() }),
      ...(body.published !== undefined && { published: !!body.published }),
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.post.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
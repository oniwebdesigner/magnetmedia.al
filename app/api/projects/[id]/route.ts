import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isAdmin } from "@/app/lib/admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: {
      ...(body.client !== undefined && { client: body.client.trim() }),
      ...(body.type !== undefined && { type: body.type.trim() }),
      ...(body.category !== undefined && { category: body.category.trim() }),
      ...(body.image !== undefined && { image: body.image.trim() }),
      ...(body.year !== undefined && { year: body.year.trim() }),
      ...(body.intro !== undefined && { intro: body.intro.trim().slice(0, 300) }),
      ...(body.long !== undefined && { long: body.long }),
      ...(body.sherbime !== undefined && { sherbime: body.sherbime }),
      ...(body.gallery !== undefined && { gallery: body.gallery }),
      ...(body.published !== undefined && { published: !!body.published }),
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
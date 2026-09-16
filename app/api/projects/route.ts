import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isAdmin, slugify } from "@/app/lib/admin";


export async function GET(req: Request) {
  const all = new URL(req.url).searchParams.get("all") === "1";

  if (all && !(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: all ? {} : { published: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.client?.trim() || !body?.type?.trim() || !body?.category?.trim()) {
    return NextResponse.json(
      { error: "Klienti, lloji dhe kategoria janë të detyrueshme" },
      { status: 400 }
    );
  }

  const base = slugify(body.client);
  let slug = base;
  for (let n = 2; await prisma.project.findUnique({ where: { slug } }); n++) {
    slug = `${base}-${n}`;
  }

  const project = await prisma.project.create({
    data: {
      slug,
      client: body.client.trim(),
      type: body.type.trim(),
      category: body.category.trim(),
      image: (body.image || "/magnetmedia5.jpg").trim(),
      year: (body.year || "").trim() || String(new Date().getFullYear()),
      intro: (body.intro || "").trim().slice(0, 300),
      long: body.long || "",
      sherbime: body.sherbime || "",
      gallery: body.gallery || "",
      published: body.published ?? true,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
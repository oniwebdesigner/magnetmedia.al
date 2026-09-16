import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isAdmin, slugify } from "@/app/lib/admin";

/* GET /api/posts        → publikët (për këdo)
   GET /api/posts?all=1  → të gjithë (vetëm admin)
   POST /api/posts       → krijo (vetëm admin) */

export async function GET(req: Request) {
  const all = new URL(req.url).searchParams.get("all") === "1";

  if (all && !(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    where: all ? {} : { published: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Pa autorizim" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.title?.trim() || !body?.content?.trim()) {
    return NextResponse.json(
      { error: "Titulli dhe përmbajtja janë të detyrueshme" },
      { status: 400 }
    );
  }

  // Slug unik: nëse ekziston, shto numër
  const base = slugify(body.title);
  let slug = base;
  for (let n = 2; await prisma.post.findUnique({ where: { slug } }); n++) {
    slug = `${base}-${n}`;
  }

  const post = await prisma.post.create({
    data: {
      title: body.title.trim(),
      slug,
      excerpt: (body.excerpt || "").trim().slice(0, 300),
      content: body.content,
      category: (body.category || "Të përgjithshme").trim(),
      image: (body.image || "/magnetmedia5.jpg").trim(),
      published: body.published ?? true,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
import { prisma } from "@/app/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const media = await prisma.media.findUnique({ where: { id: Number(id) } });

  if (!media) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(Buffer.from(media.data), {
    headers: {
      "Content-Type": media.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
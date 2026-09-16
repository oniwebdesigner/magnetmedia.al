import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CtaBand from "@/app/components/CtaBand";
import { ArrowRight } from "@/app/components/icons";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("sq-AL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Artikulli s'u gjet | Magnet Media" };
  return {
    title: `${post.title} | Magnet Media`,
    description: post.excerpt || undefined,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function ArtikullPage({ params }: Params) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  return (
    <>
      <article>
        {/* Koka e artikullit */}
        <header className="border-b border-border bg-panel">
          <div className="mx-auto max-w-3xl px-5 py-14 lg:py-16">
            <div className="flex items-center gap-3 text-sm text-mute">
              <span className="rounded-full bg-gold-tint px-3 py-1 text-xs font-medium text-gold-deep">
                {post.category}
              </span>
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg leading-relaxed text-mute">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* Foto kryesore */}
        <div className="mx-auto max-w-4xl px-5 pt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Përmbajtja — paragrafët ndahen me rresht bosh */}
        <div className="mx-auto max-w-3xl px-5 py-12">
          <div className="space-y-5 text-[17px] leading-[1.8] text-ink/90">
            {post.content
              .split(/\n\s*\n/)
              .filter((p: string) => p.trim())
              .map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p.trim()}
                </p>
              ))}
          </div>

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-gold-deep transition-colors hover:text-ink"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Kthehu te blogu
          </Link>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
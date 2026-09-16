import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";
import CtaBand from "@/app/components/CtaBand";
import Reveal from "@/app/components/Reveal";
import { ArrowRight } from "@/app/components/icons";
import { prisma } from "@/app/lib/prisma";

export const metadata: Metadata = {
  title: "Blog | Magnet Media",
  description:
    "Artikuj, këshilla dhe të rejat më të fundit nga bota e marketingut.",
};

export const dynamic = "force-dynamic";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  image: string;
  category: string;
  createdAt: Date;
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("sq-AL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export default async function BlogPage() {
  const posts: BlogPost[] = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader
        eyebrow="Të rejat"
        title="Blog"
        description="Artikuj, këshilla dhe të rejat më të fundit nga bota e marketingut."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        {posts.length === 0 ? (
          <p className="text-mute">
            Artikujt e parë po vijnë së shpejti.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-panel shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-mute">
                      <span className="rounded-full bg-gold-tint px-3 py-1 font-medium text-gold-deep">
                        {p.category}
                      </span>

                      <span>{formatDate(p.createdAt)}</span>
                    </div>

                    <h2 className="mt-4 font-display text-lg font-semibold leading-snug">
                      {p.title}
                    </h2>

                    {p.excerpt && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                        {p.excerpt}
                      </p>
                    )}

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-deep">
                      Lexo artikullin
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CtaBand />
    </>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CtaBand from "@/app/components/CtaBand";
import Reveal from "@/app/components/Reveal";
import { ArrowRight } from "@/app/components/icons";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const p = await prisma.project.findUnique({ where: { slug: id } });
  if (!p) return { title: "Projekti s'u gjet | Magnet Media" };
  return {
    title: `${p.client} — ${p.type} | Magnet Media`,
    description: p.intro || undefined,
  };
}

export default async function ProjektPage({ params }: Params) {
  const { id } = await params;
  const p = await prisma.project.findUnique({ where: { slug: id } });
  if (!p || !p.published) notFound();

  const tjera = await prisma.project.findMany({
    where: { published: true, NOT: { id: p.id } },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const paragrafet = p.long.split(/\n\s*\n/).filter((x) => x.trim());
  const sherbimet = p.sherbime.split("\n").filter((x) => x.trim());
  const galeria = p.gallery.split("\n").filter((x) => x.trim());

  return (
    <>
      {/* Koka me foton e projektit */}
      <section className="relative overflow-hidden bg-espresso text-paper">
        <div className="absolute inset-0">
          <Image
            src={p.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/85 to-espresso/40"
            aria-hidden
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <Link
            href="/punet"
            className="inline-flex items-center gap-2 text-sm font-medium text-paper/60 transition-colors hover:text-gold-light"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Të gjitha projektet
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-medium text-espresso">
              {p.category}
            </span>
            <span className="text-paper/60">{p.year}</span>
          </div>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            {p.client}
          </h1>
          <p className="mt-2 text-lg text-gold-light">{p.type}</p>
          {p.intro && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">
              {p.intro}
            </p>
          )}
        </div>
      </section>

      {/* Historia + shërbimet */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-8 lg:py-20">
        <Reveal>
          <div className="space-y-5 text-[17px] leading-[1.8] text-ink/90">
            {paragrafet.map((par, i) => (
              <p key={i} className="whitespace-pre-line">
                {par.trim()}
              </p>
            ))}
          </div>
        </Reveal>

        {sherbimet.length > 0 && (
          <Reveal delay={120}>
            <aside className="h-fit rounded-2xl border border-border bg-panel p-7">
              <h2 className="font-display text-lg font-semibold">Çfarë realizuam</h2>
              <ul className="mt-4 space-y-3">
                {sherbimet.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      aria-hidden
                    />
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href="/kontakt"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-espresso transition-colors hover:bg-gold-light"
              >
                Do një projekt të tillë? <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </Reveal>
        )}
      </section>

      {/* Galeria */}
      {galeria.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-14 lg:px-8 lg:pb-20">
          <div className="grid gap-6 sm:grid-cols-2">
            {galeria.map((g, i) => (
              <Reveal key={g} delay={i * 90}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={g}
                    alt={`${p.client} — foto ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Projekte të tjera */}
      {tjera.length > 0 && (
        <section className="border-t border-border bg-panel">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
            <Reveal>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                Projekte të tjera
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {tjera.map((t, i) => (
                <Reveal key={t.id} delay={i * 90}>
                  <Link href={`/punet/${t.slug}`} className="group block">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={t.image}
                        alt={t.client}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 pt-3">
                      <div>
                        <h3 className="font-display text-base font-semibold">
                          {t.client}
                        </h3>
                        <p className="mt-0.5 text-sm text-mute">{t.type}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gold-deep transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
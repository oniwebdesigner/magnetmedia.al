"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/app/components/icons";

type ProjektKarte = {
  id: number;
  slug: string;
  client: string;
  type: string;
  category: string;
  image: string;
};

const kategorite = ["Të gjitha", "Branding", "Fushata", "Rrjete sociale", "Web"];

export default function PunetGrid({ projektet }: { projektet: ProjektKarte[] }) {
  const [active, setActive] = useState("Të gjitha");

  const filtered =
    active === "Të gjitha"
      ? projektet
      : projektet.filter((p) => p.category === active);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filtro projektet">
        {kategorite.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              active === c
                ? "border-ink bg-ink text-paper"
                : "border-border bg-panel text-mute hover:border-gold hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Link key={p.id} href={`/punet/${p.slug}`} className="group block">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={p.image}
                alt={`Projekti ${p.client}`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
            </div>
            <div className="flex items-center justify-between gap-4 pt-4">
              <div>
                <h2 className="font-display text-base font-semibold">{p.client}</h2>
                <p className="mt-0.5 text-sm text-mute">{p.type}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-gold-deep transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-mute">Nuk ka ende projekte në këtë kategori.</p>
      )}
    </section>
  );
}
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/app/components/icons";
import CtaBand from "@/app/components/CtaBand";
import Reveal from "@/app/components/Reveal";
import PunetGrid from "./punet/PunetGrid";
import { prisma } from "@/app/lib/prisma";

/* ================================================================
   MAGNET MEDIA — HOME (v3 premium)
   Hero me foto + overlay espresso; kartat e shërbimeve me foto sipër;
   kalime të buta (pa të zezë sterr, pa prerje të forta); Reveal on-scroll.
   ================================================================ */

const IMG = "/magnetmedia.jpeg";

/* ---------- TË DHËNAT ---------- */

const clients = [
  "abi bank",
  "KORRES",
  "daylux",
  "ITALSTONE",
  "Oliva Park",
  "VM Resort",
  "Global Pharma",
];

type Service = {
  nr: string;
  title: string;
  image: string;
  items: string[];
};

const services: Service[] = [
  {
    nr: "01",
    title: "Reklamim TV & Radio",
    image: "/sherbimet/tvradio.png",
    items: [
      "Strategji për fushata TV & Radio",
      "Konceptim dhe prodhim spoti TV & Radio",
      "⁠Media Planning",
      "⁠Media Buying"
    ],
  },
  {
    nr: "02",
    title: "Reklamim Outdoor",
    image: "/sherbimet/outdoor.png",
    items: [
      "Fushata billboard",
      "Citylight & Megaboard",
      "Ekrane LED",
      "Reklamim në transport",
    ],
  },
  {
    nr: "03",
    title: "Evente",
    image: "/sherbimet/evente.png",
    items: ["Koncept kreativ", "Planifikim & mbështetje eventesh", "Lançime"],
  },
  {
    nr: "04",
    title: "Prodhim Përmbajtjeje",
    image: "/sherbimet/video-production.png",
    items: ["Koncept & prodhim spoti", "Studio Podcast-i", "Foto & Video"],
  },
  {
    nr: "05",
    title: "Reklamim Digjital",
    image: "/sherbimet/reklamim.png",
    items: ["Meta Ads", "Google Ads", "Fushata në portale online"],
  },
  {
    nr: "06",
    title: "Branding & Identitet",
    image: "/sherbimet/branding.png",
    items: ["Dizajn logoje", "Brandbook", "Asete brandi & materiale"],
  },
  {
    nr: "07",
    title: "Marketing Digjital",
    image: "/sherbimet/marketing.png",
    items: ["Koncept & dizajn fushate", "Menaxhim rrjetesh sociale", "Reklamim në portale online"],
  },
  {
    nr: "08",
    title: "Influencer Marketing",
    image: "/sherbimet/influencer.png",
    items: ["Fushata me influencer", "Partneritete me marka"],
  },
];

const stats = [
  { value: "1500+", label: "Fushata dhe media plane të realizuara" },
  { value: "5000+", label: "Permbajtje të krijuara" },
  { value: "12+", label: "Vite eksperiencë" },
  { value: "8+", label: "Anëtarë ekipi" },
];

/* ---------- KOMPONENTËT NDIHMËS ---------- */

function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
        onDark ? "text-gold-light" : "text-gold-deep"
      }`}
    >
      <span className={`h-px w-8 ${onDark ? "bg-gold-light" : "bg-gold"}`} aria-hidden />
      {children}
    </p>
  );
}

/* ---------- SEKSIONET ---------- */

function Hero() {
  return (
    <section className="relative -mt-[76px] overflow-hidden bg-espresso pt-[76px] text-paper">
      <div className="absolute inset-0">
        <Image
          src={IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/85 to-espresso/30"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-espresso to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-20 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="max-w-2xl">
          <div className="hero-up">
            <Eyebrow onDark>Krijuese. Strategjike. Me impakt.</Eyebrow>
          </div>
          <h1
            className="hero-up font-display text-4xl font-bold uppercase leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Nga <span className="text-gold-light">koncepti</span>
            <br />
            tek <span className="text-gold-light">marketingu</span>
            <br />
            që krijon <span className="text-gold-light">impakt.</span>
          </h1>
          <p
            className="hero-up mt-6 max-w-md text-base leading-relaxed text-paper/70"
            style={{ animationDelay: "240ms" }}
          >
            Mbi 12 vite eksperiencë në media dhe marketing, të kthyer në strategji, ide dhe komunikim që i japin vlerë çdo marke.
          </p>
          <div
            className="hero-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              href="/sherbimet"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-espresso transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
            >
              Zbulo shërbimet <ArrowRight />
            </Link>
            <Link
              href="/punet"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:border-gold-light hover:text-gold-light"
            >
              Shiko punët
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 lg:mt-24">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
            {clients.map((c) => (
              <li
                key={c}
                className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-paper/45 transition-colors hover:text-paper"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Çfarë bëjmë</Eyebrow>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              MË SHUMË SE NJË <br />AGJENCI MARKETINGU
            </h2>
            <p className="mt-4 text-mute">
              Kombinojmë kreativitetin, eksperiencën në media dhe marketingun për të krijuar fushata të integruara, nga koncepti deri te realizimi.
            </p>
          </div>
          <Link
            href="/sherbimet"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-panel px-6 py-3 text-sm font-medium transition-colors hover:border-gold hover:text-gold-deep"
          >
            Të gjitha shërbimet <ArrowRight />
          </Link>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.nr} delay={(i % 4) * 90}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-panel shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10">
              <div className="relative">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="absolute -bottom-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-sm font-semibold text-espresso shadow-md">
                  {s.nr}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-9">
                <h3 className="font-display text-base font-semibold uppercase leading-snug tracking-wide">
                  {s.title}
                </h3>
                <ul className="mt-4 flex-1 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-mute">
                      <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sherbimet"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-deep"
                  aria-label={`Mëso më shumë: ${s.title}`}
                >
                  Mëso më shumë
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-espresso-soft to-espresso px-6 py-12 text-paper lg:px-12">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
            aria-hidden
          />
          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-bold text-gold-light lg:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-paper/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section className="border-y border-border bg-panel">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={IMG}
                alt="Ekipi i Magnet Media"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[2rem] border-2 border-gold/35"
              aria-hidden
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Eyebrow>Rreth nesh</Eyebrow>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Ne jemi Magnet Media.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-mute">
              Një ekip strategësh, dizajnerësh, marketuesish dhe
              storyteller-ësh me pasion për të krijuar impakt. Misioni ynë
              është i thjeshtë: të ndihmojmë brandet të lidhen, të komunikojnë
              dhe të rriten.
            </p>
            <Link
              href="/rreth-nesh"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-espresso px-7 py-3.5 text-sm font-medium text-paper transition-all hover:bg-espresso-soft hover:shadow-lg hover:shadow-ink/15"
            >
              Më shumë rreth nesh <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQJA ---------- */

export const dynamic = "force-dynamic";

export default async function Home() {
  const projektet = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      slug: true,
      client: true,
      type: true,
      category: true,
      image: true,
    },
  });

  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <PunetGrid projektet={projektet} />
      <About />
      <CtaBand />
    </>
  );
}
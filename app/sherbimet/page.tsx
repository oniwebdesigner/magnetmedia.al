import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";
import CtaBand from "@/app/components/CtaBand";
import Reveal from "@/app/components/Reveal";
import { ArrowRight } from "@/app/components/icons";

export const metadata: Metadata = {
  title: "Shërbimet | Magnet Media",
  description:
    "Reklamim TV & Radio, Outdoor, Evente, Prodhim Përmbajtjeje, Reklamim Digjital, Branding & Identitet, Marketing Digjital dhe Influencer Marketing.",
};

/* Të dhënat e plota nga katalogu i shërbimeve */

type Service = {
  nr: string;
  id: string;
  title: string;
  intro: string;
  image: string;
  items: string[];
};

const services: Service[] = [
  {
    nr: "01",
    id: "reklamim-tv-radio",
    title: "Reklamim TV & Radio",
    intro:
      "Fushata televizive dhe radiofonike të menduara për të arritur audiencën e duhur, në kanalin dhe momentin e duhur.",
    image: "/sherbimet/tvradio.png",
    items: [
      "Strategji fushate TV",
      "Koncept spoti TV",
      "Prodhim spoti TV",
      "Skenar spoti radio",
      "Prodhim spoti radio",
      "Planifikim & blerje mediash",
    ],
  },
  {
    nr: "02",
    id: "reklamim-outdoor",
    title: "Reklamim Outdoor",
    intro:
      "Prezencë e fortë në hapësirat publike — brandi yt i dukshëm kudo që lëviz audienca jote.",
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
    id: "evente",
    title: "Evente",
    intro:
      "Momente që mbahen mend — nga koncepti kreativ te ekzekutimi i përsosur.",
    image: "/sherbimet/evente.png",
    items: ["Koncept kreativ", "Planifikim & mbështetje eventesh", "Lançime"],
  },
  {
    nr: "04",
    id: "prodhim-permbajtjeje",
    title: "Prodhim Përmbajtjeje",
    intro:
      "Përmbajtje profesionale audio-vizuale që tregon historinë e brandit tënd me cilësi të lartë.",
    image: "/sherbimet/video-production.png",
    items: [
      "Koncept spoti TV",
      "Prodhim spoti TV",
      "Studio Podcast-i",
      "Foto & Video",
    ],
  },
  {
    nr: "05",
    id: "reklamim-digjital",
    title: "Reklamim Digjital",
    intro:
      "Fushata të matshme që sjellin trafik dhe konvertime — buxheti yt i shpenzuar me zgjuarsi.",
    image: "/sherbimet/reklamim.png",
    items: ["Meta Ads", "Google Ads", "Fushata në portale online"],
  },
  {
    nr: "06",
    id: "branding-identitet",
    title: "Branding & Identitet",
    intro:
      "Identitete unike që e bëjnë brandin tënd të paharrueshëm — nga logoja te çdo pikë kontakti.",
    image: "/sherbimet/branding.png",
    items: ["Dizajn logoje", "Brandbook", "Asete brandi & materiale"],
  },
  {
    nr: "07",
    id: "marketing-digjital",
    title: "Marketing Digjital",
    intro:
      "Prezencë e qëndrueshme online — përmbajtje dhe fushata që ndërtojnë komunitet rreth brandit.",
    image: "/sherbimet/marketing.png",
    items: ["Koncept & dizajn fushate", "Menaxhim rrjetesh sociale"],
  },
  {
    nr: "08",
    id: "influencer-marketing",
    title: "Influencer Marketing",
    intro:
      "Zëra autentikë që flasin për brandin tënd — partneritete me kreatorët e duhur.",
    image: "/sherbimet/influencer.png",
    items: ["Fushata me kreatorë", "Partneritete brandi"],
  },
];

export default function SherbimetPage() {
  return (
    <>
      <PageHeader
        eyebrow="Çfarë bëjmë"
        title="Shërbimet tona"
        description="Kombinojmë kreativitetin, eksperiencën në media dhe marketingun për të krijuar fushata të integruara, nga koncepti deri te realizimi."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 100}>
              <article
                id={s.id}
                className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border bg-panel shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
              >
                {/* Foto sipër me numrin gold */}
                <div className="relative">
                  <div className="relative aspect-[16/8] w-full overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent"
                      aria-hidden
                    />
                  </div>
                  <span className="absolute -bottom-5 left-7 flex h-11 w-11 items-center justify-center rounded-full bg-gold font-display text-sm font-semibold text-espresso shadow-md">
                    {s.nr}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7 pt-10">
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-mute">
                    {s.intro}
                  </p>

                  <ul className="mt-5 grid flex-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 border-t border-border pt-5">
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gold-deep transition-colors hover:text-ink"
                      aria-label={`Kërko ofertë: ${s.title}`}
                    >
                      Kërko ofertë
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
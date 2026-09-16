import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/app/components/PageHeader";
import CtaBand from "@/app/components/CtaBand";

export const metadata: Metadata = {
  title: "Rreth Nesh | Magnet Media",
  description:
    "Një ekip strategësh, dizajnerësh, marketuesish dhe storyteller-ësh me pasion për të krijuar impakt.",
};

const IMG = "/ina.jpeg";

const values = [
  {
    number: "01",
    title: "Analizë & Strategji",
    text: "Nisim me një analizë të plotë të nevojave, tregut dhe objektivave të markës suaj për të ndërtuar strategjinë e duhur.",
    icon: "search",
  },
  {
    number: "02",
    title: "Kreativitet & Planifikim",
    text: "Krijojmë konceptin, mesazhin dhe planin e detajuar të fushatës – duke kombinuar kreativitetin me të dhëna dhe përvojë të industrisë.",
    icon: "lightbulb",
  },
  {
    number: "03",
    title: "Zbatim & Menaxhim",
    text: "Kujdesemi për çdo detaj të realizimit – nga prodhimi i materialeve deri te menaxhimi i fushatës në të gjitha kanalet përkatëse.",
    icon: "settings",
  },
  {
    number: "04",
    title: "Matje & Zhvillim",
    text: "Analizojmë rezultatet, ofrojmë raportim të qartë dhe rekomandime për të maksimizuar impaktin dhe për të ndërtuar suksese afatgjata.",
    icon: "chart",
  },
];

const stats = [
  { value: "1500+", label: "Fushata dhe media plane të realizuara" },
  { value: "5000+", label: "Permbajtje të krijuara" },
  { value: "12+", label: "Vite eksperiencë" },
  { value: "8+", label: "Anëtarë ekipi" },
];

/* Ekipi — zëvendëso me emrat dhe fotot reale */
const team = [
  { name: "Emri Mbiemri", role: "Drejtor Kreativ" },
  { name: "Emri Mbiemri", role: "Strategji & Media" },
  { name: "Emri Mbiemri", role: "Prodhim Video" },
  { name: "Emri Mbiemri", role: "Marketing Digjital" },
];

export default function RrethNeshPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kush jemi ne "
        title="Ne jemi Magnet Media"
        description="Magnetizojmë brandet — i bëjmë të tërheqin vëmendjen, klientët dhe rezultatet."
      />

      {/* Historia */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Historia jonë
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-mute">
            <p>
              PAS MAGNET MEDIA-S KA NJË RRUGËTIM QË KA NISUR SHUMË MË HERËT.

Magnet Media lindi nga një kombinim i formimit akademik, eksperiencës shumëvjeçare në media dhe njohjes nga afër të nevojave reale të bizneseve.

Rrugëtimi im në marketing nisi në vitin 2015, pas formimit në Master Shkencor në Administrim Biznesi, profili Biznes Marketing. Eksperienca profesionale në Vizion Plus, Radio Klan dhe më pas për 8 vite në TV Klan më dha mundësinë të punoj çdo ditë me marketingun, komunikimin, fushatat mediatike dhe biznese nga industri të ndryshme.

Gjatë gjithë këtij rrugëtimi, trajnimet dhe zhvillimi profesional kanë qenë të vazhdueshme. Por një nga shkollat më të vlefshme ka qenë vetë puna me bizneset: të kuptosh tregje të ndryshme, konsumatorë të ndryshëm dhe faktin se nuk ekziston një formulë marketingu që funksionon njësoj për të gjithë.

Në vitin 2021 themelova Magnet Media, me synimin për ta kthyer këtë eksperiencë në një strukturë që e trajton marketingun në tërësinë e tij nga strategjia dhe zhvillimi i markës, te komunikimi, digital advertising, fushatat mediatike, televizioni, radio, billboard-et, portalet online dhe produksioni.

Sot, Magnet Media punon me biznese nga sektorë të ndryshëm, por filozofia ka mbetur e njëjtë:

Jo thjesht të komunikojmë një biznes.
Fillimisht ta kuptojmë atë.

Sepse marketingu nuk është vetëm kreativitet.
Është strategji, eksperiencë dhe vendimmarrje që duhet të sjellë rezultat.

Dhe pikërisht mbi këtë filozofi vazhdon të ndërtohet historia e Magnet Media.
            </p>
            <p>
              Sot jemi një ekip prej 12 profesionistësh — strategë, dizajnerë,
              producentë dhe marketues — që kanë realizuar mbi 150 projekte për
              më shumë se 80 klientë në industri të ndryshme.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl">
            <Image
              src={IMG}
              alt="Ekipi i Magnet Media"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl border-2 border-gold/40"
            aria-hidden
          />
        </div>
      </section>

      {/* Statistikat — kartë e rrumbullakosur */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border bg-panel px-6 py-12 lg:grid-cols-4 lg:px-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-gold-deep lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-mute">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vlerat */}
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Si punojmë
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <article
              key={v.title}
              className="rounded-2xl border border-border bg-panel p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"
            >
              <p className="font-display text-sm font-semibold text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold">
                {v.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Ekipi
      <section className="border-t border-border bg-panel">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Ekipi
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <article key={i} className="group">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src={IMG}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-display text-base font-semibold">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-mute">{m.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      <CtaBand />
    </>
  );
}

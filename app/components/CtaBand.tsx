import Link from "next/link";
import { LogoM, ArrowRight } from "@/app/components/icons";
import Reveal from "@/app/components/Reveal";

/* Kartë espresso me gradient dhe shkëlqim të lehtë gold —
   e rrumbullakosur brenda faqes së çelët, pa kalime të prera */

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-espresso-soft to-espresso px-8 py-14 text-paper lg:px-14 lg:py-16">
          {/* Shkëlqim i lehtë gold */}
          <div
            className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
            aria-hidden
          />
          <LogoM className="pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 text-gold/10" />

          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div>
              {/* <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                <span className="h-px w-8 bg-gold-light" aria-hidden />
                Le të ndërtojmë diçka të madhe
              </p> */}
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
               Le të ndërtojmë një plan <span className="text-gold-light"> marketingu</span>
              </h2>
              <p className="mt-4 max-w-md text-paper/70">
                Përcaktojmë objektivat, kanalet dhe mënyrën e komunikimit për të ndërtuar një strategji marketingu të qartë dhe të strukturuar.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-espresso transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
            >
              Na kontakto <ArrowRight />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

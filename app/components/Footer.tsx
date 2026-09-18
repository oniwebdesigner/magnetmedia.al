import Link from "next/link";
import { LogoM } from "@/app/components/icons";
import { navLinks, serviceLinks, contact } from "@/app/lib/nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-espresso-soft to-espresso text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brandi */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
  src="/magnetmedia.png"
  alt="Magnet Media"
  className="h-16 w-auto"
/>
</Link>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            Krijojmë eksperienca digjitale që sjellin rezultate dhe ndërtojnë
            lidhje të forta e afatgjata.
          </p>
          {/* Rrjetet sociale */}
          <div className="mt-6 flex gap-3">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper/60 transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper/60 transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Lidhje të shpejta */}
        <nav aria-label="Lidhje të shpejta">
          <h3 className="font-display text-sm font-semibold text-gold">
            Lidhje të shpejta
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-paper/60">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Shërbimet */}
        <nav aria-label="Shërbimet">
          <h3 className="font-display text-sm font-semibold text-gold">
            Shërbimet
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-paper/60">
            {serviceLinks.map((s) => (
              <li key={s}>
                <Link href="/sherbimet" className="transition-colors hover:text-paper">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontakt */}
        <div>
          <h3 className="font-display text-sm font-semibold text-gold">
            Kontakt
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-paper/60">
            <li>{contact.address}</li>
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-paper">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-paper">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Shiriti i fundit */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-paper/50 lg:px-8">
          <p>© {year} Magnet Media. Të gjitha të drejtat e rezervuara.</p>
          <p>
            Realizuar nga{" "}
            <a
              href="https://tiranaweb.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/90 transition-colors hover:text-gold-light"
            >
              Tirana Web
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

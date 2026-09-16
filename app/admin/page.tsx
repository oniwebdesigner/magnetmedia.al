"use client";

import Link from "next/link";
import AdminShell from "@/app/admin/AdminShell";
import { ArrowRight } from "@/app/components/icons";

export default function AdminHome() {
  return (
    <AdminShell
      active="dashboard"
      title="Përmbledhje"
      subtitle="Zgjidh çfarë do të publikosh ose menaxhosh sot."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Karta e blogut */}
        <Link
          href="/admin/blog"
          className="group rounded-2xl border border-border bg-panel p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-tint">
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-gold" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" />
            </svg>
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold">Blogu</h2>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            Shkruaj artikuj të rinj me foto, ruaji si draft ose publikoji
            direkt. Artikujt e publikuar dalin menjëherë te faqja /blog.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-deep">
            Hap panelin e blogut
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        {/* Karta e punëve */}
        <Link
          href="/admin/punet"
          className="group rounded-2xl border border-border bg-panel p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-tint">
            <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-gold" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </span>
          <h2 className="mt-5 font-display text-xl font-semibold">Punët</h2>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            Shto projekte të reja në portofol: foto kryesore, galeri, historia
            e projektit dhe shërbimet e realizuara. Dalin te faqja /punet.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-deep">
            Hap panelin e punëve
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>

      {/* Udhëzime të shkurtra */}
      <div className="mt-8 rounded-2xl border border-border bg-gold-tint/40 p-6">
        <h3 className="font-display text-sm font-semibold">Këshilla të shpejta</h3>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-mute">
          <li>• Fotot ngarkohen direkt nga pajisja — max 4MB secila (JPG, PNG, WEBP).</li>
          <li>• Paragrafët në tekste ndahen duke lënë një rresht bosh mes tyre.</li>
          <li>• "Kalo në draft" e fsheh nga faqja pa e fshirë — mund ta publikosh sërish kur të duash.</li>
          <li>• Fshirja është e përhershme dhe s&apos;kthehet mbrapsht.</li>
        </ul>
      </div>
    </AdminShell>
  );
}
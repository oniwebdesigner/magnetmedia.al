"use client";

import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import { serviceLinks, contact } from "@/app/lib/nav";

/* Forma dërgon me mailto (pa backend). Kur të shtohet backend-i,
   zëvendëso handleSubmit me një POST te /api/kontakt. */

const inputCls =
  "w-full rounded-xl border border-border bg-bg px-4 py-3.5 text-sm text-ink placeholder:text-mute/60 outline-none transition-colors focus:border-gold";

export default function KontaktPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = () => {
    const subject = encodeURIComponent(
      `Kërkesë nga faqja — ${form.name || "Pa emër"}`
    );
    const body = encodeURIComponent(
      `Emri: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\nShërbimi: ${form.service}\n\nMesazhi:\n${form.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <>
      <PageHeader
        eyebrow="LE TE BISEDOJME"
        title="Na kontakto"
        description="Na trego për markën, objektivin apo projektin tënd. Ne ndërtojmë strategjinë dhe zgjidhjen e duhur për të krijuar rezultat."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-14 lg:px-8 lg:py-16">
        {/* Informacioni i kontaktit */}
        <div className="space-y-4">
          {[
            { label: "Adresa", value: contact.address },
            { label: "Telefon", value: contact.phone, href: contact.phoneHref },
            { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
            { label: "Instagram", value: "@magnetmedia.al", href: contact.instagram, external: true },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-panel p-6">
              <h2 className="font-display text-sm font-semibold text-gold-deep">
                {c.label}
              </h2>
              {c.href ? (
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-2 block text-sm transition-colors hover:text-gold-deep"
                >
                  {c.value}
                </a>
              ) : (
                <p className="mt-2 text-sm">{c.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Forma */}
        <div className="rounded-2xl border border-border bg-panel p-7 lg:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Emri *
              </label>
              <input id="name" type="text" value={form.name} onChange={set("name")} placeholder="Emri yt" className={inputCls} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email *
              </label>
              <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="email@shembull.al" className={inputCls} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Telefon
              </label>
              <input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+355 6X XXX XXXX" className={inputCls} />
            </div>
            <div>
              <label htmlFor="service" className="mb-2 block text-sm font-medium">
                Shërbimi
              </label>
              <select id="service" value={form.service} onChange={set("service")} className={inputCls}>
                <option value="">Zgjidh shërbimin</option>
                {serviceLinks.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Mesazhi *
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={set("message")}
                placeholder="Na trego për projektin tënd..."
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-espresso-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            Dërgo mesazhin
          </button>
          <p className="mt-4 text-xs text-mute">* Fushat e detyrueshme</p>
        </div>
      </section>
    </>
  );
}

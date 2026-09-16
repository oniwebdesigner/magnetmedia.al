"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoM } from "@/app/components/icons";

/* Korniza e panelit të adminit: login i centralizuar + header + navigim.
   Përdoret nga /admin, /admin/blog dhe /admin/punet. */

const inputCls =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink placeholder:text-mute/60 outline-none transition-colors focus:border-gold";

const ADMIN_NAME = "Ina"; // emri që përshëndetet në header

const tabs = [
  { href: "/admin", label: "Përmbledhje", key: "dashboard" },
  { href: "/admin/blog", label: "Blogu", key: "blog" },
  { href: "/admin/punet", label: "Punët", key: "punet" },
] as const;

export type AdminTab = (typeof tabs)[number]["key"];

export default function AdminShell({
  active,
  title,
  subtitle,
  children,
}: {
  active: AdminTab;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/posts?all=1").then((res) => setAuthed(res.status !== 401));
  }, []);

  const login = async () => {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      setPassword("");
      setAuthed(true);
      window.location.reload(); // rifreskon të dhënat e faqes pas login-it
    } else {
      setMsg("Password i gabuar. Provo përsëri.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin";
  };

  /* ---------- Duke kontrolluar ---------- */
  if (authed === null) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-mute">Duke u ngarkuar...</p>
      </div>
    );
  }

  /* ---------- Login ---------- */
  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col justify-center px-5">
        <div className="rounded-2xl border border-border bg-panel p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <LogoM className="h-9 w-9 text-gold" />
            <div>
              <p className="font-display text-base font-semibold leading-tight">
                Magnet Media
              </p>
              <p className="text-xs text-mute">Paneli i adminit</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-mute">
            Kjo zonë është vetëm për administratorët. Vendos password-in për të
            hyrë.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            className={`${inputCls} mt-5`}
            autoFocus
          />
          {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
          <button
            type="button"
            onClick={login}
            disabled={busy || !password}
            className="mt-5 w-full rounded-full bg-espresso px-7 py-3 text-sm font-medium text-paper transition-colors hover:bg-espresso-soft disabled:opacity-40"
          >
            {busy ? "Duke hyrë..." : "Hyr në panel"}
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Paneli ---------- */
  return (
    <div className="min-h-screen">
      {/* Header-i i adminit */}
      <div className="border-b border-border bg-panel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <LogoM className="h-8 w-8 text-gold" />
            <div>
              <p className="font-display text-sm font-semibold leading-tight">
                Magnet Media <span className="text-mute">— Admin</span>
              </p>
              <p className="text-xs text-mute">Mirësevjen, {ADMIN_NAME}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-mute transition-colors hover:text-ink"
            >
              Shiko faqen ↗
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-border px-4 py-2 text-xs font-medium text-mute transition-colors hover:border-red-300 hover:text-red-600"
            >
              Dil
            </button>
          </div>
        </div>

        {/* Tabs — kthehesh kudo me një klik */}
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <nav className="flex gap-1" aria-label="Seksionet e panelit">
            {tabs.map((t) => (
              <Link
                key={t.key}
                href={t.href}
                aria-current={active === t.key ? "page" : undefined}
                className={`rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                  active === t.key
                    ? "border-gold text-ink"
                    : "border-transparent text-mute hover:text-ink"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Përmbajtja */}
      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-mute">{subtitle}</p>}
          </div>
          {active !== "dashboard" && (
            <Link
              href="/admin"
              className="text-sm font-medium text-gold-deep transition-colors hover:text-ink"
            >
              ← Kthehu te përmbledhja
            </Link>
          )}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
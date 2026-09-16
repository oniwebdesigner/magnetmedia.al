"use client";

import { useEffect, useState, useCallback } from "react";
import AdminShell from "@/app/admin/AdminShell";

type Project = {
  id: number;
  slug: string;
  client: string;
  type: string;
  category: string;
  image: string;
  year: string;
  intro: string;
  long: string;
  sherbime: string;
  gallery: string;
  published: boolean;
  createdAt: string;
};

const inputCls =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink placeholder:text-mute/60 outline-none transition-colors focus:border-gold";

const labelCls = "mb-1.5 block text-sm font-medium";
const hintCls = "mt-1.5 text-xs text-mute";

const kategorite = ["Branding", "Fushata", "Rrjete sociale", "Web"];

const emptyForm = {
  client: "",
  type: "",
  category: "",
  year: "",
  image: "",
  intro: "",
  long: "",
  sherbime: "",
  gallery: "",
};

export default function AdminPunetPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/projects?all=1");
    if (res.ok) setProjects(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const upload = async (file: File, target: "image" | "gallery") => {
    setUploading(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      if (target === "image") {
        setForm((f) => ({ ...f, image: url }));
      } else {
        setForm((f) => ({
          ...f,
          gallery: f.gallery ? `${f.gallery}\n${url}` : url,
        }));
      }
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || "Ngarkimi i fotos dështoi.");
    }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      client: p.client,
      type: p.type,
      category: p.category,
      year: p.year,
      image: p.image,
      intro: p.intro,
      long: p.long,
      sherbime: p.sherbime,
      gallery: p.gallery,
    });
    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMsg("");
  };

  const create = async () => {
    if (!form.client.trim() || !form.type.trim() || !form.category.trim()) {
      setMsg("Klienti, lloji dhe kategoria janë të detyrueshme.");
      return;
    }
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (res.ok) {
      setForm(emptyForm);
      setMsg("✓ Projekti u publikua me sukses.");
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || "Diçka shkoi keq.");
    }
  };

  const update = async () => {
    if (!editingId) return;
    if (!form.client.trim() || !form.type.trim() || !form.category.trim()) {
      setMsg("Klienti, lloji dhe kategoria janë të detyrueshme.");
      return;
    }
    setBusy(true);
    setMsg("");
    const res = await fetch(`/api/projects/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (res.ok) {
      setMsg("✓ Projekti u përditësua me sukses.");
      setEditingId(null);
      setForm(emptyForm);
      load();
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || "Diçka shkoi keq.");
    }
  };

  const togglePublish = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    load();
  };

  const remove = async (p: Project) => {
    if (!confirm(`Të fshihet "${p.client}"? Ky veprim s'kthehet.`)) return;
    if (editingId === p.id) cancelEdit();
    await fetch(`/api/projects/${p.id}`, { method: "DELETE" });
    load();
  };

  const galleryUrls = form.gallery.split("\n").filter((g) => g.trim());

  return (
    <AdminShell
      active="punet"
      title="Punët"
      subtitle="Shto projekte të reja në portofol dhe menaxho ekzistueset. Projektet e publikuara dalin te faqja /punet."
    >
      {/* Forma e projektit (i ri ose edit) */}
      <section className="rounded-2xl border border-border bg-panel p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">
              {editingId ? "Redakto projektin" : "Projekt i ri"}
            </h2>
            <p className="mt-1 text-sm text-mute">Fushat me * janë të detyrueshme.</p>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-mute transition-colors hover:text-ink"
            >
              Anulo redaktimin
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="client" className={labelCls}>Klienti *</label>
            <input
              id="client"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              placeholder="p.sh. KORRES"
              className={inputCls}
            />
            <p className={hintCls}>Emri i brandit — del si titull i projektit.</p>
          </div>
          <div>
            <label htmlFor="type" className={labelCls}>Lloji i punës *</label>
            <input
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              placeholder="p.sh. Fushatë brandi"
              className={inputCls}
            />
            <p className={hintCls}>Përshkrim i shkurtër i llojit — del nën emrin e klientit.</p>
          </div>

          <div>
            <label htmlFor="category" className={labelCls}>Kategoria *</label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputCls}
            >
              <option value="">Zgjidh kategorinë</option>
              {kategorite.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <p className={hintCls}>Përdoret nga filtrat te faqja /punet.</p>
          </div>
          <div>
            <label htmlFor="year" className={labelCls}>Viti</label>
            <input
              id="year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="p.sh. 2026"
              className={inputCls}
            />
            <p className={hintCls}>Nëse e lë bosh, vendoset viti aktual.</p>
          </div>

          {/* Foto kryesore */}
          <div className="sm:col-span-2">
            <label className={labelCls}>Foto kryesore</label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) upload(f, "image");
                  e.target.value = "";
                }}
                className="text-sm text-mute file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-gold file:px-5 file:py-2.5 file:text-sm file:font-medium file:text-espresso hover:file:bg-gold-light"
              />
              {form.image && (
                <span className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt="Parapamje"
                    className="h-14 w-20 rounded-lg border border-border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image: "" }))}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Hiqe
                  </button>
                </span>
              )}
            </div>
            <p className={hintCls}>
              Fotoja që del te karta dhe në krye të faqes së projektit. Max 4MB.
            </p>
          </div>

          {/* Galeria */}
          <div className="sm:col-span-2">
            <label className={labelCls}>Galeria e projektit</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f, "gallery");
                e.target.value = "";
              }}
              className="text-sm text-mute file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-gold file:px-5 file:py-2.5 file:text-sm file:font-medium file:text-espresso hover:file:bg-gold-light"
            />
            {uploading && <p className="mt-2 text-sm text-mute">Duke ngarkuar...</p>}
            {galleryUrls.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {galleryUrls.map((g) => (
                  <span key={g} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g}
                      alt=""
                      className="h-14 w-20 rounded-lg border border-border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          gallery: f.gallery
                            .split("\n")
                            .filter((x) => x !== g)
                            .join("\n"),
                        }))
                      }
                      className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white"
                      aria-label="Hiq foton"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className={hintCls}>
              Shto sa foto të duash, një nga një — dalin si galeri te faqja e projektit.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="intro" className={labelCls}>Përshkrim i shkurtër</label>
            <input
              id="intro"
              value={form.intro}
              onChange={(e) => setForm({ ...form, intro: e.target.value })}
              placeholder="Një fjali që përmbledh projektin"
              maxLength={300}
              className={inputCls}
            />
            <p className={hintCls}>Deri në 300 karaktere — del në krye të faqes së projektit.</p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="long" className={labelCls}>Historia e projektit</label>
            <textarea
              id="long"
              value={form.long}
              onChange={(e) => setForm({ ...form, long: e.target.value })}
              placeholder="Sfida e klientit, çfarë bëtë dhe rezultati..."
              rows={6}
              className={`${inputCls} resize-y`}
            />
            <p className={hintCls}>Për paragraf të ri, lër një rresht bosh mes teksteve.</p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="sherbime" className={labelCls}>Çfarë u realizua</label>
            <textarea
              id="sherbime"
              value={form.sherbime}
              onChange={(e) => setForm({ ...form, sherbime: e.target.value })}
              placeholder={"Shkruaj një shërbim për rresht, p.sh.:\nMeta Ads\nDizajn kreativash\nRaportim"}
              rows={4}
              className={`${inputCls} resize-y`}
            />
            <p className={hintCls}>
              Një shërbim për rresht — dalin si listë me pika te ana e faqes.
            </p>
          </div>
        </div>

        {msg && (
          <p className={`mt-4 text-sm ${msg.startsWith("✓") ? "text-green-700" : "text-red-600"}`}>
            {msg}
          </p>
        )}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={editingId ? update : create}
            disabled={busy || uploading}
            className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-espresso transition-colors hover:bg-gold-light disabled:opacity-40"
          >
            {busy
              ? editingId
                ? "Duke ruajtur..."
                : "Duke publikuar..."
              : editingId
              ? "Ruaj ndryshimet"
              : "Publiko projektin"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              disabled={busy}
              className="rounded-full border border-border px-7 py-3 text-sm font-medium text-mute transition-colors hover:text-ink"
            >
              Anulo
            </button>
          )}
        </div>
      </section>

      {/* Lista */}
      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold">
          Projektet ({projects.length})
        </h2>
        <p className="mt-1 text-sm text-mute">
          &quot;Kalo në draft&quot; e fsheh nga faqja pa e fshirë. Fshirja është e përhershme.
        </p>
        <div className="mt-4 space-y-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-4 ${
                editingId === p.id ? "border-gold bg-gold/5" : "border-border bg-panel"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt=""
                  className="h-11 w-16 shrink-0 rounded-lg border border-border object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {p.client}
                    {!p.published && (
                      <span className="ml-2 rounded-full bg-border px-2 py-0.5 text-xs text-mute">
                        draft
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-mute">
                    {p.category} • {p.type} • /punet/{p.slug}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-mute transition-colors hover:text-ink"
                >
                  Ndrysho
                </button>
                <button
                  type="button"
                  onClick={() => togglePublish(p)}
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-mute transition-colors hover:text-ink"
                >
                  {p.published ? "Kalo në draft" : "Publiko"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(p)}
                  className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Fshi
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-mute">
              Ende s&apos;ka projekte. Krijo të parin më sipër!
            </p>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
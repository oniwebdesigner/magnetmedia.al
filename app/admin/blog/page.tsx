"use client";

import { useEffect, useState, useCallback } from "react";
import AdminShell from "@/app/admin/AdminShell";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  published: boolean;
  createdAt: string;
};

const inputCls =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink placeholder:text-mute/60 outline-none transition-colors focus:border-gold";

const labelCls = "mb-1.5 block text-sm font-medium";
const hintCls = "mt-1.5 text-xs text-mute";

const emptyForm = { title: "", category: "", image: "", excerpt: "", content: "" };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadPosts = useCallback(async () => {
    const res = await fetch("/api/posts?all=1");
    if (res.ok) setPosts(await res.json());
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const uploadImage = async (file: File) => {
    setUploading(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, image: url }));
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || "Ngarkimi i fotos dështoi.");
    }
  };

  const startEdit = (p: Post) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      category: p.category,
      image: p.image,
      excerpt: p.excerpt,
      content: p.content,
    });
    setMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMsg("");
  };

  const createPost = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setMsg("Titulli dhe përmbajtja janë të detyrueshme.");
      return;
    }
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (res.ok) {
      setForm(emptyForm);
      setMsg("✓ Artikulli u publikua me sukses.");
      loadPosts();
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || "Diçka shkoi keq.");
    }
  };

  const updatePost = async () => {
    if (!editingId) return;
    if (!form.title.trim() || !form.content.trim()) {
      setMsg("Titulli dhe përmbajtja janë të detyrueshme.");
      return;
    }
    setBusy(true);
    setMsg("");
    const res = await fetch(`/api/posts/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (res.ok) {
      setMsg("✓ Artikulli u përditësua me sukses.");
      setEditingId(null);
      setForm(emptyForm);
      loadPosts();
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.error || "Diçka shkoi keq.");
    }
  };

  const togglePublish = async (p: Post) => {
    await fetch(`/api/posts/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    loadPosts();
  };

  const remove = async (p: Post) => {
    if (!confirm(`Të fshihet "${p.title}"? Ky veprim s'kthehet.`)) return;
    if (editingId === p.id) cancelEdit();
    await fetch(`/api/posts/${p.id}`, { method: "DELETE" });
    loadPosts();
  };

  return (
    <AdminShell
      active="blog"
      title="Blogu"
      subtitle="Shkruaj artikuj të rinj dhe menaxho ata ekzistues. Artikujt e publikuar dalin menjëherë te faqja /blog."
    >
      {/* Forma e artikullit (i ri ose edit) */}
      <section className="rounded-2xl border border-border bg-panel p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold">
              {editingId ? "Redakto artikullin" : "Artikull i ri"}
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
            <label htmlFor="title" className={labelCls}>Titulli *</label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="p.sh. Si të zgjedhësh kanalin e duhur"
              className={inputCls}
            />
            <p className={hintCls}>Shfaqet te karta dhe në krye të artikullit.</p>
          </div>
          <div>
            <label htmlFor="category" className={labelCls}>Kategoria</label>
            <input
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="p.sh. Branding"
              className={inputCls}
            />
            <p className={hintCls}>Një fjalë a dy — del si etiketë gold te karta.</p>
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Foto e artikullit</label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadImage(f);
                  e.target.value = "";
                }}
                className="text-sm text-mute file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-gold file:px-5 file:py-2.5 file:text-sm file:font-medium file:text-espresso hover:file:bg-gold-light"
              />
              {uploading && <span className="text-sm text-mute">Duke ngarkuar...</span>}
              {form.image && !uploading && (
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
            <p className={hintCls}>JPG, PNG ose WEBP — maksimumi 4MB. Nëse s&apos;vendos foto, përdoret një standarde.</p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="excerpt" className={labelCls}>Përshkrim i shkurtër</label>
            <input
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Një fjali që fton për ta lexuar artikullin"
              maxLength={300}
              className={inputCls}
            />
            <p className={hintCls}>Deri në 300 karaktere — shfaqet te karta nën titull.</p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="content" className={labelCls}>Përmbajtja e artikullit *</label>
            <textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Shkruaj artikullin këtu..."
              rows={10}
              className={`${inputCls} resize-y`}
            />
            <p className={hintCls}>Për paragraf të ri, lër një rresht bosh mes teksteve.</p>
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
            onClick={editingId ? updatePost : createPost}
            disabled={busy || uploading}
            className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-espresso transition-colors hover:bg-gold-light disabled:opacity-40"
          >
            {busy
              ? editingId
                ? "Duke ruajtur..."
                : "Duke publikuar..."
              : editingId
              ? "Ruaj ndryshimet"
              : "Publiko artikullin"}
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
          Artikujt e publikuar ({posts.length})
        </h2>
        <p className="mt-1 text-sm text-mute">
          &quot;Kalo në draft&quot; e fsheh nga faqja pa e fshirë. Fshirja është e përhershme.
        </p>
        <div className="mt-4 space-y-3">
          {posts.map((p) => (
            <div
              key={p.id}
              className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-5 py-4 ${
                editingId === p.id ? "border-gold bg-gold/5" : "border-border bg-panel"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {p.title}
                  {!p.published && (
                    <span className="ml-2 rounded-full bg-border px-2 py-0.5 text-xs text-mute">
                      draft
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-mute">
                  {p.category} • {new Date(p.createdAt).toLocaleDateString("sq-AL")} • /blog/{p.slug}
                </p>
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
          {posts.length === 0 && (
            <p className="text-sm text-mute">Ende s&apos;ka artikuj. Krijo të parin më sipër!</p>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
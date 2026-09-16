import { createHash } from "crypto";
import { cookies } from "next/headers";

/* Autentikim minimal për panelin: password nga .env (ADMIN_PASSWORD),
   cookie httpOnly me hash-in e tij. Mjafton për një panel të brendshëm. */

export const ADMIN_COOKIE = "mm_admin";

export function adminToken() {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) throw new Error("ADMIN_PASSWORD mungon në .env");
  return createHash("sha256").update(pass).digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  try {
    const store = await cookies();
    return store.get(ADMIN_COOKIE)?.value === adminToken();
  } catch {
    return false;
  }
}

/* Slug nga titulli, me shkronjat shqipe */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ë/g, "e")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 90);
}
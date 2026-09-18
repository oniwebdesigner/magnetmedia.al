"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { navLinks } from "@/app/lib/nav";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-espresso/90 text-paper backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
       <Link href="/" className="flex items-center gap-2.5">
  {/* eslint-disable-next-line @next/next/no-img-element */}
 <Image
  src="/logo/logo-normalized.png"
  alt="Magnet Media"
  width={64}
  height={64}
  unoptimized
  className="h-16 w-auto"
/>
</Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Menuja kryesore">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative pb-1 text-sm font-medium transition-colors hover:text-paper ${
                isActive(l.href)
                  ? "text-paper after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-gold"
                  : "text-paper/60"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/kontakt"
          className="hidden items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-espresso transition-all hover:bg-gold-light lg:inline-flex"
        >
          Le të flasim
        </Link>

        {/* Burger — 3 vija 20px, të pozicionuara saktë, rrotullohen në X */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Mbyll menunë" : "Hap menunë"}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <span className="relative block h-[14px] w-5">
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, x: open ? 12 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-[6px] h-[2px] w-5 rounded-full bg-current"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-[12px] h-[2px] w-5 rounded-full bg-current"
            />
          </span>
        </button>
      </div>

      {/* Menuja mobile */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.35, staggerChildren: 0.05, delayChildren: 0.08 }}
            className="overflow-hidden border-t border-white/10 bg-espresso/95 backdrop-blur-md lg:hidden"
            aria-label="Menuja mobile"
          >
            <div className="px-4 py-5">
              <ul className="space-y-1">
                {navLinks.map((l) => (
                  <motion.li key={l.href} variants={itemVariants} transition={{ duration: 0.25 }}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={`block rounded-lg px-4 py-3 text-[15px] font-medium transition-all ${
                        isActive(l.href)
                          ? "bg-gold/10 text-gold"
                          : "text-paper/90 hover:bg-white/5"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li variants={itemVariants} transition={{ duration: 0.25 }} className="pt-3">
                  <Link
                    href="/kontakt"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-all hover:bg-gold-light"
                  >
                    Le të flasim
                  </Link>
                </motion.li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/content/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-[var(--color-border)] bg-black/72 shadow-[0_20px_80px_rgba(0,0,0,0.42)]"
            : "border-white/10 bg-black/20"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2d3950] bg-[radial-gradient(circle_at_28%_24%,_#10131a,_#050608_68%)] font-display text-xl font-semibold text-[#f3eee4] ring-1 ring-[#182033]">
            J
          </span>
          <div>
            <div className="font-display text-2xl leading-none tracking-[0.18em] text-[#f3eee4] uppercase">
              COCINASJAM
            </div>
            <div className="text-[10px] uppercase tracking-[0.38em] text-[#c8c1b4]">
              Instalación de Cocinas
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-[var(--color-mist)] lg:flex">
          {navigationLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "text-[var(--color-ivory)]" : "hover:text-[var(--color-ivory)]"}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(182,182,188,0.96))] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-transform hover:-translate-y-0.5"
          >
            Solicitar Consulta
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ivory)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir navegacion"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-[2rem] border border-[var(--color-border)] bg-black/90 p-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-4 text-base text-[var(--color-mist)]">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-[var(--color-ivory)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(182,182,188,0.96))] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-black"
            >
              Solicitar Consulta
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

import Link from "next/link";
import { contactDetails, navigationLinks } from "@/content/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/60">
      <div className="luxury-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="eyebrow">COCINASJAM</p>
          <h2 className="font-display text-4xl text-[var(--color-ivory)] sm:text-5xl">
            Soluciones de cocina bien pensadas, bien coordinadas y bien acabadas.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-mist)]">
            Instalación, renovación y coordinación de proyecto para propietarios, interioristas y promotores que buscan un proceso claro y un resultado sólido.
          </p>
        </div>

        <div className="space-y-3 text-sm text-[var(--color-mist)]">
          <p className="eyebrow">Visítanos</p>
          <p>{contactDetails.address}</p>
          <p>{contactDetails.phone}</p>
          <p>{contactDetails.email}</p>
          <p>{contactDetails.hours}</p>
        </div>

        <div className="space-y-3 text-sm text-[var(--color-mist)]">
          <p className="eyebrow">Navegación</p>
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block hover:text-[var(--color-ivory)]">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="block hover:text-[var(--color-ivory)]">
            Solicitar consulta
          </Link>
        </div>
      </div>
    </footer>
  );
}

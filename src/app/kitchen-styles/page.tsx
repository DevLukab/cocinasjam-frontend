import Image from "next/image";
import Link from "next/link";
import { styleProfiles } from "@/content/site-data";

export default function KitchenStylesPage() {
  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <section className="luxury-shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Estilos de cocina</p>
          <h1 className="font-display text-6xl leading-[0.95] text-[var(--color-ivory)] sm:text-7xl">
            Encuentra tu inspiración.
          </h1>
          <p className="text-base leading-8 text-[var(--color-mist)] sm:text-lg">
            Trabajamos cocinas con identidades muy distintas, adaptando materiales, distribución y detalles de ejecución a cada tipo de vivienda y cliente.
          </p>
        </div>
        <Link href="/gallery" className="text-sm uppercase tracking-[0.24em] text-[var(--color-gold)] hover:text-[var(--color-ivory)]">
          Ver galería completa
        </Link>
      </section>

      <section className="luxury-shell mt-16 grid gap-6 lg:grid-cols-2">
        {styleProfiles.map((profile) => (
          <article key={profile.name} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <div className="relative h-80">
              <Image src={profile.image} alt={profile.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
            </div>
            <div className="space-y-4 p-7">
              <p className="eyebrow">Perfil de estilo</p>
              <h2 className="font-display text-5xl text-[var(--color-ivory)]">{profile.name}</h2>
              <p className="text-base leading-8 text-[var(--color-mist)]">{profile.blurb}</p>
              <div className="flex flex-wrap gap-3">
                {profile.details.map((detail) => (
                  <span key={detail} className="rounded-full border border-[var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-ivory)]">
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="luxury-shell mt-20">
        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-black/25 p-6 lg:grid-cols-3">
          {[
            "Selecciones guiadas por el material: piedra, madera, lacado y metal",
            "Planificación de instalación adaptada a propiedades singulares, apartamentos y viviendas familiares",
            "Ubicación de iluminación y electrodomésticos resuelta antes del inicio de obra",
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-[var(--color-mist)]">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

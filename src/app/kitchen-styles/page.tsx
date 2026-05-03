import Image from "next/image";
import Link from "next/link";
import { PageAnimations } from "@/components/animations/page-animations";
import { getKitchenStyleProfiles } from "@/lib/kitchen-styles";

export default async function KitchenStylesPage() {
  const styleProfiles = await getKitchenStyleProfiles();

  return (
    <PageAnimations>
      <div className="pb-20 pt-32 sm:pt-36">
        <section
          data-animate="hero-shell"
          className="luxury-shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div data-animate="hero-copy" className="max-w-3xl space-y-4">
            <p className="eyebrow">Estilos de cocina</p>
            <h1 className="font-display display-hero text-6xl text-[var(--color-ivory)] sm:text-7xl">
              Encuentra tu inspiración.
            </h1>
            <p className="text-base leading-8 text-[var(--color-mist)] sm:text-lg">
              Trabajamos cocinas con identidades muy distintas, adaptando materiales, distribución y detalles de ejecución a cada tipo de vivienda y cliente.
            </p>
          </div>
          <Link href="/gallery" className="caps-label text-[var(--color-gold)] hover:text-[var(--color-ivory)]">
            Ver galería completa
          </Link>
        </section>

        <section className="luxury-shell mt-16 grid gap-6 lg:grid-cols-2" data-animate-group>
          {styleProfiles.map((profile) => (
            <article key={profile.id} data-animate="item" className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <div data-animate="media" className="relative h-80">
                <Image src={profile.image} alt={profile.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
              </div>
              <div className="space-y-4 p-7">
                <h2 className="font-display display-title text-5xl text-[var(--color-ivory)]">{profile.name}</h2>
                <p className="text-base leading-8 text-[var(--color-mist)]">{profile.description}</p>
                {profile.details.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {profile.details.map((detail) => (
                      <span key={detail} className="caps-label-tight rounded-full border border-[var(--color-border)] px-4 py-2 text-[var(--color-ivory)]">
                        {detail}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </section>

        <section className="luxury-shell mt-20">
          <div data-animate-group className="grid gap-6 rounded-[2rem] border border-white/10 bg-black/25 p-6 lg:grid-cols-3">
            {[
              "Selecciones guiadas por el material: piedra, madera, lacado y metal",
              "Planificación de instalación adaptada a propiedades singulares, apartamentos y viviendas familiares",
              "Ubicación de iluminación y electrodomésticos resuelta antes del inicio de obra",
            ].map((item) => (
              <div key={item} data-animate="item" className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-[var(--color-mist)]">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageAnimations>
  );
}

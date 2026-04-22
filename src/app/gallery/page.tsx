import { GalleryShowcase } from "@/components/gallery/gallery-showcase";
import { PageAnimations } from "@/components/animations/page-animations";
import { getGalleryData } from "@/lib/gallery";

export default async function GalleryPage() {
  const galleryData = await getGalleryData();

  return (
    <PageAnimations>
      <div className="pb-20 pt-32 sm:pt-36">
        <section
          data-animate="hero-shell"
          className="luxury-shell rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.09),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))] px-8 py-14 hero-grid sm:px-12"
        >
          <div data-animate="hero-copy" className="max-w-3xl space-y-4">
            <p className="eyebrow">Nuestro portafolio</p>
            <h1 className="font-display text-6xl leading-[0.95] text-[var(--color-ivory)] sm:text-7xl">
              Una galería de cocinas definidas por el acabado, la luz y la proporción.
            </h1>
            <p className="text-base leading-8 text-[var(--color-mist)] sm:text-lg">
              Explora trabajos recientes entre instalaciones modernas, clásicas, centradas en islas o en iluminación. Filtra por estilo y abre cualquier proyecto en el visor para verlo de cerca.
            </p>
          </div>
        </section>

        <section className="luxury-shell mt-14" data-animate="reveal">
          <GalleryShowcase tags={galleryData.tags} items={galleryData.items} />
        </section>
      </div>
    </PageAnimations>
  );
}

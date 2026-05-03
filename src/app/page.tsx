import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageAnimations } from "@/components/animations/page-animations";
import { testimonials, trustPillars } from "@/content/site-data";
import { getKitchenStyleProfiles } from "@/lib/kitchen-styles";
import { getProcessSteps } from "@/lib/our-processes";

function getProcessSummary(body: string) {
  return body.split("\n").map((line) => line.trim()).find(Boolean) || body;
}

export default async function HomePage() {
  const kitchenStyles = (await getKitchenStyleProfiles()).slice(0, 3);
  const processSteps = await getProcessSteps();

  return (
    <PageAnimations>
      <div className="pb-20 pt-28 sm:pt-32">
        <section className="luxury-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div
            data-animate="hero-shell"
            className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.02))] px-7 py-10 shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:px-10 sm:py-12 lg:min-h-[36rem] lg:rounded-[2.5rem]"
          >
            <div className="hero-grid absolute inset-0 opacity-25" />
            <div data-animate="hero-copy" className="relative max-w-[36rem] space-y-7">
              <p className="eyebrow">Instalación y reforma de cocinas</p>
              <div className="space-y-5">
                <h1 className="font-display display-hero text-[clamp(3.35rem,4.55vw,4.7rem)] font-medium text-[var(--color-ivory)] sm:text-[clamp(3.9rem,4.8vw,4.95rem)] lg:text-[clamp(4.1rem,4.15vw,4.9rem)]">
                  Cocinas bien pensadas, ejecutadas con precisión.
                </h1>
                <p className="max-w-xl text-base leading-8 text-[var(--color-mist)] sm:text-lg">
                  Desarrollamos proyectos de cocina con criterio técnico, coordinación de materiales y una ejecución cuidada desde la primera conversación hasta la entrega.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/gallery"
                  className="cta-pill inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(180,180,186,0.96))] text-black"
                >
                  Ver Nuestro Trabajo
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="cta-pill inline-flex items-center justify-center rounded-full border border-white/15 text-[var(--color-ivory)] hover:border-[var(--color-border)] hover:bg-white/5"
                >
                  Solicitar una consulta
                </Link>
              </div>
            </div>
          </div>

          <div
            data-animate="hero-image"
            className="relative h-[28rem] overflow-hidden rounded-[2rem] border border-white/10 bg-black sm:h-[34rem] lg:h-[36rem]"
          >
            <Image
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80"
              alt="Muestra de proyecto de cocina terminado"
              fill
              priority
              className="inset-0 object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(10,9,8,0.02)_0%,_rgba(10,9,8,0.04)_48%,_rgba(10,9,8,0.46)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="inline-flex max-w-[24rem] flex-col gap-1 rounded-2xl border border-white/10 bg-black/45 px-5 py-4 font-sans backdrop-blur-md">
                <p className="caps-micro text-[var(--color-gold)]">Acabado distintivo</p>
                <p className="text-sm leading-6 text-[var(--color-ivory)] sm:text-base">
                  Piedra, carpintería e iluminación coordinadas en una sola composición.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="luxury-shell mt-8">
          <div data-animate-group className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/25 p-5 md:grid-cols-3 md:p-7">
            {trustPillars.map((pillar) => (
              <div
                key={pillar}
                data-animate="item"
                className="caps-label rounded-[1.5rem] border border-white/8 bg-white/5 px-5 py-6 text-[var(--color-ivory)]"
              >
                {pillar}
              </div>
            ))}
          </div>
        </section>

        <section className="luxury-shell mt-24">
          <div data-animate="reveal" className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="eyebrow">Estilos destacados</p>
              <h2 className="font-display display-title text-5xl text-[var(--color-ivory)] sm:text-6xl">Distintas formas de entender una cocina, resueltas con precisión.</h2>
            </div>
            <Link href="/kitchen-styles" className="caps-label text-[var(--color-gold)] hover:text-[var(--color-ivory)]">
              Explorar estilos de cocina
            </Link>
          </div>
          <div data-animate-group className="grid gap-6 lg:grid-cols-3">
            {kitchenStyles.map((style) => (
              <article key={style.id} data-animate="item" className="group relative overflow-hidden rounded-[2rem] border border-white/10">
                <div className="relative h-[28rem]">
                  <Image src={style.image} alt={style.alt} fill className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-50" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.04)_0%,_rgba(0,0,0,0.18)_38%,_rgba(0,0,0,0.86)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="rounded-[1.5rem] bg-black/35 p-5 backdrop-blur-[2px]">
                      <h3 className="font-display display-title text-4xl text-[var(--color-ivory)]">{style.name}</h3>
                      <p className="mt-3 text-base leading-8 text-[rgba(244,238,230,0.9)]">{style.description}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="luxury-shell mt-24 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div data-animate="reveal" className="space-y-4">
            <p className="eyebrow">Nuestro proceso</p>
            <h2 className="font-display display-title text-5xl text-[var(--color-ivory)] sm:text-6xl">Una ruta clara desde la idea inicial hasta la entrega final.</h2>
          </div>
          <div data-animate-group className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.id} data-animate="item" className="panel rounded-[1.75rem] p-6">
                <p className="text-sm text-[var(--color-gold)]">{String(step.stepNumber).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display display-title text-3xl text-[var(--color-ivory)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-mist)]">{getProcessSummary(step.body)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="luxury-shell mt-24 grid gap-6 lg:grid-cols-2" data-animate-group>
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} data-animate="item" className="panel rounded-[2rem] p-8 sm:p-10">
              <p className="font-display text-4xl leading-tight text-[var(--color-ivory)] sm:text-5xl">
                “{testimonial.quote}”
              </p>
              <footer className="caps-label mt-6 text-[var(--color-gold)]">{testimonial.author}</footer>
            </blockquote>
          ))}
        </section>

        <section className="luxury-shell mt-24">
          <div
            data-animate="reveal"
            className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03),_rgba(120,120,128,0.08))] px-8 py-12 text-center sm:px-12 sm:py-16"
          >
            <p className="eyebrow">Empieza tu proyecto</p>
            <h2 className="mt-4 font-display display-title text-5xl text-[var(--color-ivory)] sm:text-6xl">¿Listo para dar forma a tu próxima cocina?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-mist)]">
              Comparte tus planos, dimensiones y necesidades del espacio. Definiremos contigo el alcance, la planificación y la mejor forma de abordar el proyecto.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/gallery" className="cta-pill inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-black text-[var(--color-ivory)] hover:bg-black/80">
                Ver proyectos
              </Link>
              <Link href="/contact" className="cta-pill inline-flex items-center justify-center rounded-full border border-black/10 bg-[var(--color-ivory)] text-black hover:bg-[#dedee3]">
                Solicitar consulta
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageAnimations>
  );
}

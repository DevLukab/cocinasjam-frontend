import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { kitchenStyles, processSteps, testimonials, trustPillars } from "@/content/site-data";

export default function HomePage() {
  return (
    <div className="pb-20 pt-28 sm:pt-32">
      <section className="luxury-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.02))] px-7 py-12 shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:px-10 sm:py-14 lg:min-h-[40rem] lg:rounded-[2.5rem]">
          <div className="hero-grid absolute inset-0 opacity-25" />
          <div className="relative max-w-2xl space-y-8">
            <p className="eyebrow">Instalación y reforma de cocinas</p>
            <div className="space-y-5">
              <h1 className="font-display text-6xl leading-[0.95] text-[var(--color-ivory)] sm:text-7xl lg:text-8xl">
                Cocinas bien pensadas, ejecutadas con precisión.
              </h1>
              <p className="max-w-xl text-base leading-8 text-[var(--color-mist)] sm:text-lg">
                Desarrollamos proyectos de cocina con criterio técnico, coordinación de materiales y una ejecución cuidada desde la primera conversación hasta la entrega.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(180,180,186,0.96))] px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black"
              >
                Ver Nuestro Trabajo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-ivory)] hover:border-[var(--color-border)] hover:bg-white/5"
              >
                Solicitar una consulta
              </Link>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
          <div className="relative h-[28rem] sm:h-[34rem] lg:h-[40rem]">
            <Image
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80"
              alt="Muestra de proyecto de cocina terminado"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(10,9,8,0.05)_0%,_rgba(10,9,8,0.22)_40%,_rgba(10,9,8,0.85)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
              <p className="eyebrow">Acabado distintivo</p>
              <p className="font-display text-4xl text-[var(--color-ivory)]">Piedra, carpintería e iluminación resueltas como una sola composición.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-shell mt-8">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/25 p-5 md:grid-cols-3 md:p-7">
          {trustPillars.map((pillar) => (
            <div key={pillar} className="rounded-[1.5rem] border border-white/8 bg-white/5 px-5 py-6 text-sm uppercase tracking-[0.18em] text-[var(--color-ivory)]">
              {pillar}
            </div>
          ))}
        </div>
      </section>

      <section className="luxury-shell mt-24">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Estilos destacados</p>
            <h2 className="font-display text-5xl text-[var(--color-ivory)] sm:text-6xl">Distintas formas de entender una cocina, resueltas con precisión.</h2>
          </div>
          <Link href="/kitchen-styles" className="text-sm uppercase tracking-[0.22em] text-[var(--color-gold)] hover:text-[var(--color-ivory)]">
            Explorar estilos de cocina
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {kitchenStyles.map((style) => (
            <article key={style.name} className="group relative overflow-hidden rounded-[2rem] border border-white/10">
              <div className="relative h-[28rem]">
                <Image src={style.image} alt={style.name} fill className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-50" sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.04)_0%,_rgba(0,0,0,0.18)_38%,_rgba(0,0,0,0.86)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="rounded-[1.5rem] bg-black/35 p-5 backdrop-blur-[2px]">
                    <h3 className="font-display text-4xl text-[var(--color-ivory)]">{style.name}</h3>
                    <p className="mt-3 text-base leading-8 text-[rgba(244,238,230,0.9)]">{style.description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="luxury-shell mt-24 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="space-y-4">
          <p className="eyebrow">Nuestro proceso</p>
          <h2 className="font-display text-5xl text-[var(--color-ivory)] sm:text-6xl">Una ruta clara desde la idea inicial hasta la entrega final.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step.title} className="panel rounded-[1.75rem] p-6">
              <p className="text-sm text-[var(--color-gold)]">0{index + 1}</p>
              <h3 className="mt-4 font-display text-3xl text-[var(--color-ivory)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-mist)]">{step.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="luxury-shell mt-24 grid gap-6 lg:grid-cols-2">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.author} className="panel rounded-[2rem] p-8 sm:p-10">
            <p className="font-display text-4xl leading-tight text-[var(--color-ivory)] sm:text-5xl">
              “{testimonial.quote}”
            </p>
            <footer className="mt-6 text-sm uppercase tracking-[0.22em] text-[var(--color-gold)]">{testimonial.author}</footer>
          </blockquote>
        ))}
      </section>

      <section className="luxury-shell mt-24">
        <div className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03),_rgba(120,120,128,0.08))] px-8 py-12 text-center sm:px-12 sm:py-16">
          <p className="eyebrow">Empieza tu proyecto</p>
          <h2 className="mt-4 font-display text-5xl text-[var(--color-ivory)] sm:text-6xl">¿Listo para dar forma a tu próxima cocina?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-mist)]">
            Comparte tus planos, dimensiones y necesidades del espacio. Definiremos contigo el alcance, la planificación y la mejor forma de abordar el proyecto.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/gallery" className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-ivory)] hover:bg-black/80">
              Ver proyectos
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-black/10 bg-[var(--color-ivory)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black hover:bg-[#dedee3]">
              Solicitar consulta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

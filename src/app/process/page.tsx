import Image from "next/image";
import Link from "next/link";
import { detailedProcess } from "@/content/site-data";

export default function ProcessPage() {
  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <section className="luxury-shell">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Nuestro proceso</p>
          <h1 className="font-display text-6xl leading-[0.95] text-[var(--color-ivory)] sm:text-7xl">
            De la visión a la realidad.
          </h1>
          <p className="text-base leading-8 text-[var(--color-mist)] sm:text-lg">
            Cada proyecto sigue una metodología de instalación rigurosa que protege la intención del diseño, el orden en obra y la calidad del acabado en cada fase.
          </p>
        </div>
      </section>

      <section className="luxury-shell mt-16 space-y-10">
        {detailedProcess.map((step, index) => (
          <article key={step.title} className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-7 lg:grid-cols-2 lg:items-center">
            <div className={`space-y-4 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <p className="eyebrow">Fase {index + 1}</p>
              <h2 className="font-display text-5xl text-[var(--color-ivory)]">{step.title}</h2>
              <p className="max-w-xl text-base leading-8 text-[var(--color-mist)]">{step.body}</p>
            </div>
            <div className={`relative h-80 overflow-hidden rounded-[1.75rem] border border-white/10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </article>
        ))}
      </section>

      <section className="luxury-shell mt-20">
        <div className="panel rounded-[2rem] px-8 py-10 sm:px-10 sm:py-12">
          <p className="eyebrow">Preparación del proyecto</p>
          <h2 className="mt-4 font-display text-5xl text-[var(--color-ivory)]">Trae tus planos. Nosotros estructuramos la ejecución.</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-mist)]">
            Tanto si ya tienes planos de cocina como si solo cuentas con un moodboard y medidas del espacio, podemos asesorarte sobre secuencias, viabilidad y el formato de consulta adecuado.
          </p>
          <Link href="/contact" className="mt-8 inline-flex rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(180,180,186,0.96))] px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black">
            Solicitar una consulta
          </Link>
        </div>
      </section>
    </div>
  );
}

import { BookingInquiryForm } from "@/components/forms/booking-inquiry-form";
import { PageAnimations } from "@/components/animations/page-animations";
import { getContactDetails } from "@/lib/contact";

export default async function ContactPage() {
  const contactDetails = await getContactDetails();

  return (
    <PageAnimations>
      <div className="pb-20 pt-32 sm:pt-36">
        <section className="luxury-shell max-w-3xl space-y-4" data-animate="hero-shell">
          <div data-animate="hero-copy" className="space-y-4">
            <p className="eyebrow">Contacto</p>
            <h1 className="font-display display-hero text-6xl text-[var(--color-ivory)] sm:text-7xl">
              Hablemos de tu nueva cocina.
            </h1>
            <p className="text-base leading-8 text-[var(--color-mist)] sm:text-lg">
              Comparte tu plazo, tus ideas de distribución y el nivel de acabado deseado. Te recomendaremos el siguiente paso y el formato de consulta adecuado.
            </p>
          </div>
        </section>

        <section className="luxury-shell mt-16 grid items-start gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div data-animate-group className="space-y-6 self-start">
            <div data-animate="item" className="panel rounded-[2rem] p-7 sm:p-8">
              <p className="eyebrow">Datos de contacto</p>
              <div className="mt-6 grid gap-5 text-sm leading-7 text-[var(--color-mist)]">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="caps-micro text-[var(--color-gold)]">Teléfono</p>
                  <p className="mt-2 text-base text-[var(--color-ivory)]">{contactDetails.phone}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="caps-micro text-[var(--color-gold)]">Email</p>
                  <p className="mt-2 text-base text-[var(--color-ivory)]">{contactDetails.email}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="caps-micro text-[var(--color-gold)]">Dirección</p>
                  <p className="mt-2 text-base text-[var(--color-ivory)]">{contactDetails.address}</p>
                </div>
              </div>
            </div>

            <div data-animate="item" className="panel rounded-[2rem] p-7 sm:p-8">
              <p className="eyebrow">Antes de enviarlo</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-mist)]">
                <p>
                  Cuanto más contexto nos dejes, mejor podremos orientarte desde el primer contacto.
                </p>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-[var(--color-ivory)]">Incluye si puedes:</p>
                  <p className="mt-2">presupuesto aproximado, dimensiones, estilo deseado, fecha prevista y cualquier condicionante de obra.</p>
                </div>
              </div>
            </div>

            <div data-animate="item" className="panel rounded-[2rem] p-7 sm:p-8">
              <p className="eyebrow">Atención directa</p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-mist)]">
                Si prefieres resolverlo por una vía más directa, puedes llamarnos o escribirnos antes de completar el formulario.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                  className="cta-pill inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(180,180,186,0.96))] text-center text-black sm:min-w-[12.5rem]"
                >
                  Llamar ahora
                </a>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="cta-pill inline-flex items-center justify-center rounded-full border border-white/15 text-center text-[var(--color-ivory)] hover:border-[var(--color-border)] hover:bg-white/5 sm:min-w-[12.5rem]"
                >
                  Escribir por email
                </a>
              </div>
            </div>
          </div>

          <div data-animate="reveal">
            <BookingInquiryForm
              title="Cuéntanos tu proyecto y te llamamos."
              description="Hemos sustituido la reserva externa por un formulario completo para recoger presupuesto, medidas, referencias y condicionantes antes de la consulta."
              buttonLabel="Solicitar presupuesto sin compromiso"
            />
          </div>
        </section>
      </div>
    </PageAnimations>
  );
}

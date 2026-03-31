import { BookingInquiryForm } from "@/components/forms/booking-inquiry-form";
import { getContactDetails } from "@/lib/contact";

export default async function ContactPage() {
  const contactDetails = await getContactDetails();

  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <section className="luxury-shell max-w-3xl space-y-4">
        <p className="eyebrow">Contacto</p>
        <h1 className="font-display text-6xl leading-[0.95] text-[var(--color-ivory)] sm:text-7xl">
          Hablemos de tu nueva cocina.
        </h1>
        <p className="text-base leading-8 text-[var(--color-mist)] sm:text-lg">
          Comparte tu plazo, tus ideas de distribución y el nivel de acabado deseado. Te recomendaremos el siguiente paso y el formato de consulta adecuado.
        </p>
      </section>

      <section className="luxury-shell mt-16 grid items-start gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-6 self-start">
          <div className="panel rounded-[2rem] p-7 sm:p-8">
            <p className="eyebrow">Datos de contacto</p>
            <div className="mt-6 grid gap-5 text-sm leading-7 text-[var(--color-mist)]">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">Teléfono</p>
                <p className="mt-2 text-base text-[var(--color-ivory)]">{contactDetails.phone}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">Email</p>
                <p className="mt-2 text-base text-[var(--color-ivory)]">{contactDetails.email}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">Dirección</p>
                <p className="mt-2 text-base text-[var(--color-ivory)]">{contactDetails.address}</p>
              </div>
            </div>
          </div>

          <div className="panel rounded-[2rem] p-7 sm:p-8">
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

          <div className="panel rounded-[2rem] p-7 sm:p-8">
            <p className="eyebrow">Atención directa</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-mist)]">
              Si prefieres resolverlo por una vía más directa, puedes llamarnos o escribirnos antes de completar el formulario.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <a
                href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(180,180,186,0.96))] px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-black sm:min-w-[12.5rem]"
              >
                Llamar ahora
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ivory)] hover:border-[var(--color-border)] hover:bg-white/5 sm:min-w-[12.5rem]"
              >
                Escribir por email
              </a>
            </div>
          </div>
        </div>

        <BookingInquiryForm
          title="Cuéntanos tu proyecto y te llamamos."
          description="Hemos sustituido la reserva externa por un formulario completo para recoger presupuesto, medidas, referencias y condicionantes antes de la consulta."
          buttonLabel="Solicitar presupuesto sin compromiso"
        />
      </section>
    </div>
  );
}

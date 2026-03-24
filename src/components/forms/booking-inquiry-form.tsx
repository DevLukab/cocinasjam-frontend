type BookingInquiryFormProps = {
  title: string;
  description: string;
  buttonLabel: string;
};

const inputClassName =
  "rounded-[1.25rem] border border-white/10 bg-black/30 px-4 py-4 text-sm normal-case tracking-normal text-[var(--color-ivory)] outline-none transition focus:border-[var(--color-gold)]";

export function BookingInquiryForm({
  title,
  description,
  buttonLabel,
}: BookingInquiryFormProps) {
  return (
    <div className="panel rounded-[2rem] p-6 sm:p-8">
      <p className="eyebrow">Formulario de consulta</p>
      <h2 className="mt-4 font-display text-5xl text-[var(--color-ivory)]">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-mist)]">{description}</p>

      <form className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { label: "Nombre", type: "text", placeholder: "Tu nombre completo" },
          { label: "Email", type: "email", placeholder: "tu@correo.com" },
          { label: "Teléfono", type: "tel", placeholder: "+34 ..." },
          { label: "Población o zona", type: "text", placeholder: "Ciudad o área del proyecto" },
        ].map((field) => (
          <label
            key={field.label}
            className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)]"
          >
            {field.label}
            <input type={field.type} placeholder={field.placeholder} className={inputClassName} />
          </label>
        ))}

        <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)]">
          Tipo de proyecto
          <select className={inputClassName} defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option>Instalación completa de cocina</option>
            <option>Renovación parcial</option>
            <option>Isla o zona concreta</option>
            <option>Coordinación con interiorista o arquitecto</option>
          </select>
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)]">
          Rango de presupuesto
          <select className={inputClassName} defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option>Menos de 25k EUR</option>
            <option>25k EUR - 45k EUR</option>
            <option>45k EUR - 75k EUR</option>
            <option>75k EUR - 120k EUR</option>
            <option>120k EUR+</option>
          </select>
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)]">
          Metros o dimensiones
          <input type="text" placeholder="Ej. 5m x 4m o 20 m2" className={inputClassName} />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)]">
          Fecha ideal de inicio
          <input type="text" placeholder="Ej. Septiembre 2026" className={inputClassName} />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)] sm:col-span-2">
          Referencias o estilo deseado
          <textarea
            rows={4}
            placeholder="Describe el estilo que buscas, materiales, colores o referencias visuales."
            className={inputClassName}
          />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)] sm:col-span-2">
          Accesos o condicionantes de obra
          <textarea
            rows={4}
            placeholder="Indica si hay ascensor pequeño, horarios de comunidad, vivienda ocupada u otras limitaciones."
            className={inputClassName}
          />
        </label>

        <label className="grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)] sm:col-span-2">
          Detalles del proyecto
          <textarea
            rows={5}
            placeholder="Cuéntanos el alcance del proyecto y cualquier necesidad importante para preparar la consulta."
            className={inputClassName}
          />
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex justify-center rounded-full border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(248,248,250,0.96),_rgba(180,180,186,0.96))] px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-black sm:col-span-2"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}

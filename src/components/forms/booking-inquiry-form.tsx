type BookingInquiryFormProps = {
  title: string;
  description: string;
  buttonLabel: string;
};

const inputClassName =
  "w-full rounded-[1.25rem] border border-white/10 bg-black/30 px-4 py-4 text-sm normal-case tracking-normal text-[var(--color-ivory)] outline-none transition focus:border-[var(--color-gold)]";

const selectClassName = "appearance-none pr-12";

const selectIconClassName =
  "pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-mist)] opacity-80";

const fieldLabelClassName =
  "grid gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-mist)]";

const optionGroupClassName =
  "rounded-[1.25rem] border border-white/10 bg-black/20 p-4 text-sm normal-case tracking-normal text-[var(--color-ivory)]";

const optionClassName = "flex items-start gap-3";

const optionControlClassName =
  "mt-1 h-4 w-4 accent-[var(--color-gold)]";

const sectionTitleClassName =
  "text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)]";

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
        <p className={`${sectionTitleClassName} sm:col-span-2`}>
          1. Datos básicos
        </p>
        <label className={fieldLabelClassName}>
          Nombre
          <input
            type="text"
            name="name"
            placeholder="Tu nombre completo"
            className={inputClassName}
            required
          />
        </label>
        <label className={fieldLabelClassName}>
          Teléfono (obligatorio)
          <input
            type="tel"
            name="phone"
            placeholder="+34 ..."
            className={inputClassName}
            required
          />
        </label>
        <label className={fieldLabelClassName}>
          Email (opcional)
          <input
            type="email"
            name="email"
            placeholder="tu@correo.com"
            className={inputClassName}
          />
        </label>
        <label className={fieldLabelClassName}>
          Ubicación del proyecto
          <input
            type="text"
            name="location"
            placeholder="Ciudad o zona"
            className={inputClassName}
          />
        </label>

        <label className={fieldLabelClassName}>
          <span className={sectionTitleClassName}>2. Tipo de cliente</span>
          <div className="relative">
            <select name="clientType" defaultValue="" className={`${inputClassName} ${selectClassName}`} required>
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="particular">Particular</option>
              <option value="empresa_estudio_interiorista">Empresa / Estudio / Interiorista</option>
            </select>
            <svg viewBox="0 0 12 8" fill="none" className={selectIconClassName} aria-hidden="true">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>

        <label className={fieldLabelClassName}>
          <span className={sectionTitleClassName}>3. Tipo de servicio</span>
          <div className="relative">
            <select name="serviceType" defaultValue="" className={`${inputClassName} ${selectClassName}`} required>
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="solo_instalacion">Solo instalación</option>
              <option value="diseno_instalacion">Diseño + instalación</option>
              <option value="reforma_completa">Reforma completa</option>
              <option value="asesoramiento">No lo tengo claro (asesoramiento)</option>
            </select>
            <svg viewBox="0 0 12 8" fill="none" className={selectIconClassName} aria-hidden="true">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>

        <label className={fieldLabelClassName}>
          <span className={sectionTitleClassName}>4. Estado actual del proyecto</span>
          <div className="relative">
            <select name="projectStatus" defaultValue="" className={`${inputClassName} ${selectClassName}`} required>
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="cocina_comprada">Ya tengo la cocina comprada</option>
              <option value="comparando_opciones">Estoy comparando opciones</option>
              <option value="sin_cocina">Aún no tengo nada</option>
              <option value="obra_en_curso">En obra / reforma en curso</option>
            </select>
            <svg viewBox="0 0 12 8" fill="none" className={selectIconClassName} aria-hidden="true">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>

        <label className={fieldLabelClassName}>
          <span className={sectionTitleClassName}>5. Presupuesto aproximado</span>
          <div className="relative">
            <select name="budget" defaultValue="" className={`${inputClassName} ${selectClassName}`} required>
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="menos_5000">Menos de 5.000 EUR</option>
              <option value="5000_10000">5.000 EUR - 10.000 EUR</option>
              <option value="10000_20000">10.000 EUR - 20.000 EUR</option>
              <option value="mas_20000">+20.000 EUR</option>
            </select>
            <svg viewBox="0 0 12 8" fill="none" className={selectIconClassName} aria-hidden="true">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>

        <label className={fieldLabelClassName}>
          <span className={sectionTitleClassName}>6. Fecha prevista</span>
          <div className="relative">
            <select name="timeline" defaultValue="" className={`${inputClassName} ${selectClassName}`} required>
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="urgente_0_2_semanas">Urgente (0-2 semanas)</option>
              <option value="1_mes">1 mes</option>
              <option value="2_3_meses">2-3 meses</option>
              <option value="solo_mirando">Solo estoy mirando</option>
            </select>
            <svg viewBox="0 0 12 8" fill="none" className={selectIconClassName} aria-hidden="true">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>

        <label className={fieldLabelClassName}>
          <span className={sectionTitleClassName}>7. Tipo de vivienda</span>
          <div className="relative">
            <select name="homeType" defaultValue="" className={`${inputClassName} ${selectClassName}`} required>
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option value="piso">Piso</option>
              <option value="casa">Casa</option>
              <option value="obra_nueva">Obra nueva</option>
              <option value="reforma">Reforma</option>
            </select>
            <svg viewBox="0 0 12 8" fill="none" className={selectIconClassName} aria-hidden="true">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>

        <label className={`${fieldLabelClassName} sm:col-span-2`}>
          <span className={sectionTitleClassName}>8. Medidas aproximadas (opcional)</span>
          <textarea
            rows={3}
            name="measurements"
            placeholder="Si tienes medidas o plano, indicalo aqui"
            className={inputClassName}
          />
        </label>

        <label className={`${fieldLabelClassName} sm:col-span-2`}>
          <span className={sectionTitleClassName}>9. Fotos o planos</span>
          <input
            type="file"
            name="attachments"
            multiple
            accept="image/*,.pdf"
            className={`${inputClassName} file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-gold)] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-black`}
          />
        </label>

        <label className={`${fieldLabelClassName} sm:col-span-2`}>
          <span className={sectionTitleClassName}>10. Comentarios adicionales</span>
          <textarea
            rows={5}
            name="notes"
            placeholder="Cuentame que tienes en mente (estilo, necesidades, electrodomesticos, etc.)"
            className={inputClassName}
          />
        </label>

        <label className={`${optionGroupClassName} ${optionClassName} sm:col-span-2`}>
          <input
            type="checkbox"
            name="privacyAccepted"
            className={optionControlClassName}
            required
          />
          <span>Acepto la política de privacidad</span>
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

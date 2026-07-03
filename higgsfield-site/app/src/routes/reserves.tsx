import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Reveal } from "../components/reveal";
import { createReservation } from "../lib/api/reservations.functions";
import { useLang, useT, type Localized } from "../lib/i18n";
import { SITE } from "../lib/site";

export const Route = createFileRoute("/reserves")({
  head: () => ({
    meta: [
      { title: "Reserves · Rio · Restaurant Marroquí i Pizzeria · Encamp" },
      {
        name: "description",
        content:
          "Reserva taula al Restaurant Rio d'Encamp, Andorra: en línia, per telèfon al +376 732 223 o per WhatsApp.",
      },
    ],
  }),
  component: Reserves,
});

const STR = {
  title: {
    ca: "Et guardem la millor taula",
    es: "Te guardamos la mejor mesa",
    fr: "Nous vous gardons la meilleure table",
    en: "We'll save you the best table",
  } as Localized,
  sub: {
    ca: "Per a grups de més de 6 persones, truca'ns directament. Per a dies festius, et recomanem reservar amb antelació.",
    es: "Para grupos de más de 6 personas, llámanos directamente. Para días festivos, te recomendamos reservar con antelación.",
    fr: "Pour les groupes de plus de 6 personnes, appelez-nous directement. Pour les jours fériés, réservation conseillée.",
    en: "For groups of more than 6, please call us directly. On holidays we recommend booking ahead.",
  } as Localized,
  call: { ca: "Truca", es: "Llama", fr: "Appelez", en: "Call" } as Localized,
  waReply: {
    ca: "Resposta en minuts",
    es: "Respuesta en minutos",
    fr: "Réponse en minutes",
    en: "Reply within minutes",
  } as Localized,
  formTitle: {
    ca: "Reserva en línia",
    es: "Reserva online",
    fr: "Réservation en ligne",
    en: "Book online",
  } as Localized,
  formSub: {
    ca: "Et confirmem en menys d'una hora.",
    es: "Te confirmamos en menos de una hora.",
    fr: "Confirmation en moins d'une heure.",
    en: "We confirm within the hour.",
  } as Localized,
  name: { ca: "Nom", es: "Nombre", fr: "Nom", en: "Name" } as Localized,
  namePh: {
    ca: "El teu nom",
    es: "Tu nombre",
    fr: "Votre nom",
    en: "Your name",
  } as Localized,
  phone: { ca: "Telèfon", es: "Teléfono", fr: "Téléphone", en: "Phone" } as Localized,
  date: { ca: "Data", es: "Fecha", fr: "Date", en: "Date" } as Localized,
  time: { ca: "Hora", es: "Hora", fr: "Heure", en: "Time" } as Localized,
  guests: {
    ca: "Persones",
    es: "Personas",
    fr: "Personnes",
    en: "Guests",
  } as Localized,
  guestsMore: {
    ca: "6+ (truca'ns)",
    es: "6+ (llámanos)",
    fr: "6+ (appelez-nous)",
    en: "6+ (call us)",
  } as Localized,
  emailOpt: {
    ca: "Email (opcional)",
    es: "Email (opcional)",
    fr: "Email (optionnel)",
    en: "Email (optional)",
  } as Localized,
  notes: {
    ca: "Notes (al·lèrgies, ocasió...)",
    es: "Notas (alergias, ocasión...)",
    fr: "Notes (allergies, occasion...)",
    en: "Notes (allergies, occasion...)",
  } as Localized,
  notesPh: {
    ca: "Aniversari, intolerància al gluten, terrassa...",
    es: "Cumpleaños, intolerancia al gluten, terraza...",
    fr: "Anniversaire, intolérance au gluten, terrasse...",
    en: "Birthday, gluten intolerance, terrace...",
  } as Localized,
  submit: {
    ca: "Demanar reserva",
    es: "Solicitar reserva",
    fr: "Demander la réservation",
    en: "Request booking",
  } as Localized,
  submitting: {
    ca: "Enviant...",
    es: "Enviando...",
    fr: "Envoi...",
    en: "Sending...",
  } as Localized,
  success: {
    ca: "Hem rebut la teva sol·licitud. Et trucarem aviat per confirmar.",
    es: "Hemos recibido tu solicitud. Te llamaremos pronto para confirmar.",
    fr: "Nous avons reçu votre demande. Nous vous appellerons bientôt.",
    en: "We've received your request. We'll call you shortly to confirm.",
  } as Localized,
  error: {
    ca: "No s'ha pogut enviar. Revisa el nom i el telèfon, o truca'ns directament.",
    es: "No se ha podido enviar. Revisa el nombre y el teléfono, o llámanos directamente.",
    fr: "Envoi impossible. Vérifiez le nom et le téléphone, ou appelez-nous.",
    en: "Could not send. Check the name and phone number, or call us directly.",
  } as Localized,
};

const TIMES = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const inputClass =
  "w-full rounded-lg border border-rio-line bg-rio-bg px-3.5 py-2.5 text-sm text-rio-cream placeholder:text-rio-muted/70 focus:border-rio-gold focus:outline-none focus:ring-1 focus:ring-rio-gold";

function Reserves() {
  const t = useT();
  const { lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      await createReservation({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          date: String(fd.get("date") ?? ""),
          time: String(fd.get("time") ?? ""),
          guests: String(fd.get("guests") ?? ""),
          email: String(fd.get("email") ?? ""),
          notes: String(fd.get("notes") ?? ""),
          lang,
        },
      });
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold leading-tight text-rio-cream sm:text-6xl">
          {t(STR.title)}
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-rio-muted sm:text-base">
          {t(STR.sub)}
        </p>

        <div className="mt-9 space-y-3">
          <a
            href={SITE.phoneHref}
            className="flex items-center justify-between rounded-xl border border-rio-line/70 bg-rio-surface px-5 py-4 transition-colors hover:border-rio-gold/60"
          >
            <span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-rio-gold">
                {t(STR.call)}
              </span>
              <span className="mt-0.5 block text-lg font-semibold text-rio-cream">
                {SITE.phoneDisplay}
              </span>
            </span>
            <Phone className="size-5 text-rio-gold" strokeWidth={1.8} />
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-between rounded-xl border border-rio-line/70 bg-rio-surface px-5 py-4 transition-colors hover:border-rio-gold/60"
          >
            <span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-rio-gold">
                WhatsApp
              </span>
              <span className="mt-0.5 block text-lg font-semibold text-rio-cream">
                {t(STR.waReply)}
              </span>
            </span>
            <MessageCircle className="size-5 text-rio-gold" strokeWidth={1.8} />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-rio-line/70 bg-rio-surface p-7 sm:p-9"
          noValidate={false}
        >
          <h2 className="font-display text-3xl font-semibold text-rio-cream">
            {t(STR.formTitle)}
          </h2>
          <p className="mt-1.5 text-sm text-rio-muted">{t(STR.formSub)}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="res-name" className="mb-2 block text-xs font-medium uppercase tracking-wide text-rio-cream/80">
                {t(STR.name)}
              </label>
              <input
                id="res-name"
                name="name"
                type="text"
                required
                minLength={2}
                placeholder={t(STR.namePh)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="res-phone" className="mb-2 block text-xs font-medium uppercase tracking-wide text-rio-cream/80">
                {t(STR.phone)}
              </label>
              <input
                id="res-phone"
                name="phone"
                type="tel"
                required
                minLength={6}
                placeholder="+376 ..."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="res-date" className="mb-2 block text-xs font-medium uppercase tracking-wide text-rio-cream/80">
                {t(STR.date)}
              </label>
              <input
                id="res-date"
                name="date"
                type="date"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="res-time" className="mb-2 block text-xs font-medium uppercase tracking-wide text-rio-cream/80">
                {t(STR.time)}
              </label>
              <select id="res-time" name="time" required className={inputClass}>
                {TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="res-guests" className="mb-2 block text-xs font-medium uppercase tracking-wide text-rio-cream/80">
                {t(STR.guests)}
              </label>
              <select
                id="res-guests"
                name="guests"
                required
                defaultValue="2"
                className={inputClass}
              >
                {["1", "2", "3", "4", "5", "6"].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="6+">{t(STR.guestsMore)}</option>
              </select>
            </div>
            <div>
              <label htmlFor="res-email" className="mb-2 block text-xs font-medium uppercase tracking-wide text-rio-cream/80">
                {t(STR.emailOpt)}
              </label>
              <input
                id="res-email"
                name="email"
                type="email"
                placeholder="hola@..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="res-notes" className="mb-2 block text-xs font-medium uppercase tracking-wide text-rio-cream/80">
              {t(STR.notes)}
            </label>
            <textarea
              id="res-notes"
              name="notes"
              rows={3}
              placeholder={t(STR.notesPh)}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-7 w-full rounded-full bg-rio-gold px-7 py-3.5 text-sm font-semibold text-rio-bg transition-transform hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
          >
            {status === "sending" ? t(STR.submitting) : t(STR.submit)}
          </button>

          <div aria-live="polite">
            {status === "ok" && (
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                <Check className="mt-0.5 size-4 shrink-0" />
                {t(STR.success)}
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {t(STR.error)}
              </p>
            )}
          </div>
        </form>
      </Reveal>
    </div>
  );
}

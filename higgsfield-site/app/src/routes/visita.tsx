import { Link, createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { ClientOnly } from "../components/client-only";
import { Reveal } from "../components/reveal";
import { useLang, useT, type Localized } from "../lib/i18n";
import { COMMON, DAYS, SITE } from "../lib/site";

export const Route = createFileRoute("/visita")({
  head: () => ({
    meta: [
      { title: "Visita'ns · Rio · Restaurant Marroquí i Pizzeria · Encamp" },
      {
        name: "description",
        content:
          "On som i quan obrim: Av. de Joan Martí 32, Encamp, Andorra. Obert cada dia de 10:00 a 23:30. Telèfon +376 732 223.",
      },
    ],
  }),
  component: Visita,
});

const STR = {
  title: {
    ca: "Vine a visitar-nos",
    es: "Ven a visitarnos",
    fr: "Venez nous voir",
    en: "Come and visit us",
  } as Localized,
  sub: {
    ca: "A 8 minuts del telecabina Funicamp i del centre d'Encamp. Aparcament gratuït a prop.",
    es: "A 8 minutos del telecabina Funicamp y del centro de Encamp. Aparcamiento gratuito cerca.",
    fr: "À 8 minutes du téléphérique Funicamp et du centre d'Encamp. Parking gratuit à proximité.",
    en: "Eight minutes from the Funicamp gondola and the centre of Encamp. Free parking nearby.",
  } as Localized,
  where: {
    ca: "On som",
    es: "Dónde estamos",
    fr: "Où nous sommes",
    en: "Where we are",
  } as Localized,
  hours: { ca: "Horari", es: "Horario", fr: "Horaires", en: "Hours" } as Localized,
  contact: { ca: "Contacte", es: "Contacto", fr: "Contact", en: "Contact" } as Localized,
  today: { ca: "avui", es: "hoy", fr: "aujourd'hui", en: "today" } as Localized,
  phoneLabel: { ca: "Telèfon", es: "Teléfono", fr: "Téléphone", en: "Phone" } as Localized,
};

/** Day index with Monday first, matching SITE.hours. Client-only. */
function todayIndex() {
  return (new Date().getDay() + 6) % 7;
}

function HoursList() {
  const t = useT();
  const { lang } = useLang();
  return (
    <ul className="mt-4 space-y-2.5">
      {DAYS.map((day, i) => (
        <li
          key={day.ca}
          className="flex items-baseline justify-between gap-4 text-sm"
        >
          <span className="flex items-center gap-2 text-rio-cream/90">
            {day[lang]}
            <ClientOnly>
              {todayIndex() === i && (
                <span className="rounded-full bg-rio-gold/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-rio-gold">
                  {t(STR.today)}
                </span>
              )}
            </ClientOnly>
          </span>
          <span
            aria-hidden
            className="h-px flex-1 self-center border-b border-dotted border-rio-line"
          />
          <span className="whitespace-nowrap text-rio-muted">
            {SITE.open} — {SITE.hours[i].close}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Visita() {
  const t = useT();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold leading-tight text-rio-cream sm:text-6xl">
          {t(STR.title)}
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-rio-muted sm:text-base">
          {t(STR.sub)}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="h-full rounded-2xl border border-rio-line/70 bg-rio-surface p-7">
            <MapPin className="size-5 text-rio-gold" strokeWidth={1.8} />
            <h2 className="mt-4 font-display text-2xl font-semibold text-rio-cream">
              {t(STR.where)}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-rio-muted">
              <strong className="text-rio-cream">Restaurant Rio</strong>
              {SITE.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={SITE.mapsHref}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-block text-sm font-medium text-rio-gold hover:underline"
            >
              {t(COMMON.openMaps)} →
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-2xl border border-rio-line/70 bg-rio-surface p-7">
            <Clock className="size-5 text-rio-gold" strokeWidth={1.8} />
            <h2 className="mt-4 font-display text-2xl font-semibold text-rio-cream">
              {t(STR.hours)}
            </h2>
            <HoursList />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="h-full rounded-2xl border border-rio-line/70 bg-rio-surface p-7">
            <Phone className="size-5 text-rio-gold" strokeWidth={1.8} />
            <h2 className="mt-4 font-display text-2xl font-semibold text-rio-cream">
              {t(STR.contact)}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-rio-cream/90">{t(STR.phoneLabel)}</span>
                <a className="text-rio-muted hover:text-rio-gold" href={SITE.phoneHref}>
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-rio-cream/90">WhatsApp</span>
                <a
                  className="text-rio-muted hover:text-rio-gold"
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-rio-cream/90">Email</span>
                <a
                  className="text-rio-muted hover:text-rio-gold"
                  href={`mailto:${SITE.email}`}
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-rio-cream/90">Google</span>
                <span className="text-rio-muted">
                  ★ {SITE.rating} · {SITE.reviews}
                </span>
              </li>
            </ul>
            <Link
              to="/reserves"
              className="mt-5 inline-block text-sm font-medium text-rio-gold hover:underline"
            >
              {t(COMMON.bookTable)} →
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-6">
        <div className="overflow-hidden rounded-2xl border border-rio-line/70">
          <iframe
            title="Mapa: Rio, Av. de Joan Martí 32, Encamp, Andorra"
            src={SITE.mapsEmbedSrc}
            className="h-[380px] w-full"
            style={{ border: 0, filter: "grayscale(0.2)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </div>
  );
}

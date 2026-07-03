import { Link } from "@tanstack/react-router";
import { useT, type Localized } from "../lib/i18n";
import { NAV, SITE } from "../lib/site";

const TAGLINE: Localized = {
  ca: "Restaurant marroquí i pizzeria 100% Halal a Encamp, Andorra. Cuina familiar des de fa anys.",
  es: "Restaurante marroquí y pizzería 100% Halal en Encamp, Andorra. Cocina familiar desde hace años.",
  fr: "Restaurant marocain et pizzeria 100% Halal à Encamp, Andorre. Cuisine familiale depuis des années.",
  en: "Moroccan restaurant and pizzeria, 100% Halal, in Encamp, Andorra. Family cooking for years.",
};

const WHERE: Localized = {
  ca: "On som",
  es: "Dónde estamos",
  fr: "Où nous sommes",
  en: "Where we are",
};

const CONTACT: Localized = {
  ca: "Contacta",
  es: "Contacta",
  fr: "Contact",
  en: "Contact",
};

const LINKS_LABEL: Localized = {
  ca: "Enllaços",
  es: "Enlaces",
  fr: "Liens",
  en: "Links",
};

const MADE: Localized = {
  ca: "Fet amb cura · 100% Halal",
  es: "Hecho con cariño · 100% Halal",
  fr: "Fait avec soin · 100% Halal",
  en: "Made with care · 100% Halal",
};

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-rio-line/60 bg-rio-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <span className="font-display text-3xl font-semibold text-rio-cream">
            Rio
          </span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-rio-muted">
            {t(TAGLINE)}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rio-gold">
            {t(WHERE)}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-rio-muted">
            {SITE.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rio-gold">
            {t(CONTACT)}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-rio-muted">
            <li>
              <a className="hover:text-rio-cream" href={SITE.phoneHref}>
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="hover:text-rio-cream"
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a className="hover:text-rio-cream" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-rio-gold">
            {t(LINKS_LABEL)}
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-rio-muted">
            <li>
              <Link className="hover:text-rio-cream" to="/carta">
                {t(NAV.menu)}
              </Link>
            </li>
            <li>
              <Link className="hover:text-rio-cream" to="/galeria">
                {t(NAV.gallery)}
              </Link>
            </li>
            <li>
              <Link className="hover:text-rio-cream" to="/visita">
                {t(NAV.visit)}
              </Link>
            </li>
            <li>
              <Link className="hover:text-rio-cream" to="/reserves">
                {t(NAV.reserve)}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rio-line/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-rio-muted sm:px-6">
          <span>© 2026 Restaurant Rio · Encamp, Andorra</span>
          <span>{t(MADE)}</span>
        </div>
      </div>
    </footer>
  );
}

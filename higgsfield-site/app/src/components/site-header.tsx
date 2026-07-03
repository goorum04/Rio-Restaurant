import { Link, useRouterState } from "@tanstack/react-router";
import { Phone, X, Menu as MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LANGS, useLang, useT } from "../lib/i18n";
import { NAV, SITE } from "../lib/site";

const LINKS = [
  { to: "/", label: NAV.home },
  { to: "/carta", label: NAV.menu },
  { to: "/galeria", label: NAV.gallery },
  { to: "/visita", label: NAV.visit },
  { to: "/reserves", label: NAV.reserve },
] as const;

export function SiteHeader() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close the mobile panel on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rio-line/60 bg-rio-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Rio — Inici">
          <span className="grid size-9 place-items-center rounded-full bg-rio-navy font-display text-lg font-semibold text-rio-gold ring-1 ring-rio-gold/40">
            R
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-semibold tracking-wide text-rio-cream">
              Rio
            </span>
            <span className="block text-[11px] tracking-[0.14em] text-rio-muted">
              ENCAMP · ANDORRA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-rio-cream/80 transition-colors hover:text-rio-gold [&.active]:text-rio-gold"
              activeOptions={{ exact: link.to === "/" }}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-1 rounded-full border border-rio-line px-1.5 py-1 sm:flex"
            role="group"
            aria-label="Language"
          >
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide transition-colors ${
                  lang === code
                    ? "bg-rio-gold text-rio-bg"
                    : "text-rio-muted hover:text-rio-cream"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-rio-gold px-4 py-2 text-sm font-semibold text-rio-bg transition-transform hover:brightness-110 active:scale-[0.98] md:flex"
          >
            <Phone className="size-4" strokeWidth={2} />
            732 223
          </a>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-rio-line text-rio-cream lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Tancar menú" : "Obrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-rio-line/60 bg-rio-bg px-4 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="border-b border-rio-line/40 py-3 font-display text-2xl text-rio-cream [&.active]:text-rio-gold"
                activeOptions={{ exact: link.to === "/" }}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1 rounded-full border border-rio-line px-1.5 py-1">
              {LANGS.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase ${
                    lang === code
                      ? "bg-rio-gold text-rio-bg"
                      : "text-rio-muted"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 rounded-full bg-rio-gold px-4 py-2 text-sm font-semibold text-rio-bg"
            >
              <Phone className="size-4" strokeWidth={2} />
              732 223
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

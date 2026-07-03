import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "../components/reveal";
import { useT, type Localized } from "../lib/i18n";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria · Rio · Restaurant Marroquí i Pizzeria · Encamp" },
      {
        name: "description",
        content:
          "Fotos del Restaurant Rio a Encamp, Andorra: tajín, cuscús reial, pizza artesana i l'ambient del local.",
      },
    ],
  }),
  component: Galeria,
});

const STR = {
  title: {
    ca: "La cuina, de prop",
    es: "La cocina, de cerca",
    fr: "La cuisine, de près",
    en: "The kitchen, up close",
  } as Localized,
  sub: {
    ca: "Plats de veritat, fets cada dia a la nostra cuina d'Encamp.",
    es: "Platos de verdad, hechos cada día en nuestra cocina de Encamp.",
    fr: "De vrais plats, préparés chaque jour dans notre cuisine d'Encamp.",
    en: "Real dishes, made every day in our Encamp kitchen.",
  } as Localized,
  close: { ca: "Tancar", es: "Cerrar", fr: "Fermer", en: "Close" } as Localized,
};

const PHOTOS: { src: string; alt: Localized; tall?: boolean }[] = [
  {
    src: "/photos/tajin-hero.jpg",
    alt: {
      ca: "Tajín de xai amb verdures i te de menta",
      es: "Tajín de cordero con verduras y té de menta",
      fr: "Tajine d'agneau aux légumes et thé à la menthe",
      en: "Lamb tagine with vegetables and mint tea",
    },
    tall: true,
  },
  {
    src: "/photos/pizza-elrio.jpg",
    alt: {
      ca: "Pizza Rio artesana acabada de sortir del forn",
      es: "Pizza Rio artesana recién salida del horno",
      fr: "Pizza Rio artisanale à la sortie du four",
      en: "Artisan Rio pizza fresh from the oven",
    },
  },
  {
    src: "/assets/hero-tajine.webp",
    alt: {
      ca: "El menjador del Rio amb llums marroquines",
      es: "El comedor del Rio con lámparas marroquíes",
      fr: "La salle du Rio aux lanternes marocaines",
      en: "Rio's dining room lit by Moroccan lanterns",
    },
  },
  {
    src: "/photos/cuscus-reial.jpg",
    alt: {
      ca: "Cuscús reial amb xai, pollastre i merguez",
      es: "Cuscús real con cordero, pollo y merguez",
      fr: "Couscous royal à l'agneau, poulet et merguez",
      en: "Royal couscous with lamb, chicken and merguez",
    },
    tall: true,
  },
  {
    src: "/photos/tajin-xai.jpg",
    alt: {
      ca: "Tajín de xai amb prunes i ametlles",
      es: "Tajín de cordero con ciruelas y almendras",
      fr: "Tajine d'agneau aux pruneaux et amandes",
      en: "Lamb tagine with prunes and almonds",
    },
  },
];

function Galeria() {
  const t = useT();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Close the lightbox with Escape.
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6">
      <Reveal>
        <h1 className="font-display text-5xl font-semibold leading-tight text-rio-cream sm:text-6xl">
          {t(STR.title)}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-rio-muted sm:text-base">
          {t(STR.sub)}
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {PHOTOS.map((photo, i) => (
          <Reveal
            key={photo.src}
            delay={(i % 3) * 0.08}
            className={photo.tall ? "row-span-2" : ""}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group block size-full overflow-hidden rounded-xl border border-rio-line/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rio-gold"
            >
              <img
                src={photo.src}
                alt={t(photo.alt)}
                loading="lazy"
                className={`size-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  photo.tall ? "min-h-full" : "aspect-[4/3]"
                }`}
              />
            </button>
          </Reveal>
        ))}
      </div>

      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(PHOTOS[openIdx].alt)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-rio-deep/95 p-4 backdrop-blur-sm"
          onClick={() => setOpenIdx(null)}
        >
          <button
            type="button"
            aria-label={t(STR.close)}
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-rio-line text-rio-cream hover:text-rio-gold"
            onClick={() => setOpenIdx(null)}
          >
            <X className="size-5" />
          </button>
          <figure
            className="max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={PHOTOS[openIdx].src}
              alt={t(PHOTOS[openIdx].alt)}
              className="max-h-[80dvh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-rio-muted">
              {t(PHOTOS[openIdx].alt)}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

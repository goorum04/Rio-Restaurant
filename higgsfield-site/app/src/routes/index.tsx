import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Star } from "lucide-react";
import { CountUp } from "../components/count-up";
import { Reveal } from "../components/reveal";
import { StructuredData } from "../components/StructuredData";
import { useT, type Localized } from "../lib/i18n";
import { COMMON, SITE } from "../lib/site";

export const Route = createFileRoute("/")({
  component: Index,
});

const RESTAURANT_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Rio",
  alternateName: "Restaurant Rio Encamp",
  image: "/photos/tajin-hero.jpg",
  telephone: "+376732223",
  priceRange: "€€",
  servesCuisine: ["Moroccan", "Mediterranean", "Italian", "Halal"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. de Joan Martí, 32",
    addressLocality: "Encamp",
    postalCode: "AD200",
    addressCountry: "AD",
  },
  geo: { "@type": "GeoCoordinates", latitude: 42.5341, longitude: 1.5816 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "10:00",
      closes: "23:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "10:00",
      closes: "00:00",
    },
  ],
  acceptsReservations: "True",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.2",
    reviewCount: "329",
  },
});

const STR = {
  overline: {
    ca: "Encamp · Andorra · 100% Halal",
    es: "Encamp · Andorra · 100% Halal",
    fr: "Encamp · Andorre · 100% Halal",
    en: "Encamp · Andorra · 100% Halal",
  } as Localized,
  h1a: {
    ca: "Sabors del Marroc",
    es: "Sabores de Marruecos",
    fr: "Saveurs du Maroc",
    en: "Flavours of Morocco",
  } as Localized,
  h1b: {
    ca: "al cor d'Andorra",
    es: "en el corazón de Andorra",
    fr: "au cœur de l'Andorre",
    en: "in the heart of Andorra",
  } as Localized,
  lead: {
    ca: "Tajín, cuscús, pizzes artesanes i carns a la brasa. Cuina familiar amb ingredients honestos.",
    es: "Tajín, cuscús, pizzas artesanas y carnes a la brasa. Cocina familiar con ingredientes honestos.",
    fr: "Tajine, couscous, pizzas artisanales et grillades. Cuisine familiale aux ingrédients honnêtes.",
    en: "Tagine, couscous, artisan pizzas and grilled meats. Family cooking with honest ingredients.",
  } as Localized,
  specialtiesTitle: {
    ca: "Tres plats que has de tastar",
    es: "Tres platos que tienes que probar",
    fr: "Trois plats incontournables",
    en: "Three dishes you must try",
  } as Localized,
  specialtiesSub: {
    ca: "Receptes que viatgen del nord d'Àfrica a la Mediterrània. Tot cuinat a casa, cada dia.",
    es: "Recetas que viajan del norte de África al Mediterráneo. Todo cocinado en casa, cada día.",
    fr: "Des recettes du Maghreb à la Méditerranée. Tout cuisiné maison, chaque jour.",
    en: "Recipes that travel from North Africa to the Mediterranean. All cooked in-house, every day.",
  } as Localized,
  fullMenu: {
    ca: "Veure la carta completa",
    es: "Ver la carta completa",
    fr: "Voir la carte complète",
    en: "See the full menu",
  } as Localized,
  statReviews: {
    ca: "ressenyes Google",
    es: "reseñas Google",
    fr: "avis Google",
    en: "Google reviews",
  } as Localized,
  statHalal: {
    ca: "carn Halal certificada",
    es: "carne Halal certificada",
    fr: "viande Halal certifiée",
    en: "certified Halal meat",
  } as Localized,
  statPrice: {
    ca: "preu per persona",
    es: "precio por persona",
    fr: "prix par personne",
    en: "price per person",
  } as Localized,
  statOpen: {
    ca: "cuina oberta cada dia",
    es: "cocina abierta cada día",
    fr: "cuisine ouverte tous les jours",
    en: "kitchen open daily",
  } as Localized,
  visitTitle: {
    ca: "A l'avinguda Joan Martí, Encamp",
    es: "En la avenida Joan Martí, Encamp",
    fr: "Avenue Joan Martí, Encamp",
    en: "On Avinguda Joan Martí, Encamp",
  } as Localized,
  visitBody: {
    ca: "A 8 minuts del telecabina Funicamp i del centre d'Encamp, amb aparcament gratuït a prop. Un menjador càlid amb llums del Marroc i la muntanya a la finestra.",
    es: "A 8 minutos del telecabina Funicamp y del centro de Encamp, con aparcamiento gratuito cerca. Un comedor cálido con luces de Marruecos y la montaña en la ventana.",
    fr: "À 8 minutes du téléphérique Funicamp et du centre d'Encamp, parking gratuit à proximité. Une salle chaleureuse aux lumières du Maroc, la montagne à la fenêtre.",
    en: "Eight minutes from the Funicamp gondola and the centre of Encamp, with free parking nearby. A warm dining room lit by Moroccan lanterns, mountains at the window.",
  } as Localized,
  visitCta: {
    ca: "Com arribar-hi",
    es: "Cómo llegar",
    fr: "Comment venir",
    en: "How to find us",
  } as Localized,
  ctaTitle: {
    ca: "Et guardem la millor taula",
    es: "Te guardamos la mejor mesa",
    fr: "Nous vous gardons la meilleure table",
    en: "We'll save you the best table",
  } as Localized,
  ctaBody: {
    ca: "Reserva en línia i et confirmem en menys d'una hora. Per a grups grans, truca'ns.",
    es: "Reserva online y te confirmamos en menos de una hora. Para grupos grandes, llámanos.",
    fr: "Réservez en ligne, confirmation en moins d'une heure. Pour les grands groupes, appelez-nous.",
    en: "Book online and we confirm within the hour. For large groups, call us.",
  } as Localized,
};

const SPECIALTIES = [
  {
    img: "/photos/tajin-hero.jpg",
    num: "N° 01",
    cat: { ca: "Marroquí", es: "Marroquí", fr: "Marocain", en: "Moroccan" } as Localized,
    name: {
      ca: "Tajín de xai amb prunes",
      es: "Tajín de cordero con ciruelas",
      fr: "Tajine d'agneau aux pruneaux",
      en: "Lamb tagine with prunes",
    } as Localized,
    desc: {
      ca: "Espatlla de xai cuita lentament amb prunes, ametlles torrades i sèsam.",
      es: "Espalda de cordero cocinada lentamente con ciruelas, almendras tostadas y sésamo.",
      fr: "Épaule d'agneau mijotée aux pruneaux, amandes torréfiées et sésame.",
      en: "Lamb shoulder slow-cooked with prunes, toasted almonds and sesame.",
    } as Localized,
    price: "17,00 €",
    pos: "center 35%",
  },
  {
    img: "/photos/pizza-elrio.jpg",
    num: "N° 02",
    cat: { ca: "Pizza", es: "Pizza", fr: "Pizza", en: "Pizza" } as Localized,
    name: {
      ca: "Pizza Rio",
      es: "Pizza Rio",
      fr: "Pizza Rio",
      en: "Rio Pizza",
    } as Localized,
    desc: {
      ca: "La nostra signatura: carn picada especiada, ceba caramel·litzada, olives kalamata i menta fresca.",
      es: "Nuestra firma: carne picada especiada, cebolla caramelizada, aceitunas kalamata y menta fresca.",
      fr: "Notre signature : viande hachée épicée, oignon caramélisé, olives kalamata et menthe fraîche.",
      en: "Our signature: spiced minced meat, caramelised onion, kalamata olives and fresh mint.",
    } as Localized,
    price: "13,00 €",
    pos: "center 55%",
  },
  {
    img: "/photos/cuscus-reial.jpg",
    num: "N° 03",
    cat: { ca: "Marroquí", es: "Marroquí", fr: "Marocain", en: "Moroccan" } as Localized,
    name: {
      ca: "Cuscús reial",
      es: "Cuscús real",
      fr: "Couscous royal",
      en: "Royal couscous",
    } as Localized,
    desc: {
      ca: "Sémola amb xai, pollastre, merguez i set verdures de temporada. Per compartir.",
      es: "Sémola con cordero, pollo, merguez y siete verduras de temporada. Para compartir.",
      fr: "Semoule à l'agneau, poulet, merguez et sept légumes de saison. À partager.",
      en: "Semolina with lamb, chicken, merguez and seven seasonal vegetables. To share.",
    } as Localized,
    price: "16,00 €",
    pos: "center 45%",
  },
];

const MARQUEE = [
  "Tajín",
  "Cuscús reial",
  "Pizza artesana",
  "A la brasa",
  "100% Halal",
  "Te de menta",
];

function Index() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <div>
      <StructuredData json={RESTAURANT_JSONLD} />

      {/* HERO — full-bleed generated image, left-anchored content */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/assets/hero-tajine.webp"
            alt=""
            aria-hidden
            className="rio-kenburns size-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rio-bg via-rio-bg/55 to-rio-bg/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-rio-bg/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-rio-gold">
              {t(STR.overline)}
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-rio-cream sm:text-6xl lg:text-7xl">
              {t(STR.h1a)}{" "}
              <em className="pb-1 italic leading-[1.1] text-rio-gold-soft">
                {t(STR.h1b)}
              </em>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-rio-cream/85 sm:text-lg">
              {t(STR.lead)}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/reserves"
                className="rounded-full bg-rio-gold px-7 py-3 text-sm font-semibold text-rio-bg transition-transform hover:brightness-110 active:scale-[0.98]"
              >
                {t(COMMON.bookTable)}
              </Link>
              <Link
                to="/carta"
                className="rounded-full border border-rio-cream/40 px-7 py-3 text-sm font-semibold text-rio-cream backdrop-blur-sm transition-colors hover:border-rio-gold hover:text-rio-gold"
              >
                {t(COMMON.seeMenu)}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-rio-line/60 bg-rio-deep py-4">
        <div className="rio-marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-xl italic text-rio-cream/70"
            >
              {item}
              <span aria-hidden className="text-sm not-italic text-rio-gold">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* SPECIALTIES */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-md font-display text-4xl font-semibold leading-tight text-rio-cream sm:text-5xl">
              {t(STR.specialtiesTitle)}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-rio-muted">
              {t(STR.specialtiesSub)}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SPECIALTIES.map((dish, i) => (
            <Reveal key={dish.num} delay={i * 0.12}>
              <article className="group overflow-hidden rounded-2xl border border-rio-line/70 bg-rio-surface">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.img}
                    alt={t(dish.name)}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: dish.pos }}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-rio-bg/80 px-3 py-1 text-[11px] font-medium tracking-wide text-rio-gold backdrop-blur-sm">
                    {dish.num}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-rio-gold">
                    {t(dish.cat)}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-rio-cream">
                    {t(dish.name)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-rio-muted">
                    {t(dish.desc)}
                  </p>
                  <p className="mt-4 font-display text-xl text-rio-gold-soft">
                    {dish.price}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            to="/carta"
            className="inline-block rounded-full border border-rio-gold/60 px-7 py-3 text-sm font-semibold text-rio-gold transition-colors hover:bg-rio-gold hover:text-rio-bg"
          >
            {t(STR.fullMenu)}
          </Link>
        </Reveal>
      </section>

      {/* STATS — zellige texture band with animated numbers */}
      <section className="relative overflow-hidden border-y border-rio-line/60">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url(/assets/zellige.webp)",
            backgroundSize: "420px",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-rio-deep/80" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
          <div className="text-center">
            <p className="font-display text-5xl font-semibold text-rio-cream">
              {SITE.rating}
              <span className="text-rio-gold"> ★</span>
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-rio-muted">
              <CountUp to={SITE.reviews} /> {t(STR.statReviews)}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-5xl font-semibold text-rio-cream">
              <CountUp to={100} />
              <span className="text-rio-gold">%</span>
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-rio-muted">
              {t(STR.statHalal)}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-5xl font-semibold text-rio-cream">
              10–20<span className="text-rio-gold">€</span>
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-rio-muted">
              {t(STR.statPrice)}
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-5xl font-semibold text-rio-cream">
              23<span className="text-rio-gold">:</span>30
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-rio-muted">
              {t(STR.statOpen)}
            </p>
          </div>
        </div>
      </section>

      {/* VISIT TEASER */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 md:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-rio-line/70">
            <img
              src="/photos/tajin-xai.jpg"
              alt="Tajín de xai amb te de menta"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-center gap-2 text-rio-gold">
            <MapPin className="size-4" strokeWidth={2} />
            <span className="text-xs font-medium uppercase tracking-[0.18em]">
              Av. de Joan Martí, 32
            </span>
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-rio-cream sm:text-5xl">
            {t(STR.visitTitle)}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-rio-muted sm:text-base">
            {t(STR.visitBody)}
          </p>
          <Link
            to="/visita"
            className="mt-7 inline-block rounded-full border border-rio-gold/60 px-6 py-2.5 text-sm font-semibold text-rio-gold transition-colors hover:bg-rio-gold hover:text-rio-bg"
          >
            {t(STR.visitCta)}
          </Link>
        </Reveal>
      </section>

      {/* CTA BAND */}
      <section className="border-t border-rio-line/60 bg-rio-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <div className="flex items-center gap-1 text-rio-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${i < 4 ? "fill-current" : "fill-transparent"}`}
                strokeWidth={1.5}
              />
            ))}
            <span className="ml-2 text-sm text-rio-muted">
              {SITE.rating} · {SITE.reviews} {t(COMMON.googleReviews)}
            </span>
          </div>
          <h2 className="max-w-xl font-display text-4xl font-semibold leading-tight text-rio-cream sm:text-5xl">
            {t(STR.ctaTitle)}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-rio-muted">
            {t(STR.ctaBody)}
          </p>
          <Link
            to="/reserves"
            className="rounded-full bg-rio-gold px-8 py-3 text-sm font-semibold text-rio-bg transition-transform hover:brightness-110 active:scale-[0.98]"
          >
            {t(COMMON.bookTable)}
          </Link>
        </div>
      </section>
    </div>
  );
}

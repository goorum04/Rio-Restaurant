import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/reveal";
import { useT, type Localized } from "../lib/i18n";
import { MENU, type DishTag } from "../lib/menu-data";

export const Route = createFileRoute("/carta")({
  head: () => ({
    meta: [
      { title: "Carta · Rio · Restaurant Marroquí i Pizzeria · Encamp" },
      {
        name: "description",
        content:
          "Carta del Restaurant Rio a Encamp: tajín, cuscús, pizzes artesanes, amanides, pastes, peix i carns a la brasa. 100% Halal.",
      },
    ],
  }),
  component: Carta,
});

const STR = {
  title: {
    ca: "Una taula entre dues ribes",
    es: "Una mesa entre dos orillas",
    fr: "Une table entre deux rives",
    en: "A table between two shores",
  } as Localized,
  sub: {
    ca: "De la pizza italiana al tajín marroquí, tot fet a casa amb productes frescos. Carn 100% Halal.",
    es: "De la pizza italiana al tajín marroquí, todo hecho en casa con productos frescos. Carne 100% Halal.",
    fr: "De la pizza italienne au tajine marocain, tout est fait maison avec des produits frais. Viande 100% Halal.",
    en: "From Italian pizza to Moroccan tagine, all made in-house with fresh produce. 100% Halal meat.",
  } as Localized,
  veggie: { ca: "Veggie", es: "Veggie", fr: "Veggie", en: "Veggie" } as Localized,
  hot: { ca: "Picant", es: "Picante", fr: "Épicé", en: "Spicy" } as Localized,
  house: {
    ca: "De la casa",
    es: "De la casa",
    fr: "Maison",
    en: "House special",
  } as Localized,
};

function TagBadge({ tag }: { tag: DishTag }) {
  const t = useT();
  const styles: Record<DishTag, string> = {
    veggie: "border-emerald-400/50 text-emerald-300",
    hot: "border-orange-400/50 text-orange-300",
    house: "border-rio-gold/60 text-rio-gold",
  };
  const labels: Record<DishTag, Localized> = {
    veggie: STR.veggie,
    hot: STR.hot,
    house: STR.house,
  };
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${styles[tag]}`}
    >
      {t(labels[tag])}
    </span>
  );
}

function Carta() {
  const t = useT();

  return (
    <div>
      {/* Page header on zellige texture */}
      <section className="relative overflow-hidden border-b border-rio-line/60">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: "url(/assets/zellige.webp)",
            backgroundSize: "420px",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rio-bg/70 via-rio-deep/85 to-rio-bg" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h1 className="font-display text-5xl font-semibold leading-tight text-rio-cream sm:text-6xl">
            {t(STR.title)}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-rio-muted sm:text-base">
            {t(STR.sub)}
          </p>
        </div>
      </section>

      {/* Sticky category nav */}
      <nav
        aria-label="Categories"
        className="sticky top-16 z-40 border-b border-rio-line/60 bg-rio-bg/90 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          {MENU.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="whitespace-nowrap rounded-full border border-rio-line px-4 py-1.5 text-xs font-medium text-rio-cream/80 transition-colors hover:border-rio-gold hover:text-rio-gold"
            >
              {t(cat.label)}
            </a>
          ))}
        </div>
      </nav>

      {/* Categories */}
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        {MENU.map((cat, ci) => (
          <section
            key={cat.id}
            id={cat.id}
            className="scroll-mt-36 pt-16"
            aria-labelledby={`${cat.id}-title`}
          >
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="font-display text-sm italic text-rio-gold"
                >
                  {String(ci + 1).padStart(2, "0")}
                </span>
                <h2
                  id={`${cat.id}-title`}
                  className="font-display text-3xl font-semibold text-rio-cream sm:text-4xl"
                >
                  {t(cat.label)}
                </h2>
                <span
                  aria-hidden
                  className="h-px flex-1 translate-y-[-6px] bg-rio-line"
                />
              </div>
            </Reveal>

            <div className="mt-8 grid gap-x-12 gap-y-7 md:grid-cols-2">
              {cat.dishes.map((dish) => (
                <article key={dish.name.ca}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold text-rio-cream">
                      {t(dish.name)}
                    </h3>
                    {dish.tag && <TagBadge tag={dish.tag} />}
                    <span
                      aria-hidden
                      className="h-px flex-1 self-center border-b border-dotted border-rio-line"
                    />
                    <span className="whitespace-nowrap font-display text-lg text-rio-gold-soft">
                      {dish.price} €
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-rio-muted">
                    {t(dish.desc)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

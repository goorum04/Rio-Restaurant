# Rio · Web multipàgina (Higgsfield)

Còpia del codi font de la nova web del Restaurant Rio, construïda i desplegada
amb el website builder de Higgsfield (React 19 + TanStack Start, servida com a
Cloudflare Worker amb SSR).

- **Preview desplegada:** https://preview--crisp-comet-318.higgsfield.app
- **Repo de desplegament:** gestionat per Higgsfield (`crisp-comet-318`); aquest
  directori és un mirall del seu contingut. Per editar i desplegar, treballa
  contra el repo de Higgsfield i executa `deploy_website`.

## Pàgines

| Ruta | Contingut |
|---|---|
| `/` | Inici: hero amb imatge generada, especialitats, xifres, avanç de visita |
| `/carta` | Carta completa (8 categories, 45 plats) amb navegació enganxosa |
| `/galeria` | Galeria amb lightbox |
| `/visita` | Adreça, horari (amb dia actual destacat), contacte i mapa |
| `/reserves` | Formulari de reserva desat a D1 + telèfon i WhatsApp |

## Característiques

- Idiomes: català (per defecte), castellà, francès i anglès, amb persistència
  a `localStorage` (`app/src/lib/i18n.tsx`).
- Reserves desades a Cloudflare D1 via server function
  (`app/src/lib/api/reservations.functions.ts`, migració
  `app/migrations/0002_reservations.sql`).
- Imatges generades amb Higgsfield a `app/public/assets/` i fotos reals del
  restaurant a `app/public/photos/`.
- SEO: JSON-LD de restaurant, títols i descripcions per pàgina, sitemap i
  robots.txt.

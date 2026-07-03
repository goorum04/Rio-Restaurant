/**
 * Restaurant facts shared across pages. Single source of truth for contact
 * details, hours and external links.
 */
import type { Localized } from "./i18n";

export const SITE = {
  name: "Rio",
  phoneDisplay: "+376 732 223",
  phoneHref: "tel:+376732223",
  whatsappHref:
    "https://wa.me/376732223?text=Hola%2C+vull+reservar+taula+al+Rio",
  email: "hola@elrio-encamp.com",
  address: ["Av. de Joan Martí, 32", "AD200 Encamp", "Andorra"],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=El+Rio+Av+Joan+Marti+32+Encamp+Andorra",
  mapsEmbedSrc:
    "https://maps.google.com/maps?q=El+Rio+Restaurant+Av+de+Joan+Mart%C3%AD+32+Encamp+Andorra&hl=ca&z=17&output=embed",
  rating: "4,2",
  reviews: 329,
  // [dayIndexMondayFirst] -> opening hours
  hours: [
    { close: "23:30" }, // Mon
    { close: "23:30" }, // Tue
    { close: "23:30" }, // Wed
    { close: "23:30" }, // Thu
    { close: "00:00" }, // Fri
    { close: "00:00" }, // Sat
    { close: "23:30" }, // Sun
  ],
  open: "10:00",
};

export const DAYS: Localized[] = [
  { ca: "Dilluns", es: "Lunes", fr: "Lundi", en: "Monday" },
  { ca: "Dimarts", es: "Martes", fr: "Mardi", en: "Tuesday" },
  { ca: "Dimecres", es: "Miércoles", fr: "Mercredi", en: "Wednesday" },
  { ca: "Dijous", es: "Jueves", fr: "Jeudi", en: "Thursday" },
  { ca: "Divendres", es: "Viernes", fr: "Vendredi", en: "Friday" },
  { ca: "Dissabte", es: "Sábado", fr: "Samedi", en: "Saturday" },
  { ca: "Diumenge", es: "Domingo", fr: "Dimanche", en: "Sunday" },
];

export const NAV = {
  home: { ca: "Inici", es: "Inicio", fr: "Accueil", en: "Home" } as Localized,
  menu: { ca: "Carta", es: "Carta", fr: "Carte", en: "Menu" } as Localized,
  gallery: {
    ca: "Galeria",
    es: "Galería",
    fr: "Galerie",
    en: "Gallery",
  } as Localized,
  visit: {
    ca: "Visita'ns",
    es: "Visítanos",
    fr: "Visitez-nous",
    en: "Visit us",
  } as Localized,
  reserve: {
    ca: "Reserves",
    es: "Reservas",
    fr: "Réservations",
    en: "Reservations",
  } as Localized,
};

export const COMMON = {
  bookTable: {
    ca: "Reservar taula",
    es: "Reservar mesa",
    fr: "Réserver une table",
    en: "Book a table",
  } as Localized,
  seeMenu: {
    ca: "Veure la carta",
    es: "Ver la carta",
    fr: "Voir la carte",
    en: "See the menu",
  } as Localized,
  halal: {
    ca: "100% Halal",
    es: "100% Halal",
    fr: "100% Halal",
    en: "100% Halal",
  } as Localized,
  googleReviews: {
    ca: "ressenyes Google",
    es: "reseñas Google",
    fr: "avis Google",
    en: "Google reviews",
  } as Localized,
  perPerson: {
    ca: "per persona",
    es: "por persona",
    fr: "par personne",
    en: "per person",
  } as Localized,
  openMaps: {
    ca: "Obre al Google Maps",
    es: "Abre en Google Maps",
    fr: "Ouvrir sur Google Maps",
    en: "Open in Google Maps",
  } as Localized,
};

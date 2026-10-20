// Everything Florentine might want changed lives here.
// Prices, treatments, durations and reviews come from Treatwell (treatwell.json) — never type them here.

export const site = {
  name: 'La Beauté Kosmetik',
  owner: 'Florentine Stukenkemper',
  fullName: 'La Beauté Kosmetik – Florentine Stukenkemper',
  url: 'https://labeautekosmetik.de',
  claim: 'Professionelle Hautpflege in Bochum',
  quote: 'Nimm dir den Moment – und mach ihn perfekt.',
  address: {
    street: 'I. Parallelstraße 4',
    zip: '44791',
    city: 'Bochum',
    district: 'Innenstadt',
    country: 'DE',
    // TODO: exact coordinates from Google Business Profile (used for structured data when set)
    lat: null as number | null,
    lng: null as number | null,
    transit: 'Haltestelle „Bochum Vonovia Ruhrstadion“ – 3 Gehminuten',
  },
  phone: '+49 15568 710042',
  phoneDisplay: '0155 68 710042',
  whatsapp: '4915568710042',
  // TODO(Florentine): E-Mail-Adresse für Impressum & Kontakt
  email: 'info@labeautekosmetik.de',
  instagram: 'https://www.instagram.com/la.beaute.kosmetik/',
  instagramHandle: '@la.beaute.kosmetik',
  treatwell: 'https://buchung.treatwell.de/ort/la-beaute-kosmetik-florentine-stukenkemper/',
  // Her working days vary (she posts them on Instagram), so we don't print fixed hours.
  hoursNote: 'Termine nach Verfügbarkeit – alle freien Zeiten siehst du direkt in der Online-Buchung.',
  newClientOffer: '10 % auf deine erste Behandlung',
  brands: ['Green Peel® by Dr. med. Christine Schrammek', 'Cure Pen by Cure Concept', 'LASHBOOM Lifting Pro+'],
  openedYear: 2026,
} as const;

export const whatsappLink = (text = 'Hallo Florentine, ich habe eine Frage:') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: 'behandlungen/', label: 'Behandlungen' },
  { href: 'ueber-mich/', label: 'Über mich' },
  { href: 'gutscheine/', label: 'Gutscheine' },
  { href: 'magazin/', label: 'Magazin' },
  { href: 'kontakt/', label: 'Kontakt' },
];

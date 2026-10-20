// schema.org structured data for Google and AI assistants.
import { site } from '../data/site';
import treatwell from '../data/treatwell.json';
import { categories, groupFor } from '../data/treatments';

const abs = (path: string) => new URL(path, site.url).toString();

export function businessSchema() {
  const geo =
    site.address.lat != null
      ? { geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng } }
      : {};
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    '@id': abs('/#business'),
    name: site.fullName,
    alternateName: site.name,
    url: abs('/'),
    telephone: site.phone,
    image: [abs('/images/studio-raum.jpg'), abs('/images/studio-liege.jpg'), abs('/images/studio-wartebereich.jpg')],
    logo: abs('/favicon.svg'),
    priceRange: '€€',
    description:
      'Kosmetikstudio in Bochum-Innenstadt: Green Peel® nach Dr. med. Christine Schrammek, Aquafacial, Microneedling, klassische Gesichtsbehandlungen sowie Lash- und Browlifting.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    ...geo,
    areaServed: { '@type': 'City', name: 'Bochum' },
    founder: { '@type': 'Person', name: site.owner, jobTitle: 'Kosmetikerin' },
    sameAs: [site.instagram, site.treatwell],
    potentialAction: {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: site.treatwell, actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'] },
      result: { '@type': 'Reservation', name: 'Termin buchen' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Behandlungen',
      itemListElement: categories.map((c) => ({
        '@type': 'OfferCatalog',
        name: c.title,
        url: abs(`/behandlungen/${c.slug}/`),
        itemListElement: (groupFor(c)?.items ?? []).map((i) => ({
          '@type': 'Offer',
          price: i.priceFrom,
          priceCurrency: 'EUR',
          itemOffered: { '@type': 'Service', name: i.name },
        })),
      })),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

export function articleSchema(a: { title: string; description: string; path: string; date: Date }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date.toISOString().slice(0, 10),
    url: abs(a.path),
    author: { '@type': 'Person', name: site.owner },
    publisher: { '@id': abs('/#business') },
    inLanguage: 'de-DE',
  };
}

export const treatwellRating = treatwell.rating;

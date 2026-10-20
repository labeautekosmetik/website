// Plain-text summary for AI assistants (llmstxt.org). Generated from the same data as the site,
// so prices stay in sync with Treatwell.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import treatwell from '../data/treatwell.json';
import { categories, euro, itemsFor, minutes } from '../data/treatments';
import { generalFaq } from '../data/faq';

export const GET: APIRoute = async () => {
  const articles = await getCollection('magazin');
  const abs = (p: string) => new URL(p, site.url).toString();
  const lines = [
    `# ${site.fullName}`,
    '',
    `> Kosmetikstudio in Bochum-Innenstadt (${site.address.street}, ${site.address.zip} ${site.address.city}), geführt von Kosmetikerin ${site.owner} seit ${site.openedYear}. Schwerpunkte: Green Peel® nach Dr. med. Christine Schrammek, Aquafacial, Microneedling mit dem Cure Pen inkl. LED-Lichttherapie, klassische Gesichtsbehandlungen, Lash- und Browlifting.`,
    '',
    `- Termine: online über Treatwell (${site.treatwell}). ${site.hoursNote}`,
    `- Telefon/WhatsApp: ${site.phone}`,
    `- Instagram: ${site.instagram}`,
    `- Anfahrt: ${site.address.transit}`,
    `- Bewertung: ${treatwell.rating.average} von 5 aus ${treatwell.rating.count} verifizierten Treatwell-Bewertungen`,
    `- Neukundinnen: ${site.newClientOffer}`,
    `- Gutscheine: für Behandlungen oder Wunschbetrag, Anfrage per WhatsApp oder Kontaktformular`,
    '',
    '## Behandlungen und Preise',
    '',
    ...categories.flatMap((c) => [
      `### ${c.title}`,
      `Seite: ${abs(`/behandlungen/${c.slug}/`)}`,
      ...itemsFor(c).map((i) => {
        const price = i.options.length
          ? i.options.map((o) => `${o.name}: ${euro(o.price)}`).join(', ')
          : euro(i.priceFrom);
        return `- ${i.name}: ${minutes(i.durationMin, i.durationMax)}, ${price}`;
      }),
      '',
    ]),
    '## Häufige Fragen',
    '',
    ...[...generalFaq, ...categories.flatMap((c) => c.faq)].flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Magazin',
    '',
    ...articles.map((a) => `- [${a.data.title}](${abs(`/magazin/${a.id}/`)}): ${a.data.description}`),
    '',
    `Stand der Preise: täglich synchronisiert mit Treatwell.`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

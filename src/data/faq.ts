import { site } from './site';

// General questions (home + /faq). Treatment-specific ones live in treatments.ts.
export const generalFaq = [
  {
    q: 'Wie buche ich einen Termin bei La Beauté Kosmetik?',
    a: 'Am einfachsten online über Treatwell: Klick auf „Termin buchen“, wähl deine Behandlung und eine freie Zeit aus. Alternativ schreib mir gern per WhatsApp oder Instagram.',
  },
  {
    q: 'Gibt es einen Rabatt für Neukundinnen?',
    a: `Ja – als Neukundin bekommst du ${site.newClientOffer}. Sag mir einfach beim Termin Bescheid, dass du zum ersten Mal da bist.`,
  },
  {
    q: 'Welche Behandlung passt zu meiner Haut?',
    a: 'Bei deinem ersten Termin schaue ich mir deine Haut genau an und berate dich ehrlich, welche Behandlung sinnvoll ist. Wenn du unsicher bist, starte mit einer klassischen Gesichtsbehandlung oder schreib mir vorab eine Nachricht.',
  },
  {
    q: 'Wo genau ist das Studio und wie komme ich hin?',
    a: `Du findest mich in der ${site.address.street}, ${site.address.zip} ${site.address.city}. Die Haltestelle „Bochum Vonovia Ruhrstadion“ ist nur 3 Gehminuten entfernt.`,
  },
  {
    q: 'Behandelst du auch Männer?',
    a: 'Ja, natürlich. Alle Gesichtsbehandlungen, Aquafacial, Microneedling und Green Peel® sind für jede Haut da.',
  },
  {
    q: 'Kann ich einen Gutschein verschenken?',
    a: 'Sehr gern! Gutscheine gibt es für eine bestimmte Behandlung oder über einen Wunschbetrag. Schreib mir einfach per WhatsApp oder über das Kontaktformular.',
  },
  {
    q: 'Was mache ich, wenn ich meinen Termin nicht wahrnehmen kann?',
    a: 'Bitte sag so früh wie möglich ab oder verschieb den Termin – direkt über deine Treatwell-Buchung oder per Nachricht an mich. So kann jemand anderes den Termin bekommen.',
  },
];

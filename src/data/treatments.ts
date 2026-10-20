// Editorial copy for the treatment pages. Prices, durations and the list of
// treatments come from Treatwell; this file only adds words around them.
// A treatment that appears on Treatwell but not below still shows up (with its Treatwell text).
import treatwell from './treatwell.json';

export type TreatwellItem = (typeof treatwell.groups)[number]['items'][number];

export interface Category {
  slug: string;
  treatwellGroupId: number;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  imageAlt: string;
  intro: string[];
  idealFor: string[];
  // Shown under the intro, e.g. to route visitors to a better-fitting treatment.
  hint?: { text: string; link?: { label: string; slug: string } };
  // Price shown on category cards instead of the cheapest "ab" price, when that would mislead.
  cardPrice?: (items: TreatwellItem[]) => string;
  reviewKeywords: string[];
  faq: { q: string; a: string }[];
}

const notSuitable = (what: string) => ({
  q: `Wann ist ${what} nicht geeignet?`,
  a: 'Bei Schwangerschaft und Stillzeit, akuten Entzündungen oder Herpes im Behandlungsbereich, offenen Wunden sowie bei bestimmten Medikamenten (z. B. Isotretinoin oder Blutverdünnern) behandle ich nicht oder nur nach Rücksprache mit deiner Ärztin oder deinem Arzt. Sag mir vor dem Termin einfach Bescheid, wenn etwas davon auf dich zutrifft.',
});

export const categories: Category[] = [
  {
    slug: 'klassische-gesichtsbehandlungen',
    treatwellGroupId: 523993001,
    title: 'Klassische Gesichtsbehandlungen',
    short: 'Tiefenreinigung, Pflege und eine Stunde nur für dich – von der kleinen Auszeit bis zur Premium-Behandlung.',
    seoTitle: 'Gesichtsbehandlung in Bochum – Kosmetik bei La Beauté',
    seoDescription:
      'Klassische Gesichtsbehandlungen in Bochum: Reinigung, Ausreinigung, Wirkstoffampulle, Maske und Massage. Auch für unreine Haut. Jetzt online buchen.',
    image: '/images/studio-liege.jpg',
    imageAlt: 'Behandlungsliege mit flauschiger Decke im Studio von La Beauté Kosmetik',
    intro: [
      'Eine klassische Gesichtsbehandlung ist die Basis für schöne Haut: gründlich gereinigt, sanft ausgereinigt und mit genau den Wirkstoffen versorgt, die deine Haut gerade braucht.',
      'Vor jeder Behandlung schaue ich mir deine Haut genau an und erkläre dir, was ich mache und warum. So weißt du immer, was mit deiner Haut passiert – und wie du sie zu Hause am besten pflegst.',
    ],
    idealFor: ['jeden Hauttyp', 'deinen ersten Besuch', 'regelmäßige Pflege alle 4–6 Wochen', 'unreine Haut (Spezialbehandlung)'],
    reviewKeywords: ['Gesichtsbehandlung', 'Auszeit', 'Hautanalyse', 'entspannen', 'erklärt'],
    faq: [
      {
        q: 'Ich habe unreine Haut – welche Behandlung passt?',
        a: 'Für unreine Haut gibt es die Spezialbehandlung mit gründlicher Ausreinigung, klärender Maske und beruhigenden Wirkstoffen. Wenn sich die Haut beruhigt hat, können Aquafacial oder Microneedling der nächste Schritt sein – das besprechen wir gemeinsam.',
      },
      {
        q: 'Welche Gesichtsbehandlung passt für meinen ersten Termin?',
        a: 'Für den Einstieg ist die „Kleine Auszeit“ (60 Minuten) oder der „Hydra Boost“ mit Ausreinigung ideal. Dabei lerne ich deine Haut kennen und kann dir sagen, welche Behandlung als Nächstes sinnvoll ist.',
      },
      {
        q: 'Was ist der Unterschied zwischen Hydra Boost und Premium-Behandlung?',
        a: 'Beide enthalten Reinigung, Peeling mit Bedampfer, Ausreinigung und Massage. Die Premium-Behandlung arbeitet zusätzlich mit enzymatischem Peeling, Skinbooster-Ampulle, Coldhammer und Anti-Age-Maske und dauert etwa 90 Minuten.',
      },
      {
        q: 'Darf ich mich nach der Gesichtsbehandlung schminken?',
        a: 'Am besten gönnst du deiner Haut den restlichen Tag eine Pause von Make-up, damit die Wirkstoffe in Ruhe einziehen können.',
      },
    ],
  },
  {
    slug: 'aquafacial-microneedling',
    treatwellGroupId: 523993002,
    title: 'Aquafacial & Microneedling',
    short: 'Effect Treatments für sichtbar frischere Haut – Aquafacial für Glow, Microneedling für langfristige Hautverbesserung.',
    seoTitle: 'Aquafacial & Microneedling in Bochum – La Beauté Kosmetik',
    seoDescription:
      'Aquafacial und Microneedling mit dem Cure Pen inkl. LED-Lichttherapie in Bochum. Für Glow, feinere Poren und ein ebenmäßigeres Hautbild. Online buchen.',
    image: '/images/studio-raum.jpg',
    imageAlt: 'Behandlungsraum mit LED-Lampe und Wandbild „Warte nicht auf den perfekten Moment“',
    intro: [
      'Das Aquafacial reinigt deine Haut porentief, löst Unreinheiten und versorgt sie gleichzeitig intensiv mit Feuchtigkeit. Du gehst mit einem frischen Glow nach Hause – perfekt vor Events oder einfach als Selfcare-Moment.',
      'Beim Microneedling arbeite ich mit dem Cure Pen von Cure Concept mit eingebauter Lichttherapie. Feine Mikrokanäle regen die hauteigene Kollagenbildung an und helfen, dass Wirkstoffe besser aufgenommen werden. Das ist keine Sofortlösung, sondern baut deine Haut langfristig auf – am besten in mehreren Sitzungen im Abstand von 4–6 Wochen.',
    ],
    idealFor: ['fahle, müde Haut', 'große Poren', 'Unreinheiten (Aquafacial)', 'feine Linien', 'unebenes Hautbild', 'Glow vor Events'],
    hint: {
      text: 'Du hast gerade akute, entzündete Pickel? Dann starten wir lieber mit dem Aquafacial oder der Spezialbehandlung bei unreiner Haut – Microneedling kommt, wenn die Haut ruhiger ist.',
      link: { label: 'Zur Spezialbehandlung bei unreiner Haut', slug: 'klassische-gesichtsbehandlungen' },
    },
    reviewKeywords: ['Microneedling', 'Aquafacial', 'Hautbild', 'Verbesserung', 'Glow'],
    faq: [
      {
        q: 'Aquafacial oder Microneedling – was ist das Richtige für mich?',
        a: 'Das Aquafacial wirkt sofort: Die Haut ist gereinigt, durchfeuchtet und strahlt. Microneedling setzt tiefer an und verbessert das Hautbild über mehrere Wochen. Im Kombipaket bekommst du beides in einer Behandlung.',
      },
      {
        q: 'Wie sieht meine Haut nach dem Microneedling aus?',
        a: 'Etwa 1–3 Tage ist die Haut gerötet wie nach einem leichten Sonnenbrand, empfindlich und eventuell leicht geschwollen. Meide Sonne und nutze täglich LSF 50, verzichte 24–48 Stunden auf Make-up und 2–3 Tage auf Sport, Sauna und Schwimmen. Nach etwa einer Woche ist alles wieder unauffällig.',
      },
      {
        q: 'Wie viele Microneedling-Sitzungen brauche ich?',
        a: 'Für schöne Ergebnisse empfehle ich mehrere Sitzungen im Abstand von 4–6 Wochen. Dafür gibt es das 3er-Paket zum Vorteilspreis.',
      },
      {
        q: 'Wann ist die beste Zeit für Microneedling?',
        a: 'Herbst und Winter sind ideal, weil die Sonne schwächer ist und deine Haut sich in Ruhe regenerieren kann.',
      },
      notSuitable('Microneedling'),
    ],
  },
  {
    slug: 'green-peel',
    treatwellGroupId: 523993003,
    title: 'Green Peel® Kräuterschälkur',
    short: 'Das Original nach Dr. med. Christine Schrammek – vom Frischekick ohne Schälung bis zur intensiven Kräuterschälkur.',
    seoTitle: 'Green Peel® in Bochum – Kräuterschälkur bei La Beauté',
    seoDescription:
      'Green Peel® Kräuterschälkur nach Dr. med. Christine Schrammek in Bochum: Fresh Up, Energy Peeling und Classic – bei Pigmentflecken, großen Poren und müder Haut.',
    image: '/images/studio-detail.jpg',
    imageAlt: 'Taupe-Handtücher und Schälchen, vorbereitet für die Behandlung',
    intro: [
      'Green Peel® ist die Kräuterschälkur nach Dr. med. Christine Schrammek – das Original, das nur in zertifizierten Kosmetikinstituten angeboten wird. Je nach Stufe wird die Haut aufgefrischt oder sie schält sich sanft, und darunter kommt ein frischeres, ebenmäßigeres Hautbild zum Vorschein.',
      'Welche Stufe zu dir passt, besprechen wir vorher in Ruhe. Beim Green Peel® Classic ist nach fünf Tagen eine aufbauende Folgebehandlung (ca. 60 Minuten) bereits inklusive.',
    ],
    idealFor: ['müde, fahle Haut (Fresh Up)', 'Unreinheiten & feine Linien (Energy)', 'große Poren, Pigmentflecken, Narben (Classic)'],
    hint: {
      text: 'Unsicher, welche Stufe passt? Schreib mir vorab per WhatsApp – oder wir entscheiden gemeinsam im Vorgespräch vor der Behandlung.',
    },
    reviewKeywords: ['Green Peel', 'Haut', 'Beratung', 'erklärt', 'kompetent'],
    faq: [
      {
        q: 'Welche Green Peel®-Stufe passt zu mir?',
        a: 'Fresh Up ist ein schneller Frischekick ohne Schälung, ideal für müde, fahle Haut. Das Energy Peeling geht etwas tiefer und eignet sich bei Unreinheiten, Fältchen und Pigmentstörungen – ein Heimpflegeset ist dabei. Green Peel® Classic ist die intensive Kräuterschälkur mit Schälung für große Poren, Narben und Hyperpigmentierung.',
      },
      {
        q: 'Wie lange schält sich die Haut beim Green Peel® Classic?',
        a: 'Die Schälphase dauert meist einige Tage. In dieser Zeit solltest du auf Sonne, Sauna und Make-up verzichten. Nach fünf Tagen folgt bei mir eine kostenfreie aufbauende Behandlung.',
      },
      {
        q: 'Ist Green Peel® für jede Haut geeignet?',
        a: 'In einem Vorgespräch prüfe ich, ob und welche Stufe für deine Haut passt. Bei Schwangerschaft, akuten Hauterkrankungen oder bestimmten Medikamenten sprich bitte vorher mit deiner Ärztin oder deinem Arzt.',
      },
      {
        q: 'Ich habe Pigmentflecken – Energy oder Classic?',
        a: 'Bei leichten Pigmentstörungen ist das Energy Peeling oft ein guter Start, bei ausgeprägter Hyperpigmentierung eher die Classic. Ich schaue mir deine Haut an und wir entscheiden gemeinsam.',
      },
    ],
  },
  {
    slug: 'wimpern-augenbrauen',
    treatwellGroupId: 523993004,
    title: 'Wimpern & Augenbrauen',
    short: 'Lash- und Browlifting, Färben und Zupfen – für einen natürlichen Look ohne Wimpernzange und tägliches Nachzeichnen.',
    seoTitle: 'Lash Lifting & Brow Lifting in Bochum – La Beauté Kosmetik',
    seoDescription:
      'Lash Lifting, Brow Lifting, Wimpern und Augenbrauen färben in Bochum. Natürlicher, gepflegter Look für mehrere Wochen. Termin online buchen.',
    image: '/images/studio-wolke.jpg',
    imageAlt: 'Behandlungsstuhl „die Wolke“ im Studio La Beauté Kosmetik',
    intro: [
      'Ein Wimpernlifting öffnet deinen Blick und lässt deine eigenen Wimpern länger und voller wirken. Beim Browlifting werden deine Härchen so in Form gebracht, dass sie über mehrere Wochen halten und sich leicht stylen lassen.',
      'Ich arbeite mit dem Lifting Pro+ System von LASHBOOM. Färben ist bei beiden Liftings schon inklusive.',
    ],
    idealFor: ['gerade oder helle Wimpern', 'widerspenstige Brauen', 'Urlaub & Sport', 'alle, die morgens Zeit sparen wollen'],
    cardPrice: (items) => {
      const min = (re: RegExp) => Math.min(...items.filter((i) => re.test(i.name)).map((i) => i.priceFrom ?? Infinity));
      return `Lifting ab ${euro(min(/lifting/i))} · Färben ab ${euro(min(/^(?!.*lifting).*färben/i))}`;
    },
    reviewKeywords: ['Wimpern', 'Augenbrauen', 'lieb', 'gerne'],
    faq: [
      {
        q: 'Wie lange hält ein Lash Lifting?',
        a: 'In der Regel mehrere Wochen, bis die Wimpern auf natürliche Weise nachgewachsen sind. Wie lange genau, hängt von deinem Wimpernzyklus ab.',
      },
      {
        q: 'Darf ich nach dem Lifting meine Wimpern nass machen?',
        a: 'Bitte halte Wimpern und Brauen die ersten 24 Stunden trocken und verzichte auf Mascara, damit die Form gut fixiert bleibt.',
      },
      {
        q: 'Kann ich Färben auch einzeln buchen?',
        a: 'Ja – Wimpern und Augenbrauen färben gibt es auch ohne Lifting, auf Wunsch inklusive Zupfen.',
      },
    ],
  },
];

// Side-by-side comparison on the Green Peel page (prices still come from Treatwell via the ids).
export const greenPeelLevels = [
  { id: 'TR6977733', name: 'Fresh Up', idealFor: 'müde, fahle Haut, erste Zeichen der Hautalterung', peeling: 'keine Schälung', sessions: '1 Termin' },
  { id: 'TR6977756', name: 'Energy Peeling', idealFor: 'Unreinheiten, Fältchen, leichte Pigmentstörungen', peeling: 'keine bis leichte Schälung', sessions: '1 Termin + Heimpflegeset' },
  { id: 'TR6977777', name: 'Classic', idealFor: 'große Poren, Narben, ausgeprägte Pigmentflecken', peeling: 'sichtbare Schälung für einige Tage', sessions: '2 Termine (Folgebehandlung inklusive)' },
];

// Short, honest one-liners per Treatwell treatment (keyed by Treatwell id).
// Treatwell copy is reused when an id is missing here.
export const treatmentNotes: Record<string, { lead?: string; steps?: string[] }> = {
  TR6977658: { lead: 'Die sanfte Pause für zwischendurch – Reinigung, Peeling, Wirkstoffampulle und eine kleine Gesichtsmassage.' },
  TR6977659: { lead: 'Feuchtigkeit pur: mit Ausreinigung, Algen-Vitalmaske und Gesichtsmassage.' },
  TR6977660: { lead: 'Meine umfangreichste klassische Behandlung mit Skinbooster, Coldhammer und Anti-Age-Maske.' },
  TR6977661: { lead: 'Speziell für unreine Haut: gründliche Ausreinigung, klärende Maske und beruhigende Wirkstoffe.' },
  TR6977560: { lead: 'Mit dem Cure Pen und hochkonzentriertem Serum, inklusive LED-Lichttherapie. Als Einzelbehandlung oder im 3er-Paket.' },
  TR6977694: { lead: 'Porentiefe Reinigung und intensive Feuchtigkeit in drei Phasen – für sofortigen Glow.' },
  TR6977696: {
    lead: 'Das Aquafacial für Gesicht und Hals, zusätzlich mit Skinbooster-Ampulle.',
    steps: ['Abreinigung', 'Enzymatisches Peeling & Bedampfer', 'Aquafacial in 3 Phasen', 'Maske & Coldhammer', 'Skinbooster-Ampulle', 'Gesichtsmassage', 'Abschlusspflege'],
  },
  TR6977706: { lead: 'Das Beste aus beiden: erst Aquafacial für Reinheit und Feuchtigkeit, dann Microneedling für den langfristigen Effekt.' },
  TR6977733: { lead: 'Frischekick ohne Schälung – ideal bei müder, fahler Haut und ersten Zeichen der Hautalterung.' },
  TR6977756: { lead: 'Vitalisierung mit sichtbar verbessertem Hautbild, ohne oder mit leichter Schälung. Inklusive Heimpflegeset.' },
  TR6977777: { lead: 'Der natürliche Problemlöser mit Schälung, 2 Termine. Nach 5 Tagen folgt eine aufbauende Behandlung (ca. 60 Min.) ohne Aufpreis.' },
  TR7121591: { lead: 'Öffnet den Blick und lässt deine Wimpern länger und voller wirken – inklusive Färben und Pflege.' },
  TR7121604: { lead: 'Gebändigte, volle Brauen für mehrere Wochen – inklusive Färben und Styling.' },
  TR6977723: { lead: 'Das Augen-Trio: Wimpern und Brauen färben plus Zupfen.' },
  TR6977725: { lead: 'Mehr Ausdruck für Wimpern und Brauen.' },
};

export const groupFor = (c: Category) => treatwell.groups.find((g) => g.id === c.treatwellGroupId);

export const itemsFor = (c: Category) => groupFor(c)?.items ?? [];

export const priceFrom = (c: Category) => {
  const prices = itemsFor(c).map((i) => i.priceFrom).filter((p): p is number => p != null);
  return prices.length ? Math.min(...prices) : null;
};

// Treatwell groups we have no editorial page for still deserve to be shown.
export const unmappedGroups = () =>
  treatwell.groups.filter((g) => !categories.some((c) => c.treatwellGroupId === g.id));

export const euro = (n: number | null) =>
  n == null ? '' : new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const minutes = (min: number | null, max: number | null) => {
  if (min == null) return '';
  return max && max !== min ? `${min}–${max} Min.` : `${min} Min.`;
};

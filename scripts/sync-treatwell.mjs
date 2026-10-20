#!/usr/bin/env node
// Reads Florentine's public Treatwell page and writes src/data/treatwell.json.
// Treatwell has no official API: we read the same state JSON the page itself uses.
// If anything looks wrong, we exit non-zero and leave the last good file untouched,
// so the website never shows a broken menu.
//
//   npm run sync:treatwell                 # fetch live page
//   node scripts/sync-treatwell.mjs --file scripts/.sample-treatwell.html

import { readFile, writeFile } from 'node:fs/promises';

const VENUE_URL = 'https://buchung.treatwell.de/ort/la-beaute-kosmetik-florentine-stukenkemper/';
const OUT = new URL('../src/data/treatwell.json', import.meta.url);

async function loadHtml() {
  const i = process.argv.indexOf('--file');
  if (i !== -1) return readFile(process.argv[i + 1], 'utf8');
  const res = await fetch(VENUE_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; labeautekosmetik.de menu sync)',
      'Accept-Language': 'de-DE',
    },
  });
  if (!res.ok) throw new Error(`Treatwell antwortet mit HTTP ${res.status}`);
  return res.text();
}

function extractState(html) {
  const m = html.match(/<script id="state">window\.__state__ = (.*?);?<\/script>/s);
  if (!m) throw new Error('State-JSON nicht gefunden – hat Treatwell die Seite umgebaut?');
  return JSON.parse(m[1]);
}

const num = (s) => (s == null ? null : Number(s));

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü')
    .replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/g, 'ß').replace(/&nbsp;/g, ' ');

// Treatwell descriptions are either "* step" bullet lists or free text.
function parseDescription(raw = '') {
  const text = decode(raw).trim();
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const steps = lines.filter((l) => l.startsWith('*')).map((l) => l.replace(/^\*\s*/, ''));
  const prose = lines.filter((l) => !l.startsWith('*')).join(' ');
  return { steps, text: prose };
}

function mapItem(item) {
  const d = item.data;
  const options = (d.optionGroups ?? []).flatMap((g) =>
    (g.options ?? []).map((o) => ({
      name: o.name,
      price: num(o.priceRange?.minSalePriceAmount),
      durationMinutes: o.durationMinutes ?? null,
    })),
  );
  return {
    id: d.id,
    name: d.name,
    ...parseDescription(d.description),
    priceFrom: num(d.priceRange?.minSalePriceAmount),
    priceTo: num(d.priceRange?.maxSalePriceAmount),
    durationMin: d.durationRange?.minDurationMinutes ?? null,
    durationMax: d.durationRange?.maxDurationMinutes ?? null,
    options: options.length > 1 ? options : [],
  };
}

function transform(state) {
  const v = state.venue.venue;
  const groups = v.menu.menuGroups.map((g) => ({
    id: g.id,
    name: g.name,
    items: g.menuItems.filter((i) => i.type === 'treatment').map(mapItem),
  }));
  const reviews = (state.venue.venueReviews?.reviews ?? []).map((r) => ({
    id: r.id,
    name: r.reviewer?.anonymous ? null : r.reviewer?.name,
    date: r.createdAt?.slice(0, 10),
    rating: r.rating,
    text: r.content?.content?.trim(),
    treatments: r.treatmentNames ?? [],
    response: r.venueResponse?.content?.trim() ?? null,
  }));
  return {
    source: VENUE_URL,
    venueId: v.id,
    name: v.name,
    rating: { average: v.rating?.average ?? null, count: v.rating?.count ?? 0 },
    openingHours: (v.openingHours ?? []).map((o) => ({
      day: o.dayOfWeek,
      open: o.open,
      from: o.from ?? null,
      to: o.to ?? null,
    })),
    groups,
    reviews,
  };
}

function validate(data) {
  const problems = [];
  if (!data.groups.length) problems.push('keine Behandlungsgruppen');
  const items = data.groups.flatMap((g) => g.items);
  if (items.length < 3) problems.push(`nur ${items.length} Behandlungen`);
  for (const i of items) {
    if (!i.name) problems.push('Behandlung ohne Namen');
    if (!(i.priceFrom > 0)) problems.push(`${i.name}: kein Preis`);
  }
  if (problems.length) throw new Error('Unplausible Daten: ' + problems.join(', '));
}

try {
  const data = transform(extractState(await loadHtml()));
  validate(data);
  const json = JSON.stringify(data, null, 2) + '\n';
  let previous = '';
  try {
    previous = await readFile(OUT, 'utf8');
  } catch {}
  if (previous === json) {
    console.log('Treatwell: keine Änderungen.');
  } else {
    await writeFile(OUT, json);
    const n = data.groups.reduce((s, g) => s + g.items.length, 0);
    console.log(`Treatwell: ${n} Behandlungen, ${data.reviews.length} Bewertungen gespeichert.`);
  }
} catch (err) {
  console.error('Treatwell-Sync fehlgeschlagen, alte Daten bleiben:', err.message);
  process.exit(1);
}

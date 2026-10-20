# La Beauté Kosmetik – Website

Website für **La Beauté Kosmetik – Florentine Stukenkemper**, I. Parallelstraße 4, 44791 Bochum.
Domain: `labeautekosmetik.de`. Buchung läuft ausschließlich über Treatwell.

## Befehle

```bash
npm install
npm run dev                # Entwicklung, http://localhost:4321 (Variante C1)
PUBLIC_THEME=c2 npm run dev  # Entwicklung mit Variante C2
npm run build              # Live-Build nach dist/ (Theme über PUBLIC_THEME, Standard c1)
npm run build:previews     # beide Varianten: dist/vorschau-a (C1) + dist/vorschau-b (C2), noindex
npm run sync:treatwell     # Menü, Preise, Bewertungen von Treatwell holen
npm run check              # Typprüfung
```

## Was wo gepflegt wird

| Was | Wo |
|---|---|
| Behandlungen, Preise, Dauer, Bewertungen | **Treatwell** – die Website übernimmt das täglich automatisch (`src/data/treatwell.json`, nie von Hand ändern) |
| Texte rund um die Behandlungen, FAQ je Kategorie | `src/data/treatments.ts` |
| Kontaktdaten, Rabatt, Zitat, Navigation | `src/data/site.ts` |
| Allgemeine FAQ | `src/data/faq.ts` |
| Magazin-Artikel | `src/content/magazin/*.md` |
| Fotos | `public/images/` |

Offene Punkte für Florentine: siehe [`docs/TODO-florentine.md`](docs/TODO-florentine.md).
Übergabe aller Konten an Florentine: siehe [`docs/UEBERGABE.md`](docs/UEBERGABE.md).

## Hosting (Netlify)

1. Repo bei GitHub anlegen und pushen, in Netlify „Import from Git“.
2. `netlify.toml` baut aktuell **beide Vorschauen** (`/vorschau-a/`, `/vorschau-b/`), für Google gesperrt.
3. Nach Florentines Entscheidung: in `netlify.toml` den Build-Befehl auf `npm run build` ändern und in Netlify die Umgebungsvariable `PUBLIC_THEME` auf `c1` oder `c2` setzen.
4. Kontaktformular: Netlify erkennt das Formular `kontakt` automatisch. Unter *Forms → Notifications* eine E-Mail-Benachrichtigung an Florentine einrichten.
5. Domain `labeautekosmetik.de` in Netlify verbinden.

## Treatwell-Sync

`.github/workflows/treatwell-sync.yml` läuft täglich um 06:15 Uhr. Ändert sich etwas, wird `treatwell.json` committet und Netlify baut neu.
Treatwell hat keine offizielle Schnittstelle: Das Skript liest die öffentlichen Daten der Buchungsseite. Wenn Treatwell die Seite umbaut, schlägt der Job fehl, GitHub schickt eine Mail, und die Website zeigt weiter den letzten guten Stand.

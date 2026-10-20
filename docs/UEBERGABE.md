# Übergabe der Konten an Florentine

Ziel: Florentine besitzt am Ende **alle** Konten rund um ihre Website selbst. Marius bleibt (falls gewünscht) mit eingeschränkten Rechten als Helfer dabei. Nichts hängt mehr an seinen privaten Accounts oder seiner Zahlungsmethode.

**Wann:** nach dem Livegang (Variante gewählt, Domain verbunden, Postfach läuft). Am besten in einem gemeinsamen Termin von ca. 1 Stunde – an Florentines Laptop, mit ihrem Handy daneben (für Bestätigungscodes).

## Überblick

| Konto | Heute bei | Was passiert | Kosten |
|---|---|---|---|
| Domain + E-Mail (Strato) | Marius | Vertrag auf Florentine übertragen | laufend, Strato-Tarif |
| GitHub-Organisation `labeautekosmetik` | Marius (Owner) | Florentine wird Owner, Marius Mitglied | kostenlos |
| Netlify (Hosting, Formular) | Marius | Site in Florentines Netlify-Account | kostenlos |
| Treatwell | Florentine | bleibt, nur Kategorien umbenennen | wie bisher |
| Instagram | Florentine | bleibt, Website-Link in die Bio | – |
| Google Unternehmensprofil | (neu) | Florentine Inhaberin, Marius Verwalter | kostenlos |

## Vorbereitung (Florentine, ca. 15 Minuten)

- [ ] **Passwort-Manager** einrichten (z. B. Bitwarden, kostenlos). Alle neuen Zugänge kommen dort hinein – nicht in WhatsApp oder Notizen.
- [ ] **Authenticator-App** aufs Handy (z. B. Google Authenticator oder Microsoft Authenticator). GitHub verlangt Zwei-Faktor-Anmeldung.
- [ ] **GitHub-Account** anlegen (github.com, kostenlos), mit ihrer eigenen E-Mail-Adresse, Zwei-Faktor aktivieren.
- [ ] **Netlify-Account** anlegen über „Sign up with GitHub“ (kostenlos).

## 1. Domain und E-Mail (Strato)

Die Domain `labeautekosmetik.de` und das Postfach `info@labeautekosmetik.de` laufen über den Strato-Vertrag von Marius. Das Postfach zieht mit dem Vertrag um – E-Mails bleiben erhalten.

- [ ] Bei Strato die **Vertragsübernahme** beantragen (Strato-Hilfe → „Vertragsübernahme“ bzw. „Inhaberwechsel“). Dafür unterschreiben beide ein Formular. Florentine hinterlegt dabei ihre eigene Zahlungsmethode.
- [ ] Prüfen: In der Domainverwaltung steht **Florentine als Domain-Inhaberin** (auch bei der DENIC-Abfrage auf denic.de).
- [ ] Florentine ändert das **Strato-Passwort** und das **Postfach-Passwort** von `info@`.
- [ ] Die DNS-Einträge (A-Record auf Netlify, `www` als CNAME, MX bei Strato) **nicht anfassen** – sie bleiben bei der Übernahme gleich. Danach einmal testen: Website lädt, Testmail an `info@` kommt an.

> Falls die Domain noch nicht registriert bzw. aktiv ist: am einfachsten gleich einen neuen Vertrag auf Florentines Namen abschließen, statt später zu übertragen.

## 2. GitHub (Code der Website)

- [ ] Marius lädt Florentine in die Organisation ein: github.com/orgs/labeautekosmetik/people → *Invite member* → Rolle **Owner**.
- [ ] Florentine nimmt die Einladung an.
- [ ] Unter *Settings → General* der Organisation die **E-Mail-Adresse** (Billing/Kontakt) auf Florentines Adresse ändern.
- [ ] Marius stuft sich selbst zu **Member** herunter (oder verlässt die Organisation, wenn er nicht mehr helfen soll).
- [ ] **Treatwell-Sync-Benachrichtigungen:** Fehlermeldungen der täglichen Synchronisation gehen an die Person, die den Workflow zuletzt geändert hat. Wer sich künftig kümmert, sollte unter github.com/settings/notifications → *Actions* „Benachrichtigung bei fehlgeschlagenen Workflows“ aktiviert haben.
- [ ] Hinweis: GitHub pausiert den täglichen Sync, wenn 60 Tage lang nichts committet wurde. Dann kommt eine Mail – im Tab *Actions* auf „Enable workflow“ klicken.

## 3. Netlify (Hosting und Kontaktformular)

Am einfachsten wird die Site in Florentines eigenem Netlify-Account **neu verbunden** (dauert ca. 10 Minuten) – so hängt nichts an Marius' Team oder Tarif:

- [ ] Vorher bei Marius: unter *Forms → kontakt* die bisherigen Anfragen als **CSV herunterladen** und Florentine geben.
- [ ] Florentine: *Add new site → Import from GitHub →* `labeautekosmetik/website`. Einstellungen kommen aus `netlify.toml`.
- [ ] Umgebungsvariable **`PUBLIC_THEME`** auf die gewählte Variante setzen (`c1` oder `c2`) – siehe README.
- [ ] *Forms*: Formular-Erkennung einschalten, **E-Mail-Benachrichtigung** an `info@labeautekosmetik.de` einrichten.
- [ ] *Domain management*: `labeautekosmetik.de` und `www` hinzufügen. Netlify zeigt an, ob die DNS-Einträge passen; das SSL-Zertifikat kommt automatisch.
- [ ] **Testen:** Website öffnen, Buchungsfenster öffnen, Testnachricht übers Kontaktformular → kommt die Mail an?
- [ ] Erst dann bei Marius: alte Site löschen (*Site configuration → General → Delete site*). Vorher prüfen, dass die Domain bei der alten Site entfernt ist.

> Alternative: Netlify bietet *Transfer site* (Site configuration → General) zu einem anderen Team. Dafür muss Marius Mitglied in beiden Teams sein; ob das im kostenlosen Tarif geht, vorher in Netlify prüfen.

## 4. Treatwell und Instagram (gehören schon Florentine)

- [ ] Treatwell-Kategorien umbenennen: „Effect Treatments“ → „Aquafacial & Microneedling“, „Zusatzbehandlungen“ → „Wimpern & Augenbrauen“.
- [ ] Wichtig für die Website: Preise, Behandlungen und Dauer **nur noch in Treatwell** ändern – die Website übernimmt sie am nächsten Morgen automatisch.
- [ ] Instagram-Bio: Link auf `https://labeautekosmetik.de` (statt direkt Treatwell) – dort sind Buchung, Infos und WhatsApp gebündelt.

## 5. Google Unternehmensprofil (neu, nach dem Livegang)

- [ ] Florentine legt das Profil unter business.google.com selbst an (sie ist **Inhaberin**), mit Website-Link, Treatwell-Buchungslink, Fotos, Kategorie „Kosmetikstudio“.
- [ ] Google schickt zur Bestätigung meist einen Code per Post oder Video-Nachweis.
- [ ] Optional: Marius als **Verwalter** hinzufügen, nicht als Inhaber.
- [ ] Danach die genauen Koordinaten in `src/data/site.ts` eintragen.

## 6. Abschluss

- [ ] Alle Passwörter liegen in Florentines Passwort-Manager, alle von ihr geändert.
- [ ] Bei keinem Konto ist mehr Marius' Zahlungsmethode oder private E-Mail als Hauptadresse hinterlegt.
- [ ] Florentine weiß, wo sie was ändert (README → „Was wo gepflegt wird“): Preise in Treatwell, Texte und Fotos über GitHub oder per Nachricht an Marius.
- [ ] Vereinbaren, wer sich kümmert, wenn GitHub oder Netlify eine Fehler-Mail schicken.

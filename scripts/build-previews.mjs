#!/usr/bin/env node
// Builds both design variants side by side for Florentine to compare:
//   dist/vorschau-a/  → C1 "Klar & warm"
//   dist/vorschau-b/  → C2 "Klar & frisch"
//   dist/index.html   → small chooser page
// Both are noindex. Once she has picked one, deploy a normal `npm run build`
// with PUBLIC_THEME set to her choice.

import { execSync } from 'node:child_process';
import { rmSync, mkdirSync, writeFileSync, renameSync, existsSync } from 'node:fs';

const variants = [
  { dir: 'vorschau-a', theme: 'c1', name: 'Variante A – Klar & warm', desc: 'Cremiger Hintergrund, Taupe, runde „Wolken“-Bilder. Unsere Empfehlung.' },
  { dir: 'vorschau-b', theme: 'c2', name: 'Variante B – Klar & frisch', desc: 'Weiß und Salbeigrün, weiche Ecken.' },
];

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

for (const v of variants) {
  console.log(`\n▶ ${v.name}`);
  execSync('npx astro build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      SITE_BASE: `/${v.dir}/`,
      SITE_PREVIEW: '1',
      PUBLIC_PREVIEW: '1',
      PUBLIC_THEME: v.theme,
      SITE_OUT_DIR: `./dist-tmp/${v.dir}`,
    },
  });
  renameSync(`dist-tmp/${v.dir}`, `dist/${v.dir}`);
}
if (existsSync('dist-tmp')) rmSync('dist-tmp', { recursive: true, force: true });

writeFileSync(
  'dist/index.html',
  `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Vorschau – La Beauté Kosmetik</title>
<style>body{font-family:system-ui,sans-serif;background:#f8f4ef;color:#3f3833;margin:0;padding:3rem 1.25rem}
main{max-width:640px;margin:auto}h1{font-weight:300;font-size:2rem}a{display:block;background:#fff;border-radius:14px;padding:1.25rem 1.5rem;margin:1rem 0;text-decoration:none;color:inherit;box-shadow:0 6px 20px rgba(0,0,0,.06)}
a strong{display:block;font-size:1.15rem;margin-bottom:.25rem}a span{color:#6f6258}</style></head>
<body><main><h1>Website-Vorschau für Florentine</h1><p>Zwei Designs mit denselben Inhalten. Klick dich auf dem Handy durch beide und sag, welches sich mehr nach La Beauté anfühlt.</p>
${variants.map((v) => `<a href="/${v.dir}/"><strong>${v.name}</strong><span>${v.desc}</span></a>`).join('\n')}
</main></body></html>`,
);
writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
console.log('\n✓ Vorschauen in dist/ – lokal ansehen mit: npx serve dist');

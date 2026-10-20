import type { APIRoute } from 'astro';
import { isPreview } from '../lib/url';

// Preview builds must stay out of Google; the live site invites everyone, AI crawlers included.
export const GET: APIRoute = () => {
  const body = isPreview
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://labeautekosmetik.de/sitemap-index.xml\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

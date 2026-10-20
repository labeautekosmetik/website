// All internal links go through u() so the preview builds under /vorschau-a/ and /vorschau-b/ work.
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export const u = (path = '') => BASE + path.replace(/^\//, '');

export const isPreview = import.meta.env.PUBLIC_PREVIEW === '1';

export const theme: 'c1' | 'c2' = import.meta.env.PUBLIC_THEME === 'c2' ? 'c2' : 'c1';

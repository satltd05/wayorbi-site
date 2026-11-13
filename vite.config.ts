import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { CARNETS } from './src/data/carnets.ts';
import { TRAVELERS } from './src/data/travelers.ts';

const STATIC_ROUTES = ['/', '/concept', '/carnets', '/explorer', '/communaute', '/travel-dna', '/atelier', '/fonctionnalites', '/beta', '/faq', '/credits', '/mentions-legales', '/confidentialite'];

/**
 * Adresse publique du site (variable SITE_URL, par exemple https://www.wayorbi.com) :
 * - complète l'image d'aperçu des liens partagés (og:image demande une adresse absolue) ;
 * - génère sitemap.xml et l'indique dans robots.txt.
 * Sans SITE_URL, le site fonctionne normalement ; seuls l'aperçu et le plan du site sont incomplets.
 */
function siteMeta(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '');
  return {
    name: 'wayorbi-site-meta',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', base),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}` });
      if (!base) return;
      const urls = [...STATIC_ROUTES, ...CARNETS.map((c) => `/carnets/${c.id}`), ...TRAVELERS.map((t) => `/voyageurs/${t.id}`)];
      const body = urls.map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n` });
    },
  };
}

// Sécurité : le serveur de développement et la prévisualisation n'écoutent que sur
// cet ordinateur (localhost). Ils ne sont pas accessibles depuis le réseau local.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), siteMeta(env.SITE_URL ?? '')],
    server: { host: 'localhost', port: 3000 },
    preview: { host: 'localhost', port: 4173 },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion';
            return undefined;
          },
        },
      },
    },
  };
});

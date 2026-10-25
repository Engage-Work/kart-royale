import { defineConfig } from 'vite';

export default defineConfig({
  // Relative, so the same build serves from a domain root (Vercel) or from a
  // sub-path such as GitHub Pages' /kart-royale/ without a rebuild. There is
  // no client-side routing, and nothing fetches by absolute path.
  base: './',
  plugins: [{
    // `/_vercel/insights/script.js` only exists on a Vercel deployment; asked
    // for anywhere else it is a 404 and a console error. Vercel sets VERCEL=1
    // in its build environment.
    name: 'vercel-analytics-only-on-vercel',
    transformIndexHtml: (html) => process.env.VERCEL
      ? html
      : html.replace(/\s*<!-- vercel-analytics -->[\s\S]*?<!-- \/vercel-analytics -->/, ''),
  }],
  server: { port: 5173, strictPort: true, host: true },
  build: { target: 'es2022', sourcemap: true },
});

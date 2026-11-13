import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Sécurité : le serveur de développement et la prévisualisation n'écoutent que sur
// cet ordinateur (localhost). Ils ne sont pas accessibles depuis le réseau local.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  preview: {
    host: 'localhost',
    port: 4173,
  },
});

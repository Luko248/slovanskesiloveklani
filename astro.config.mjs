// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwind()],
    },
    site: 'https://slovanskesiloveklani.cz',
    integrations: [sitemap()],
});

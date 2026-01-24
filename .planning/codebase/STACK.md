# Technology Stack

**Analysis Date:** 2026-01-24

## Languages

**Primary:**
- TypeScript - Used in utilities and configuration (strict mode via `astro/tsconfigs/strict`)
- JavaScript - Module type specified in `package.json`

**Secondary:**
- HTML - Templates in `.astro` components
- CSS - Tailwind CSS v4 with custom theme directives

## Runtime

**Environment:**
- Node.js (compatible with Bun runtime)

**Package Manager:**
- Bun - Specified in `.github/workflows/ci.yml` as the build system
- Lockfile: `bun.lock` (present)

## Frameworks

**Core:**
- Astro 5.16.4 - Static site generator and page framework
- Tailwind CSS 4.0.0 - Utility-first CSS framework
- @tailwindcss/vite 4.0.0 - Vite plugin for Tailwind v4 integration

**Build/Dev:**
- Vite - Build tool (integrated with Astro)
- @astrojs/compiler - Astro component compilation

## Key Dependencies

**Critical:**
- astro@5.16.4 - Core framework for static site generation
- tailwindcss@4.0.0 - Styling framework with modern CSS engine
- @tailwindcss/vite@4.0.0 - Development server performance for Tailwind

**Infrastructure:**
- @astrojs/markdown-remark@6.3.9 - Markdown processing (dependency of Astro)
- @astrojs/telemetry@3.3.0 - Anonymous usage analytics (can be disabled)
- esbuild (various platform builds) - JavaScript bundler used by Vite

## Configuration

**Environment:**
- No `.env` files detected - Site URL hardcoded in `astro.config.mjs`
- Site URL: `https://slovanskesiloveklani.cz` (production domain)

**Build:**
- `astro.config.mjs` - Astro configuration with Vite plugin setup
- `tsconfig.json` - TypeScript strict mode configuration
- Tailwind v4 custom theme in `src/styles/global.css` via `@theme` directive

**Framework Configuration:**
- `package.json` has `"type": "module"` (ES modules)
- Tailwind colors, fonts, and animations defined in `src/styles/global.css`

## Platform Requirements

**Development:**
- Bun runtime (latest version in CI)
- Node.js compatible environment

**Production:**
- Static site deployment (pre-built HTML/CSS/JS)
- Web server for serving static files (any CDN or web server)
- No server-side runtime required
- Built to `./dist/` directory

## External Resources Loaded

**Fonts (Google Fonts):**
- MedievalSharp - Display font for headings (loaded at runtime)
- Inter (400, 600, 700 weights) - Body typography

**Preconnection Hints:**
- `https://fonts.googleapis.com` - CSS delivery
- `https://fonts.gstatic.com` - Font files (cross-origin)

---

*Stack analysis: 2026-01-24*

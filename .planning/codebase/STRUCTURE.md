# Codebase Structure

**Analysis Date:** 2026-01-24

## Directory Layout

```
slovanskesiloveklani/
├── .astro/                 # Astro build artifacts and type definitions (auto-generated)
├── .github/
│   └── workflows/          # CI/CD workflows (GitHub Actions)
├── .planning/
│   └── codebase/           # Planning documentation
├── public/                 # Static assets served as-is (images, favicon, cursors)
│   ├── favicon.svg
│   └── images/
│       ├── hero/           # Hero section background images
│       ├── cursors/        # Custom cursor assets (sword.png, sword-hover.png)
│       └── [gallery images]
├── src/                    # Source code
│   ├── components/         # Reusable Astro components
│   ├── i18n/              # Internationalization configuration and translations
│   ├── layouts/           # Layout components (page wrappers)
│   ├── pages/             # Page routes (maps to URLs)
│   ├── styles/            # Global CSS and theme
│   └── utils/             # Utility functions
├── dist/                   # Build output (production site)
├── node_modules/           # Dependencies
├── .gitignore              # Git ignore rules
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── bun.lock                # Bun lock file
└── CLAUDE.md               # Project documentation for Claude Code
```

## Directory Purposes

**`src/components/`:**
- Purpose: Reusable UI components (sections and elements)
- Contains: `.astro` component files
- Key files:
  - `Header.astro` - Navigation bar with logo, nav items, mobile menu, calendar button
  - `Hero.astro` - Hero section with title, date/time/location, CTA button
  - `EventInfo.astro` - About competition section with features list and image
  - `Categories.astro` - Competition weight classes (men: 80kg, 90kg, 90kg+; women: special)
  - `Gallery.astro` - Photo gallery grid
  - `Registration.astro` - Registration information/form
  - `Partners.astro` - Sponsors/partners section
  - `Footer.astro` - Footer with links and copyright
  - `SectionSeparator.astro` - Visual divider between sections (SVG pattern)

**`src/i18n/`:**
- Purpose: Language configuration and translation strings
- Contains: TypeScript utilities and JSON translation files
- Key files:
  - `utils.ts` - `useTranslations(lang)` and `getLangFromUrl()` functions
  - `cs.json` - Czech translations with dot-notation nested keys (nav.*, hero.*, footer.*)

**`src/layouts/`:**
- Purpose: Page layout wrappers
- Contains: Layout components
- Key files:
  - `BaseLayout.astro` - HTML boilerplate, head metadata, font imports, global style import; accepts title and lang props

**`src/pages/`:**
- Purpose: Page routes (routes map directly to URLs)
- Contains: Astro pages
- Key files:
  - `index.astro` - Single page route (`/`); imports and assembles all section components in order

**`src/styles/`:**
- Purpose: Global styling and theme configuration
- Contains: CSS files with Tailwind directives
- Key files:
  - `global.css` - Tailwind v4 @theme directive defining colors (viking-red, blood-red, charcoal, etc.), fonts (MedievalSharp, Inter), keyframe animations (fade-in-up, fade-in-down), cursor customization, Slavic pattern background

**`src/utils/`:**
- Purpose: Utility functions for specific features
- Contains: TypeScript utility modules
- Key files:
  - `calendar.ts` - `generateICS()` and `downloadICS()` for iCalendar file generation and download

**`public/`:**
- Purpose: Static assets served directly (not processed by build)
- Contains: Images, icons, custom assets
- Key files:
  - `images/hero/hero-bg.jpg` - Hero section background image
  - `images/cursors/sword-hover.png` - Custom cursor for hover states
  - `favicon.svg` - Site favicon

**`dist/`:**
- Purpose: Build output directory (production site)
- Generated: Yes (created by `bun run build`)
- Committed: No (in .gitignore)

## Key File Locations

**Entry Points:**
- `src/pages/index.astro` - Main page route; orchestrates all sections
- `astro.config.mjs` - Astro build configuration

**Configuration:**
- `astro.config.mjs` - Build settings, Tailwind plugin, site URL
- `tsconfig.json` - TypeScript strict mode config
- `package.json` - Dependencies (astro, tailwindcss, @tailwindcss/vite)
- `bun.lock` - Dependency lock file (Bun package manager)

**Core Logic:**
- `src/components/Header.astro` - Navigation and interactive menu
- `src/i18n/utils.ts` - Translation system
- `src/utils/calendar.ts` - Calendar export functionality
- `src/styles/global.css` - Theme and animation definitions

**Testing:**
- Not applicable (static site; no test files present)

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `Header.astro`, `EventInfo.astro`)
- Pages: lowercase or index (e.g., `index.astro`)
- Utilities: camelCase (e.g., `calendar.ts`)
- Styles: lowercase (e.g., `global.css`)
- Translations: lowercase with nested keys using dot-notation (e.g., `nav.about`, `hero.title`)

**Directories:**
- Plural for collections: `components/`, `layouts/`, `pages/`, `styles/`, `utils/`
- Singular for singular purpose: `i18n/`

**Component Props:**
- `lang`: Language code (string, defaults to 'cs')
- `title`: Page title (string, used by BaseLayout)
- `description`: Page meta description (optional string)

## Where to Add New Code

**New Section/Feature:**
- Primary code: `src/components/[FeatureName].astro`
- Import in: `src/pages/index.astro` and add to component assembly
- Styling: Use Tailwind classes; add custom theme tokens to `src/styles/global.css` if needed
- Translations: Add keys to `src/i18n/cs.json` (e.g., `feature.heading`, `feature.description`)
- Use: `const t = useTranslations('cs')` and call `t('feature.heading')`

**New Utility:**
- Location: `src/utils/[featureName].ts`
- Export: Named exports (e.g., `export function myFunction() {}`)
- Usage: Import in components as needed (e.g., `import { myFunction } from '../utils/featureName'`)

**New Layout:**
- Location: `src/layouts/[LayoutName].astro`
- Pattern: Accept props, import global styles, define structure, use `<slot />` for page content
- Usage: Import in pages and wrap content

**New Page:**
- Location: `src/pages/[route-name].astro`
- Routing: File path maps to URL (e.g., `pages/about.astro` → `/about`)
- Current: Only `index.astro` exists for single-page site; create additional pages only if multi-page needed

**Shared Styling:**
- Global: Add to `src/styles/global.css` (affects entire site)
- Component-level: Use Tailwind classes inline in `.astro` files
- Custom colors: Define in `@theme` block in `global.css` as `--color-[name]`

## Special Directories

**`.astro/`:**
- Purpose: Astro build artifacts, type definitions, configuration cache
- Generated: Yes (auto-generated during build)
- Committed: No (in .gitignore)

**`dist/`:**
- Purpose: Static HTML, CSS, and JS output for production
- Generated: Yes (created by `bun run build`)
- Committed: No (in .gitignore)

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes (created by `bun install`)
- Committed: No (in .gitignore; use bun.lock instead)

**`.github/workflows/`:**
- Purpose: CI/CD pipeline definitions (GitHub Actions)
- Generated: No (checked in)
- Committed: Yes

## Component Assembly Order

The main page (`src/pages/index.astro`) assembles sections in this order:

1. `<Header lang="cs" />` - Navigation, logo, menu
2. `<Hero lang="cs" />` - Hero section with CTA
3. `<SectionSeparator />` - Visual divider
4. `<EventInfo lang="cs" />` - About competition
5. `<SectionSeparator />` - Visual divider
6. `<Categories lang="cs" />` - Weight categories
7. `<SectionSeparator />` - Visual divider
8. `<Gallery lang="cs" />` - Photo gallery
9. `<SectionSeparator />` - Visual divider
10. `<Registration />` - Registration section
11. `<SectionSeparator />` - Visual divider
12. `<Partners />` - Sponsors
13. `<SectionSeparator />` - Visual divider
14. `<Footer />` - Footer

Each section has an `id` attribute for anchor navigation (e.g., `id="about"`, `id="categories"`).

## Quick Reference: File Locations by Purpose

| Purpose | File(s) |
|---------|---------|
| Page route | `src/pages/index.astro` |
| Navigation | `src/components/Header.astro` |
| Hero section | `src/components/Hero.astro` |
| About section | `src/components/EventInfo.astro` |
| Categories | `src/components/Categories.astro` |
| Gallery | `src/components/Gallery.astro` |
| Registration | `src/components/Registration.astro` |
| Partners | `src/components/Partners.astro` |
| Footer | `src/components/Footer.astro` |
| Visual dividers | `src/components/SectionSeparator.astro` |
| Theme colors | `src/styles/global.css` |
| Typography | `src/styles/global.css` |
| Animations | `src/styles/global.css` |
| Translations | `src/i18n/cs.json` |
| i18n functions | `src/i18n/utils.ts` |
| Calendar feature | `src/utils/calendar.ts` |
| HTML boilerplate | `src/layouts/BaseLayout.astro` |
| Build config | `astro.config.mjs` |
| Dependencies | `package.json` |

---

*Structure analysis: 2026-01-24*

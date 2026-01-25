# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Slovanské Silové Klání" (Slavic Strength Competition), built with Astro and Tailwind CSS. The site promotes an annual amateur strongman competition event in the Czech Republic, featuring event information, categories, gallery, registration, and partner sections.

## Development Commands

```bash
# Install dependencies
bun install

# Start development server (localhost:4321)
bun run dev

# Build production site to ./dist/
bun run build

# Preview production build locally
bun run preview

# Run Astro CLI commands
bun run astro ...
```

The project uses Bun as the package manager (see `.github/workflows/ci.yml`). CI builds are run automatically on push/PR to main.

## Architecture

### Astro Framework
- **Pages**: Single-page site at `src/pages/index.astro`
- **Components**: Reusable `.astro` components in `src/components/`
- **Layouts**: Base layout in `src/layouts/BaseLayout.astro` handles HTML structure, meta tags, fonts, and global styling
- **Styling**: Tailwind CSS v4 with Vite plugin (`@tailwindcss/vite`)

### Internationalization (i18n)
- i18n infrastructure exists in `src/i18n/` but currently only Czech (`cs`) is implemented
- `utils.ts` provides `getLangFromUrl()` and `useTranslations()` functions
- Translations stored in `src/i18n/cs.json` using nested dot-notation keys (e.g., `nav.about`, `hero.title`)
- `useTranslations()` always falls back to Czech
- Components accept `lang` prop but system is hard-coded to Czech currently

### Styling System
- **Custom Theme**: Defined in `src/styles/global.css` using Tailwind v4 `@theme` directive
- **Color Palette**: Viking/Slavic themed colors (viking-red, forest-green, parchment, bronze, charcoal, blood-red, etc.)
- **Typography**:
  - Display font: MedievalSharp (Google Fonts) for headings
  - Body font: Inter for text
- **Dark Mode**: Enforced globally (deep-charcoal background, light-cream text)
- **Background Pattern**: Custom Slavic pattern via `.bg-slavic-pattern` class
- **Animations**: Fade-in-up and fade-in-down keyframe animations
- **Cursor**: Custom sword cursor on hover for links/buttons (`/images/cursors/sword-hover.png`)

### Component Architecture
Main page (`index.astro`) assembles sections in order:
1. Header - Navigation and branding
2. Hero - Main title, event date/time/location, CTA
3. EventInfo - About the competition
4. Categories - Competition categories
5. Gallery - Photo gallery
6. Registration - Registration form/info
7. Partners - Partner/sponsor section
8. Footer - Footer information

Sections are separated by `SectionSeparator` component.

### Utilities
- **Calendar Export** (`src/utils/calendar.ts`):
  - `generateICS()` creates iCalendar (.ics) file for event
  - `downloadICS()` triggers browser download
  - Event details: June 13, 2026, 10:00-18:00 CEST at "Za Hasičskou Zbrojnicí, Pustiměř"

## Site Configuration
- Site URL: `https://slovanskesiloveklani.cz` (defined in `astro.config.mjs`)
- Default title: "Slovanské Silové Klání 2025"
- Default language: Czech (`cs`)
- Smooth scrolling enabled via `scroll-smooth` class on `<html>`

## Key Patterns
- All components that display text should accept a `lang` prop and use the i18n system
- Page structure uses semantic HTML with `<section>` elements and proper IDs for anchor navigation
- Responsive design uses Tailwind utility classes
- External fonts loaded from Google Fonts with `preconnect` for performance

# Architecture

**Analysis Date:** 2026-01-24

## Pattern Overview

**Overall:** Static Site Generation with Component-Based Architecture

**Key Characteristics:**
- Single-page application built with Astro static site generator
- Component-driven UI with reusable `.astro` components
- Server-side rendered with no client-side hydration by default
- Tailwind CSS v4 for styling with custom theme
- i18n infrastructure prepared for multi-language (currently Czech only)

## Layers

**Presentation Layer:**
- Purpose: Renders visual interface and handles user interaction
- Location: `src/components/`, `src/pages/index.astro`
- Contains: Astro components (.astro files) for pages and reusable UI sections
- Depends on: i18n system, utilities, global styles
- Used by: BaseLayout, page router

**Layout Layer:**
- Purpose: Provides common HTML structure, meta tags, fonts, and styling foundation
- Location: `src/layouts/BaseLayout.astro`
- Contains: DOCTYPE, head metadata, global CSS import, layout structure
- Depends on: `src/styles/global.css`, Google Fonts
- Used by: `src/pages/index.astro` wraps all content

**Styling Layer:**
- Purpose: Defines theme colors, typography, animations, and responsive utilities
- Location: `src/styles/global.css`
- Contains: Tailwind v4 theme config, custom animations (fade-in-up, fade-in-down), custom classes (.bg-slavic-pattern, .animate-fade-in-up)
- Depends on: Tailwind CSS v4 via @tailwindcss/vite
- Used by: All components via Tailwind class utilities

**Internationalization Layer:**
- Purpose: Translates content and manages language configuration
- Location: `src/i18n/`
- Contains: `utils.ts` (translation lookup), `cs.json` (Czech translations with dot-notation keys)
- Depends on: JSON translations
- Used by: Components that render text (Header, Hero, EventInfo, Categories, Gallery)

**Utility Layer:**
- Purpose: Provides reusable functions for specific features
- Location: `src/utils/`
- Contains: `calendar.ts` with ICS file generation and download functionality
- Depends on: Browser APIs (DOM, Blob, URL)
- Used by: Header component for calendar button functionality

## Data Flow

**Page Initialization:**

1. Browser requests `/` (single page site)
2. Astro router loads `src/pages/index.astro`
3. Page imports and assembles components: Header → Hero → EventInfo → Categories → Gallery → Registration → Partners → Footer
4. Each component is wrapped in `SectionSeparator` for visual segmentation
5. BaseLayout wraps entire page with HTML structure and global styles
6. All CSS classes resolved by Tailwind at build time
7. HTML + embedded styles delivered to browser (no hydration)

**Component Rendering:**

- Each component (Header, Hero, etc.) is a standalone `.astro` file
- Components accept `lang` prop (currently hardcoded to 'cs')
- Components call `useTranslations('cs')` to get translated strings
- i18n lookups use dot-notation keys (e.g., 'nav.about') and split on '.'
- Missing keys fall back to showing the key itself

**Interactive Features:**

1. Calendar button in Header triggers `downloadICS()` from `src/utils/calendar.ts`
2. Mobile menu button toggles menu visibility via inline script tag
3. Smooth scroll enabled globally via `scroll-smooth` class on `<html>`
4. Anchor links to section IDs (#about, #categories, #registration, #gallery, #footer) enable navigation

**State Management:**

- No persistent state; all data is static and compiled at build time
- Mobile menu state managed with simple CSS transitions in DOM
- Component instances are static; no reactivity framework

## Key Abstractions

**BaseLayout:**
- Purpose: Universal page wrapper handling HTML boilerplate and meta configuration
- File: `src/layouts/BaseLayout.astro`
- Pattern: Accepts `title` and optional `description` props; imports global styles once per page
- Used by: `src/pages/index.astro`

**Section Components:**
- Purpose: Reusable page sections that display content with consistent styling
- Examples: `src/components/Hero.astro`, `src/components/EventInfo.astro`, `src/components/Categories.astro`, `src/components/Gallery.astro`, `src/components/Registration.astro`, `src/components/Partners.astro`
- Pattern: Each component is self-contained with inline styles and no prop-drilling; language prop passed but hardcoded to 'cs'
- Used by: Page layout orchestration in `src/pages/index.astro`

**SectionSeparator:**
- Purpose: Visual divider between sections with Slavic-themed SVG pattern
- File: `src/components/SectionSeparator.astro`
- Pattern: Stateless component with embedded SVG data URI for repeating pattern
- Used by: Between each major section for visual hierarchy

**i18n Utility:**
- Purpose: Centralized translation lookup with fallback handling
- File: `src/i18n/utils.ts`
- Pattern: `useTranslations(lang)` returns a function that traverses nested JSON with dot-notation keys
- Used by: All text-rendering components

**Calendar Utility:**
- Purpose: Generate and download iCalendar (.ics) files
- File: `src/utils/calendar.ts`
- Pattern: `generateICS()` builds iCalendar format string; `downloadICS()` creates Blob and triggers browser download
- Used by: Header component calendar button

## Entry Points

**Page Entry:**
- Location: `src/pages/index.astro`
- Triggers: HTTP request to `/` from browser
- Responsibilities: Imports all section components, assembles page structure, passes `lang="cs"` to sections, wraps in BaseLayout

**Build Entry:**
- Location: `astro.config.mjs`
- Triggers: `bun run build` command
- Responsibilities: Configures Astro build with Tailwind plugin, sets site URL, outputs to `dist/`

## Error Handling

**Strategy:** No explicit error handling; static site generation means errors occur at build time, not runtime.

**Patterns:**
- Missing translation keys fall back to displaying the key string (e.g., `nav.missing` displays as "nav.missing")
- Component render errors fail the build entirely (Astro validates component syntax and prop types at build time)
- ICS download fails silently if DOM APIs unavailable (no error logging in calendar utility)

## Cross-Cutting Concerns

**Logging:** None. Static site has no server-side logs. Browser console available for debugging.

**Validation:** Astro TypeScript strict mode (`extends: "astro/tsconfigs/strict"`) validates component props at build time.

**Authentication:** None. Static site with no user accounts or protected content.

**Styling Consistency:** Global theme defined in `src/styles/global.css` using Tailwind v4 `@theme` directive; all color names (viking-red, blood-red, charcoal, etc.) are custom theme tokens applied via Tailwind class utilities.

**Responsive Design:** All components use Tailwind responsive prefixes (md:, lg:) for mobile-first design. No media query overrides in components.

---

*Architecture analysis: 2026-01-24*

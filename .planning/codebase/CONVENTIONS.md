# Coding Conventions

**Analysis Date:** 2026-01-24

## Naming Patterns

**Files:**
- Astro components: PascalCase with `.astro` extension (e.g., `Header.astro`, `Categories.astro`)
- TypeScript utilities: camelCase with `.ts` extension (e.g., `calendar.ts`, `utils.ts`)
- JSON config/data: camelCase or lowercase (e.g., `cs.json`)
- CSS files: lowercase with `.css` extension (e.g., `global.css`)

**Functions:**
- camelCase for utility functions (e.g., `generateICS()`, `downloadICS()`, `useTranslations()`, `getLangFromUrl()`)
- Functions that generate/create use verb-noun pattern: `generateICS`, `downloadICS`
- Hook-like functions use `use` prefix: `useTranslations`

**Variables:**
- camelCase for local variables and constants (e.g., `navItems`, `features`, `lang`, `t`)
- Array constants use plural names: `navItems`, `features`
- Translation function always named `t` (from `useTranslations(lang)`)
- Hardcoded values in inline constants follow camelCase: `startTime`, `endTime`, `link`

**Types:**
- Props interfaces use `Props` suffix or just `Props` (e.g., in `BaseLayout.astro`: `interface Props`)
- Properties are camelCase: `title`, `description`, `lang`

## Code Style

**Formatting:**
- No explicit formatter configured (eslint/prettier not in dependencies)
- Indentation: 2 spaces observed throughout codebase
- Line breaks: Single blank lines between logical sections
- String quotes: Single quotes used in some files, template literals for HTML
- Component structure: Astro frontmatter (between `---`) followed by HTML template

**Linting:**
- No explicit linting configured
- TypeScript strict mode enabled via `tsconfig.json` (`"extends": "astro/tsconfigs/strict"`)
- No ESLint or Prettier configuration found

## Import Organization

**Order:**
1. Relative imports from local modules (e.g., `import { useTranslations } from '../i18n/utils'`)
2. Component imports (e.g., `import Header from '../components/Header.astro'`)
3. Style imports (e.g., `import '../styles/global.css'`)

**Path Aliases:**
- No path aliases configured
- All imports use relative paths with `../` navigation
- Imports in Astro components happen within frontmatter section (before `---`)

**Pattern observed in `src/pages/index.astro`:**
```typescript
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
// ... more component imports
```

## Error Handling

**Patterns:**
- No try-catch blocks observed in source code
- Nullish coalescing with optional chaining used for safe property access: `btn?.addEventListener()`, `calendarBtn?.addEventListener()`
- Fallback values in function parameters: `const { title, description = "Slovanské Silové Klání 2025", lang = "cs" } = Astro.props`
- Translation system returns original key if lookup fails: `return key` (in `src/i18n/utils.ts`)

**Error handling in utilities:**
```typescript
// From src/i18n/utils.ts - fallback pattern
for (const k of keys) {
    if (value && value[k]) {
        value = value[k];
    } else {
        return key; // Return the unparsed key as fallback
    }
}
```

## Logging

**Framework:** No logging framework observed

**Patterns:**
- Logging not implemented in codebase
- Inline debugging would use `console.*` if needed
- Event handlers use simple imperative statements: `menu?.classList.toggle()`, `link.click()`

## Comments

**When to Comment:**
- Comments used sparingly
- Inline comments for complex HTML structures or unclear intent:
  - `<!-- Background Image with Overlay -->`
  - `<!-- Content -->`
  - `<!-- Mobile Menu Button -->`
- Comments explain sections and visual intent in markup, not implementation

**JSDoc/TSDoc:**
- No JSDoc/TypeScript documentation observed
- Code is self-documenting via clear function names and variable names

## Function Design

**Size:**
- Utility functions are small and focused (e.g., `generateICS()` is 23 lines, `downloadICS()` is 10 lines)
- Component functions use composition pattern with smaller sub-components

**Parameters:**
- Destructuring used in function parameters: `const { title, description = "...", lang = "cs" } = Astro.props`
- Default values provided inline: `const { lang = 'cs' } = Astro.props`

**Return Values:**
- Utility functions return single values: strings (`generateICS` returns iCalendar string), void (`downloadICS`)
- Components render JSX/template syntax, no explicit returns

## Module Design

**Exports:**
- Named exports for utility functions: `export const generateICS`, `export const downloadICS`, `export function useTranslations(lang)`
- Default exports for Astro components
- Both patterns used: named (`export function`) and named constant exports (`export const`)

**Barrel Files:**
- No barrel files (index.ts re-exports) observed
- Each module exports its own functionality directly
- `src/i18n/utils.ts` is the main i18n barrel providing `getLangFromUrl` and `useTranslations`

## Component Props Pattern

**Astro Components:**
- Props defined in frontmatter as TypeScript interfaces
- All props passed explicitly: `<Header lang="cs" />`
- Default values provided in destructuring: `const { lang = "cs" } = Astro.props`

**Pattern observed:**
```typescript
---
interface Props {
  title: string;
  description?: string;
  lang?: string;
}

const { title, description = "Slovanské Silové Klání 2025", lang = "cs" } = Astro.props;
---
```

## CSS/Styling Conventions

**Tailwind CSS v4:**
- Utility-first approach using Tailwind classes
- Custom theme colors defined in `@theme` block in `src/styles/global.css`
- Color naming: `viking-red`, `forest-green`, `parchment`, `charcoal`, `blood-red`, `deep-charcoal`, `light-cream`
- Responsive prefixes: `md:`, `lg:` for breakpoints
- Custom animations: `animate-fade-in-up`, `animate-fade-in-down`

**Custom Classes:**
- `.bg-slavic-pattern`: SVG pattern background
- `.animate-fade-in-up`, `.animate-fade-in-down`: Custom animation classes
- Dark mode enforced globally (no light mode selector)

---

*Convention analysis: 2026-01-24*

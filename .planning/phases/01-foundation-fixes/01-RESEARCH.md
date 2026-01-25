# Phase 1: Foundation Fixes - Research

**Researched:** 2026-01-25
**Domain:** Astro static site bug fixes, TypeScript configuration patterns, mobile navigation
**Confidence:** HIGH

## Summary

Phase 1 establishes a stable foundation by fixing three critical bug categories: mobile menu functionality, event data inconsistencies, and light theme remnants. Research confirms all bugs are simple fixes requiring ID alignment, centralized configuration, and cleanup of unused imports/styles.

The mobile menu bug is caused by ID mismatches between HTML elements and JavaScript selectors in `Header.astro`. Event data is scattered across four files with conflicting dates (June 7 vs. June 13, 2026) and times (9:30-16:00 vs. 10:00-18:00). Light theme remnants exist as unused imports and redundant `dark:` variant classes.

**Primary recommendation:** Create `src/utils/eventConfig.ts` as single source of truth for event data, fix Header.astro ID mismatches, remove ThemeToggle import, and audit/clean dark mode variant classes.

## Standard Stack

This phase uses existing codebase technologies. No new dependencies required.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | Current | Static site framework | Already in use |
| TypeScript | Current (strict mode) | Type safety | Already configured |
| Tailwind CSS v4 | Current | Styling | Already in use |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Bun | Current | Package manager | Already configured as project default |

### Alternatives Considered
N/A - Using existing stack, no new libraries needed.

**Installation:**
No new packages required.

## Architecture Patterns

### Recommended Project Structure for Configuration
```
src/
├── utils/
│   ├── calendar.ts          # Calendar export functionality (existing)
│   └── eventConfig.ts        # NEW: Single source of truth for event data
```

### Pattern 1: Centralized Configuration Module
**What:** Export typed constants from a single module, import where needed
**When to use:** Any data used in multiple components (event details, contact info, etc.)
**Example:**
```typescript
// src/utils/eventConfig.ts
export const EVENT_CONFIG = {
  title: "Slovanské Silové Klání 2026",
  edition: "5. ročník amatérské silové soutěže",
  date: {
    year: 2026,
    month: 6, // June
    day: 13,
    dayOfWeek: "Sobota",
  },
  time: {
    start: "9:30",
    end: "16:00",
    timezone: "CEST",
    startUTC: "20260613T073000Z", // 9:30 CEST = 07:30 UTC
    endUTC: "20260613T140000Z",   // 16:00 CEST = 14:00 UTC
  },
  location: {
    name: "Za Hasičskou Zbrojnicí",
    city: "Pustiměř",
    country: "Czech Republic",
    full: "Za Hasičskou Zbrojnicí, Pustiměř",
  },
} as const;

// Usage in components:
import { EVENT_CONFIG } from '../utils/eventConfig';
const dateDisplay = `${EVENT_CONFIG.date.day}.${String(EVENT_CONFIG.date.month).padStart(2, '0')}.${EVENT_CONFIG.date.year}`;
```

### Pattern 2: Fix Mobile Menu Toggle
**What:** Align HTML element IDs with JavaScript selectors
**When to use:** Any interactive component with client-side JavaScript
**Example:**
```typescript
// BEFORE (broken):
<button id="mobile-menu-btn">Menu</button>
<script>
  const btn = document.getElementById('mobile-menu-toggle'); // Wrong ID!
</script>

// AFTER (fixed):
<button id="mobile-menu-btn">Menu</button>
<script>
  const btn = document.getElementById('mobile-menu-btn'); // Matches!
</script>
```

### Pattern 3: Animation with translate-x vs hidden class
**What:** Mobile menu uses `translate-x-full` for off-screen positioning, not `hidden` class
**When to use:** Slide-in/slide-out animations
**Example:**
```typescript
// Current setup (correct for animations):
<div id="mobile-menu" class="transform translate-x-full transition-transform">
  <!-- menu content -->
</div>

// Toggle implementation:
<script>
  btn?.addEventListener('click', () => {
    menu?.classList.toggle('translate-x-full'); // Toggles translate
  });
</script>
```

### Anti-Patterns to Avoid
- **Hardcoding event data in multiple files:** Creates inconsistencies when values change
- **Importing unused components:** ThemeToggle.astro is imported but never used, breaks build
- **ID naming inconsistencies:** Button IDs should match their JavaScript selectors exactly
- **Using `classList.toggle('hidden')` for animated menus:** Breaks transition animations; use translate classes instead

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile menu logic | Custom toggle scripts | Standard querySelector + classList pattern | Well-documented, accessible, maintainable |
| Calendar file generation | String concatenation | Template literals with proper escaping | Prevents malformed .ics files |
| Date/time formatting | Manual string building | Centralized config with computed properties | Single source of truth, type-safe |
| Unused CSS removal | Manual file editing | Tailwind's built-in tree-shaking | Automatic, build-time optimization |

**Key insight:** These bugs exist because patterns were violated (IDs don't match, data is duplicated, imports are stale). Fix by following standard patterns, not creating new solutions.

## Common Pitfalls

### Pitfall 1: ID Mismatch in JavaScript Event Handlers
**What goes wrong:** Button click does nothing, console shows null reference errors
**Why it happens:** HTML element ID doesn't match `getElementById()` string
**How to avoid:**
1. Copy-paste IDs directly from HTML to JavaScript
2. Use consistent naming convention (e.g., `-btn` suffix for all buttons)
3. Test in browser console: `document.getElementById('your-id')` should not return `null`
**Warning signs:** Button appears clickable but has no effect; no console errors unless you check for null

### Pitfall 2: Importing Non-Existent Components
**What goes wrong:** Build fails with "Module not found" error
**Why it happens:** Component was deleted but import statement remains
**How to avoid:**
1. When deleting files, search codebase for import statements referencing them
2. Use IDE "Find all references" before deleting
3. Check git status for deleted files (marked with `D`)
**Warning signs:** Build failure immediately after pulling changes or switching branches

### Pitfall 3: Date/Time Inconsistencies Across Files
**What goes wrong:** Different sections show different event dates, users confused
**Why it happens:** Event details hardcoded in multiple places
**How to avoid:**
1. Create single source of truth configuration file
2. Import config in all components needing event data
3. Document in CLAUDE.md where config lives
**Warning signs:** Customer reports "your website says two different dates"

### Pitfall 4: Toggle Animation Breaks with Wrong CSS Class
**What goes wrong:** Menu instantly appears/disappears instead of sliding smoothly
**Why it happens:** Using `hidden` class toggle breaks CSS transitions; must use transform classes
**How to avoid:**
1. For slide animations, toggle `translate-x-full` not `hidden`
2. For fade animations, toggle opacity classes not `hidden`
3. Reserve `hidden` for instant show/hide without animation
**Warning signs:** Menu works but animations choppy or instant

### Pitfall 5: Incorrect Timezone Handling in .ics Files
**What goes wrong:** Calendar event shows wrong time in user's calendar app
**Why it happens:** Using local time without VTIMEZONE component or incorrect UTC conversion
**How to avoid:**
1. For simple events, use UTC time format (append Z to timestamp)
2. For timezone-aware events, include VTIMEZONE component with TZID parameter
3. Verify: 9:30 CEST (UTC+2) = 07:30 UTC, 16:00 CEST = 14:00 UTC
**Warning signs:** Event appears at wrong time when added to Google Calendar or Outlook

### Pitfall 6: Unused `dark:` Variant Classes in Dark-Only Theme
**What goes wrong:** CSS bundle larger than needed, redundant code
**Why it happens:** Components scaffolded with light/dark mode support but only dark mode used
**How to avoid:**
1. If dark mode is enforced globally, remove `dark:` variants
2. Use base classes directly (e.g., `text-light-cream` instead of `dark:text-light-cream`)
3. Keep `dark:` variants only if planning to add light mode later
**Warning signs:** Many `dark:` classes in codebase but no light theme toggle anywhere

## Code Examples

Verified patterns for this phase:

### Event Configuration Module
```typescript
// src/utils/eventConfig.ts
export const EVENT_CONFIG = {
  title: "Slovanské Silové Klání 2026",
  edition: "5. ročník amatérské silové soutěže",
  date: {
    year: 2026,
    month: 6,
    day: 13,
    dayOfWeek: "Sobota",
    display: "13.06.2026", // Pre-formatted for consistency
  },
  time: {
    start: "9:30",
    end: "16:00",
    timezone: "CEST",
    timezoneIANA: "Europe/Prague",
    startUTC: "20260613T073000Z", // 9:30 CEST = 07:30 UTC (CEST is UTC+2)
    endUTC: "20260613T140000Z",   // 16:00 CEST = 14:00 UTC
  },
  location: {
    name: "Za Hasičskou Zbrojnicí",
    city: "Pustiměř",
    country: "Czech Republic",
    full: "Za Hasičskou Zbrojnicí, Pustiměř",
  },
  calendar: {
    filename: "slovanske-silove-klani-2026.ics",
  },
} as const;

// Type export for consumers
export type EventConfig = typeof EVENT_CONFIG;
```

### Fixed Mobile Menu Toggle
```typescript
// src/components/Header.astro
<script>
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const calendarBtn = document.getElementById('add-to-calendar-btn');
  const mobileCalendarBtn = document.getElementById('mobile-calendar-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Toggle menu open
  mobileMenuBtn?.addEventListener('click', () => {
    menu?.classList.remove('translate-x-full');
  });

  // Toggle menu closed
  closeMenuBtn?.addEventListener('click', () => {
    menu?.classList.add('translate-x-full');
  });

  // Close menu when clicking nav links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.add('translate-x-full');
    });
  });

  // Calendar button handlers
  calendarBtn?.addEventListener('click', downloadICS);
  mobileCalendarBtn?.addEventListener('click', downloadICS);
</script>
```

### Updated calendar.ts with Event Config
```typescript
// src/utils/calendar.ts
import { EVENT_CONFIG } from './eventConfig';

export const generateICS = () => {
  const event = {
    title: EVENT_CONFIG.title,
    description: EVENT_CONFIG.edition,
    startTime: EVENT_CONFIG.time.startUTC,
    endTime: EVENT_CONFIG.time.endUTC,
    location: EVENT_CONFIG.location.full,
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SlovanskeSiloveKlani//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${Date.now()}@slovanskesiloveklani.cz
DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '')}
DTSTART:${event.startTime}
DTEND:${event.endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
};

export const downloadICS = () => {
  const icsContent = generateICS();
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', EVENT_CONFIG.calendar.filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

### Updated Hero Component
```typescript
// src/components/Hero.astro
---
import { useTranslations } from '../i18n/utils';
import { EVENT_CONFIG } from '../utils/eventConfig';

const lang = 'cs';
const t = useTranslations(lang);
---

<section class="relative h-screen w-full flex items-center justify-center overflow-hidden">
  <!-- ... background ... -->
  <div class="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
    <!-- ... other content ... -->
    <div class="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-12 text-xl md:text-2xl text-gray-200 font-bold tracking-wide animate-fade-in-up" style="animation-delay: 0.4s">
      <div class="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
        <svg class="w-7 h-7 text-viking-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        {EVENT_CONFIG.date.display} | {EVENT_CONFIG.time.start}
      </div>
      <div class="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-lg backdrop-blur-sm">
        <svg class="w-7 h-7 text-viking-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        {EVENT_CONFIG.location.full}
      </div>
    </div>
    <!-- ... CTA button ... -->
  </div>
</section>
```

### Updated cs.json Translations
```json
{
  "nav": {
    "about": "O soutěži",
    "categories": "Kategorie",
    "registration": "Registrace",
    "gallery": "Galerie",
    "contact": "Kontakt"
  },
  "hero": {
    "title": "Slovanské Silové Klání",
    "subtitle": "5. ročník amatérské silové soutěže",
    "cta": "Registrovat se"
  },
  "about": {
    "heading": "O soutěži"
  },
  "footer": {
    "rights": "Všechna práva vyhrazena."
  }
}
```

Note: Removed `date`, `time`, and `location` keys from translations since these are now sourced from `eventConfig.ts`.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded event data in components | Centralized config modules | TypeScript era | Type safety, consistency |
| `hidden` class toggle for menus | Transform classes (`translate-x-*`) | Tailwind CSS v2+ | Smooth animations |
| Manual timezone in .ics files | UTC timestamps with Z suffix | iCalendar RFC 5545 | Universal compatibility |
| PurgeCSS for unused CSS | Tailwind built-in tree-shaking | Tailwind CSS v3+ | Automatic optimization |

**Deprecated/outdated:**
- ThemeToggle component: Deleted (per git status) but import remains in Header.astro
- Light theme support: Project decided on dark-only theme but `dark:` variants still present

## Open Questions

1. **Should `dark:` variant classes be removed or kept for future light mode?**
   - What we know: Project uses dark mode exclusively, CLAUDE.md states "dark mode enforced globally"
   - What's unclear: Whether light mode will ever be added
   - Recommendation: Remove `dark:` variants to reduce CSS bundle size. Can be added back if needed. Document decision in CLAUDE.md.

2. **Should event time be changed from 10:00 to 9:30?**
   - What we know: Requirements specify 9:30-16:00 CEST as final values
   - What's unclear: Whether this is confirmed with event organizers
   - Recommendation: Use 9:30-16:00 CEST as specified in requirements. Update all references.

3. **Should translation keys for date/time/location be removed from cs.json?**
   - What we know: These values should come from eventConfig.ts for consistency
   - What's unclear: Whether i18n keys serve a different purpose
   - Recommendation: Remove from cs.json since they duplicate eventConfig data. Translation file should only contain UI labels, not event details.

## Current State Analysis

### Files Requiring Modification

| File | Issue | Fix Required |
|------|-------|--------------|
| `src/components/Header.astro` | Line 2: Imports deleted ThemeToggle component | Remove import |
| `src/components/Header.astro` | Line 111: Wrong ID `'mobile-menu-toggle'` | Change to `'mobile-menu-btn'` |
| `src/components/Header.astro` | Line 113: Wrong ID `'add-to-calendar'` | Change to `'add-to-calendar-btn'` |
| `src/components/Header.astro` | Line 118: Toggles `hidden` class | Change to toggle `translate-x-full` class |
| `src/components/Header.astro` | Line 124: Adds `hidden` class | Change to add `translate-x-full` class |
| `src/utils/calendar.ts` | Lines 3-8: Hardcoded event data | Import from eventConfig.ts |
| `src/utils/calendar.ts` | Line 30: Filename says "2025" | Change to "2026" or use eventConfig |
| `src/utils/calendar.ts` | Line 5: Time is 10:00 (UTC+2) | Change to 9:30 CEST = 07:30 UTC |
| `src/components/Hero.astro` | Line 35: Hardcoded date/time | Import from eventConfig.ts |
| `src/i18n/cs.json` | Line 12: Wrong date (07.06.2026) | Remove (use eventConfig instead) |
| `src/i18n/cs.json` | Line 13: Time reference | Remove (use eventConfig instead) |
| `src/i18n/cs.json` | Line 14: Location reference | Remove (use eventConfig instead) |

### Files to Create

| File | Purpose |
|------|---------|
| `src/utils/eventConfig.ts` | Single source of truth for all event data |

### Dark Mode Variant Audit

Files with `dark:` classes that may need review:
- `src/components/Header.astro` (lines 36, 72, 98)
- `src/components/EventInfo.astro` (lines 20, 25, 26, 30, 42, 46, 57)
- `src/components/Categories.astro` (line 4)
- `src/components/Gallery.astro` (line 21)
- `src/components/Partners.astro` (lines 13, 21, 52)
- `src/components/Footer.astro` (lines 23, 42)

**Analysis:** Most `dark:` variants are redundant since dark mode is enforced globally. Can be simplified to base classes.

## Testing Strategy

### Manual Testing Checklist

**Mobile Menu:**
1. Open site on mobile viewport (< 768px width)
2. Click hamburger menu button - menu should slide in from right
3. Click close button (X) - menu should slide out to right
4. Click hamburger again, then click a nav link - menu should close
5. Verify animations are smooth, not instant

**Calendar Download:**
1. Click "Do Kalendáře" button on desktop
2. Verify file downloads with name "slovanske-silove-klani-2026.ics"
3. Open .ics file in text editor - verify date is June 13, 2026
4. Verify time shows 07:30 UTC (9:30 CEST) start
5. Add to Google Calendar - should show Saturday, June 13, 2026 at 9:30 AM

**Event Data Consistency:**
1. Visual inspection of Hero section - should show "13.06.2026 | 9:30"
2. Download calendar - should match Hero display
3. Search codebase for any lingering "07.06.2026" or "10:00" references

**Build Verification:**
1. Run `bun run build` - should complete without "Module not found" errors
2. Check dist/ folder size - should be smaller after removing unused CSS
3. Run `bun run preview` - site should display correctly

### Automated Testing Recommendations

For future phases, consider adding:
- **Vitest unit tests** for eventConfig exports
- **Vitest unit tests** for calendar.ts functions
- **Playwright E2E tests** for mobile menu interactions
- **Playwright E2E tests** for calendar download flow

Current phase: No automated tests required (manual verification sufficient for bug fixes).

## Risks

### Risk 1: Breaking Calendar Import in Other Components
**Likelihood:** LOW
**Impact:** HIGH (calendar feature broken)
**Mitigation:** Grep codebase for all uses of `downloadICS` before modifying calendar.ts
**Detection:** Build failure or calendar button not working

### Risk 2: Missed Event Data References
**Likelihood:** MEDIUM
**Impact:** MEDIUM (inconsistent dates persist)
**Mitigation:** Search entire codebase for all date/time patterns before marking complete
**Detection:** Visual inspection finds mismatched dates

### Risk 3: Mobile Menu Animation Breaking
**Likelihood:** LOW
**Impact:** MEDIUM (poor UX, menu still functional)
**Mitigation:** Test on real mobile device, not just browser dev tools
**Detection:** Menu appears/disappears instantly instead of sliding

### Risk 4: Removing Used Dark Mode Classes
**Likelihood:** LOW
**Impact:** LOW (colors change but site still usable)
**Mitigation:** Only remove `dark:` variants that duplicate base classes
**Detection:** Visual regression - text becomes wrong color

### Risk 5: Timezone Confusion in Calendar
**Likelihood:** MEDIUM
**Impact:** HIGH (users arrive at wrong time)
**Mitigation:** Verify UTC conversion math: CEST = UTC+2, so 9:30 CEST = 7:30 UTC
**Detection:** Test by importing .ics into calendar app in different timezone

## Implementation Approach

### Phase 1: Create Event Configuration
1. Create `src/utils/eventConfig.ts`
2. Define EVENT_CONFIG constant with all event details
3. Calculate UTC times correctly (CEST = UTC+2 in June)
4. Export as const for type safety

### Phase 2: Fix Mobile Menu
1. Remove ThemeToggle import from Header.astro
2. Fix ID references in JavaScript (lines 111, 113)
3. Change `classList.toggle('hidden')` to toggle `translate-x-full`
4. Change `classList.add('hidden')` to add `translate-x-full`
5. Test on mobile viewport

### Phase 3: Centralize Event Data
1. Update `calendar.ts` to import EVENT_CONFIG
2. Update `Hero.astro` to import EVENT_CONFIG
3. Update any other components with hardcoded dates
4. Remove date/time/location keys from `cs.json`

### Phase 4: Clean Dark Mode Variants
1. Audit all `dark:` classes in components
2. Remove variants where base class achieves same result
3. Keep variants only where light mode would differ
4. Document decision in CLAUDE.md

### Phase 5: Verify and Test
1. Run `bun run build` to verify no errors
2. Test mobile menu on actual mobile device
3. Test calendar download and import
4. Visual inspection of all pages
5. Grep for any remaining hardcoded dates

## Verification Checklist

Before marking phase complete:

- [ ] Mobile menu opens and closes smoothly on mobile devices
- [ ] Calendar downloads with filename "slovanske-silove-klani-2026.ics"
- [ ] Calendar .ics file shows June 13, 2026 with 9:30 CEST start time
- [ ] Hero section displays "13.06.2026 | 9:30"
- [ ] No build errors related to ThemeToggle import
- [ ] All dark: variants either removed or justified
- [ ] Grep for "07.06.2026" returns zero results in src/
- [ ] Grep for "10:00" returns zero results except in comments/docs
- [ ] `bun run build` completes successfully
- [ ] `bun run preview` shows site correctly

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `.planning/codebase/CONCERNS.md`, `STRUCTURE.md`, `CONVENTIONS.md`
- Source code inspection: `src/components/Header.astro`, `src/utils/calendar.ts`, `src/components/Hero.astro`, `src/i18n/cs.json`
- Git status: Shows ThemeToggle.astro deleted but import remains

### Secondary (MEDIUM confidence)
- [Astro Configuration Documentation](https://docs.astro.build/en/guides/configuring-astro/) - Configuration best practices
- [TypeScript Const Assertions](https://mimo.org/glossary/typescript/const) - `as const` pattern for config
- [MDN querySelector Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) - ID selector patterns
- [iCalendar RFC 5545 DateTime Spec](https://www.kanzaki.com/docs/ical/dateTime.html) - UTC timezone format
- [Tailwind CSS Dark Mode Guide](https://tailwindcss.com/docs/dark-mode) - Dark mode variant usage
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/) - Vitest integration
- [How to create responsive navigation in Astro](https://web3templates.com/blog/create-responsive-navigation-menu-in-astro-javascript) - Mobile menu patterns

### Tertiary (LOW confidence)
- None - all findings verified with codebase inspection

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Using existing Astro/TypeScript/Tailwind
- Architecture: HIGH - Centralized config is standard TypeScript pattern
- Pitfalls: HIGH - All bugs documented in CONCERNS.md with root causes

**Research date:** 2026-01-25
**Valid until:** 2026-02-25 (30 days - stable bug fix domain)

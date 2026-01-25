---
phase: 01-foundation-fixes
plan: 03
subsystem: ui
tags: [astro, tailwind, i18n, eventConfig]

# Dependency graph
requires:
  - phase: 01-01
    provides: eventConfig.ts as single source of truth for event data
provides:
  - Hero component uses eventConfig for date/time/location display
  - All dark: CSS variants removed from components
  - i18n cs.json cleaned of orphaned event data keys
affects: [02-visual-identity, 03-gallery, future i18n expansion]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "eventConfig pattern: Components import getFormatted* functions for consistent date/time display"
    - "Dark mode enforcement: No dark: variants, base classes use dark theme colors"

key-files:
  created: []
  modified:
    - src/components/Hero.astro
    - src/components/EventInfo.astro
    - src/components/Categories.astro
    - src/components/Partners.astro
    - src/components/Gallery.astro
    - src/i18n/cs.json

key-decisions:
  - "Hero displays 9:30 start time from eventConfig (was hardcoded 10:00)"
  - "Removed all dark: CSS variants site-wide, enforcing dark mode globally"
  - "i18n files contain only translatable text, not event-specific data"

patterns-established:
  - "Pattern 1: Event data lives in eventConfig.ts, not i18n files or hardcoded in components"
  - "Pattern 2: Dark mode is enforced globally via body class, no light mode variants needed"

# Metrics
duration: 3min
completed: 2026-01-25
---

# Phase 01 Plan 03: Event Data Centralization Summary

**Hero component now displays correct 9:30 start time from eventConfig, all dark: CSS variants removed, i18n cleaned of orphaned event data**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-25T11:31:19Z
- **Completed:** 2026-01-25T11:34:20Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Hero component imports from eventConfig for consistent date/time/location display
- Corrected Hero start time from hardcoded 10:00 to correct 9:30 from eventConfig
- Removed all 12 dark: CSS variant classes from 4 components
- Cleaned cs.json of 3 orphaned keys (date, time, location) never used by Hero

## Task Commits

Each task was committed atomically:

1. **Task 1: Update Hero.astro to use eventConfig** - `decb5c3` (feat)
2. **Task 2: Remove dark: variants from remaining components** - `034d587` (refactor)
3. **Task 3: Clean up i18n cs.json date/time values** - `a85e7c9` (refactor)

## Files Created/Modified
- `src/components/Hero.astro` - Now imports getFormattedDateTime() and getFullLocation() from eventConfig
- `src/components/EventInfo.astro` - Removed 7 dark: variants, uses dark theme colors directly
- `src/components/Categories.astro` - Removed 1 dark: variant
- `src/components/Partners.astro` - Removed 3 dark: variants
- `src/components/Gallery.astro` - Removed 1 dark: variant
- `src/i18n/cs.json` - Removed hero.date, hero.time, hero.location keys (never used)

## Decisions Made

**1. Hero now displays 9:30 start time (not 10:00)**
- Rationale: eventConfig.ts (from 01-01) defines correct 9:30-16:00 event window
- Hero had hardcoded 10:00, which was incorrect
- Now imports getFormattedDateTime() for consistency

**2. All dark: variants removed**
- Rationale: Site enforces dark mode globally via body class (deep-charcoal background)
- Light mode variants like text-charcoal would be invisible on dark background
- Base classes now use dark theme colors (text-light-cream, text-gray-300, etc.)

**3. i18n files contain only translatable text**
- Rationale: hero.date/time/location keys were orphaned data never used by components
- Hero always hardcoded these values, never called t('hero.date')
- Event-specific data belongs in eventConfig.ts, not i18n translation files
- Keeps i18n clean for future localization expansion

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all tasks executed smoothly, build succeeded after each change.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for Phase 02 (Visual Identity):**
- Hero displays correct event data from single source of truth
- All components use consistent dark theme colors
- No conflicting dark: variants to interfere with visual identity implementation
- i18n structure clean for future logo text and translatable content

**No blockers or concerns.**

---
*Phase: 01-foundation-fixes*
*Completed: 2026-01-25*

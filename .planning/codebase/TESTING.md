# Testing Patterns

**Analysis Date:** 2026-01-24

## Test Framework

**Runner:**
- Not configured - no test framework installed
- Testing capability: None detected in dependencies

**Assertion Library:**
- Not installed

**Run Commands:**
- No test scripts in `package.json`
- Available scripts: `dev`, `build`, `preview`, `astro`

## Current Testing Status

**No testing infrastructure present.**

The project currently has no test framework, test runner, or test files in the source code. All test files present (`node_modules/zod/src/v4/core/tests`, etc.) are in dependencies only.

Available dependencies:
```json
{
  "@tailwindcss/vite": "^4.0.0",
  "astro": "^5.16.4",
  "tailwindcss": "^4.0.0"
}
```

## Test File Organization

**Location:** Not applicable - no tests exist

**Naming:** Not established

**Structure:** Not established

## Test Structure

**No existing tests to document.**

To implement testing, establish a framework (e.g., Vitest, Jest) and define structure. Example pattern for future reference:

```typescript
// Recommended structure for future tests
describe('useTranslations', () => {
  it('should retrieve translation for valid key', () => {
    // Test implementation
  });

  it('should return key if translation not found', () => {
    // Test implementation
  });
});
```

## Mocking

**Framework:** Not applicable

**Patterns:** No mocking infrastructure

**What to Mock (future guidance):**
- DOM API calls in browser contexts (`window.URL.createObjectURL`, `document.createElement`)
- API calls if added
- External service dependencies

**What NOT to Mock:**
- Pure utility functions with no side effects (translation lookups)
- Simple data transformations
- Tailwind CSS class rendering (no unit testing of CSS)

## Fixtures and Factories

**Test Data:** Not implemented

**Location:** Not applicable

## Coverage

**Requirements:** None enforced

**View Coverage:** Not configured

## Test Types

**Unit Tests:**
- Not implemented
- Would be useful for: `src/utils/calendar.ts` (ICS generation logic), `src/i18n/utils.ts` (translation lookup)

**Integration Tests:**
- Not implemented
- Would be useful for: component rendering with i18n, calendar download functionality

**E2E Tests:**
- Not implemented
- Astro framework could support E2E tests via Playwright if added
- Would be useful for: full page navigation, form submission in registration component

## Browser APIs Used (Untested)

The project uses several browser APIs that are currently untested:

**In `src/utils/calendar.ts`:**
```typescript
export const downloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'slovanske-silove-klani-2025.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
```

This function relies on:
- `Blob` API
- `document.createElement`
- `window.URL.createObjectURL`
- DOM manipulation

**In `src/components/Header.astro` (client script):**
```typescript
const btn = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('mobile-menu');
btn?.addEventListener('click', () => {
  menu?.classList.toggle('hidden');
});
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu?.classList.add('hidden');
    });
});
```

This relies on:
- DOM queries and manipulation
- Event listeners
- Class list manipulation

## Recommendation for Test Implementation

To add testing to this project:

1. **Install test framework:**
   ```bash
   bun add -D vitest @vitest/ui @testing-library/astro
   ```

2. **Create test directory:**
   - `src/__tests__/` or `src/*.test.ts`

3. **Test priority order:**
   1. `src/utils/calendar.ts` - Pure function with string generation logic
   2. `src/i18n/utils.ts` - Translation lookup with fallback logic
   3. Components using browser APIs (calendar download, mobile menu)

4. **Configuration:** Add `vitest.config.ts` for Astro project

---

*Testing analysis: 2026-01-24*

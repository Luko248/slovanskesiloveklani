# Codebase Concerns

**Analysis Date:** 2026-01-24

## Tech Debt

**i18n System Hard-coded to Czech:**
- Issue: The internationalization system is scaffolded but completely bypassed. `getLangFromUrl()` always returns `'cs'`, and `useTranslations()` hard-codes Czech fallback regardless of language argument.
- Files: `src/i18n/utils.ts`, `src/components/Header.astro`, `src/components/Hero.astro`, `src/components/Registration.astro`, `src/components/Gallery.astro`, `src/components/Footer.astro`
- Impact: Cannot add additional language support without refactoring the i18n system. Any future localization work will require substantial changes across all components.
- Fix approach: Implement proper language routing (URL-based or locale detection), remove hard-coded `lang = 'cs'` assignments, make `useTranslations()` respect the `lang` parameter dynamically, and update all components to use the proper language context.

**Event Date/Time Discrepancies:**
- Issue: Multiple mismatched dates and times across components. `src/utils/calendar.ts` shows June 13, 2026 at 10:00 CEST (lines 5-6), `src/components/Hero.astro` displays the same. However, `src/i18n/cs.json` references June 7, 2026 (line 12). CSV export filename says "2025" instead of "2026" (line 30 of calendar.ts).
- Files: `src/utils/calendar.ts`, `src/components/Hero.astro`, `src/i18n/cs.json`
- Impact: Users will see conflicting event dates. Calendar exports will appear outdated with "2025" filename. Potential registration confusion.
- Fix approach: Audit actual event date, update all references consistently, fix ICS filename to use correct year, update translations file to match.

**Gallery Uses External CDN Images:**
- Issue: Gallery section (`src/components/Gallery.astro` lines 6-13) loads all images from Unsplash URLs without fallback. Comment on line 5 acknowledges placeholder status: "Placeholders from Unsplash - Need to be replaced by real images in future".
- Files: `src/components/Gallery.astro`
- Impact: External dependency on Unsplash availability. Images may be removed or URL patterns changed. Gallery is non-functional for actual event images. Page relies on third-party CDN.
- Fix approach: Replace with local images stored in `public/images/gallery/` directory. Consider image optimization and compression strategy. Implement proper image loading states.

**Mobile Menu JavaScript Issues:**
- Issue: In `src/components/Header.astro` (lines 111-129), the script references elements by wrong IDs. Button searches for `'mobile-menu-toggle'` (line 111) but HTML defines `'mobile-menu-btn'` (line 71). Similarly, `'add-to-calendar'` (line 113) doesn't exist; button ID is `'add-to-calendar-btn'` (line 58). This breaks mobile menu functionality.
- Files: `src/components/Header.astro`
- Impact: Mobile menu toggle doesn't work. Calendar button click handlers may fail on mobile. Poor user experience on small screens.
- Fix approach: Fix all ID references to match HTML element IDs. Use `querySelector()` with correct selectors or data attributes for more robust targeting.

**Calendar Download Filename Mismatch:**
- Issue: The downloaded .ics file is named `'slovanske-silove-klani-2025.ics'` (line 30 in `src/utils/calendar.ts`) but event is in 2026.
- Files: `src/utils/calendar.ts`
- Impact: Users download outdated filename. Confusion about event year. Poor branding in user file systems.
- Fix approach: Update filename to `'slovanske-silove-klani-2026.ics'` or make it dynamic based on event year.

## Known Bugs

**Mobile Menu Not Functional:**
- Symptoms: Mobile menu button click does nothing. Menu doesn't open/close on mobile devices.
- Files: `src/components/Header.astro`
- Trigger: Click mobile menu button on screen width < 768px (where navigation is hidden).
- Root cause: ID mismatch between HTML button (`'mobile-menu-btn'`) and JavaScript query (`'mobile-menu-toggle'`). Additionally, code uses `classList.toggle('hidden')` but component structure uses `translate-x-full` for animations, not `hidden` class.
- Workaround: Manually test only on desktop width or switch to desktop view in browser dev tools.

**Calendar Button Click Handler May Fail:**
- Symptoms: "Add to Calendar" button may not trigger download on some interactions.
- Files: `src/components/Header.astro`
- Trigger: Click calendar button on mobile.
- Root cause: Script searches for `'add-to-calendar'` (line 113) but actual button ID is `'add-to-calendar-btn'` (line 58). Desktop button works by ID match, but mobile button at line 102 has correct ID, creating inconsistency.
- Workaround: Use desktop view to download calendar.

## Security Considerations

**Direct Email Address Exposure:**
- Risk: Email address `SlovanskeSiloveKlani@gmail.com` is hardcoded in multiple components as `mailto:` links, making it publicly visible in HTML source and searchable by bots.
- Files: `src/components/Registration.astro` (line 31), `src/components/Partners.astro` (line 59), `src/components/Footer.astro` (line 46)
- Current mitigation: None. Email is plain text in source.
- Recommendations: Consider implementing email protection (obfuscation, JavaScript decoding, contact form). For public campaigns like this, accept exposure but monitor for spam. Consider alternative contact method (contact form with server-side handling).

**Unsplash Image URLs Unverified:**
- Risk: Gallery loads images from untrusted Unsplash CDN. No integrity checks or Content Security Policy headers.
- Files: `src/components/Gallery.astro`
- Current mitigation: Browser default CORS and script execution policies.
- Recommendations: Implement CSP headers in deployment. Use local images instead. If external images necessary, add subresource integrity (SRI) attributes.

**No Input Validation on Email Links:**
- Risk: Pre-filled email subjects and body text in mailto: links are not escaped, could potentially be exploited if dynamic content is added.
- Files: `src/components/Registration.astro` (line 31), `src/components/Partners.astro` (line 59)
- Current mitigation: Currently only static text, so low risk.
- Recommendations: If making dynamic, properly escape all URL parameters. Use form submission instead of mailto: for sensitive data.

## Performance Bottlenecks

**Hero Background Image Processing:**
- Problem: Large background image with multiple CSS filters applied inline (contrast, brightness, sepia, saturate) on every page load (line 16 in `src/components/Hero.astro`). Image uses `bg-fixed` creating reflow on scroll.
- Files: `src/components/Hero.astro`
- Cause: Multiple filter layers and fixed background attachment. No lazy loading since hero is above fold.
- Improvement path: Pre-process image with filters in build step, store as optimized asset. Remove `bg-fixed` or implement will-change CSS. Use modern image formats (WebP with fallback).

**Gallery Grid Load Performance:**
- Problem: 6 Unsplash images loaded simultaneously (lines 26-43 in `src/components/Gallery.astro`). No pagination, lazy loading only added via `loading="lazy"` attribute. Large download if all images trigger.
- Files: `src/components/Gallery.astro`
- Cause: No pagination, no intersection observer, network requests not optimized.
- Improvement path: Implement lazy loading with intersection observer. Add pagination. Replace CDN images with optimized local assets. Consider thumbnail previews.

**Unused Zod Dependency:**
- Problem: Zod library included in `node_modules` (seen in test file paths) but not used in codebase. Adds ~200KB to bundle.
- Files: Package dependencies
- Cause: Possible leftover from scaffolding or earlier implementation plan.
- Improvement path: Audit dependencies, remove if truly unused. Consider form validation library only if forms are implemented.

## Fragile Areas

**Component Props Inconsistency:**
- Files: `src/components/Header.astro`, `src/components/Hero.astro`, `src/components/Categories.astro`, `src/components/EventInfo.astro`, `src/components/Gallery.astro`, `src/components/Registration.astro`, `src/components/Footer.astro`
- Why fragile: Some components accept `lang` prop (Header, Hero, Footer) but hard-code `const lang = 'cs'` anyway, ignoring the prop. This creates illusion of i18n support without actual functionality. Components like `Categories.astro` don't accept lang prop at all. Refactoring the i18n system will require changes to every component.
- Safe modification: Always test language fallback behavior. Add type checking for prop usage. Consider creating a shared `useLang()` hook instead of repeating pattern.
- Test coverage: No tests exist to verify prop handling or i18n fallback behavior.

**Header Mobile Navigation Logic:**
- Files: `src/components/Header.astro`
- Why fragile: DOM queries by wrong IDs (lines 111-114). CSS animations use `translate-x-full` but JavaScript tries to toggle `hidden` class. Mixing animation libraries (Tailwind animate classes + custom transform states) creates confusion. No error handling for missing elements.
- Safe modification: Refactor to use data attributes (`data-menu`, `data-toggle`) for more robust targeting. Choose single animation approach (Tailwind or custom CSS). Add defensive null checks.
- Test coverage: No unit tests. Manual browser testing required.

**Email/Registration Flow Hardcoded:**
- Files: `src/components/Registration.astro`, `src/components/Footer.astro`, `src/components/Partners.astro`
- Why fragile: All contact methods use `mailto:` links with hardcoded email and pre-filled subject/body. No validation, no tracking, no rate limiting. If email address changes, must update in 3 places. If registration process becomes more complex, this approach won't scale.
- Safe modification: Create centralized config file for contact email and templates. Consider contact form with server-side handling if volume increases. Implement proper form submission.
- Test coverage: No automated tests. Manual email client testing only.

## Scaling Limits

**No Backend Infrastructure:**
- Current capacity: Static site only. Can handle millions of page views via CDN, but no actual registration processing.
- Limit: Registration is email-based (`mailto:` links). No database, no confirmation, no payment processing, no capacity limits. Organizers manually process email registrations.
- Scaling path: Implement backend API (Node.js, Python, etc.) with database. Add registration form with validation, confirmation flow, payment integration. Implement capacity limits per category.

**Single Deployment Target:**
- Current capacity: Astro builds to static HTML. Deploys to single domain `https://slovanskesiloveklani.cz`.
- Limit: No CDN caching strategy, no multi-region deployment, no API gateway.
- Scaling path: Add CDN (Cloudflare, AWS CloudFront). Implement static asset versioning for cache busting. Add monitoring/analytics.

## Test Coverage Gaps

**No Tests for Any Component:**
- What's not tested: All components, utilities, i18n functions, calendar export functionality, mobile menu interactions, form links.
- Files: All files in `src/` - none have corresponding `.test.ts` or `.spec.astro` files.
- Risk: Regression bugs on refactoring (e.g., i18n changes). Mobile menu is already broken without test detection. Date discrepancies went unnoticed. Calendar filename mismatch wasn't caught.
- Priority: High - Should add tests for critical paths: calendar generation, i18n translation, mobile menu toggle, form link generation.

**No E2E Tests:**
- Gap: No end-to-end tests verify user flows like clicking "Register", downloading calendar, navigating menu on mobile.
- Risk: Breaking changes in deployment not caught. User flows fail silently.
- Recommendation: Add Playwright or Cypress tests for critical user paths.

## Missing Critical Features

**No Admin Panel or Analytics:**
- Problem: No way to view registration submissions, track analytics, monitor traffic. All registrations go to unmonitored email.
- Blocks: Cannot measure event success, engagement, or conversion. Cannot respond to bulk registrations.

**No Mobile Menu Functionality (Currently Broken):**
- Problem: Mobile menu cannot be opened due to ID mismatch.
- Blocks: Mobile users cannot navigate site effectively.

**No Actual Gallery Images:**
- Problem: Gallery uses placeholder Unsplash images, not actual event photos.
- Blocks: Cannot showcase previous event quality to potential attendees.

**No Payment/Ticket System:**
- Problem: Registration is free email-based signup with no capacity management or payment processing.
- Blocks: Cannot monetize event, cannot limit registrations by category capacity, cannot enforce capacity limits.

---

*Concerns audit: 2026-01-24*

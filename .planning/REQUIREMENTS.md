# Requirements: Slovanské Silové Klání 2026 Refresh

**Created:** 2026-01-24
**Project:** Event website enhancement for 2026 season
**Status:** Ready for roadmap creation

## Functional Requirements

### FR-001: Fix Critical Bugs
**Priority:** CRITICAL
**Complexity:** LOW
**Source:** Codebase mapping (CONCERNS.md)

- [ ] Fix mobile menu broken functionality
  - Current: Button ID is `mobile-menu-btn` but JavaScript looks for `mobile-menu-toggle`
  - Impact: Mobile navigation completely broken for all mobile users
  - Fix: Align ID in Header.astro with JavaScript selector

- [ ] Fix date inconsistencies across all components
  - Current: June 13, 2026 in some files, June 7, 2026 in others; 9:30-16:00 vs 10:00-18:00
  - Impact: Confusing information, users get wrong event time
  - Fix: Create single source of truth in `utils/eventConfig.ts`, import everywhere

- [ ] Fix calendar download filename
  - Current: `slovanske-silove-klani-2025.ics`
  - Expected: `slovanske-silove-klani-2026.ics`
  - Impact: Users download file with wrong year in name

**Acceptance Criteria:**
- Mobile menu opens/closes on all devices
- All date references show June 13, 2026, 9:30-16:00 CEST
- Calendar downloads with 2026 in filename
- All changes verified on mobile devices

---

### FR-002: Full Viewport Countdown Timer
**Priority:** HIGH
**Complexity:** MEDIUM
**Source:** User requirements

- [ ] Create countdown component showing days/hours/minutes/seconds until event
  - Event time: June 13, 2026, 9:30 CEST (UTC+2)
  - Display: Large, eye-catching, full viewport height
  - Behavior: Updates every second

- [ ] Make countdown full viewport height on all devices
  - Desktop: Full viewport height
  - Mobile: Full viewport height (use `100dvh` to account for mobile browser bars)
  - Responsive: Adapt typography to viewport size

- [ ] Auto-hide countdown after event starts
  - Check if current time > event start time
  - Hide element with `display: none` or remove from DOM
  - Prevent memory leaks by clearing interval

- [ ] Handle timezone correctly
  - Use explicit timezone offset: `new Date('2026-06-13T09:30:00+02:00')`
  - Display works correctly regardless of user's local timezone

**Acceptance Criteria:**
- Countdown displays accurately in user's browser (accounting for their timezone)
- Full viewport height on desktop (1920px) and mobile (375px)
- Automatically disappears after June 13, 2026, 9:30 CEST
- No memory leaks (interval cleared when countdown ends)
- Passes WCAG AA (readable contrast, ARIA live region for updates)

---

### FR-003: Attractions Section with CSS-Only Carousel
**Priority:** HIGH
**Complexity:** MEDIUM
**Source:** User requirements

- [ ] Create new Attractions section
  - Position: Between Categories and Gallery sections
  - Content: 5 attractions with images and descriptions

- [ ] Implement CSS-only carousel using Scroll Snap
  - Technology: `scroll-snap-type: x mandatory`, `scroll-snap-align: center`
  - No JavaScript required for scrolling
  - Touch-friendly on mobile (swipe to navigate)

- [ ] Add 5 attraction items
  1. Combat demonstrations (swords, spears, shields)
  2. Falconry with birds of prey
  3. Artisan stalls (glass and metal products)
  4. Artistic blacksmith
  5. Food and drink (beer on tap, non-alcoholic drinks, food)

- [ ] Each item includes:
  - Unsplash image (event-appropriate)
  - 1-2 sentence description
  - Consistent styling with theme

- [ ] Ensure accessibility
  - Keyboard navigation (Tab, Arrow keys)
  - Focus indicators on carousel items
  - Screen reader announces content
  - ARIA labels for navigation

**Acceptance Criteria:**
- Carousel scrolls smoothly with mouse/touch/keyboard
- All 5 attractions display with images and descriptions
- Images from Unsplash, optimized with Astro `<Image />`
- Keyboard accessible (Tab to enter, Arrow keys to navigate, Tab to exit)
- Passes axe DevTools with 0 violations
- Works on mobile (touch swipe) and desktop (mouse drag, keyboard)

---

### FR-004: CSS Scroll-Driven Fade-In Animations
**Priority:** MEDIUM
**Complexity:** MEDIUM-HIGH
**Source:** User requirements

- [ ] Implement scroll-driven animations for all sections
  - Effect: Fade in from bottom to top as user scrolls
  - Technology: CSS `animation-timeline: view()` with `@keyframes`
  - Progressive enhancement: Works without animations in older browsers

- [ ] Apply animations to sections:
  - Hero
  - EventInfo
  - Categories
  - Gallery
  - Attractions
  - Registration
  - Partners

- [ ] Respect `prefers-reduced-motion`
  - Disable animations for users with motion sensitivity
  - Use media query: `@media (prefers-reduced-motion: reduce)`
  - Ensure content is immediately visible without animations

- [ ] Feature detection and fallback
  - Use `@supports (animation-timeline: view())`
  - Fallback: Immediate visibility without animations
  - No broken layouts in older browsers

**Acceptance Criteria:**
- Sections fade in from bottom as user scrolls down page
- Animations disabled when user has `prefers-reduced-motion` enabled
- Works in Chrome 115+, Edge 115+, Safari 17+
- Graceful fallback in older browsers (content visible, no animation)
- Smooth, performant (60fps on modern devices)

---

### FR-005: Visual Consistency (Icons & Buttons)
**Priority:** HIGH
**Complexity:** LOW-MEDIUM
**Source:** User requirements

- [ ] Standardize all icons to outlined style
  - Audit current icons in all components
  - Replace with outlined SVG icons
  - Create icon component or utilities for consistency

- [ ] Implement modern button design system
  - Variants: Primary, Secondary
  - Sizes: Small (for navigation), Default (for general use)
  - States: Default, Hover, Focus, Disabled
  - Accessibility: Min touch target 44px × 44px, visible focus indicators

- [ ] Apply button system across site
  - Navigation: Small buttons
  - Registration CTA: Default primary button
  - Secondary actions: Default secondary button
  - All buttons meet WCAG AA contrast requirements

**Acceptance Criteria:**
- All icons use consistent outlined style
- Two button variants (primary, secondary) and two sizes (small, default)
- All buttons have hover, focus, and disabled states
- Focus indicators meet WCAG AA (visible, 2px ring)
- Touch targets minimum 44px × 44px on mobile
- Buttons styled with Tailwind utilities in component library

---

### FR-006: MedievalSharp Text-Only Logo
**Priority:** LOW
**Complexity:** LOW
**Source:** User requirements

- [ ] Replace SVG logos with text-only logo
  - Font: MedievalSharp (already loaded from Google Fonts)
  - Text: "Slovanské Silové Klání" or abbreviated version
  - Styling: Use existing Tailwind theme colors

- [ ] Apply text logo in Header component
  - Remove old SVG logo references
  - Add text with MedievalSharp font class
  - Consider text shadow for depth (optional)

- [ ] Ensure accessibility
  - Logo acts as home link
  - ARIA label if abbreviated
  - Readable contrast on dark background

**Acceptance Criteria:**
- SVG logos removed from codebase
- Text logo uses MedievalSharp font
- Logo readable on dark charcoal background (WCAG AA contrast)
- Logo links to home (current behavior maintained)

---

### FR-007: Sponsorship Welcome Message
**Priority:** LOW
**Complexity:** LOW
**Source:** User requirements

- [ ] Add welcome message to Partners section
  - Tone: Viking-themed, welcoming (not aggressive)
  - Content: Encourage partnerships, friendly invitation
  - Length: 2-3 sentences
  - Language: Czech

- [ ] Position above or below partner logos
  - Integrate with existing Partners component
  - Maintain visual hierarchy

**Acceptance Criteria:**
- Message added to Partners section
- Tone is welcoming and fits Viking theme
- Translated to Czech in i18n/cs.json
- Visually integrated with Partners section

---

### FR-008: Remove Light Theme Remnants
**Priority:** MEDIUM
**Complexity:** LOW
**Source:** User requirements, tech debt

- [ ] Remove all light theme CSS classes
  - Audit global.css for unused light theme colors
  - Remove light theme variants from components
  - Clean up unused Tailwind utilities

- [ ] Ensure dark theme enforced globally
  - Verify deep-charcoal background everywhere
  - Verify light-cream text everywhere
  - Remove theme toggle if present

**Acceptance Criteria:**
- No light theme CSS classes in codebase
- All pages render in dark theme only
- CSS bundle size reduced (unused styles removed)

---

## Non-Functional Requirements

### NFR-001: WCAG 2.1 Level AA Compliance
**Priority:** CRITICAL
**Complexity:** MEDIUM-HIGH
**Source:** User requirements, legal compliance

- [ ] Color contrast meets WCAG AA ratios
  - Normal text: Minimum 4.5:1 contrast ratio
  - Large text (18pt+/14pt+ bold): Minimum 3:1 contrast ratio
  - Interactive elements: Minimum 3:1 contrast ratio
  - Test all color pairs with contrast checker

- [ ] ARIA labels for all interactive elements
  - Icon-only buttons have `aria-label`
  - Navigation has `role="navigation"`, `aria-label="Main navigation"`
  - Landmarks: `<main>`, `<nav>`, `<footer>` with labels
  - Forms have associated labels

- [ ] Keyboard navigation works completely
  - All interactive elements reachable with Tab
  - Logical tab order (follows visual layout)
  - Carousel navigable with Arrow keys
  - Modal/menu closable with Escape key
  - Skip links for main content

- [ ] Focus indicators visible and clear
  - All focusable elements have visible focus state
  - Focus ring minimum 2px, high contrast
  - Use Tailwind `focus:ring-2 focus:ring-viking-red focus:ring-offset-2`

- [ ] Semantic HTML structure
  - Single `<h1>` per page
  - Sequential heading hierarchy (h1 → h2 → h3, no skipping)
  - Proper landmarks (`<main>`, `<nav>`, `<section>`, `<article>`)
  - Lists use `<ul>`, `<ol>`, `<li>`

- [ ] Images have descriptive alt text
  - Content images describe what's in the image
  - Decorative images have empty alt (`alt=""`)
  - Gallery photos: "Competitor lifting atlas stone at 2025 event"

- [ ] Screen reader compatibility
  - Test with NVDA (Windows) or VoiceOver (Mac)
  - Countdown has `aria-live="polite"` for updates
  - Carousel announces current item number

- [ ] Responsive touch targets
  - Minimum 44px × 44px for all interactive elements
  - Adequate spacing between touch targets

**Acceptance Criteria:**
- axe DevTools: 0 violations
- Lighthouse Accessibility score: 100
- Manual keyboard test: All features accessible without mouse
- Screen reader test: All content announced correctly
- Color contrast tool: All text/background pairs pass WCAG AA
- Manual testing checklist completed

---

### NFR-002: Performance Optimization
**Priority:** HIGH
**Complexity:** MEDIUM
**Source:** User requirements

- [ ] Optimize all images with Astro Image component
  - Move images from `public/` to `src/images/`
  - Replace `<img>` tags with `<Image />` component
  - Generate WebP/AVIF formats with JPEG fallback
  - Generate responsive srcset for different viewport sizes
  - Add width/height attributes to prevent CLS

- [ ] Lazy load below-the-fold images
  - Gallery images: `loading="lazy"`
  - Attractions carousel images: `loading="lazy"`
  - Hero image: `loading="eager"` (above fold)

- [ ] Optimize CSS
  - Remove unused Tailwind utilities (automatic purging)
  - Reduce CSS filters on hero background (combine or pre-apply)
  - Extract critical CSS for above-the-fold content (optional)

- [ ] Optimize fonts
  - Consider self-hosting MedievalSharp and Inter
  - Use `font-display: swap` for faster initial render
  - Subset fonts to Czech characters only (optional)

- [ ] Minimize JavaScript bundle
  - Only countdown timer needs client-side JS
  - Use `client:idle` to defer hydration
  - No heavy libraries (carousel is CSS-only)

**Acceptance Criteria:**
- Lighthouse Performance score: 90+
- Lighthouse Best Practices score: 90+
- Core Web Vitals:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
- Images served in WebP/AVIF with fallbacks
- All images have width/height to prevent layout shift

---

### NFR-003: Responsive Design
**Priority:** HIGH
**Complexity:** LOW-MEDIUM
**Source:** User requirements

- [ ] Test and fix all breakpoints
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+

- [ ] Ensure flawless behavior on all devices
  - Countdown: Full viewport height on mobile and desktop
  - Carousel: Touch-friendly swipe on mobile
  - Navigation: Mobile menu works correctly
  - Images: Responsive, no horizontal scroll
  - Typography: Scales appropriately

- [ ] Test on real devices
  - iOS Safari (iPhone)
  - Android Chrome (various devices)
  - Desktop browsers (Chrome, Firefox, Safari, Edge)

- [ ] Prevent common responsive issues
  - No horizontal scroll on mobile
  - Touch targets minimum 44px × 44px
  - Use `100dvh` instead of `100vh` for mobile viewport
  - Test orientation changes (portrait/landscape)

**Acceptance Criteria:**
- Site works flawlessly on mobile (375px), tablet (768px), desktop (1920px)
- No horizontal scroll on any breakpoint
- All interactive elements easy to tap on mobile
- Tested on real iOS and Android devices
- Responsive behavior verified in Chrome DevTools

---

### NFR-004: Browser Compatibility
**Priority:** MEDIUM
**Complexity:** LOW
**Source:** Technical constraints

- [ ] Modern browser support with progressive enhancement
  - Chrome 115+ (scroll-driven animations work)
  - Edge 115+ (scroll-driven animations work)
  - Safari 17+ (scroll-driven animations work)
  - Firefox latest (all features work)

- [ ] Graceful degradation for older browsers
  - Scroll-driven animations: Use `@supports` detection
  - Fallback: Content visible immediately without animations
  - CSS Scroll Snap: Universal support, no fallback needed
  - JavaScript countdown: Universal support

- [ ] Feature detection
  ```css
  @supports (animation-timeline: view()) {
    /* Modern browsers: scroll animations */
  }

  @supports not (animation-timeline: view()) {
    /* Older browsers: static content */
  }
  ```

**Acceptance Criteria:**
- All features work in Chrome, Edge, Firefox, Safari (latest versions)
- Graceful degradation in older browsers (content visible, animations optional)
- No JavaScript errors in any browser
- Feature detection prevents broken layouts

---

## Content Requirements

### CR-001: Event Information Consistency
**Priority:** CRITICAL
**Complexity:** LOW
**Source:** Bug fixes, data integrity

- [ ] Single source of truth for event data
  - Create `utils/eventConfig.ts`
  - Export EVENT_CONFIG constant
  - Import in all components needing event data

- [ ] Event details (final, consistent values):
  - **Date:** Saturday, June 13, 2026
  - **Start Time:** 9:30 CEST (UTC+2)
  - **End Time:** 16:00 CEST (UTC+2)
  - **Location:** Za Hasičskou Zbrojnicí, Pustiměř, Czech Republic
  - **Timezone:** Europe/Prague (CEST in June)

- [ ] Apply consistent event data to:
  - Hero section (date/time display)
  - Countdown timer (target date/time)
  - Calendar export (.ics file)
  - Meta tags (structured data)
  - Footer (if date referenced)

**Acceptance Criteria:**
- All components show identical event information
- Calendar export generates correct date/time with timezone
- Countdown targets correct event start time
- No date/time inconsistencies anywhere on site

---

### CR-002: Gallery and Attractions Images
**Priority:** MEDIUM
**Complexity:** LOW
**Source:** User requirements

- [ ] Use Unsplash for placeholder images
  - Gallery: Event-appropriate images (strongman, competition, Viking theme)
  - Attractions carousel: Specific images for each attraction
  - All images high quality, landscape orientation

- [ ] Optimize all Unsplash images
  - Download and store in `src/images/`
  - Use Astro `<Image />` component
  - Generate responsive sizes
  - Add descriptive alt text

- [ ] Attractions carousel images:
  1. Combat demonstrations: Swords/spears/shields in action
  2. Falconry: Birds of prey
  3. Artisan stalls: Glass or metalwork
  4. Blacksmith: Artistic blacksmithing
  5. Food/drink: Festival food stalls or beer taps

**Acceptance Criteria:**
- All gallery images from Unsplash, event-appropriate
- Attractions carousel has 5 unique images matching descriptions
- All images optimized with Astro `<Image />`
- Descriptive alt text for all images

---

### CR-003: Czech Language Content
**Priority:** MEDIUM
**Complexity:** LOW
**Source:** Content requirements

- [ ] Add new translation keys to `i18n/cs.json`
  - Countdown labels (days, hours, minutes, seconds)
  - Attractions section heading and descriptions
  - Sponsorship welcome message
  - New button labels (if any)
  - Accessibility labels (ARIA)

- [ ] Ensure all content in Czech
  - Hard-coded text moved to translation keys
  - No English placeholder text
  - Consistent terminology across site

**Acceptance Criteria:**
- All new content has translation keys in `i18n/cs.json`
- No hard-coded strings in components
- Site displays entirely in Czech

---

## Testing Requirements

### TR-001: Automated Testing
**Priority:** HIGH
**Complexity:** LOW
**Source:** Quality assurance

- [ ] Run axe DevTools on all pages
  - Target: 0 accessibility violations
  - Fix all critical and serious issues
  - Document and justify minor issues (if any)

- [ ] Run Lighthouse audits
  - Performance: 90+
  - Accessibility: 100
  - Best Practices: 90+
  - SEO: 90+

- [ ] Validate color contrast
  - Use WebAIM Contrast Checker or Chrome DevTools
  - Test all text/background color combinations
  - Verify all pairs meet WCAG AA ratios

**Acceptance Criteria:**
- axe DevTools: 0 violations
- Lighthouse scores meet targets
- All color pairs pass contrast checker

---

### TR-002: Manual Testing
**Priority:** HIGH
**Complexity:** MEDIUM
**Source:** Quality assurance

- [ ] Keyboard navigation testing
  - Tab through entire site (unplug mouse)
  - Test all interactive elements
  - Verify logical tab order
  - Test carousel with Arrow keys
  - Test menu with Escape key

- [ ] Screen reader testing
  - Test with NVDA (Windows) or VoiceOver (Mac)
  - Verify all content announced
  - Verify landmarks work correctly
  - Verify ARIA labels make sense

- [ ] Mobile device testing
  - Test on real iOS device (iPhone)
  - Test on real Android device
  - Test touch gestures (carousel swipe)
  - Test mobile menu
  - Test countdown on mobile viewport

- [ ] Cross-browser testing
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)
  - Test scroll animations in supported browsers
  - Verify graceful degradation in older browsers

**Acceptance Criteria:**
- All features accessible with keyboard only
- Screen reader announces all content correctly
- Site works on real iOS and Android devices
- All browsers render site correctly
- Manual testing checklist completed

---

### TR-003: Performance Testing
**Priority:** MEDIUM
**Complexity:** LOW
**Source:** Quality assurance

- [ ] Test on slow connection
  - Chrome DevTools Network throttling (Slow 3G)
  - Verify images lazy load correctly
  - Verify countdown renders quickly
  - Measure Time to Interactive (TTI)

- [ ] Measure Core Web Vitals
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

- [ ] Test build size
  - Check final bundle size after build
  - Verify CSS purging worked correctly
  - Verify images optimized

**Acceptance Criteria:**
- Site loads quickly on Slow 3G
- Core Web Vitals pass
- Bundle size reasonable (<500KB total)

---

## Out of Scope

These items are explicitly not included in this refresh:

- ❌ Multi-language support (Czech only, despite i18n scaffolding)
- ❌ Backend registration system (email-based contact sufficient)
- ❌ Payment/ticketing system (event is free entry)
- ❌ User accounts or authentication (static site, no user data)
- ❌ Real-time features or live updates (static site generation sufficient)
- ❌ Mobile app (web-only)
- ❌ Video content (photos and text only)
- ❌ Search functionality (single-page layout sufficient)
- ❌ Analytics integration (can be added later if needed)
- ❌ Newsletter signup (can be added later if needed)

---

## Dependencies and Constraints

### External Dependencies
- **Unsplash**: Images for gallery and attractions (free tier)
- **Google Fonts**: MedievalSharp + Inter (free)
- **Google Maps**: Venue location embed (free)

### Technical Constraints
- **No Backend**: Static site, all features must work client-side
- **No Budget**: Cannot use paid services or APIs
- **Browser Support**: Modern browsers with progressive enhancement
- **Hosting**: Static site deployment (Netlify, Vercel, GitHub Pages, etc.)

### Timeline Constraints
- **Must be live before June 13, 2026** (event date)
- **Recommended completion:** Q1 2026 (allows time for testing and promotion)

---

## Success Criteria

This refresh is successful when:

✅ **All bugs fixed**: Mobile menu works, dates consistent, calendar filename correct
✅ **All new features added**: Countdown, attractions carousel, scroll animations, visual consistency
✅ **WCAG 2.1 Level AA achieved**: axe DevTools 0 violations, Lighthouse Accessibility 100
✅ **Performance optimized**: Lighthouse Performance 90+, Core Web Vitals pass
✅ **Responsive design verified**: Works flawlessly on mobile, tablet, desktop
✅ **Manual testing complete**: Keyboard, screen reader, real devices tested
✅ **Site live before event**: Deployed and accessible to users

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FR-001: Fix Critical Bugs | Phase 1 | Pending |
| FR-008: Remove Light Theme Remnants | Phase 1 | Pending |
| CR-001: Event Information Consistency | Phase 1 | Pending |
| FR-005: Visual Consistency (Icons & Buttons) | Phase 2 | Pending |
| FR-006: MedievalSharp Text-Only Logo | Phase 2 | Pending |
| CR-003: Czech Language Content | Phase 2 | Pending |
| FR-002: Full Viewport Countdown Timer | Phase 3 | Pending |
| FR-003: Attractions Section with CSS Carousel | Phase 3 | Pending |
| FR-004: CSS Scroll-Driven Fade-In Animations | Phase 3 | Pending |
| FR-007: Sponsorship Welcome Message | Phase 3 | Pending |
| CR-002: Gallery and Attractions Images | Phase 3 | Pending |
| NFR-001: WCAG 2.1 Level AA Compliance | Phase 4 | Pending |
| NFR-002: Performance Optimization | Phase 5 | Pending |
| NFR-003: Responsive Design | Phase 6 | Pending |
| NFR-004: Browser Compatibility | Phase 6 | Pending |
| TR-001: Automated Testing | Phase 6 | Pending |
| TR-002: Manual Testing | Phase 6 | Pending |
| TR-003: Performance Testing | Phase 6 | Pending |

---

*Requirements defined: 2026-01-24*
*Total requirements: 8 Functional + 4 Non-Functional + 3 Content + 3 Testing = 18 requirements*
*Traceability updated: 2026-01-25*

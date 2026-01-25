# Roadmap: Slovanské Silové Klání 2026 Refresh

## Overview

This roadmap modernizes the existing event website through targeted enhancements: fixing critical bugs, establishing visual consistency, adding modern CSS features (countdown, scroll animations, carousels), achieving WCAG 2.1 Level AA compliance, and optimizing performance. The journey follows a foundation-first approach, building CSS infrastructure before features, then applying accessibility and performance polish.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation Fixes** - Stable foundation with bug fixes and data centralization
- [ ] **Phase 2: CSS Infrastructure** - Design system and reusable patterns
- [ ] **Phase 3: New Features** - Countdown, carousel, and scroll animations
- [ ] **Phase 4: Accessibility Compliance** - WCAG 2.1 Level AA achievement
- [ ] **Phase 5: Performance Optimization** - Image and asset optimization
- [ ] **Phase 6: Testing & Launch Preparation** - Comprehensive testing and verification

## Phase Details

### Phase 1: Foundation Fixes
**Goal**: Establish stable, bug-free foundation with centralized event data
**Depends on**: Nothing (first phase)
**Requirements**: FR-001, FR-008, CR-001
**Success Criteria** (what must be TRUE):
  1. Mobile menu opens and closes correctly on all devices
  2. All event information displays consistently (June 13, 2026, 9:30-16:00 CEST) across all components
  3. Calendar download filename shows 2026 year
  4. Site displays exclusively in dark theme with no light theme artifacts
  5. Event configuration is imported from single source of truth in all components
**Plans**: TBD

Plans:
- [ ] 01-01: TBD (plan not created yet)

### Phase 2: CSS Infrastructure
**Goal**: Establish visual consistency and reusable CSS patterns
**Depends on**: Phase 1
**Requirements**: FR-005, FR-006, CR-003
**Success Criteria** (what must be TRUE):
  1. All icons use consistent outlined style
  2. Button system provides primary and secondary variants in two sizes
  3. Header displays MedievalSharp text-only logo
  4. All new translation keys exist in i18n/cs.json
  5. CSS utilities for scroll animations and carousels are ready for use
**Plans**: TBD

Plans:
- [ ] 02-01: TBD (plan not created yet)

### Phase 3: New Features
**Goal**: Add countdown timer, attractions carousel, and scroll animations
**Depends on**: Phase 2
**Requirements**: FR-002, FR-003, FR-004, FR-007, CR-002
**Success Criteria** (what must be TRUE):
  1. Full-viewport countdown displays accurately and auto-hides after June 13, 2026, 9:30 CEST
  2. Attractions section displays 5 items in CSS-only carousel (combat, falconry, artisans, blacksmith, food)
  3. All sections fade in from bottom as user scrolls down page
  4. Partners section includes welcoming sponsorship message
  5. Scroll animations respect prefers-reduced-motion setting
  6. All carousel images are optimized and have descriptive alt text
**Plans**: TBD

Plans:
- [ ] 03-01: TBD (plan not created yet)

### Phase 4: Accessibility Compliance
**Goal**: Achieve WCAG 2.1 Level AA compliance across entire site
**Depends on**: Phase 3
**Requirements**: NFR-001
**Success Criteria** (what must be TRUE):
  1. All text-background color pairs pass WCAG AA contrast ratios (4.5:1 normal, 3:1 large text)
  2. All interactive elements are keyboard accessible with visible focus indicators
  3. Carousel is navigable with keyboard (Tab to enter, Arrow keys to navigate, Tab to exit)
  4. Screen reader announces all content correctly with proper ARIA labels
  5. axe DevTools reports zero accessibility violations
  6. Lighthouse Accessibility score is 100
**Plans**: TBD

Plans:
- [ ] 04-01: TBD (plan not created yet)

### Phase 5: Performance Optimization
**Goal**: Optimize images, fonts, and CSS for fast load times
**Depends on**: Phase 4
**Requirements**: NFR-002
**Success Criteria** (what must be TRUE):
  1. All images use Astro Image component with WebP/AVIF formats
  2. Below-the-fold images lazy load correctly
  3. Lighthouse Performance score is 90 or higher
  4. Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)
  5. Site loads quickly on throttled connection (Slow 3G)
**Plans**: TBD

Plans:
- [ ] 05-01: TBD (plan not created yet)

### Phase 6: Testing & Launch Preparation
**Goal**: Comprehensive testing across browsers, devices, and accessibility tools
**Depends on**: Phase 5
**Requirements**: NFR-003, NFR-004, TR-001, TR-002, TR-003
**Success Criteria** (what must be TRUE):
  1. Site works flawlessly on mobile (375px), tablet (768px), and desktop (1920px) breakpoints
  2. All features tested on real iOS and Android devices
  3. Keyboard navigation verified (entire site accessible without mouse)
  4. Screen reader testing completed (NVDA or VoiceOver)
  5. Cross-browser testing completed (Chrome, Firefox, Safari, Edge)
  6. Manual testing checklist completed and documented
**Plans**: TBD

Plans:
- [ ] 06-01: TBD (plan not created yet)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation Fixes | 0/TBD | Not started | - |
| 2. CSS Infrastructure | 0/TBD | Not started | - |
| 3. New Features | 0/TBD | Not started | - |
| 4. Accessibility Compliance | 0/TBD | Not started | - |
| 5. Performance Optimization | 0/TBD | Not started | - |
| 6. Testing & Launch Preparation | 0/TBD | Not started | - |

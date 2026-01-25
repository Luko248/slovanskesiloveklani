# Research Summary: Website Enhancement 2026

**Project:** Slovanské Silové Klání Event Website
**Research Date:** 2026-01-24
**Synthesis:** Four research domains (Stack, Features, Pitfalls, Architecture)

## Executive Summary

This 2026 refresh focuses on **polish and modern features**, not a rebuild. The existing Astro + Tailwind CSS v4 stack is solid and needs only targeted enhancements:

1. **Fix critical bugs** (mobile menu, date inconsistencies, calendar filename)
2. **Add modern CSS features** (countdown, scroll animations, CSS-only carousel)
3. **Achieve WCAG 2.1 Level AA** (accessibility compliance)
4. **Optimize performance** (image optimization, target Lighthouse 90+)
5. **Establish visual consistency** (outlined icons, modern button system)

**Key Insight:** No new runtime dependencies needed. Modern web platform + Astro + Tailwind v4 provide everything required.

## Technology Stack Recommendations

### Keep (Already Optimal)
- ✅ **Astro 5.16.4** - Static site generation perfect for event site
- ✅ **Tailwind CSS v4** - Modern CSS-first configuration with @theme
- ✅ **Bun** - Fast package manager
- ✅ **TypeScript** - Strict mode already configured
- ✅ **Google Fonts** - MedievalSharp + Inter fonts

### Add (Zero or Minimal Dependencies)
- **Icon System**: Manual SVG components (no library needed)
- **Image Optimization**: Built-in Astro `<Image />` component (already available)
- **Countdown Timer**: Vanilla JavaScript with setInterval (no library)
- **Carousel**: CSS Scroll Snap (native browser feature)
- **Scroll Animations**: CSS `animation-timeline: view()` (native, progressive enhancement)
- **Testing Tools**: axe DevTools (browser extension) + Lighthouse (built into Chrome)

### Avoid (Anti-Patterns)
- ❌ JavaScript carousel libraries (Swiper, Slick) - CSS does it better
- ❌ Animation libraries (GSAP, Anime.js) - CSS scroll-driven animations are native
- ❌ JavaScript frameworks for countdown - Vanilla JS is sufficient
- ❌ Third-party image CDNs - Astro's built-in optimization is enough
- ❌ State management libraries - Static site, no complex state

## Feature Categorization

### Table Stakes (Must-Have)

**Bug Fixes** - LOW complexity
- Mobile menu ID mismatch (`mobile-menu-toggle` vs `mobile-menu-btn`)
- Date inconsistencies (June 13, 2026 vs June 7, 2026)
- Calendar filename (2025 → 2026)

**WCAG 2.1 Level AA Compliance** - MEDIUM complexity
- Color contrast: 4.5:1 normal text, 3:1 large text
- ARIA labels for interactive elements
- Keyboard navigation (Tab, Arrow keys, Escape)
- Focus indicators on all interactive elements
- Screen reader compatibility

**Performance Optimization** - MEDIUM complexity
- Lighthouse 90+ target
- Image optimization with Astro `<Image />`
- WebP/AVIF format generation
- Lazy loading for below-fold images

**Responsive Design** - LOW-MEDIUM complexity
- Flawless across all breakpoints
- Mobile-first approach
- Touch targets minimum 44px × 44px

### Differentiators (Competitive Advantage)

**Full Viewport Countdown Timer** - MEDIUM complexity
- Large, eye-catching display
- Shows days/hours/minutes/seconds to June 13, 2026 9:30 CEST
- Full viewport height on both desktop and mobile
- Disappears automatically after event starts
- Vanilla JavaScript with timezone awareness

**CSS-Only Carousel for Attractions** - MEDIUM complexity
- 5 attractions: combat demos, falconry, artisan stalls, blacksmith, food/drink
- Image + 1-2 sentence description per item
- CSS Scroll Snap for smooth navigation
- Keyboard accessible (Arrow keys)
- Touch-friendly on mobile

**Scroll-Driven Fade-In Animations** - MEDIUM-HIGH complexity
- Sections fade in from bottom as user scrolls
- CSS `animation-timeline: view()` (modern browsers)
- Respects `prefers-reduced-motion` (accessibility)
- Progressive enhancement (works without animations)

**Visual Consistency** - LOW-MEDIUM complexity
- All icons: outlined style
- Buttons: primary/secondary variants, 2 sizes (small for nav, default for general)
- MedievalSharp text-only logo (replace SVG)
- Sponsorship welcome message (Viking-themed, welcoming)

## Critical Pitfalls to Avoid

### Accessibility (Highest Risk)

**Color Contrast Failures**
- Problem: Viking colors may not meet WCAG AA contrast ratios
- Prevention: Test all color pairs with contrast checker before implementation
- Tools: WebAIM Contrast Checker, Chrome DevTools

**ARIA Misuse**
- Problem: Over-using or incorrectly using ARIA attributes
- Prevention: "No ARIA is better than bad ARIA" - use semantic HTML first
- Test: Screen reader (NVDA, VoiceOver)

**Keyboard Navigation Traps**
- Problem: Users can Tab into carousel but can't escape
- Prevention: Test with keyboard only (unplug mouse)
- Requirement: Tab to exit, Arrow keys to navigate items

**Missing Focus Indicators**
- Problem: Removing outlines without custom focus styles
- Prevention: Use Tailwind `focus:ring-2 focus:ring-viking-red`

### Performance (Medium Risk)

**Unoptimized Images**
- Problem: Loading full-resolution images from Unsplash CDN
- Prevention: Use Astro `<Image />` with width/height attributes
- Impact: Cumulative Layout Shift (CLS), slow page load

**CSS Bloat**
- Problem: Multiple CSS filters on hero background are expensive
- Prevention: Reduce filter count or pre-apply filters to static image

**Memory Leaks in Countdown**
- Problem: setInterval continues after navigation or event end
- Prevention: Clear interval when countdown reaches zero

### Browser Compatibility (Low Risk)

**Scroll-Driven Animations**
- Support: Chrome 115+, Edge 115+, Safari 17+ (excellent in 2026)
- Fallback: Progressive enhancement - animations optional
- Implementation: Use `@supports (animation-timeline: view())`

**Viewport Height on Mobile**
- Problem: `100vh` includes browser address bar, causing overflow
- Prevention: Use `100dvh` (dynamic viewport height) or JavaScript fallback

### Timezone Handling (Low Risk)

**Countdown Time Accuracy**
- Problem: Hardcoded time interpreted as local instead of CEST
- Prevention: Use explicit timezone: `new Date('2026-06-13T09:30:00+02:00')`
- Note: CEST = UTC+2 (summer time)

## Architecture Patterns

### Pattern 1: Configuration-Driven Components

**Create `utils/eventConfig.ts` as single source of truth:**
```typescript
export const EVENT_CONFIG = {
  title: "Slovanské Silové Klání 2026",
  date: new Date("2026-06-13T09:30:00+02:00"),
  endDate: new Date("2026-06-13T16:00:00+02:00"),
  location: "Za Hasičskou Zbrojnicí, Pustiměř",
  timezone: "Europe/Prague", // CEST
} as const;
```

**Why:** Prevents date/time inconsistencies across components (current bug)

### Pattern 2: CSS-Only Interactive Features

**Use modern CSS instead of JavaScript:**
- Carousels: `scroll-snap-type: x mandatory`
- Scroll animations: `animation-timeline: view()`
- Indicators: `::scroll-marker` pseudo-elements

**Why:** Zero JavaScript bundle, better performance, progressive enhancement

### Pattern 3: Minimal Client-Side JavaScript (Islands)

**Only hydrate what needs JavaScript:**
- Countdown timer: `client:idle` (defers until main thread idle)
- Everything else: Static HTML (no hydration)

**Why:** Fast initial render, minimal JavaScript execution

### Pattern 4: Progressive Enhancement

**Ensure graceful degradation:**
- Scroll animations: Use `@supports (animation-timeline: view())`
- Carousels: Manual scroll works even if pseudo-elements unsupported
- Images: WebP/AVIF with JPEG fallback

**Why:** Works for all users, regardless of browser capabilities

## Recommended Build Order

### Phase 1: Foundation Fixes
**Goal:** Stable, bug-free foundation

1. Create `eventConfig.ts` (single source of truth for dates)
2. Fix mobile menu ID mismatch
3. Fix all date inconsistencies to June 13, 2026, 9:30-16:00 CEST
4. Fix calendar filename to 2026
5. Remove all light theme remnants

**Why First:** Prevents regressions when adding features

### Phase 2: CSS Infrastructure
**Goal:** Reusable patterns for features

1. Add scroll animation utilities to `global.css`
2. Create `carousel.css` with reusable patterns
3. Add `@supports` feature detection
4. Implement consistent button component (primary/secondary, 2 sizes)
5. Standardize icon system (outlined style, manual SVGs)

**Why Second:** Enables features in Phase 3 without refactoring

### Phase 3: New Features
**Goal:** User-facing enhancements

1. Countdown timer component (full viewport, auto-hide)
2. Scroll-driven animations (fade-in from bottom)
3. Attractions section with CSS carousel
4. Partners section sponsorship message
5. MedievalSharp text-only logo

**Why Third:** Depends on infrastructure from Phase 2

### Phase 4: Accessibility & Polish
**Goal:** WCAG 2.1 Level AA compliance

1. ARIA labels and roles
2. Keyboard navigation testing
3. Color contrast validation
4. Screen reader testing (NVDA, VoiceOver)
5. Focus indicator improvements

**Why Fourth:** Apply after features are functional

### Phase 5: Performance Optimization
**Goal:** Lighthouse 90+

1. Image optimization (WebP/AVIF, responsive srcset)
2. Lazy loading for below-fold images
3. Font optimization (consider self-hosting)
4. CSS optimization (reduce filters, extract critical CSS)

**Why Last:** Optimize after features complete, easier to measure impact

## Testing Strategy

### Automated Testing (57% of WCAG issues)
- **axe DevTools**: Run on every page, fix all violations
- **Lighthouse**: Target scores (Performance 90+, Accessibility 100)
- **Contrast Checker**: Validate all color pairs

### Manual Testing (43% of WCAG issues)
- **Keyboard Navigation**: Tab through entire site, test all interactions
- **Screen Reader**: Test with NVDA (Windows) or VoiceOver (Mac)
- **Mobile Devices**: Test on actual iOS and Android devices
- **Slow Connection**: Chrome DevTools Network throttling (Slow 3G)

### Cross-Browser Testing
- **Chrome/Edge**: Scroll-driven animations work
- **Safari**: Graceful degradation if animations unsupported
- **Firefox**: All features functional
- **Mobile Safari**: Touch gestures, viewport height

### Performance Testing
- **Lighthouse CI**: Automated in GitHub Actions
- **WebPageTest**: Real-world performance measurement
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

## Success Metrics

### Performance Targets
- Lighthouse Performance: **90+**
- Lighthouse Accessibility: **100**
- Lighthouse Best Practices: **90+**
- Lighthouse SEO: **90+**

### Accessibility Targets
- axe DevTools violations: **0**
- Color contrast (all text): **WCAG AA** (4.5:1 normal, 3:1 large)
- Keyboard navigation: **100% accessible**
- Screen reader compatibility: **All content announced**

### Functionality Targets
- Mobile menu: **Works on all devices**
- Countdown: **Accurate to CEST, auto-hides**
- Carousel: **Smooth scroll, keyboard navigable**
- Animations: **Respect prefers-reduced-motion**
- Event info: **Consistent across all components**

### User Experience Targets
- Event information: **Clear, accurate, consistent**
- Registration: **Easy to find, simple process**
- Gallery: **Fast loading, good UX**
- Partners: **Professional, welcoming**

## Feature Dependencies

**Critical Path:**
```
Bug Fixes (FIRST)
    ↓
Visual Consistency (Design System)
    ↓
├─ Countdown Timer (Header)
├─ Attractions Carousel (New Section)
└─ Scroll Animations (All Sections)
    ↓
WCAG Compliance (Cross-cutting)
    ↓
Performance Optimization (Final Polish)
```

**Parallel Work Possible:**
- Bug fixes and visual consistency can happen simultaneously
- Countdown, carousel, and animations can be developed in parallel (after CSS infrastructure)
- Accessibility can be integrated continuously, final audit at end

## Browser Compatibility Summary

### Excellent Support (95%+ users)
- CSS Scroll Snap (carousels)
- Astro static site generation
- Tailwind CSS v4
- Vanilla JavaScript (countdown)
- WebP/AVIF images with fallbacks

### Good Support (80%+ users, needs progressive enhancement)
- CSS Scroll-Driven Animations (`animation-timeline: view()`)
  - Chrome 115+, Edge 115+, Safari 17+
  - Fallback: Immediate visibility without animations

### Feature Detection Required
```css
@supports (animation-timeline: view()) {
  /* Modern browsers: scroll-driven animations */
}

@supports not (animation-timeline: view()) {
  /* Older browsers: static content, no animations */
}
```

## Key Takeaways

1. **No new runtime dependencies needed** - Modern CSS + Astro + Tailwind v4 handles everything
2. **Fix bugs first** - Stable foundation prevents regressions
3. **Progressive enhancement** - Works for all users, enhanced for modern browsers
4. **CSS over JavaScript** - Better performance, zero bundle size increase
5. **Accessibility is non-negotiable** - WCAG 2.1 Level AA must be achieved
6. **Single source of truth** - Centralize event data to prevent inconsistencies
7. **Test manually** - Automated tools catch 57% of issues, manual testing catches the rest

## Research Sources

### Stack Research
- Tailwind CSS v4 documentation (2026)
- MDN Web Docs: CSS Scroll Snap, Scroll-Driven Animations
- Astro documentation: Image optimization, Islands Architecture
- WCAG 2.1 guidelines
- Chrome DevTools documentation

### Features Research
- WCAG 2.1 Guidelines (W3C)
- Astro documentation: Image optimization
- Tailwind CSS v4 documentation
- axe DevTools documentation

### Pitfalls Research
- WCAG 2.1 Common Failures (W3C)
- WebAIM: Accessibility Testing
- MDN Web Docs: Common Pitfalls
- Lighthouse Performance Guide
- axe DevTools Best Practices

### Architecture Research
- Astro Images Documentation - Image optimization guide
- MDN: CSS Scroll-Driven Animations - animation-timeline specification
- MDN: Creating CSS Carousels - CSS-only carousel patterns
- Astro Islands Architecture - Hydration strategies
- Chrome Blog: CSS Scroll-Triggered Animations
- LogRocket: Modern CSS Carousels
- Nerdy.dev: 4 CSS Features Every Developer Should Know (2026)

---

**Final Recommendation:** This is a **polish pass, not a rebuild**. Focus on fixing broken functionality, adding modern CSS features, and ensuring accessibility—all within the existing Astro + Tailwind architecture. The stack is already optimal for this use case.

**Estimated Complexity:** MEDIUM overall
- Bug fixes: LOW (straightforward)
- CSS features: MEDIUM (new patterns, testing needed)
- Accessibility: MEDIUM-HIGH (requires thorough testing)
- Performance: MEDIUM (image optimization, bundle size)

**Confidence Level:** HIGH - All recommended approaches are proven, well-documented, and appropriate for a static event website in 2026.

---

*Research synthesis for: Slovanské Silové Klání 2026 website refresh*
*Synthesized: 2026-01-24*

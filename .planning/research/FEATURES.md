# Feature Research: Event Website Enhancement

**Research Date:** 2026-01-24
**Domain:** Event promotion, accessibility, modern web features
**Context:** 2026 refresh of existing Slovanské Silové Klání website

## Feature Categorization

### Table Stakes (Must-Have)

**Bug Fixes**
- **Complexity**: LOW
- **What**: Fix mobile menu ID mismatch, date inconsistencies, calendar filename
- **Why**: Core functionality broken, confusing information
- **Risk**: High - Broken navigation affects all mobile users
- **Implementation**: Direct fixes in existing components

**WCAG 2.1 Level AA Compliance**
- **Complexity**: MEDIUM
- **What**: Proper color contrast, ARIA labels, keyboard navigation, focus management
- **Why**: Legal requirement for public websites, accessibility for all users
- **Risk**: Medium - Requires systematic audit and testing
- **Key Areas**: Navigation, forms, interactive elements, images
- **Testing**: axe DevTools + manual keyboard/screen reader testing

**Performance Optimization**
- **Complexity**: MEDIUM
- **What**: Image optimization, CSS optimization, Lighthouse 90+ target
- **Why**: User experience, SEO, mobile performance on slow connections
- **Risk**: Low - Astro provides good defaults
- **Approach**: Use Astro `<Image />`, optimize hero filters, reduce bundle size

**Responsive Design**
- **Complexity**: LOW-MEDIUM
- **What**: Flawless behavior across all breakpoints (mobile, tablet, desktop)
- **Why**: Users access on various devices
- **Risk**: Low - Tailwind CSS makes this straightforward
- **Focus**: Test countdown on mobile viewport, carousel touch gestures

### Differentiators (Competitive Advantage)

**Full Viewport Countdown Timer**
- **Complexity**: MEDIUM
- **What**: Large, eye-catching timer showing days/hours/mins/secs until June 13, 2026 9:30 CEST
- **Why**: Creates urgency, improves engagement
- **Behavior**: Full viewport height, disappears after event starts
- **Tech**: Vanilla JavaScript with setInterval, timezone-aware (CEST)
- **Edge Cases**: Handle timezone differences, prevent memory leaks, update on visibility change

**CSS-Only Carousel for Attractions**
- **Complexity**: MEDIUM
- **What**: Scroll snap carousel with images + 1-2 sentence descriptions
- **Why**: Modern, performant, accessible without JavaScript
- **Tech**: `scroll-snap-type: x mandatory`, `scroll-snap-align: center`
- **Content**: 5 attractions (combat demos, falconry, artisan stalls, blacksmith, food/drink)
- **Accessibility**: Keyboard navigation, focus indicators, proper ARIA

**Scroll-Driven Fade-In Animations**
- **Complexity**: MEDIUM-HIGH
- **What**: Sections fade in from bottom as user scrolls down
- **Why**: Modern, engaging, adds polish to Viking theme
- **Tech**: CSS `animation-timeline: view()` with `@keyframes`
- **Fallback**: Progressive enhancement - works without animations
- **Accessibility**: Respects `prefers-reduced-motion`, no critical content in animations

**Visual Consistency (Icons & Buttons)**
- **Complexity**: LOW-MEDIUM
- **What**: All icons outlined style, buttons with primary/secondary variants + 2 sizes
- **Why**: Professional appearance, cohesive design system
- **Implementation**: Create reusable button components, standardize icon set
- **Sizes**: Small (navigation), default (general use)

**MedievalSharp Text Logo**
- **Complexity**: LOW
- **What**: Replace SVG logos with text-only using existing MedievalSharp font
- **Why**: Simpler maintenance, fits theme, easier to update
- **Implementation**: Text with Tailwind classes, possibly text-shadow for depth

**Sponsorship Welcome Message**
- **Complexity**: LOW
- **What**: Viking-themed, welcoming message in Partners section
- **Why**: Encourages partnerships, sets friendly tone
- **Tone**: Welcoming but not aggressive, fits Viking aesthetic

### Anti-Features (Explicitly Avoid)

**JavaScript-Heavy Carousel Libraries**
- **Why Not**: Adds unnecessary bundle size, worse performance than CSS Scroll Snap
- **Instead**: Native CSS scroll-snap-type

**Animation Libraries (GSAP, Anime.js)**
- **Why Not**: CSS scroll-driven animations are native and performant
- **Instead**: CSS `animation-timeline: view()` with graceful degradation

**JavaScript Framework for Countdown**
- **Why Not**: Overkill for simple time calculation
- **Instead**: Vanilla JavaScript in Astro component `<script>` tag

**Third-Party Image CDNs**
- **Why Not**: Unnecessary cost/complexity for static site
- **Instead**: Astro's built-in `<Image />` with Unsplash sources

**Complex State Management**
- **Why Not**: Static site, no user data, no complex interactions
- **Instead**: Simple component props and vanilla JavaScript where needed

**Multi-Language Support**
- **Why Not**: Czech audience only, despite i18n scaffolding
- **Instead**: Keep i18n structure but hard-code to Czech

**Backend/Database**
- **Why Not**: Email-based registration sufficient, no user accounts needed
- **Instead**: Static site with mailto links

**Light Theme Toggle**
- **Why Not**: Dark Viking theme is core to brand identity
- **Instead**: Remove all light theme remnants, enforce dark mode

## Feature Dependencies

```
Bug Fixes (FIRST) → Everything else depends on stable foundation
├─ Mobile Menu Fix → Navigation works for accessibility testing
├─ Date Consistency → Countdown timer needs correct event time
└─ Calendar Filename → iCalendar download needs correct year

Visual Consistency → Design system needed before new features
├─ Icons → Used in countdown, carousel navigation
└─ Buttons → Used in registration, partners

Countdown Timer → Header redesign
└─ Requires: Correct event date/time

Attractions Section → New content area
├─ Requires: Visual consistency (icons, buttons)
└─ Carousel → Requires: WCAG compliance, responsive design

Scroll Animations → Polish layer
├─ Requires: All sections in place
└─ Requires: WCAG compliance (prefers-reduced-motion)

Performance Optimization → Final polish
└─ Requires: All features implemented
```

## Implementation Complexity Matrix

| Feature | Frontend | Accessibility | Testing | Overall |
|---------|----------|---------------|---------|---------|
| Bug Fixes | LOW | LOW | MEDIUM | LOW |
| Visual Consistency | LOW | LOW | LOW | LOW |
| MedievalSharp Logo | LOW | LOW | LOW | LOW |
| Sponsorship Message | LOW | LOW | LOW | LOW |
| Countdown Timer | MEDIUM | MEDIUM | MEDIUM | MEDIUM |
| Attractions Carousel | MEDIUM | HIGH | HIGH | MEDIUM-HIGH |
| Scroll Animations | MEDIUM | MEDIUM | MEDIUM | MEDIUM |
| WCAG Compliance | LOW | HIGH | HIGH | MEDIUM-HIGH |
| Performance Optimization | MEDIUM | LOW | MEDIUM | MEDIUM |
| Responsive Design | MEDIUM | MEDIUM | HIGH | MEDIUM |

## Browser Compatibility Considerations

**Scroll-Driven Animations:**
- Chrome 115+, Edge 115+, Safari 17+ (excellent support in 2026)
- Fallback: Progressive enhancement - animations are optional
- Feature detection: `@supports (animation-timeline: view())`

**CSS Scroll Snap:**
- Universal support in modern browsers (2026)
- Fallback: Degrades to scrollable container

**Countdown Timer:**
- JavaScript required - works in all browsers
- Edge case: User timezone different from CEST

**Astro Image Optimization:**
- Build-time optimization - works universally
- Outputs: WebP/AVIF with fallbacks

## Success Metrics

**Performance:**
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 90+
- Lighthouse SEO: 90+

**Accessibility:**
- axe DevTools: 0 violations
- Keyboard navigation: All interactive elements accessible
- Screen reader: All content announced properly
- Color contrast: All text meets WCAG AA (4.5:1 normal, 3:1 large)

**Functionality:**
- Mobile menu: Works on all devices
- Countdown: Accurate to event time, disappears after start
- Carousel: Smooth scrolling, keyboard navigable
- Animations: Respect prefers-reduced-motion

**User Experience:**
- Event information: Clear, accurate, consistent
- Registration: Easy to find, simple process
- Gallery: Fast loading, good UX
- Partners: Professional, welcoming

---

**Key Insight**: This is a polish and enhancement pass, not a rebuild. Focus on fixing broken functionality, adding modern CSS features, and ensuring accessibility - all within the existing Astro + Tailwind architecture.

**Sources:**
- WCAG 2.1 Guidelines (W3C)
- MDN Web Docs: CSS Scroll Snap, Scroll-Driven Animations
- Astro documentation: Image optimization, Islands Architecture
- Tailwind CSS v4 documentation
- axe DevTools documentation

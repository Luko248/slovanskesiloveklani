# Pitfalls Research: Common Mistakes & Prevention

**Research Date:** 2026-01-24
**Domain:** Web accessibility, performance, modern CSS, event websites
**Context:** Avoiding common mistakes when enhancing event website

## WCAG 2.1 Level AA Compliance Pitfalls

### Color Contrast Mistakes

**Pitfall**: Using Viking-themed colors without checking contrast ratios
- **Example**: Light gray text on dark charcoal background (2.8:1 - fails AA)
- **WCAG Requirement**: 4.5:1 for normal text, 3:1 for large text (18pt+/14pt+ bold)
- **Prevention**:
  - Use contrast checker tools (WebAIM, Chrome DevTools)
  - Test with light-cream (#F5F1E8) on deep-charcoal (#1A1A1A)
  - Ensure all button states (hover, focus, disabled) meet contrast
- **Fix**: Adjust color values in `@theme` to guarantee AA compliance

**Pitfall**: Decorative colors in data visualization without sufficient contrast
- **Example**: Category badges with low-contrast colors
- **Prevention**: Use semantic color system with guaranteed contrast
- **Fix**: Define color pairs in Tailwind theme that always meet AA

### ARIA Label Misuse

**Pitfall**: Over-using ARIA or using it incorrectly
- **Example**: `<button aria-label="Click here">Register Now</button>` (redundant)
- **Rule**: "No ARIA is better than bad ARIA"
- **Prevention**:
  - Use semantic HTML first (nav, main, section, article)
  - Only add ARIA when semantic HTML isn't enough
  - Test with screen reader (NVDA on Windows, VoiceOver on Mac)
- **Correct Usage**:
  - `aria-label` for icon-only buttons
  - `aria-describedby` for additional context
  - `aria-live` for countdown updates
  - `aria-current="page"` for active navigation

**Pitfall**: Missing alt text or generic alt text
- **Example**: `<img alt="image" />` or `<img alt="" />` for content images
- **Prevention**: Describe what's in the image for gallery photos
- **Correct**: `alt="Competitor lifting atlas stone at 2025 event"`
- **Decorative images**: Use empty alt (`alt=""`) but must be truly decorative

### Keyboard Navigation Issues

**Pitfall**: Missing focus indicators or removing outlines
- **Example**: `button:focus { outline: none; }` without custom focus style
- **Prevention**: Always provide visible focus indicator
- **Correct**: Use Tailwind's `focus:ring-2 focus:ring-viking-red focus:ring-offset-2`

**Pitfall**: Keyboard traps in carousel
- **Example**: User can tab into carousel but can't escape
- **Prevention**:
  - Test with Tab, Shift+Tab, Arrow keys
  - Ensure all interactive elements have logical tab order
  - Carousel should allow Tab to exit, Arrow keys to navigate items

**Pitfall**: Mobile menu not keyboard accessible
- **Example**: Menu toggle button works with mouse but not keyboard
- **Prevention**:
  - Use `<button>` not `<div onclick>`
  - Test Enter/Space to activate
  - Test Escape to close menu

### Heading Structure Mistakes

**Pitfall**: Skipping heading levels or multiple h1 elements
- **Example**: h1 → h3 (skipping h2), or h1 in header + h1 in hero
- **Prevention**: Single h1 per page, sequential heading levels
- **Correct Structure**:
  - h1: "Slovanské Silové Klání 2026"
  - h2: "O Soutěži" (About), "Kategorie" (Categories)
  - h3: Sub-sections within each h2

## CSS Scroll-Driven Animations Pitfalls

### Motion Sickness & Accessibility

**Pitfall**: Ignoring `prefers-reduced-motion`
- **Impact**: Users with vestibular disorders experience nausea, dizziness
- **Prevention**: ALWAYS respect this media query
- **Correct Implementation**:
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

section {
  animation: fade-in-up linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@media (prefers-reduced-motion: reduce) {
  section {
    animation: none; /* Disable animations entirely */
  }
}
```

**Pitfall**: Animating critical content
- **Example**: Text fades in so slowly that users miss it
- **Prevention**: Animations should enhance, not block content access
- **Rule**: Content must be readable without animations

### Browser Compatibility Issues

**Pitfall**: Not providing fallback for older browsers
- **Example**: Animations fail silently in Safari 16
- **Prevention**: Progressive enhancement
- **Correct Approach**:
```css
/* Default: no animation */
section {
  opacity: 1;
  transform: none;
}

/* Enhanced: scroll-driven animation */
@supports (animation-timeline: view()) {
  section {
    animation: fade-in-up linear;
    animation-timeline: view();
  }
}
```

**Pitfall**: Using JavaScript when CSS can do it
- **Why Bad**: More bundle size, worse performance
- **Prevention**: Use CSS scroll-driven animations natively
- **Only Use JavaScript If**: Need complex logic or browser doesn't support

## CSS-Only Carousel Pitfalls

### Accessibility Mistakes

**Pitfall**: No keyboard navigation
- **Example**: Carousel only scrollable with mouse/touch
- **Prevention**:
  - Make carousel items focusable (`tabindex="0"` or interactive elements inside)
  - Test Arrow Left/Right to navigate
  - Add visible scroll indicators

**Pitfall**: No visible active indicator
- **Example**: User can't tell which carousel item is active
- **Prevention**: Use CSS to highlight active item (scale, border, opacity)
- **Implementation**: Intersection Observer + data attributes, or CSS snap indicators

**Pitfall**: Missing scroll hints
- **Example**: User doesn't know carousel is scrollable
- **Prevention**:
  - Add visible scroll buttons/dots (even if CSS-only)
  - Show partial next item to indicate more content
  - Add swipe/drag cursor on desktop

### Performance Issues

**Pitfall**: Loading all carousel images eagerly
- **Example**: 10 high-res Unsplash images load at once
- **Prevention**: Use `loading="lazy"` for off-screen images
- **Correct**: `<Image src={...} alt={...} loading="lazy" />`

**Pitfall**: Unoptimized images in carousel
- **Example**: Serving 4K images when 800px width is sufficient
- **Prevention**: Use Astro `<Image />` with appropriate widths
- **Correct**: Define breakpoint sizes (mobile: 400px, tablet: 600px, desktop: 800px)

## Countdown Timer Pitfalls

### Timezone Handling

**Pitfall**: Hardcoding local time without timezone awareness
- **Example**: "June 13, 2026 9:30" interpreted as user's local time, not CEST
- **Prevention**: Use explicit timezone or UTC offset
- **Correct Implementation**:
```javascript
// Event time: June 13, 2026, 9:30 CEST (UTC+2)
const eventTime = new Date('2026-06-13T09:30:00+02:00');
const now = new Date();
const diff = eventTime - now;
```

**Pitfall**: Daylight Saving Time confusion
- **Example**: CEST is UTC+2, but CET is UTC+1
- **Prevention**: Use specific date string with offset or libraries that handle DST
- **Note**: June 13, 2026 is summer, so CEST (UTC+2) is correct

### Memory Leaks

**Pitfall**: Not clearing interval when component unmounts
- **Example**: `setInterval` continues running after navigation
- **Prevention**: Store interval ID and clear it
- **Correct Astro Pattern**:
```javascript
<script>
let intervalId;

function startCountdown() {
  intervalId = setInterval(updateCountdown, 1000);
}

// Astro components are static, so this is less of an issue,
// but clear interval when timer reaches zero
function updateCountdown() {
  const diff = eventTime - new Date();
  if (diff <= 0) {
    clearInterval(intervalId);
    // Hide countdown
  }
  // Update display
}
</script>
```

### Display Issues

**Pitfall**: Countdown jumping/flickering on load
- **Example**: Shows "0d 0h 0m 0s" before JavaScript calculates
- **Prevention**: Initialize with server-rendered time or placeholder
- **Correct**: Render initial time in Astro frontmatter, then hydrate

**Pitfall**: Not handling negative time after event starts
- **Example**: Shows "-5d" if user visits after event
- **Prevention**: Check if event passed, hide countdown entirely
- **Implementation**: CSS `display: none` when `diff <= 0`

## Performance Optimization Pitfalls

### Image Optimization Mistakes

**Pitfall**: Not using Astro's `<Image />` component
- **Example**: `<img src="/images/hero.jpg">` loads full resolution
- **Prevention**: Always use `<Image />` for content images
- **Correct**: `<Image src={heroImage} alt="..." width={1920} height={1080} />`

**Pitfall**: Loading images without size attributes
- **Example**: Causes Cumulative Layout Shift (CLS)
- **Prevention**: Always specify width/height or aspect-ratio
- **Impact**: CLS hurts Lighthouse performance score

**Pitfall**: Not using modern image formats
- **Example**: Serving JPEG when WebP is 30% smaller
- **Prevention**: Astro `<Image />` automatically generates WebP/AVIF
- **Bonus**: Fallback to JPEG for older browsers

### CSS Bloat

**Pitfall**: Unused Tailwind classes in production
- **Example**: Development includes all Tailwind utilities
- **Prevention**: Tailwind CSS automatically purges unused classes in production
- **Verification**: Check build output size

**Pitfall**: Multiple CSS filters on hero background
- **Example**: `.hero { filter: blur() brightness() contrast(); }` is expensive
- **Prevention**:
  - Combine filters or reduce count
  - Use backdrop-filter sparingly
  - Consider static image with filters pre-applied

### JavaScript Bundle Size

**Pitfall**: Importing entire libraries for small features
- **Example**: `import moment from 'moment'` for date formatting
- **Prevention**: Use native `Intl.DateTimeFormat` or small utilities
- **Countdown**: Vanilla JavaScript is sufficient

## Responsive Design Pitfalls

### Viewport Units Issues

**Pitfall**: Using `100vh` for full-height sections on mobile
- **Example**: Mobile browser address bars make `100vh` taller than viewport
- **Prevention**: Use CSS `100dvh` (dynamic viewport height) or JavaScript
- **Correct for Countdown**: `min-h-[100dvh]` or `min-h-screen` with adjustment

**Pitfall**: Horizontal scroll on mobile
- **Example**: Fixed-width elements exceed viewport
- **Prevention**:
  - Use `max-w-full` on images
  - Test on actual mobile devices
  - Check with Chrome DevTools mobile emulation

### Touch Targets

**Pitfall**: Buttons too small for touch
- **Example**: 24px × 24px close button on mobile menu
- **WCAG Requirement**: Minimum 44px × 44px touch target
- **Prevention**: Use Tailwind `min-h-11 min-w-11` (44px) for mobile buttons

**Pitfall**: Carousel hard to swipe on mobile
- **Example**: Scroll container too small or swipe conflicts with page scroll
- **Prevention**:
  - Make carousel touch-friendly (full-width items, snap to center)
  - Test on real devices with touch

## Content & Copy Pitfalls

### Date/Time Consistency

**Pitfall**: Event time listed differently in multiple places
- **Current Issue**: June 13, 2026 in some files, June 7 in others; 9:30-16:00 vs 10:00-18:00
- **Prevention**: Single source of truth (constant in utils, imported everywhere)
- **Correct Pattern**:
```typescript
// src/utils/eventInfo.ts
export const EVENT_DATE = '2026-06-13';
export const EVENT_START = '09:30';
export const EVENT_END = '16:00';
export const EVENT_TIMEZONE = 'Europe/Prague'; // CEST
```

### Translation Pitfalls

**Pitfall**: Hardcoding text instead of using i18n system
- **Example**: "Register Now" in JSX instead of `t('registration.cta')`
- **Prevention**: Always use translation keys, even if only Czech exists
- **Why**: Makes future multi-language support easier

### Accessibility Copy

**Pitfall**: Generic link text
- **Example**: "Click here" or "Learn more" without context
- **Prevention**: Descriptive link text ("View competition categories")
- **Screen Reader Impact**: Screen readers list links out of context

## Testing Pitfalls

### Accessibility Testing Gaps

**Pitfall**: Only running automated tools
- **Example**: axe DevTools passes, but keyboard navigation broken
- **Prevention**: Test manually with:
  - Keyboard only (unplug mouse)
  - Screen reader (NVDA, VoiceOver)
  - Color blindness simulator
  - High contrast mode

**Pitfall**: Not testing on real devices
- **Example**: Looks perfect in Chrome DevTools, broken on iPhone
- **Prevention**: Test on actual mobile devices (iOS Safari, Android Chrome)

### Performance Testing Mistakes

**Pitfall**: Only testing on fast connection
- **Example**: Site fast on dev machine, slow on 3G mobile
- **Prevention**: Chrome DevTools Network throttling (Slow 3G)
- **Target**: Lighthouse performance 90+ on simulated slow connection

## Git/Deployment Pitfalls

**Pitfall**: Committing .env files with secrets
- **Example**: API keys in git history
- **Prevention**: This project has no secrets, but good practice to check
- **Verification**: `git status` before commit

**Pitfall**: Breaking production with broken build
- **Example**: Astro build fails, CI catches it too late
- **Prevention**: Always run `bun run build` before committing
- **CI**: GitHub Actions already set up to catch this

## Summary: Critical Checks Before Launch

**Accessibility:**
- [ ] axe DevTools: 0 violations
- [ ] Keyboard navigation: Tab through entire site
- [ ] Screen reader: Test with NVDA/VoiceOver
- [ ] Color contrast: All text meets WCAG AA
- [ ] Focus indicators: Visible on all interactive elements
- [ ] Heading structure: Single h1, sequential levels

**Performance:**
- [ ] Lighthouse: Performance 90+, Accessibility 100
- [ ] Images: All optimized with Astro `<Image />`
- [ ] Build size: Check bundle size is reasonable
- [ ] Mobile: Test on real devices, slow 3G

**Functionality:**
- [ ] Mobile menu: Works on all devices
- [ ] Countdown: Correct time, timezone, hides after event
- [ ] Carousel: Keyboard + touch navigation
- [ ] Animations: Respect prefers-reduced-motion
- [ ] All dates: Consistent June 13, 2026, 9:30-16:00
- [ ] Calendar: Downloads with correct 2026 filename

**Cross-Browser:**
- [ ] Chrome/Edge: Scroll animations work
- [ ] Safari: Graceful degradation if no scroll-driven animations
- [ ] Firefox: All features work
- [ ] Mobile Safari: Touch gestures, viewport height

---

**Key Insight**: Most pitfalls come from not testing with real accessibility tools and real users. Automated checks catch 57% of WCAG issues - the other 43% require manual testing with keyboard, screen reader, and actual devices.

**Sources:**
- WCAG 2.1 Common Failures (W3C)
- WebAIM: Accessibility Testing
- MDN Web Docs: Common Pitfalls
- Lighthouse Performance Guide
- axe DevTools Best Practices

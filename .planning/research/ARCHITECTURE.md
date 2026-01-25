# Architecture Research

**Domain:** Static Event Website with Modern CSS Features
**Researched:** 2026-01-24
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    BaseLayout (HTML Shell)                   │
│  - Global CSS (@theme, animations, custom cursor)           │
│  - Google Fonts (MedievalSharp, Inter)                      │
│  - Slavic pattern background                                │
├─────────────────────────────────────────────────────────────┤
│                      Static Components Layer                 │
│  ┌──────┐  ┌──────┐  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │Header│  │ Hero │  │EventInfo │  │Categories│  │Gallery ││
│  └──┬───┘  └──┬───┘  └────┬─────┘  └────┬─────┘  └───┬────┘│
│     │         │            │             │            │     │
│  ┌──┴──────┐  │         ┌──┴─────────────┴────────────┴───┐ │
│  │Countdown│  │         │   SectionSeparator (between)   │ │
│  └─────────┘  │         └────────────────────────────────┘ │
│               │                                             │
│  ┌────────────┴──────┐  ┌────────────┐  ┌────────┐         │
│  │  Registration     │  │  Partners  │  │ Footer │         │
│  └───────────────────┘  └────────────┘  └────────┘         │
├─────────────────────────────────────────────────────────────┤
│                     Configuration Layer                      │
│  ┌─────────────┐  ┌──────────┐  ┌─────────────────┐        │
│  │ i18n/cs.json│  │global.css│  │calendar.ts      │        │
│  │(translations)│  │(@theme)  │  │(event data)     │        │
│  └─────────────┘  └──────────┘  └─────────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                      Build-Time Layer                        │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐     │
│  │Astro Compiler│→ │Image Optimizer│→ │Static HTML   │     │
│  │(SSG)         │  │(WebP/AVIF)    │  │+ CSS + Assets│     │
│  └──────────────┘  └───────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| BaseLayout | HTML structure, meta tags, font loading, global CSS injection | Astro layout with `<slot />` |
| Header | Site navigation, branding, language toggle | Static Astro component |
| Countdown | Dynamic timer display, viewport-height aware, auto-hide after event | Astro + minimal JS (client:idle) |
| Hero | Event title, date/location display, CTA buttons | Static Astro with i18n |
| EventInfo | Competition details, description | Static Astro with i18n |
| Categories | List of competition categories | Static Astro with i18n |
| Gallery | Photo carousel/grid | CSS-only carousel or grid layout |
| Registration | Form/external link to registration | Static Astro or external integration |
| Partners | Partner logos with CSS carousel | CSS scroll-snap carousel |
| Footer | Contact, social links, legal | Static Astro |
| SectionSeparator | Visual divider between sections | Pure CSS decorative element |

## Recommended Project Structure

```
src/
├── components/           # Astro components
│   ├── Countdown.astro   # NEW: Event countdown timer
│   ├── Attractions.astro # NEW: Event attractions carousel
│   ├── Header.astro      # MODIFY: Add countdown integration
│   ├── Hero.astro        # MODIFY: Scroll animations
│   ├── EventInfo.astro   # MODIFY: Scroll animations
│   ├── Categories.astro  # MODIFY: Scroll animations
│   ├── Gallery.astro     # MODIFY: CSS carousel or grid
│   ├── Partners.astro    # MODIFY: CSS carousel pattern
│   ├── Registration.astro # MODIFY: Accessibility improvements
│   ├── Footer.astro      # MODIFY: Consistent button styling
│   └── SectionSeparator.astro # EXISTING
├── layouts/
│   └── BaseLayout.astro  # Global HTML structure
├── pages/
│   └── index.astro       # Main page composition
├── styles/
│   ├── global.css        # MODIFY: Add scroll animation utilities
│   └── carousel.css      # NEW: CSS carousel patterns
├── utils/
│   ├── calendar.ts       # EXISTING: iCalendar generation
│   └── eventConfig.ts    # NEW: Centralized event data
├── i18n/
│   ├── cs.json           # MODIFY: Add new translation keys
│   └── utils.ts          # EXISTING: i18n utilities
└── public/
    ├── images/           # Static images (to optimize)
    └── fonts/            # Consider self-hosting fonts
```

### Structure Rationale

- **components/**: All Astro components follow single responsibility principle; each represents one section or reusable UI element
- **styles/**: Separate global theme from feature-specific CSS (carousel patterns); Tailwind v4 @theme stays in global.css
- **utils/**: Centralize configuration (eventConfig.ts) to avoid magic strings scattered across components
- **public/images/**: Move to src/ where possible for build-time optimization via Astro's Image component

## Architectural Patterns

### Pattern 1: Component Composition with Props

**What:** Astro components composed in index.astro with lang prop threading for i18n support.

**When to use:** For all static content sections that need translation support.

**Trade-offs:**
- **Pros:** Clear component boundaries, easy to test/replace individual sections, follows Astro's static-first philosophy
- **Cons:** Prop drilling for shared data (mitigated by keeping prop trees shallow)

**Example:**
```astro
---
// index.astro
import Hero from '../components/Hero.astro';
import EventInfo from '../components/EventInfo.astro';
---

<BaseLayout title="Event 2026" lang="cs">
  <Hero lang="cs" />
  <EventInfo lang="cs" />
</BaseLayout>
```

### Pattern 2: Configuration-Driven Components

**What:** Centralize event data (date, location, title) in utils/eventConfig.ts, import into components that need it.

**When to use:** For data that appears in multiple components (event date in Hero, Countdown, Calendar export).

**Trade-offs:**
- **Pros:** Single source of truth, easy to update event details across entire site
- **Cons:** Adds import dependency, but eliminates duplicate data

**Example:**
```typescript
// utils/eventConfig.ts
export const EVENT_CONFIG = {
  title: "Slovanské Silové Klání 2026",
  date: new Date("2026-06-13T10:00:00+02:00"),
  endDate: new Date("2026-06-13T18:00:00+02:00"),
  location: "Za Hasičskou Zbrojnicí, Pustiměř",
} as const;

// components/Countdown.astro
---
import { EVENT_CONFIG } from '../utils/eventConfig';
const timeToEvent = EVENT_CONFIG.date.getTime() - Date.now();
---
```

### Pattern 3: CSS-Only Interactive Features

**What:** Use modern CSS (scroll-snap, ::scroll-button, scroll-driven animations) for interactivity without JavaScript.

**When to use:** For carousels, scroll animations, and progressive enhancement features.

**Trade-offs:**
- **Pros:** Zero JavaScript bundle size, instant hydration, progressive enhancement, better performance
- **Cons:** Browser support considerations (feature detection required), less control than JS solutions

**Example:**
```css
/* styles/carousel.css */
.carousel {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.carousel-item {
  flex: 0 0 100%;
  scroll-snap-align: center;
}

.carousel::scroll-button(left) {
  content: "◄" / "Previous";
}

.carousel::scroll-button(right) {
  content: "►" / "Next";
}

.carousel::scroll-marker-group {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.carousel-item::scroll-marker {
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-radius: 50%;
}

.carousel-item::scroll-marker:target-current {
  background-color: currentColor;
}
```

### Pattern 4: Scroll-Driven Animations

**What:** Use CSS animation-timeline property to tie animations to scroll position rather than time.

**When to use:** For fade-in effects, parallax-like motion, or revealing content as user scrolls.

**Trade-offs:**
- **Pros:** Performant (runs on compositor thread), no scroll event listeners, progressive enhancement
- **Cons:** Browser support limited (Chrome 115+, Safari 18.2+), requires @supports feature detection

**Example:**
```css
/* global.css - Add to existing animations */
@supports (animation-timeline: scroll()) {
  .scroll-reveal {
    animation: fade-in-up linear;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}

/* Fallback: immediate visibility for unsupported browsers */
@supports not (animation-timeline: scroll()) {
  .scroll-reveal {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Pattern 5: Minimal Client-Side JavaScript with Islands

**What:** Use Astro's client:* directives only where truly needed (countdown timer).

**When to use:** For time-dependent features that require client-side JavaScript.

**Trade-offs:**
- **Pros:** Static HTML by default, selective hydration only where needed
- **Cons:** Requires understanding of hydration timing (client:load, client:idle, client:visible)

**Example:**
```astro
---
// components/Countdown.astro
import { EVENT_CONFIG } from '../utils/eventConfig';
---

<div class="countdown" data-event-date={EVENT_CONFIG.date.toISOString()}>
  <script>
    // Only runs on client
    const el = document.querySelector('.countdown');
    const eventDate = new Date(el.dataset.eventDate);

    function updateCountdown() {
      const now = Date.now();
      const timeLeft = eventDate.getTime() - now;

      if (timeLeft <= 0) {
        el.style.display = 'none';
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

      el.textContent = `${days}d ${hours}h ${minutes}m`;
      requestAnimationFrame(updateCountdown);
    }

    updateCountdown();
  </script>
</div>
```

## Data Flow

### Configuration Flow

```
eventConfig.ts (single source of truth)
    ↓
┌───┴────┬────────┬──────────┐
│        │        │          │
Hero  Countdown  calendar.ts  BaseLayout (meta tags)
```

### Translation Flow

```
i18n/cs.json (translation keys)
    ↓
utils.ts (useTranslations helper)
    ↓
Components (via lang prop) → Rendered HTML
```

### Image Optimization Flow (Recommended)

```
src/images/*.jpg
    ↓
Astro <Image /> component (import)
    ↓
Build-time optimization
    ↓ (generates)
WebP + AVIF + original format
    ↓
dist/ (optimized, responsive srcset)
```

### Scroll Animation Flow

```
User scrolls page
    ↓
Browser compositor (CSS animation-timeline: view())
    ↓
Element visibility in viewport
    ↓
Animation progresses (0% to 100% based on scroll)
    ↓
No JavaScript involved, no scroll event listeners
```

### Key Data Flows

1. **Event data centralization:** EVENT_CONFIG → All components needing event details
2. **Translation lookup:** i18n JSON → useTranslations() → Component render
3. **Static generation:** Astro components → Build step → Static HTML
4. **Image optimization:** src/ images → Build step → Optimized formats + responsive sizes
5. **Scroll animations:** CSS scroll-timeline → Browser compositor → Visual updates

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users/day | Current static architecture is perfect; no changes needed |
| 1k-10k users/day | Consider CDN for static assets; optimize largest images first |
| 10k+ users/day | Self-host fonts instead of Google Fonts CDN; add cache headers |

### Scaling Priorities

1. **First bottleneck (images):** Large gallery images cause slow page load
   - **Fix:** Move images from public/ to src/, use Astro Image component
   - **Fix:** Generate WebP/AVIF formats, use responsive srcset
   - **Fix:** Lazy-load below-the-fold images (loading="lazy")

2. **Second bottleneck (fonts):** Google Fonts adds DNS lookup + RTT latency
   - **Fix:** Self-host fonts in public/fonts/, update @font-face rules
   - **Fix:** Use font-display: swap for faster initial render

3. **Third bottleneck (CSS):** Global CSS loaded upfront
   - **Fix:** Extract critical CSS for above-the-fold content
   - **Fix:** Defer non-critical animations using media queries

**Note:** For a single-page static event site, these optimizations are usually overkill until traffic exceeds 10k users/day.

## Anti-Patterns

### Anti-Pattern 1: JavaScript-Heavy Carousels

**What people do:** Install heavy carousel libraries (Swiper, Slick) with 50kb+ JavaScript bundles.

**Why it's wrong:** Adds unnecessary JavaScript to a static site; increases bundle size, hydration time, and complexity; carousel functionality achievable with pure CSS.

**Do this instead:** Use CSS scroll-snap with ::scroll-button pseudo-elements for zero-JS carousels. Browser support is excellent (95%+), and graceful degradation is simple (manual scroll still works).

### Anti-Pattern 2: Duplicating Event Data

**What people do:** Hard-code event date/location in multiple components (Hero, Countdown, Footer, calendar.ts).

**Why it's wrong:** Updating event details requires changes in 4+ files; easy to miss one and create inconsistencies.

**Do this instead:** Create utils/eventConfig.ts with EVENT_CONFIG constant; import into all components needing event data.

### Anti-Pattern 3: Over-Engineering i18n

**What people do:** Build complex i18n routing for future language support that may never come.

**Why it's wrong:** Adds complexity (routing, language detection, duplicate pages) for theoretical future need; current site is Czech-only despite existing i18n structure.

**Do this instead:** Keep hard-coded lang="cs" until a second language is actually needed. YAGNI principle applies. When second language is confirmed, then implement proper routing.

### Anti-Pattern 4: Mixing Framework Components

**What people do:** Add React/Vue components for minor interactive features in an otherwise static Astro site.

**Why it's wrong:** Adds framework runtime to bundle; increases complexity; breaks static-first architecture; most interactivity can be achieved with CSS or vanilla JS.

**Do this instead:** Use Astro's static-first approach with CSS for animations/carousels, vanilla JS in <script> tags for countdown. Only add frameworks if building truly complex interactive features (e.g., multi-step forms with validation).

### Anti-Pattern 5: Images in public/ Directory

**What people do:** Store all images in public/ directory, reference with <img src="/images/photo.jpg">.

**Why it's wrong:** Bypasses Astro's image optimization; no WebP/AVIF generation, no responsive srcset, no build-time optimization.

**Do this instead:** Move images to src/images/, import into components, use Astro's <Image /> or <Picture /> components. Only keep truly static assets (favicons, logos that never change) in public/.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google Fonts | <link rel="preconnect"> in head | Consider self-hosting for better performance |
| iCalendar Export | Client-side Blob generation via calendar.ts | Works without server, pure client-side download |
| Registration Form | External link or embedded iframe | Depends on registration platform choice |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| index.astro ↔ Components | Props (lang, data) | Shallow prop drilling acceptable for static site |
| Components ↔ i18n | useTranslations() function | Returns translation lookup function |
| Components ↔ eventConfig | ES module import | Single source of truth for event data |
| BaseLayout ↔ global.css | CSS import in layout frontmatter | Tailwind v4 @theme applied globally |
| Countdown ↔ eventConfig | Import config, inline <script> reads from data attribute | Hydration happens client-side |

### Build vs. Runtime Boundaries

**Build-time operations:**
- Astro component rendering (SSG)
- Image optimization (WebP/AVIF generation)
- CSS processing (Tailwind v4 compilation)
- Translation lookup (baked into HTML)

**Runtime operations:**
- Countdown timer updates (client-side JS)
- Scroll-driven animations (CSS compositor thread, no JS)
- Calendar download (client-side Blob generation)
- CSS carousel navigation (browser-native scroll)

## Integration Recommendations for New Features

### 1. Countdown Component Integration

**Where:** Add to Header component or directly after Header in index.astro

**Data dependency:** Requires EVENT_CONFIG.date

**Styling:** Use existing Tailwind theme colors, position fixed or sticky

**Hydration:** Use client:idle to defer until main thread idle

### 2. Attractions Carousel Integration

**Where:** New section between Categories and Gallery in index.astro

**Pattern:** CSS scroll-snap carousel with ::scroll-button pseudo-elements

**Fallback:** Manual scroll works even if pseudo-elements unsupported

### 3. Scroll Animations Integration

**Where:** Apply to existing sections (Hero, EventInfo, Categories, Gallery)

**Pattern:** Add .scroll-reveal class, define animation in global.css

**Browser support:** @supports (animation-timeline: scroll()) for progressive enhancement

### 4. Accessibility Improvements Integration

**Where:** All components (semantic HTML, ARIA labels, keyboard nav)

**Priority order:**
1. Semantic HTML (headers, nav, main, sections)
2. Alt text for images (required by Astro Image component)
3. ARIA labels for interactive elements
4. Keyboard navigation for carousels
5. Color contrast validation (use existing theme colors)

### 5. Performance Optimizations Integration

**Image optimization:**
- Move public/images/ to src/images/
- Replace <img> with <Image /> component
- Generate WebP/AVIF via <Picture /> component

**CSS optimization:**
- Extract carousel patterns to carousel.css
- Use @layer for proper cascade order
- Add @supports for feature detection

**Font optimization:**
- Consider self-hosting MedievalSharp and Inter
- Use font-display: swap
- Subset fonts to Czech characters only

## Build Order Recommendation

### Phase 1: Foundation Fixes (No New Features)
1. **Centralize event configuration** (create eventConfig.ts)
2. **Fix existing bugs** (year mismatches, inconsistent data)
3. **Improve semantic HTML** (proper heading hierarchy, landmarks)
4. **Image optimization prep** (move images to src/, add Image components)

**Rationale:** Establishes stable foundation; fixes prevent regressions when adding features.

### Phase 2: CSS Infrastructure (Enables Features)
1. **Add scroll animation utilities** to global.css
2. **Create carousel.css** with reusable patterns
3. **Add @supports feature detection** for progressive enhancement
4. **Implement consistent button/icon styling**

**Rationale:** CSS patterns enable features in Phase 3 without component refactoring.

### Phase 3: New Features (Builds on Infrastructure)
1. **Countdown component** (uses eventConfig from Phase 1)
2. **Scroll animations** (uses utilities from Phase 2)
3. **Attractions carousel** (uses carousel.css from Phase 2)
4. **Partners carousel enhancement** (uses carousel.css from Phase 2)

**Rationale:** Features depend on infrastructure from previous phases.

### Phase 4: Accessibility & Polish
1. **ARIA labels and roles**
2. **Keyboard navigation testing**
3. **Color contrast validation**
4. **Screen reader testing**
5. **Focus indicator improvements**

**Rationale:** Accessibility layer applied after features are functional.

### Phase 5: Performance Optimization
1. **Image format conversion** (WebP/AVIF)
2. **Responsive image generation** (srcset)
3. **Font self-hosting**
4. **Critical CSS extraction**

**Rationale:** Optimize after features complete; easier to measure impact.

## Sources

- [Astro Images Documentation](https://docs.astro.build/en/guides/images/) - Official image optimization guide
- [MDN: CSS Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) - CSS animation-timeline specification
- [MDN: Creating CSS Carousels](https://developer.mozilla.org/en/docs/Web/CSS/Guides/Overflow/Carousels) - CSS-only carousel patterns with ::scroll-button
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/) - Islands architecture and hydration strategies
- [Chrome Blog: CSS Scroll-Triggered Animations](https://developer.chrome.com/blog/scroll-triggered-animations) - Browser implementation details
- [LogRocket: Modern CSS Carousels](https://blog.logrocket.com/modern-css-carousels-no-javascript-required/) - CSS carousel patterns and browser support
- [Nerdy.dev: 4 CSS Features Every Developer Should Know (2026)](https://nerdy.dev/4-css-features-every-front-end-developer-should-know-in-2026) - Modern CSS capabilities including scroll-state queries

---
*Architecture research for: Slovanské Silové Klání event website modernization*
*Researched: 2026-01-24*

# Stack Research: Modern Web Accessibility & Performance

**Research Date:** 2026-01-24
**Domain:** Web accessibility (WCAG 2.1 AA), performance optimization, modern CSS features
**Context:** Enhancing existing Astro 5.16.4 + Tailwind CSS v4 site

## Recommended Stack Additions

### Icon System
**astro-icon v1.1+** (or manual SVG components)
- **What**: SVG icon management for Astro
- **Why**: Zero-runtime overhead, optimized SVGs, supports local + Iconify sets
- **Integration**: `npm install astro-icon`, import Icon component
- **Alternative**: Manual SVG components in `src/components/icons/` (simpler, no deps)
- **Confidence**: HIGH - Both approaches work, manual is simpler for small icon sets

### Image Optimization
**Built-in Astro `<Image />` and `<Picture />` components** (already available)
- **What**: Astro's native image optimization
- **Why**: Automatic WebP/AVIF conversion, responsive images, CLS prevention
- **Integration**: Already in Astro 5.16.4, just use `import { Image } from 'astro:assets'`
- **Confidence**: HIGH - Built-in, well-tested, perfect for static sites

### Countdown Timer
**Vanilla JavaScript** (no library needed)
- **What**: Custom countdown using `setInterval` or `requestAnimationFrame`
- **Why**: Lightweight, no dependencies, full control
- **Pattern**: Calculate diff between current time and event time, update DOM
- **Confidence**: HIGH - Standard pattern, well-documented

### CSS-Only Carousel
**CSS Scroll Snap** (native browser feature)
- **What**: `scroll-snap-type` + `scroll-snap-align` for carousel behavior
- **Why**: No JavaScript, performant, accessible, works offline
- **Browser Support**: Excellent in 2026 (all modern browsers)
- **Fallback**: Gracefully degrades to scrollable container
- **Confidence**: HIGH - Standard CSS feature, widely supported

### Scroll-Driven Animations
**CSS `animation-timeline: view()`** (native)
- **What**: CSS scroll-driven animations specification
- **Why**: Performant, no JavaScript, composable with `@media (prefers-reduced-motion)`
- **Browser Support**: Chrome 115+, Edge 115+, Safari 17+ (2026: excellent)
- **Fallback**: Progressive enhancement - animations optional
- **Confidence**: MEDIUM-HIGH - Modern feature, needs feature detection

### Accessibility Testing
**axe DevTools** (browser extension, free)
- **What**: Automated accessibility testing
- **Why**: Catches 57% of WCAG issues automatically
- **Integration**: Browser extension, run on each page
- **Manual Testing**: Keyboard navigation, screen reader (NVDA/VoiceOver)
- **Confidence**: HIGH - Industry standard

### Performance Testing
**Lighthouse** (built into Chrome DevTools)
- **What**: Performance, accessibility, SEO audit
- **Why**: Industry standard, catches Core Web Vitals issues
- **Integration**: Chrome DevTools > Lighthouse tab
- **Target**: 90+ performance score, 100 accessibility
- **Confidence**: HIGH - Standard tool

## What NOT to Use

### ❌ JavaScript Framework for Countdown
**Why Not**: Adds unnecessary bundle size for simple time calculation
**Instead**: Vanilla JavaScript in Astro component `<script>` tag

### ❌ JavaScript-Heavy Carousel Libraries (Swiper, Slick, etc.)
**Why Not**: CSS Scroll Snap does it better with zero JS
**Instead**: Native CSS scroll-snap-type

### ❌ Animation Libraries (GSAP, Anime.js, etc.)
**Why Not**: CSS scroll-driven animations are native and performant
**Instead**: CSS `animation-timeline: view()` with `@keyframes`

### ❌ Third-Party Icon CDNs at Runtime
**Why Not**: External dependency, slower, blocks rendering
**Instead**: Inline optimized SVGs or astro-icon (build-time)

### ❌ Image CDNs (Cloudinary, Imgix, etc.)
**Why Not**: Unnecessary cost/complexity for static site with Unsplash placeholders
**Instead**: Astro's built-in `<Image />` component

## Integration with Existing Stack

### Already in Place (from codebase)
- ✅ Astro 5.16.4 - Static site generator
- ✅ Tailwind CSS v4 - With custom @theme
- ✅ Bun - Package manager
- ✅ TypeScript - Strict mode
- ✅ Google Fonts - MedievalSharp + Inter

### Additions Needed
- Icon system (manual SVGs or astro-icon)
- Countdown timer script (vanilla JS)
- CSS scroll snap styles (Tailwind utilities)
- Scroll-driven animation CSS (custom @keyframes)
- Testing tools (axe, Lighthouse)

## Version Recommendations (2026)

All recommendations use existing ecosystem:
- **Astro**: 5.16.4 (already installed, stable)
- **Tailwind CSS**: 4.0.0 (already installed, latest)
- **Bun**: Latest (already using)
- **TypeScript**: Via Astro config (already configured)

**No new runtime dependencies needed** - all features achievable with:
1. Native browser APIs (Scroll Snap, Scroll-Driven Animations)
2. Vanilla JavaScript (countdown timer)
3. Built-in Astro features (<Image />, <Picture />)
4. Tailwind CSS utilities
5. Manual SVG components (or astro-icon if preferred)

## Confidence Levels

- **HIGH**: Proven solutions, widely adopted, stable
- **MEDIUM-HIGH**: Modern features, good support, may need fallbacks
- **MEDIUM**: Newer features, requires careful testing
- **LOW**: Experimental, not recommended

---

**Key Insight**: This project doesn't need new dependencies. Modern web platform + Astro + Tailwind v4 provide everything needed for accessibility, performance, and modern CSS features.

**Sources**:
- Tailwind CSS v4 documentation (2026)
- MDN Web Docs: CSS Scroll Snap, Scroll-Driven Animations
- Astro documentation: Image optimization
- WCAG 2.1 guidelines
- Chrome DevTools documentation

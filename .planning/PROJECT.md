# Slovanské Silové Klání 2026 Website

## What This Is

A promotional website for Slovanské Silové Klání (Slavic Strength Competition), an annual amateur strongman competition event held in Pustiměř, Czech Republic. The site showcases event information, competition categories, past events gallery, and enables registration through email contact. Built with Astro as a static site with a dark Viking/Slavic theme.

## Core Value

Inform potential participants and spectators about the 2026 event with clear details on what to expect, when/where it happens, and how to participate - all delivered through an accessible, visually compelling experience that reflects the event's Viking heritage.

## Requirements

### Validated

<!-- Existing capabilities from current codebase -->

- ✓ Single-page responsive layout with section navigation — existing
- ✓ Event information display (date, time, location) — existing
- ✓ Competition categories showcase (weight classes) — existing
- ✓ Photo gallery from past events — existing
- ✓ Email-based registration contact — existing
- ✓ Partners/sponsors section — existing
- ✓ iCalendar (.ics) download for event — existing
- ✓ Dark Viking/Slavic themed design — existing
- ✓ Custom Tailwind theme with Viking colors — existing
- ✓ Czech language content with i18n structure — existing
- ✓ Google Maps venue location — existing
- ✓ Social media links (Facebook, Instagram) — existing

### Active

<!-- 2026 refresh scope -->

- [ ] Fix mobile menu broken functionality (ID mismatches)
- [ ] Fix date inconsistencies (update all to June 13, 2026, 9:30-16:00)
- [ ] Fix calendar download filename (2025 → 2026)
- [ ] Remove all light theme remnants (CSS, unused classes)
- [ ] Replace SVG logo with MedievalSharp text-only logo
- [ ] Establish visual consistency for all icons (outlined style)
- [ ] Establish visual consistency for all buttons (modern design, primary/secondary variants, 2 sizes)
- [ ] Optimize performance (image optimization, CSS optimization, reduce bundle size)
- [ ] Achieve WCAG 2.1 Level AA compliance (color contrast, ARIA labels, keyboard navigation)
- [ ] Add CSS-only scroll-driven fade-in animations (bottom-to-top, with reduce-motion support)
- [ ] Add full-viewport countdown timer in header (disappears after event starts)
- [ ] Create new Attractions section with CSS-only carousel (combat demos, falconry, artisan stalls, blacksmith, refreshments)
- [ ] Add sponsorship welcome message in Partners section (Viking-themed, welcoming tone)
- [ ] Ensure flawless responsive behavior across all breakpoints
- [ ] Replace placeholder Unsplash gallery images with event-appropriate Unsplash selections
- [ ] Add Unsplash images for Attractions carousel

### Out of Scope

- Backend registration system — email-based contact is sufficient for now
- Multi-language support — Czech only for this version, despite i18n scaffolding
- Payment/ticketing system — event is free entry, email registration only
- User accounts or authentication — static site, no user data
- Real-time features or live updates — static site generation is sufficient
- Mobile app — web-only for now
- Video content — photos and text only
- Search functionality — single-page layout with anchor navigation is sufficient

## Context

**Existing codebase:**
- Astro 5.16.4 static site with Tailwind CSS v4
- Bun as package manager and build tool
- Custom Viking/Slavic theme with colors like viking-red, blood-red, charcoal
- MedievalSharp display font + Inter body font from Google Fonts
- GitHub Actions CI pipeline for builds
- No testing infrastructure currently

**Known technical debt:**
- i18n system hard-coded to Czech despite multi-language structure
- Mobile menu JavaScript broken (ID selector mismatches)
- Date/time inconsistencies across components
- Gallery uses external Unsplash CDN (dependency on third-party)
- No test coverage for any functionality
- Performance: Hero background has multiple CSS filters, no image optimization

**Event details:**
- Date: Saturday, June 13, 2026
- Time: 9:30 - 16:00 (CEST)
- Location: Za Hasičskou Zbrojnicí, Pustiměř, Czech Republic
- Categories: Men's 80kg, 90kg, 90kg+; Women's special category
- Attractions: Sword/spear/shield combat demos, falconry with birds of prey, artisan stalls (glass/metal), artistic blacksmith, food/drink

## Constraints

- **Tech Stack**: Astro + Tailwind CSS v4 — maintain existing framework choice
- **Hosting**: Static site deployment — no backend server required
- **Browser Support**: Modern browsers with CSS scroll-driven animations — graceful degradation for older browsers
- **Performance**: Target Lighthouse score 90+ — optimize for fast load times
- **Accessibility**: WCAG 2.1 Level AA — legally compliant for public site
- **Budget**: No budget for paid services — use free CDNs, no premium APIs
- **Timeline**: For 2026 event — must be live well before June 13, 2026
- **Content**: Czech language only — despite i18n structure, focus on Czech audience

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep Unsplash for images | No budget for photography, event photos not yet available | — Pending (acceptable for now, revisit with real photos later) |
| Static site (Astro) | No backend needed, simple email registration, fast performance | ✓ Good (works well for event scale) |
| Dark theme only | Matches Viking aesthetic, simplifies maintenance | — Pending (part of current refresh) |
| CSS-only carousel | No JavaScript needed, better performance, accessibility | — Pending (implementing in refresh) |
| MedievalSharp logo text | Simpler than SVG, easier to maintain, fits theme | — Pending (implementing in refresh) |

---
*Last updated: 2026-01-24 after initialization*

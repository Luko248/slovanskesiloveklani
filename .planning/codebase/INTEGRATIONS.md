# External Integrations

**Analysis Date:** 2026-01-24

## APIs & External Services

**Google Fonts API:**
- Service: Google Fonts CDN - Hosts MedievalSharp and Inter typefaces
- Implementation: Preconnect links in `src/layouts/BaseLayout.astro` (lines 22-24)
- Auth: None required (public CDN)
- Use: Typography delivery

**Unsplash Image API:**
- Service: Unsplash - Free stock photography
- Implementation: Direct image URLs in `src/components/Gallery.astro` (lines 7-12)
- Auth: None (public URLs with `q=80&w=800&auto=format&fit=crop` parameters)
- Use: Gallery placeholder images
- Note: Images are marked as placeholders pending replacement with real event photos

**Google Maps Embed API:**
- Service: Google Maps - Location display
- Implementation: Embedded iframe in `src/components/Footer.astro` (line 72)
- Location: `Za Hasičskou Zbrojnicí, Pustiměř` (GPS: ~49.28, 17.03)
- Use: Venue location on map

## Data Storage

**Databases:**
- None - Static site with no backend database

**File Storage:**
- Local filesystem only - Static assets in `public/` directory
- Image assets: cursor SVG at `/images/cursors/sword-hover.png` (referenced in global.css)
- Google Fonts CDN for typography

**Caching:**
- Standard HTTP caching headers (Astro default)
- Google Fonts preconnect for performance optimization

## Authentication & Identity

**Auth Provider:**
- None - Static public site

**Email:**
- Mailto links in `src/components/Registration.astro` (line 31)
- Registration email: `SlovanskeSiloveKlani@gmail.com`
- Implementation: HTML mailto link with pre-filled subject and body template

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Browser console only (development)
- Astro CLI output during build

**Telemetry:**
- @astrojs/telemetry@3.3.0 (optional anonymous usage analytics, can be opted out via CLI)

## CI/CD & Deployment

**Hosting:**
- Not yet deployed (static site ready for any CDN/web server)

**CI Pipeline:**
- GitHub Actions (`.github/workflows/ci.yml`)
- Trigger: Push or PR to main branch
- Steps:
  1. Checkout code (actions/checkout@v4)
  2. Install Bun (oven-sh/setup-bun@v1, latest)
  3. Install dependencies (bun install)
  4. Build site (bun run build → astro build)

## Environment Configuration

**Required env vars:**
- None - Site is fully static with hardcoded configuration

**Key Configuration Values:**
- Site URL: `https://slovanskesiloveklani.cz` (in `astro.config.mjs`)
- Event date: June 13, 2026, 10:00-18:00 CEST (in `src/utils/calendar.ts`)
- Venue: Za Hasičskou Zbrojnicí, Pustiměř (in `src/utils/calendar.ts` and `src/components/Footer.astro`)
- Language: Czech (hardcoded in all components)

**Secrets location:**
- No secrets required (static site, no API keys)

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None - Site is purely presentational

## Social Media Links

**External Social Links:**
- Facebook: `https://www.facebook.com/profile.php?id=61572156929014` (in `src/components/Footer.astro`)
- Instagram: `https://www.instagram.com/p/DGjQtT_NKwT/` (in `src/components/Footer.astro`)

## Third-Party Embeds

**Maps:**
- Google Maps embedded iframe (querystring-based, no SDK)
- Map coordinates: Pustiměřské Prusy fire station
- Fallback link: `https://maps.google.com/?q=Pustiměřské+Prusy+hasičská+zbrojnice`

## Calendar Export

**iCalendar (.ics) Generation:**
- Implementation: `src/utils/calendar.ts`
- Function: `generateICS()` creates RFC 5545 compliant iCalendar file
- Download: `downloadICS()` triggers browser file download
- Event details hardcoded:
  - Title: "Slovanské Silové Klání 2026"
  - Start: 2026-06-13T08:00:00Z (10:00 CEST)
  - End: 2026-06-13T16:00:00Z (18:00 CEST)
  - Location: Za Hasičskou Zbrojnicí, Pustiměř
  - UID: Dynamic timestamp-based (no persistence)

---

*Integration audit: 2026-01-24*

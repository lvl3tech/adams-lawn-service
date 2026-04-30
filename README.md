# Adams Lawn Service & Landscaping

Marketing website for [Adams Lawn Service & Landscaping](https://lvl3tech.github.io/adams-lawn-service/) — a family-owned lawn care, landscaping, and snow services company serving Shelbyville, TN and the greater Middle Tennessee area since 1987.

Built and maintained by **lvl3tech**.

- **Live site:** https://lvl3tech.github.io/adams-lawn-service/
- **Phone:** (931) 703-9549
- **Service area:** Shelbyville, Murfreesboro, Franklin, Brentwood, Spring Hill, Columbia, Tullahoma, Nashville, Manchester, Lewisburg

## Branches

| Branch   | Contents                                                          |
| -------- | ----------------------------------------------------------------- |
| `main`   | Compiled static site served by GitHub Pages.                      |
| `source` | This branch — full React + Vite source code.                      |

## Stack

- **React 19** + **TypeScript** (strict)
- **Vite 7** for dev server and bundling
- **Tailwind CSS v4** with `@tailwindcss/vite`
- **wouter** for client-side routing
- **framer-motion** for page transitions and scroll-triggered reveals
- **react-hook-form** + **zod** for the multi-step quote form
- **Radix UI** primitives (via shadcn/ui-style components)
- **lucide-react** for icons

The site is a single-page app with hash-anchored sections on the home page (About / Services / Reviews / FAQ / Contact) and dedicated routes for each of nine service detail pages, Privacy, and Terms. The quote form posts to a small Express + Resend backend (not included in this branch) — by default it falls back to a `mailto:` link if no API endpoint is configured.

## Local development

```bash
pnpm install        # or npm install / yarn install
pnpm dev            # starts Vite on http://localhost:5173
```

## Production build

```bash
# For GitHub Pages (under a sub-path):
BASE_PATH="/adams-lawn-service/" pnpm build

# For a root domain:
pnpm build
```

Build output goes to `dist/public/`. To deploy to GitHub Pages, copy `dist/public/index.html` → `dist/public/404.html` (so SPA deep links work), drop a `.nojekyll` file in the same folder, and push the contents to the `main` branch.

## Optional environment

- `VITE_QUOTE_API_URL` — base URL of the quote API. If omitted, the form falls back to a same-origin `/api/quote` endpoint.

## Project layout

```text
src/
  components/      # Header, Hero, About, Services, Reviews, FAQ, ContactSteps,
                   # Footer, Reveal, PageTransition, Seo, QuoteForm
  contexts/        # QuoteFormContext (drawer open/close + payload)
  data/
    services.ts    # 9 service detail definitions (intro, process, included list, ...)
    seo.ts         # Per-route SEO metadata + JSON-LD builders
  pages/
    Home.tsx       # Anchor-section landing page
    ServiceDetail.tsx
    Privacy.tsx
    Terms.tsx
  App.tsx          # Router + AnimatePresence + global QuoteForm
  main.tsx         # Mount point
public/            # Favicons, OG image, robots.txt, sitemap.xml
index.html         # Vite entry, baseline SEO + JSON-LD LocalBusiness schema
```

## Notes

- The `Seo` component imperatively updates `document.head` (title, meta description, canonical, Open Graph, Twitter card, per-page JSON-LD) on every route change. Each service page also emits a `Service` + `BreadcrumbList` JSON-LD payload for richer search results.
- `Reveal` wraps content in framer-motion `whileInView` to fade and slide sections in as the visitor scrolls.
- The quote form is a four-step wizard (services → contact + address → preferences → review) with an in-memory honeypot field, polite error messaging, and an abort-on-cancel network call.

---

© Adams Lawn Service & Landscaping, Inc. Site built by lvl3tech.

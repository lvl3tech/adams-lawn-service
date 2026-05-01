// Build-time prerender step.
//
// GitHub Pages only serves real files. Routes like /services/patio-design
// don't exist as files, so the SPA fallback (404.html) is served with an
// HTTP 404 status. Many link previewers (iMessage, Slack, etc.) refuse to
// render a card on a 404, and none of them execute JavaScript, so the
// per-page meta tags injected by React's <Seo /> component never show up
// in shared link cards.
//
// This script writes a real <route>/index.html for every known route with
// the right title / description / canonical / og:* / twitter:* baked in.
// The same React bundle still loads, hydrates, and takes over routing.
//
// Source of truth for titles & descriptions:
//   src/data/seo.ts  (HOME_SEO, PRIVACY_SEO, TERMS_SEO, SERVICE_SEO)
// Keep this file in sync when adding services.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist/public");
const indexPath = path.join(distDir, "index.html");

const SITE_BASE = "https://lvl3tech.github.io/adams-lawn-service";
const SITE_NAME = "Adams Lawn Service & Landscaping";
const DEFAULT_OG = `${SITE_BASE}/opengraph.jpg`;

const SERVICE_SEO = {
  "patio-design": {
    title:
      "Custom Patio Design & Installation in Shelbyville, TN | Adams Lawn Service",
    description:
      "Custom flagstone, paver, and natural-stone patios built to last across Middle Tennessee. Free design consult. Call Adams Lawn Service at (931) 703-9549.",
    serviceType: "Patio Construction",
    name: "Custom Patio Design & Installation",
  },
  "stone-walls": {
    title:
      "Stone & Retaining Wall Installation | Shelbyville & Middle TN | Adams Lawn Service",
    description:
      "Hand-set stone walls and engineered retaining walls with proper drainage and footings. Built for the long haul across Middle Tennessee. (931) 703-9549.",
    serviceType: "Retaining Wall Construction",
    name: "Stone & Retaining Wall Construction",
  },
  "flower-beds": {
    title:
      "Flower Bed Design & Installation in Middle Tennessee | Adams Lawn Service",
    description:
      "Custom flower bed design and planting — soil prep, edging, and selections that thrive in Middle TN. Family-owned since 1987. Call (931) 703-9549.",
    serviceType: "Garden Design",
    name: "Flower Bed Design & Installation",
  },
  mulch: {
    title:
      "Mulch Installation & Bed Refresh | Shelbyville, TN | Adams Lawn Service",
    description:
      "Hand-edged beds and clean mulch installation that protects roots, locks in moisture, and gives the whole property a finished look. Free quotes.",
    serviceType: "Mulching",
    name: "Mulch Installation",
  },
  sod: {
    title: "Sod Installation in Shelbyville & Middle TN | Adams Lawn Service",
    description:
      "Professional sod laying for new lawns, repairs, and full re-sods. Soil prep, grading, and care guidance included. Serving Middle Tennessee.",
    serviceType: "Sod Installation",
    name: "Sod Installation",
  },
  mowing: {
    title:
      "Lawn Mowing & Maintenance in Middle Tennessee | Adams Lawn Service",
    description:
      "Reliable weekly and bi-weekly mowing, edging, trimming, and blow-down across Shelbyville, Murfreesboro, and Franklin. Family-owned since 1987.",
    serviceType: "Lawn Mowing",
    name: "Lawn Mowing & Maintenance",
  },
  fertilization: {
    title:
      "Lawn Fertilization & Weed Control in Middle TN | Adams Lawn Service",
    description:
      "Season-appropriate fertilization and weed control that builds a thicker, greener lawn over time. Honest, no-pressure programs. (931) 703-9549.",
    serviceType: "Lawn Fertilization",
    name: "Fertilization & Weed Control",
  },
  "fall-cleanup": {
    title:
      "Fall Cleanup & Leaf Removal in Shelbyville, TN | Adams Lawn Service",
    description:
      "Full-property fall cleanups — leaf removal, bed clearing, edging, and a finished look that sets your lawn up for spring. Free quotes.",
    serviceType: "Yard Cleanup",
    name: "Leaf Removal & Fall Cleanup",
  },
  "snow-services": {
    title:
      "Snow Removal & Ice Melt in Shelbyville, TN | Adams Lawn Service",
    description:
      "Driveway plowing, walk shoveling, and ice-melt application when Middle Tennessee winters turn sharp. Reliable, monitored service.",
    serviceType: "Snow Removal",
    name: "Snow & Ice Removal",
  },
};

const STATIC_PAGES = {
  "/privacy": {
    title: "Privacy Policy | Adams Lawn Service & Landscaping",
    description:
      "How Adams Lawn Service & Landscaping collects, uses, and protects the information you share when requesting a quote or contacting us.",
  },
  "/terms": {
    title: "Terms of Service | Adams Lawn Service & Landscaping",
    description:
      "The terms that apply to your use of the Adams Lawn Service & Landscaping website, quote requests, and online communications.",
  },
};

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function rewriteHead(html, { title, description, canonical, ogImage, jsonLd }) {
  let next = html;

  // <title>
  next = next.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeText(title)}</title>`,
  );

  // Meta replacements: name="description", canonical, og:*, twitter:*
  const metaSwaps = [
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${escapeAttr(description)}" />`],
    [/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${escapeAttr(canonical)}" />`],
    [/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${escapeAttr(title)}" />`],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${escapeAttr(description)}" />`],
    [/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${escapeAttr(canonical)}" />`],
    [/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${escapeAttr(ogImage)}" />`],
    [/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeAttr(title)}" />`],
    [/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeAttr(description)}" />`],
    [/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`],
  ];

  for (const [pattern, replacement] of metaSwaps) {
    if (!pattern.test(next)) {
      throw new Error(`Prerender: head pattern not found: ${pattern}`);
    }
    next = next.replace(pattern, replacement);
  }

  // Add og:image:alt for accessibility (best-effort; only insert once)
  if (!/property="og:image:alt"/i.test(next)) {
    next = next.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      (match) =>
        `${match}\n    <meta property="og:image:alt" content="${escapeAttr(title)}" />`,
    );
  }

  // Inject extra per-page JSON-LD just before </head>, if provided.
  if (jsonLd) {
    const payload = JSON.stringify(jsonLd);
    next = next.replace(
      /<\/head>/i,
      `    <script type="application/ld+json" data-prerender="page">${payload}</script>\n  </head>`,
    );
  }

  return next;
}

function writeRoute(route, html) {
  const trimmed = route.replace(/^\/+/, "").replace(/\/+$/, "");
  const outDir = path.join(distDir, trimmed);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  return path.relative(distDir, path.join(outDir, "index.html"));
}

function buildServiceJsonLd(slug, entry) {
  const url = `${SITE_BASE}/services/${slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: entry.serviceType,
      name: entry.name,
      description: entry.description,
      url,
      provider: {
        "@type": "LocalBusiness",
        name: SITE_NAME,
        url: `${SITE_BASE}/`,
        telephone: "+1-931-703-9549",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Shelbyville",
          addressRegion: "TN",
          addressCountry: "US",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_BASE}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE_BASE}/#services`,
        },
        { "@type": "ListItem", position: 3, name: entry.name, item: url },
      ],
    },
  ];
}

function main() {
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Prerender: ${indexPath} not found. Run vite build first.`);
  }
  const indexHtml = fs.readFileSync(indexPath, "utf8");
  const written = [];

  // Service pages
  for (const [slug, entry] of Object.entries(SERVICE_SEO)) {
    const canonical = `${SITE_BASE}/services/${slug}`;
    const html = rewriteHead(indexHtml, {
      title: entry.title,
      description: entry.description,
      canonical,
      ogImage: DEFAULT_OG,
      jsonLd: buildServiceJsonLd(slug, entry),
    });
    written.push(writeRoute(`/services/${slug}`, html));
  }

  // Static pages (privacy, terms)
  for (const [route, page] of Object.entries(STATIC_PAGES)) {
    const canonical = `${SITE_BASE}${route}`;
    const html = rewriteHead(indexHtml, {
      title: page.title,
      description: page.description,
      canonical,
      ogImage: DEFAULT_OG,
    });
    written.push(writeRoute(route, html));
  }

  console.log(`Prerendered ${written.length} routes:`);
  for (const file of written) console.log(`  - ${file}`);
}

main();

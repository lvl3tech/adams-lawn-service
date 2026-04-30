import { SEO_SITE_BASE } from "../components/Seo";

const SITE_NAME = "Adams Lawn Service & Landscaping";
const PROVIDER_BASE = {
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: SEO_SITE_BASE + "/",
  telephone: "+1-931-703-9549",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Shelbyville",
    addressRegion: "TN",
    addressCountry: "US",
  },
} as const;

const SERVICE_AREA = [
  "Shelbyville, TN",
  "Murfreesboro, TN",
  "Franklin, TN",
  "Brentwood, TN",
  "Spring Hill, TN",
  "Columbia, TN",
  "Tullahoma, TN",
  "Nashville, TN",
  "Manchester, TN",
  "Lewisburg, TN",
];

export type PageSeo = {
  title: string;
  description: string;
};

export const HOME_SEO: PageSeo = {
  title:
    "Adams Lawn Service & Landscaping | Shelbyville, TN — Family-Owned Since 1987",
  description:
    "Custom landscapes, patios, retaining walls, mulch, sod, mowing, fertilization, fall cleanup, and snow services across Shelbyville, Murfreesboro, Franklin, and Middle Tennessee. Free quotes — call (931) 703-9549.",
};

export const PRIVACY_SEO: PageSeo = {
  title: "Privacy Policy | Adams Lawn Service & Landscaping",
  description:
    "How Adams Lawn Service & Landscaping collects, uses, and protects the information you share when requesting a quote or contacting us.",
};

export const TERMS_SEO: PageSeo = {
  title: "Terms of Service | Adams Lawn Service & Landscaping",
  description:
    "The terms that apply to your use of the Adams Lawn Service & Landscaping website, quote requests, and online communications.",
};

export type ServiceSeoEntry = PageSeo & {
  serviceType: string;
};

// Per-service SEO — short, search-friendly titles + ~155 char descriptions.
export const SERVICE_SEO: Record<string, ServiceSeoEntry> = {
  "patio-design": {
    title:
      "Custom Patio Design & Installation in Shelbyville, TN | Adams Lawn Service",
    description:
      "Custom flagstone, paver, and natural-stone patios built to last across Middle Tennessee. Free design consult. Call Adams Lawn Service at (931) 703-9549.",
    serviceType: "Patio Construction",
  },
  "stone-walls": {
    title:
      "Stone & Retaining Wall Installation | Shelbyville & Middle TN | Adams Lawn Service",
    description:
      "Hand-set stone walls and engineered retaining walls with proper drainage and footings. Built for the long haul across Middle Tennessee. (931) 703-9549.",
    serviceType: "Retaining Wall Construction",
  },
  "flower-beds": {
    title:
      "Flower Bed Design & Installation in Middle Tennessee | Adams Lawn Service",
    description:
      "Custom flower bed design and planting — soil prep, edging, and selections that thrive in Middle TN. Family-owned since 1987. Call (931) 703-9549.",
    serviceType: "Garden Design",
  },
  mulch: {
    title:
      "Mulch Installation & Bed Refresh | Shelbyville, TN | Adams Lawn Service",
    description:
      "Hand-edged beds and clean mulch installation that protects roots, locks in moisture, and gives the whole property a finished look. Free quotes.",
    serviceType: "Mulching",
  },
  sod: {
    title:
      "Sod Installation in Shelbyville & Middle TN | Adams Lawn Service",
    description:
      "Professional sod laying for new lawns, repairs, and full re-sods. Soil prep, grading, and care guidance included. Serving Middle Tennessee.",
    serviceType: "Sod Installation",
  },
  mowing: {
    title:
      "Lawn Mowing & Maintenance in Middle Tennessee | Adams Lawn Service",
    description:
      "Reliable weekly and bi-weekly mowing, edging, trimming, and blow-down across Shelbyville, Murfreesboro, and Franklin. Family-owned since 1987.",
    serviceType: "Lawn Mowing",
  },
  fertilization: {
    title:
      "Lawn Fertilization & Weed Control in Middle TN | Adams Lawn Service",
    description:
      "Season-appropriate fertilization and weed control that builds a thicker, greener lawn over time. Honest, no-pressure programs. (931) 703-9549.",
    serviceType: "Lawn Fertilization",
  },
  "fall-cleanup": {
    title:
      "Fall Cleanup & Leaf Removal in Shelbyville, TN | Adams Lawn Service",
    description:
      "Full-property fall cleanups — leaf removal, bed clearing, edging, and a finished look that sets your lawn up for spring. Free quotes.",
    serviceType: "Yard Cleanup",
  },
  "snow-services": {
    title:
      "Snow Removal & Ice Melt in Shelbyville, TN | Adams Lawn Service",
    description:
      "Driveway plowing, walk shoveling, and ice-melt application when Middle Tennessee winters turn sharp. Reliable, monitored service.",
    serviceType: "Snow Removal",
  },
};

export function buildServiceJsonLd(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string,
): Record<string, unknown> {
  const entry = SERVICE_SEO[slug];
  const url = `${SEO_SITE_BASE}/services/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: entry?.serviceType ?? fallbackTitle,
    name: fallbackTitle,
    description: entry?.description ?? fallbackDescription,
    url,
    provider: PROVIDER_BASE,
    areaServed: SERVICE_AREA.map((name) => ({
      "@type": "City",
      name,
    })),
    audience: {
      "@type": "Audience",
      audienceType: "Homeowners and commercial property owners",
    },
  };
}

export function buildHomeJsonLd(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SEO_SITE_BASE + "/",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SEO_SITE_BASE + "/",
        },
      ],
    },
  ];
}

export function buildServiceBreadcrumb(
  slug: string,
  title: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SEO_SITE_BASE + "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: SEO_SITE_BASE + "/#services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${SEO_SITE_BASE}/services/${slug}`,
      },
    ],
  };
}

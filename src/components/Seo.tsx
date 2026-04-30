import { useEffect } from "react";

const SITE_BASE = "https://lvl3tech.github.io/adams-lawn-service";
const DEFAULT_OG = `${SITE_BASE}/opengraph.jpg`;
const SITE_NAME = "Adams Lawn Service & Landscaping";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article" | "service";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ID = "page-json-ld";

function setJsonLd(payload: Record<string, unknown> | Record<string, unknown>[] | null) {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) existing.remove();
  if (!payload) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = JSON_LD_ID;
  script.text = JSON.stringify(payload);
  document.head.appendChild(script);
}

export function Seo({
  title,
  description,
  path,
  ogImage,
  ogType = "website",
  jsonLd,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const url = `${SITE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
    const image = ogImage ?? DEFAULT_OG;

    document.title = title;

    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    setLink("canonical", url);

    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", title);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setJsonLd(jsonLd ?? null);

    return () => {
      // Leave tags in place for the next route to overwrite. Only clean up the
      // per-page JSON-LD so it doesn't leak across routes.
      setJsonLd(null);
    };
  }, [title, description, path, ogImage, ogType, jsonLd, noindex]);

  return null;
}

export const SEO_SITE_BASE = SITE_BASE;

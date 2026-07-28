import { useEffect } from "react";
import { SITE_URL, type SeoConfig } from "@/lib/seo";

const JSON_LD_ATTR = "data-seo-jsonld";

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function clearJsonLd() {
  document.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((el) => el.remove());
}

function injectJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  clearJsonLd();
  const items = Array.isArray(data) ? data : [data];
  items.forEach((item) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(JSON_LD_ATTR, "true");
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

/**
 * Atualiza title, description, canonical, Open Graph e JSON-LD por página.
 * Remove scripts JSON-LD estáticos do index.html ao montar para evitar schemas duplicados.
 */
export function useSeo(config: SeoConfig) {
  const { title, description, path, ogTitle, ogDescription, jsonLd } = config;

  useEffect(() => {
    // Remove schemas estáticos do HTML inicial (evita FAQ/LegalService em páginas erradas)
    document
      .querySelectorAll('script[type="application/ld+json"]:not([data-seo-jsonld])')
      .forEach((el) => el.remove());

    const url = `${SITE_URL}${path === "/" ? "/" : path}`;
    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDescription = ogDescription ?? description;

    document.title = title;
    setMetaByName("description", description);
    setCanonical(url);

    setMetaByProperty("og:title", resolvedOgTitle);
    setMetaByProperty("og:description", resolvedOgDescription);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:type", "website");

    setMetaByName("twitter:title", resolvedOgTitle);
    setMetaByName("twitter:description", resolvedOgDescription);

    if (jsonLd) {
      injectJsonLd(jsonLd);
    } else {
      clearJsonLd();
    }

    return () => {
      clearJsonLd();
    };
  }, [title, description, path, ogTitle, ogDescription, jsonLd]);
}

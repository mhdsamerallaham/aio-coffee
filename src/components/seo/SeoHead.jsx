// AIO Coffee — Dynamic SEO & GEO Meta Manager
// Injects Title, Meta Description, Canonical, Hreflang, OpenGraph, Twitter Cards, and Schema.org JSON-LD

import { useEffect } from 'react';

const BASE_URL = 'https://aiocoffee.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-image.jpg`;

/**
 * Helper to update or create a <meta> tag by name or property attribute.
 */
function setMetaTag(attributeName, attributeValue, content) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link> tag by rel and optional hreflang.
 */
function setLinkTag(rel, href, hreflang = null) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) element.setAttribute('hreflang', hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function SeoHead({
  title,
  description,
  path = '/tr',
  lang = 'tr',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
  noindex = false,
  trPath = null,
  enPath = null,
}) {
  useEffect(() => {
    // 1. Title Tag (<60 chars target)
    if (title) {
      document.title = title;
    }

    // 2. Meta Description (<155 chars target)
    if (description) {
      setMetaTag('name', 'description', description);
    }

    // 3. Robots Tag
    setMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 4. Canonical & Hreflang
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${BASE_URL}${cleanPath}`;
    setLinkTag('canonical', canonicalUrl);

    // Determine localized alternate URLs
    const resolvedTrPath = trPath || (cleanPath.startsWith('/en') ? cleanPath.replace('/en', '/tr') : cleanPath);
    const resolvedEnPath = enPath || (cleanPath.startsWith('/tr') ? cleanPath.replace('/tr', '/en') : cleanPath);

    setLinkTag('alternate', `${BASE_URL}${resolvedTrPath}`, 'tr');
    setLinkTag('alternate', `${BASE_URL}${resolvedEnPath}`, 'en');
    setLinkTag('alternate', `${BASE_URL}/tr`, 'x-default');

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:title', title || 'AIO Coffee — All in One');
    setMetaTag('property', 'og:description', description || '');
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', image || DEFAULT_IMAGE);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'AIO Coffee — All in One');
    setMetaTag('property', 'og:locale', lang === 'tr' ? 'tr_TR' : 'en_US');
    setMetaTag('property', 'og:locale:alternate', lang === 'tr' ? 'en_US' : 'tr_TR');

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title || 'AIO Coffee');
    setMetaTag('name', 'twitter:description', description || '');
    setMetaTag('name', 'twitter:image', image || DEFAULT_IMAGE);

    // 7. Inject Page-Level Schema.org JSON-LD (GEO Optimization)
    let schemaScript = document.getElementById('aio-page-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'aio-page-schema');
      document.head.appendChild(schemaScript);
    }

    if (schema) {
      const schemaData = Array.isArray(schema)
        ? {
            '@context': 'https://schema.org',
            '@graph': schema,
          }
        : {
            '@context': 'https://schema.org',
            ...schema,
          };
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    } else {
      schemaScript.textContent = '';
    }

    // Cleanup on unmount or route change
    return () => {
      // Clear page schema if component unmounts
      const script = document.getElementById('aio-page-schema');
      if (script) {
        script.textContent = '';
      }
    };
  }, [title, description, path, lang, image, type, schema, noindex, trPath, enPath]);

  return null;
}

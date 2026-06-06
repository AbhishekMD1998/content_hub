import { useEffect } from 'react';

const SITE_NAME = 'Content Hub';
const SITE_URL = 'https://content-hub-pi-bay.vercel.app';
const DEFAULT_DESCRIPTION =
  'Blogs, articles and stories — long-form content on productivity, design and everyday work. Also available in Kannada.';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

export function useMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

    document.title = fullTitle;
    setMeta('description', description);

    // Open Graph
    setOg('og:title', fullTitle);
    setOg('og:description', description);
    setOg('og:image', image);
    setOg('og:url', fullUrl);
    setOg('og:type', type);
    setOg('og:site_name', SITE_NAME);

    // Twitter Card
    setOg('twitter:card', 'summary_large_image');
    setOg('twitter:title', fullTitle);
    setOg('twitter:description', description);
    setOg('twitter:image', image);

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, image, url, type]);
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

function setOg(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content || '');
}

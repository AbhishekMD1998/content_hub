import { useEffect } from 'react';

/** Adds shadow to header after scrolling. */
export function useHeaderScroll() {
  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (!header) return undefined;

    const onScroll = () => {
      header.classList.toggle('site-header-scrolled', window.scrollY > 10);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

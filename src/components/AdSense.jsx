import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT } from '../config/adsense';

/**
 * Display ad unit. Omit slot for auto-format responsive ads once AdSense is approved.
 * @param {string} [slot] — data-ad-slot from AdSense → Ads → By ad unit
 */
export default function AdSense({ slot, className = '', label = 'Advertisement' }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense script may not be loaded yet */
    }
  }, []);

  return (
    <aside className={`ad-slot${className ? ` ${className}` : ''}`} aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        {...(slot ? { 'data-ad-slot': slot } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

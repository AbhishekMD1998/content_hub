import { useEffect, useRef, useState } from 'react';
import { ADSENSE_CLIENT } from '../config/adsense';

/**
 * Display ad unit. Omit slot for auto-format responsive ads once AdSense is approved.
 * @param {string} [slot] — data-ad-slot from AdSense → Ads → By ad unit
 * @param {boolean} [collapseWhenEmpty] — hide the slot when no ad fills (avoids empty gaps)
 */
export default function AdSense({
  slot,
  className = '',
  label = 'Advertisement',
  collapseWhenEmpty = false,
}) {
  const pushed = useRef(false);
  const asideRef = useRef(null);
  const [visible, setVisible] = useState(!collapseWhenEmpty);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense script may not be loaded yet */
    }
  }, []);

  useEffect(() => {
    if (!collapseWhenEmpty) return undefined;

    const checkFilled = () => {
      const ins = asideRef.current?.querySelector('ins.adsbygoogle');
      const filled =
        ins?.getAttribute('data-ad-status') === 'filled' ||
        Boolean(asideRef.current?.querySelector('iframe'));
      setVisible(filled);
    };

    const timers = [1200, 2500, 4000].map((ms) => setTimeout(checkFilled, ms));
    return () => timers.forEach(clearTimeout);
  }, [collapseWhenEmpty]);

  if (!visible) return null;

  return (
    <aside
      ref={asideRef}
      className={`ad-slot${className ? ` ${className}` : ''}`}
      aria-label={label}
    >
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

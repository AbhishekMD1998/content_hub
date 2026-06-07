import { useEffect, useRef, useState } from 'react';

const LERP = 0.18;
const SIZE = 52;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function hasFinePointer() {
  return window.matchMedia('(pointer: fine)').matches;
}

export default function CartoonCursor() {
  const rootRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const frame = useRef(0);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [moving, setMoving] = useState(false);
  const [hovering, setHovering] = useState(false);
  const moveTimer = useRef(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return undefined;

    document.body.classList.add('cartoon-cursor-on');

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      setMoving(true);
      clearTimeout(moveTimer.current);
      moveTimer.current = setTimeout(() => setMoving(false), 120);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest('a, button, input, textarea, select, label, [role="button"]')) {
        setHovering(true);
      }
    };

    const onOut = (e) => {
      const t = e.target;
      if (t instanceof Element && t.closest('a, button, input, textarea, select, label, [role="button"]')) {
        setHovering(false);
      }
    };

    const tick = () => {
      const el = rootRef.current;
      if (el) {
        pos.current.x += (target.current.x - pos.current.x) * LERP;
        pos.current.y += (target.current.y - pos.current.y) * LERP;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      document.body.classList.remove('cartoon-cursor-on');
      cancelAnimationFrame(frame.current);
      clearTimeout(moveTimer.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  if (!hasFinePointer() || prefersReducedMotion()) return null;

  return (
    <div
      ref={rootRef}
      className={`cartoon-cursor${visible ? ' is-visible' : ''}${clicking ? ' is-clicking' : ''}${moving ? ' is-moving' : ''}${hovering ? ' is-hovering' : ''}`}
      aria-hidden="true"
      style={{ width: SIZE, height: SIZE, marginLeft: -SIZE / 2, marginTop: -SIZE / 2 }}
    >
      <svg
        className="cursor-mascot"
        viewBox="0 0 64 64"
        width={SIZE}
        height={SIZE}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* shadow */}
        <ellipse className="cursor-shadow" cx="32" cy="58" rx="14" ry="3" fill="rgba(36,53,40,0.15)" />

        {/* legs */}
        <g className="cursor-legs">
          <rect x="24" y="46" width="7" height="10" rx="3" fill="#2c4034" />
          <rect x="33" y="46" width="7" height="10" rx="3" fill="#2c4034" />
        </g>

        {/* body */}
        <ellipse cx="32" cy="34" rx="20" ry="18" fill="#3b5344" />
        <ellipse cx="32" cy="36" rx="16" ry="13" fill="#4a6352" />

        {/* book */}
        <g className="cursor-book">
          <rect x="22" y="30" width="20" height="14" rx="2" fill="#f7f5f0" stroke="#b8956b" strokeWidth="1.5" />
          <line x1="32" y1="30" x2="32" y2="44" stroke="#b8956b" strokeWidth="1.2" />
          <line x1="25" y1="34" x2="29" y2="34" stroke="#dce8d6" strokeWidth="1" />
          <line x1="25" y1="38" x2="29" y2="38" stroke="#dce8d6" strokeWidth="1" />
        </g>

        {/* face */}
        <g className="cursor-face">
          <circle className="cursor-eye cursor-eye-l" cx="26" cy="26" r="3.5" fill="#fff" />
          <circle className="cursor-eye cursor-eye-r" cx="38" cy="26" r="3.5" fill="#fff" />
          <circle className="cursor-pupil cursor-pupil-l" cx="27" cy="26" r="1.8" fill="#243528" />
          <circle className="cursor-pupil cursor-pupil-r" cx="39" cy="26" r="1.8" fill="#243528" />
          <path className="cursor-smile" d="M 27 32 Q 32 36 37 32" fill="none" stroke="#243528" strokeWidth="1.5" strokeLinecap="round" />
          <circle className="cursor-blush cursor-blush-l" cx="22" cy="30" r="2.5" fill="#e8a090" opacity="0.45" />
          <circle className="cursor-blush cursor-blush-r" cx="42" cy="30" r="2.5" fill="#e8a090" opacity="0.45" />
        </g>

        {/* wave hand on hover */}
        <g className="cursor-hand">
          <circle cx="48" cy="28" r="6" fill="#4a6352" stroke="#3b5344" strokeWidth="1" />
          <circle cx="46" cy="26" r="1.2" fill="#f7f5f0" />
          <circle cx="48" cy="25" r="1.2" fill="#f7f5f0" />
          <circle cx="50" cy="26" r="1.2" fill="#f7f5f0" />
        </g>
      </svg>
    </div>
  );
}

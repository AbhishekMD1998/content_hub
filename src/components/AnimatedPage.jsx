import { useLocation } from 'react-router-dom';

/** Subtle fade-in on route changes. */
export default function AnimatedPage({ children }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}

import { NavLink } from 'react-router-dom';

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <span className="brand-mark footer-mark" aria-hidden="true">
              CH
            </span>
            <span className="footer-brand-tagline">Blogs &amp; articles dashboard</span>
          </div>
          <p className="footer-desc">
            Thoughtful content for teams — blogs from admins and curated articles
            that help your people experience grow.
          </p>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Navigation</h3>
          <ul className="footer-links">
            <li>
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/articles">Articles</NavLink>
            </li>
            <li>
              <NavLink to="/admin/login">Admin</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-contact">
            <li>
              <IconPhone />
              <a href="tel:+15032148047">+1 (503) 214-8047</a>
            </li>
            <li>
              <IconMail />
              <a href="mailto:hello@contenthub.co">hello@contenthub.co</a>
            </li>
            <li>
              <IconPin />
              <span>
                118 Alder Lane, Studio 4
                <br />
                Portland, OR 97205
              </span>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-heading">Social</h3>
          <div className="footer-social">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IconLinkedIn />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <IconX />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <p>© {new Date().getFullYear()} Content Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

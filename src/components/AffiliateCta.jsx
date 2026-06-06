export default function AffiliateCta({ label, url, sponsored = true }) {
  if (!url) {
    return null;
  }

  return (
    <aside className="affiliate-cta" aria-label="Affiliate offer">
      {sponsored && (
        <p className="affiliate-disclosure">
          Sponsored — we may earn a commission if you buy through this link, at no extra
          cost to you.
        </p>
      )}
      <a
        href={url}
        className="btn btn-primary affiliate-cta-link"
        target="_blank"
        rel="sponsored noopener noreferrer"
      >
        {label || 'View offer'} →
      </a>
    </aside>
  );
}

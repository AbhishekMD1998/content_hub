export default function LegalPage({ title, children }) {
  return (
    <div className="page legal-page">
      <header className="page-header">
        <h1>{title}</h1>
      </header>
      <div className="legal-body">{children}</div>
    </div>
  );
}

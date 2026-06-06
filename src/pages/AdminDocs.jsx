import { useEffect, useState } from 'react';
import { fetchDocList, fetchDocPdf } from '../api/docs';
import { useAuth } from '../context/AuthContext';

export default function AdminDocs() {
  const { user } = useAuth();
  const [docs, setDocs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDocList()
      .then(setDocs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const openDoc = async (id) => {
    setError('');
    setViewerLoading(true);
    setActiveId(id);
    try {
      const blob = await fetchDocPdf(id);
      const url = URL.createObjectURL(blob);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } catch (err) {
      setError(err.message);
      setActiveId(null);
    } finally {
      setViewerLoading(false);
    }
  };

  const activeDoc = docs.find((doc) => doc.id === activeId);

  return (
    <div className="page admin-page admin-docs-page">
      <header className="page-header">
        <h1>Documentation</h1>
        <p className="lead">
          Technical guides for {user?.displayName || 'admins'} — developer setup and system
          architecture.
        </p>
      </header>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p className="empty-state">Loading documents…</p>
      ) : (
        <div className="admin-docs-grid">
          <section className="admin-docs-list">
            <h2>Available documents</h2>
            <ul className="admin-docs-cards">
              {docs.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    className={`admin-docs-card${activeId === doc.id ? ' active' : ''}`}
                    onClick={() => openDoc(doc.id)}
                  >
                    <span className="admin-docs-card-title">{doc.title}</span>
                    <span className="admin-docs-card-desc">{doc.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="admin-docs-viewer" aria-label="PDF viewer">
            <h2>{activeDoc?.title || 'Preview'}</h2>
            {viewerLoading && <p className="empty-state">Loading PDF…</p>}
            {!viewerLoading && !pdfUrl && (
              <p className="empty-state admin-docs-placeholder">
                Select a document to view it here.
              </p>
            )}
            {pdfUrl && !viewerLoading && (
              <iframe
                title={activeDoc?.title || 'Documentation'}
                src={pdfUrl}
                className="admin-docs-iframe"
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
}

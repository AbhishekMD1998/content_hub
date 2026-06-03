import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setToken } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Missing sign-in token. Please try again.');
      return;
    }
    setToken(token);
    refreshUser()
      .then(() => navigate('/admin', { replace: true }))
      .catch(() => {
        setError('Could not complete sign in.');
      });
  }, [searchParams, navigate, refreshUser]);

  return (
    <div className="page auth-page">
      <div className="auth-card">
        {error ? (
          <>
            <h1>Sign in failed</h1>
            <p className="form-error">{error}</p>
          </>
        ) : (
          <>
            <h1>Signing you in…</h1>
            <p className="lead">Completing Google authentication.</p>
          </>
        )}
      </div>
    </div>
  );
}

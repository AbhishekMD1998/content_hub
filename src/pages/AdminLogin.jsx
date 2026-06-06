import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL, apiUrl } from '../api/config';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { isAuthenticated, login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const apiConfigured = Boolean(API_BASE_URL) || import.meta.env.DEV;

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result =
      mode === 'login'
        ? await login(email.trim(), password)
        : await signup(email.trim(), password, displayName.trim());
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card auth-card-wide">
        <h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
        <p className="lead">
          Use email and password or continue with Google. Accounts are stored in Supabase
          PostgreSQL via the Spring Boot API.
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('login')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        <a
          href={apiUrl('/oauth2/authorization/google')}
          className={`btn btn-outline btn-pill btn-google${apiConfigured ? '' : ' btn-disabled'}`}
          aria-disabled={!apiConfigured}
          onClick={apiConfigured ? undefined : (e) => e.preventDefault()}
        >
          Continue with Google
        </a>
        {!apiConfigured && (
          <p className="auth-hint form-error" role="alert">
            API not configured. Set <code>VITE_API_BASE_URL</code> on Vercel to your Render URL.
          </p>
        )}
        <p className="auth-divider">or</p>

        <form onSubmit={handleSubmit} className="admin-form">
          {mode === 'signup' && (
            <label>
              Display name
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
              />
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn btn-primary btn-pill">
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        {mode === 'login' && (
          <p className="auth-hint">
            Default admin: <code>admin@contenthub.com</code> / <code>admin123</code>
          </p>
        )}

        <p className="auth-hint">
          <Link to="/">← Back to dashboard</Link>
        </p>
      </div>
    </div>
  );
}

import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';

export default function Layout() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              CH
            </span>
            <span className="brand-text">
              <span className="brand-name">Content Hub</span>
              <span className="brand-tagline">Blogs &amp; articles dashboard</span>
            </span>
          </NavLink>

          <nav className="main-nav" aria-label="Main">
            <NavLink to="/" end>
              Dashboard
            </NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/articles">Articles</NavLink>
            {isAuthenticated && <NavLink to="/admin">Admin</NavLink>}
          </nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <span className="header-user">{user?.displayName || user?.email}</span>
                <NavLink to="/admin" className="btn btn-primary btn-pill">
                  New blog post
                </NavLink>
                <button type="button" className="btn btn-ghost btn-pill" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <NavLink to="/admin/login" className="btn btn-primary btn-pill">
                Sign in
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

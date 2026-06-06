import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ArticlesProvider } from './context/ArticlesContext';
import { BlogLanguageProvider } from './context/BlogLanguageContext';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDocs from './pages/AdminDocs';
import AdminPanel from './pages/AdminPanel';
import AuthCallback from './pages/AuthCallback';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ArticlesProvider>
          <BlogLanguageProvider>
            <ContentProvider>
            <Routes>
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/:id" element={<BlogDetail />} />
                <Route path="articles" element={<Articles />} />
                <Route path="articles/:id" element={<ArticleDetail />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/docs"
                  element={
                    <AdminRoute>
                      <AdminDocs />
                    </AdminRoute>
                  }
                />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </ContentProvider>
          </BlogLanguageProvider>
        </ArticlesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

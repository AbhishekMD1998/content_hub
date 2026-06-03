import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <Routes>
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
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

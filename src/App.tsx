import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrgProvider } from './context/OrgContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { NewsPage } from './pages/public/NewsPage';
import { NewsDetailPage } from './pages/public/NewsDetailPage';
import { DirectorsPage } from './pages/public/DirectorsPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminNewsList } from './pages/admin/AdminNewsList';
import { AdminNewsEditor } from './pages/admin/AdminNewsEditor';
import { AdminDirectors } from './pages/admin/AdminDirectors';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminGuide } from './pages/admin/AdminGuide';
import { AdminSqlSetup } from './pages/admin/AdminSqlSetup';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <OrgProvider>
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
                <Route path="/directors" element={<DirectorsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>

              {/* Admin Login */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected Admin CMS Dashboard Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="news" element={<AdminNewsList />} />
                <Route path="news/new" element={<AdminNewsEditor />} />
                <Route path="news/edit/:id" element={<AdminNewsEditor />} />
                <Route path="directors" element={<AdminDirectors />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="guide" element={<AdminGuide />} />
                <Route path="sql-setup" element={<AdminSqlSetup />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OrgProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

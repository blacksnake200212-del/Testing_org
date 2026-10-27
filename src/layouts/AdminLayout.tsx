import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from '../components/common/AdminSidebar';
import { Toast } from '../components/common/Toast';
import { RefreshCw } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-brand-500 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Verifying staff credentials...</p>
        </div>
      </div>
    );
  }

  // Row Level Security & Route Guarding:
  // If not authenticated, redirect to /admin/login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
      <Toast />
    </div>
  );
};

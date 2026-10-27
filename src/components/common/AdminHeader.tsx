import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { ExternalLink, Database, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, actionButton }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 sticky top-0 z-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Supabase status indicator */}
          <Link
            to="/admin/sql-setup"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isSupabaseConfigured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>
              {isSupabaseConfigured ? 'Supabase Connected' : 'Demo Local Mode (Persistent)'}
            </span>
          </Link>

          {/* Optional Action Button */}
          {actionButton}

          {/* View Website */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

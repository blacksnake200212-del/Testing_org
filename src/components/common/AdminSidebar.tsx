import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrg } from '../../context/OrgContext';
import { 
  LayoutDashboard, Newspaper, Users, Settings, 
  BookOpen, Database, ExternalLink, LogOut, 
  Building2, PlusCircle, Shield 
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { user, logout, isDemoMode } = useAuth();
  const { settings } = useOrg();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'News Management', path: '/admin/news', icon: Newspaper },
    { label: 'Board of Directors', path: '/admin/directors', icon: Users },
    { label: 'Organization Info', path: '/admin/settings', icon: Settings },
    { label: 'Staff Training Guide', path: '/admin/guide', icon: BookOpen },
    { label: 'Database & SQL Setup', path: '/admin/sql-setup', icon: Database },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-slate-800 flex-shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-base tracking-tight font-heading leading-tight">
              Organization CMS
            </h1>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
              Staff Administration
            </span>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Content Management
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
            Quick Actions
          </span>
          <Link
            to="/admin/news/new"
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-brand-400" />
            <span>Create News Article</span>
          </Link>
          <Link
            to="/admin/directors?action=new"
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Board Director</span>
          </Link>
        </div>

        {/* Public Site Link */}
        <div className="pt-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition border border-slate-800"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
              Live
            </span>
          </Link>
        </div>
      </div>

      {/* User Session Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
              {user?.full_name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {user?.full_name || 'Admin'}
              </p>
              <span className="text-[10px] text-slate-400 block truncate">
                {user?.email}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

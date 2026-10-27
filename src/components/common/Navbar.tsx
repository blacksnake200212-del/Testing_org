import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, Phone, Mail, ShieldCheck, 
  Menu, X, ExternalLink, UserCheck, ChevronRight 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings } = useOrg();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Latest News', path: '/news' },
    { label: 'Board of Directors', path: '/directors' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar for institutional credibility */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>{settings?.phone || '+94 11 289 4500'}</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition">
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              <span>{settings?.email || 'info@organization.lk'}</span>
            </span>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-slate-400 font-mono text-[11px]">
              Reg: {settings?.registration_no || 'GA-2008-8841'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1.5 text-brand-300 hover:text-white font-medium bg-brand-950/60 px-2.5 py-0.5 rounded border border-brand-800/80 transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Logged in: {user?.full_name?.split(' ')[0]}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold uppercase">Admin</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-brand-300 transition text-[11px] font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                <span>Staff CMS Portal</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Org Name */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-navy-900 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl font-heading block leading-tight">
                {settings?.short_name || 'NFDG Sri Lanka'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block truncate max-w-[280px] sm:max-w-sm">
                National Governance & Development Apex
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="w-px h-6 bg-slate-200 mx-2" />

            {/* Quick Admin Access Button */}
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-900 text-white hover:bg-brand-700 transition shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-brand-300" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Staff Login'}</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              title="Staff CMS"
            >
              <ShieldCheck className="w-5 h-5 text-brand-600" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl animate-fade-in">
          {navLinks.map(link => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-semibold ${
                  active
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100">
            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-900 text-white font-semibold text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>{isAuthenticated ? 'Open Admin Dashboard' : 'Staff CMS Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

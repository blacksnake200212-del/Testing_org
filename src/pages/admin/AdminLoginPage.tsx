import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOrg } from '../../context/OrgContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { 
  Building2, Lock, Mail, ArrowRight, 
  ShieldCheck, Sparkles, AlertCircle, CheckCircle2 
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { login, loginAsDemo, isAuthenticated } = useAuth();
  const { settings } = useOrg();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    loginAsDemo('super_admin');
    navigate('/admin/dashboard');
  };

  const handleDemoEditor = () => {
    loginAsDemo('editor');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-navy-900 flex items-center justify-center text-white shadow-xl shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Organization CMS Portal
          </h1>
          <p className="text-xs text-slate-400">
            {settings?.name || 'National Foundation for Development & Governance'}
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white font-heading">
                Staff Authentication
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Authorized administrative access only
              </p>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-300 text-[10px] font-bold uppercase tracking-wider">
              {isSupabaseConfigured ? 'Supabase Auth' : 'Demo Ready'}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@organization.lk"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 block text-center uppercase tracking-wider">
              Instant 1-Click Evaluation Login
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-white transition border border-slate-700/80 hover:border-amber-500/50 flex flex-col items-start gap-1 group text-left shadow-sm"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-white group-hover:text-amber-300 transition">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Login</span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 font-bold border border-amber-400/20">
                    Super Admin
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 group-hover:text-slate-200 transition font-mono mt-0.5">
                  <Mail className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
                  <span>admin@organization.lk</span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleDemoEditor}
                className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-white transition border border-slate-700/80 hover:border-blue-500/50 flex flex-col items-start gap-1 group text-left shadow-sm"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-white group-hover:text-blue-300 transition">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Editor Login</span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-300 font-bold border border-blue-400/20">
                    Staff Editor
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 group-hover:text-slate-200 transition font-mono mt-0.5">
                  <Mail className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
                  <span>editor@organization.lk</span>
                </div>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Works instantly with mock database or live Supabase if keys are set.
            </p>
          </div>
        </div>

        {/* Back to Public Website */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white transition inline-flex items-center gap-1"
          >
            <span>← Return to Public Organization Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

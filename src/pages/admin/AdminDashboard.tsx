import React from 'react';
import { Link } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { useAuth } from '../../context/AuthContext';
import { AdminHeader } from '../../components/common/AdminHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Newspaper, Users, PlusCircle, ArrowUpRight, 
  Clock, ShieldCheck, FileText, CheckCircle2, 
  ExternalLink, Sparkles, BookOpen, Settings 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { news, publishedNews, directors, activeDirectors, auditLogs } = useOrg();
  const { user } = useAuth();

  const draftNews = news.filter(n => n.status === 'draft');
  const recentArticles = news.slice(0, 5);

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <AdminHeader
        title="Administration Dashboard"
        subtitle={`Welcome back, ${user?.full_name || 'Administrator'}. Manage all organization content without modifying code.`}
        actionButton={
          <Link
            to="/admin/news/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add News Article</span>
          </Link>
        }
      />

      {/* Main KPI Counters - Aligned with prompt section 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* News Articles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              News Articles
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              {news.length}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <span className="text-emerald-600 font-bold">{publishedNews.length} Published</span>
              <span>•</span>
              <span className="text-amber-600 font-bold">{draftNews.length} Drafts</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link to="/admin/news" className="text-brand-600 font-bold hover:underline">
              Manage Articles →
            </Link>
            <Link to="/admin/news/new" className="text-slate-500 hover:text-slate-800 font-medium">
              + Add News
            </Link>
          </div>
        </div>

        {/* Directors */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Directors
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              {directors.length}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
              <span className="text-blue-600 font-bold">{activeDirectors.length} Active Board</span>
              <span>•</span>
              <span className="text-slate-500 font-medium">{directors.length - activeDirectors.length} Emeritus</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link to="/admin/directors" className="text-brand-600 font-bold hover:underline">
              Manage Directors →
            </Link>
            <Link to="/admin/directors?action=new" className="text-slate-500 hover:text-slate-800 font-medium">
              + Add Director
            </Link>
          </div>
        </div>

        {/* Live Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Public State
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-extrabold font-heading text-emerald-700 tracking-tight block">
              100% Operational
            </span>
            <p className="text-xs text-slate-500 mt-2">
              Instant sync to public website with zero rebuild delays.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link to="/" target="_blank" className="text-brand-600 font-bold hover:underline flex items-center gap-1">
              <span>View Public Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* User Role */}
        <div className="bg-gradient-to-br from-slate-900 to-navy-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Current Session
            </span>
            <div className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[10px] font-bold uppercase tracking-wider">
              {user?.role || 'Super Admin'}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-lg font-bold font-heading text-white truncate">
              {user?.full_name || 'Admin User'}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <Link to="/admin/guide" className="text-brand-300 font-bold hover:underline">
              Staff Guide & FAQs →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-4 font-heading">
          Management Controls & Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/admin/news/new"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-brand-500 hover:shadow-md transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-800 block">Add News</span>
              <span className="text-[11px] text-slate-500">Draft or publish article</span>
            </div>
          </Link>

          <Link
            to="/admin/directors?action=new"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-purple-500 hover:shadow-md transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-800 block">Add Director</span>
              <span className="text-[11px] text-slate-500">Appoint board member</span>
            </div>
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-800 block">Organization Info</span>
              <span className="text-[11px] text-slate-500">Address, mission, phone</span>
            </div>
          </Link>

          <Link
            to="/admin/guide"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md transition group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-800 block">Staff Manual</span>
              <span className="text-[11px] text-slate-500">Step-by-step guides</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Articles & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Articles */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Recent News & Articles
              </h3>
              <p className="text-xs text-slate-500">Latest updates authored by staff</p>
            </div>
            <Link to="/admin/news" className="text-xs font-bold text-brand-600 hover:underline">
              View All ({news.length})
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentArticles.map(item => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} size="sm" />
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    By {item.author} • {new Date(item.published_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/admin/news/edit/${item.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log / Activity Feed */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Audit Trail & Activity
              </h3>
              <p className="text-xs text-slate-500">Security history of content changes</p>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
              Live Log
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {auditLogs.length > 0 ? (
              auditLogs.slice(0, 8).map(log => (
                <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
                        {log.action} {log.entity_type}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium truncate mt-0.5">
                      {log.entity_name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      User: {log.user_email}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-8">
                No activity records logged yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

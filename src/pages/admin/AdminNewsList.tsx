import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { AdminHeader } from '../../components/common/AdminHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { 
  PlusCircle, Search, Filter, Edit3, Trash2, 
  ExternalLink, Eye, CheckCircle2, Clock, Calendar 
} from 'lucide-react';

export const AdminNewsList: React.FC = () => {
  const { news, deleteNewsItem, saveNewsItem, showToast } = useOrg();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const categories = ['All', 'Press Release', 'Event', 'Announcement', 'Community', 'Governance'];

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchCat = categoryFilter === 'All' || item.category === categoryFilter;

      return matchSearch && matchStatus && matchCat;
    });
  }, [news, searchQuery, statusFilter, categoryFilter]);

  const handleToggleStatus = async (item: typeof news[0]) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    await saveNewsItem({
      ...item,
      status: newStatus
    });
    showToast(`Article marked as ${newStatus}`, 'info');
  };

  const confirmDelete = async () => {
    if (deleteTargetId) {
      await deleteNewsItem(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <AdminHeader
        title="News Management System"
        subtitle="Create, edit, categorize, and publish organizational press releases and announcements."
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

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by article title or author..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Status Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({news.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'published' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Published ({news.filter(n => n.status === 'published').length})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === 'draft' ? 'bg-white text-amber-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Drafts ({news.filter(n => n.status === 'draft').length})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3 px-4">Article</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNews.length > 0 ? (
                filteredNews.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.cover_image}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/admin/news/edit/${item.id}`}
                            className="font-bold text-slate-900 hover:text-brand-600 block line-clamp-1 text-sm font-heading"
                          >
                            {item.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 block truncate max-w-sm">
                            {item.excerpt}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {item.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 text-xs">
                      {item.author}
                    </td>

                    {/* Status Badge + Toggle */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={item.status} size="sm" />
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className="text-[10px] text-slate-400 hover:text-brand-600 underline font-medium"
                          title="Toggle between Draft and Published"
                        >
                          {item.status === 'published' ? 'Switch to Draft' : 'Publish'}
                        </button>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                      {new Date(item.published_at).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/news/${item.slug || item.id}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/news/edit/${item.id}`}
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition"
                          title="Edit article"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTargetId(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs italic">
                    No news articles match your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        title="Confirm Article Deletion"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to permanently delete this news article? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setDeleteTargetId(null)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
            >
              Delete Article
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

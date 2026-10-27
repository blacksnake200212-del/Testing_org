import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { useAuth } from '../../context/AuthContext';
import { AdminHeader } from '../../components/common/AdminHeader';
import { RichEditor } from '../../components/common/RichEditor';
import { ImageUpload } from '../../components/common/ImageUpload';
import { Modal } from '../../components/common/Modal';
import { NewsCategory, NewsStatus } from '../../types/database';
import { 
  Save, Eye, ArrowLeft, Send, Sparkles, 
  Calendar, User, Tag, CheckCircle2, Bookmark 
} from 'lucide-react';

export const AdminNewsEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { news, saveNewsItem, showToast } = useOrg();
  const { user } = useAuth();

  const isEditing = Boolean(id && id !== 'new');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200');
  const [category, setCategory] = useState<NewsCategory>('Announcement');
  const [author, setAuthor] = useState(user?.full_name || 'Communications Bureau');
  const [authorRole, setAuthorRole] = useState('Staff Editor');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<NewsStatus>('published');
  const [isSaving, setIsSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const existing = news.find(n => n.id === id);
      if (existing) {
        setTitle(existing.title);
        setSlug(existing.slug || '');
        setExcerpt(existing.excerpt);
        setContent(existing.content);
        setCoverImage(existing.cover_image);
        setCategory(existing.category);
        setAuthor(existing.author);
        setAuthorRole(existing.author_role || 'Staff Editor');
        setPublishDate(existing.published_at.split('T')[0]);
        setFeatured(Boolean(existing.featured));
        setStatus(existing.status);
      }
    }
  }, [isEditing, id, news]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleSave = async (intendedStatus: NewsStatus) => {
    if (!title.trim()) {
      showToast('Please enter an article title.', 'error');
      return;
    }
    if (!content.trim()) {
      showToast('Please provide full article content.', 'error');
      return;
    }

    try {
      setIsSaving(true);
      await saveNewsItem({
        id: isEditing ? id : undefined,
        title: title.trim(),
        slug: slug.trim() || undefined,
        excerpt: excerpt.trim() || content.slice(0, 160).replace(/[#*`_]/g, '') + '...',
        content,
        cover_image: coverImage,
        category,
        author: author.trim() || 'Communications Bureau',
        author_role: authorRole.trim(),
        published_at: new Date(publishDate).toISOString(),
        status: intendedStatus,
        featured,
      });

      navigate('/admin/news');
    } catch {
      // Error handled by context toast
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto pb-24">
      <AdminHeader
        title={isEditing ? 'Edit News Article' : 'Compose News Article'}
        subtitle="Write full article, format headings and quotes, upload photos, and publish to the public website."
        actionButton={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave('draft')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave('published')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition"
            >
              <Send className="w-4 h-4" />
              <span>{isSaving ? 'Publishing...' : 'Publish Live'}</span>
            </button>
          </div>
        }
      />

      <div className="flex items-center justify-between">
        <Link
          to="/admin/news"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to News List</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Fields */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                News Headline / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. Board of Directors Approves 2026 Strategic Plan"
                className="w-full px-4 py-2.5 text-base sm:text-lg font-bold font-heading border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Short Summary / Excerpt *
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="A compelling 1-2 sentence lead paragraph shown on news cards and search listings..."
                className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
              />
            </div>

            {/* Rich Editor */}
            <div className="pt-2">
              <RichEditor
                value={content}
                onChange={setContent}
                label="Full Article Body (Rich Text / Markdown) *"
                placeholder="Type or paste the complete announcement. Use the toolbar buttons above for Headings, Bold, Quotes, and Lists..."
              />
            </div>
          </div>

          {/* Cover Image Uploader */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              bucket="news-images"
              label="Article Cover Photograph"
              aspectRatio="video"
            />
          </div>
        </div>

        {/* Sidebar Settings Fields */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Controls Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-heading border-b border-slate-100 pb-3">
              Publication Settings
            </h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                News Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as NewsCategory)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="Announcement">Announcement</option>
                <option value="Press Release">Press Release</option>
                <option value="Event">Event</option>
                <option value="Governance">Governance & Board</option>
                <option value="Community">Community & Outreach</option>
                <option value="Achievement">Achievement</option>
              </select>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Publication Date
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={e => setPublishDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Author Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Author Department / Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={e => setAuthorRole(e.target.value)}
                placeholder="e.g. Media Spokesperson"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={e => setFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Feature prominently on Home Page
                </span>
              </label>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSave('published')}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Public Website</span>
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSave('draft')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save as Internal Draft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Live Article Preview"
        subtitle="This is exactly how your article will look to visitors on the public website."
        maxWidth="4xl"
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-800 border border-brand-200">
              {category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {title || 'Untitled Article'}
            </h1>
            <p className="text-xs text-slate-500">
              By {author} ({authorRole}) • {publishDate}
            </p>
          </div>

          {excerpt && (
            <p className="text-base text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border-l-4 border-brand-600">
              {excerpt}
            </p>
          )}

          {coverImage && (
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 border">
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose max-w-none text-slate-700 whitespace-pre-line leading-relaxed text-sm">
            {content || 'No content provided yet.'}
          </div>
        </div>
      </Modal>
    </div>
  );
};

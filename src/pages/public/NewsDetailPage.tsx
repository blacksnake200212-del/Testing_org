import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { NewsCard } from '../../components/public/NewsCard';
import { 
  Calendar, User, ArrowLeft, Share2, 
  Check, ChevronRight, Bookmark, Tag, Eye 
} from 'lucide-react';

export const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { news, publishedNews, showToast } = useOrg();
  const navigate = useNavigate();

  // Find article by id or slug
  const article = useMemo(() => {
    return news.find(n => n.id === id || n.slug === id);
  }, [news, id]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return publishedNews
      .filter(n => n.id !== article.id && (n.category === article.category || true))
      .slice(0, 3);
  }, [publishedNews, article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-slate-500">The requested announcement or news item does not exist or has been archived.</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-600 text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News Archive</span>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    }
  };

  // Render markdown formatted lines
  const renderContent = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-bold text-slate-900 mt-8 mb-3 font-heading">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl font-extrabold text-slate-900 mt-10 mb-4 font-heading border-b border-slate-200 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-brand-600 pl-4 py-2 my-5 bg-brand-50/70 rounded-r-lg text-slate-800 italic font-medium">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-6 list-disc text-slate-700 my-1.5 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={idx} className="ml-6 list-decimal text-slate-700 my-1.5 leading-relaxed">
            {trimmed.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-4" />;
      }

      // Bold parsing
      const parts = trimmed.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <p key={idx} className="text-slate-700 leading-relaxed my-3 text-base sm:text-lg">
          {parts}
        </p>
      );
    });
  };

  return (
    <article className="pb-24">
      {/* Breadcrumbs */}
      <div className="bg-slate-100/80 border-b border-slate-200/80 py-3 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/news" className="hover:text-slate-900">News</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-md">
            {article.title}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-10 space-y-8">
        {/* Header Info */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-800 border border-brand-200">
              {article.category}
            </span>
            {article.status === 'draft' && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                Draft Preview
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-brand-600" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>{article.author} ({article.author_role || 'Staff'})</span>
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>
        </div>

        {/* Lead Excerpt */}
        <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed bg-slate-50 p-6 rounded-2xl border-l-4 border-brand-600">
          {article.excerpt}
        </p>

        {/* Cover Photo */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 shadow-md">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200';
            }}
          />
        </div>

        {/* Formatted Content */}
        <div className="py-6">
          {renderContent(article.content)}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All News</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-50 text-brand-700 rounded-lg text-xs font-bold hover:bg-brand-100 transition"
          >
            <Share2 className="w-4 h-4" />
            <span>Copy Link</span>
          </button>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-16 space-y-6">
            <h3 className="text-2xl font-bold font-heading text-slate-900">
              Related Announcements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(item => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

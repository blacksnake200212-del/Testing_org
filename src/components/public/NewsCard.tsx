import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../../types/database';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, featured = false }) => {
  const formattedDate = new Date(news.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const categoryColors: Record<string, string> = {
    'Press Release': 'bg-blue-100 text-blue-800 border-blue-200',
    'Event': 'bg-purple-100 text-purple-800 border-purple-200',
    'Announcement': 'bg-amber-100 text-amber-800 border-amber-200',
    'Community': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Governance': 'bg-slate-100 text-slate-800 border-slate-200',
    'Achievement': 'bg-rose-100 text-rose-800 border-rose-200'
  };

  const badgeColor = categoryColors[news.category] || 'bg-slate-100 text-slate-800 border-slate-200';

  if (featured) {
    return (
      <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative overflow-hidden aspect-video lg:aspect-auto">
          <img
            src={news.cover_image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200';
            }}
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs ${badgeColor}`}>
              {news.category}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-600" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {news.author}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-heading leading-snug">
              <Link to={`/news/${news.slug || news.id}`}>
                {news.title}
              </Link>
            </h3>

            <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
              {news.excerpt}
            </p>
          </div>

          <div className="pt-6">
            <Link
              to={`/news/${news.slug || news.id}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 group-hover:text-brand-700 transition"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={news.cover_image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-xs ${badgeColor}`}>
            {news.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              {formattedDate}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors font-heading leading-snug line-clamp-2">
            <Link to={`/news/${news.slug || news.id}`}>
              {news.title}
            </Link>
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {news.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500 truncate max-w-[140px]">
            By {news.author}
          </span>
          <Link
            to={`/news/${news.slug || news.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:text-brand-700"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

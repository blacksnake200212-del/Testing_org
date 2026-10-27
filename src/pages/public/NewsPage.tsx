import React, { useState, useMemo } from 'react';
import { useOrg } from '../../context/OrgContext';
import { NewsCard } from '../../components/public/NewsCard';
import { NewsCategory } from '../../types/database';
import { Search, Filter, BookOpen, AlertCircle } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { publishedNews } = useOrg();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Press Release', 'Event', 'Announcement', 'Community', 'Governance'];

  const filteredNews = useMemo(() => {
    return publishedNews.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [publishedNews, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-900 to-navy-900 text-white py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">
            Communications & Public Records
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            News, Declarations & Announcements
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Official communiqués, public press releases, statutory updates, and event briefs from the National Secretariat.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Controls: Search and Categories */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search articles by keyword or author..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-semibold text-slate-500">
              Showing <span className="text-slate-900 font-bold">{filteredNews.length}</span> published article{filteredNews.length === 1 ? '' : 's'}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 max-w-lg mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              No articles match your criteria
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

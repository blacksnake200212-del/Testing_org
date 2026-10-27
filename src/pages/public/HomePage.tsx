import React from 'react';
import { Link } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { NewsCard } from '../../components/public/NewsCard';
import { DirectorCard } from '../../components/public/DirectorCard';
import { StatsBanner } from '../../components/public/StatsBanner';
import { 
  ArrowRight, ShieldCheck, Target, Eye, 
  Sparkles, CheckCircle2, ChevronRight, BookOpen, Users 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { publishedNews, activeDirectors, settings } = useOrg();

  const featuredNews = publishedNews.find(n => n.featured) || publishedNews[0];
  const recentNews = publishedNews
    .filter(n => n.id !== featuredNews?.id)
    .slice(0, 3);

  const topDirectors = activeDirectors.slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-navy-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-8">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Institutional Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-tight">
              {settings?.tagline || 'Fostering Transparency, Empowering Communities, Advancing Progress'}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {settings?.description || 'An independent apex organization dedicated to sustainable institutional development, public policy research, leadership excellence, and community advancement.'}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all hover:translate-y-[-1px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Latest News & Directives</span>
              </Link>
              <Link
                to="/directors"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
              >
                <Users className="w-4 h-4" />
                <span>Meet the Board of Directors</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="-mt-16 sm:-mt-20 relative z-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-2xl shadow-xl overflow-hidden border border-slate-700/50">
          <StatsBanner />
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {settings?.mission || 'To empower institutions and civil society through ethical leadership, sustainable resource governance, and participatory research initiatives that improve societal well-being.'}
            </p>
            <div className="pt-2">
              <Link to="/about" className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
                <span>Learn more about our governance</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Our Vision
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {settings?.vision || 'A transparent, resilient, and prosperous society steered by forward-looking leadership and equitable opportunities for all.'}
            </p>
            <div className="pt-2">
              <Link to="/about" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1">
                <span>View organizational milestones</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
              Press & Media Bureau
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              Latest News & Public Updates
            </h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            <span>View All News Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Card */}
        {featuredNews && (
          <div>
            <NewsCard news={featuredNews} featured={true} />
          </div>
        )}

        {/* Recent Grid */}
        {recentNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {recentNews.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </section>

      {/* Board of Directors Preview */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-8 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
                Executive Leadership
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                Governing Board of Directors
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Eminent economists, legal luminaries, civil engineers, and public policy leaders steering our strategic mandate.
              </p>
            </div>
            <Link
              to="/directors"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 hover:text-brand-600 font-bold text-sm border border-slate-200 shadow-xs transition"
            >
              <span>Explore All Board Members</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDirectors.map(director => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-brand-700 to-navy-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Interested in Institutional Collaboration or Inquiries?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Our Secretariat welcomes public inquiries, research partnerships, and institutional submissions. Reach out to our communications bureau directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-white text-brand-900 font-bold text-sm rounded-xl hover:bg-slate-100 transition shadow-md"
            >
              Contact the Secretariat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

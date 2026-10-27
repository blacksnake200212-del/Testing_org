import React from 'react';
import { useOrg } from '../../context/OrgContext';
import { Award, Users, BookOpen, ShieldCheck } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const { publishedNews, activeDirectors, settings } = useOrg();
  const currentYear = new Date().getFullYear();
  const yearsActive = Math.max(1, currentYear - (settings?.founded_year || 2008));

  const stats = [
    {
      label: 'Years of Institutional Excellence',
      value: `${yearsActive}+`,
      sub: `Founded in ${settings?.founded_year || 2008}`,
      icon: Award,
    },
    {
      label: 'Governing Board Members',
      value: `${activeDirectors.length}`,
      sub: 'Eminent Leaders & Experts',
      icon: Users,
    },
    {
      label: 'Published Directives & News',
      value: `${publishedNews.length}`,
      sub: 'Public Announcements',
      icon: BookOpen,
    },
    {
      label: 'Transparency Audit Rating',
      value: '100%',
      sub: 'Independently Verified',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-brand-900 via-navy-900 to-slate-900 text-white py-12 px-4 sm:px-8 border-y border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-brand-400 flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight block">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-300 block mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {stat.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

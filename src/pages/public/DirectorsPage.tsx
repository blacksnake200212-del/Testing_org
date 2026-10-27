import React, { useState, useMemo } from 'react';
import { useOrg } from '../../context/OrgContext';
import { DirectorCard } from '../../components/public/DirectorCard';
import { Users, Shield, Award, Filter, Info } from 'lucide-react';

export const DirectorsPage: React.FC = () => {
  const { directors } = useOrg();
  const [tab, setTab] = useState<'active' | 'emeritus'>('active');
  const [committeeFilter, setCommitteeFilter] = useState<string>('All');

  const activeDirectors = useMemo(() => {
    return directors.filter(d => d.is_active);
  }, [directors]);

  const emeritusDirectors = useMemo(() => {
    return directors.filter(d => !d.is_active);
  }, [directors]);

  const committees = useMemo(() => {
    const set = new Set<string>();
    directors.forEach(d => {
      if (d.committee) set.add(d.committee);
    });
    return ['All', ...Array.from(set)];
  }, [directors]);

  const currentList = tab === 'active' ? activeDirectors : emeritusDirectors;

  const filteredDirectors = useMemo(() => {
    if (committeeFilter === 'All') return currentList;
    return currentList.filter(d => d.committee === committeeFilter);
  }, [currentList, committeeFilter]);

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-navy-900 text-white py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">
            Institutional Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Board of Directors
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            The governing council responsible for statutory oversight, fiduciary integrity, and the strategic trajectory of our national mandate.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Toggle between Active and Emeritus & Committees */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setTab('active')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  tab === 'active'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Active Governing Board ({activeDirectors.length})
              </button>
              <button
                onClick={() => setTab('emeritus')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  tab === 'emeritus'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Emeritus & Former Members ({emeritusDirectors.length})
              </button>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-600" />
              <span>Governed under Parliamentary Governance Code</span>
            </div>
          </div>

          {/* Committee Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Committee:
            </span>
            {committees.map(comm => (
              <button
                key={comm}
                onClick={() => setCommitteeFilter(comm)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  committeeFilter === comm
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {comm}
              </button>
            ))}
          </div>
        </div>

        {/* Directors Grid */}
        {filteredDirectors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredDirectors.map(director => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 max-w-lg mx-auto space-y-3">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No directors in this view</h3>
            <p className="text-xs text-slate-500">Try changing the committee filter or switching to the active board tab.</p>
          </div>
        )}
      </section>
    </div>
  );
};

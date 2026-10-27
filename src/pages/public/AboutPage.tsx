import React from 'react';
import { useOrg } from '../../context/OrgContext';
import { Target, Eye, ShieldCheck, CheckCircle2, Award, Calendar, Landmark } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings } = useOrg();

  const values = [
    {
      title: 'Integrity & Public Trust',
      desc: 'Upholding strict statutory and fiduciary standards across all programs, funds, and research publications.',
      icon: ShieldCheck,
    },
    {
      title: 'Sustainable Innovation',
      desc: 'Encouraging evidence-based civic solutions that preserve environmental capital and foster long-term community resilience.',
      icon: Target,
    },
    {
      title: 'Equitable Participation',
      desc: 'Guaranteeing equal access for regional districts, underserved populations, and emerging civic practitioners.',
      icon: Award,
    },
    {
      title: 'Open Transparency',
      desc: 'Publishing unedited independent financial audits and board resolutions for unrestricted public review.',
      icon: Landmark,
    },
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Statutory Incorporation',
      desc: 'Founded under Parliamentary Charter GA-2008-8841 by a coalition of civic economists and legal scholars.'
    },
    {
      year: '2012',
      title: 'Launch of District Field Offices',
      desc: 'Expanded grassroots presence to 7 regional development administrative corridors.'
    },
    {
      year: '2018',
      title: 'Establishment of Research Endowment',
      desc: 'Partnered with bilateral donors to fund independent public policy and sustainability research.'
    },
    {
      year: '2023',
      title: 'Rural Digital Empowerment Roadmap',
      desc: 'Rolled out broadband learning hubs across 18 regional districts.'
    },
    {
      year: '2026',
      title: 'Ratification of Colombo Governance Accord',
      desc: 'Convened over 400 national leaders to ratify the 2026-2030 Sustainable Governance framework.'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-navy-900 text-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">
            About the Organization
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Pioneering Ethical Governance & Societal Progress
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            {settings?.description}
          </p>
        </div>
      </section>

      {/* Mission & Vision Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Our Core Mission
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {settings?.mission}
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Our Vision
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {settings?.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 px-4 sm:px-8 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Guiding Institutional Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
              Core Principles & Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Institutional Legacy
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
            Our Journey Over the Decades
          </h2>
        </div>

        <div className="relative border-l-2 border-brand-200 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Year badge */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="sm:-ml-32 sm:absolute sm:-left-6 top-1 text-sm font-extrabold text-brand-700 hidden sm:block">
                {m.year}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                <span className="text-xs font-bold text-brand-600 sm:hidden block mb-1">
                  Year {m.year}
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  {m.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

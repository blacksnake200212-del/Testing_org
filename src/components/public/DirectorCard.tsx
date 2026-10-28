import React, { useState } from 'react';
import { Director } from '../../types/database';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Mail, User, Award, Shield } from 'lucide-react';
import { Linkedin } from '../common/Icons';

interface DirectorCardProps {
  director: Director;
}

export const DirectorCard: React.FC<DirectorCardProps> = ({ director }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Photo Container */}
        <div className="relative aspect-[4/4] overflow-hidden bg-slate-100">
          <img
            src={director.photo_url}
            alt={director.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-2 bg-white/95 text-slate-900 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white shadow-lg transition"
            >
              View Full Profile
            </button>
          </div>

          {!director.is_active && (
            <div className="absolute top-3 right-3">
              <span className="bg-slate-800/90 text-slate-200 text-xs px-2.5 py-1 rounded-md font-medium border border-slate-700">
                Emeritus / Past Board
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {director.committee && (
              <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider block mb-1">
                {director.committee}
              </span>
            )}
            <h3 className="text-lg font-bold text-slate-900 font-heading leading-tight group-hover:text-brand-600 transition-colors">
              {director.name}
            </h3>
            <p className="text-sm font-medium text-slate-600 mt-1">
              {director.position}
            </p>
            <p className="text-xs text-slate-500 mt-3 line-clamp-3 leading-relaxed">
              {director.biography}
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition"
            >
              Read Biography →
            </button>

            <div className="flex items-center gap-1.5 text-slate-400">
              {director.email && (
                <a
                  href={`mailto:${director.email}`}
                  className="p-1 hover:text-brand-600 transition"
                  title={director.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
              {director.linkedin_url && (
                <a
                  href={director.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 hover:text-brand-600 transition"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Detail Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={director.photo_url}
                alt={director.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 space-y-2">
              <StatusBadge status={director.is_active ? 'active' : 'inactive'} />
              {director.term_start && (
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Tenure:</span> {director.term_start} {director.term_end ? `to ${director.term_end}` : 'to Present'}
                </p>
              )}
              {director.committee && (
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Subcommittee:</span> {director.committee}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
                {director.committee || 'Board of Directors'}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                {director.name}
              </h2>
              <p className="text-base font-semibold text-slate-700 mt-0.5">
                {director.position}
              </p>
            </div>

            <div className="border-t border-b border-slate-100 py-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Executive Biography
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {director.biography}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {director.email && (
                <a
                  href={`mailto:${director.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-600" />
                  <span>Send Official Inquiry</span>
                </a>
              )}
              {director.linkedin_url && (
                <a
                  href={director.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

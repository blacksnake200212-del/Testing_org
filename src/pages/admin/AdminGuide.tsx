import React from 'react';
import { Link } from 'react-router-dom';
import { AdminHeader } from '../../components/common/AdminHeader';
import { 
  BookOpen, CheckCircle2, Newspaper, Users, 
  Image, ArrowRight, ShieldCheck, Lock, Upload, Sparkles 
} from 'lucide-react';

export const AdminGuide: React.FC = () => {
  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto pb-24">
      <AdminHeader
        title="Staff Operation & Training Manual"
        subtitle="Complete step-by-step guide for non-technical organization staff on updating news and managing directors without writing any code."
      />

      {/* Core Principle Banner */}
      <div className="bg-gradient-to-r from-brand-900 to-navy-900 text-white rounded-2xl p-6 sm:p-8 space-y-3 shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Zero Code Requirement Guarantee</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
          Empowering Your Secretariat Team
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Everything published via this CMS immediately updates the public website. You do not need to open code editors, run builds, or ask software engineers for day-to-day announcements or board changes.
        </p>
      </div>

      {/* Guide 1: Uploading News */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg font-heading">
            1
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              How Staff Publish News & Announcements
            </h3>
            <p className="text-xs text-slate-500">From writing drafts to live public deployment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Step 1</span>
            <h4 className="font-bold text-slate-900 text-sm">Open News Editor</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click <strong>"Add News"</strong> in the sidebar or top bar to open the editor.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Step 2</span>
            <h4 className="font-bold text-slate-900 text-sm">Fill Headline & Story</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter headline, category (Press Release, Event, etc.), and article body using the rich toolbar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Step 3</span>
            <h4 className="font-bold text-slate-900 text-sm">Upload Photo</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Drag an image from your computer, paste a photo URL, or pick from the preset gallery.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Step 4</span>
            <h4 className="font-bold text-slate-900 text-sm">Preview & Publish</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click <strong>"Publish Live"</strong> to make it public, or <strong>"Save Draft"</strong> to review later.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/admin/news/new"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Try creating an article now →</span>
          </Link>
        </div>
      </section>

      {/* Guide 2: Board Management */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg font-heading">
            2
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Managing the Board of Directors
            </h3>
            <p className="text-xs text-slate-500">Adding new appointees, updating biographies, and reordering</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Appointing a New Chairman or Board Member:</strong> Click "Add New Director". Input their full name with honors, official position, biography, and portrait photograph.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Reordering Board Positions:</strong> The public website displays board members in exact order (Chairman #1, Vice Chair #2, etc.). Simply use the <strong>Up (↑) and Down (↓) arrows</strong> in the table to reorder the hierarchy instantly!
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Handling Former Directors (Best Practice):</strong> Instead of permanently deleting records of respected former board members, change their status to <em>"Past / Emeritus Member"</em>. They will gracefully move to the Emeritus section on the public site, preserving organizational memory.
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/admin/directors"
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700"
          >
            <span>Go to Board of Directors Management →</span>
          </Link>
        </div>
      </section>

      {/* Guide 3: Security & Netlify Deployment */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg font-heading">
            3
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Connecting Custom Domain & Netlify Hosting
            </h3>
            <p className="text-xs text-slate-500">Live deployment configuration for organization.lk</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            When you deploy this project to Netlify, it already includes a pre-configured <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800 font-bold">netlify.toml</code> file that handles Single Page App routing so URLs like <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">/news</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">/admin/dashboard</code> never return 404 errors on refresh.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
            <p><strong>Netlify Build Settings:</strong></p>
            <p>• Build Command: <code>npm run build</code></p>
            <p>• Publish Directory: <code>dist</code></p>
            <p>• Custom Domain: Add DNS CNAME or A Record pointing to Netlify for <code>organization.lk</code></p>
          </div>
        </div>
      </section>
    </div>
  );
};

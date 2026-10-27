import React from 'react';
import { Link } from 'react-router-dom';
import { useOrg } from '../../context/OrgContext';
import { Building2, Mail, Phone, MapPin, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useOrg();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-xl font-heading tracking-tight">
                {settings?.name || 'National Foundation for Development & Governance'}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {settings?.description || 'An apex national organization dedicated to transparent institutional development, civic engagement, and leadership excellence.'}
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Statutory Registration:</span> {settings?.registration_no}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition flex items-center gap-1 group">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition">
                  About Us & Mission
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-slate-400 hover:text-white transition">
                  News & Announcements
                </Link>
              </li>
              <li>
                <Link to="/directors" className="text-slate-400 hover:text-white transition">
                  Board of Directors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition">
                  Contact Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Public Governance */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              Public Portal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Open Audits & Charters</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Council Resolutions</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>District Hubs Network</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold bg-brand-950/60 px-3 py-1.5 rounded-lg border border-brand-800"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized Staff CMS</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Snippet */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              Headquarters
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-1" />
                <span>{settings?.address}, {settings?.city}, {settings?.country}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>{settings?.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>{settings?.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Netlify / Supabase stack acknowledgment */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {settings?.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              Built with <span className="text-brand-400 font-semibold">React</span> + <span className="text-emerald-400 font-semibold">Supabase</span> + <span className="text-cyan-400 font-semibold">Tailwind CSS</span>
            </span>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-slate-300 transition">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

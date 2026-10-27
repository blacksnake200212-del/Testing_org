import React, { useState } from 'react';
import { useOrg } from '../../context/OrgContext';
import { localStore } from '../../lib/storage';
import { AdminHeader } from '../../components/common/AdminHeader';
import { 
  Building2, Save, RotateCcw, Mail, Phone, 
  MapPin, Globe, ShieldCheck, CheckCircle2 
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, saveOrgSettings, showToast } = useOrg();
  const [formData, setFormData] = useState({ ...settings });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await saveOrgSettings(formData);
    } catch {
      // Handled in context
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to restore the default sample data? This will reset news articles and directors.')) {
      localStore.resetToDefault();
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto pb-24">
      <AdminHeader
        title="Organization Profile & Information"
        subtitle="Update public contact numbers, address, institutional vision, mission, and registration details."
        actionButton={
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand & Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Brand Identity & Nomenclature</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Full Statutory Organization Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Short Name / Acronym *
              </label>
              <input
                type="text"
                required
                value={formData.short_name}
                onChange={e => setFormData({ ...formData, short_name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Official Motto / Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              General Institutional Overview (Meta Description)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Founding Year
              </label>
              <input
                type="number"
                value={formData.founded_year}
                onChange={e => setFormData({ ...formData, founded_year: parseInt(e.target.value) || 2008 })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Registration / Charter Number
              </label>
              <input
                type="text"
                value={formData.registration_no}
                onChange={e => setFormData({ ...formData, registration_no: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mission & Strategic Vision</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Organizational Mission Statement *
            </label>
            <textarea
              rows={3}
              required
              value={formData.mission}
              onChange={e => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Organizational Vision Statement *
            </label>
            <textarea
              rows={3}
              required
              value={formData.vision}
              onChange={e => setFormData({ ...formData, vision: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Public Contact Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Primary Telephone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Public Hotline
              </label>
              <input
                type="text"
                value={formData.hotline}
                onChange={e => setFormData({ ...formData, hotline: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                City / Province
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Submit & Reset actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleResetData}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1.5 p-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Initial Defaults</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

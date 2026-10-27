import React, { useState } from 'react';
import { useOrg } from '../../context/OrgContext';
import { 
  MapPin, Phone, Mail, Clock, Send, 
  CheckCircle2, ShieldCheck, MessageSquare, Globe 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useOrg();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Inquiries',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please complete all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Inquiry sent successfully to Secretariat!', 'success');
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-navy-900 text-white py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block">
            National Secretariat
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Contact & Public Inquiries
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Reach out to our communications bureau, schedule institutional delegations, or request official documentation.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Office Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
              <h3 className="text-xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-4">
                Headquarters Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Physical Address
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {settings?.address}
                    </p>
                    <p className="text-xs text-slate-500">
                      {settings?.city}, {settings?.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      General Switchboard & Hotline
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {settings?.phone}
                    </p>
                    <p className="text-xs text-slate-500">
                      Direct Hotline: {settings?.hotline}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Electronic Mail
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      {settings?.email}
                    </p>
                    <p className="text-xs text-slate-500">
                      Media Bureau: media@organization.lk
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Public Operating Hours
                    </span>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">
                      Monday to Friday: 8:30 AM – 4:30 PM
                    </p>
                    <p className="text-xs text-slate-500">
                      Closed on Weekends and Gazetted Public Holidays
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/90 aspect-[16/10] relative flex items-center justify-center text-center p-6">
              <div className="space-y-2">
                <MapPin className="w-8 h-8 text-brand-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800 font-heading">
                  Interactive Map View
                </h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  {settings?.address}, {settings?.city}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${settings?.address}, ${settings?.city}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline pt-1"
                >
                  <span>Open in Google Maps</span>
                  <Globe className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/90 shadow-xs">
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">
                Send an Official Communication
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                All submissions are logged in our Secretariat public register and routed to the corresponding department head.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900 font-heading">
                    Inquiry Received Successfully
                  </h4>
                  <p className="text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Your message has been assigned reference ID <span className="font-mono font-bold">#INQ-{Math.floor(1000 + Math.random() * 9000)}</span>. Our communications officer will respond via email within 2 business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        department: 'General Inquiries',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mr. Sahan Perera"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sahan@example.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Contact Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+94 77 000 0000"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Recipient Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                      >
                        <option value="General Inquiries">General Secretariat Inquiries</option>
                        <option value="Media & Press Relations">Media & Press Relations</option>
                        <option value="Board of Directors">Board Secretariat</option>
                        <option value="Audit & Compliance">Audit & Public Governance</option>
                        <option value="Partnership & Grants">Institutional Partnerships</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Subject Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief overview of your inquiry"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Inquiry Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your inquiry or official communication in detail..."
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 flex items-center justify-center gap-2 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Official Communication</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

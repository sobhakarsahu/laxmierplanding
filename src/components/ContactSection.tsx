import React, { useState } from 'react';
import { 
  Send, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { ContactConfig, Inquiry } from '../types';
import { StorageService } from '../services/storage';

interface ContactSectionProps {
  config: ContactConfig;
  onOpenConfigModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, onOpenConfigModal }) => {
  const [fullName, setFullName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [districtState, setDistrictState] = useState('');
  const [branches, setBranches] = useState('');
  const [interestedService, setInterestedService] = useState('Complete LaxmiERP Software');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeyPot, setHoneyPot] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    'Hello LaxmiERP Team, I am interested in your Computer Institute Management System. Please provide details and a demo.'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await StorageService.addInquiry({
        fullName,
        instituteName,
        mobileNumber,
        email: email.trim() || undefined,
        districtState: districtState.trim() || undefined,
        branches: branches.trim() || undefined,
        interestedService,
        message,
        consent,
      }, honeyPot);

      if (res.success) {
        setSuccess(true);
        setFullName('');
        setInstituteName('');
        setMobileNumber('');
        setEmail('');
        setDistrictState('');
        setBranches('');
        setMessage('');
        setConsent(false);
      } else {
        setError(res.error || 'Failed to submit inquiry');
      }
    } catch (err: any) {
      setError(err.message || 'Submission error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-100/60 px-3 py-1 rounded-full border border-sky-200">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Contact LaxmiERP Team
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Have questions about student enrollments, pricing, multi-branch setups, or customized computer academy requirements? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Connect & Configuration Notice (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-5">
              <h3 className="text-lg font-bold text-slate-900">
                Direct Institute Support
              </h3>
              
              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                    WhatsApp Chat &amp; Demo
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">
                    Chat on WhatsApp
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Instant response for feature questions &amp; video walkthroughs
                  </p>
                </div>
              </a>

              {/* Call Card */}
              <a
                href={`tel:${config.phone}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                    Direct Phone Line
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-0.5 font-mono">
                    {config.phone}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mon - Sat from 9:00 AM to 7:00 PM IST
                  </p>
                </div>
              </a>

              {/* Verified Number Disclaimer & Config Note */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  Verified Contact Configuration Notice
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  {config.isConfigured 
                    ? `Verified business phone configured as: ${config.phone}` 
                    : `Currently showing placeholder contact (${config.phone}). Institute administrator can update the official verified number anytime.`}
                </p>
                <button
                  type="button"
                  onClick={onOpenConfigModal}
                  className="mt-2 text-[11px] font-bold text-amber-900 underline hover:text-amber-950"
                >
                  Configure official business phone &rarr;
                </button>
              </div>

              {/* Office Location & Details */}
              <div className="pt-2 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>Platform: laxmierp.com — Cloud SaaS for Computer Academies</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>Server encrypted data with role-enforced access controls</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            
            {success ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Inquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to LaxmiERP. Your inquiry has been recorded securely with status <span className="font-bold text-slate-800">New</span>. Our advisory team will review your requirements and contact you promptly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  value={honeyPot}
                  onChange={e => setHoneyPot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                />

                <div className="mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Send an Inquiry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fields marked with an asterisk (<span className="text-rose-500">*</span>) are required.
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Manoj Tripathy"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Institute Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Modern Computer Academy"
                      value={instituteName}
                      onChange={e => setInstituteName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="director@institute.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      District &amp; State <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Sambalpur, Odisha"
                      value={districtState}
                      onChange={e => setDistrictState(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Number of Branches <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 1 Branch / 3 Locations"
                      value={branches}
                      onChange={e => setBranches(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Interested Service
                  </label>
                  <select
                    value={interestedService}
                    onChange={e => setInterestedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white font-medium"
                  >
                    <option value="Student Management">Student Management</option>
                    <option value="Fees Management">Fees Management</option>
                    <option value="Multi-Branch ERP">Multi-Branch ERP</option>
                    <option value="Income and Expense Management">Income and Expense Management</option>
                    <option value="Complete LaxmiERP Software">Complete LaxmiERP Software</option>
                    <option value="Free Demo">Free Demo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about your institute, number of current students, or any specific management problems you want solved..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="contactConsent"
                    required
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    className="mt-0.5 rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="contactConsent" className="text-xs text-slate-600 leading-snug cursor-pointer">
                    I consent to LaxmiERP contacting me regarding this inquiry and processing my details in accordance with the privacy policy.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm bg-linear-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 shadow-md shadow-sky-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting inquiry securely...' : 'Submit Inquiry'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

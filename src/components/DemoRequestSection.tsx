import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Phone, 
  Video, 
  Mail, 
  MessageSquare, 
  Building, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { DemoRequest } from '../types';
import { StorageService } from '../services/storage';

export const DemoRequestSection: React.FC = () => {
  const [name, setName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<DemoRequest['preferredMethod']>('WhatsApp');
  const [branches, setBranches] = useState<DemoRequest['branches']>('1 Branch');
  const [preferredDateTime, setPreferredDateTime] = useState('');
  const [requirements, setRequirements] = useState('');
  const [honeyPot, setHoneyPot] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await StorageService.addDemoRequest({
        name,
        instituteName,
        phoneNumber,
        preferredMethod,
        branches,
        preferredDateTime: preferredDateTime || undefined,
        requirements: requirements || undefined,
      }, honeyPot);

      if (res.success) {
        setSuccess(true);
        setName('');
        setInstituteName('');
        setPhoneNumber('');
        setPreferredDateTime('');
        setRequirements('');
      } else {
        setError(res.error || 'Failed to submit demo request');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 bg-linear-to-b from-sky-50/60 to-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-sky-200 shadow-xl shadow-sky-900/5 relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Info & Value Prop (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                Complimentary 1-on-1 Walkthrough
              </span>

              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Request a Free Guided Demo of <span className="text-sky-600">LaxmiERP</span>
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                See how effortless it is to manage student admissions, automate fee installment alerts, and print professional receipts for your computer academy.
              </p>

              <div className="space-y-3 pt-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No payment or card required — 100% free demonstration</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Personalized to your courses (DCA, PGDCA, Tally, ADCA, etc.)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Demonstrated via WhatsApp screen share or Google Meet</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-sky-800 text-xs">
                <div className="font-bold mb-1">Instant Assistance?</div>
                <div>Prefer immediate answers? Reach us directly on WhatsApp or phone below.</div>
              </div>
            </div>

            {/* Right Column: Interactive Form (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
              {success ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Demo Request Successfully Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you! Our technical specialist has received your request and will connect with you via <span className="font-bold text-slate-800">{preferredMethod}</span> shortly to walk you through LaxmiERP.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                  >
                    Submit Another Request
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

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Rajesh Kumar"
                        value={name}
                        onChange={e => setName(e.target.value)}
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
                        placeholder="Silicon Computer Academy"
                        value={instituteName}
                        onChange={e => setInstituteName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Number of Branches
                      </label>
                      <select
                        value={branches}
                        onChange={e => setBranches(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                      >
                        <option value="1 Branch">1 Branch (Single Center)</option>
                        <option value="2-3 Branches">2-3 Branches</option>
                        <option value="4-10 Branches">4-10 Branches (Franchise)</option>
                        <option value="10+ Branches">10+ Branches (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Contact Method
                      </label>
                      <select
                        value={preferredMethod}
                        onChange={e => setPreferredMethod(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                      >
                        <option value="WhatsApp">WhatsApp Message / Call</option>
                        <option value="Phone Call">Direct Phone Call</option>
                        <option value="Google Meet">Google Meet Screen Share</option>
                        <option value="Email">Email Details</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Date / Time Slot
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Tomorrow at 3:00 PM"
                        value={preferredDateTime}
                        onChange={e => setPreferredDateTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Additional Requirements / Current Challenges
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Want to track pending fees for 300 students and print thermal receipts..."
                      value={requirements}
                      onChange={e => setRequirements(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl text-white font-extrabold text-sm bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{loading ? 'Submitting request...' : 'Submit Demo Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Stored securely. LaxmiERP never shares your institute details with third parties.
                  </p>

                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

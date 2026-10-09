import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Edit3, 
  Phone, 
  Save, 
  Star, 
  Calendar, 
  FileText,
  Server,
  Copy,
  Check,
  Building,
  Settings2
} from 'lucide-react';
import { Review, Inquiry, DemoRequest, ContactConfig } from '../types';
import { StorageService } from '../services/storage';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose, onConfigUpdated }) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'inquiries' | 'demos' | 'config' | 'deploy'>('reviews');

  // Data states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [config, setConfig] = useState<ContactConfig>(StorageService.getConfig());
  const [configSuccess, setConfigSuccess] = useState(false);
  const [copiedRules, setCopiedRules] = useState(false);

  // Review Edit State
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editReviewText, setEditReviewText] = useState('');

  const loadData = () => {
    setReviews(StorageService.getReviews());
    setInquiries(StorageService.getInquiries());
    setDemos(StorageService.getDemoRequests());
    setConfig(StorageService.getConfig());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Review actions
  const handleApproveReview = (id: string) => {
    StorageService.setReviewStatus(id, 'approved');
    loadData();
  };

  const handleRejectReview = (id: string) => {
    StorageService.setReviewStatus(id, 'rejected');
    loadData();
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      StorageService.deleteReview(id);
      loadData();
    }
  };

  const handleSaveEditReview = (id: string) => {
    StorageService.updateReview(id, { reviewText: editReviewText });
    setEditingReviewId(null);
    loadData();
  };

  // Inquiry actions
  const handleInquiryStatus = (id: string, status: Inquiry['status']) => {
    StorageService.updateInquiryStatus(id, status);
    loadData();
  };

  // Demo actions
  const handleDemoStatus = (id: string, status: DemoRequest['status']) => {
    StorageService.updateDemoStatus(id, status);
    loadData();
  };

  // Save config
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveConfig({
      phone: config.phone,
      whatsapp: config.whatsapp.replace(/\D/g, ''),
    });
    setConfigSuccess(true);
    onConfigUpdated();
    setTimeout(() => setConfigSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-xs">
              ERP
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>LaxmiERP Management &amp; Moderation Portal</span>
                <span className="text-[10px] font-semibold bg-sky-800 text-sky-200 px-2 py-0.5 rounded-full">
                  Direct Management Access
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Review moderation, student inquiry records, verified business contacts &amp; deployment checklist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Dashboard directly accessible without login gate */}
        <div className="flex flex-col flex-1 overflow-hidden">
          
          {/* Subnav Tabs */}
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'reviews' 
                  ? 'bg-white text-sky-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Reviews ({reviews.length})</span>
              {reviews.filter(r => r.status === 'pending').length > 0 && (
                <span className="bg-amber-500 text-white px-1.5 py-0.2 rounded-full text-[9px]">
                  {reviews.filter(r => r.status === 'pending').length} pending
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'inquiries' 
                  ? 'bg-white text-sky-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('demos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'demos' 
                  ? 'bg-white text-sky-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Demo Requests ({demos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'config' 
                  ? 'bg-white text-sky-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Verified Contact Numbers</span>
            </button>

            <button
              onClick={() => setActiveTab('deploy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'deploy' 
                  ? 'bg-white text-sky-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Production &amp; Firebase Checklist</span>
            </button>
          </div>

          {/* Tab Body with Scroll */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            
            {/* TAB 1: REVIEWS MODERATION */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Review Moderation Queue</h4>
                    <p className="text-xs text-slate-500">
                      Only reviews marked as <span className="font-semibold text-emerald-600">Approved</span> appear publicly on the website.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Total: {reviews.length} | Approved: {reviews.filter(r => r.status === 'approved').length}
                  </span>
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                    <Star className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">No review submissions yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      When computer institute directors submit reviews via the website, they will appear here for approval.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map(r => (
                      <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{r.fullName}</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs font-semibold text-slate-700">{r.instituteName}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                                r.status === 'approved' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : r.status === 'rejected' 
                                  ? 'bg-rose-100 text-rose-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {r.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star 
                                  key={star} 
                                  className={`w-3.5 h-3.5 ${
                                    star <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                                  }`} 
                                />
                              ))}
                              <span className="text-[10px] text-slate-400 ml-2">
                                Submitted {new Date(r.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {r.status !== 'approved' && (
                              <button
                                onClick={() => handleApproveReview(r.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                            )}
                            {r.status !== 'rejected' && (
                              <button
                                onClick={() => handleRejectReview(r.id)}
                                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Reject</span>
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setEditingReviewId(r.id);
                                setEditReviewText(r.reviewText);
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                              title="Edit text"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(r.id)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Review Text or Edit Mode */}
                        {editingReviewId === r.id ? (
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <textarea
                              value={editReviewText}
                              onChange={e => setEditReviewText(e.target.value)}
                              rows={3}
                              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setEditingReviewId(null)}
                                className="px-3 py-1 rounded-lg text-xs text-slate-600 hover:bg-slate-100"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveEditReview(r.id)}
                                className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-700"
                              >
                                Save Edit
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                            "{r.reviewText}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Contact Us Inquiries</h4>
                    <p className="text-xs text-slate-500">
                      Received from the contact form. Server timestamp &amp; details logged.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Total: {inquiries.length}
                  </span>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">No inquiries yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Inquiries submitted from the Contact Us form will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map(inq => (
                      <div key={inq.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{inq.fullName}</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs font-semibold text-slate-700">{inq.instituteName}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-3">
                              <span>Phone: <strong className="font-mono text-slate-800">{inq.mobileNumber}</strong></span>
                              {inq.email && <span>Email: {inq.email}</span>}
                              {inq.districtState && <span>Location: {inq.districtState}</span>}
                              {inq.branches && <span>Branches: {inq.branches}</span>}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                              inq.status === 'resolved' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : inq.status === 'contacted' 
                                ? 'bg-sky-100 text-sky-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {inq.status}
                            </span>
                            <select
                              value={inq.status}
                              onChange={e => handleInquiryStatus(inq.id, e.target.value as any)}
                              className="text-xs border rounded p-1 bg-white"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                            </select>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                          <span className="font-bold text-sky-700">Interested in: {inq.interestedService}</span>
                          <p className="mt-1 text-slate-700">{inq.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DEMO REQUESTS */}
            {activeTab === 'demos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Free Demo Requests</h4>
                    <p className="text-xs text-slate-500">
                      Prospective computer academy directors awaiting scheduled walkthroughs.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Total: {demos.length}
                  </span>
                </div>

                {demos.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                    <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700">No demo requests yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Requests submitted from the "Get a Free Demo" form will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {demos.map(d => (
                      <div key={d.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-sm text-slate-900">{d.name} — {d.instituteName}</div>
                            <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-3">
                              <span>Phone: <strong className="font-mono text-slate-800">{d.phoneNumber}</strong></span>
                              <span>Method: <strong className="text-sky-700">{d.preferredMethod}</strong></span>
                              <span>Scale: {d.branches}</span>
                              {d.preferredDateTime && <span>Time: {d.preferredDateTime}</span>}
                            </div>
                          </div>
                          <select
                            value={d.status}
                            onChange={e => handleDemoStatus(d.id, e.target.value as any)}
                            className="text-xs border rounded p-1 bg-white font-semibold"
                          >
                            <option value="pending">Pending</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        {d.requirements && (
                          <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-700 border border-slate-100">
                            <span className="font-bold text-slate-800">Requirements: </span>
                            {d.requirements}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: CONFIGURATION */}
            {activeTab === 'config' && (
              <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Verified Contact Information Configurator
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Update the official verified telephone line and verified WhatsApp number. Changes immediately update across all buttons and links on laxmierp.com.
                  </p>
                </div>

                {configSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Configuration saved successfully! Site updated.</span>
                  </div>
                )}

                <form onSubmit={handleSaveConfig} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Verified Business Telephone Link Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+919876543210"
                      value={config.phone}
                      onChange={e => setConfig({ ...config, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Example: +919876543210 (Used for clickable tel: links)
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Verified WhatsApp Number (International format without plus or spaces)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="919876543210"
                      value={config.whatsapp}
                      onChange={e => setConfig({ ...config, whatsapp: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Example: 919876543210 (Used for WhatsApp click-to-chat links)
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                    Status: {config.isConfigured ? (
                      <span className="font-bold text-emerald-700">✓ Verified Business Number Active</span>
                    ) : (
                      <span className="font-bold text-amber-700">⚠ Currently using default placeholder</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/20 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Verified Contact Numbers</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 5: DEPLOYMENT CHECKLIST */}
            {activeTab === 'deploy' && (
              <div className="space-y-6 max-w-3xl">
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Server className="w-5 h-5 text-sky-600" />
                    <span>Production Deployment Checklist</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Checklist of configuration values that must be supplied before deploying laxmierp.com to production.
                  </p>

                  <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <strong>1. Verified Business WhatsApp Number:</strong> Set <code>VITE_WHATSAPP_NUMBER</code> in environment or admin settings (format: 91XXXXXXXXXX).
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <strong>2. Verified Business Telephone Number:</strong> Set <code>VITE_CONTACT_PHONE</code> (format: +91XXXXXXXXXX).
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <strong>3. Deploy Security Rules:</strong> Apply <code>firestore.rules</code> to the Firebase project to enforce role-based access for reviews and inquiries.
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <strong>4. Custom Domain Binding:</strong> Bind <code>laxmierp.com</code> and configure SSL certificate on your hosting provider.
                      </div>
                    </div>
                  </div>
                </div>

                {/* firestore.rules viewer */}
                <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-sky-400 font-mono">
                      firestore.rules (Included in repository)
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /reviews/{reviewId} { allow read: if resource.data.status == 'approved'; }\n  }\n}`);
                        setCopiedRules(true);
                        setTimeout(() => setCopiedRules(false), 2000);
                      }}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedRules ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRules ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto p-2 bg-slate-950 rounded-lg">
                    {`// Configured in firestore.rules
match /inquiries/{inquiryId} {
  allow create: if request.resource.data.fullName is string;
  allow read, write: if isAdmin();
}
match /reviews/{reviewId} {
  allow read: if resource.data.status == 'approved';
  allow create: if request.resource.data.status == 'pending';
  allow write: if isAdmin();
}`}
                  </pre>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

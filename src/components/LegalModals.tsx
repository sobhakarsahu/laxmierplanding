import React, { useState } from 'react';
import { X, Shield, FileCheck, Phone, CheckCircle2 } from 'lucide-react';
import { ContactConfig } from '../types';
import { StorageService } from '../services/storage';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold">Privacy Policy — LaxmiERP</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto">
          <p>
            At <strong>LaxmiERP (laxmierp.com)</strong>, we take the privacy and confidentiality of computer institutes, franchise centers, directors, students, and parents with utmost seriousness.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">1. Data Ownership</h4>
          <p>
            All institute data—including student personal records, course enrollments, fee transactions, and staff rosters—remains the sole exclusive property of your institute. LaxmiERP operates strictly as a cloud software management system and does not sell or distribute your student lists.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">2. Information Collection</h4>
          <p>
            When you request a demo or submit an inquiry, we collect your contact information (name, institute name, phone number, and branch requirements) solely to facilitate software demonstration and customer support.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">3. Role-Based Data Protection</h4>
          <p>
            Access to institute records is partitioned by role-based authentication (Admin, Branch Manager, Staff, Student). Data is transmitted over SSL/TLS encrypted connections and stored securely in authorized cloud databases.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">4. Review Moderation &amp; Consent</h4>
          <p>
            Client reviews submitted on the platform are subject to administrative verification and require explicit opt-in consent before public display.
          </p>
        </div>
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in duration-200">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold">Terms &amp; Conditions — LaxmiERP</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto">
          <p>
            Welcome to <strong>laxmierp.com</strong>. By accessing our platform or registering your computer institute, you agree to these operational terms.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">1. Service Scope</h4>
          <p>
            LaxmiERP provides software-as-a-service (SaaS) for computer academies, DCA/PGDCA centers, vocational institutions, and educational multi-branch franchises for student tracking, fee management, income/expense logging, and instant PDF receipts.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">2. Account Responsibility</h4>
          <p>
            Institute administrators are responsible for managing access credentials for their staff and ensuring that receipts generated accurately reflect student fee payments.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">3. Availability &amp; Uptime</h4>
          <p>
            We strive to provide 99.9% cloud availability. Scheduled maintenance windows will be communicated in advance to institute directors.
          </p>
          <h4 className="font-bold text-slate-800 text-sm">4. Slogan and Intellectual Property</h4>
          <p>
            “Learn Today, Build Tomorrow” and the LaxmiERP brand emblems are proprietary assets of laxmierp.com.
          </p>
        </div>
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface QuickConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const QuickConfigModal: React.FC<QuickConfigModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [config, setConfig] = useState<ContactConfig>(StorageService.getConfig());
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveConfig({
      phone: config.phone,
      whatsapp: config.whatsapp.replace(/\D/g, ''),
    });
    setSaved(true);
    onSaved();
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold">Configure Business Phone</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Replace the placeholder contact with your institute's real verified telephone line and WhatsApp number.
          </p>

          {saved && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Contact numbers saved! Updating website...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Telephone (e.g. +91 98765 43210)
              </label>
              <input
                type="text"
                required
                value={config.phone}
                onChange={e => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Number (without + or spaces, e.g. 919876543210)
              </label>
              <input
                type="text"
                required
                value={config.whatsapp}
                onChange={e => setConfig({ ...config, whatsapp: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md"
            >
              Save &amp; Apply Instantly
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

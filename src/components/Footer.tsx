import React from 'react';
import { 
  Cloud, 
  MessageCircle, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Heart,
  SlidersHorizontal,
  LogIn
} from 'lucide-react';
import { ContactConfig } from '../types';

interface FooterProps {
  config: ContactConfig;
  onNavigate: (id: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenLogin: () => void;
  onOpenManagement: () => void;
  onOpenReceiptDemo: () => void;
  onOpenConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenLogin,
  onOpenManagement,
  onOpenReceiptDemo,
  onOpenConfig
}) => {
  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    'Hello LaxmiERP Team, I am interested in your Computer Institute Management System. Please provide details and a demo.'
  )}`;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-md">
                <Cloud className="w-5 h-5 stroke-[2.2]" />
                <span className="absolute text-[9px] font-black text-amber-300">⇅</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  laxmi<span className="text-sky-400">erp</span>
                </span>
                <span className="text-sm font-bold text-orange-400 ml-0.5">.com</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering Digital Education &amp; Smart Computer Institute Management System. Manage students, fee installments, staff, multi-branches, income, and expenses from one simple, secure cloud platform.
            </p>

            {/* Closing Slogan Banner */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                Official Motto
              </span>
              <p className="text-sm font-extrabold text-amber-300 italic font-serif mt-0.5">
                “Learn Today, Build Tomorrow.”
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
              <a
                href={`tel:${config.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/60 border border-sky-800 text-sky-300 text-xs font-semibold hover:bg-sky-900/60 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {config.phone}
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['home', 'features', 'benefits', 'how-it-works', 'reviews', 'demo', 'contact'].map(linkId => (
                <li key={linkId}>
                  <button
                    onClick={() => onNavigate(linkId)}
                    className="text-slate-400 hover:text-white capitalize transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{linkId.replace('-', ' ')}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Key Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Software Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('features')}>
                Student Admissions &amp; Batches
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('features')}>
                Fees Installments Tracking
              </li>
              <li className="hover:text-white transition-colors cursor-pointer text-sky-400 flex items-center gap-1" onClick={onOpenReceiptDemo}>
                <span>Instant PDF Receipts</span>
                <span className="text-[9px] bg-sky-900 text-sky-200 px-1.5 py-0.2 rounded">Demo</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('features')}>
                Income &amp; Expense Register
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('features')}>
                Multi-Branch Cloud Sync
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('features')}>
                Role-Based Permissions
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Administration */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Institute Access
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenLogin}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <LogIn className="w-3 h-3 text-sky-400" />
                  <span>Institute Cloud Login</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenManagement}
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                  <span>Management &amp; Moderation</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConfig}
                  className="text-slate-400 hover:text-amber-300 transition-colors"
                >
                  Configure Verified Phone
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms and Conditions
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                LaxmiERP Cloud Architecture • 256-bit SSL Security
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>laxmierp.com</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300">Terms of Service</button>
            <span>•</span>
            <span className="text-amber-400 font-semibold italic">“Learn Today, Build Tomorrow.”</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

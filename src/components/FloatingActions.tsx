import React, { useState } from 'react';
import { MessageCircle, Phone, Sparkles, X, Settings2, Info } from 'lucide-react';
import { ContactConfig } from '../types';

interface FloatingActionsProps {
  config: ContactConfig;
  onOpenConfig: () => void;
  onRequestDemo: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  config,
  onOpenConfig,
  onRequestDemo,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    'Hello LaxmiERP Team, I am interested in your Computer Institute Management System. Please provide details and a demo.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 select-none no-print">
      
      {/* Tooltip if using placeholder */}
      {!config.isConfigured && tooltipVisible && (
        <div className="bg-slate-900 text-white text-xs p-3 rounded-2xl shadow-xl max-w-xs border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Placeholder Notice
            </span>
            <button 
              onClick={() => setTooltipVisible(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Currently using placeholder phone ({config.phone}). As an administrator, you can configure your real verified business number.
          </p>
          <button
            onClick={() => {
              setTooltipVisible(false);
              onOpenConfig();
            }}
            className="mt-2 text-[10px] font-bold text-sky-400 underline"
          >
            Update Business Number &rarr;
          </button>
        </div>
      )}

      {/* Action Buttons Stack */}
      <div className="flex flex-col gap-2.5 items-end">
        
        {/* Call Button */}
        <div className="group relative flex items-center">
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            Call LaxmiERP ({config.phone})
          </span>
          <a
            href={`tel:${config.phone}`}
            aria-label="Call LaxmiERP"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-tr from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:scale-105 active:scale-95 transition-all"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>

        {/* WhatsApp Button */}
        <div className="group relative flex items-center">
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            Chat on WhatsApp
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with LaxmiERP on WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-500/35 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all"
          >
            <MessageCircle className="w-7 h-7 fill-white/10" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full"></span>
          </a>
        </div>

        {/* Small config hint icon if placeholder */}
        {!config.isConfigured && (
          <button
            onClick={() => setTooltipVisible(!tooltipVisible)}
            className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1"
            title="Configure business number"
          >
            <Settings2 className="w-3 h-3 text-amber-600" />
            <span>Config</span>
          </button>
        )}

      </div>

    </div>
  );
};

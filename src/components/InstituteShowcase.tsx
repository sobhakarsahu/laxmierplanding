import React from 'react';
import { Sparkles, CheckCircle2, GraduationCap, Laptop, Building } from 'lucide-react';

interface InstituteShowcaseProps {
  onRequestDemo: () => void;
}

export const InstituteShowcase: React.FC<InstituteShowcaseProps> = ({ onRequestDemo }) => {
  return (
    <section className="py-20 bg-linear-to-b from-slate-50 via-white to-sky-50/40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Empowering Modern Computer Centers Across India
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Designed for <span className="text-sky-600">Smart Classrooms</span> &amp; Digital Labs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Whether you run a single computer academy or a multi-branch franchise network, LaxmiERP provides the speed, stability, and simplicity you need.
          </p>
        </div>

        {/* 3 Grid Images with Professional Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Advanced Computer Lab */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Modern Computer Lab"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-600/90 px-2.5 py-0.5 rounded-full">
                  Lab Management
                </span>
                <h4 className="text-lg font-bold mt-1">Smart Computer Labs</h4>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                Manage student batch timings, hardware workstations, attendance registers, and practical exam schedules effortlessly.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Laptop className="w-3.5 h-3.5 text-sky-600" />
                  Workstation Tracking
                </span>
                <span className="text-emerald-600 font-bold">Active</span>
              </div>
            </div>
          </div>

          {/* Card 2: Student Programming & Certifications */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
                alt="Student Learning Programming"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-600/90 px-2.5 py-0.5 rounded-full">
                  Courses &amp; Diplomas
                </span>
                <h4 className="text-lg font-bold mt-1">DCA, PGDCA &amp; Tally</h4>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamline course enrollments for DCA, PGDCA, ADCA, Tally Prime, and Web Development with automated fee installment tracking.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                  Instant Certification
                </span>
                <span className="text-emerald-600 font-bold">Ready</span>
              </div>
            </div>
          </div>

          {/* Card 3: Multi-Branch Administration */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-56 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Institute Administration"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600/90 px-2.5 py-0.5 rounded-full">
                  Multi-Branch ERP
                </span>
                <h4 className="text-lg font-bold mt-1">Director Control Center</h4>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                Head office directors can oversee all franchise branches, review daily fee collections, and audit expense sheets in real time.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  Multi-Branch Sync
                </span>
                <span className="text-emerald-600 font-bold">Secure</span>
              </div>
            </div>
          </div>

        </div>

        {/* Speed & Reliability Highlight Bar */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-3">
              ⚡ Lightning Fast &amp; Reliable
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Optimized for Lite Speed &amp; Instant Load Times
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              LaxmiERP loads instantly even on standard broadband or mobile 4G networks. Zero lag, zero bloat, and 100% reliable cloud uptime.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <button
              onClick={onRequestDemo}
              className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Request Free Demo
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { 
  Building2, 
  UserPlus, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  FileCheck2,
  Receipt,
  ArrowRight
} from 'lucide-react';

interface HowItWorksProps {
  onRequestDemo: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onRequestDemo }) => {
  const steps = [
    {
      step: '01',
      title: 'Step 1: Register your institute and branches',
      desc: 'Set up your institute profile, logo, branch locations, and define your academic courses (e.g., DCA, PGDCA, Tally, ADCA, Coding).',
      icon: Building2,
      tag: '5-Minute Setup'
    },
    {
      step: '02',
      title: 'Step 2: Add students, courses, staff, and fee structures',
      desc: 'Enroll students into batches, assign fee installment plans, register staff with appropriate roles, and upload initial student lists.',
      icon: UserPlus,
      tag: 'Bulk or Single Enrollment'
    },
    {
      step: '03',
      title: 'Step 3: Manage payments, receipts, reports, and daily operations in one place',
      desc: 'Accept payments, print instant PDF receipts with QR verification, monitor daily cash registers, and view pending balance reports.',
      icon: CheckCircle,
      tag: 'Autonomous Operations'
    }
  ];

  const benefits = [
    {
      title: 'No More Lost Paper Registers',
      desc: 'Say goodbye to torn paper registers and messy manual fee calculations. Every installment is logged accurately.',
      icon: FileCheck2
    },
    {
      title: 'Work on Any Device Anywhere',
      desc: 'Use your laptop in the institute office, or check daily fee collections on your mobile phone while traveling.',
      icon: Smartphone
    },
    {
      title: 'Instant Professional Trust',
      desc: 'Students and parents receive clean, branded receipts immediately, enhancing your institute’s reputation.',
      icon: Receipt
    },
    {
      title: 'Central Control for Multi-Branches',
      desc: 'Direct head office visibility into student enrollments, fee collections, and staff attendance across all locations.',
      icon: ShieldCheck
    }
  ];

  return (
    <div id="benefits" className="scroll-mt-16">
      
      {/* Benefits Sub-Section */}
      <section className="py-20 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-100/60 px-3 py-1 rounded-full border border-sky-200">
              Why Computer Institutes Choose LaxmiERP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Built to Solve Real Daily Institute Headaches
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Designed after consulting with computer academy directors, training centers, and franchise owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div 
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200">
              Simple 3-Step Onboarding
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              How LaxmiERP Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Get your entire computer academy digitalized in less than an afternoon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div 
                  key={idx}
                  className="relative bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-sky-600/30 font-mono">
                      {s.step}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                      {s.tag}
                    </span>
                  </div>

                  {/* Icon & Details */}
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white border border-sky-100 text-sky-600 flex items-center justify-center shadow-xs mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* Footer Checkmark */}
                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Quick &amp; intuitive</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prompt CTA: “Start Managing Smarter.” */}
          <div className="mt-14 text-center">
            <button
              onClick={onRequestDemo}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Managing Smarter</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  CloudLightning, 
  ShieldCheck, 
  Building2, 
  BarChart3, 
  GraduationCap, 
  Lock,
  ArrowRight,
  Printer
} from 'lucide-react';

interface FeaturesSectionProps {
  onOpenReceiptDemo: () => void;
  onRequestDemo: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenReceiptDemo,
  onRequestDemo
}) => {
  const [filter, setFilter] = useState<'all' | 'students' | 'finance' | 'admin'>('all');

  const features = [
    {
      id: 'student-mgmt',
      category: 'students',
      title: 'Student Management',
      description: 'Register students, manage student profiles, courses, batches, timing slots, attendance, and lifetime enrollment records.',
      icon: Users,
      color: 'sky',
      badge: 'Core Feature',
      highlights: ['Batch & Timing Slots', 'Photo ID & Roll Numbers', 'Course Completion Tracking']
    },
    {
      id: 'fees-mgmt',
      category: 'finance',
      title: 'Fees Management',
      description: 'Track total fees, installment schedules, paid amounts, pending dues, overdue alerts, and complete student payment logs.',
      icon: CreditCard,
      color: 'amber',
      badge: 'Smart Finance',
      highlights: ['Custom Installment Plans', 'Pending Dues Tracking', 'Cash, UPI & Bank Records']
    },
    {
      id: 'pdf-receipts',
      category: 'finance',
      title: 'Instant PDF Receipts',
      description: 'Generate and print branded, professional PDF receipts immediately after fee payment, complete with institute logo & verification QR code.',
      icon: FileText,
      color: 'purple',
      badge: 'Interactive Demo Available',
      actionText: 'Try Receipt Generator',
      onAction: onOpenReceiptDemo,
      highlights: ['Institute Branding', 'Automatic Receipt Numbering', 'One-Click Print & PDF Save']
    },
    {
      id: 'income-expense',
      category: 'finance',
      title: 'Income and Expense Management',
      description: 'Record everyday institute income, operational expenses (rent, electricity, tutor salaries, hardware maintenance), and balance sheets.',
      icon: TrendingUp,
      color: 'emerald',
      badge: 'Accounting',
      highlights: ['Expense Categorization', 'Net Profit/Loss Overview', 'Monthly Balance Reports']
    },
    {
      id: 'cloud-sync',
      category: 'admin',
      title: 'Real-Time Cloud Sync',
      description: 'Synchronize authorized data across multiple computers, laptops, and mobile devices in real time with zero manual file transfers.',
      icon: CloudLightning,
      color: 'blue',
      badge: 'Cloud Powered',
      highlights: ['Instant Sync', 'Automatic Cloud Backups', 'Zero Local Data Loss']
    },
    {
      id: 'role-permissions',
      category: 'admin',
      title: 'Role-Based Permissions',
      description: 'Granular access controls separating Admin, Branch Manager, Reception Staff, Teachers, Students, and Parents.',
      icon: ShieldCheck,
      color: 'teal',
      badge: 'Access Control',
      highlights: ['Admin Super-Access', 'Branch Manager Scope', 'Staff Restricted Views']
    },
    {
      id: 'multi-branch',
      category: 'admin',
      title: 'Multi-Branch Management',
      description: 'Manage multiple computer institute branches or franchise centers through a single unified administrative dashboard.',
      icon: Building2,
      color: 'indigo',
      badge: 'Scale Your Center',
      highlights: ['Centralized Overview', 'Branch-wise Comparison', 'Franchise Fee Audits']
    },
    {
      id: 'reports-analytics',
      category: 'finance',
      title: 'Reports and Analytics',
      description: 'Generate actionable student enrollment trends, daily fee collection totals, pending fees lists, and yearly financial summaries.',
      icon: BarChart3,
      color: 'rose',
      badge: 'Data Insights',
      highlights: ['Pending Due Reports', 'Daily Collection Register', 'Export to Excel & PDF']
    },
    {
      id: 'student-portal',
      category: 'students',
      title: 'Student and Parent Portal',
      description: 'Allow authorized students and parents to view their course schedule, syllabus progress, paid receipts, and pending fees.',
      icon: GraduationCap,
      color: 'orange',
      badge: 'Transparency',
      highlights: ['Digital Fee Receipts Access', 'Batch Timetable & Notices', 'Course Certificate Status']
    },
    {
      id: 'secure-data',
      category: 'admin',
      title: 'Secure Data Management',
      description: 'Protect confidential institute data using encrypted connections, strict server authorization, and zero unauthorized access.',
      icon: Lock,
      color: 'slate',
      badge: 'Enterprise Security',
      highlights: ['Server-Enforced Security', 'Encrypted Credentials', 'Audit Activity Trail']
    }
  ];

  const filteredFeatures = filter === 'all' 
    ? features 
    : features.filter(f => f.category === filter);

  return (
    <section id="features" className="py-20 bg-white border-b border-slate-100 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Comprehensive ERP Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered Specifically for <span className="text-sky-600">Computer Institutes</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Every tool your academy needs to eliminate paper registers, track unpaid fees effortlessly, and deliver a modern experience to students.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All 10 Modules' },
              { id: 'students', label: 'Student Management' },
              { id: 'finance', label: 'Fees & Accounting' },
              { id: 'admin', label: 'Multi-Branch & Security' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 px-2.5 py-1 rounded-full bg-white border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA if interactive */}
                {item.actionText ? (
                  <button
                    onClick={item.onAction}
                    className="mt-5 w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-sky-200 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {item.actionText}
                  </button>
                ) : (
                  <button
                    onClick={onRequestDemo}
                    className="mt-5 w-full py-2 px-3 rounded-xl text-slate-500 hover:text-sky-600 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Learn how this works</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Feature Spotlight Callout */}
        <div className="mt-12 bg-linear-to-r from-sky-600 to-blue-700 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-sky-600/20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Designed for Indian Computer Academies
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1">
              Supports DCA, PGDCA, ADCA, Tally, OSCIT &amp; Custom Diplomas
            </h3>
            <p className="text-sky-100 text-xs sm:text-sm mt-2 leading-relaxed">
              Define custom course durations, fee installments, theory vs. lab timings, and certificate issue dates with zero complexity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={onOpenReceiptDemo}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-md hover:bg-sky-50 transition-colors"
            >
              Test Receipt Generator
            </button>
            <button
              onClick={onRequestDemo}
              className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/30 transition-colors"
            >
              Book Live Demo
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

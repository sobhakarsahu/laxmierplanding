import React, { useState } from 'react';
import { 
  Cloud, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  FileText, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Users,
  CreditCard,
  Building,
  CheckCircle2,
  Lock,
  Globe2,
  Calendar,
  QrCode,
  Printer,
  ChevronRight
} from 'lucide-react';
import { ContactConfig } from '../types';

interface SpiritualBannerHeroProps {
  config: ContactConfig;
  onRequestDemo: () => void;
  onOpenReceiptDemo: () => void;
}

export const SpiritualBannerHero: React.FC<SpiritualBannerHeroProps> = ({
  config,
  onRequestDemo,
  onOpenReceiptDemo
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'fees'>('dashboard');

  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    'Hello LaxmiERP Team, I am interested in your Computer Institute Management System. Please provide details and a demo.'
  )}`;

  return (
    <section className="relative overflow-hidden pt-4 pb-16 lg:pb-24 bg-linear-to-b from-sky-50/70 via-white to-slate-50">
      
      {/* Background Decorative Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-sky-200/40 via-sky-100/10 to-transparent blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-48 -right-24 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Masterpiece Container */}
        <div className="relative rounded-3xl overflow-hidden border border-sky-200/80 shadow-2xl shadow-sky-900/10 bg-linear-to-b from-sky-500/10 via-white to-sky-50/50 mb-12">
          
          {/* Top Sacred Shlokas Bar */}
          <div className="bg-linear-to-r from-amber-700 via-orange-600 to-amber-700 text-amber-50 px-3 py-2 text-center text-xs sm:text-sm font-semibold tracking-wider border-b border-amber-500/30 shadow-xs flex flex-wrap items-center justify-around gap-2 select-none">
            <span className="font-serif tracking-wide hover:text-amber-200 transition-colors">
              || श्री गणेशाय नमः ||
            </span>
            <span className="hidden sm:inline text-amber-300/60">•</span>
            <span className="font-serif tracking-wide hover:text-amber-200 transition-colors">
              || श्री लक्ष्म्यै नमः ||
            </span>
            <span className="hidden sm:inline text-amber-300/60">•</span>
            <span className="font-serif tracking-wide hover:text-amber-200 transition-colors">
              || श्री विश्वकर्मणे नमः ||
            </span>
            <span className="hidden sm:inline text-amber-300/60">•</span>
            <span className="font-serif tracking-wide hover:text-amber-200 transition-colors">
              || बुद्धं शरणं गच्छामि ||
            </span>
          </div>

          {/* Spiritual & Technological Banner Canvas */}
          <div className="relative p-6 sm:p-10 lg:p-12 overflow-hidden bg-linear-to-b from-sky-100/60 via-sky-50/30 to-white">
            
            {/* Visual Aura & Rays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-sky-100/20 to-transparent pointer-events-none"></div>

            {/* Spiritual Guardians Header - 4 Divine Pillars */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 relative z-10">
              
              {/* 1. Lord Ganesha Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-amber-200/80 shadow-xs hover:shadow-md transition-all group text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl shadow-md shadow-orange-500/20 mb-2 group-hover:scale-110 transition-transform">
                  🕉️
                </div>
                <div className="text-[11px] font-bold text-amber-700 tracking-wider font-serif">
                  || श्री गणेशाय नमः ||
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Lord Ganesha</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  Wisdom, auspicious beginnings & obstacles removed
                </p>
                <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  Intellect & Education
                </span>
              </div>

              {/* 2. Goddess Laxmi Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-rose-200/80 shadow-xs hover:shadow-md transition-all group text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-rose-400 to-amber-500 flex items-center justify-center text-white text-xl shadow-md shadow-rose-500/20 mb-2 group-hover:scale-110 transition-transform">
                  🪷
                </div>
                <div className="text-[11px] font-bold text-rose-700 tracking-wider font-serif">
                  || श्री लक्ष्म्यै नमः ||
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Goddess Laxmi</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  Prosperity, institute growth & fee collection
                </p>
                <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                  Prosperity & Success
                </span>
              </div>

              {/* 3. Lord Vishwakarma Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-sky-200/80 shadow-xs hover:shadow-md transition-all group text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-md shadow-sky-500/20 mb-2 group-hover:scale-110 transition-transform">
                  ⚙️
                </div>
                <div className="text-[11px] font-bold text-sky-700 tracking-wider font-serif">
                  || श्री विश्वकर्मणे नमः ||
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Lord Vishwakarma</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  Divine master architect of engineering & computers
                </p>
                <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                  Technology & Tools
                </span>
              </div>

              {/* 4. Gautam Buddha Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all group text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl shadow-md shadow-emerald-500/20 mb-2 group-hover:scale-110 transition-transform">
                  ☸️
                </div>
                <div className="text-[11px] font-bold text-emerald-700 tracking-wider font-serif">
                  || बुद्धं शरणं गच्छामि ||
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Gautam Buddha</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                  Mindfulness, supreme knowledge & peace of mind
                </p>
                <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Focus & Enlightenment
                </span>
              </div>

            </div>

            {/* Central Brand Identity & Headline */}
            <div className="text-center max-w-4xl mx-auto mb-10 relative z-10">
              
              {/* Cloud Logo + laxmierp.com Brand Heading */}
              <div className="inline-flex flex-col items-center justify-center mb-3">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="relative w-12 h-12 rounded-2xl bg-linear-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
                    <Cloud className="w-7 h-7" />
                    <span className="absolute text-xs font-black text-amber-300">⇅</span>
                  </div>
                </div>

                <div className="relative inline-block">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-sans">
                    laxmi<span className="text-sky-600">erp</span>
                    <span className="text-orange-500">.com</span>
                  </h2>
                  {/* The Signature Orange Curved Swoosh */}
                  <div className="w-full flex justify-center -mt-1">
                    <svg className="w-48 sm:w-64 h-4 text-orange-500" viewBox="0 0 250 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14C55 21 170 21 246 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      <path d="M236 1.5L247 4.5L240 12" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-base sm:text-xl font-bold text-slate-700 tracking-tight mb-2">
                Empowering Digital Education &amp; Smart Computer Institute Management System
              </p>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 leading-tight">
                Manage Your Computer Institute Smarter with <span className="text-sky-600">LaxmiERP</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
                Manage students, fees, staff, branches, income, and expenses from one simple, secure, cloud-based platform.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
                <button
                  onClick={onRequestDemo}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-linear-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-5 h-5" />
                  Request a Free Demo
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  Contact Us on WhatsApp
                </a>
              </div>

              {/* Strict Trust Statement (no fake stats per guidelines) */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>One platform for smarter institute management.</span>
              </div>
            </div>

            {/* Live Interactive Mockups: Laptop ERP Screen + Mobile Fee Receipt */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-6xl mx-auto my-8 relative z-10">
              
              {/* Laptop Screen Mockup (8 Cols) */}
              <div className="lg:col-span-8 bg-slate-900 rounded-2xl p-2.5 sm:p-3 shadow-2xl border-4 border-slate-700/80">
                {/* Laptop Camera dot */}
                <div className="w-2 h-2 rounded-full bg-slate-600 mx-auto mb-2"></div>
                
                {/* Screen Container */}
                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 text-slate-800 font-sans text-xs">
                  
                  {/* ERP Header Bar */}
                  <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sky-700">laxmierp.com</span>
                      <span className="text-slate-300">/</span>
                      <span className="font-semibold text-slate-600 capitalize">{activeTab}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-700 font-medium text-[10px]">
                        OSCIT Academy - Branch 01
                      </span>
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                        Admin
                      </div>
                    </div>
                  </div>

                  {/* ERP Body: Sidebar + Main Stats */}
                  <div className="grid grid-cols-12 min-h-65">
                    
                    {/* Mini Sidebar */}
                    <div className="col-span-3 bg-slate-900 text-slate-300 p-2.5 flex flex-col justify-between">
                      <div className="space-y-1">
                        <button
                          onClick={() => setActiveTab('dashboard')}
                          className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                            activeTab === 'dashboard' ? 'bg-sky-600 text-white' : 'hover:bg-slate-800'
                          }`}
                        >
                          <TrendingUp className="w-3 h-3" /> Dashboard
                        </button>
                        <button
                          onClick={() => setActiveTab('students')}
                          className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                            activeTab === 'students' ? 'bg-sky-600 text-white' : 'hover:bg-slate-800'
                          }`}
                        >
                          <Users className="w-3 h-3" /> Students
                        </button>
                        <button
                          onClick={() => setActiveTab('fees')}
                          className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                            activeTab === 'fees' ? 'bg-sky-600 text-white' : 'hover:bg-slate-800'
                          }`}
                        >
                          <CreditCard className="w-3 h-3" /> Fees Management
                        </button>
                        <div className="px-2 py-1.5 text-[10px] text-slate-400">
                          Income &amp; Expense
                        </div>
                        <div className="px-2 py-1.5 text-[10px] text-slate-400">
                          Reports &amp; PDF
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[9px] text-slate-400">
                        Cloud Sync: <span className="text-emerald-400 font-semibold">Live ●</span>
                      </div>
                    </div>

                    {/* Dashboard Workspace */}
                    <div className="col-span-9 p-3 sm:p-4 bg-slate-100/70 space-y-3">
                      
                      {/* Exact 3 Metric Cards as in Promotional Banner */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* 1. Total Students */}
                        <div className="bg-sky-500 text-white rounded-xl p-2.5 shadow-xs">
                          <div className="flex items-center justify-between text-[10px] opacity-90">
                            <span>Total Students</span>
                            <Users className="w-3 h-3" />
                          </div>
                          <div className="text-lg sm:text-xl font-black mt-1">1,250</div>
                          <div className="text-[9px] opacity-80">Enrolled active</div>
                        </div>

                        {/* 2. Paid Fees */}
                        <div className="bg-emerald-600 text-white rounded-xl p-2.5 shadow-xs">
                          <div className="flex items-center justify-between text-[10px] opacity-90">
                            <span>Paid Fees</span>
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <div className="text-lg sm:text-xl font-black mt-1">1,120</div>
                          <div className="text-[9px] opacity-80">Completed clear</div>
                        </div>

                        {/* 3. Pending Fees */}
                        <div className="bg-orange-500 text-white rounded-xl p-2.5 shadow-xs">
                          <div className="flex items-center justify-between text-[10px] opacity-90">
                            <span>Pending Fees</span>
                            <CreditCard className="w-3 h-3" />
                          </div>
                          <div className="text-lg sm:text-xl font-black mt-1">130</div>
                          <div className="text-[9px] opacity-80">Installment due</div>
                        </div>
                      </div>

                      {/* Fee Collection Overview Bar Graph */}
                      <div className="bg-white rounded-xl p-2.5 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-700 text-[11px]">Fee Collection Overview</span>
                          <span className="text-[10px] font-semibold text-emerald-600">₹ 8,45,000 this month</span>
                        </div>
                        {/* Visual graph bars */}
                        <div className="flex items-end justify-between h-16 gap-1 px-1 pt-2">
                          {[
                            { m: 'Jan', h: '45%' },
                            { m: 'Feb', h: '60%' },
                            { m: 'Mar', h: '75%' },
                            { m: 'Apr', h: '90%' },
                            { m: 'May', h: '65%' },
                            { m: 'Jun', h: '85%' },
                            { m: 'Jul', h: '95%' },
                          ].map((bar, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div 
                                style={{ height: bar.h }} 
                                className="w-full bg-linear-to-t from-sky-600 to-sky-400 rounded-t-xs"
                              ></div>
                              <span className="text-[8px] text-slate-400">{bar.m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent Activities */}
                      <div className="bg-white rounded-xl p-2 border border-slate-200 flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-medium text-slate-700">Fee Paid — Rahul Sahu (OSCIT A+)</span>
                        </div>
                        <span className="text-emerald-600 font-bold">₹ 2,500</span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

              {/* Mobile Phone Mockup: Fee Receipt (4 Cols) */}
              <div className="lg:col-span-4 max-w-xs mx-auto w-full">
                <div className="bg-slate-900 rounded-3xl p-3 shadow-2xl border-4 border-slate-700 relative">
                  
                  {/* Phone Speaker & Camera */}
                  <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  </div>

                  {/* Receipt Screen */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-inner font-sans text-xs">
                    
                    {/* Header */}
                    <div className="text-center pb-2 border-b border-dashed border-slate-200">
                      <div className="font-bold text-sky-700 text-sm">laxmierp.com</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-800 mt-0.5">
                        FEE RECEIPT
                      </div>
                    </div>

                    {/* Receipt Details matching the banner! */}
                    <div className="py-2.5 space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Receipt No</span>
                        <span className="font-semibold text-slate-800">LXP9025001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Student Name</span>
                        <span className="font-semibold text-slate-800">Rahul Sahu</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Course</span>
                        <span className="font-semibold text-slate-800">OSCIT A+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Amount</span>
                        <span className="font-bold text-emerald-600 text-xs">₹ 2,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date</span>
                        <span className="font-semibold text-slate-800">28 Apr 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Mode</span>
                        <span className="font-semibold text-slate-800">UPI / QR</span>
                      </div>
                    </div>

                    {/* QR Code and Slogan */}
                    <div className="pt-2 border-t border-dashed border-slate-200 text-center flex flex-col items-center">
                      <div className="p-1.5 bg-slate-50 rounded-lg border border-slate-200 mb-1">
                        <QrCode className="w-12 h-12 text-slate-800" />
                      </div>
                      <span className="text-[10px] font-bold text-sky-700">Thank You!</span>
                      <span className="text-[8px] text-slate-400">Verified by LaxmiERP Digital System</span>
                    </div>

                    {/* Try Button */}
                    <button
                      onClick={onOpenReceiptDemo}
                      className="w-full mt-2.5 py-1.5 px-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[10px] flex items-center justify-center gap-1 border border-sky-200 transition-colors"
                    >
                      <Printer className="w-3 h-3" />
                      Generate Sample Receipt
                    </button>

                  </div>
                </div>
              </div>

            </div>

            {/* Three Circular Feature Highlights as featured on the banner! */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto my-8 relative z-10">
              
              {/* 1. Real-Time Cloud Sync */}
              <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    Real-Time Cloud Sync
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Access and update data across all branches in real time from any browser or phone.
                  </p>
                </div>
              </div>

              {/* 2. Role-Based Permissions */}
              <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    Role-Based Permissions
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Secure access for Admin, Branch Manager, Staff, Students, and Parents.
                  </p>
                </div>
              </div>

              {/* 3. Instant PDF Receipts */}
              <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/20">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    Instant PDF Receipts
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Generate and print professional fee receipts immediately after payments.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Dark Navy Bar directly from the banner! */}
          <div className="bg-slate-950 text-slate-200 px-4 sm:px-8 py-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-400" />
                Student Management
              </span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                Fees Management
              </span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Income &amp; Expense
              </span>
              <span className="text-slate-700 hidden md:inline">|</span>
              <span className="hidden md:flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                Secure &amp; Reliable
              </span>
              <span className="text-slate-700 hidden lg:inline">|</span>
              <span className="hidden lg:flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                Anywhere • Anytime • Any Device
              </span>
            </div>

            {/* Slogan in golden script */}
            <div className="text-sm font-bold text-amber-300 italic tracking-wide">
              Learn Today, Build Tomorrow
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

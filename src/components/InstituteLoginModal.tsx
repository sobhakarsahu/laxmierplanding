import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  GraduationCap, 
  Users, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  FileText,
  Calendar,
  TrendingUp,
  BookOpen,
  LogOut,
  QrCode
} from 'lucide-react';

interface InstituteLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenManagement: () => void;
}

export const InstituteLoginModal: React.FC<InstituteLoginModalProps> = ({
  isOpen,
  onClose,
  onOpenManagement,
}) => {
  const [role, setRole] = useState<'director' | 'staff' | 'student'>('director');
  const [instituteCode, setInstituteCode] = useState('OSCIT-001');
  const [userId, setUserId] = useState('director@laxmierp.com');
  const [password, setPassword] = useState('••••••••');
  const [loggedInRole, setLoggedInRole] = useState<'director' | 'staff' | 'student' | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'fees' | 'attendance'>('overview');

  if (!isOpen) return null;

  const handleRoleChange = (newRole: 'director' | 'staff' | 'student') => {
    setRole(newRole);
    setLoggedInRole(null);
    if (newRole === 'director') {
      setInstituteCode('OSCIT-001');
      setUserId('director@laxmierp.com');
    } else if (newRole === 'staff') {
      setInstituteCode('OSCIT-001');
      setUserId('tutor.deepak@laxmierp.com');
    } else {
      setInstituteCode('OSCIT-001');
      setUserId('rahul.sahu.2025');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedInRole(role);
    setActiveTab('overview');
  };

  const handleLogout = () => {
    setLoggedInRole(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className={`relative w-full ${loggedInRole ? 'max-w-4xl' : 'max-w-lg'} bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-6 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200`}>
        
        {/* Header */}
        <div className="bg-linear-to-r from-sky-700 via-blue-700 to-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <LogIn className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">LaxmiERP Institute Portal Login</h3>
              <p className="text-xs text-sky-200">
                {loggedInRole ? `Active Session (${loggedInRole.toUpperCase()})` : 'Cloud access for Academy Directors, Staff & Students'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {loggedInRole && (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-rose-950/60 border border-rose-800 text-rose-200 text-xs font-semibold flex items-center gap-1 hover:bg-rose-900/60 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-50">
          
          {loggedInRole ? (
            
            /* LOGGED IN ERP DASHBOARD EXPERIENCE */
            <div className="space-y-6">
              
              {/* User Session Banner */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                    {loggedInRole === 'director' ? '🏢' : loggedInRole === 'staff' ? '👨‍🏫' : '🎓'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      OSCIT Computer Academy — Branch 01
                    </h4>
                    <p className="text-xs text-slate-500">
                      Logged in as <strong className="text-slate-800 capitalize">{loggedInRole}</strong> ({userId})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Cloud Sync Active
                  </span>
                </div>
              </div>

              {/* Subnav Tabs */}
              <div className="flex flex-wrap gap-2 bg-slate-200/80 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'overview' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dashboard Overview
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'students' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Students Roster
                </button>
                <button
                  onClick={() => setActiveTab('fees')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'fees' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fee Collections &amp; Receipts
                </button>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'attendance' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Batch Timetable &amp; Attendance
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-sky-600 text-white p-4 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-center text-xs opacity-90">
                        <span>Total Active Students</span>
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-2xl font-black mt-2">1,250</div>
                      <div className="text-[10px] opacity-80 mt-1">Across 3 computer labs</div>
                    </div>

                    <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-center text-xs opacity-90">
                        <span>Fees Collected (April)</span>
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div className="text-2xl font-black mt-2">₹ 8,45,000</div>
                      <div className="text-[10px] opacity-80 mt-1">1,120 receipts generated</div>
                    </div>

                    <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-sm">
                      <div className="flex justify-between items-center text-xs opacity-90">
                        <span>Pending Dues</span>
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div className="text-2xl font-black mt-2">130 Students</div>
                      <div className="text-[10px] opacity-80 mt-1">Installment notices sent</div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <h5 className="font-bold text-slate-900 text-sm mb-3">Recent Institute Activities &amp; Sync</h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-medium text-slate-700">Fee Paid — Rahul Sahu (OSCIT A+)</span>
                        <span className="text-emerald-600 font-bold">₹ 2,500 (UPI QR)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-medium text-slate-700">New Student Registered — Pooja Sharma (DCA)</span>
                        <span className="text-sky-600 font-bold">Batch 02 (Morning)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-medium text-slate-700">Daily Attendance Logged — Tally Prime Lab</span>
                        <span className="text-slate-600 font-bold">42 / 45 Present</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Students */}
              {activeTab === 'students' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-slate-900 text-sm">Student Enrollment Roster</h5>
                    <span className="text-xs bg-sky-50 text-sky-700 px-3 py-1 rounded-full font-semibold">Showing Active Batches</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { name: 'Rahul Sahu', course: 'OSCIT A+', batch: 'Morning 8 AM', dues: '₹ 2,500', status: 'Paid' },
                      { name: 'Pooja Sharma', course: 'DCA (Diploma)', batch: 'Morning 10 AM', dues: '₹ 0', status: 'Paid' },
                      { name: 'Amit Kumar Verma', course: 'PGDCA', batch: 'Evening 4 PM', dues: '₹ 4,000', status: 'Pending Due' },
                      { name: 'Sneha Patel', course: 'Tally Prime with GST', batch: 'Afternoon 1 PM', dues: '₹ 0', status: 'Paid' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <div>
                          <div className="font-bold text-slate-900">{s.name}</div>
                          <div className="text-slate-500 text-[11px]">{s.course} • {s.batch}</div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${s.status === 'Paid' ? 'text-emerald-600' : 'text-orange-600'}`}>
                            {s.status} ({s.dues})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Fees */}
              {activeTab === 'fees' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h5 className="font-bold text-slate-900 text-sm">Instant Fee Receipts &amp; Installments</h5>
                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sky-900 text-xs">Sample Receipt No: LXP9025001</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">Student: Rahul Sahu | Course: OSCIT A+ | Paid: ₹ 2,500</div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        window.dispatchEvent(new CustomEvent('open-receipt-demo'));
                      }}
                      className="px-4 py-2 bg-sky-600 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-sky-700"
                    >
                      Print Receipt PDF
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 4: Attendance */}
              {activeTab === 'attendance' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h5 className="font-bold text-slate-900 text-sm">Computer Lab &amp; Theory Timetable</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-800">Batch 01: DCA &amp; PGDCA Theory</div>
                      <div className="text-slate-500 mt-1">Time: 08:00 AM – 10:00 AM</div>
                      <div className="text-emerald-600 font-semibold mt-1">Status: Active (45 Students)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-800">Batch 02: Practical Computer Lab</div>
                      <div className="text-slate-500 mt-1">Time: 10:30 AM – 01:00 PM</div>
                      <div className="text-emerald-600 font-semibold mt-1">Status: Active (30 Terminals)</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Close Portal
                </button>
              </div>

            </div>
          ) : (
            
            /* LOGIN FORM VIEW */
            <div>
              {/* Role Select Tabs */}
              <div className="flex p-1 bg-slate-100 rounded-2xl mb-5">
                <button
                  type="button"
                  onClick={() => handleRoleChange('director')}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    role === 'director'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Director</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('staff')}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    role === 'staff'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Staff / Faculty</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    role === 'student'
                      ? 'bg-white text-sky-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institute Code
                  </label>
                  <input
                    type="text"
                    required
                    value={instituteCode}
                    onChange={e => setInstituteCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-mono"
                    placeholder="e.g. OSCIT-001"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {role === 'student' ? 'Roll No / Student ID' : 'Username or Email'}
                  </label>
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl text-white font-bold text-sm bg-linear-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Log in to {role.toUpperCase()} Portal</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center pt-1">
                  * Pre-filled with demo credentials for instant live testing.
                </p>
              </form>

              {/* Direct Management Link */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Looking for review moderation &amp; inquiries?</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenManagement();
                  }}
                  className="font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                >
                  <span>Open Management Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

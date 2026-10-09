import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle, 
  QrCode, 
  Sparkles, 
  RefreshCw,
  Building,
  User,
  CreditCard,
  FileText
} from 'lucide-react';
import { FeeReceiptData } from '../types';

interface ReceiptDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptDemoModal: React.FC<ReceiptDemoModalProps> = ({ isOpen, onClose }) => {
  const [receipt, setReceipt] = useState<FeeReceiptData>({
    receiptNo: 'LXP9025001',
    studentName: 'Rahul Sahu',
    rollNo: 'OSCIT-2025-042',
    course: 'OSCIT A+ Computer Diploma',
    amount: 2500,
    paymentMode: 'UPI / QR',
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    instituteName: 'Shree Laxmi Computer Academy',
    instituteAddress: 'Plot 42, Main Road, Station Square',
    phone: '+91-9876543210',
    totalCourseFee: 7500,
    paidSoFar: 2500,
    pendingBalance: 5000,
  });

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateRandomReceipt = () => {
    const randomNo = 'LXP' + Math.floor(1000000 + Math.random() * 9000000);
    const students = ['Pooja Sharma', 'Amit Kumar Verma', 'Sneha Patel', 'Rahul Sahu', 'Vikram Das'];
    const courses = ['DCA (Diploma in Computer Applications)', 'PGDCA', 'ADCA Professional', 'Tally Prime with GST', 'Python & Web Development', 'OSCIT A+'];
    const pickedStudent = students[Math.floor(Math.random() * students.length)];
    const pickedCourse = courses[Math.floor(Math.random() * courses.length)];
    const fee = Math.floor(15 + Math.random() * 35) * 100;
    const total = fee * 3;

    setReceipt(prev => ({
      ...prev,
      receiptNo: randomNo,
      studentName: pickedStudent,
      course: pickedCourse,
      amount: fee,
      totalCourseFee: total,
      paidSoFar: fee,
      pendingBalance: total - fee
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-sky-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-sky-700 via-blue-700 to-slate-900 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/30 flex items-center justify-center border border-sky-300/30">
              <FileText className="w-4 h-4 text-sky-200" />
            </div>
            <div>
              <h3 className="text-base font-bold">Instant PDF Receipt Generator</h3>
              <p className="text-[11px] text-sky-200">Interactive live preview — As shown on LaxmiERP promotional banner</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={generateRandomReceipt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              title="Generate new sample receipt"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Randomize</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50">
          
          {/* Controls Column (5 cols) */}
          <div className="md:col-span-5 space-y-4 no-print bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Customize Receipt Fields
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Computer Institute Name
              </label>
              <input
                type="text"
                value={receipt.instituteName}
                onChange={e => setReceipt({ ...receipt, instituteName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={receipt.studentName}
                  onChange={e => setReceipt({ ...receipt, studentName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Receipt No
                </label>
                <input
                  type="text"
                  value={receipt.receiptNo}
                  onChange={e => setReceipt({ ...receipt, receiptNo: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Course Enrolled
              </label>
              <select
                value={receipt.course}
                onChange={e => setReceipt({ ...receipt, course: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white font-medium"
              >
                <option value="OSCIT A+ Computer Diploma">OSCIT A+ Computer Diploma</option>
                <option value="DCA (Diploma in Computer Applications)">DCA (Diploma in Computer Applications)</option>
                <option value="PGDCA (Post Graduate Diploma)">PGDCA (Post Graduate Diploma)</option>
                <option value="ADCA (Advance Diploma in Computer)">ADCA (Advance Diploma in Computer)</option>
                <option value="Tally Prime with GST & E-Way">Tally Prime with GST &amp; E-Way</option>
                <option value="Full Stack Web Development">Full Stack Web Development</option>
                <option value="Python & AI Basics">Python &amp; AI Basics</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Paid Amount (₹)
                </label>
                <input
                  type="number"
                  value={receipt.amount}
                  onChange={e => setReceipt({ ...receipt, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-bold text-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Mode
                </label>
                <select
                  value={receipt.paymentMode}
                  onChange={e => setReceipt({ ...receipt, paymentMode: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white font-medium"
                >
                  <option value="UPI / QR">UPI / QR</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/20 transition-all"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              * Click Print to save as PDF or print on any regular printer or thermal receipt roll.
            </p>
          </div>

          {/* Receipt Printable View (7 cols) */}
          <div className="md:col-span-7 flex justify-center items-start">
            <div 
              id="printable-receipt"
              className="w-full max-w-sm bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-md font-sans text-xs relative"
            >
              {/* Brand Header */}
              <div className="text-center pb-3 border-b-2 border-slate-800">
                <div className="flex items-center justify-center gap-1.5 text-sky-700 font-black text-lg">
                  <span>laxmi<span className="text-slate-900">erp</span>.com</span>
                </div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5 uppercase tracking-wide">
                  {receipt.instituteName}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {receipt.instituteAddress} • Ph: {receipt.phone}
                </div>
                <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest">
                  OFFICIAL FEE RECEIPT
                </div>
              </div>

              {/* Receipt Meta */}
              <div className="py-3 border-b border-dashed border-slate-300 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Receipt No:</span>
                  <span className="font-bold text-slate-900 font-mono">{receipt.receiptNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Date:</span>
                  <span className="font-semibold text-slate-800">{receipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Student Name:</span>
                  <span className="font-bold text-slate-900">{receipt.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Course:</span>
                  <span className="font-semibold text-slate-800 text-right max-w-44 truncate">{receipt.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Payment Mode:</span>
                  <span className="font-semibold text-slate-800">{receipt.paymentMode}</span>
                </div>
              </div>

              {/* Amount Box */}
              <div className="my-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Amount Received
                </div>
                <div className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
                  ₹ {receipt.amount.toLocaleString('en-IN')}
                </div>
                <div className="text-[9px] text-emerald-600 mt-0.5">
                  Authorized digital transaction
                </div>
              </div>

              {/* Balance Summary */}
              <div className="py-2 border-t border-dashed border-slate-300 space-y-1 text-[10px]">
                <div className="flex justify-between text-slate-600">
                  <span>Total Course Fee:</span>
                  <span>₹ {receipt.totalCourseFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Paid So Far:</span>
                  <span className="font-bold text-slate-900">₹ {receipt.paidSoFar.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pending Balance:</span>
                  <span className="font-bold text-orange-600">₹ {receipt.pendingBalance.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* QR Verification & Slogan Footer */}
              <div className="pt-3 border-t-2 border-slate-800 text-center flex flex-col items-center">
                <div className="p-1 bg-white rounded border border-slate-300 mb-1">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <span className="text-[11px] font-bold text-sky-800">Thank You!</span>
                <span className="text-[9px] text-slate-500 italic mt-0.5">
                  “Learn Today, Build Tomorrow.”
                </span>
                <span className="text-[8px] text-slate-400 mt-1">
                  Powered by LaxmiERP Cloud Management System
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

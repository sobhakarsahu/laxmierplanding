import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Menu, 
  X, 
  LogIn, 
  Sparkles, 
  PhoneCall, 
  FileText,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenReceiptDemo: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenLogin, 
  onOpenReceiptDemo,
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'Benefits', id: 'benefits' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Client Reviews', id: 'reviews' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-sky-100 py-2.5' 
        : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Area */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-sky-500 to-blue-700 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Cloud className="w-6 h-6 stroke-[2.2]" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-black text-amber-300 tracking-tighter">⇅</span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  laxmi<span className="text-sky-600">erp</span>
                </span>
                <span className="text-sm font-bold text-orange-500 ml-0.5">.com</span>
              </div>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="w-5 h-0.5 bg-orange-400 rounded-full"></span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest hidden sm:inline">
                  Smart Institute ERP
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenReceiptDemo}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors"
              title="Test Instant PDF Receipt Generator"
            >
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              Receipt Generator
            </button>

            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-500" />
              Login
            </button>

            <button
              onClick={() => handleLinkClick('demo')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              Get a Free Demo
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => handleLinkClick('demo')}
              className="px-3 py-1.5 text-xs font-bold text-white bg-orange-500 rounded-lg shadow-sm"
            >
              Free Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {link.name}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReceiptDemo();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-sky-50 text-sky-700 font-semibold text-sm border border-sky-200"
              >
                <FileText className="w-4 h-4 text-sky-600" />
                Try Instant PDF Receipt Generator
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200"
              >
                <LogIn className="w-4 h-4 text-slate-600" />
                Institute Cloud Login
              </button>

              <button
                onClick={() => handleLinkClick('demo')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-500/25"
              >
                <Sparkles className="w-4 h-4" />
                Request a Free Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

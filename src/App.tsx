import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SpiritualBannerHero } from './components/SpiritualBannerHero';
import { FeaturesSection } from './components/FeaturesSection';
import { InstituteShowcase } from './components/InstituteShowcase';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ReviewsSection } from './components/ReviewsSection';
import { DemoRequestSection } from './components/DemoRequestSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ReceiptDemoModal } from './components/ReceiptDemoModal';
import { AdminPortal } from './components/AdminPortal';
import { InstituteLoginModal } from './components/InstituteLoginModal';
import { PrivacyPolicyModal, TermsModal, QuickConfigModal } from './components/LegalModals';
import { StorageService } from './services/storage';
import { ContactConfig } from './types';
import { AlertTriangle, Home } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<ContactConfig>(StorageService.getConfig());
  const [isInstituteLoginOpen, setIsInstituteLoginOpen] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [isReceiptDemoOpen, setIsReceiptDemoOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [is404, setIs404] = useState(false);

  // Sync config
  const updateConfig = () => {
    setConfig(StorageService.getConfig());
  };

  // Check URL hash for direct routing or 404 testing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === '404') {
        setIs404(true);
      } else if (hash) {
        setIs404(false);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setIs404(false);
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (is404) {
      setIs404(false);
      window.location.hash = '';
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 404 View
  if (is404) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-black text-slate-900">404 — Page Not Found</h1>
        <p className="text-slate-600 max-w-md mt-2 text-sm">
          The requested page could not be located on laxmierp.com. You can navigate back to the home page or contact our team for assistance.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              setIs404(false);
              window.location.hash = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-sm hover:bg-sky-700 shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Sticky Top Navigation */}
      <Navbar
        onOpenLogin={() => setIsInstituteLoginOpen(true)}
        onOpenReceiptDemo={() => setIsReceiptDemoOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section with Spiritual-Technology Banner Masterpiece */}
        <div id="home">
          <SpiritualBannerHero
            config={config}
            onRequestDemo={() => handleNavigate('demo')}
            onOpenReceiptDemo={() => setIsReceiptDemoOpen(true)}
          />
        </div>

        {/* 10 Core ERP Features Grid */}
        <FeaturesSection
          onOpenReceiptDemo={() => setIsReceiptDemoOpen(true)}
          onRequestDemo={() => handleNavigate('demo')}
        />

        {/* Professional Institute Showcase with High-End Photography */}
        <InstituteShowcase
          onRequestDemo={() => handleNavigate('demo')}
        />

        {/* Benefits & Simple 3-Step Process */}
        <HowItWorksSection
          onRequestDemo={() => handleNavigate('demo')}
        />

        {/* Client Reviews Section with Zero-Fake Testimonial Policy & Direct Moderation */}
        <ReviewsSection
          onOpenAdmin={() => setIsManagementOpen(true)}
        />

        {/* Dedicated Free Demo Request Form */}
        <DemoRequestSection />

        {/* Functional Contact Us Form & Direct Support Links */}
        <ContactSection
          config={config}
          onOpenConfigModal={() => setIsConfigOpen(true)}
        />

      </main>

      {/* Comprehensive Footer */}
      <Footer
        config={config}
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenLogin={() => setIsInstituteLoginOpen(true)}
        onOpenManagement={() => setIsManagementOpen(true)}
        onOpenReceiptDemo={() => setIsReceiptDemoOpen(true)}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      {/* Persistent Floating WhatsApp and Call Action Buttons */}
      <FloatingActions
        config={config}
        onOpenConfig={() => setIsConfigOpen(true)}
        onRequestDemo={() => handleNavigate('demo')}
      />

      {/* Interactive PDF Receipt Generator Simulator */}
      <ReceiptDemoModal
        isOpen={isReceiptDemoOpen}
        onClose={() => setIsReceiptDemoOpen(false)}
      />

      {/* Institute Portal Login Modal (Student, Faculty & Director access) */}
      <InstituteLoginModal
        isOpen={isInstituteLoginOpen}
        onClose={() => setIsInstituteLoginOpen(false)}
        onOpenManagement={() => {
          setIsInstituteLoginOpen(false);
          setIsManagementOpen(true);
        }}
      />

      {/* Direct Management & Moderation Portal (No login gate) */}
      <AdminPortal
        isOpen={isManagementOpen}
        onClose={() => setIsManagementOpen(false)}
        onConfigUpdated={updateConfig}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* Quick Verified Phone Configuration Modal */}
      <QuickConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onSaved={updateConfig}
      />

    </div>
  );
}

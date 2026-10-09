import { Inquiry, DemoRequest, Review, ContactConfig } from '../types';

const STORAGE_KEYS = {
  INQUIRIES: 'laxmierp_inquiries_v1',
  DEMO_REQUESTS: 'laxmierp_demos_v1',
  REVIEWS: 'laxmierp_reviews_v1',
  CONFIG: 'laxmierp_config_v1',
  ADMIN_TOKEN: 'laxmierp_admin_auth_v1',
};

// Default placeholder contact config
const DEFAULT_CONFIG: ContactConfig = {
  phone: import.meta.env.VITE_CONTACT_PHONE || '+919876543210',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210',
  isConfigured: false, // Flag indicating this is a placeholder awaiting verified number
};

export const StorageService = {
  // Configuration
  getConfig(): ContactConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  },

  saveConfig(newConfig: Partial<ContactConfig>): ContactConfig {
    const current = this.getConfig();
    const updated = { ...current, ...newConfig, isConfigured: true };
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
    return updated;
  },

  // Inquiries
  getInquiries(): Inquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [];
  },

  async addInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>, honeyPot?: string): Promise<{ success: boolean; error?: string }> {
    // Spam check
    if (honeyPot && honeyPot.trim() !== '') {
      return { success: false, error: 'Spam detected' };
    }

    if (!inquiryData.fullName || inquiryData.fullName.length < 2) {
      return { success: false, error: 'Please enter a valid full name' };
    }
    if (!inquiryData.instituteName || inquiryData.instituteName.length < 2) {
      return { success: false, error: 'Please enter your institute name' };
    }
    if (!inquiryData.mobileNumber || inquiryData.mobileNumber.replace(/\D/g, '').length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number' };
    }
    if (!inquiryData.message || inquiryData.message.trim().length < 5) {
      return { success: false, error: 'Please describe your inquiry or requirements' };
    }
    if (!inquiryData.consent) {
      return { success: false, error: 'Please accept consent to process your inquiry' };
    }

    const newInquiry: Inquiry = {
      ...inquiryData,
      id: 'INQ-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // Try server post if available
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
      }).catch(() => null);
    } catch {
      // ignore network errors if running in standalone client mode
    }

    // Always persist to client storage
    const current = this.getInquiries();
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([newInquiry, ...current]));
    return { success: true };
  },

  updateInquiryStatus(id: string, status: Inquiry['status']) {
    const list = this.getInquiries();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  },

  // Demo Requests
  getDemoRequests(): DemoRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEMO_REQUESTS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [];
  },

  async addDemoRequest(demoData: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>, honeyPot?: string): Promise<{ success: boolean; error?: string }> {
    if (honeyPot && honeyPot.trim() !== '') {
      return { success: false, error: 'Spam detected' };
    }

    if (!demoData.name || demoData.name.length < 2) {
      return { success: false, error: 'Please enter your name' };
    }
    if (!demoData.instituteName || demoData.instituteName.length < 2) {
      return { success: false, error: 'Please enter your institute name' };
    }
    if (!demoData.phoneNumber || demoData.phoneNumber.replace(/\D/g, '').length < 10) {
      return { success: false, error: 'Please enter a valid contact phone number' };
    }

    const newDemo: DemoRequest = {
      ...demoData,
      id: 'DEMO-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    try {
      await fetch('/api/demo-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDemo),
      }).catch(() => null);
    } catch {
      // ignore
    }

    const current = this.getDemoRequests();
    localStorage.setItem(STORAGE_KEYS.DEMO_REQUESTS, JSON.stringify([newDemo, ...current]));
    return { success: true };
  },

  updateDemoStatus(id: string, status: DemoRequest['status']) {
    const list = this.getDemoRequests();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem(STORAGE_KEYS.DEMO_REQUESTS, JSON.stringify(updated));
  },

  // Reviews & Moderation
  // Strictly no fake customer reviews are hardcoded!
  getReviews(): Review[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [];
  },

  getApprovedReviews(): Review[] {
    return this.getReviews().filter(r => r.status === 'approved');
  },

  async addReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'status'>, honeyPot?: string): Promise<{ success: boolean; error?: string }> {
    if (honeyPot && honeyPot.trim() !== '') {
      return { success: false, error: 'Spam detected' };
    }

    if (!reviewData.fullName || reviewData.fullName.length < 2) {
      return { success: false, error: 'Please enter your full name' };
    }
    if (!reviewData.instituteName || reviewData.instituteName.length < 2) {
      return { success: false, error: 'Please enter your computer institute name' };
    }
    if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
      return { success: false, error: 'Please select a star rating from 1 to 5' };
    }
    if (!reviewData.reviewText || reviewData.reviewText.trim().length < 10) {
      return { success: false, error: 'Please provide a helpful review of at least 10 characters' };
    }
    if (!reviewData.consent) {
      return { success: false, error: 'Please accept consent allowing publication of this review upon approval' };
    }

    const newReview: Review = {
      ...reviewData,
      id: 'REV-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      status: 'pending', // Pending approval by administrator
    };

    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      }).catch(() => null);
    } catch {
      // ignore
    }

    const current = this.getReviews();
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify([newReview, ...current]));
    return { success: true };
  },

  setReviewStatus(id: string, status: Review['status']) {
    const list = this.getReviews();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
  },

  deleteReview(id: string) {
    const list = this.getReviews();
    const updated = list.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
  },

  updateReview(id: string, partial: Partial<Review>) {
    const list = this.getReviews();
    const updated = list.map(item => item.id === id ? { ...item, ...partial } : item);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(updated));
  },

  // Admin management access
  isAdminLoggedIn(): boolean {
    return true;
  },
};

export interface Inquiry {
  id: string;
  fullName: string;
  instituteName: string;
  mobileNumber: string;
  email?: string;
  districtState?: string;
  branches?: string;
  interestedService: string;
  message: string;
  consent: boolean;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface DemoRequest {
  id: string;
  name: string;
  instituteName: string;
  phoneNumber: string;
  preferredMethod: 'WhatsApp' | 'Phone Call' | 'Google Meet' | 'Email';
  branches: '1 Branch' | '2-3 Branches' | '4-10 Branches' | '10+ Branches';
  preferredDateTime?: string;
  requirements?: string;
  createdAt: string;
  status: 'pending' | 'scheduled' | 'completed';
}

export interface Review {
  id: string;
  fullName: string;
  instituteName: string;
  rating: number;
  reviewText: string;
  photoUrl?: string;
  consent: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface FeeReceiptData {
  receiptNo: string;
  studentName: string;
  rollNo: string;
  course: string;
  amount: number;
  paymentMode: 'Cash' | 'UPI / QR' | 'Card' | 'Net Banking';
  date: string;
  instituteName: string;
  instituteAddress: string;
  phone: string;
  totalCourseFee: number;
  paidSoFar: number;
  pendingBalance: number;
}

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  isConfigured: boolean;
}

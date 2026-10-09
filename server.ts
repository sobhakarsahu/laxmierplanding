import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Persistent JSON storage directory
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const DEMOS_FILE = path.join(DATA_DIR, 'demos.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

function readJson<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('Error reading JSON file:', file, e);
  }
  return fallback;
}

function writeJson<T>(file: string, data: T) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing JSON file:', file, e);
  }
}

// Default config
const initialConfig = {
  phone: process.env.VITE_CONTACT_PHONE || '+919876543210',
  whatsapp: process.env.VITE_WHATSAPP_NUMBER || '919876543210',
  isConfigured: false,
};

// ================= API ROUTES =================

// Config API
app.get('/api/config', (_req: Request, res: Response) => {
  const config = readJson(CONFIG_FILE, initialConfig);
  res.json(config);
});

app.post('/api/config', (req: Request, res: Response) => {
  const { phone, whatsapp } = req.body;
  if (!phone || !whatsapp) {
    return res.status(400).json({ success: false, error: 'Phone and WhatsApp are required' });
  }
  const updated = {
    phone,
    whatsapp: String(whatsapp).replace(/\D/g, ''),
    isConfigured: true,
  };
  writeJson(CONFIG_FILE, updated);
  res.json({ success: true, config: updated });
});

// Inquiries API
app.get('/api/inquiries', (_req: Request, res: Response) => {
  const inquiries = readJson(INQUIRIES_FILE, []);
  res.json(inquiries);
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const { fullName, instituteName, mobileNumber, email, districtState, branches, interestedService, message, consent, honeyPot } = req.body;

  // Anti-spam honeypot
  if (honeyPot && String(honeyPot).trim() !== '') {
    return res.status(400).json({ success: false, error: 'Spam detected' });
  }

  // Server-side validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Valid full name required (min 2 chars)' });
  }
  if (!instituteName || typeof instituteName !== 'string' || instituteName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Institute name required' });
  }
  if (!mobileNumber || String(mobileNumber).replace(/\D/g, '').length < 10) {
    return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number required' });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ success: false, error: 'Inquiry message required' });
  }
  if (!consent) {
    return res.status(400).json({ success: false, error: 'Consent is required' });
  }

  const newInquiry = {
    id: 'INQ-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    fullName: fullName.trim(),
    instituteName: instituteName.trim(),
    mobileNumber: mobileNumber.trim(),
    email: email ? String(email).trim() : undefined,
    districtState: districtState ? String(districtState).trim() : undefined,
    branches: branches ? String(branches).trim() : undefined,
    interestedService: interestedService || 'Complete LaxmiERP Software',
    message: message.trim(),
    consent: true,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const inquiries = readJson<any[]>(INQUIRIES_FILE, []);
  inquiries.unshift(newInquiry);
  writeJson(INQUIRIES_FILE, inquiries);

  console.log(`[LaxmiERP] New inquiry received from: ${newInquiry.fullName} (${newInquiry.instituteName}) - Mobile: ${newInquiry.mobileNumber}`);
  res.status(201).json({ success: true, inquiry: newInquiry });
});

// Demo Requests API
app.get('/api/demo-requests', (_req: Request, res: Response) => {
  const demos = readJson(DEMOS_FILE, []);
  res.json(demos);
});

app.post('/api/demo-requests', (req: Request, res: Response) => {
  const { name, instituteName, phoneNumber, preferredMethod, branches, preferredDateTime, requirements, honeyPot } = req.body;

  if (honeyPot && String(honeyPot).trim() !== '') {
    return res.status(400).json({ success: false, error: 'Spam detected' });
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Full name is required' });
  }
  if (!instituteName || typeof instituteName !== 'string' || instituteName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Institute name is required' });
  }
  if (!phoneNumber || String(phoneNumber).replace(/\D/g, '').length < 10) {
    return res.status(400).json({ success: false, error: 'Valid phone number is required' });
  }

  const newDemo = {
    id: 'DEMO-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    name: name.trim(),
    instituteName: instituteName.trim(),
    phoneNumber: phoneNumber.trim(),
    preferredMethod: preferredMethod || 'WhatsApp',
    branches: branches || '1 Branch',
    preferredDateTime: preferredDateTime ? String(preferredDateTime).trim() : undefined,
    requirements: requirements ? String(requirements).trim() : undefined,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };

  const demos = readJson<any[]>(DEMOS_FILE, []);
  demos.unshift(newDemo);
  writeJson(DEMOS_FILE, demos);

  console.log(`[LaxmiERP] New demo request received: ${newDemo.name} (${newDemo.instituteName}) - Phone: ${newDemo.phoneNumber}`);
  res.status(201).json({ success: true, demo: newDemo });
});

// Reviews API
// Public endpoint returns only approved reviews
app.get('/api/reviews', (_req: Request, res: Response) => {
  const reviews = readJson<any[]>(REVIEWS_FILE, []);
  const approved = reviews.filter(r => r.status === 'approved');
  res.json(approved);
});

// Post review (defaults to pending approval)
app.post('/api/reviews', (req: Request, res: Response) => {
  const { fullName, instituteName, rating, reviewText, photoUrl, consent, honeyPot } = req.body;

  if (honeyPot && String(honeyPot).trim() !== '') {
    return res.status(400).json({ success: false, error: 'Spam detected' });
  }

  const numRating = Number(rating);
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Full name required' });
  }
  if (!instituteName || typeof instituteName !== 'string' || instituteName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Institute name required' });
  }
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({ success: false, error: 'Star rating must be between 1 and 5' });
  }
  if (!reviewText || typeof reviewText !== 'string' || reviewText.trim().length < 10) {
    return res.status(400).json({ success: false, error: 'Review text must be at least 10 characters' });
  }
  if (!consent) {
    return res.status(400).json({ success: false, error: 'Consent to publish upon approval required' });
  }

  const newReview = {
    id: 'REV-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    fullName: fullName.trim(),
    instituteName: instituteName.trim(),
    rating: numRating,
    reviewText: reviewText.trim(),
    photoUrl: photoUrl ? String(photoUrl).trim() : undefined,
    consent: true,
    status: 'pending', // Pending admin approval
    createdAt: new Date().toISOString(),
  };

  const reviews = readJson<any[]>(REVIEWS_FILE, []);
  reviews.unshift(newReview);
  writeJson(REVIEWS_FILE, reviews);

  console.log(`[LaxmiERP] New review submitted (pending moderation): ${newReview.fullName} (${newReview.instituteName}) - Rating: ${newReview.rating}`);
  res.status(201).json({ success: true, review: newReview });
});

// Admin Reviews Endpoints
app.get('/api/admin/reviews', (_req: Request, res: Response) => {
  const reviews = readJson(REVIEWS_FILE, []);
  res.json(reviews);
});

app.patch('/api/admin/reviews/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, reviewText } = req.body;
  const reviews = readJson<any[]>(REVIEWS_FILE, []);
  const index = reviews.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Review not found' });
  }

  if (status) reviews[index].status = status;
  if (reviewText) reviews[index].reviewText = reviewText;

  writeJson(REVIEWS_FILE, reviews);
  res.json({ success: true, review: reviews[index] });
});

app.delete('/api/admin/reviews/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const reviews = readJson<any[]>(REVIEWS_FILE, []);
  const filtered = reviews.filter(r => r.id !== id);
  writeJson(REVIEWS_FILE, filtered);
  res.json({ success: true });
});

// AI Customer Chat Agent API
app.post('/api/ai-chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, error: 'Messages array required' });
    }

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: `You are the AI Customer Support Agent for LaxmiERP (laxmierp.com), a premier cloud-based Computer Institute Management System. 
You are fully fluent and capable of conversing in English, Hindi (हिन्दी), Odia (ଓଡ଼ିଆ), Sambalpuri (ସମ୍ବଲପୁରୀ), and Koraputia Odia (କୋରାପୁଟିଆ ଓଡ଼ିଆ). 
Respond in the exact language or dialect the user is using (English, Hindi, Odia, Sambalpuri, or Koraputia Odia).
You help computer academy directors, tutors, and students with information about modules (Student Admission, Fee Collection & PDF Receipts, Attendance, Exams, Multi-Branch Management, Income & Expense, Staff Payroll, Certificate Generator).
Be polite, professional, encouraging, and helpful. Emphasize real-time cloud sync, instant PDF receipts, and ease of use. If asked about pricing or demos, encourage them to request a free demo or contact via WhatsApp.`,
        temperature: 0.7,
      },
    });

    res.json({ success: true, reply: response.text || "Hello! How can I assist you with LaxmiERP today?" });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ success: false, error: error.message || 'AI assistant is temporarily busy.' });
  }
});

// Vite middleware or static assets
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LaxmiERP] Server running at http://localhost:${PORT}`);
  });
}

startServer();

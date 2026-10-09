import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  X,
  Lock,
  UserCheck
} from 'lucide-react';
import { Review } from '../types';
import { StorageService } from '../services/storage';

interface ReviewsSectionProps {
  onOpenAdmin: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onOpenAdmin }) => {
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeyPot, setHoneyPot] = useState(''); // Spam honeypot
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const refreshReviews = () => {
    setApprovedReviews(StorageService.getApprovedReviews());
  };

  useEffect(() => {
    refreshReviews();
    window.addEventListener('storage', refreshReviews);
    return () => window.removeEventListener('storage', refreshReviews);
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      const res = await StorageService.addReview({
        fullName,
        instituteName,
        rating,
        reviewText,
        photoUrl: photoUrl.trim() || undefined,
        consent,
      }, honeyPot);

      if (res.success) {
        setSubmitSuccess(true);
        // Reset fields
        setFullName('');
        setInstituteName('');
        setRating(5);
        setReviewText('');
        setPhotoUrl('');
        setConsent(false);
      } else {
        setSubmitError(res.error || 'Failed to submit review');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Verified Institute Feedback Policy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Client Reviews &amp; Testimonials
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              We uphold strict integrity: LaxmiERP never fabricates fake ratings. All reviews here are submitted by genuine computer institute directors and published following administrative verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setSubmitError('');
                setIsWriteModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Write a Review
            </button>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
              title="Admin Moderation Portal"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Moderate Reviews
            </button>
          </div>
        </div>

        {/* Display Content: Either Approved Reviews or Transparent Placeholders */}
        {approvedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedReviews.map((r) => (
              <div 
                key={r.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= r.rating 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-slate-200'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      Verified Director
                    </span>
                  </div>

                  <p className="text-slate-700 text-sm italic leading-relaxed mb-4">
                    “{r.reviewText}”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  {r.photoUrl ? (
                    <img 
                      src={r.photoUrl} 
                      alt={r.fullName} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-sky-500 to-blue-600 text-white font-bold text-sm flex items-center justify-center">
                      {r.fullName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{r.fullName}</h4>
                    <p className="text-xs text-slate-500">{r.instituteName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Strictly compliant initial state with clearly labeled placeholders */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Placeholder Card 1 */}
            <div className="bg-white/80 border-2 border-dashed border-sky-200 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-64">
              <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full mb-2">
                Awaiting First Reviews
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                “Your review will appear here after approval.”
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                We believe in genuine testimonials. Newly submitted director reviews are pending admin validation before appearing publicly.
              </p>
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="mt-4 text-xs font-bold text-sky-600 hover:text-sky-800 underline underline-offset-4"
              >
                Submit the first review &rarr;
              </button>
            </div>

            {/* Placeholder Card 2 */}
            <div className="bg-white/80 border-2 border-dashed border-amber-200 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-64">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-2">
                Zero Fake Ratings Policy
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                100% Verified Institute Feedback
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                Every review on LaxmiERP is connected to a verified educational institution or franchise center.
              </p>
            </div>

            {/* Placeholder Card 3 */}
            <div className="bg-white/80 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-64">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-2">
                Administrator Moderation
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                Full Admin Control
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                Administrators can review incoming submissions, verify credentials, approve, edit, or delete feedback anytime.
              </p>
              <button
                onClick={onOpenAdmin}
                className="mt-4 text-xs font-bold text-slate-700 hover:text-slate-900 underline underline-offset-4"
              >
                Open Admin Moderation Panel &rarr;
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-linear-to-r from-sky-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-base font-bold">Write a Client Review</h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Review Submitted Successfully!</h4>
                  <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                    Thank you for sharing your experience. Your review has been securely saved and marked as <span className="font-bold text-amber-700">pending approval</span>. It will appear publicly as soon as the administrator verifies it.
                  </p>
                  <button
                    onClick={() => {
                      setIsWriteModalOpen(false);
                      setSubmitSuccess(false);
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  
                  {/* Honeypot field for anti-spam (hidden from users) */}
                  <input
                    type="text"
                    value={honeyPot}
                    onChange={(e) => setHoneyPot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Computer Institute Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Apex Computer Training Institute"
                      value={instituteName}
                      onChange={(e) => setInstituteName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Star Rating (1 to 5) <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setRating(s)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              s <= rating 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-slate-300'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-600 ml-2">
                        {rating} out of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Written Review <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your experience managing fees, students, or PDF receipts with LaxmiERP..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Optional Photo URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      id="reviewConsent"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="reviewConsent" className="text-xs text-slate-600 leading-snug cursor-pointer">
                      I consent to LaxmiERP validating and publishing this review on laxmierp.com upon administrative verification.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-4 py-3 px-4 rounded-xl text-white font-bold text-sm bg-linear-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 shadow-md shadow-sky-600/20 disabled:opacity-50 transition-all"
                  >
                    {submitting ? 'Submitting securely...' : 'Submit Review for Approval'}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    Submissions are verified by the administrator to prevent fake reviews and maintain platform integrity.
                  </p>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

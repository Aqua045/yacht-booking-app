import React, { useState } from 'react';
import { Sparkles, X, Send, ShieldCheck, Phone, Mail, User, Anchor, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '../../context/BookingContext';

export const CustomInquiryModal: React.FC = () => {
  const { isCustomInquiryOpen, setIsCustomInquiryOpen } = useBooking();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    charterType: 'Private Vacation',
    preferredDestination: 'French Riviera & Monaco',
    budgetRange: '$100,000 - $300,000',
    guestCount: '8',
    message: '',
  });

  if (!isCustomInquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#0284c7']
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setIsCustomInquiryOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-navy-950 border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-navy-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-widest block">
                Bespoke Maritime Concierge
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-luxury uppercase tracking-wide">
                Custom Superyacht Charter Request
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-navy-950 border border-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500 flex items-center justify-center mx-auto text-gold-400 shadow-gold-glow">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-luxury text-white">Inquiry Received</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-gold-400 font-semibold">{formData.name}</span>. A Senior Charter Broker from our Monaco headquarters has been assigned to your request and will contact you within 2 business hours.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 px-8 py-3 rounded-full bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
              >
                Return to Exploration
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Seeking a 100m+ megayacht, specialized regatta entry, Cannes Film Festival VIP berth, or private island buyout? Our concierge team curates off-market vessels tailored precisely to your preferences.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lord / Lady / Captain..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    VIP Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vip@private-domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Cruising Region
                  </label>
                  <select
                    value={formData.preferredDestination}
                    onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="French Riviera & Monaco">French Riviera & Monaco</option>
                    <option value="Amalfi Coast & Capri">Amalfi Coast & Capri</option>
                    <option value="Greek Cyclades & Ionian">Greek Cyclades & Ionian</option>
                    <option value="Balearic Islands">Balearic Islands (Ibiza)</option>
                    <option value="Caribbean & Bahamas">Caribbean & Bahamas</option>
                    <option value="Dubai & Middle East">Dubai & Middle East</option>
                    <option value="Other / Global Expedition">Other / Global Expedition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full bg-navy-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="₹40 Lakhs - ₹1 Crore (approx $50k-$120k)">₹40 Lakhs - ₹1 Crore / week</option>
                    <option value="₹1 Crore - ₹3 Crores (approx $120k-$350k)">₹1 Crore - ₹3 Crores / week</option>
                    <option value="₹3 Crores - ₹7 Crores (approx $350k-$800k)">₹3 Crores - ₹7 Crores / week</option>
                    <option value="₹7 Crores+ (Ultra-Megayacht)">₹7 Crores+ / week (Ultra-Megayacht)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Specific Requirements & Special Logistics
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Certified helipad required, private diving instructor, specific yacht builder preference, Monaco Grand Prix trackside berth..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-navy-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 hover:from-gold-400 hover:to-amber-300 text-navy-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-glow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Bespoke Charter Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

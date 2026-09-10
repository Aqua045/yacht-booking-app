import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const ContactSection: React.FC = () => {
  const { currentUser, setIsAuthModalOpen } = useBooking();
  const { showToast } = useToast();
  useScrollReveal();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Birthday Celebration',
    date: '',
    message: '',
  });

  // Pre-fill form from logged-in user
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      showToast('warning', 'Sign in required', 'Please sign in to send a charter inquiry.');
      setIsAuthModalOpen(true);
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      return;
    }

    setSubmitted(true);
    showToast('success', 'Inquiry Received!', 'Our charter concierge will contact you within 15 minutes.');
    setTimeout(() => {
      setSubmitted(false);
      setFormData((prev) => ({
        ...prev,
        occasion: 'Birthday Celebration',
        date: '',
        message: '',
      }));
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#081017] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d4a359] uppercase mb-2">
            GET IN TOUCH
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-luxury uppercase tracking-wide text-white mb-4">
            Plan Your Private Charter
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Have a custom charter request or planning a large corporate event? Our dedicated yacht concierges are available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Info Card */}
          <div className="lg:col-span-5 bg-[#0b1622] border border-[#1b2f42] rounded-xl p-8 flex flex-col justify-between space-y-6 reveal-left">
            <div>
              <h3 className="text-xl font-bold font-luxury uppercase tracking-wider text-white mb-3">
                YachtWay Mumbai
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-8">
                Operating directly from Jet Ski Jetty &amp; Jetty No. 5, opposite The Taj Mahal Palace, Gateway of India, Colaba, Mumbai.
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0e1e2d] border border-[#1e344a] flex items-center justify-center flex-shrink-0 text-[#d4a359]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Boarding Jetty</span>
                    <span className="text-white font-medium">Jetty No. 5, Gateway of India, Colaba, Mumbai 400001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0e1e2d] border border-[#1e344a] flex items-center justify-center flex-shrink-0 text-[#d4a359]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Call / WhatsApp</span>
                    <span className="text-white font-medium">+91 98765 43210 / +91 98201 54321</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0e1e2d] border border-[#1e344a] flex items-center justify-center flex-shrink-0 text-[#d4a359]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Email</span>
                    <span className="text-white font-medium">reservations@yachtway.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0e1e2d] border border-[#1e344a] flex items-center justify-center flex-shrink-0 text-[#d4a359]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Operating Hours</span>
                    <span className="text-white font-medium">06:00 AM – 10:00 PM (Daily All Year)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#0e1d2c] border border-[#1b3147] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#d4a359] flex-shrink-0" />
              <p className="text-[11px] text-slate-300">
                Instant confirmation on WhatsApp with boarding passes and GPS coordinates upon booking.
              </p>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-[#0b1622] border border-[#1b2f42] rounded-xl p-8 shadow-xl relative reveal-right">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-luxury uppercase text-white">Inquiry Received!</h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Thank you, <span className="text-[#d4a359] font-bold">{formData.name}</span>. Our charter captain will contact you within 15 minutes via call/WhatsApp.
                </p>
              </div>
            ) : (
              <>
                {/* Auth Gate Overlay */}
                {!currentUser && (
                  <div className="absolute inset-0 z-10 bg-[#09121a]/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-4 p-8">
                    <div className="w-14 h-14 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/40 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-[#d4a359]" />
                    </div>
                    <h3 className="text-lg font-bold font-luxury text-white text-center">Sign in to Send an Inquiry</h3>
                    <p className="text-xs text-slate-400 text-center max-w-xs">
                      Please create an account or sign in to contact our charter team.
                    </p>
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="px-6 py-2.5 rounded-xl bg-[#d4a359] hover:bg-[#caa055] text-[#081018] font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Sign In to Continue
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold font-luxury uppercase tracking-wider text-white mb-2">
                    Request a Charter Quote
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d4a359]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Kapoor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d4a359]">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d4a359]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d4a359]">
                        Occasion
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359]"
                      >
                        <option>Birthday Celebration</option>
                        <option>Romantic Proposal / Anniversary</option>
                        <option>Sunset Leisure Cruise</option>
                        <option>Corporate Offsite &amp; VIP Event</option>
                        <option>Alibaug Villa Private Transfer</option>
                        <option>Filming / Commercial Shoot</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#d4a359]">
                      Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your guests, preferred route, decorations, DJ, catering, or special surprises..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Charter Inquiry</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

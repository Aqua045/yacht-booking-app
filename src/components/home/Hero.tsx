import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Clock, Users, Search, ChevronDown } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';

const DESTINATIONS = [
  { value: 'Mumbai', label: 'Mumbai Coast' },
  { value: 'Gateway of India', label: 'Gateway of India' },
  { value: 'Alibaug', label: 'Alibaug Villa Transfer' },
  { value: 'Elephanta Island', label: 'Elephanta Island' },
  { value: 'Mandwa Beach', label: 'Mandwa Beach' },
];

const TIME_SLOTS = [
  { value: '07:00 AM - Sunrise Sail', label: '07:00 AM — Sunrise' },
  { value: '10:00 AM - Morning Cruise', label: '10:00 AM — Morning' },
  { value: '04:30 PM - Sunset Cruise', label: '04:30 PM — Sunset 🔥' },
  { value: '07:00 PM - Starlight Dinner', label: '07:00 PM — Starlight' },
];

const GUEST_OPTIONS = [
  { value: '2', label: '2 Guests — Intimate' },
  { value: '4', label: '4 Guests' },
  { value: '8', label: '8 Guests' },
  { value: '15', label: '15+ Guests — Party' },
];

export const Hero: React.FC = () => {
  const { openBookingModal } = useBooking();
  const { showToast } = useToast();
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const isMobile = useRef(window.innerWidth < 768);

  const getDefaultTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [destination, setDestination] = useState('Mumbai');
  const [date, setDate] = useState(getDefaultTomorrowDate());
  const [timeSlot, setTimeSlot] = useState('04:30 PM - Sunset Cruise');
  const [guests, setGuests] = useState('2');

  // Parallax — only runs on desktop, using rAF for smoothness
  useEffect(() => {
    if (isMobile.current) return;
    let raf: number;
    const handleScroll = () => {
      raf = requestAnimationFrame(() => {
        if (bgRef.current) {
          const y = window.scrollY;
          bgRef.current.style.transform = `translateY(${y * 0.28}px) scale(1.1)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guestNum = parseInt(guests) || 2;
    window.dispatchEvent(
      new CustomEvent('yachtway:searchFleet', { detail: { destination, guestCount: guestNum } })
    );
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
    showToast('info', 'Searching Fleet', `Showing yachts for ${guestNum} guests in ${destination}.`);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-end pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#04090f]">
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2400&q=85"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center scale-110"
          style={{ transformOrigin: 'center top' }}
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/60 to-[#04090f]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/70 via-transparent to-transparent" />
        {/* Subtle texture noise — gives editorial feel */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
        />
      </div>

      {/* Hero copy — sits in upper-middle area */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mb-8 sm:mb-12 mt-auto pt-28 sm:pt-0">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a359]/12 border border-[#d4a359]/25 mb-5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359] animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] text-[#d4a359] uppercase">
            Mumbai's Premier Charter Fleet
          </span>
        </div>

        {/* Headline — editorial scale */}
        <h1 className="text-[clamp(2.4rem,8vw,5.5rem)] font-extrabold text-white uppercase font-luxury leading-[1.0] tracking-tight mb-4 sm:mb-6">
          Sail Beyond<br />
          <span className="gold-shimmer">The Horizon</span>
        </h1>

        <p className="max-w-xl text-slate-300/90 text-sm sm:text-base leading-relaxed mb-8 font-normal">
          Private sunset charters, birthday celebrations &amp; VIP coastal cruises from Gateway of India.
          Verified captains — instant confirmation.
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-6 sm:gap-12 mb-10">
          {[
            { value: '6+', label: 'Luxury Yachts' },
            { value: '4', label: 'Destinations' },
            { value: '10K+', label: 'Happy Guests' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col border-l-2 border-[#d4a359]/60 pl-3">
              <span className="stat-number text-xl sm:text-2xl font-extrabold text-[#d4a359] font-luxury leading-tight">{s.value}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Search / Booking Bar ─────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#080f18]/90 border border-[#d4a359]/25 rounded-2xl sm:rounded-2xl p-3 shadow-2xl backdrop-blur-md"
        >
          {/* Mobile: stacked — Desktop: single row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-0.5 sm:gap-0">

            {/* Destination */}
            <BarField icon={<MapPin className="w-3.5 h-3.5" />} label="Destination">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-[13px] sm:text-sm font-semibold text-white focus:outline-none cursor-pointer appearance-none pr-4 leading-snug"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.value} value={d.value} className="bg-[#0c1824]">{d.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 bottom-2.5 w-3 h-3 text-slate-500 pointer-events-none" />
            </BarField>

            {/* Date */}
            <BarField icon={<Calendar className="w-3.5 h-3.5" />} label="Charter Date">
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-[13px] sm:text-sm font-semibold text-white focus:outline-none cursor-pointer leading-snug"
              />
            </BarField>

            {/* Time Slot */}
            <BarField icon={<Clock className="w-3.5 h-3.5" />} label="Time Slot">
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-transparent text-[13px] sm:text-sm font-semibold text-white focus:outline-none cursor-pointer appearance-none pr-4 leading-snug"
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t.value} value={t.value} className="bg-[#0c1824]">{t.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 bottom-2.5 w-3 h-3 text-slate-500 pointer-events-none" />
            </BarField>

            {/* Guests */}
            <BarField icon={<Users className="w-3.5 h-3.5" />} label="Party Size">
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-[13px] sm:text-sm font-semibold text-white focus:outline-none cursor-pointer appearance-none pr-4 leading-snug"
              >
                {GUEST_OPTIONS.map((g) => (
                  <option key={g.value} value={g.value} className="bg-[#0c1824]">{g.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 bottom-2.5 w-3 h-3 text-slate-500 pointer-events-none" />
            </BarField>

            {/* Search Button */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1 p-1 pt-2 sm:pt-1 lg:pt-1">
              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#d4a359] hover:bg-[#c8922a] active:scale-[0.98] text-[#080f18] font-bold text-[11px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-colors duration-150 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Search Fleet
              </button>
            </div>
          </div>
        </form>

        {/* Quick CTAs below bar on mobile */}
        <div className="flex items-center justify-center gap-4 mt-4 sm:mt-5">
          <button
            onClick={() => openBookingModal()}
            className="text-[11px] text-[#d4a359] font-semibold underline underline-offset-2 cursor-pointer"
          >
            Book instantly →
          </button>
          <span className="text-slate-700 text-xs">|</span>
          <a href="tel:+919876543210" className="text-[11px] text-slate-400 font-medium cursor-pointer hover:text-slate-200 transition-colors">
            Call +91 98765 43210
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Bar Field Sub-component ────────────────────────────────────────────────
interface BarFieldProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const BarField: React.FC<BarFieldProps> = ({ icon, label, children }) => (
  <div className="bar-field relative px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
    <label className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#d4a359] uppercase mb-1">
      {icon}
      {label}
    </label>
    <div className="relative">
      {children}
    </div>
  </div>
);

import React, { useState, useEffect, useCallback } from 'react';
import { Anchor, Heart, CalendarCheck, Menu, X, Phone, User, LogOut, Scale } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const NAV_LINKS = [
  { label: 'Home', action: 'home' },
  { label: 'Yachts', action: 'fleet' },
  { label: 'Categories', action: 'categories' },
  { label: 'Destinations', action: 'destinations' },
  { label: 'Contact', action: 'contact' },
];

export const Navbar: React.FC = () => {
  const {
    currentUser, logout, setIsAuthModalOpen,
    favorites, compareList, confirmedBookings,
    setIsWishlistOpen, setIsBookingsModalOpen,
    setIsCompareModalOpen, openBookingModal,
  } = useBooking();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080f18]/96 border-b border-white/[0.06] shadow-xl'
            : 'bg-gradient-to-b from-black/50 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">

          {/* ─── Brand ──────────────────────────────────────── */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group shrink-0"
            aria-label="YachtWay Home"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#d4a359]/50 bg-[#0c1824] flex items-center justify-center transition-all group-hover:border-[#d4a359]">
              <Anchor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4a359]" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-widest uppercase font-luxury text-white leading-none">
              YACHT<span className="text-[#d4a359]">WAY</span>
            </span>
          </button>

          {/* ─── Desktop Nav ─────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium">
            {NAV_LINKS.map((link) => (
              <button
                key={link.action}
                onClick={() => scrollTo(link.action)}
                className="text-slate-300 hover:text-white transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-0 after:bg-[#d4a359] after:transition-all hover:after:w-full cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ─── Desktop Actions ─────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Compare */}
            {compareList.length > 0 && (
              <IconBadge count={compareList.length} title="Compare Yachts" onClick={() => setIsCompareModalOpen(true)}>
                <Scale className="w-4 h-4 text-[#d4a359]" />
              </IconBadge>
            )}

            {/* Wishlist */}
            <IconBadge count={favorites.length} title="Saved Yachts" onClick={() => setIsWishlistOpen(true)}>
              <Heart className="w-4 h-4 text-[#d4a359]" />
            </IconBadge>

            {/* Auth */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2.5 pr-1.5 py-1.5 rounded-full border border-[#d4a359]/30 bg-[#0c1824]">
                <div className="w-5 h-5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/60 flex items-center justify-center text-[9px] font-bold text-[#d4a359] shrink-0">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-white max-w-[90px] truncate">{currentUser.name}</span>
                <button
                  onClick={logout}
                  className="ml-1 p-1 rounded-full hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4a359]/35 bg-[#0c1824] text-xs font-bold text-[#d4a359] hover:bg-[#d4a359] hover:text-[#080f18] transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}

            {/* My Bookings */}
            <button
              onClick={() => setIsBookingsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-slate-300 hover:border-[#d4a359]/40 hover:text-white transition-all cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#d4a359]" />
              My Bookings
              {confirmedBookings.length > 0 && (
                <span className="bg-emerald-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {confirmedBookings.length}
                </span>
              )}
            </button>

            {/* Call CTA */}
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#d4a359] hover:bg-[#c8922a] text-[#080f18] font-bold text-xs tracking-wide transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 98765 43210
            </a>
          </div>

          {/* ─── Mobile Right Controls ───────────────────────── */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Wishlist pill */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 rounded-full bg-[#0c1824] border border-white/10"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 text-[#d4a359]" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#d4a359] text-[#080f18] font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Auth pill */}
            {currentUser ? (
              <div className="w-8 h-8 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/60 flex items-center justify-center text-[11px] font-bold text-[#d4a359]">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1.5 rounded-full border border-[#d4a359]/35 text-[11px] font-bold text-[#d4a359] bg-[#0c1824] cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0c1824] border border-white/10 text-white cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Full-screen Drawer ──────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Panel slides in from top */}
          <div className="relative mt-14 bg-[#080f18] border-b border-white/10 mobile-drawer">
            <div className="px-4 pt-4 pb-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.action}
                  onClick={() => scrollTo(link.action)}
                  className="text-left py-3 px-3 text-base font-semibold text-slate-200 hover:text-[#d4a359] border-b border-white/[0.05] transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => { setMobileMenuOpen(false); setIsBookingsModalOpen(true); }}
                className="text-left py-3 px-3 text-base font-semibold text-slate-200 border-b border-white/[0.05] flex items-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#d4a359]" />
                My Bookings
                {confirmedBookings.length > 0 && (
                  <span className="ml-auto bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {confirmedBookings.length}
                  </span>
                )}
              </button>

              {currentUser && (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-left py-3 px-3 text-base font-semibold text-rose-400 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out ({currentUser.name})
                </button>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); openBookingModal(); }}
                  className="py-3 rounded-xl bg-[#d4a359] text-[#080f18] font-bold text-sm uppercase tracking-wide cursor-pointer"
                >
                  Book Now
                </button>
                <a
                  href="tel:+919876543210"
                  className="py-3 rounded-xl border border-white/15 text-white font-bold text-sm text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#d4a359]" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ─── Icon Badge helper ───────────────────────────────────────────────────────
interface IconBadgeProps {
  count: number;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

const IconBadge: React.FC<IconBadgeProps> = ({ count, title, onClick, children }) => (
  <button
    onClick={onClick}
    title={title}
    className="relative p-2 rounded-full bg-[#0c1824] border border-white/10 hover:border-[#d4a359]/40 transition-colors cursor-pointer"
  >
    {children}
    {count > 0 && (
      <span className="absolute -top-0.5 -right-0.5 bg-[#d4a359] text-[#080f18] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">
        {count}
      </span>
    )}
  </button>
);

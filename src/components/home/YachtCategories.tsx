import React from 'react';
import { Ship, Waves, Sailboat, Wine, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CATEGORIES = [
  {
    id: 'Luxury Yacht',
    icon: Ship,
    label: 'Luxury Yacht',
    tagline: 'For couples & intimate celebrations',
    description: 'Elegant interiors, spacious sundeck, certified crew — the pinnacle of private charter.',
    color: 'from-amber-900/30 to-transparent',
    accent: '#d4a359',
  },
  {
    id: 'Speed Boat',
    icon: Waves,
    label: 'Speed Boat',
    tagline: 'Quick thrills on open water',
    description: 'High-octane coastal rides for small groups who love speed and sea spray.',
    color: 'from-blue-900/30 to-transparent',
    accent: '#60a5fa',
  },
  {
    id: 'Sailing Yacht',
    icon: Sailboat,
    label: 'Sailing Yacht',
    tagline: 'Peaceful, wind-powered voyages',
    description: 'Unwind on a classic sail as Mumbai fades into the horizon. Pure serenity.',
    color: 'from-emerald-900/30 to-transparent',
    accent: '#34d399',
  },
  {
    id: 'Party Yacht',
    icon: Wine,
    label: 'Party Yacht',
    tagline: 'Celebrate on the open sea',
    description: 'Dual-deck party platforms with premium sound, dance floor, and onboard catering.',
    color: 'from-purple-900/30 to-transparent',
    accent: '#a78bfa',
  },
];

export const YachtCategories: React.FC = () => {
  useScrollReveal();

  const handleCategorySelect = (categoryId: string) => {
    // Scroll to fleet and set the active filter tab
    const fleet = document.getElementById('fleet');
    if (fleet) {
      fleet.scrollIntoView({ behavior: 'smooth' });
    }
    // Dispatch a custom event that FleetShowcase listens to
    window.dispatchEvent(new CustomEvent('yachtway:filterCategory', { detail: categoryId }));
  };

  return (
    <section id="categories" className="py-24 bg-[#060c12] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#d4a359]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 reveal">
          <p className="text-xs font-bold tracking-[0.3em] text-[#d4a359] uppercase mb-3">
            CHOOSE YOUR EXPERIENCE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-luxury text-white leading-tight">
            Every Charter,<br />Perfectly Matched
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Select a category and instantly see matching yachts in our curated fleet.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`reveal reveal-delay-${i + 1} card-shine text-left group p-6 rounded-2xl border border-[#1b2f42] bg-[#0b1622] hover:border-[${cat.accent}]/50 hover:bg-[#0d1d2d] transition-all duration-300 cursor-pointer`}
                style={{ '--hover-accent': cat.accent } as React.CSSProperties}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${cat.accent}22, ${cat.accent}08)`, border: `1px solid ${cat.accent}33` }}
                >
                  <Icon className="w-5 h-5" style={{ color: cat.accent }} />
                </div>

                {/* Text */}
                <h3 className="text-sm font-bold font-luxury uppercase tracking-wider text-white mb-1 group-hover:text-[#d4a359] transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: cat.accent }}>
                  {cat.tagline}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {cat.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-[#d4a359] transition-colors">
                  <span>View Yachts</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

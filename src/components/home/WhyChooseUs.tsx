import React from 'react';
import { ShieldCheck, Anchor, Award, Sparkles, Clock, HeartHandshake } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const WhyChooseUs: React.FC = () => {
  useScrollReveal();

  const features = [
    {
      icon: Anchor,
      title: 'Certified Captains & Crew',
      description: 'Master mariners with over a decade of sailing experience across Mumbai coastline ensuring top-tier safety and comfort.',
    },
    {
      icon: ShieldCheck,
      title: '100% Safety Certified',
      description: 'All yachts are DG Shipping compliant, fully insured, and equipped with modern life vests, first aid, and marine VHF radios.',
    },
    {
      icon: Sparkles,
      title: 'Customized Celebrations',
      description: 'Tailor-made arrangements for birthdays, romantic proposals, anniversaries, corporate offsites, and sunset parties.',
    },
    {
      icon: Award,
      title: '5-Star VIP Hospitality',
      description: 'Dedicated steward service, red carpet pier welcome, chilled mocktails, and fresh gourmet snacks on board.',
    },
    {
      icon: Clock,
      title: 'Instant Online Booking',
      description: 'Real-time time slot availability, transparent ₹ INR pricing with zero hidden fees, and instant booking confirmation.',
    },
    {
      icon: HeartHandshake,
      title: 'Best Price Guarantee',
      description: 'Direct fleet pricing from Gateway of India with no middleman markups and flexible cancellation policies.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-[#060c12] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d4a359] uppercase mb-2">
            OUR PROMISE
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-luxury uppercase tracking-wide text-white mb-4">
            WHY CHOOSE US
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            We redefine luxury sailing in Mumbai with state-of-the-art yachts, personalized concierge hospitality, and unmatched safety standards.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`reveal reveal-delay-${(idx % 3) + 1} card-shine bg-[#0b1622] border border-[#1b2f42] rounded-lg p-6 flex items-start gap-4 transition-all duration-300 hover:border-[#d4a359]/60 hover:bg-[#0e1d2c]`}
              >
                <div className="w-12 h-12 rounded-lg bg-[#0e1e2d] border border-[#1e344a] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#d4a359]" />
                </div>

                <div>
                  <h3 className="text-sm font-bold font-luxury uppercase tracking-wider text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

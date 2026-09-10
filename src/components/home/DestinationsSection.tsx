import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../../data/destinations';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { YACHTS_DATA } from '../../data/yachts';

export const DestinationsSection: React.FC = () => {
  const { openBookingModal, currentUser, setIsAuthModalOpen } = useBooking();
  const { showToast } = useToast();
  useScrollReveal();

  const handleBookDestination = (destinationTitle: string) => {
    if (!currentUser) {
      showToast('warning', 'Sign in to book experience', 'Please log in to reserve your cruise destination.');
      setIsAuthModalOpen(true);
      return;
    }
    openBookingModal(YACHTS_DATA[0], {
      destination: destinationTitle,
    });
  };

  return (
    <section id="destinations" className="py-24 bg-[#081017] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d4a359] uppercase mb-2">
            EXPLORE
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-luxury uppercase tracking-wide text-white mb-4">
            POPULAR DESTINATIONS
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Discover beautiful coastal destinations around Mumbai and create unforgettable memories on the water.
          </p>
        </div>

        {/* 4 Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.map((item, i) => (
            <div
              key={item.id}
              className={`reveal reveal-delay-${i + 1} card-shine bg-[#0b1622] border border-[#1b2f42] rounded-lg overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#d4a359]/70 group`}
            >
              {/* Destination Image */}
              <div className="relative h-48 overflow-hidden bg-[#060c12]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-transparent to-transparent opacity-80" />
              </div>

              {/* Destination Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category / Location Tag matching screenshot */}
                  <span className="text-[10px] font-bold tracking-widest text-[#d4a359] uppercase block">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold font-luxury uppercase tracking-wider text-white group-hover:text-[#d4a359] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Book Experience Link / Action matching screenshot */}
                <div className="pt-3 border-t border-[#162738]">
                  <button
                    onClick={() => handleBookDestination(item.title)}
                    className="w-full flex items-center justify-start gap-1.5 text-xs font-semibold text-[#d4a359] hover:text-amber-300 transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                  >
                    <span>Book Experience</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

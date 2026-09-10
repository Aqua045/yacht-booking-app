import React from 'react';
import { BedDouble, Users, Star, ArrowRight } from 'lucide-react';
import { YACHTS_DATA } from '../../data/yachts';
import { useBooking } from '../../context/BookingContext';

export const FeaturedYachts: React.FC = () => {
  const { openDetailModal, openBookingModal } = useBooking();
  const featured = YACHTS_DATA.slice(0, 3);

  return (
    <section id="fleet" className="py-24 bg-[#081017] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching screenshots */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d4a359] uppercase mb-2">
            OUR FLEET
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-luxury uppercase tracking-wide text-white mb-4">
            FEATURED LUXURY YACHTS
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Explore our premium fleet of luxury yachts designed for unforgettable experiences, private celebrations, romantic cruises and family adventures.
          </p>
        </div>

        {/* Featured Yacht Cards Grid matching screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((yacht) => (
            <div
              key={yacht.id}
              className="bg-[#0b1622] border border-[#1b2f42] rounded-lg overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#d4a359]/60 hover:shadow-2xl group"
            >
              {/* Image with dark aspect */}
              <div className="relative h-60 overflow-hidden bg-[#060c12]">
                <img
                  src={yacht.featuredImage}
                  alt={yacht.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Price Tag matching screenshot */}
                  <p className="text-xs text-slate-300">
                    Starting from{' '}
                    <span className="text-[#d4a359] font-bold">
                      {yacht.priceDisplay.replace('Starting from ', '')}
                    </span>
                  </p>

                  {/* Yacht Name */}
                  <h3
                    onClick={() => openDetailModal(yacht)}
                    className="text-lg sm:text-xl font-bold font-luxury uppercase tracking-wider text-white group-hover:text-[#d4a359] transition-colors cursor-pointer"
                  >
                    {yacht.name}
                  </h3>

                  {/* Description matching screenshot */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {yacht.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Badges / Specs row matching screenshot */}
                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    {yacht.cabins > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-slate-400" />
                        <span>{yacht.cabins} Cabins</span>
                      </div>
                    ) : null}

                    {yacht.isPrivateRide && (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-[#d4a359] fill-[#d4a359]" />
                        <span>Private Ride</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{yacht.guestsMax} Guests</span>
                    </div>
                  </div>

                  {/* Action Buttons: View Details & Instant Book */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1b2f42]">
                    <button
                      onClick={() => openDetailModal(yacht)}
                      className="w-full py-2.5 rounded border border-[#d4a359]/70 text-[#d4a359] hover:bg-[#d4a359]/10 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => openBookingModal(yacht)}
                      className="w-full py-2.5 rounded bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

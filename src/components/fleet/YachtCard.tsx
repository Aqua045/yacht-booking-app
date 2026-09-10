import React from 'react';
import { Heart, Scale, Users, BedDouble, Star } from 'lucide-react';
import { Yacht } from '../../types/yacht';
import { useBooking } from '../../context/BookingContext';

interface YachtCardProps {
  yacht: Yacht;
}

export const YachtCard: React.FC<YachtCardProps> = ({ yacht }) => {
  const {
    toggleFavorite,
    isFavorite,
    addToCompare,
    removeFromCompare,
    isComparing,
    openBookingModal,
    openDetailModal,
  } = useBooking();

  const favorited = isFavorite(yacht.id);
  const comparing = isComparing(yacht.id);

  return (
    <div className="bg-[#0b1622] border border-[#1b2f42] rounded-lg overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#d4a359]/70 group">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden bg-[#060c12]">
        <img
          src={yacht.featuredImage}
          alt={yacht.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-[#d4a359]/40 text-[#d4a359] text-[10px] font-bold uppercase tracking-wider">
            {yacht.category}
          </span>
        </div>

        {/* Top Right Action Icons (Favorite & Compare) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (comparing) removeFromCompare(yacht.id);
              else addToCompare(yacht.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              comparing
                ? 'bg-[#d4a359] text-[#0a1219] font-bold shadow-md'
                : 'bg-black/60 text-slate-300 hover:text-white'
            }`}
            title={comparing ? 'Remove from comparison' : 'Add to comparison'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(yacht.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
              favorited
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/60 text-slate-300 hover:text-rose-400'
            }`}
            title={favorited ? 'Remove from saved' : 'Save to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content Container */}
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
            className="text-lg font-bold font-luxury uppercase tracking-wider text-white group-hover:text-[#d4a359] transition-colors cursor-pointer"
          >
            {yacht.name}
          </h3>

          {/* Description */}
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

          {/* Action Buttons: View Details & Book Now */}
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
  );
};

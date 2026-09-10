import React from 'react';
import { Heart, X, ArrowRight, Trash2, Ship } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { YACHTS_DATA } from '../../data/yachts';

export const WishlistDrawer: React.FC = () => {
  const {
    favorites,
    toggleFavorite,
    isWishlistOpen,
    setIsWishlistOpen,
    openBookingModal,
    openDetailModal,
  } = useBooking();

  if (!isWishlistOpen) return null;

  const favoriteYachts = YACHTS_DATA.filter((y) => favorites.includes(y.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#09121a] border-l border-[#d4a359]/30 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-[#0c1824] border-b border-[#1b2f42] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-bold text-white font-luxury uppercase tracking-wide">
              Saved Yachts ({favoriteYachts.length})
            </h3>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full bg-[#081018] border border-[#1b2f42] text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favoriteYachts.length > 0 ? (
            favoriteYachts.map((yacht) => (
              <div
                key={yacht.id}
                className="p-4 rounded-xl bg-[#0b1622] border border-[#1b2f42] flex gap-4 items-center group hover:border-[#d4a359]/40 transition-colors"
              >
                <img
                  src={yacht.featuredImage}
                  alt={yacht.name}
                  className="w-18 h-18 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#d4a359] font-bold uppercase tracking-wider block">
                    {yacht.category}
                  </span>
                  <h4
                    onClick={() => {
                      setIsWishlistOpen(false);
                      openDetailModal(yacht);
                    }}
                    className="text-xs font-bold text-white uppercase font-luxury truncate cursor-pointer hover:text-[#d4a359] transition-colors"
                  >
                    {yacht.name}
                  </h4>
                  <span className="text-xs font-bold text-[#d4a359] block mt-0.5">
                    {yacht.priceDisplay}
                  </span>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openBookingModal(yacht);
                      }}
                      className="px-3 py-1 rounded bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => toggleFavorite(yacht.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Ship className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-white font-semibold">Your wishlist is empty</p>
              <p className="text-xs text-slate-500 mt-1">
                Click the heart icon on any yacht to save it for quick booking.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Scale, X, Check, ArrowRight, Trash2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { YACHTS_DATA } from '../../data/yachts';

export const ComparisonDrawer: React.FC = () => {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    openBookingModal,
  } = useBooking();

  if (compareList.length === 0) return null;

  const comparedYachts = YACHTS_DATA.filter((y) => compareList.includes(y.id));

  return (
    <>
      {/* Floating Bottom Bar when items are selected */}
      {!isCompareModalOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3.5 rounded-2xl bg-[#0b1622]/95 border border-[#d4a359]/50 backdrop-blur-xl shadow-2xl flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#d4a359] text-[#0a1219] flex items-center justify-center font-bold text-xs">
              {compareList.length}
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Yachts in Comparison</span>
              <span className="text-[10px] text-slate-400">Compare specs side-by-side (Max 3)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-1.5 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare Now</span>
            </button>

            <button
              onClick={clearCompare}
              className="p-1.5 rounded-lg bg-[#081018] border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-5xl bg-[#09121a] border border-[#d4a359]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0c1824] border-b border-[#1b2f42] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-[#d4a359]" />
                <h3 className="text-base font-bold text-white font-luxury uppercase tracking-wide">
                  Yacht Comparison ({comparedYachts.length})
                </h3>
              </div>

              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-full bg-[#081018] border border-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Matrix */}
            <div className="overflow-x-auto overflow-y-auto flex-1 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-[600px]">
                {comparedYachts.map((yacht) => (
                  <div
                    key={yacht.id}
                    className="p-5 rounded-xl bg-[#0b1622] border border-[#1b2f42] flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Image & Remove */}
                      <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-[#060c12]">
                        <img
                          src={yacht.featuredImage}
                          alt={yacht.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFromCompare(yacht.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-slate-400 hover:text-rose-400 border border-slate-700 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a359] block">
                        {yacht.category}
                      </span>
                      <h4 className="text-base font-bold text-white font-luxury uppercase">{yacht.name}</h4>
                      <p className="text-xs text-slate-400 mb-3">{yacht.tagline}</p>

                      {/* Pricing */}
                      <div className="p-3 rounded-lg bg-[#0e1e2e] border border-[#1b3044] mb-4">
                        <span className="text-[10px] text-slate-400 block uppercase">Rate:</span>
                        <span className="text-base font-bold font-luxury text-[#d4a359] block">
                          {yacht.priceDisplay}
                        </span>
                      </div>

                      {/* Spec Rows */}
                      <div className="space-y-2 text-xs divide-y divide-[#1b2f42]">
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Length:</span>
                          <span className="font-bold text-white">{yacht.specs.lengthFeet} ft</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Guest Capacity:</span>
                          <span className="font-bold text-white">{yacht.guestsMax} Guests</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Cabins:</span>
                          <span className="font-bold text-white">{yacht.cabins} Cabins</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Crew:</span>
                          <span className="font-bold text-white">{yacht.crewCount} Members</span>
                        </div>
                        <div className="flex justify-between pt-1">
                          <span className="text-slate-400">Speed:</span>
                          <span className="font-bold text-white">{yacht.specs.cruisingSpeedKnots || 15} Knots</span>
                        </div>
                      </div>

                      {/* Amenities Mini-List */}
                      <div className="mt-4 pt-3 border-t border-[#1b2f42]">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Amenities:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {yacht.amenities.slice(0, 4).map((a, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-[#0e1e2e] text-[10px] text-slate-300 border border-[#1b3044] flex items-center gap-1">
                              <Check className="w-2.5 h-2.5 text-[#d4a359]" />
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsCompareModalOpen(false);
                        openBookingModal(yacht);
                      }}
                      className="w-full py-2.5 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <span>Book This Yacht</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

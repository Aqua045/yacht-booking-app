import React, { useState } from 'react';
import {
  X,
  Heart,
  Scale,
  Users,
  Anchor,
  Compass,
  BedDouble,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const YachtDetailModal: React.FC = () => {
  const {
    selectedDetailYacht,
    closeDetailModal,
    openBookingModal,
    formatCurrency,
    toggleFavorite,
    isFavorite,
    addToCompare,
    removeFromCompare,
    isComparing,
  } = useBooking();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'amenities' | 'crew'>('overview');

  if (!selectedDetailYacht) return null;

  const yacht = selectedDetailYacht;
  const favorited = isFavorite(yacht.id);
  const comparing = isComparing(yacht.id);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % yacht.gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + yacht.gallery.length) % yacht.gallery.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#09121a] border border-[#d4a359]/40 rounded-2xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[92vh]">
        {/* Modal Header Bar */}
        <div className="px-6 py-4 bg-[#0c1824] border-b border-[#1b2f42] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/40 text-[#d4a359] text-[11px] font-bold uppercase tracking-wider">
              {yacht.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-luxury uppercase tracking-wide">
              {yacht.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => (comparing ? removeFromCompare(yacht.id) : addToCompare(yacht.id))}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                comparing
                  ? 'bg-[#d4a359] text-[#0a1219] border-[#d4a359] font-bold'
                  : 'bg-[#081018] text-slate-300 border-[#1b2f42] hover:text-white'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleFavorite(yacht.id)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                favorited
                  ? 'bg-rose-500 text-white border-rose-400'
                  : 'bg-[#081018] text-slate-300 border-[#1b2f42] hover:text-rose-400'
              }`}
              title="Save"
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={closeDetailModal}
              className="p-2 rounded-full bg-[#081018] border border-[#1b2f42] text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Gallery Carousel */}
          <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 bg-[#060c12]">
            <img
              src={yacht.gallery[activeImageIndex] || yacht.featuredImage}
              alt={`${yacht.name} view ${activeImageIndex + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09121a]/80 via-transparent to-transparent" />

            {/* Nav Arrows */}
            {yacht.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Gallery Thumbnails Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto p-1 bg-black/50 backdrop-blur-md rounded-lg max-w-fit border border-slate-700/50">
              {yacht.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-8 rounded overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#d4a359] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#0b1622] border border-[#1b2f42]">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Length</span>
              <span className="text-sm font-bold text-white font-luxury">{yacht.specs.lengthFeet} ft</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b1622] border border-[#1b2f42]">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Max Guests</span>
              <span className="text-sm font-bold text-white font-luxury">{yacht.guestsMax} Guests</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b1622] border border-[#1b2f42]">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Cabins</span>
              <span className="text-sm font-bold text-white font-luxury">{yacht.cabins} Cabins</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0b1622] border border-[#1b2f42]">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Starting Rate</span>
              <span className="text-sm font-bold text-[#d4a359] font-luxury">{yacht.priceDisplay.replace('Starting from ', '')}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#1b2f42] space-x-6 text-xs font-bold uppercase tracking-wider">
            {(['overview', 'specs', 'amenities', 'crew'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 relative transition-colors cursor-pointer ${
                  activeTab === tab ? 'text-[#d4a359]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4a359]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white font-luxury uppercase tracking-wide mb-1.5">
                  About {yacht.name}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">{yacht.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white font-luxury uppercase tracking-wide mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#d4a359]" />
                  <span>Highlights</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {yacht.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a359] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0b1622] border border-[#1b2f42] flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#d4a359] flex-shrink-0" />
                <span className="text-xs text-slate-300">
                  <strong className="text-white">Boarding Location:</strong> {yacht.homePort} (Opposite Taj Mahal Palace)
                </span>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-luxury uppercase tracking-wide mb-2">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                  <span className="text-slate-400 block mb-1">Length:</span>
                  <span className="font-semibold text-white">{yacht.specs.lengthFeet} ft ({yacht.specs.lengthMeters}m)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                  <span className="text-slate-400 block mb-1">Max Speed:</span>
                  <span className="font-semibold text-white">{yacht.specs.maxSpeedKnots || 20} Knots</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                  <span className="text-slate-400 block mb-1">Builder:</span>
                  <span className="font-semibold text-[#d4a359]">{yacht.specs.builder}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                  <span className="text-slate-400 block mb-1">Year Built:</span>
                  <span className="font-semibold text-white">{yacht.specs.yearBuilt}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                  <span className="text-slate-400 block mb-1">Engines:</span>
                  <span className="font-semibold text-white">{yacht.specs.engines}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                  <span className="text-slate-400 block mb-1">Cabin Config:</span>
                  <span className="font-semibold text-white">{yacht.specs.cabinsConfig}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white font-luxury uppercase tracking-wide mb-2">
                Onboard Amenities & Inclusions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {yacht.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0b1622] border border-[#1b2f42]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a359] flex-shrink-0" />
                    <span className="text-xs text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'crew' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white font-luxury uppercase tracking-wide mb-2">
                Captain & Crew
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {yacht.crew.map((member, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0b1622] border border-[#1b2f42] flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#d4a359]/50"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a359] block">
                        {member.role}
                      </span>
                      <h4 className="text-xs font-bold text-white">{member.name}</h4>
                      <p className="text-[11px] text-slate-400">
                        {member.experienceYears} Years Maritime Exp. • DG Shipping Certified
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="px-6 py-4 bg-[#0c1824] border-t border-[#1b2f42] flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price</span>
            <span className="text-xl font-bold font-luxury text-[#d4a359]">
              {yacht.priceDisplay}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={closeDetailModal}
              className="px-4 py-2 rounded-lg bg-[#081018] border border-slate-700 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                closeDetailModal();
                openBookingModal(yacht);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book This Yacht</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

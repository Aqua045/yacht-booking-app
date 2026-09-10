import React, { useState, useMemo, useEffect } from 'react';
import { Anchor, Star, Users, Gauge, Heart, Scale, ArrowUpRight, Sparkles, Check, Filter } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { YACHTS_DATA } from '../../data/yachts';

const CATEGORIES = [
  { label: 'All Fleet', value: 'All' },
  { label: 'Luxury', value: 'Luxury Yacht' },
  { label: 'Speedboats', value: 'Speed Boat' },
  { label: 'Sailing', value: 'Sailing Yacht' },
  { label: 'Party', value: 'Party Yacht' },
  { label: 'Superyacht', value: 'Superyacht' },
];

export const FleetShowcase: React.FC = () => {
  const {
    openBookingModal,
    openDetailModal,
    toggleFavorite,
    isFavorite,
    addToCompare,
    isComparing,
    formatCurrency,
    currentUser,
    setIsAuthModalOpen,
  } = useBooking();

  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [maxGuestFilter, setMaxGuestFilter] = useState<number>(0);

  // Listen for category filter and search events
  useEffect(() => {
    const categoryHandler = (e: Event) => {
      const cat = (e as CustomEvent).detail as string;
      setSelectedCategory(cat);
    };
    const searchHandler = (e: Event) => {
      const { destination, guestCount } = (e as CustomEvent).detail || {};
      if (guestCount) setMaxGuestFilter(guestCount);
      if (destination && destination !== 'Mumbai') setSearchQuery(destination);
    };

    window.addEventListener('yachtway:filterCategory', categoryHandler);
    window.addEventListener('yachtway:searchFleet', searchHandler);
    return () => {
      window.removeEventListener('yachtway:filterCategory', categoryHandler);
      window.removeEventListener('yachtway:searchFleet', searchHandler);
    };
  }, []);

  const filteredYachts = useMemo(() => {
    return YACHTS_DATA.filter((yacht) => {
      if (selectedCategory !== 'All' && yacht.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !yacht.name.toLowerCase().includes(q) &&
          !yacht.homePort.toLowerCase().includes(q) &&
          !yacht.category.toLowerCase().includes(q) &&
          !yacht.description.toLowerCase().includes(q)
        ) return false;
      }
      if (maxGuestFilter > 0 && yacht.guestsMax < maxGuestFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy, maxGuestFilter]);

  useScrollReveal([filteredYachts]);

  const handleFavorite = (yachtId: string, yachtName: string) => {
    if (!currentUser) {
      showToast('warning', 'Sign in to save favourites', 'Create a free account to build your wishlist.');
      setIsAuthModalOpen(true);
      return;
    }
    const wasAlreadyFav = isFavorite(yachtId);
    toggleFavorite(yachtId);
    showToast(
      wasAlreadyFav ? 'info' : 'success',
      wasAlreadyFav ? 'Removed from Wishlist' : 'Saved to Wishlist',
      yachtName,
    );
  };

  const handleBook = (yacht: typeof YACHTS_DATA[0]) => {
    if (!currentUser) {
      showToast('warning', 'Sign in to book a charter', 'Create your account to begin the reservation.');
      setIsAuthModalOpen(true);
      return;
    }
    openBookingModal(yacht);
  };

  return (
    <section id="fleet" className="py-24 bg-[#04090f] relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#d4a359]/4 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/25 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span className="text-[10px] font-bold text-[#d4a359] uppercase tracking-widest">Exclusive Charter Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-luxury leading-tight">
              Curated Yacht Collection
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-lg">
              Handpicked luxury vessels at Gateway of India — sunset cruises, birthday charters & corporate voyages.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-6 px-6 py-3 rounded-2xl bg-[#091420] border border-[#1b2f42] text-xs flex-shrink-0">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Available</span>
              <span className="text-xl font-bold font-luxury text-[#d4a359]">{YACHTS_DATA.length} Yachts</span>
            </div>
            <div className="h-8 w-px bg-[#1b2f42]" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Crewed</span>
              <span className="text-xl font-bold font-luxury text-emerald-400">100% Verified</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-12 reveal reveal-delay-1">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#d4a359] text-[#081018] shadow-lg'
                      : 'bg-[#091420] border border-[#1b2f42] text-slate-300 hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {cat.label}
                  {isActive && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>

          {/* Search + Sort + Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl bg-[#08111a] border border-[#1b2f42]">
            <input
              type="text"
              placeholder="Search yachts by name, type, or port..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sm:col-span-6 bg-[#0d1c2b] border border-[#1b2f42] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359] transition-colors"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="sm:col-span-3 bg-[#0d1c2b] border border-[#1b2f42] rounded-lg px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-[#d4a359] cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <select
              value={maxGuestFilter}
              onChange={(e) => setMaxGuestFilter(Number(e.target.value))}
              className="sm:col-span-3 bg-[#0d1c2b] border border-[#1b2f42] rounded-lg px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-[#d4a359] cursor-pointer"
            >
              <option value={0}>All Group Sizes</option>
              <option value={4}>4+ Guests</option>
              <option value={8}>8+ Guests</option>
              <option value={15}>15+ Guests</option>
              <option value={30}>30+ Guests</option>
            </select>
          </div>
        </div>

        {/* Yacht Cards */}
        {filteredYachts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {filteredYachts.map((yacht, i) => {
              const isFav = isFavorite(yacht.id);
              const isComp = isComparing(yacht.id);

              return (
                <div
                  key={yacht.id}
                  className={`reveal reveal-delay-${(i % 3) + 1} card-shine group relative bg-[#091420] border border-[#1b2f42] hover:border-[#d4a359]/50 rounded-2xl overflow-hidden transition-all duration-300 sm:hover:-translate-y-1.5 shadow-lg flex flex-col`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0a1219]">
                    <img
                      src={yacht.featuredImage}
                      alt={yacht.name}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = '/images/yachts/ocean-majesty.png';
                      }}
                      className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091420] via-transparent to-black/30" />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                      <div className="flex flex-col gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-[#081018]/85 border border-white/10 text-[10px] font-bold text-[#d4a359] uppercase tracking-wider">
                          {yacht.category}
                        </span>
                        {yacht.instantBookable && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-950/85 border border-emerald-500/30 text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                            ⚡ Instant Book
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => addToCompare(yacht.id)}
                          title="Compare"
                          className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                            isComp
                              ? 'bg-[#d4a359] text-[#081018] border-[#d4a359]'
                              : 'bg-[#081018]/85 border-white/10 text-slate-300 hover:border-[#d4a359] hover:text-white'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFavorite(yacht.id, yacht.name)}
                          title="Save to Wishlist"
                          className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                            isFav
                              ? 'bg-rose-500 text-white border-rose-500'
                              : 'bg-[#081018]/85 border-white/10 text-slate-300 hover:border-rose-400 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#081018]/88 border border-white/10 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{yacht.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({yacht.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-bold font-luxury text-white group-hover:text-[#d4a359] transition-colors leading-tight">
                        {yacht.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{yacht.description}</p>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1b2f42] text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#d4a359]" />
                        <span>{yacht.guestsMax} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-[#d4a359]" />
                        <span>{yacht.specs.lengthFeet}ft</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Anchor className="w-3.5 h-3.5 text-[#d4a359]" />
                        <span>{yacht.crewCount} Crew</span>
                      </div>
                    </div>

                    {/* Price + Actions */}
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-bold block">Charter from</span>
                        <span className="text-base font-bold font-luxury text-[#d4a359]">
                          {formatCurrency(yacht.pricePerDay)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetailModal(yacht)}
                          title="View Details"
                          className="p-2.5 rounded-xl bg-[#0d1c2b] border border-[#1b2f42] hover:border-slate-500 text-slate-300 hover:text-white cursor-pointer transition-colors"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleBook(yacht)}
                          className="px-5 py-2.5 rounded-xl bg-[#d4a359] hover:bg-[#c8922a] active:scale-[0.97] text-[#081018] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-[#091420] border border-[#1b2f42] rounded-2xl max-w-md mx-auto reveal">
            <Filter className="w-10 h-10 text-[#d4a359] mx-auto opacity-60" />
            <h3 className="text-lg font-bold text-white font-luxury">No Yachts Match Your Filters</h3>
            <p className="text-xs text-slate-400 px-6">Try a different category or clear your search query.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setMaxGuestFilter(0); }}
              className="px-5 py-2 rounded-xl bg-[#d4a359] text-[#081018] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

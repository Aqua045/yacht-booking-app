import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Ship, Anchor, Sparkles, Check } from 'lucide-react';
import { YACHTS_DATA } from '../../data/yachts';
import { YachtCard } from './YachtCard';
import { useBooking } from '../../context/BookingContext';
import { YachtCategory } from '../../types/yacht';

export const FleetCatalog: React.FC = () => {
  const { filters, setFilters, resetFilters, formatCurrency } = useBooking();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: ('All' | YachtCategory)[] = [
    'All',
    'Luxury Yacht',
    'Speed Boat',
    'Sailing Yacht',
    'Party Yacht',
  ];

  const destinations = [
    'All',
    'Gateway of India',
    'Alibaug',
    'Elephanta Island',
    'Mandwa Beach',
  ];

  // Filtered yachts logic
  const filteredYachts = useMemo(() => {
    return YACHTS_DATA.filter((yacht) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = yacht.name.toLowerCase().includes(q);
        const matchTagline = yacht.tagline.toLowerCase().includes(q);
        const matchPort = yacht.homePort.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchPort) return false;
      }

      // Category
      if (filters.category !== 'All' && yacht.category !== filters.category) {
        return false;
      }

      // Destination
      if (filters.destination !== 'All' && !yacht.destinations.includes(filters.destination)) {
        return false;
      }

      // Min guests
      if (yacht.guestsMax < filters.minGuests) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return (a.pricePerHour || 0) - (b.pricePerHour || 0);
      if (filters.sortBy === 'price-desc') return (b.pricePerHour || 0) - (a.pricePerHour || 0);
      if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [filters]);

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.category !== 'All' ||
    filters.destination !== 'All' ||
    filters.minGuests > 1;

  return (
    <section id="fleet-catalog" className="py-20 bg-[#060c12] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#d4a359] uppercase mb-2">
            COMPLETE FLEET DIRECTORY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-luxury uppercase tracking-tight">
            Explore All Mumbai Yachts
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Filter our verified fleet by category, passenger capacity, and preferred coastal route.
          </p>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                filters.category === cat
                  ? 'bg-[#d4a359] text-[#0a1219] shadow-md font-bold'
                  : 'bg-[#0b1622] text-slate-300 border border-[#1b2f42] hover:border-[#d4a359]/40 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Fleet' : cat}
            </button>
          ))}
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-xl bg-[#0b1622] border border-[#1b2f42] mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search yachts by name, type, or destination..."
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0e1e2e] border border-[#1b3044] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a359]"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Destination Dropdown */}
            <select
              value={filters.destination}
              onChange={(e) => setFilters((prev) => ({ ...prev, destination: e.target.value }))}
              className="px-3 py-2 rounded-lg bg-[#0e1e2e] border border-[#1b3044] text-xs text-slate-200 focus:outline-none focus:border-[#d4a359] cursor-pointer"
            >
              <option value="All">All Destinations</option>
              {destinations.filter((d) => d !== 'All').map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-3 py-2 rounded-lg bg-[#0e1e2e] border border-[#1b3044] text-xs text-slate-200 focus:outline-none focus:border-[#d4a359] cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-lg bg-[#0e1e2e] border border-[#1b3044] text-slate-400 hover:text-rose-400 cursor-pointer"
                title="Reset filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Fleet Grid */}
        {filteredYachts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredYachts.map((yacht) => (
              <YachtCard key={yacht.id} yacht={yacht} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0b1622] rounded-xl border border-[#1b2f42]">
            <Ship className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-luxury text-white">No Yachts Found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Try adjusting your category or destination filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-lg bg-[#d4a359] text-[#0a1219] font-bold text-xs uppercase tracking-wider hover:bg-[#caa055] transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

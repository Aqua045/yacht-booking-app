import React, { createContext, useContext, useState, useEffect } from 'react';
import { Yacht, ConfirmedBooking, Currency, FilterState, UserProfile } from '../types/yacht';
import { YACHTS_DATA } from '../data/yachts';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { bookingService } from '../services/bookingService';

export interface QuickBookingParams {
  destination: string;
  startDate: string;
  timeSlot: string;
  guestCount: number;
  duration: string;
}

interface BookingContextType {
  currentUser: UserProfile | null;
  authLoading: boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatCurrency: (amountInINR: number) => string;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;

  // Modals & Drawers
  activeBookingYacht: Yacht | null;
  bookingInitialParams: QuickBookingParams;
  setBookingInitialParams: React.Dispatch<React.SetStateAction<QuickBookingParams>>;
  openBookingModal: (yacht?: Yacht, customParams?: Partial<QuickBookingParams>) => void;
  closeBookingModal: () => void;

  selectedDetailYacht: Yacht | null;
  openDetailModal: (yacht: Yacht) => void;
  closeDetailModal: () => void;

  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  isBookingsModalOpen: boolean;
  setIsBookingsModalOpen: (open: boolean) => void;

  isCustomInquiryOpen: boolean;
  setIsCustomInquiryOpen: (open: boolean) => void;

  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  // Bookings
  confirmedBookings: ConfirmedBooking[];
  addConfirmedBooking: (booking: ConfirmedBooking) => void;
  cancelBooking: (bookingId: string) => void;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
}

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: boolean }> = {
  INR: { rate: 1.0, symbol: '₹', prefix: true },
  USD: { rate: 0.012, symbol: '$', prefix: true },
  EUR: { rate: 0.011, symbol: '€', prefix: true },
  AED: { rate: 0.044, symbol: 'AED ', prefix: true },
};

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  destination: 'All',
  timeSlot: 'All',
  minPrice: 0,
  maxPrice: 50000,
  minGuests: 1,
  sortBy: 'recommended',
};

const getDefaultTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [activeBookingYacht, setActiveBookingYacht] = useState<Yacht | null>(null);
  const [selectedDetailYacht, setSelectedDetailYacht] = useState<Yacht | null>(null);

  const [bookingInitialParams, setBookingInitialParams] = useState<QuickBookingParams>({
    destination: 'Mumbai',
    startDate: getDefaultTomorrowDate(),
    timeSlot: '04:30 PM - Sunset Cruise (Popular)',
    guestCount: 2,
    duration: '1 Hour',
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isCustomInquiryOpen, setIsCustomInquiryOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>([]);

  // ─── Listen to Supabase Auth Session Changes ──────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      // No Supabase: just clear everything and stop loading
      setCurrentUser(null);
      setAuthLoading(false);
      return;
    }

    // Bootstrap: get any existing session on page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        setCurrentUser({
          id: u.id,
          email: u.email || '',
          name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Guest',
          avatar: u.user_metadata?.avatar_url,
        });
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    // Subscribe to future auth changes (login/logout/email confirm)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setCurrentUser({
          id: u.id,
          email: u.email || '',
          name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Guest',
          avatar: u.user_metadata?.avatar_url,
        });
      } else {
        setCurrentUser(null);
        setConfirmedBookings([]);
        setFavorites([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ─── Load user-scoped data when user changes ─────────────────────────────
  useEffect(() => {
    if (!currentUser?.id) {
      setConfirmedBookings([]);
      setFavorites([]);
      return;
    }

    bookingService.getBookings(currentUser.id).then(loaded => {
      setConfirmedBookings(loaded || []);
    });

    bookingService.getFavorites(currentUser.id).then(favs => {
      setFavorites(favs || []);
    });
  }, [currentUser?.id]);

  const logout = async () => {
    await bookingService.signOut();
    // onAuthStateChange will clear state automatically
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
  };

  const formatCurrency = (amountInINR: number): string => {
    const config = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
    const converted = Math.round(amountInINR * config.rate);
    if (currency === 'INR') {
      return `${config.symbol}${converted.toLocaleString('en-IN')}`;
    }
    return `${config.symbol}${converted.toLocaleString()}`;
  };

  const toggleFavorite = (id: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setFavorites((prev: string[]) => {
      const willBeFav = !prev.includes(id);
      bookingService.toggleFavorite(id, willBeFav, currentUser.id);
      return willBeFav ? [...prev, id] : prev.filter((item: string) => item !== id);
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToCompare = (id: string) => {
    setCompareList((prev: string[]) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 yachts simultaneously.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev: string[]) => prev.filter((item: string) => item !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isComparing = (id: string) => compareList.includes(id);

  const openBookingModal = (yacht?: Yacht, customParams?: Partial<QuickBookingParams>) => {
    if (customParams) {
      setBookingInitialParams((prev: QuickBookingParams) => ({ ...prev, ...customParams }));
    }
    setActiveBookingYacht(yacht || YACHTS_DATA[0]);
  };

  const closeBookingModal = () => {
    setActiveBookingYacht(null);
  };

  const openDetailModal = (yacht: Yacht) => {
    setSelectedDetailYacht(yacht);
  };

  const closeDetailModal = () => {
    setSelectedDetailYacht(null);
  };

  const addConfirmedBooking = (booking: ConfirmedBooking) => {
    if (!currentUser) return;
    const bookingWithUser = {
      ...booking,
      customerEmail: currentUser.email,
      customerName: currentUser.name,
    };
    setConfirmedBookings((prev: ConfirmedBooking[]) => [bookingWithUser, ...prev]);
    bookingService.saveBooking(bookingWithUser, currentUser.id);
  };

  const cancelBooking = (bookingId: string) => {
    if (!currentUser) return;
    setConfirmedBookings((prev: ConfirmedBooking[]) => prev.filter((b: ConfirmedBooking) => b.bookingId !== bookingId));
    bookingService.cancelBooking(bookingId, currentUser.id);
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <BookingContext.Provider
      value={{
        currentUser,
        authLoading,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        currency,
        setCurrency,
        formatCurrency,
        favorites,
        toggleFavorite,
        isFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        activeBookingYacht,
        bookingInitialParams,
        setBookingInitialParams,
        openBookingModal,
        closeBookingModal,
        selectedDetailYacht,
        openDetailModal,
        closeDetailModal,
        isWishlistOpen,
        setIsWishlistOpen,
        isBookingsModalOpen,
        setIsBookingsModalOpen,
        isCustomInquiryOpen,
        setIsCustomInquiryOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        confirmedBookings,
        addConfirmedBooking,
        cancelBooking,
        filters,
        setFilters,
        resetFilters,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export type YachtCategory = 'Luxury Yacht' | 'Speed Boat' | 'Sailing Yacht' | 'Party Yacht' | 'Superyacht' | 'Motor Yacht' | 'Luxury Catamaran';

export interface YachtSpecs {
  lengthMeters: number;
  lengthFeet: number;
  beam?: number; // in meters
  draft?: number; // in meters
  cruisingSpeedKnots?: number;
  maxSpeedKnots?: number;
  builder?: string;
  yearBuilt?: number;
  yearRefit?: number;
  engines?: string;
  staterooms?: number;
  cabinsConfig?: string;
}

export interface CrewMember {
  role: string;
  name: string;
  experienceYears: number;
  nationality: string;
  avatar: string;
}

export interface Yacht {
  id: string;
  name: string;
  tagline: string;
  category: YachtCategory;
  pricePerPerson?: number; // in INR
  pricePer3Hours?: number; // in INR
  pricePerHour?: number; // in INR
  pricePerDay: number; // in INR
  priceDisplay: string; // e.g. "Starting from ₹300 / Person"
  guestsMax: number;
  crewCount: number;
  cabins: number;
  isPrivateRide?: boolean;
  homePort: string;
  destinations: string[];
  featuredImage: string;
  gallery: string[];
  deckPlanImage?: string;
  description: string;
  highlights: string[];
  specs: YachtSpecs;
  amenities: string[];
  crew: CrewMember[];
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  instantBookable?: boolean;
}

export interface VIPAddOn {
  id: string;
  name: string;
  category: 'celebration' | 'culinary' | 'water_sports' | 'media' | 'entertainment';
  description: string;
  price: number; // in INR
  priceType: 'fixed' | 'per_person' | 'per_hour';
  icon: string;
  image?: string;
}

export interface DestinationItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  estimatedTime: string;
  highlights: string[];
}

export interface ItineraryStop {
  day: number;
  port: string;
  title: string;
  description: string;
  distanceNM: number;
  highlights: string[];
  image: string;
}

export interface CuratedItinerary {
  id: string;
  title: string;
  region: string;
  durationDays: number;
  totalDistanceNM: number;
  description: string;
  heroImage: string;
  stops: ItineraryStop[];
  recommendedYachtTypes: YachtCategory[];
}

export interface BookingDraft {
  yachtId: string;
  destination: string;
  startDate: string;
  timeSlot: string; // e.g. "04:30 PM - Sunset Cruise"
  duration: string; // e.g. "1 Hour", "2 Hours", "3 Hours"
  guestCount: number;
  selectedAddOns: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests: string;
  basePrice: number;
  taxAmount: number;
  addOnsAmount: number;
  totalAmount: number;
  paymentStatus?: 'Paid' | 'Pending' | 'Failed';
  paymentMethod?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  paidAt?: string;
}

export interface ConfirmedBooking extends BookingDraft {
  bookingId: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending Verification' | 'Completed';
  yachtName: string;
  yachtImage: string;
  yachtCategory: YachtCategory;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'AED';

export interface FilterState {
  searchQuery: string;
  category: string; // 'All' or specific
  destination: string; // 'All' or specific
  timeSlot: string;
  minPrice: number;
  maxPrice: number;
  minGuests: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | 'recommended';
}

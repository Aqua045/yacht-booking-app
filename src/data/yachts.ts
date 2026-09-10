import { Yacht } from '../types/yacht';

export const YACHTS_DATA: Yacht[] = [
  {
    id: 'ocean-majesty',
    name: 'OCEAN MAJESTY',
    tagline: 'Elegant luxury yacht with premium interiors and spacious seating',
    category: 'Luxury Yacht',
    pricePerPerson: 300,
    pricePerHour: 2400,
    pricePerDay: 18000,
    priceDisplay: 'Starting from ₹300 / Person',
    guestsMax: 7,
    crewCount: 2,
    cabins: 2,
    homePort: 'Gateway of India, Mumbai',
    destinations: ['Gateway of India', 'Alibaug', 'Mandwa Beach', 'Elephanta Island'],
    featuredImage: '/images/yachts/ocean-majesty.png',
    gallery: [
      '/images/yachts/ocean-majesty.png',
      '/images/yachts/royal-horizon.png',
      '/images/yachts/blue-infinity.png',
      '/images/yachts/majestic-empress.png'
    ],
    description: 'Enjoy breathtaking sunset cruises aboard our elegant luxury yacht with premium interiors and spacious seating. Ideal for intimate gatherings, couples, and family excursions across the Arabian Sea.',
    highlights: [
      'Panoramic 360° open sundeck with plush lounge cushions',
      'Air-conditioned lower saloon cabin with Bluetooth surround sound',
      'Complimentary welcome mocktail and mineral water',
      'Certified master captain and dedicated deckhand for supreme safety'
    ],
    specs: {
      lengthMeters: 12.5,
      lengthFeet: 41,
      beam: 3.8,
      draft: 1.1,
      cruisingSpeedKnots: 14,
      maxSpeedKnots: 20,
      builder: 'Searay Marine',
      yearBuilt: 2021,
      yearRefit: 2024,
      engines: 'Twin Cummins 380HP Marine Diesel',
      staterooms: 2,
      cabinsConfig: '1 Master Bedroom, 1 Guest Cabin, 1 Restroom'
    },
    amenities: [
      'Air Conditioned Cabin',
      'Bluetooth Hi-Fi Sound System',
      'Sunbed & Deck Seating',
      'Safety Life Vests',
      'First Aid & Marine Radio',
      'Complimentary Refreshments'
    ],
    crew: [
      {
        role: 'Master Captain',
        name: 'Capt. Rajesh Patil',
        experienceYears: 16,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      },
      {
        role: 'First Mate & Steward',
        name: 'Amit Sharma',
        experienceYears: 8,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    rating: 4.96,
    reviewsCount: 128,
    isFeatured: true,
    instantBookable: true,
  },
  {
    id: 'royal-horizon',
    name: 'ROYAL HORIZON',
    tagline: 'Perfect for birthdays, proposals and private celebrations with complete privacy',
    category: 'Luxury Yacht',
    pricePer3Hours: 2500,
    pricePerHour: 1000,
    pricePerDay: 15000,
    priceDisplay: 'Starting from ₹2500 / 3 Hours',
    guestsMax: 4,
    crewCount: 2,
    cabins: 1,
    isPrivateRide: true,
    homePort: 'Gateway of India, Mumbai',
    destinations: ['Gateway of India', 'Mandwa Beach', 'Alibaug'],
    featuredImage: '/images/yachts/royal-horizon.png',
    gallery: [
      '/images/yachts/royal-horizon.png',
      '/images/yachts/ocean-majesty.png',
      '/images/yachts/blue-infinity.png'
    ],
    description: 'Perfect for birthdays, proposals and private celebrations with complete privacy and luxury. Designed for exclusive private couples and small VIP groups wanting bespoke romance on the Mumbai waters.',
    highlights: [
      '100% Exclusive private charter guarantee',
      'Complimentary celebration cake cutting setup & romantic music',
      'Front deck sunset loungers with front-row view of Gateway of India',
      'Personalized route options towards Mandwa or Mumbai harbour'
    ],
    specs: {
      lengthMeters: 10.2,
      lengthFeet: 34,
      beam: 3.2,
      draft: 0.9,
      cruisingSpeedKnots: 16,
      maxSpeedKnots: 24,
      builder: 'Fairline Boats',
      yearBuilt: 2022,
      engines: 'Volvo Penta D6 330HP',
      staterooms: 1,
      cabinsConfig: '1 Private Romantic Suite, Washroom, Mini Lounge'
    },
    amenities: [
      'Private Suite',
      'Romantic Music System',
      'Sunset Deck Lounge',
      'Decorations on Request',
      'Bottled Water & Soft Drinks',
      'Life Jackets & First Aid'
    ],
    crew: [
      {
        role: 'Captain',
        name: 'Capt. Sunil Kadam',
        experienceYears: 12,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    rating: 4.98,
    reviewsCount: 94,
    isFeatured: true,
    instantBookable: true,
  },
  {
    id: 'blue-infinity',
    name: 'BLUE INFINITY',
    tagline: 'Experience VIP luxury with premium cabins, onboard dining and unforgettable ocean views',
    category: 'Party Yacht',
    pricePerPerson: 400,
    pricePerHour: 4500,
    pricePerDay: 32000,
    priceDisplay: 'Starting from ₹400 / Person',
    guestsMax: 15,
    crewCount: 4,
    cabins: 4,
    homePort: 'Gateway of India, Mumbai',
    destinations: ['Gateway of India', 'Alibaug', 'Elephanta Island', 'Mandwa Beach'],
    featuredImage: '/images/yachts/blue-infinity.png',
    gallery: [
      '/images/yachts/blue-infinity.png',
      '/images/yachts/majestic-empress.png',
      '/images/yachts/ocean-majesty.png'
    ],
    description: 'Experience VIP luxury with premium cabins, onboard dining and unforgettable ocean views. Equipped with dual-deck entertainment areas, premium sound systems, and spacious catering zones for up to 15 guests.',
    highlights: [
      'Dual deck flybridge with 360-degree Mumbai skyline panorama',
      '4 Luxury cabins with en-suite restrooms',
      'Spacious dance floor area & high-end sound setup with party lighting',
      'Onboard chef & steward service for gourmet catering'
    ],
    specs: {
      lengthMeters: 18.0,
      lengthFeet: 60,
      beam: 5.2,
      draft: 1.4,
      cruisingSpeedKnots: 15,
      maxSpeedKnots: 22,
      builder: 'Azimut Yachts',
      yearBuilt: 2020,
      yearRefit: 2024,
      engines: 'Twin MAN 800HP Diesels',
      staterooms: 4,
      cabinsConfig: '2 Master Suites, 2 Twin Cabins, 3 Restrooms'
    },
    amenities: [
      'Flybridge Terrace',
      '4 Luxury Cabins',
      'DJ & Party Sound System',
      'Onboard Dining Setup',
      'Air Conditioned Saloon',
      'Full Safety Equipment'
    ],
    crew: [
      {
        role: 'Captain',
        name: 'Capt. Vikram Merchant',
        experienceYears: 19,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      },
      {
        role: 'Chief Steward',
        name: 'Karan Mehra',
        experienceYears: 7,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80'
      }
    ],
    rating: 4.95,
    reviewsCount: 162,
    isFeatured: true,
    instantBookable: true,
  },
  {
    id: 'sea-princess-speedboat',
    name: 'SEA PRINCESS',
    tagline: 'High-speed thrilling coastal ride across Mumbai coastline & Mandwa',
    category: 'Speed Boat',
    pricePerHour: 2200,
    pricePerDay: 16000,
    priceDisplay: 'Starting from ₹2200 / Hour',
    guestsMax: 6,
    crewCount: 2,
    cabins: 0,
    isPrivateRide: true,
    homePort: 'Gateway of India, Mumbai',
    destinations: ['Gateway of India', 'Mandwa Beach', 'Alibaug'],
    featuredImage: '/images/yachts/sea-princess.png',
    gallery: [
      '/images/yachts/sea-princess.png',
      '/images/yachts/ocean-majesty.png'
    ],
    description: 'Enjoy fast and thrilling boat rides from Gateway of India to Mandwa / Alibaug in just 20 minutes! Powered by high-horsepower outboard engines with top-tier stability.',
    highlights: [
      'Swift 20-minute transfer to Mandwa / Alibaug',
      'Deep-V hull engineered for smooth wave cutting',
      'Padded luxury bucket seats with weather canopy',
      'Coast Guard approved life vests for all passengers'
    ],
    specs: {
      lengthMeters: 8.5,
      lengthFeet: 28,
      beam: 2.6,
      draft: 0.6,
      cruisingSpeedKnots: 28,
      maxSpeedKnots: 38,
      builder: 'Yamaha Marine',
      yearBuilt: 2023,
      engines: 'Twin Yamaha 250HP Four-Stroke',
      staterooms: 0,
      cabinsConfig: 'Open Cockpit with Sunshade Canopy'
    },
    amenities: [
      'High Speed Twin Engines',
      'Waterproof Audio System',
      'Sun Canopy',
      'Life Jackets',
      'Instant Pier Boarding'
    ],
    crew: [
      {
        role: 'Skipper',
        name: 'Capt. Dinesh Tandel',
        experienceYears: 10,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      }
    ],
    rating: 4.92,
    reviewsCount: 88,
    isFeatured: false,
    instantBookable: true,
  },
  {
    id: 'arabian-pearl-sailing',
    name: 'ARABIAN PEARL',
    tagline: 'Peaceful sailing experience discovering serene ocean views of Mumbai',
    category: 'Sailing Yacht',
    pricePerHour: 1800,
    pricePerDay: 14000,
    priceDisplay: 'Starting from ₹1800 / Hour',
    guestsMax: 8,
    crewCount: 2,
    cabins: 1,
    isPrivateRide: true,
    homePort: 'Gateway of India, Mumbai',
    destinations: ['Gateway of India', 'Elephanta Island'],
    featuredImage: '/images/yachts/arabian-pearl.png',
    gallery: [
      '/images/yachts/arabian-pearl.png',
      '/images/yachts/ocean-majesty.png'
    ],
    description: 'Feel the wind and serenity of the open sea with our premier French Jeanneau sailing boat. Experience quiet tranquility, gliding with billowing white sails under Mumbai golden hour.',
    highlights: [
      'Eco-friendly wind propulsion with auxiliary quiet diesel motor',
      'Spacious teak deck cockpit with comfortable lounging cushions',
      'Sail hoisting demonstration by captain for sailing enthusiasts',
      'Sunset champagne & snack table setup'
    ],
    specs: {
      lengthMeters: 10.5,
      lengthFeet: 35,
      beam: 3.4,
      draft: 1.6,
      cruisingSpeedKnots: 7,
      maxSpeedKnots: 10,
      builder: 'Jeanneau France',
      yearBuilt: 2021,
      engines: 'Yanmar 29HP Saildrive',
      staterooms: 1,
      cabinsConfig: '1 Cabin Lounge & Marine Head'
    },
    amenities: [
      'Authentic Rigging & White Sails',
      'Teak Sun Deck',
      'Bluetooth Speaker',
      'Marine Restroom',
      'Refreshments on Board'
    ],
    crew: [
      {
        role: 'Sailing Master',
        name: 'Capt. Cyrus Wadia',
        experienceYears: 22,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      }
    ],
    rating: 4.97,
    reviewsCount: 76,
    isFeatured: false,
    instantBookable: true,
  },
  {
    id: 'majestic-empress',
    name: 'MAJESTIC EMPRESS',
    tagline: 'Grand party yacht for birthdays, weddings, family reunions & corporate events',
    category: 'Party Yacht',
    pricePerHour: 6500,
    pricePerDay: 48000,
    priceDisplay: 'Starting from ₹6500 / Hour',
    guestsMax: 30,
    crewCount: 5,
    cabins: 3,
    isPrivateRide: true,
    homePort: 'Gateway of India, Mumbai',
    destinations: ['Gateway of India', 'Alibaug', 'Mandwa Beach', 'Elephanta Island'],
    featuredImage: '/images/yachts/majestic-empress.png',
    gallery: [
      '/images/yachts/majestic-empress.png',
      '/images/yachts/blue-infinity.png'
    ],
    description: 'Celebrate your special moments with Mumbai’s grandest double-deck party yacht. Capable of hosting up to 30 guests with full banquet catering, party lighting, DJ sound system, and open air upper terrace.',
    highlights: [
      'Expansive upper deck dance floor with starry sky view',
      'Full catering station with buffet setup and beverage bar',
      'Dedicated DJ console & laser party lights',
      'Air conditioned lower luxury lounge for relaxation'
    ],
    specs: {
      lengthMeters: 22.0,
      lengthFeet: 72,
      beam: 6.0,
      draft: 1.5,
      cruisingSpeedKnots: 12,
      maxSpeedKnots: 18,
      builder: 'Custom Marine India',
      yearBuilt: 2022,
      yearRefit: 2024,
      engines: 'Twin Caterpillar 600HP',
      staterooms: 3,
      cabinsConfig: '3 VIP Rooms, 4 Restrooms, Grand Salon'
    },
    amenities: [
      'Double Deck Layout',
      'DJ Sound & Lighting',
      'Air Conditioned Lounge',
      'Buffet Dining Area',
      'Dedicated Steward Staff',
      'Customized Decoration Setup'
    ],
    crew: [
      {
        role: 'Cruise Director',
        name: 'Siddharth Roy',
        experienceYears: 14,
        nationality: 'Indian',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      }
    ],
    rating: 4.99,
    reviewsCount: 210,
    isFeatured: false,
    instantBookable: true,
  }
];

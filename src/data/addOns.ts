import { VIPAddOn } from '../types/yacht';

export const VIP_ADDONS: VIPAddOn[] = [
  {
    id: 'birthday-decor-cake',
    name: 'Birthday / Anniversary Celebration Pack',
    category: 'celebration',
    description: 'Fresh 1kg Designer Chocolate/Red Velvet Cake, Helium Balloons, Floral Bouquet & "Happy Birthday" Deck Banner.',
    price: 1800,
    priceType: 'fixed',
    icon: 'Cake',
  },
  {
    id: 'sunset-drone-photo',
    name: 'Professional Sunset Photography & 4K Drone Shoot',
    category: 'media',
    description: 'Dedicated professional maritime photographer with high-res edited photos (50+ pictures) & cinematic 4K drone video clip.',
    price: 3500,
    priceType: 'fixed',
    icon: 'Camera',
  },
  {
    id: 'live-guitarist',
    name: 'Live Acoustic Guitarist & Singer',
    category: 'entertainment',
    description: 'Professional romantic musician on board performing Bollywood & Western acoustic melodies during golden hour.',
    price: 4000,
    priceType: 'fixed',
    icon: 'Music',
  },
  {
    id: 'gourmet-snacks-mocktails',
    name: 'Gourmet High-Tea & Seafood / Veg Platter',
    category: 'culinary',
    description: 'Assorted artisan sandwiches, kebabs, french fries, exotic fruits, and sparkling non-alcoholic champagne/mocktails.',
    price: 450,
    priceType: 'per_person',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'mandwa-watersports-pack',
    name: 'Mandwa Water Sports Combo (Jet Ski & Banana Ride)',
    category: 'water_sports',
    description: 'Add 30 mins thrilling Jet Skiing, Bumper ride, and Banana boat session at Mandwa / Alibaug beach stop.',
    price: 1200,
    priceType: 'per_person',
    icon: 'Waves',
  },
  {
    id: 'luxury-red-carpet-welcome',
    name: 'VIP Pier Red Carpet & Champagne Toast',
    category: 'celebration',
    description: 'VIP pier boarding escort, personalized flower shower, and welcome sparkling toast on yacht arrival.',
    price: 2200,
    priceType: 'fixed',
    icon: 'Sparkles',
  }
];

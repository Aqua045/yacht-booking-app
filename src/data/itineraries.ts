import { CuratedItinerary } from '../types/yacht';

export const CURATED_ITINERARIES: CuratedItinerary[] = [
  {
    id: 'french-riviera-glamour',
    title: 'French Riviera & Côte d’Azur Grand Odyssey',
    region: 'French Riviera & Monaco',
    durationDays: 7,
    totalDistanceNM: 140,
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'Cruise the playground of royalty and Hollywood icons from glamorous Monaco through Cannes, Saint-Tropez, and the secluded Golden Isles of Porquerolles.',
    recommendedYachtTypes: ['Superyacht', 'Motor Yacht'],
    stops: [
      {
        day: 1,
        port: 'Port Hercule, Monaco',
        title: 'Boarding & Casino Night in Monte Carlo',
        description: 'Welcome champagne reception aboard, explore Monte Carlo casino and dine at Louis XV.',
        distanceNM: 0,
        highlights: ['Helipad transfer', 'Monte Carlo Casino', 'Private Michelin Dinner'],
        image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        port: 'Cap d’Ail & Saint-Jean-Cap-Ferrat',
        title: 'Hidden Coves & Villa Ephrussi',
        description: 'Anchor in turquoise bays, water skiing and private tour of coastal historic palazzos.',
        distanceNM: 12,
        highlights: ['Paloma Beach Club', 'SeaBob diving', 'Grand cliff views'],
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        port: 'Cannes & Îles de Lérins',
        title: 'La Croisette & Monastery Island',
        description: 'Anchor between Sainte-Marguerite and Saint-Honorat for crystal swimming and monastery wine tasting.',
        distanceNM: 22,
        highlights: ['Underwater sculpture museum', 'Vineyard wine tasting', 'La Guérite beach club'],
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 4,
        port: 'Saint-Tropez & Pampelonne Beach',
        title: 'Club 55 & Sunset in the Old Port',
        description: 'Tender ashore to Nikki Beach and Club 55, followed by evening shopping and nightlife.',
        distanceNM: 28,
        highlights: ['VIP Table at Club 55', 'Cobblestone boutique stroll', 'Sunset cocktails'],
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 5,
        port: 'Îles d’Hyères (Porquerolles)',
        title: 'The Untouched Golden Islands',
        description: 'Protected marine reserve with Caribbean-like waters, pine forests, and eFoil surfing.',
        distanceNM: 35,
        highlights: ['Plage Notre-Dame', 'Marine sanctuary snorkeling', 'Secluded vineyard cycling'],
        image: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'amalfi-capri-enchantment',
    title: 'Amalfi Coast, Capri & Ischia Enchantment',
    region: 'Amalfi Coast & Southern Italy',
    durationDays: 5,
    totalDistanceNM: 95,
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'Dramatic limestone cliffs, pastel-hued cliffside towns, the Blue Grotto of Capri, and the aroma of fresh lemons along the divine Tyrrhenian coast.',
    recommendedYachtTypes: ['Superyacht', 'Motor Yacht', 'Luxury Catamaran'],
    stops: [
      {
        day: 1,
        port: 'Marina Grande, Capri',
        title: 'Arrival & Faraglioni Sunset Cruise',
        description: 'Cruise right beneath the legendary Faraglioni sea stacks with sunset spritzes and cliffside dining.',
        distanceNM: 0,
        highlights: ['Faraglioni rock arch', 'Fontelina Beach Club', 'Piazza Umberto I'],
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        port: 'Positano Cliff Anchorage',
        title: 'Iconic Positano & Li Galli Sirens',
        description: 'Anchor in front of Positano’s cascading pastel homes, private tender ashore for dinner at Le Sirenuse.',
        distanceNM: 18,
        highlights: ['Le Sirenuse champagne terrace', 'Li Galli island snorkeling', 'Limoncello tasting'],
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        port: 'Amalfi & Ravello',
        title: 'Historic Maritime Republic & Cliff Villas',
        description: 'Explore Amalfi Cathedral, private limo up to Villa Cimbrone’s Terrace of Infinity in Ravello.',
        distanceNM: 14,
        highlights: ['Villa Rufolo gardens', 'Ravello panoramic views', 'Fiordo di Furore'],
        image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d17?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'greek-cyclades-voyage',
    title: 'Greek Cyclades: Mykonos, Paros & Santorini',
    region: 'Greek Islands & Aegean Sea',
    durationDays: 7,
    totalDistanceNM: 180,
    heroImage: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=1200&q=80',
    description: 'Sail through the sapphire waters of the Aegean Sea with whitewashed windmills, world-class beach clubs in Mykonos, and sunset in the caldera of Santorini.',
    recommendedYachtTypes: ['Luxury Catamaran', 'Sailing Yacht', 'Superyacht'],
    stops: [
      {
        day: 1,
        port: 'Mykonos New Port',
        title: 'Nammos Beach & Little Venice Sunset',
        description: 'Anchor off Psarou beach, luxury tender to Nammos and dancing as the sun sets over Mykonos windmills.',
        distanceNM: 0,
        highlights: ['Nammos Beach Club', 'Little Venice cocktails', 'Windmills photoshoot'],
        image: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        port: 'Delos & Rhenia Uninhabited Islands',
        title: 'Ancient Sanctuary of Apollo & Blue Lagoon',
        description: 'Snorkel in secluded turquoise coves and private archaeological tour on sacred Delos.',
        distanceNM: 15,
        highlights: ['UNESCO Ancient Delos', 'Deserted turquoise coves', 'Onboard BBQ'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        port: 'Santorini Caldera (Oia & Fira)',
        title: 'Volcanic Caldera & World-Famous Oia Sunset',
        description: 'Anchor right inside the volcanic caldera. Private wine tour in Megalochori and sunset from the flybridge.',
        distanceNM: 45,
        highlights: ['Volcanic hot springs', 'Santorini Assyrtiko wine', 'Private flybridge dining'],
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

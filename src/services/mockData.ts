import { Destination, Flight, Hotel, SpiderSenseAlert } from '../types/travel';

export const DESTINATIONS: Destination[] = [
  {
    id: 'dest-1',
    title: 'Queens NYC & Skyline Webs',
    location: 'New York, USA',
    category: 'Cyber',
    rating: 4.9,
    reviewsCount: 1420,
    pricePerNight: 180,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    description: 'Explore the high-altitude skyline where webs sling across Manhattan towers and Queens rooftops.',
    weather: '22°C Clear & Sunny',
    bestTimeToVisit: 'September - November',
    heroTag: 'Spidey Web Spot',
    attractions: ['Times Square Neon', 'Brooklyn Bridge Walk', 'Central Park Web Canopy', 'Queens Food Market']
  },
  {
    id: 'dest-2',
    title: 'Gotham Night Tower & Harbor',
    location: 'Gotham City / Chicago',
    category: 'Gotham City',
    rating: 4.95,
    reviewsCount: 2310,
    pricePerNight: 240,
    image: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse in the stealth aesthetic of dark architectural marvels, bat-wing skyline views, and high-tech nightlife.',
    weather: '16°C Cool Breeze',
    bestTimeToVisit: 'Year-Round Stealth Season',
    heroTag: 'Bat Cave Hideout',
    attractions: ['Wayne Tower Deck', 'Gotham Harbor Cruise', 'Dark Knight Alley Trail', 'Arkham Historical Vault']
  },
  {
    id: 'dest-3',
    title: 'Swiss Alps Bat-Wing Peak',
    location: 'Zermatt, Switzerland',
    category: 'Mountain',
    rating: 4.88,
    reviewsCount: 980,
    pricePerNight: 310,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    description: 'Glide through icy mountain cliffs with high-altitude alpine views and mountain retreat sanctuaries.',
    weather: '4°C Snowy Peak',
    bestTimeToVisit: 'December - March',
    heroTag: 'Wing Flight Hub',
    attractions: ['Matterhorn Summit Trail', 'Alpine Glider Launch', 'Snowy Chalet Spa', 'Glacier Ice Caverns']
  },
  {
    id: 'dest-4',
    title: 'Tokyo Cyber-Wing Metropolis',
    location: 'Tokyo, Japan',
    category: 'Cyber',
    rating: 4.92,
    reviewsCount: 3100,
    pricePerNight: 210,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    description: 'Neon-infused streets, high-tech train networks, and futuristic rooftop lounges.',
    weather: '20°C Mild',
    bestTimeToVisit: 'March - May / Oct - Nov',
    heroTag: 'Spidey Web Spot',
    attractions: ['Shibuya Crossing Highpoint', 'Akihabara Tech Alley', 'Roppongi Neon Rooftop', 'Mt. Fuji Express']
  },
  {
    id: 'dest-5',
    title: 'Bali Cyber Web Sanctuary',
    location: 'Ubud, Indonesia',
    category: 'Beach',
    rating: 4.85,
    reviewsCount: 1750,
    pricePerNight: 120,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Tropical paradise woven with green jungle web bridges, cliffside ocean infinity pools, and serene retreats.',
    weather: '28°C Tropical',
    bestTimeToVisit: 'April - October',
    heroTag: 'Top Rated',
    attractions: ['Uluwatu Cliff Sunset', 'Tegallalang Canopy Walk', 'Seminyak Surf Point', 'Sacred Forest Walk']
  }
];

export const FLIGHTS: Flight[] = [
  {
    id: 'fl-1',
    airline: 'Batwing Air',
    flightCode: 'BW-909',
    from: 'Gotham Int.',
    fromCode: 'GTH',
    to: 'Queens NYC',
    toCode: 'JFK',
    departureTime: '08:30 AM',
    arrivalTime: '10:45 AM',
    duration: '2h 15m',
    price: 189,
    seatsAvailable: 4,
    stealthMode: true
  },
  {
    id: 'fl-2',
    airline: 'Spidey Airways',
    flightCode: 'WEB-101',
    from: 'Queens NYC',
    fromCode: 'JFK',
    to: 'Tokyo Haneda',
    toCode: 'HND',
    departureTime: '01:15 PM',
    arrivalTime: '04:30 PM (+1)',
    duration: '14h 15m',
    price: 749,
    seatsAvailable: 8,
    stealthMode: false
  },
  {
    id: 'fl-3',
    airline: 'Batwing Air',
    flightCode: 'BW-777',
    from: 'Gotham Int.',
    fromCode: 'GTH',
    to: 'Zurich Swiss',
    toCode: 'ZRH',
    departureTime: '11:00 PM',
    arrivalTime: '01:20 PM (+1)',
    duration: '8h 20m',
    price: 620,
    seatsAvailable: 2,
    stealthMode: true
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'ht-1',
    name: 'Bat-Cave Luxury Stealth Suite',
    location: 'Gotham Downtown',
    rating: 4.96,
    pricePerNight: 280,
    amenities: ['Stealth Soundproofing', 'Private Roof Helipad', 'Bat-Signal Lounge', 'Sub-Zero Spa'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    badge: 'Bat Shelter'
  },
  {
    id: 'ht-2',
    name: 'Webwing Skyline Loft',
    location: 'Manhattan, NYC',
    rating: 4.89,
    pricePerNight: 210,
    amenities: ['360° Glass Views', 'Web Net Hammocks', 'High-Speed Fiber', 'Rooftop Pool'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    badge: 'Web Sanctuary'
  },
  {
    id: 'ht-3',
    name: 'Cyber Alpine Fortress',
    location: 'Zermatt, Switzerland',
    rating: 4.92,
    pricePerNight: 350,
    amenities: ['Heated Infinity Pool', 'Glacier Sauna', 'Ski-in Ski-out Access', 'Fireplace Suites'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    badge: 'Luxury Stay'
  }
];

export const SPIDER_SENSE_ALERTS: SpiderSenseAlert[] = [
  {
    id: 'alt-1',
    type: 'Price Drop',
    title: 'Spider-Sense Alert: Flight to Tokyo dropped 25%',
    description: 'Spidey Airways fare reduced from $980 to $749 for next month flights.',
    time: '2 mins ago',
    active: true
  },
  {
    id: 'alt-2',
    type: 'Weather Alert',
    title: 'Bat Radar: Clear skies over Gotham Haven',
    description: 'Optimal visibility for tonight city skyline glides and rooftop tours.',
    time: '1 hour ago',
    active: true
  },
  {
    id: 'alt-3',
    type: 'Secret Deal',
    title: 'Bat-Cave Suite: Free Spa Upgrade',
    description: 'Book 2 nights at Gotham Stealth Suite & get complimentary Bat-Signal lounge access.',
    time: '3 hours ago',
    active: false
  }
];

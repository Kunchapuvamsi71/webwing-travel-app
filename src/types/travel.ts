export interface Destination {
  id: string;
  title: string;
  location: string;
  category: 'Beach' | 'Gotham City' | 'Mountain' | 'Cyber' | 'Adventure';
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  description: string;
  weather: string;
  bestTimeToVisit: string;
  heroTag: 'Spidey Web Spot' | 'Bat Cave Hideout' | 'Wing Flight Hub' | 'Top Rated';
  attractions: string[];
}

export interface Flight {
  id: string;
  airline: string;
  flightCode: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seatsAvailable: number;
  stealthMode: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
  badge: 'Bat Shelter' | 'Web Sanctuary' | 'Luxury Stay';
}

export interface ItineraryItem {
  id: string;
  day: number;
  time: string;
  title: string;
  location: string;
  cost: number;
  completed: boolean;
}

export interface ExpenseItem {
  id: string;
  category: string;
  title: string;
  amount: number;
  date: string;
}

export interface SpiderSenseAlert {
  id: string;
  type: 'Price Drop' | 'Weather Alert' | 'Secret Deal' | 'SOS Signal';
  title: string;
  description: string;
  time: string;
  active: boolean;
}

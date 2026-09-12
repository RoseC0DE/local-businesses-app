export type BusinessCategory =
  | 'All'
  | 'Coffee'
  | 'Food'
  | 'Shops'
  | 'Services';

export type LocalBusiness = {
  id: string;
  name: string;
  category: Exclude<BusinessCategory, 'All'>;
  tagline: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  rating: number;
  reviewCount: number;
  emoji: string;
};

export const CATEGORIES: BusinessCategory[] = ['All', 'Coffee', 'Food', 'Shops', 'Services'];

export const BUSINESSES: LocalBusiness[] = [
  {
    id: 'harbor-roast',
    name: 'Harbor Roast',
    category: 'Coffee',
    tagline: 'Neighborhood espresso bar',
    description:
      'A walk-up espresso counter with rotating single-origin pours and pastry from the bakery next door.',
    address: '18 Market Street',
    city: 'Riverton',
    phone: '555-0142',
    hours: 'Mon–Sat 7am–4pm',
    rating: 4.8,
    reviewCount: 214,
    emoji: '☕',
  },
  {
    id: 'maple-hearth',
    name: 'Maple Hearth Bakery',
    category: 'Food',
    tagline: 'Sourdough and seasonal pies',
    description:
      'Family bakery known for maple-oat loaves, Saturday morning cinnamon rolls, and holiday pie preorders.',
    address: '42 Oak Avenue',
    city: 'Riverton',
    phone: '555-0188',
    hours: 'Tue–Sun 8am–3pm',
    rating: 4.9,
    reviewCount: 367,
    emoji: '🥐',
  },
  {
    id: 'corner-chapter',
    name: 'Corner Chapter Books',
    category: 'Shops',
    tagline: 'Used books and quiet tables',
    description:
      'Independent bookstore with a local-authors shelf, Friday night readings, and a kids’ nook in the back.',
    address: '9 Cedar Lane',
    city: 'Riverton',
    phone: '555-0117',
    hours: 'Mon–Sat 10am–7pm',
    rating: 4.7,
    reviewCount: 129,
    emoji: '📚',
  },
  {
    id: 'true-north-hardware',
    name: 'True North Hardware',
    category: 'Shops',
    tagline: 'Keys, paint, and advice',
    description:
      'The shop people call before a big-box run. Paint matching, screen repair, and someone who knows your house.',
    address: '120 River Road',
    city: 'Riverton',
    phone: '555-0164',
    hours: 'Mon–Fri 8am–6pm · Sat 9am–4pm',
    rating: 4.6,
    reviewCount: 98,
    emoji: '🔧',
  },
  {
    id: 'wildstem',
    name: 'Wildstem Florist',
    category: 'Shops',
    tagline: 'Farm bunches and wreaths',
    description:
      'Weekly market flowers, custom arrangements, and dried wreaths made from nearby farms.',
    address: '27 Elm Court',
    city: 'Riverton',
    phone: '555-0190',
    hours: 'Wed–Sun 10am–5pm',
    rating: 4.8,
    reviewCount: 76,
    emoji: '💐',
  },
  {
    id: 'lantern-diner',
    name: 'Lantern Diner',
    category: 'Food',
    tagline: 'Booths, pie, and late coffee',
    description:
      'A 1950s counter diner with weekday lunch specials, Friday fish fry, and a rotating cream pie.',
    address: '3 Station Plaza',
    city: 'Riverton',
    phone: '555-0133',
    hours: 'Daily 6am–9pm',
    rating: 4.5,
    reviewCount: 412,
    emoji: '🥞',
  },
  {
    id: 'spoke-and-sprocket',
    name: 'Spoke & Sprocket',
    category: 'Services',
    tagline: 'Tune-ups and weekend rentals',
    description:
      'Bike repair, kids’ fittings, and river-trail rentals. Drop off in the morning, ride out by afternoon.',
    address: '88 Canal Street',
    city: 'Riverton',
    phone: '555-0175',
    hours: 'Tue–Sat 10am–6pm',
    rating: 4.7,
    reviewCount: 151,
    emoji: '🚲',
  },
  {
    id: 'south-street-barber',
    name: 'South Street Barber',
    category: 'Services',
    tagline: 'Walk-ins welcome',
    description:
      'Classic cuts, hot-towel shaves, and Saturday morning appointments that actually start on time.',
    address: '15 South Street',
    city: 'Riverton',
    phone: '555-0129',
    hours: 'Tue–Sat 9am–5pm',
    rating: 4.9,
    reviewCount: 203,
    emoji: '💈',
  },
];

export function getBusinessById(id: string) {
  return BUSINESSES.find((business) => business.id === id);
}

export function filterBusinesses(query: string, category: BusinessCategory) {
  const normalized = query.trim().toLowerCase();

  return BUSINESSES.filter((business) => {
    const matchesCategory = category === 'All' || business.category === category;
    const matchesQuery =
      normalized.length === 0 ||
      business.name.toLowerCase().includes(normalized) ||
      business.tagline.toLowerCase().includes(normalized) ||
      business.category.toLowerCase().includes(normalized);

    return matchesCategory && matchesQuery;
  });
}

export interface Vrat {
  id: string;
  name: string;
  nameHi: string;
  type: 'ekadashi' | 'pradosh' | 'purnima' | 'amavasya' | 'chaturthi' | 'other';
  deity: string;
  deityHi: string;
  frequency: string;
  description: string;
  rules: string[];
  benefits: string;
  foodAllowed: string[];
  foodProhibited: string[];
}

export interface VratDate {
  date: string;
  vratId: string;
  paksha: 'Shukla' | 'Krishna';
  month: string;
  monthHi: string;
  special?: string;
}

export const VRATS: Vrat[] = [
  {
    id: 'ekadashi',
    name: 'Ekadashi Vrat',
    nameHi: 'एकादशी व्रत',
    type: 'ekadashi',
    deity: 'Lord Vishnu',
    deityHi: 'भगवान विष्णु',
    frequency: 'Twice a month (11th Tithi of each Paksha)',
    description: 'Ekadashi falls on the 11th day of each lunar fortnight. It is one of the most important fasting days dedicated to Lord Vishnu. There are 24 Ekadashis in a year, each with a unique name and significance.',
    rules: [
      'Begin the fast on Dashami (10th day) evening after sunset',
      'Observe complete or partial fast on Ekadashi day',
      'Break the fast (Parana) on Dwadashi (12th day) during the prescribed time window',
      'Spend the day in prayer, meditation, and reading sacred texts',
      'Avoid sleeping during the day',
      'Avoid rice, grains, and beans',
    ],
    benefits: 'Spiritual purification, moksha (liberation), removal of sins, improved health through periodic fasting',
    foodAllowed: ['Fruits', 'Milk', 'Nuts', 'Sabudana (Sago)', 'Potatoes', 'Sweet potatoes', 'Kuttu (Buckwheat) flour', 'Sendha namak (Rock salt)'],
    foodProhibited: ['Rice', 'Wheat', 'Dal (Lentils)', 'Regular salt', 'Onion', 'Garlic', 'Masoor dal', 'Barley'],
  },
  {
    id: 'pradosh',
    name: 'Pradosh Vrat',
    nameHi: 'प्रदोष व्रत',
    type: 'pradosh',
    deity: 'Lord Shiva',
    deityHi: 'भगवान शिव',
    frequency: 'Twice a month (13th Tithi of each Paksha)',
    description: 'Pradosh Vrat is observed on the 13th day (Trayodashi) of each lunar fortnight. The twilight period on this day is considered especially sacred for Shiva worship. When it falls on Saturday, it is called Shani Pradosh and is very auspicious.',
    rules: [
      'Fast from sunrise to sunset',
      'Perform Shiva Abhishek during Pradosh Kaal (twilight)',
      'Chant Om Namah Shivaya 108 times',
      'Visit Shiva temple if possible',
      'Offer bilva leaves, milk, and water to Shivalinga',
      'Break the fast after evening puja',
    ],
    benefits: 'Fulfillment of desires, removal of obstacles, blessings of Lord Shiva and Parvati',
    foodAllowed: ['Fruits', 'Milk', 'Water', 'Vrat-specific foods'],
    foodProhibited: ['Grains', 'Rice', 'Regular salt', 'Onion', 'Garlic'],
  },
  {
    id: 'purnima',
    name: 'Purnima Vrat',
    nameHi: 'पूर्णिमा व्रत',
    type: 'purnima',
    deity: 'Lord Vishnu / Moon',
    deityHi: 'भगवान विष्णु / चंद्र',
    frequency: 'Once a month (Full Moon day)',
    description: 'Purnima Vrat is observed on every full moon day. It is associated with Lord Vishnu and Satyanarayan Puja. The full moon is considered auspicious for spiritual practices and new beginnings.',
    rules: [
      'Observe fast from sunrise until moonrise',
      'Perform Satyanarayan Puja in the evening',
      'Offer arghya (water offering) to the Moon after moonrise',
      'Read the Satyanarayan Katha',
      'Distribute prasad to family and neighbors',
    ],
    benefits: 'Peace of mind, fulfillment of wishes, spiritual merit, improved mental clarity',
    foodAllowed: ['Fruits', 'Milk', 'Light meals after moonrise'],
    foodProhibited: ['Non-vegetarian food', 'Alcohol', 'Grains (optional)'],
  },
  {
    id: 'amavasya',
    name: 'Amavasya Vrat',
    nameHi: 'अमावस्या व्रत',
    type: 'amavasya',
    deity: 'Ancestors (Pitru)',
    deityHi: 'पितृ देव',
    frequency: 'Once a month (New Moon day)',
    description: 'Amavasya (New Moon) is dedicated to honoring ancestors. Tarpan (water offering) and Pind Daan are performed. Some Amavasyas have special significance like Somvati Amavasya (Monday) and Mauni Amavasya.',
    rules: [
      'Perform Pitru Tarpan (offering water with sesame seeds)',
      'Feed Brahmins or the poor',
      'Avoid starting new ventures',
      'Offer food to crows (representing ancestors)',
      'Visit holy rivers if possible',
    ],
    benefits: 'Blessings of ancestors, removal of Pitru Dosha, spiritual peace',
    foodAllowed: ['Sattvic food', 'Fruits', 'Milk'],
    foodProhibited: ['Non-vegetarian food', 'Alcohol', 'Tamasic food'],
  },
  {
    id: 'chaturthi',
    name: 'Sankashti Chaturthi',
    nameHi: 'संकष्टी चतुर्थी',
    type: 'chaturthi',
    deity: 'Lord Ganesha',
    deityHi: 'भगवान गणेश',
    frequency: 'Once a month (4th day of Krishna Paksha)',
    description: 'Sankashti Chaturthi is observed on the fourth day of the waning moon. Dedicated to Lord Ganesha, devotees fast and break the fast only after sighting the moon and performing Ganesha puja.',
    rules: [
      'Fast from sunrise to moonrise',
      'Perform Ganesha puja in the evening',
      'Sight the moon before breaking the fast',
      'Offer modak and durva grass to Ganesha',
      'Read the Sankashti Vrat Katha',
    ],
    benefits: 'Removal of obstacles, success in endeavors, wisdom, fulfillment of desires',
    foodAllowed: ['Fruits', 'Milk', 'Vrat foods after moonrise'],
    foodProhibited: ['Grains', 'Regular salt', 'Onion', 'Garlic'],
  },
  {
    id: 'somvar',
    name: 'Somvar (Monday) Vrat',
    nameHi: 'सोमवार व्रत',
    type: 'other',
    deity: 'Lord Shiva',
    deityHi: 'भगवान शिव',
    frequency: 'Every Monday (especially in Shravan month)',
    description: 'Monday fasting is dedicated to Lord Shiva. During the Shravan (Sawan) month, Somvar Vrat holds special significance. Devotees often observe 16 consecutive Mondays (Solah Somvar) for marital bliss.',
    rules: [
      'Fast from sunrise to sunset',
      'Visit Shiva temple and offer milk, water, and bilva leaves',
      'Chant Shiva mantras and stotras',
      'Read the Somvar Vrat Katha',
      'Break the fast after evening puja',
    ],
    benefits: 'Marital happiness, fulfillment of desires, blessings of Lord Shiva',
    foodAllowed: ['Fruits', 'Milk', 'One meal (preferably without salt)'],
    foodProhibited: ['Rice', 'Wheat', 'Non-vegetarian food'],
  },
];

export const VRAT_DATES_2026: VratDate[] = [
  { date: '2026-01-05', vratId: 'ekadashi', paksha: 'Shukla', month: 'Paush', monthHi: 'पौष', special: 'Putrada Ekadashi' },
  { date: '2026-01-20', vratId: 'ekadashi', paksha: 'Krishna', month: 'Magha', monthHi: 'माघ', special: 'Shattila Ekadashi' },
  { date: '2026-02-04', vratId: 'ekadashi', paksha: 'Shukla', month: 'Magha', monthHi: 'माघ', special: 'Jaya Ekadashi' },
  { date: '2026-02-18', vratId: 'ekadashi', paksha: 'Krishna', month: 'Phalguna', monthHi: 'फाल्गुन', special: 'Vijaya Ekadashi' },
  { date: '2026-03-05', vratId: 'ekadashi', paksha: 'Shukla', month: 'Phalguna', monthHi: 'फाल्गुन', special: 'Amalaki Ekadashi' },
  { date: '2026-03-20', vratId: 'ekadashi', paksha: 'Krishna', month: 'Chaitra', monthHi: 'चैत्र', special: 'Papmochani Ekadashi' },
  { date: '2026-04-04', vratId: 'ekadashi', paksha: 'Shukla', month: 'Chaitra', monthHi: 'चैत्र', special: 'Kamada Ekadashi' },
  { date: '2026-04-19', vratId: 'ekadashi', paksha: 'Krishna', month: 'Vaishakha', monthHi: 'वैशाख', special: 'Varuthini Ekadashi' },
  { date: '2026-05-03', vratId: 'ekadashi', paksha: 'Shukla', month: 'Vaishakha', monthHi: 'वैशाख', special: 'Mohini Ekadashi' },
  { date: '2026-05-18', vratId: 'ekadashi', paksha: 'Krishna', month: 'Jyeshtha', monthHi: 'ज्येष्ठ', special: 'Apara Ekadashi' },
  { date: '2026-06-02', vratId: 'ekadashi', paksha: 'Shukla', month: 'Jyeshtha', monthHi: 'ज्येष्ठ', special: 'Nirjala Ekadashi' },
  { date: '2026-06-17', vratId: 'ekadashi', paksha: 'Krishna', month: 'Ashadha', monthHi: 'आषाढ़', special: 'Yogini Ekadashi' },
  { date: '2026-07-01', vratId: 'ekadashi', paksha: 'Shukla', month: 'Ashadha', monthHi: 'आषाढ़', special: 'Devshayani Ekadashi' },
  { date: '2026-07-16', vratId: 'ekadashi', paksha: 'Krishna', month: 'Shravan', monthHi: 'श्रावण', special: 'Kamika Ekadashi' },
  { date: '2026-07-31', vratId: 'ekadashi', paksha: 'Shukla', month: 'Shravan', monthHi: 'श्रावण', special: 'Pavitra Ekadashi' },
  { date: '2026-08-15', vratId: 'ekadashi', paksha: 'Krishna', month: 'Bhadrapada', monthHi: 'भाद्रपद', special: 'Aja Ekadashi' },
  { date: '2026-08-29', vratId: 'ekadashi', paksha: 'Shukla', month: 'Bhadrapada', monthHi: 'भाद्रपद', special: 'Parsva Ekadashi' },
  { date: '2026-09-14', vratId: 'ekadashi', paksha: 'Krishna', month: 'Ashwin', monthHi: 'आश्विन', special: 'Indira Ekadashi' },
  { date: '2026-09-28', vratId: 'ekadashi', paksha: 'Shukla', month: 'Ashwin', monthHi: 'आश्विन', special: 'Papankusha Ekadashi' },
  { date: '2026-10-13', vratId: 'ekadashi', paksha: 'Krishna', month: 'Kartik', monthHi: 'कार्तिक', special: 'Rama Ekadashi' },
  { date: '2026-10-28', vratId: 'ekadashi', paksha: 'Shukla', month: 'Kartik', monthHi: 'कार्तिक', special: 'Devutthana Ekadashi' },
  { date: '2026-11-11', vratId: 'ekadashi', paksha: 'Krishna', month: 'Margashirsha', monthHi: 'मार्गशीर्ष', special: 'Utpanna Ekadashi' },
  { date: '2026-11-27', vratId: 'ekadashi', paksha: 'Shukla', month: 'Margashirsha', monthHi: 'मार्गशीर्ष', special: 'Mokshada Ekadashi' },
  { date: '2026-12-11', vratId: 'ekadashi', paksha: 'Krishna', month: 'Paush', monthHi: 'पौष', special: 'Saphala Ekadashi' },
  { date: '2026-12-26', vratId: 'ekadashi', paksha: 'Shukla', month: 'Paush', monthHi: 'पौष', special: 'Putrada Ekadashi' },
  { date: '2026-01-13', vratId: 'purnima', paksha: 'Shukla', month: 'Paush', monthHi: 'पौष' },
  { date: '2026-02-12', vratId: 'purnima', paksha: 'Shukla', month: 'Magha', monthHi: 'माघ' },
  { date: '2026-03-14', vratId: 'purnima', paksha: 'Shukla', month: 'Phalguna', monthHi: 'फाल्गुन' },
  { date: '2026-04-12', vratId: 'purnima', paksha: 'Shukla', month: 'Chaitra', monthHi: 'चैत्र' },
  { date: '2026-05-12', vratId: 'purnima', paksha: 'Shukla', month: 'Vaishakha', monthHi: 'वैशाख' },
  { date: '2026-06-11', vratId: 'purnima', paksha: 'Shukla', month: 'Jyeshtha', monthHi: 'ज्येष्ठ' },
  { date: '2026-07-10', vratId: 'purnima', paksha: 'Shukla', month: 'Ashadha', monthHi: 'आषाढ़' },
  { date: '2026-08-09', vratId: 'purnima', paksha: 'Shukla', month: 'Shravan', monthHi: 'श्रावण' },
  { date: '2026-09-07', vratId: 'purnima', paksha: 'Shukla', month: 'Bhadrapada', monthHi: 'भाद्रपद' },
  { date: '2026-10-07', vratId: 'purnima', paksha: 'Shukla', month: 'Ashwin', monthHi: 'आश्विन' },
  { date: '2026-11-05', vratId: 'purnima', paksha: 'Shukla', month: 'Kartik', monthHi: 'कार्तिक' },
  { date: '2026-12-05', vratId: 'purnima', paksha: 'Shukla', month: 'Margashirsha', monthHi: 'मार्गशीर्ष' },
  { date: '2026-01-08', vratId: 'pradosh', paksha: 'Krishna', month: 'Paush', monthHi: 'पौष' },
  { date: '2026-01-23', vratId: 'pradosh', paksha: 'Shukla', month: 'Magha', monthHi: 'माघ' },
  { date: '2026-02-06', vratId: 'pradosh', paksha: 'Krishna', month: 'Magha', monthHi: 'माघ' },
  { date: '2026-02-22', vratId: 'pradosh', paksha: 'Shukla', month: 'Phalguna', monthHi: 'फाल्गुन' },
];

export const VRAT_TYPE_COLORS: Record<string, string> = {
  ekadashi: '#3498db',
  pradosh: '#8e44ad',
  purnima: '#f1c40f',
  amavasya: '#2c3e50',
  chaturthi: '#e67e22',
  other: '#27ae60',
};

export const VRAT_TYPE_LABELS: Record<string, string> = {
  ekadashi: 'Ekadashi',
  pradosh: 'Pradosh',
  purnima: 'Purnima',
  amavasya: 'Amavasya',
  chaturthi: 'Chaturthi',
  other: 'Other',
};

export function getUpcomingVrats(fromDate: Date, count: number): VratDate[] {
  const dateStr = `${fromDate.getFullYear()}-${String(fromDate.getMonth() + 1).padStart(2, '0')}-${String(fromDate.getDate()).padStart(2, '0')}`;
  return VRAT_DATES_2026
    .filter((v) => v.date >= dateStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, count);
}

export function getVratById(id: string): Vrat | undefined {
  return VRATS.find((v) => v.id === id);
}

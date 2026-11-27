import type { Festival } from '@/types';

export const FESTIVALS_2026: Festival[] = [
  { id: 'makar-sankranti', name: 'Makar Sankranti', nameHi: 'मकर संक्रांति', date: '2026-01-14', type: 'hindu', description: 'Sun enters Capricorn; harvest festival.' },
  { id: 'pongal', name: 'Pongal', nameHi: 'पोंगल', date: '2026-01-14', type: 'regional', region: ['Tamil Nadu'], description: 'Tamil harvest festival.' },
  { id: 'republic-day', name: 'Republic Day', nameHi: 'गणतंत्र दिवस', date: '2026-01-26', type: 'national', description: "India's Constitution came into effect." },
  { id: 'basant-panchami', name: 'Basant Panchami', nameHi: 'बसंत पंचमी', date: '2026-01-29', type: 'hindu', description: 'Festival of Saraswati; heralds spring.' },
  { id: 'maha-shivratri', name: 'Maha Shivaratri', nameHi: 'महा शिवरात्रि', date: '2026-02-28', type: 'hindu', description: 'Night of Lord Shiva.' },
  { id: 'holi', name: 'Holi', nameHi: 'होली', date: '2026-03-14', type: 'hindu', description: 'Festival of colors.' },
  { id: 'ugadi', name: 'Ugadi', nameHi: 'उगादी', date: '2026-03-29', type: 'regional', region: ['Karnataka', 'Andhra Pradesh', 'Telangana'], description: 'New Year in some South Indian traditions.' },
  { id: 'gudi-padwa', name: 'Gudi Padwa', nameHi: 'गुड़ी पड़वा', date: '2026-03-29', type: 'regional', region: ['Maharashtra'], description: 'Marathi New Year.' },
  { id: 'ram-navami', name: 'Ram Navami', nameHi: 'राम नवमी', date: '2026-04-06', type: 'hindu', description: 'Birthday of Lord Ram.' },
  { id: 'baisakhi', name: 'Baisakhi', nameHi: 'बैसाखी', date: '2026-04-13', type: 'sikh', description: 'Punjabi New Year and harvest.' },
  { id: 'buddha-purnima', name: 'Buddha Purnima', nameHi: 'बुद्ध पूर्णिमा', date: '2026-05-12', type: 'buddhist', description: 'Birth, enlightenment, and death of Buddha.' },
  { id: 'eid-ul-fitr', name: 'Eid ul-Fitr', nameHi: 'ईद उल-फ़ित्र', date: '2026-03-21', type: 'islamic', description: 'End of Ramadan; celebration of breaking the fast.' },
  { id: 'eid-ul-adha', name: 'Eid ul-Adha', nameHi: 'ईद उल-अज़हा', date: '2026-05-27', type: 'islamic', description: 'Festival of sacrifice.' },
  { id: 'rath-yatra', name: 'Rath Yatra', nameHi: 'रथ यात्रा', date: '2026-06-30', type: 'hindu', region: ['Odisha'], description: 'Chariot festival of Lord Jagannath in Puri.' },
  { id: 'guru-purnima', name: 'Guru Purnima', nameHi: 'गुरु पूर्णिमा', date: '2026-07-11', type: 'hindu', description: 'Honoring spiritual and academic teachers.' },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', nameHi: 'रक्षा बंधन', date: '2026-08-11', type: 'hindu', description: 'Festival of the sibling bond.' },
  { id: 'independence-day', name: 'Independence Day', nameHi: 'स्वतंत्रता दिवस', date: '2026-08-15', type: 'national', description: "India's Independence Day." },
  { id: 'janmashtami', name: 'Janmashtami', nameHi: 'जन्माष्टमी', date: '2026-08-25', type: 'hindu', description: 'Birthday of Lord Krishna.' },
  { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', nameHi: 'गणेश चतुर्थी', date: '2026-09-07', type: 'hindu', description: 'Birthday of Lord Ganesha.' },
  { id: 'onam', name: 'Onam', nameHi: 'ओणम', date: '2026-09-11', type: 'regional', region: ['Kerala'], description: 'Kerala harvest festival.' },
  { id: 'navratri-start', name: 'Navratri Begins', nameHi: 'नवरात्रि आरंभ', date: '2026-09-27', type: 'hindu', description: 'Nine nights of Goddess Durga.' },
  { id: 'gandhi-jayanti', name: 'Gandhi Jayanti', nameHi: 'गांधी जयंती', date: '2026-10-02', type: 'national', description: 'Birthday of Mahatma Gandhi.' },
  { id: 'dussehra', name: 'Dussehra', nameHi: 'दशहरा', date: '2026-10-06', type: 'hindu', description: 'Victory of good over evil.' },
  { id: 'karwa-chauth', name: 'Karwa Chauth', nameHi: 'करवा चौथ', date: '2026-10-15', type: 'hindu', description: 'Fasting festival for married women.' },
  { id: 'dhanteras', name: 'Dhanteras', nameHi: 'धनतेरस', date: '2026-10-22', type: 'hindu', description: 'First day of Diwali celebrations.' },
  { id: 'diwali', name: 'Diwali', nameHi: 'दीपावली', date: '2026-10-24', type: 'hindu', description: 'Festival of lights.' },
  { id: 'bhai-dooj', name: 'Bhai Dooj', nameHi: 'भाई दूज', date: '2026-10-26', type: 'hindu', description: 'Celebration of sibling bond.' },
  { id: 'chhath', name: 'Chhath Puja', nameHi: 'छठ पूजा', date: '2026-10-29', type: 'hindu', region: ['Bihar', 'Jharkhand', 'Uttar Pradesh'], description: 'Sun worship festival.' },
  { id: 'guru-nanak-jayanti', name: 'Guru Nanak Jayanti', nameHi: 'गुरु नानक जयंती', date: '2026-11-15', type: 'sikh', description: 'Birthday of Guru Nanak Dev Ji.' },
  { id: 'christmas', name: 'Christmas', nameHi: 'क्रिसमस', date: '2026-12-25', type: 'christian', description: 'Celebration of the birth of Jesus Christ.' },
];

export function getFestivalsForDate(date: Date): Festival[] {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;
  return FESTIVALS_2026.filter((f) => f.date === dateStr);
}

export function getFestivalsForMonth(year: number, month: number): Festival[] {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  return FESTIVALS_2026.filter((f) => f.date.startsWith(prefix));
}

export function getUpcomingFestivals(date: Date, count: number): Festival[] {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;
  return FESTIVALS_2026.filter((f) => f.date >= dateStr).slice(0, count);
}

export const FESTIVAL_TYPE_COLORS: Record<string, string> = {
  hindu: '#e85d04',
  national: '#2d6a4f',
  sikh: '#6930c3',
  buddhist: '#0096c7',
  islamic: '#2d8f8f',
  christian: '#c9184a',
  jain: '#ff8800',
  regional: '#7b2d8e',
};

export const FESTIVAL_TYPE_LABELS: Record<string, string> = {
  hindu: 'Hindu',
  national: 'National',
  sikh: 'Sikh',
  buddhist: 'Buddhist',
  islamic: 'Islamic',
  christian: 'Christian',
  jain: 'Jain',
  regional: 'Regional',
};

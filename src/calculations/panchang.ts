import type { TithiData, NakshatraData, YogaData, KaranaData, PanchangData } from '@/types';
import { getSunLongitude, getMoonLongitude } from './astronomy';

const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
];

const TITHI_NAMES_HI = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी',
  'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा/अमावस्या'
];

const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

const NAKSHATRA_NAMES_HI = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा',
  'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'अश्लेषा', 'मघा',
  'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाति',
  'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा',
  'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वा भाद्रपद',
  'उत्तरा भाद्रपद', 'रेवती'
];

const NAKSHATRA_DEITIES = [
  'Ashwini Kumaras', 'Yama', 'Agni', 'Brahma', 'Soma',
  'Rudra', 'Aditi', 'Brihaspati', 'Sarpa', 'Pitris',
  'Bhaga', 'Aryaman', 'Savitar', 'Vishvakarma', 'Vayu',
  'Indragni', 'Mitra', 'Indra', 'Nirriti', 'Apas',
  'Vishvedevas', 'Vishnu', 'Vasu', 'Varuna', 'Ajaikapada',
  'Ahirbudhnya', 'Pushan'
];

const YOGA_NAMES = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
  'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda',
  'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
  'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
  'Indra', 'Vaidhriti'
];

const YOGA_NAMES_HI = [
  'विष्कम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन',
  'अतिगण्ड', 'सुकर्मा', 'धृति', 'शूल', 'गण्ड',
  'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र',
  'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव',
  'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल', 'ब्रह्म',
  'इन्द्र', 'वैधृति'
];

const KARANA_NAMES = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garija',
  'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
];

const KARANA_NAMES_HI = [
  'बव', 'बालव', 'कौलव', 'तैतिल', 'गरिज',
  'वणिज', 'विष्टि', 'शकुनि', 'चतुष्पद', 'नाग', 'किंस्तुघ्न'
];

const RASHI_NAMES = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
];

const MASA_NAMES = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
  'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik',
  'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

const MASA_NAMES_HI = [
  'चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ़',
  'श्रावण', 'भाद्रपद', 'अश्विन', 'कार्तिक',
  'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'
];

const VAAR_NAMES: Record<number, [string, string]> = {
  0: ['Ravivar', 'रविवार'],
  1: ['Somvar', 'सोमवार'],
  2: ['Mangalvar', 'मंगलवार'],
  3: ['Budhvar', 'बुधवार'],
  4: ['Guruvar', 'गुरुवार'],
  5: ['Shukravar', 'शुक्रवार'],
  6: ['Shanivar', 'शनिवार'],
};

const AYANAMSA = 24.11;

function getSiderealLongitude(tropicalLon: number): number {
  let sid = tropicalLon - AYANAMSA;
  if (sid < 0) sid += 360;
  return sid;
}

export function getTithi(date: Date): TithiData {
  const sunLon = getSiderealLongitude(getSunLongitude(date));
  const moonLon = getSiderealLongitude(getMoonLongitude(date));

  let diff = moonLon - sunLon;
  if (diff < 0) diff += 360;

  const tithiNum = Math.floor(diff / 12);
  const tithiIndex = tithiNum % 15;
  const paksha: 'Shukla' | 'Krishna' = tithiNum < 15 ? 'Shukla' : 'Krishna';

  let name = TITHI_NAMES[tithiIndex];
  let nameHi = TITHI_NAMES_HI[tithiIndex];
  if (tithiIndex === 14) {
    name = paksha === 'Shukla' ? 'Purnima' : 'Amavasya';
    nameHi = paksha === 'Shukla' ? 'पूर्णिमा' : 'अमावस्या';
  }

  return {
    number: tithiNum + 1,
    name,
    nameHi,
    paksha,
    startTime: null,
    endTime: null,
  };
}

export function getNakshatra(date: Date): NakshatraData {
  const moonLon = getSiderealLongitude(getMoonLongitude(date));
  const nakNum = Math.floor(moonLon / (360 / 27));
  const pada = Math.floor((moonLon % (360 / 27)) / (360 / 108)) + 1;

  return {
    number: nakNum + 1,
    name: NAKSHATRA_NAMES[nakNum],
    nameHi: NAKSHATRA_NAMES_HI[nakNum],
    pada,
    deity: NAKSHATRA_DEITIES[nakNum],
    startTime: null,
    endTime: null,
  };
}

export function getYoga(date: Date): YogaData {
  const sunLon = getSiderealLongitude(getSunLongitude(date));
  const moonLon = getSiderealLongitude(getMoonLongitude(date));

  let sum = sunLon + moonLon;
  if (sum >= 360) sum -= 360;
  const yogaNum = Math.floor(sum / (360 / 27));

  return {
    number: yogaNum + 1,
    name: YOGA_NAMES[yogaNum],
    nameHi: YOGA_NAMES_HI[yogaNum],
  };
}

export function getKarana(date: Date): KaranaData {
  const sunLon = getSiderealLongitude(getSunLongitude(date));
  const moonLon = getSiderealLongitude(getMoonLongitude(date));

  let diff = moonLon - sunLon;
  if (diff < 0) diff += 360;

  const karanaNum = Math.floor(diff / 6);
  let karanaIndex: number;

  if (karanaNum === 0) {
    karanaIndex = 10;
  } else if (karanaNum >= 57) {
    karanaIndex = 7 + (karanaNum - 57);
  } else {
    karanaIndex = ((karanaNum - 1) % 7);
  }

  return {
    number: karanaNum + 1,
    name: KARANA_NAMES[karanaIndex] ?? 'Bava',
    nameHi: KARANA_NAMES_HI[karanaIndex] ?? 'बव',
  };
}

function getRashi(longitude: number): string {
  const rashiNum = Math.floor(longitude / 30);
  return RASHI_NAMES[rashiNum] ?? 'Mesha';
}

function getMasa(date: Date): [string, string] {
  const sunLon = getSiderealLongitude(getSunLongitude(date));
  const masaIndex = Math.floor(sunLon / 30);
  return [MASA_NAMES[masaIndex] ?? 'Chaitra', MASA_NAMES_HI[masaIndex] ?? 'चैत्र'];
}

export function getVikramSamvat(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month < 3 ? year + 56 : year + 57;
}

export function getShakaSamvat(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  return month < 3 ? year - 79 : year - 78;
}

export function getFullPanchang(date: Date): PanchangData {
  const tithi = getTithi(date);
  const nakshatra = getNakshatra(date);
  const yoga = getYoga(date);
  const karana = getKarana(date);
  const [masa, masaHi] = getMasa(date);
  const day = date.getDay();

  const sunLon = getSiderealLongitude(getSunLongitude(date));
  const moonLon = getSiderealLongitude(getMoonLongitude(date));

  return {
    tithi,
    nakshatra,
    yoga,
    karana,
    masa,
    masaHi,
    paksha: tithi.paksha,
    vaar: VAAR_NAMES[day]![0],
    vaarHi: VAAR_NAMES[day]![1],
    chandraRashi: getRashi(moonLon),
    suryaRashi: getRashi(sunLon),
    vikramSamvat: getVikramSamvat(date),
    shakaSamvat: getShakaSamvat(date),
  };
}

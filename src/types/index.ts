export interface Location {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  tz: string;
}

export interface SunData {
  sunrise: Date | null;
  sunset: Date | null;
  solarNoon: Date | null;
  dayDuration: number;
  nightDuration: number;
  dawn: Date | null;
  dusk: Date | null;
}

export interface MoonData {
  phase: number;
  phaseName: string;
  illumination: number;
  moonrise: Date | null;
  moonset: Date | null;
  age: number;
  nextFullMoon: Date | null;
  nextNewMoon: Date | null;
}

export interface TithiData {
  number: number;
  name: string;
  nameHi: string;
  paksha: 'Shukla' | 'Krishna';
  startTime: Date | null;
  endTime: Date | null;
}

export interface NakshatraData {
  number: number;
  name: string;
  nameHi: string;
  pada: number;
  deity: string;
  startTime: Date | null;
  endTime: Date | null;
}

export interface YogaData {
  number: number;
  name: string;
  nameHi: string;
}

export interface KaranaData {
  number: number;
  name: string;
  nameHi: string;
}

export interface PanchangData {
  tithi: TithiData;
  nakshatra: NakshatraData;
  yoga: YogaData;
  karana: KaranaData;
  masa: string;
  masaHi: string;
  paksha: 'Shukla' | 'Krishna';
  vaar: string;
  vaarHi: string;
  chandraRashi: string;
  suryaRashi: string;
  vikramSamvat: number;
  shakaSamvat: number;
}

export interface Festival {
  id: string;
  name: string;
  nameHi: string;
  date: string;
  type: 'hindu' | 'jain' | 'buddhist' | 'sikh' | 'islamic' | 'christian' | 'national' | 'regional' | 'cultural';
  region?: string[];
  description: string;
  descriptionHi?: string;
}

export interface MuhuratWindow {
  name: string;
  nameHi: string;
  start: Date;
  end: Date;
  type: 'auspicious' | 'inauspicious' | 'neutral';
  description?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'en' | 'hi';

export interface AppSettings {
  theme: ThemeMode;
  language: Language;
  location: Location;
  calendarConvention: 'amanta' | 'purnimanta';
  showHoroscope: boolean;
  showWeather: boolean;
}

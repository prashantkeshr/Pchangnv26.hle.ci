import type { MuhuratWindow } from '@/types';

export function getRahuKaal(sunrise: Date, sunset: Date, dayOfWeek: number): MuhuratWindow {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const segment = dayDuration / 8;

  const rahuOrder = [7, 1, 6, 4, 5, 3, 2];
  const segmentIndex = rahuOrder[dayOfWeek] ?? 1;

  const start = new Date(sunrise.getTime() + segment * (segmentIndex - 1));
  const end = new Date(start.getTime() + segment);

  return {
    name: 'Rahu Kaal',
    nameHi: 'राहु काल',
    start,
    end,
    type: 'inauspicious',
    description: 'Period considered inauspicious for starting new activities',
  };
}

export function getYamaGanda(sunrise: Date, sunset: Date, dayOfWeek: number): MuhuratWindow {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const segment = dayDuration / 8;

  const yamaOrder = [4, 3, 2, 1, 6, 5, 7];
  const segmentIndex = yamaOrder[dayOfWeek] ?? 1;

  const start = new Date(sunrise.getTime() + segment * (segmentIndex - 1));
  const end = new Date(start.getTime() + segment);

  return {
    name: 'Yamaganda',
    nameHi: 'यमगण्ड',
    start,
    end,
    type: 'inauspicious',
  };
}

export function getGulikaKaal(sunrise: Date, sunset: Date, dayOfWeek: number): MuhuratWindow {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const segment = dayDuration / 8;

  const gulikaOrder = [6, 5, 4, 3, 2, 1, 7];
  const segmentIndex = gulikaOrder[dayOfWeek] ?? 1;

  const start = new Date(sunrise.getTime() + segment * (segmentIndex - 1));
  const end = new Date(start.getTime() + segment);

  return {
    name: 'Gulika Kaal',
    nameHi: 'गुलिक काल',
    start,
    end,
    type: 'inauspicious',
  };
}

export function getAbhijitMuhurat(sunrise: Date, sunset: Date): MuhuratWindow {
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const midDay = sunrise.getTime() + dayDuration / 2;
  const muhurtaDuration = dayDuration / 15;

  const start = new Date(midDay - muhurtaDuration / 2);
  const end = new Date(midDay + muhurtaDuration / 2);

  return {
    name: 'Abhijit Muhurat',
    nameHi: 'अभिजीत मुहूर्त',
    start,
    end,
    type: 'auspicious',
    description: 'Most auspicious period of the day, around solar noon',
  };
}

export function getBrahmaMuhurat(sunrise: Date): MuhuratWindow {
  const start = new Date(sunrise.getTime() - 96 * 60 * 1000);
  const end = new Date(sunrise.getTime() - 48 * 60 * 1000);

  return {
    name: 'Brahma Muhurat',
    nameHi: 'ब्रह्म मुहूर्त',
    start,
    end,
    type: 'auspicious',
    description: 'Auspicious early morning period for meditation and spiritual practice',
  };
}

export function getAllMuhurats(sunrise: Date, sunset: Date, dayOfWeek: number): MuhuratWindow[] {
  const muhurats: MuhuratWindow[] = [
    getBrahmaMuhurat(sunrise),
    getAbhijitMuhurat(sunrise, sunset),
    getRahuKaal(sunrise, sunset, dayOfWeek),
    getYamaGanda(sunrise, sunset, dayOfWeek),
    getGulikaKaal(sunrise, sunset, dayOfWeek),
  ];

  return muhurats.sort((a, b) => a.start.getTime() - b.start.getTime());
}

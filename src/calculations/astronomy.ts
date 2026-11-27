import * as Astronomy from 'astronomy-engine';
import type { SunData, MoonData } from '@/types';

export function getSunData(date: Date, lat: number, lng: number): SunData {
  const observer = new Astronomy.Observer(lat, lng, 0);
  const dateObj = Astronomy.MakeTime(date);

  let sunrise: Date | null = null;
  let sunset: Date | null = null;
  let solarNoon: Date | null = null;
  let dawn: Date | null = null;
  let dusk: Date | null = null;

  try {
    const riseResult = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, dateObj, 1);
    if (riseResult) sunrise = riseResult.date;
  } catch { /* polar regions */ }

  try {
    const setResult = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, dateObj, 1);
    if (setResult) sunset = setResult.date;
  } catch { /* polar regions */ }

  try {
    const transit = Astronomy.SearchHourAngle(Astronomy.Body.Sun, observer, 0, dateObj, +1);
    if (transit) solarNoon = transit.time.date;
  } catch { /* unlikely */ }

  try {
    const dawnResult = Astronomy.SearchAltitude(Astronomy.Body.Sun, observer, +1, dateObj, 1, -6);
    if (dawnResult) dawn = dawnResult.date;
  } catch { /* polar regions */ }

  try {
    const duskResult = Astronomy.SearchAltitude(Astronomy.Body.Sun, observer, -1, dateObj, 1, -6);
    if (duskResult) dusk = duskResult.date;
  } catch { /* polar regions */ }

  let dayDuration = 0;
  let nightDuration = 0;
  if (sunrise && sunset) {
    dayDuration = (sunset.getTime() - sunrise.getTime()) / 1000;
    nightDuration = 86400 - dayDuration;
  }

  return { sunrise, sunset, solarNoon, dayDuration, nightDuration, dawn, dusk };
}

export function getMoonData(date: Date, lat: number, lng: number): MoonData {
  const observer = new Astronomy.Observer(lat, lng, 0);
  const dateObj = Astronomy.MakeTime(date);

  const phaseAngle = Astronomy.MoonPhase(dateObj);
  const illumination = Astronomy.Illumination(Astronomy.Body.Moon, dateObj);
  const phase = phaseAngle / 360;

  let moonrise: Date | null = null;
  let moonset: Date | null = null;

  try {
    const riseResult = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, +1, dateObj, 1);
    if (riseResult) moonrise = riseResult.date;
  } catch { /* ok */ }

  try {
    const setResult = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, dateObj, 1);
    if (setResult) moonset = setResult.date;
  } catch { /* ok */ }

  const age = phaseAngle / 12.19;

  let nextFullMoon: Date | null = null;
  let nextNewMoon: Date | null = null;
  try {
    const fullResult = Astronomy.SearchMoonPhase(180, dateObj, 30);
    if (fullResult) nextFullMoon = fullResult.date;
  } catch { /* ok */ }
  try {
    const newResult = Astronomy.SearchMoonPhase(0, dateObj, 30);
    if (newResult) nextNewMoon = newResult.date;
  } catch { /* ok */ }

  return {
    phase,
    phaseName: getMoonPhaseName(phaseAngle),
    illumination: illumination.phase_fraction * 100,
    moonrise,
    moonset,
    age,
    nextFullMoon,
    nextNewMoon,
  };
}

function getMoonPhaseName(angle: number): string {
  if (angle < 11.25) return 'New Moon';
  if (angle < 78.75) return 'Waxing Crescent';
  if (angle < 101.25) return 'First Quarter';
  if (angle < 168.75) return 'Waxing Gibbous';
  if (angle < 191.25) return 'Full Moon';
  if (angle < 258.75) return 'Waning Gibbous';
  if (angle < 281.25) return 'Last Quarter';
  if (angle < 348.75) return 'Waning Crescent';
  return 'New Moon';
}

export function getSunLongitude(date: Date): number {
  const dateObj = Astronomy.MakeTime(date);
  const ecliptic = Astronomy.SunPosition(dateObj);
  let lon = ecliptic.elon;
  if (lon < 0) lon += 360;
  return lon;
}

export function getMoonLongitude(date: Date): number {
  const dateObj = Astronomy.MakeTime(date);
  const ecliptic = Astronomy.EclipticGeoMoon(dateObj);
  let lon = ecliptic.lon;
  if (lon < 0) lon += 360;
  return lon;
}

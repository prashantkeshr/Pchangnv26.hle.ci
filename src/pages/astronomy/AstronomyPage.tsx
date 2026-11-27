import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Info } from 'lucide-react';
import * as Astronomy from 'astronomy-engine';
import { useDate } from '@/context/DateContext';
import { useLocation } from '@/context/LocationContext';
import { getSunData, getMoonData, getSunLongitude, getMoonLongitude } from '@/calculations/astronomy';
import { Card } from '@/components/common/Card';
import { MoonPhaseIcon } from '@/components/icons/MoonPhaseIcon';
import { formatTime, formatDuration, formatDateLong } from '@/utils/format';
import styles from './AstronomyPage.module.css';

const LAHIRI_AYANAMSA = 24.11;

const PLANET_NAMES: Array<{ body: Astronomy.Body; name: string; nameHi: string; symbol: string }> = [
  { body: Astronomy.Body.Mercury, name: 'Mercury', nameHi: 'बुध', symbol: '☿' },
  { body: Astronomy.Body.Venus, name: 'Venus', nameHi: 'शुक्र', symbol: '♀' },
  { body: Astronomy.Body.Mars, name: 'Mars', nameHi: 'मंगल', symbol: '♂' },
  { body: Astronomy.Body.Jupiter, name: 'Jupiter', nameHi: 'बृहस्पति', symbol: '♃' },
  { body: Astronomy.Body.Saturn, name: 'Saturn', nameHi: 'शनि', symbol: '♄' },
];

const RASHI_NAMES = [
  'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
  'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
  'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)',
];

function getRashi(longitude: number): string {
  const idx = Math.floor(longitude / 30) % 12;
  return RASHI_NAMES[idx]!;
}

function normalize(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

interface PlanetInfo {
  name: string;
  nameHi: string;
  symbol: string;
  tropicalLong: number;
  siderealLong: number;
  rashi: string;
}

function getPlanetaryPositions(date: Date): PlanetInfo[] {
  const astroDate = Astronomy.MakeTime(date);
  return PLANET_NAMES.map((p) => {
    try {
      const tropical = Astronomy.EclipticLongitude(p.body, astroDate);
      const sidereal = normalize(tropical - LAHIRI_AYANAMSA);
      return {
        name: p.name,
        nameHi: p.nameHi,
        symbol: p.symbol,
        tropicalLong: tropical,
        siderealLong: sidereal,
        rashi: getRashi(sidereal),
      };
    } catch (err) {
      console.error(`Planet ${p.name} calculation error:`, err);
      return {
        name: p.name, nameHi: p.nameHi, symbol: p.symbol,
        tropicalLong: 0, siderealLong: 0, rashi: 'N/A',
      };
    }
  });
}

const ECLIPSES_2026 = [
  { date: '2026-02-17', type: 'Solar', subtype: 'Annular', nameHi: 'सूर्य ग्रहण (वलयाकार)', visibility: 'Antarctica, South America' },
  { date: '2026-03-03', type: 'Lunar', subtype: 'Total', nameHi: 'चंद्र ग्रहण (पूर्ण)', visibility: 'Americas, Europe, Africa' },
  { date: '2026-08-12', type: 'Solar', subtype: 'Total', nameHi: 'सूर्य ग्रहण (पूर्ण)', visibility: 'Arctic, Greenland, Spain, Iceland' },
  { date: '2026-08-28', type: 'Lunar', subtype: 'Partial', nameHi: 'चंद्र ग्रहण (आंशिक)', visibility: 'Asia, Australia, Pacific, Americas' },
];

export function AstronomyPage() {
  const { selectedDate, goToPrevDay, goToNextDay, goToToday, isToday, setSelectedDate } = useDate();
  const { location } = useLocation();

  const sunData = useMemo(() => getSunData(selectedDate, location.lat, location.lng), [selectedDate, location.lat, location.lng]);
  const moonData = useMemo(() => getMoonData(selectedDate, location.lat, location.lng), [selectedDate, location.lat, location.lng]);
  const sunLong = useMemo(() => getSunLongitude(selectedDate), [selectedDate]);
  const moonLong = useMemo(() => getMoonLongitude(selectedDate), [selectedDate]);
  const planets = useMemo(() => getPlanetaryPositions(selectedDate), [selectedDate]);

  const siderealSun = normalize(sunLong - LAHIRI_AYANAMSA);
  const siderealMoon = normalize(moonLong - LAHIRI_AYANAMSA);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Astronomy · खगोल विज्ञान</h1>
          <p className={styles.subtitle}>Celestial positions and events for {formatDateLong(selectedDate)}</p>
        </div>

        <div className={styles.dateNav}>
          <button onClick={goToPrevDay} className={styles.navBtn}><ChevronLeft size={18} /></button>
          <span className={styles.dateLabel}>{formatDateLong(selectedDate)}</span>
          <button onClick={goToNextDay} className={styles.navBtn}><ChevronRight size={18} /></button>
          {!isToday && (
            <button onClick={goToToday} className={styles.todayBtn}><CalendarDays size={14} /> Today</button>
          )}
          <input
            type="date" className={styles.datePicker}
            value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`}
            onChange={(e) => { const d = new Date(e.target.value + 'T00:00:00'); if (!isNaN(d.getTime())) setSelectedDate(d); }}
          />
        </div>

        <div className={styles.grid}>
          {/* Sun */}
          <Card title="Sun" titleHi="सूर्य">
            <div className={styles.celestialMain}>
              <div className={styles.celestialIcon}>☀</div>
              <div className={styles.celestialData}>
                <div className={styles.row}><span>Tropical Longitude</span><span>{sunLong.toFixed(2)}°</span></div>
                <div className={styles.row}><span>Sidereal Longitude</span><span>{siderealSun.toFixed(2)}°</span></div>
                <div className={styles.row}><span>Rashi</span><span>{getRashi(siderealSun)}</span></div>
                <div className={styles.row}><span>Sunrise</span><span>{formatTime(sunData.sunrise)}</span></div>
                <div className={styles.row}><span>Sunset</span><span>{formatTime(sunData.sunset)}</span></div>
                <div className={styles.row}><span>Solar Noon</span><span>{formatTime(sunData.solarNoon)}</span></div>
                <div className={styles.row}><span>Day Duration</span><span>{formatDuration(sunData.dayDuration)}</span></div>
                <div className={styles.row}><span>Night Duration</span><span>{formatDuration(sunData.nightDuration)}</span></div>
              </div>
            </div>
          </Card>

          {/* Moon */}
          <Card title="Moon" titleHi="चंद्रमा">
            <div className={styles.celestialMain}>
              <div className={styles.moonIcon}>
                <MoonPhaseIcon phase={moonData.phase} size={56} />
              </div>
              <div className={styles.celestialData}>
                <div className={styles.row}><span>Tropical Longitude</span><span>{moonLong.toFixed(2)}°</span></div>
                <div className={styles.row}><span>Sidereal Longitude</span><span>{siderealMoon.toFixed(2)}°</span></div>
                <div className={styles.row}><span>Rashi</span><span>{getRashi(siderealMoon)}</span></div>
                <div className={styles.row}><span>Phase</span><span>{moonData.phaseName}</span></div>
                <div className={styles.row}><span>Illumination</span><span>{moonData.illumination.toFixed(1)}%</span></div>
                <div className={styles.row}><span>Age</span><span>{moonData.age.toFixed(1)} days</span></div>
                <div className={styles.row}><span>Moonrise</span><span>{formatTime(moonData.moonrise)}</span></div>
                <div className={styles.row}><span>Moonset</span><span>{formatTime(moonData.moonset)}</span></div>
                <div className={styles.row}><span>Next Full Moon</span><span>{moonData.nextFullMoon?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) ?? '—'}</span></div>
                <div className={styles.row}><span>Next New Moon</span><span>{moonData.nextNewMoon?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) ?? '—'}</span></div>
              </div>
            </div>
          </Card>

          {/* Planetary Positions */}
          <Card title="Planetary Positions" titleHi="ग्रह स्थिति">
            <div className={styles.planetTable}>
              <div className={styles.planetHeader}>
                <span>Planet</span>
                <span>Sidereal</span>
                <span>Rashi</span>
              </div>
              {planets.map((p) => (
                <div key={p.name} className={styles.planetRow}>
                  <div className={styles.planetName}>
                    <span className={styles.planetSymbol}>{p.symbol}</span>
                    <div>
                      <div>{p.name}</div>
                      <div className={styles.planetHi}>{p.nameHi}</div>
                    </div>
                  </div>
                  <span className={styles.planetDeg}>{p.siderealLong.toFixed(2)}°</span>
                  <span className={styles.planetRashi}>{p.rashi}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <Info size={14} />
              <span>Positions use Lahiri Ayanamsa (~24.11°) for sidereal correction. Computed with astronomy-engine.</span>
            </div>
          </Card>

          {/* Eclipses */}
          <Card title="Eclipses 2026" titleHi="ग्रहण 2026">
            <div className={styles.eclipseList}>
              {ECLIPSES_2026.map((e, i) => {
                const d = new Date(e.date + 'T00:00:00');
                const isPast = d < new Date();
                return (
                  <div key={i} className={`${styles.eclipseItem} ${isPast ? styles.eclipsePast : ''}`}>
                    <div className={styles.eclipseDate}>
                      <span className={styles.eclipseDay}>{d.getDate()}</span>
                      <span className={styles.eclipseMonth}>{d.toLocaleDateString('en-IN', { month: 'short' })}</span>
                    </div>
                    <div className={styles.eclipseInfo}>
                      <div className={styles.eclipseName}>
                        {e.type} Eclipse — {e.subtype}
                      </div>
                      <div className={styles.eclipseHi}>{e.nameHi}</div>
                      <div className={styles.eclipseVis}>Visibility: {e.visibility}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

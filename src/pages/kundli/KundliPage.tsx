import { useState, useMemo } from 'react';
import * as Astronomy from 'astronomy-engine';
import styles from './KundliPage.module.css';

const SIGNS = [
  { name: 'Aries', nameHi: 'मेष', symbol: '♈' },
  { name: 'Taurus', nameHi: 'वृषभ', symbol: '♉' },
  { name: 'Gemini', nameHi: 'मिथुन', symbol: '♊' },
  { name: 'Cancer', nameHi: 'कर्क', symbol: '♋' },
  { name: 'Leo', nameHi: 'सिंह', symbol: '♌' },
  { name: 'Virgo', nameHi: 'कन्या', symbol: '♍' },
  { name: 'Libra', nameHi: 'तुला', symbol: '♎' },
  { name: 'Scorpio', nameHi: 'वृश्चिक', symbol: '♏' },
  { name: 'Sagittarius', nameHi: 'धनु', symbol: '♐' },
  { name: 'Capricorn', nameHi: 'मकर', symbol: '♑' },
  { name: 'Aquarius', nameHi: 'कुम्भ', symbol: '♒' },
  { name: 'Pisces', nameHi: 'मीन', symbol: '♓' },
];

const PLANETS = [
  { body: 'Sun' as const, name: 'Sun', nameHi: 'सूर्य', abbr: 'Su' },
  { body: 'Moon' as const, name: 'Moon', nameHi: 'चन्द्र', abbr: 'Mo' },
  { body: 'Mars' as const, name: 'Mars', nameHi: 'मंगल', abbr: 'Ma' },
  { body: 'Mercury' as const, name: 'Mercury', nameHi: 'बुध', abbr: 'Me' },
  { body: 'Jupiter' as const, name: 'Jupiter', nameHi: 'बृहस्पति', abbr: 'Ju' },
  { body: 'Venus' as const, name: 'Venus', nameHi: 'शुक्र', abbr: 'Ve' },
  { body: 'Saturn' as const, name: 'Saturn', nameHi: 'शनि', abbr: 'Sa' },
];

const AYANAMSA = 24.11;

interface PlanetPos {
  name: string;
  nameHi: string;
  abbr: string;
  longitude: number;
  siderealLong: number;
  sign: number;
  degree: number;
}

function getSiderealPositions(date: Date): PlanetPos[] {
  const t = Astronomy.MakeTime(date);
  return PLANETS.map((p) => {
    let lon: number;
    if (p.body === 'Sun') {
      lon = Astronomy.SunPosition(t).elon;
    } else if (p.body === 'Moon') {
      const geo = Astronomy.GeoMoon(t);
      const ecl = Astronomy.Ecliptic(geo);
      lon = ecl.elon;
    } else {
      lon = Astronomy.EclipticLongitude(p.body, t);
    }
    const sid = ((lon - AYANAMSA) % 360 + 360) % 360;
    const sign = Math.floor(sid / 30);
    const degree = sid % 30;
    return { name: p.name, nameHi: p.nameHi, abbr: p.abbr, longitude: lon, siderealLong: sid, sign, degree };
  });
}

function getRahuKetu(date: Date): { rahu: PlanetPos; ketu: PlanetPos } {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  // Mean longitude of ascending node (Rahu) — Meeus formula
  let rahuTropical = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T;
  rahuTropical = ((rahuTropical % 360) + 360) % 360;
  const rahuLon = ((rahuTropical - AYANAMSA) % 360 + 360) % 360;
  const ketuLon = (rahuLon + 180) % 360;

  return {
    rahu: { name: 'Rahu', nameHi: 'राहु', abbr: 'Ra', longitude: rahuTropical, siderealLong: rahuLon, sign: Math.floor(rahuLon / 30), degree: rahuLon % 30 },
    ketu: { name: 'Ketu', nameHi: 'केतु', abbr: 'Ke', longitude: (rahuTropical + 180) % 360, siderealLong: ketuLon, sign: Math.floor(ketuLon / 30), degree: ketuLon % 30 },
  };
}

function getLagna(date: Date, lat: number, _lon: number): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  const lst = ((gmst + _lon) % 360 + 360) % 360;
  const obliquity = 23.4393 - 0.0130 * T;
  const oblRad = obliquity * Math.PI / 180;
  const lstRad = lst * Math.PI / 180;
  const latRad = lat * Math.PI / 180;
  let ascendant = Math.atan2(Math.cos(lstRad), -(Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad)));
  ascendant = ((ascendant * 180 / Math.PI) % 360 + 360) % 360;
  return ((ascendant - AYANAMSA) % 360 + 360) % 360;
}

function NorthIndianChart({ lagnaSign, planets }: { lagnaSign: number; planets: PlanetPos[] }) {
  const size = 320;
  const half = size / 2;
  const houseOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const housePositions: Array<{ x: number; y: number }> = [
    { x: half, y: 20 },
    { x: size - 60, y: 20 },
    { x: size - 30, y: half - 40 },
    { x: size - 60, y: half + 10 },
    { x: half, y: half + 10 },
    { x: 60, y: half + 10 },
    { x: 30, y: half - 40 },
    { x: 60, y: 20 },
    { x: half, y: half - 40 },
    { x: size - 30, y: 20 },
    { x: size - 30, y: half + 10 },
    { x: 30, y: half + 10 },
  ];

  const planetsByHouse: Record<number, string[]> = {};
  for (const p of planets) {
    const house = ((p.sign - lagnaSign + 12) % 12);
    (planetsByHouse[house] ??= []).push(p.abbr);
  }

  const lines = [
    `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`,
    `M 0 0 L ${half} ${half}`,
    `M ${size} 0 L ${half} ${half}`,
    `M ${size} ${size} L ${half} ${half}`,
    `M 0 ${size} L ${half} ${half}`,
    `M ${half} 0 L 0 ${half}`,
    `M ${half} 0 L ${size} ${half}`,
    `M ${size} ${half} L ${half} ${size}`,
    `M 0 ${half} L ${half} ${size}`,
  ];

  const houseCenters: Array<{ x: number; y: number }> = [
    { x: half, y: half * 0.35 },
    { x: half + half * 0.35, y: half * 0.15 },
    { x: size - half * 0.2, y: half },
    { x: half + half * 0.35, y: size - half * 0.15 },
    { x: half, y: size - half * 0.35 },
    { x: half - half * 0.35, y: size - half * 0.15 },
    { x: half * 0.2, y: half },
    { x: half - half * 0.35, y: half * 0.15 },
    { x: half, y: half * 0.72 },
    { x: half + half * 0.65, y: half },
    { x: half, y: size - half * 0.72 },
    { x: half - half * 0.65, y: half },
  ];

  return (
    <svg viewBox={`-2 -2 ${size + 4} ${size + 4}`} className={styles.chartSvg}>
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="var(--border-secondary)" strokeWidth="1.5" />
      ))}
      {houseOrder.map((h) => {
        const signIdx = (lagnaSign + h) % 12;
        const sign = SIGNS[signIdx]!;
        const center = houseCenters[h]!;
        const planetsInHouse = planetsByHouse[h] ?? [];
        return (
          <g key={h}>
            <text x={center.x} y={center.y - 8} textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">
              {sign.symbol} {sign.nameHi}
            </text>
            {planetsInHouse.length > 0 && (
              <text x={center.x} y={center.y + 10} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent-primary)">
                {planetsInHouse.join(' ')}
              </text>
            )}
          </g>
        );
      })}
      <text x={half} y={half + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-primary)">
        Asc
      </text>
    </svg>
  );
}

export function KundliPage() {
  const now = new Date();
  const [birthDate, setBirthDate] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  );
  const [birthTime, setBirthTime] = useState('06:00');
  const [lat, setLat] = useState('28.6139');
  const [lon, setLon] = useState('77.2090');

  const chart = useMemo(() => {
    const [y, m, d] = birthDate.split('-').map(Number);
    const [hh, mm] = birthTime.split(':').map(Number);
    const dt = new Date(y!, m! - 1, d!, hh, mm);
    const planets = getSiderealPositions(dt);
    const { rahu, ketu } = getRahuKetu(dt);
    const allPlanets = [...planets, rahu, ketu];
    const lagnaLon = getLagna(dt, parseFloat(lat), parseFloat(lon));
    const lagnaSign = Math.floor(lagnaLon / 30);
    const lagnaDeg = lagnaLon % 30;
    return { planets: allPlanets, lagnaSign, lagnaDeg, dt };
  }, [birthDate, birthTime, lat, lon]);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Kundli · कुंडली</h1>
          <p className={styles.subtitle}>Vedic birth chart with sidereal planetary positions (Lahiri Ayanamsa)</p>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Birth Date</label>
            <input type="date" className={styles.formInput} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Birth Time</label>
            <input type="time" className={styles.formInput} value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Latitude</label>
            <input type="number" step="0.0001" className={styles.formInput} value={lat} onChange={(e) => setLat(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Longitude</label>
            <input type="number" step="0.0001" className={styles.formInput} value={lon} onChange={(e) => setLon(e.target.value)} />
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Lagna (Ascendant)</div>
            <div className={styles.infoValue}>{SIGNS[chart.lagnaSign]?.name}</div>
            <div className={styles.infoValueHi}>{SIGNS[chart.lagnaSign]?.symbol} {SIGNS[chart.lagnaSign]?.nameHi} {chart.lagnaDeg.toFixed(1)}°</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Moon Sign (Rashi)</div>
            <div className={styles.infoValue}>{SIGNS[chart.planets.find((p) => p.name === 'Moon')!.sign]?.name}</div>
            <div className={styles.infoValueHi}>{SIGNS[chart.planets.find((p) => p.name === 'Moon')!.sign]?.symbol} {SIGNS[chart.planets.find((p) => p.name === 'Moon')!.sign]?.nameHi}</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Sun Sign</div>
            <div className={styles.infoValue}>{SIGNS[chart.planets.find((p) => p.name === 'Sun')!.sign]?.name}</div>
            <div className={styles.infoValueHi}>{SIGNS[chart.planets.find((p) => p.name === 'Sun')!.sign]?.symbol} {SIGNS[chart.planets.find((p) => p.name === 'Sun')!.sign]?.nameHi}</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoLabel}>Birth Date & Time</div>
            <div className={styles.infoValue}>{chart.dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div className={styles.infoValueHi}>{chart.dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Rashi Chart (D1)</div>
            <div className={styles.chartTitleHi}>राशि चार्ट</div>
            <NorthIndianChart lagnaSign={chart.lagnaSign} planets={chart.planets} />
          </div>

          <div className={styles.chartBox}>
            <div className={styles.chartTitle}>Planetary Positions</div>
            <div className={styles.chartTitleHi}>ग्रह स्थिति</div>
            <table className={styles.planetTable}>
              <thead>
                <tr>
                  <th>Planet</th>
                  <th>Sign</th>
                  <th>Degree</th>
                </tr>
              </thead>
              <tbody>
                {chart.planets.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <div className={styles.planetName}>{p.name}</div>
                      <div className={styles.planetNameHi}>{p.nameHi}</div>
                    </td>
                    <td>
                      {SIGNS[p.sign]?.symbol} {SIGNS[p.sign]?.name}
                      <div className={styles.planetNameHi}>{SIGNS[p.sign]?.nameHi}</div>
                    </td>
                    <td>{p.degree.toFixed(2)}°</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <div className={styles.planetName}>Lagna</div>
                    <div className={styles.planetNameHi}>लग्न</div>
                  </td>
                  <td>
                    {SIGNS[chart.lagnaSign]?.symbol} {SIGNS[chart.lagnaSign]?.name}
                    <div className={styles.planetNameHi}>{SIGNS[chart.lagnaSign]?.nameHi}</div>
                  </td>
                  <td>{chart.lagnaDeg.toFixed(2)}°</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.disclaimer}>
          This is an approximate Kundli generated using astronomical calculations with Lahiri Ayanamsa (24.11°).
          For precise readings, consult a qualified Jyotish astrologer. Rahu/Ketu positions are approximate.
        </div>
      </div>
    </main>
  );
}

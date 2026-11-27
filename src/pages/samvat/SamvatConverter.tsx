import { useState, useMemo } from 'react';
import styles from './SamvatConverter.module.css';

interface CalendarEra {
  name: string;
  nameHi: string;
  offset: number;
  desc: string;
}

const ERAS: CalendarEra[] = [
  { name: 'Vikram Samvat', nameHi: 'विक्रम संवत्', offset: 57, desc: 'Hindu lunisolar calendar started by King Vikramaditya. Begins at Chaitra Shukla Pratipada (spring new year). Used widely in North India and Nepal.' },
  { name: 'Shaka Samvat', nameHi: 'शक संवत्', offset: -78, desc: 'National Calendar of India (since 1957). Started by the Shalivahana dynasty. Begins at Chaitra 1 (around March 22). Used in government gazette.' },
  { name: 'Kali Yuga', nameHi: 'कलियुग', offset: 3102, desc: 'The current cosmic age in Hindu cosmology. Started on 17/18 February 3102 BCE when Lord Krishna departed. 4,32,000 years long.' },
  { name: 'Bengali San', nameHi: 'বঙ্গাব্দ', offset: -594, desc: 'Bengali calendar era introduced by Shashanka or later by Akbar. Starts at Pohela Boishakh (mid-April). Used in Bengal and Bangladesh.' },
  { name: 'Kollam Era', nameHi: 'കൊല്ലവര്‍ഷം', offset: -825, desc: 'Malayalam calendar era (Kollavarsham). Begins in 825 CE. Used in Kerala. Month of Chingam starts around mid-August.' },
  { name: 'Thiruvalluvar', nameHi: 'திருவள்ளுவர் ஆண்டு', offset: 31, desc: 'Tamil calendar era honoring the great poet-saint Thiruvalluvar. Used in Tamil Nadu. 31 years ahead of the Gregorian calendar.' },
  { name: 'Fasli Year', nameHi: 'फसली', offset: -593, desc: 'Agricultural calendar introduced by Akbar in 1585 CE. Used for revenue collection. Starts around September-October in some regions.' },
  { name: 'Buddhist Era', nameHi: 'बौद्ध संवत्', offset: 544, desc: 'Calendar starting from the Parinirvana of Gautama Buddha in 544 BCE. Used in Sri Lanka, Myanmar, Thailand, Cambodia, Laos.' },
  { name: 'Jain Vira Nirvana', nameHi: 'वीर निर्वाण संवत्', offset: 527, desc: 'Jain calendar beginning from the Nirvana of Lord Mahavira in 527 BCE. Used in Jain communities across India.' },
  { name: 'Hijri (Islamic)', nameHi: 'हिजरी', offset: 0, desc: 'Islamic lunar calendar starting from Prophet Muhammad\'s migration to Medina (622 CE). Approximately: Gregorian - 622, adjusted for lunar year.' },
];

function computeYears(gregorianYear: number) {
  return ERAS.map((era) => {
    let year: number;
    if (era.name === 'Hijri (Islamic)') {
      year = Math.floor((gregorianYear - 622) * (33 / 32));
    } else {
      year = gregorianYear + era.offset;
    }
    return { ...era, year };
  });
}

export function SamvatConverter() {
  const [inputYear, setInputYear] = useState(new Date().getFullYear().toString());

  const results = useMemo(() => {
    const y = parseInt(inputYear, 10);
    if (isNaN(y) || y < 1 || y > 9999) return [];
    return computeYears(y);
  }, [inputYear]);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Samvat Converter</h1>
          <p className={styles.subtitle}>संवत् परिवर्तक — Convert between Indian calendar eras and Gregorian year</p>
        </div>

        <div className={styles.converter}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Gregorian (CE) Year</label>
            <input
              type="number"
              className={styles.formInput}
              value={inputYear}
              onChange={(e) => setInputYear(e.target.value)}
              min="1"
              max="9999"
            />
          </div>
        </div>

        {results.length > 0 && (
          <div className={styles.results}>
            {results.map((r) => (
              <div key={r.name} className={styles.card}>
                <div className={styles.cardName}>
                  {r.name}
                  <span className={styles.cardNameHi}> {r.nameHi}</span>
                </div>
                <div className={styles.cardValue}>{r.year}</div>
                <div className={styles.cardDesc}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}

        <h2 className={styles.sectionTitle}>About Indian Calendar Systems</h2>
        <div className={styles.sectionTitleHi}>भारतीय पंचांग प्रणालियाँ</div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle}>Lunisolar System</div>
            <div className={styles.infoCardTitleHi}>चान्द्र-सौर पद्धति</div>
            <p className={styles.infoCardText}>
              Most Indian calendars are lunisolar — months follow the Moon (Shukla/Krishna Paksha) while the year follows the Sun (Uttarayana/Dakshinayana). An intercalary month (Adhik Maas) is added every 2–3 years to keep them aligned.
            </p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle}>Purnimant vs Amant</div>
            <div className={styles.infoCardTitleHi}>पूर्णिमान्त बनाम अमान्त</div>
            <p className={styles.infoCardText}>
              North Indian tradition (Purnimant) ends the month on Purnima (full moon), while South Indian (Amant) ends on Amavasya (new moon). Same days, different month boundaries — festivals may fall in "different" months.
            </p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle}>Yugic Time</div>
            <div className={styles.infoCardTitleHi}>युग काल गणना</div>
            <p className={styles.infoCardText}>
              Hindu cosmology measures time in yugas: Satya (17,28,000 yrs), Treta (12,96,000 yrs), Dvapara (8,64,000 yrs), Kali (4,32,000 yrs). One Maha Yuga = 43,20,000 years. We are ~5,100 years into Kali Yuga.
            </p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle}>Saka Calendar (National)</div>
            <div className={styles.infoCardTitleHi}>शक संवत् (राष्ट्रीय)</div>
            <p className={styles.infoCardText}>
              Adopted in 1957, the Indian National Calendar uses the Saka era with 12 months. Chaitra 1 falls on March 22 (March 21 in leap years). It is the official civil calendar alongside Gregorian in government use.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

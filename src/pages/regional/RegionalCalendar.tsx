import { useState } from 'react';
import styles from './RegionalCalendar.module.css';

interface HinduMonth {
  num: number;
  name: string;
  nameHi: string;
  gregorian: string;
  season: string;
  seasonHi: string;
  seasonColor: string;
}

interface RegionalNewYear {
  name: string;
  nameHi: string;
  region: string;
  date: string;
  description: string;
}

interface Sankranti {
  name: string;
  nameHi: string;
  sign: string;
  date: string;
}

interface Era {
  name: string;
  nameHi: string;
  year: number;
  description: string;
}

const HINDU_MONTHS: HinduMonth[] = [
  { num: 1, name: 'Chaitra', nameHi: 'चैत्र', gregorian: 'Mar–Apr', season: 'Vasanta', seasonHi: 'वसन्त', seasonColor: '#27ae60' },
  { num: 2, name: 'Vaishakha', nameHi: 'वैशाख', gregorian: 'Apr–May', season: 'Vasanta', seasonHi: 'वसन्त', seasonColor: '#27ae60' },
  { num: 3, name: 'Jyeshtha', nameHi: 'ज्येष्ठ', gregorian: 'May–Jun', season: 'Grishma', seasonHi: 'ग्रीष्म', seasonColor: '#e74c3c' },
  { num: 4, name: 'Ashadha', nameHi: 'आषाढ़', gregorian: 'Jun–Jul', season: 'Grishma', seasonHi: 'ग्रीष्म', seasonColor: '#e74c3c' },
  { num: 5, name: 'Shravana', nameHi: 'श्रावण', gregorian: 'Jul–Aug', season: 'Varsha', seasonHi: 'वर्षा', seasonColor: '#2980b9' },
  { num: 6, name: 'Bhadrapada', nameHi: 'भाद्रपद', gregorian: 'Aug–Sep', season: 'Varsha', seasonHi: 'वर्षा', seasonColor: '#2980b9' },
  { num: 7, name: 'Ashvina', nameHi: 'आश्विन', gregorian: 'Sep–Oct', season: 'Sharad', seasonHi: 'शरद्', seasonColor: '#e67e22' },
  { num: 8, name: 'Kartika', nameHi: 'कार्तिक', gregorian: 'Oct–Nov', season: 'Sharad', seasonHi: 'शरद्', seasonColor: '#e67e22' },
  { num: 9, name: 'Margashirsha', nameHi: 'मार्गशीर्ष', gregorian: 'Nov–Dec', season: 'Hemanta', seasonHi: 'हेमन्त', seasonColor: '#8e44ad' },
  { num: 10, name: 'Pausha', nameHi: 'पौष', gregorian: 'Dec–Jan', season: 'Hemanta', seasonHi: 'हेमन्त', seasonColor: '#8e44ad' },
  { num: 11, name: 'Magha', nameHi: 'माघ', gregorian: 'Jan–Feb', season: 'Shishira', seasonHi: 'शिशिर', seasonColor: '#3498db' },
  { num: 12, name: 'Phalguna', nameHi: 'फाल्गुन', gregorian: 'Feb–Mar', season: 'Shishira', seasonHi: 'शिशिर', seasonColor: '#3498db' },
];

const REGIONAL_NEW_YEARS: RegionalNewYear[] = [
  { name: 'Gudi Padwa', nameHi: 'गुड़ी पड़वा', region: 'Maharashtra, Goa', date: 'Chaitra Shukla 1 (Mar–Apr)', description: 'Marathi New Year. A decorated gudi (flag) is hoisted outside homes, symbolizing victory and prosperity.' },
  { name: 'Ugadi', nameHi: 'उगादि', region: 'Andhra Pradesh, Telangana, Karnataka', date: 'Chaitra Shukla 1 (Mar–Apr)', description: 'Telugu and Kannada New Year. Celebrated with Ugadi Pachadi — a dish of six tastes representing life\'s experiences.' },
  { name: 'Puthandu', nameHi: 'पुत्थांडु', region: 'Tamil Nadu', date: '14 April (Mesha Sankranti)', description: 'Tamil New Year marked by the Sun entering Mesha (Aries). Homes are decorated with kolam and mango leaves.' },
  { name: 'Vishu', nameHi: 'विषु', region: 'Kerala', date: '14–15 April (Mesha Sankranti)', description: 'Malayalam New Year. The first sight on Vishu morning (Vishukkani) of auspicious items is believed to bring good fortune.' },
  { name: 'Baisakhi', nameHi: 'बैसाखी', region: 'Punjab, Haryana', date: '13–14 April', description: 'Punjabi New Year and harvest festival. Also commemorates the founding of the Khalsa by Guru Gobind Singh in 1699.' },
  { name: 'Bihu', nameHi: 'बिहू', region: 'Assam', date: '14–15 April', description: 'Assamese New Year (Rongali/Bohag Bihu). A week of feasting, music, and Bihu dance celebrating the agricultural new year.' },
  { name: 'Poila Boishakh', nameHi: 'पोइला बैशाख', region: 'West Bengal, Bangladesh', date: '14–15 April', description: 'Bengali New Year. Celebrated with cultural events, processions, and opening new account books (Halkhata).' },
  { name: 'Navreh', nameHi: 'नवरेह', region: 'Kashmir', date: 'Chaitra Shukla 1 (Mar–Apr)', description: 'Kashmiri Pandit New Year. Families view Navreh Thali containing rice, flowers, coins, and a mirror for good luck.' },
  { name: 'Cheti Chand', nameHi: 'चेटी चांद', region: 'Sindhi communities', date: 'Chaitra Shukla 2', description: 'Sindhi New Year celebrating the birth anniversary of Jhulelal, the patron saint of Sindhis.' },
  { name: 'Losoong', nameHi: 'लोसूंग', region: 'Sikkim', date: 'December', description: 'Sikkimese New Year. Farmers celebrate the end of the harvest season with traditional Chaam dance.' },
];

const SANKRANTIS_2026: Sankranti[] = [
  { name: 'Makar Sankranti', nameHi: 'मकर संक्रांति', sign: 'Capricorn (Makara)', date: '2026-01-14' },
  { name: 'Kumbha Sankranti', nameHi: 'कुम्भ संक्रांति', sign: 'Aquarius (Kumbha)', date: '2026-02-13' },
  { name: 'Meena Sankranti', nameHi: 'मीन संक्रांति', sign: 'Pisces (Meena)', date: '2026-03-14' },
  { name: 'Mesha Sankranti', nameHi: 'मेष संक्रांति', sign: 'Aries (Mesha)', date: '2026-04-14' },
  { name: 'Vrishabha Sankranti', nameHi: 'वृषभ संक्रांति', sign: 'Taurus (Vrishabha)', date: '2026-05-15' },
  { name: 'Mithuna Sankranti', nameHi: 'मिथुन संक्रांति', sign: 'Gemini (Mithuna)', date: '2026-06-15' },
  { name: 'Karka Sankranti', nameHi: 'कर्क संक्रांति', sign: 'Cancer (Karka)', date: '2026-07-16' },
  { name: 'Simha Sankranti', nameHi: 'सिंह संक्रांति', sign: 'Leo (Simha)', date: '2026-08-17' },
  { name: 'Kanya Sankranti', nameHi: 'कन्या संक्रांति', sign: 'Virgo (Kanya)', date: '2026-09-17' },
  { name: 'Tula Sankranti', nameHi: 'तुला संक्रांति', sign: 'Libra (Tula)', date: '2026-10-17' },
  { name: 'Vrischika Sankranti', nameHi: 'वृश्चिक संक्रांति', sign: 'Scorpio (Vrischika)', date: '2026-11-16' },
  { name: 'Dhanu Sankranti', nameHi: 'धनु संक्रांति', sign: 'Sagittarius (Dhanu)', date: '2026-12-16' },
];

const ERAS: Era[] = [
  { name: 'Vikram Samvat', nameHi: 'विक्रम संवत', year: 2083, description: 'Founded by Emperor Vikramaditya in 57 BCE. Widely used in North India, Nepal, and Gujarat. The official calendar of Nepal.' },
  { name: 'Shaka Samvat', nameHi: 'शक संवत', year: 1948, description: 'National Calendar of India (Saka era) starting 78 CE. Used in official government communications alongside the Gregorian calendar.' },
  { name: 'Kali Yuga', nameHi: 'कलियुग', year: 5127, description: 'Current era in Hindu cosmology, started 3102 BCE. The fourth and final age in the cycle of four Yugas, lasting 432,000 years.' },
  { name: 'Bengali San', nameHi: 'बंगाब्द', year: 1433, description: 'Bengali calendar era, believed to be introduced by Mughal Emperor Akbar for tax collection. Starts from 593 CE.' },
  { name: 'Kollam Era', nameHi: 'कोल्लम', year: 1202, description: 'Malayalam calendar era starting 825 CE. Used in Kerala, one of the oldest regional calendar systems in India.' },
  { name: 'Thiruvalluvar Era', nameHi: 'तिरुवल्लुवर', year: 2057, description: 'Tamil calendar era honoring the poet Thiruvalluvar. Used in Tamil Nadu, calculated as Gregorian year + 31.' },
];

const TABS = ['Hindu Months', 'Regional New Years', 'Sankranti', 'Calendar Eras'] as const;

function getCurrentHinduMonth(): number {
  const m = new Date().getMonth();
  if (m >= 2 && m <= 3) return 1;
  if (m >= 3 && m <= 4) return 2;
  if (m >= 4 && m <= 5) return 3;
  if (m >= 5 && m <= 6) return 4;
  if (m >= 6 && m <= 7) return 5;
  if (m >= 7 && m <= 8) return 6;
  if (m >= 8 && m <= 9) return 7;
  if (m >= 9 && m <= 10) return 8;
  if (m >= 10 && m <= 11) return 9;
  if (m === 11 || m === 0) return 10;
  if (m === 0 || m === 1) return 11;
  return 12;
}

export function RegionalCalendar() {
  const [tab, setTab] = useState<typeof TABS[number]>('Hindu Months');
  const currentMonth = getCurrentHinduMonth();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Regional Calendar · क्षेत्रीय कैलेंडर</h1>
          <p className={styles.subtitle}>Hindu months, Sankranti dates, regional new years & calendar eras</p>
        </div>

        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Hindu Months' && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>12 Hindu Months (Purnimant)</h2>
              <p className={styles.sectionTitleHi}>बारह हिन्दू मास (पूर्णिमान्त)</p>
            </div>
            <div className={styles.monthGrid}>
              {HINDU_MONTHS.map((m) => (
                <div
                  key={m.num}
                  className={`${styles.monthCard} ${m.num === currentMonth ? styles.monthCardCurrent : ''}`}
                >
                  <div className={styles.monthNum}>Month {m.num}</div>
                  <div className={styles.monthName}>{m.name}</div>
                  <div className={styles.monthNameHi}>{m.nameHi}</div>
                  <div className={styles.monthGreg}>{m.gregorian}</div>
                  <div className={styles.monthSeason} style={{ background: m.seasonColor }}>
                    {m.season} · {m.seasonHi}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Six Ritus (Seasons)</h2>
              <p className={styles.sectionTitleHi}>छह ऋतुएँ</p>
            </div>
            <div className={styles.newYearGrid}>
              {[
                { name: 'Vasanta', nameHi: 'वसन्त (Spring)', months: 'Chaitra – Vaishakha', color: '#27ae60', desc: 'Season of flowers and new beginnings. Nature blooms, Holi and Navratri fall in this period.' },
                { name: 'Grishma', nameHi: 'ग्रीष्म (Summer)', months: 'Jyeshtha – Ashadha', color: '#e74c3c', desc: 'Hottest season. Rivers dry up, the sun is harsh. Nirjala Ekadashi falls in Jyeshtha.' },
                { name: 'Varsha', nameHi: 'वर्षा (Monsoon)', months: 'Shravana – Bhadrapada', color: '#2980b9', desc: 'The rains arrive. Chaturmas begins. Festivals like Raksha Bandhan, Janmashtami and Ganesh Chaturthi.' },
                { name: 'Sharad', nameHi: 'शरद् (Autumn)', months: 'Ashvina – Kartika', color: '#e67e22', desc: 'Clear skies after monsoon. The great festival season — Navaratri, Dussehra, Diwali, Chhath.' },
                { name: 'Hemanta', nameHi: 'हेमन्त (Pre-winter)', months: 'Margashirsha – Pausha', color: '#8e44ad', desc: 'Cool and pleasant. Harvest festivals, Makar Sankranti preparations.' },
                { name: 'Shishira', nameHi: 'शिशिर (Winter)', months: 'Magha – Phalguna', color: '#3498db', desc: 'Coldest season. Magh Mela, Kumbh Mela, Basant Panchami, and Maha Shivaratri.' },
              ].map((s) => (
                <div key={s.name} className={styles.newYearCard}>
                  <div className={styles.newYearName} style={{ color: s.color }}>{s.name}</div>
                  <div className={styles.newYearNameHi}>{s.nameHi}</div>
                  <div className={styles.newYearRegion}>{s.months}</div>
                  <div className={styles.newYearDesc}>{s.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'Regional New Years' && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Regional New Years of India</h2>
              <p className={styles.sectionTitleHi}>भारत के क्षेत्रीय नव वर्ष</p>
            </div>
            <div className={styles.newYearGrid}>
              {REGIONAL_NEW_YEARS.map((ny) => (
                <div key={ny.name} className={styles.newYearCard}>
                  <div className={styles.newYearName}>{ny.name}</div>
                  <div className={styles.newYearNameHi}>{ny.nameHi}</div>
                  <div className={styles.newYearRegion}>{ny.region}</div>
                  <div className={styles.newYearDate}>{ny.date}</div>
                  <div className={styles.newYearDesc}>{ny.description}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'Sankranti' && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Solar Transits (Sankranti) 2026</h2>
              <p className={styles.sectionTitleHi}>सूर्य संक्रांति २०२६</p>
            </div>
            <div className={styles.sankrantiList}>
              {SANKRANTIS_2026.map((s) => {
                const d = new Date(s.date + 'T00:00:00');
                const isPast = s.date < today;
                return (
                  <div key={s.name} className={`${styles.sankrantiCard} ${isPast ? styles.sankrantiCardPast : ''}`}>
                    <div className={styles.sankrantiDate}>
                      <div className={styles.sankrantiDay}>{d.getDate()}</div>
                      <div className={styles.sankrantiMonth}>
                        {d.toLocaleDateString('en-IN', { month: 'short' })}
                      </div>
                    </div>
                    <div className={styles.sankrantiInfo}>
                      <div className={styles.sankrantiName}>{s.name}</div>
                      <div className={styles.sankrantiNameHi}>{s.nameHi}</div>
                      <div className={styles.sankrantiSign}>{s.sign}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === 'Calendar Eras' && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Indian Calendar Eras</h2>
              <p className={styles.sectionTitleHi}>भारतीय कैलेंडर युग</p>
            </div>
            <div className={styles.eraGrid}>
              {ERAS.map((e) => (
                <div key={e.name} className={styles.eraCard}>
                  <div className={styles.eraYear}>{e.year}</div>
                  <div className={styles.eraName}>{e.name}</div>
                  <div className={styles.eraNameHi}>{e.nameHi}</div>
                  <div className={styles.eraDesc}>{e.description}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

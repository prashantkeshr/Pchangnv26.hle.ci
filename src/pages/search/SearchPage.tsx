import { useState, useMemo } from 'react';
import { Search as SearchIcon, Calendar, Sparkles, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FESTIVALS_2026, FESTIVAL_TYPE_COLORS, FESTIVAL_TYPE_LABELS } from '@/data/festivals';
import styles from './SearchPage.module.css';

interface SearchResult {
  type: 'festival' | 'page' | 'concept';
  title: string;
  titleHi?: string;
  description: string;
  link: string;
  badge?: string;
  badgeColor?: string;
}

const PAGES: SearchResult[] = [
  { type: 'page', title: 'Home Dashboard', titleHi: 'होम डैशबोर्ड', description: 'Daily Panchang overview with sun, moon, and muhurat data.', link: '/' },
  { type: 'page', title: 'Panchang Detail', titleHi: 'पंचांग विस्तार', description: 'Full Panchang data with Tithi, Nakshatra, Yoga, Karana details.', link: '/panchang' },
  { type: 'page', title: 'Calendar', titleHi: 'कैलेंडर', description: 'Monthly calendar with festivals and Panchang overview per day.', link: '/calendar' },
  { type: 'page', title: 'Festivals', titleHi: 'त्यौहार', description: 'Complete list of festivals and observances for 2026.', link: '/festivals' },
  { type: 'page', title: 'Muhurat', titleHi: 'मुहूर्त', description: 'Daily auspicious and inauspicious time windows.', link: '/muhurat' },
  { type: 'page', title: 'Astronomy', titleHi: 'खगोल विज्ञान', description: 'Planetary positions, sun/moon data, eclipses.', link: '/astronomy' },
  { type: 'page', title: 'Devotional', titleHi: 'भक्ति', description: 'Aartis, Mantras, Puja guides, and Chalisas for daily worship.', link: '/devotional' },
  { type: 'page', title: 'Horoscope', titleHi: 'राशिफल', description: 'Vedic Rashi insights, daily predictions, and compatibility.', link: '/horoscope' },
  { type: 'page', title: 'Vrat & Upvas', titleHi: 'व्रत और उपवास', description: 'Fasting calendar, Ekadashi dates, rules, and food guidelines.', link: '/vrat' },
  { type: 'page', title: 'Knowledge', titleHi: 'ज्ञान', description: 'Educational articles on Panchang, astronomy, and Indian traditions.', link: '/knowledge' },
  { type: 'page', title: 'My Calendar', titleHi: 'मेरा कैलेंडर', description: 'Personal events, birthdays, anniversaries stored locally.', link: '/personal' },
  { type: 'page', title: 'Regional Calendar', titleHi: 'क्षेत्रीय कैलेंडर', description: 'Hindu months, Sankranti dates, regional new years and calendar eras.', link: '/regional' },
  { type: 'page', title: 'Nakshatra', titleHi: 'नक्षत्र', description: 'All 27 Nakshatras with deity, ruler, nature, padas and traits.', link: '/nakshatra' },
  { type: 'page', title: 'Kundli', titleHi: 'कुंडली', description: 'Vedic birth chart with sidereal planetary positions and North Indian chart.', link: '/kundli' },
  { type: 'page', title: 'Temples & Pilgrimages', titleHi: 'मन्दिर और तीर्थयात्रा', description: 'Sacred temples of India with pilgrimage circuits.', link: '/temples' },
  { type: 'page', title: 'Prasad & Recipes', titleHi: 'प्रसाद और व्यंजन', description: 'Sacred food offerings, fasting recipes and festive sweets.', link: '/recipes' },
  { type: 'page', title: 'Yoga & Meditation', titleHi: 'योग एवं ध्यान', description: 'Yoga asanas, pranayama, mantras, meditation timer and techniques.', link: '/yoga' },
  { type: 'page', title: 'Samvat Converter', titleHi: 'संवत् परिवर्तक', description: 'Convert between Indian calendar eras — Vikram, Shaka, Kali Yuga, Bengali and more.', link: '/samvat' },
  { type: 'page', title: 'Numerology', titleHi: 'अंक ज्योतिष', description: 'Vedic numerology — Life Path, Birth Number, Destiny Number from name and birth date.', link: '/numerology' },
  { type: 'page', title: 'Daily Wisdom', titleHi: 'दैनिक ज्ञान', description: 'Daily wisdom quotes from Vedas, Upanishads, Bhagavad Gita, and ancient Indian texts.', link: '/wisdom' },
  { type: 'page', title: 'Settings', titleHi: 'सेटिंग्स', description: 'Theme, location, and app preferences.', link: '/settings' },
];

const CONCEPTS: SearchResult[] = [
  { type: 'concept', title: 'Tithi', titleHi: 'तिथि', description: 'Lunar day based on the angular distance between Sun and Moon. 30 tithis in a lunar month.', link: '/panchang' },
  { type: 'concept', title: 'Nakshatra', titleHi: 'नक्षत्र', description: 'Lunar mansion — 27 divisions of the ecliptic, each 13°20\' wide. Used for muhurat and astrology.', link: '/panchang' },
  { type: 'concept', title: 'Yoga', titleHi: 'योग', description: '27 yogas based on the sum of Sun and Moon longitudes. Used for determining auspiciousness.', link: '/panchang' },
  { type: 'concept', title: 'Karana', titleHi: 'करण', description: 'Half of a Tithi. 11 Karanas in total — 7 recurring and 4 fixed.', link: '/panchang' },
  { type: 'concept', title: 'Rahu Kaal', titleHi: 'राहु काल', description: 'Inauspicious time period of approximately 1.5 hours ruled by Rahu. Varies by day of the week.', link: '/muhurat' },
  { type: 'concept', title: 'Abhijit Muhurat', titleHi: 'अभिजीत मुहूर्त', description: 'The most auspicious muhurat, centered around solar noon. Removes doshas of other muhurats.', link: '/muhurat' },
  { type: 'concept', title: 'Brahma Muhurat', titleHi: 'ब्रह्म मुहूर्त', description: 'Auspicious time 96 minutes before sunrise. Ideal for meditation and spiritual practices.', link: '/muhurat' },
  { type: 'concept', title: 'Ayanamsa', titleHi: 'अयनांश', description: 'The angular difference between tropical and sidereal zodiacs. Lahiri Ayanamsa (~24.11°) is used in this app.', link: '/astronomy' },
  { type: 'concept', title: 'Vikram Samvat', titleHi: 'विक्रम संवत', description: 'Hindu calendar era starting 57 BCE. Widely used in North India. Currently year 2083.', link: '/panchang' },
  { type: 'concept', title: 'Shaka Samvat', titleHi: 'शक संवत', description: 'National Calendar of India starting 78 CE. Used in official Indian government calendars.', link: '/panchang' },
];

export function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const all: SearchResult[] = [
      ...PAGES,
      ...CONCEPTS,
      ...FESTIVALS_2026.map((f): SearchResult => ({
        type: 'festival',
        title: f.name,
        titleHi: f.nameHi,
        description: f.description,
        link: '/festivals',
        badge: FESTIVAL_TYPE_LABELS[f.type],
        badgeColor: FESTIVAL_TYPE_COLORS[f.type],
      })),
    ];

    return all.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.titleHi?.includes(q) ||
      r.description.toLowerCase().includes(q)
    );
  }, [query]);

  const typeIcons: Record<string, typeof Calendar> = {
    page: MapPin,
    festival: Calendar,
    concept: Sparkles,
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Search · खोज</h1>
          <div className={styles.searchBox}>
            <SearchIcon size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search festivals, concepts, pages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
          </div>
        </div>

        {query.trim() === '' ? (
          <div className={styles.suggestions}>
            <h2 className={styles.suggestTitle}>Quick Links</h2>
            <div className={styles.quickLinks}>
              {PAGES.map((p) => (
                <Link key={p.link} to={p.link} className={styles.quickLink}>
                  <MapPin size={14} />
                  <span>{p.title}</span>
                </Link>
              ))}
            </div>
            <h2 className={styles.suggestTitle}>Try searching for</h2>
            <div className={styles.suggestChips}>
              {['Diwali', 'Tithi', 'Rahu Kaal', 'Ekadashi', 'Holi', 'Nakshatra', 'Eclipse'].map((s) => (
                <button key={s} className={styles.suggestChip} onClick={() => setQuery(s)}>
                  <Clock size={12} /> {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className={styles.empty}>
            <p>No results found for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <div className={styles.results}>
            <p className={styles.resultCount}>{results.length} result{results.length !== 1 ? 's' : ''}</p>
            {results.map((r, i) => {
              const Icon = typeIcons[r.type] ?? SearchIcon;
              return (
                <Link key={i} to={r.link} className={styles.resultItem}>
                  <div className={styles.resultIcon}>
                    <Icon size={16} />
                  </div>
                  <div className={styles.resultContent}>
                    <div className={styles.resultHeader}>
                      <span className={styles.resultTitle}>{r.title}</span>
                      {r.titleHi && <span className={styles.resultTitleHi}>{r.titleHi}</span>}
                      {r.badge && (
                        <span className={styles.resultBadge} style={{ background: r.badgeColor }}>
                          {r.badge}
                        </span>
                      )}
                    </div>
                    <p className={styles.resultDesc}>{r.description}</p>
                    <span className={styles.resultType}>{r.type}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

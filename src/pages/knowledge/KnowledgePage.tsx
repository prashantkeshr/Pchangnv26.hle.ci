import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './KnowledgePage.module.css';

interface Article {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  icon: string;
  readTime: string;
  content: string[];
  keyPoints: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Panchang': '#3498db',
  'Astronomy': '#9b59b6',
  'Spirituality': '#e67e22',
  'Calendar': '#27ae60',
  'Astrology': '#e91e63',
  'Culture': '#f1c40f',
};

const ARTICLES: Article[] = [
  {
    id: 'panchang-intro',
    title: 'Understanding the Hindu Panchang',
    titleHi: 'हिंदू पंचांग को समझें',
    category: 'Panchang',
    icon: '📅',
    readTime: '5 min',
    content: [
      'The Panchang (पंचांग) is the Hindu calendar and almanac that provides five key elements (Panch + Ang = five limbs) for each day. These five elements are Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga (luni-solar combination), and Karana (half of a Tithi).',
      'The Panchang is based on the positions of the Sun and Moon as observed from Earth. Unlike the Gregorian calendar which is purely solar, the Hindu Panchang is a lunisolar calendar — it tracks both the Moon\'s phases (for months) and the Sun\'s position (for the year).',
      'Each day in the Panchang is unique because the five elements combine differently. This makes the Panchang essential for determining auspicious times (Muhurat) for important events like weddings, housewarming ceremonies, starting a business, and religious rituals.',
    ],
    keyPoints: [
      'Panch + Ang means five limbs: Tithi, Vara, Nakshatra, Yoga, Karana',
      'Based on actual astronomical positions of Sun and Moon',
      'Lunisolar calendar — combines lunar months with solar year',
      'Essential for determining Muhurat (auspicious timing)',
      'Each regional tradition may have slight variations',
    ],
  },
  {
    id: 'tithi-explained',
    title: 'Tithi: The Lunar Day System',
    titleHi: 'तिथि: चंद्र दिवस प्रणाली',
    category: 'Panchang',
    icon: '🌙',
    readTime: '4 min',
    content: [
      'A Tithi is a lunar day defined by the angular distance between the Sun and Moon. Each Tithi spans exactly 12 degrees of angular separation, so there are 30 Tithis in a complete lunar month (360° / 12° = 30).',
      'The 30 Tithis are divided into two Pakshas (fortnights): Shukla Paksha (waxing, bright fortnight) from new moon to full moon, and Krishna Paksha (waning, dark fortnight) from full moon to new moon. Each Paksha has 15 Tithis.',
      'The names of the 15 Tithis are: Pratipada (1st), Dwitiya (2nd), Tritiya (3rd), Chaturthi (4th), Panchami (5th), Shashthi (6th), Saptami (7th), Ashtami (8th), Navami (9th), Dashami (10th), Ekadashi (11th), Dwadashi (12th), Trayodashi (13th), Chaturdashi (14th), and either Purnima (full moon) or Amavasya (new moon).',
    ],
    keyPoints: [
      'Each Tithi = 12° angular separation between Sun and Moon',
      '30 Tithis per lunar month, 15 per Paksha',
      'Shukla Paksha = waxing (bright), Krishna Paksha = waning (dark)',
      'Tithi duration varies (19-26 hours) unlike a fixed solar day',
      'Ekadashi (11th) and Purnima/Amavasya are most significant',
    ],
  },
  {
    id: 'nakshatra-system',
    title: 'The 27 Nakshatras: Lunar Mansions',
    titleHi: '27 नक्षत्र: चंद्र भवन',
    category: 'Astrology',
    icon: '⭐',
    readTime: '6 min',
    content: [
      'The Nakshatra system divides the ecliptic (the Moon\'s apparent path) into 27 equal segments of 13°20\' each. Each Nakshatra is further divided into 4 Padas (quarters) of 3°20\' each. The Moon transits through all 27 Nakshatras in approximately 27.3 days.',
      'The 27 Nakshatras are: Ashwini, Bharani, Krittika, Rohini, Mrigashira, Ardra, Punarvasu, Pushya, Ashlesha, Magha, Purva Phalguni, Uttara Phalguni, Hasta, Chitra, Swati, Vishakha, Anuradha, Jyeshtha, Mula, Purva Ashadha, Uttara Ashadha, Shravana, Dhanishta, Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, and Revati.',
      'Each Nakshatra has a ruling deity, a planetary lord, and characteristic qualities. The birth Nakshatra (Janma Nakshatra) plays a crucial role in Vedic astrology — it determines the first letter of a person\'s name, compatibility in marriage (through Ashtakoota matching), and planetary periods (Dasha system).',
    ],
    keyPoints: [
      '27 Nakshatras, each spanning 13°20\' of the ecliptic',
      'Each has 4 Padas (quarters) of 3°20\'',
      'Moon completes one Nakshatra circuit in ~27.3 days',
      'Birth Nakshatra determines name letter and Dasha periods',
      'Used in marriage compatibility (Ashtakoota) matching',
    ],
  },
  {
    id: 'ayanamsa-explained',
    title: 'Ayanamsa: Tropical vs Sidereal Zodiac',
    titleHi: 'अयनांश: उष्णकटिबंधीय बनाम नाक्षत्र राशि',
    category: 'Astronomy',
    icon: '🔭',
    readTime: '5 min',
    content: [
      'Ayanamsa is the angular difference between the Tropical zodiac (used in Western astrology) and the Sidereal zodiac (used in Vedic/Indian astrology). This difference arises because of the precession of equinoxes — the slow wobble of Earth\'s axis that causes the vernal equinox point to shift westward along the ecliptic.',
      'The precession rate is approximately 50.3 arc-seconds per year, which means the Tropical and Sidereal zodiacs diverge by about 1 degree every 72 years. The two systems were aligned around 285 CE. As of 2026, the Lahiri Ayanamsa (the most widely used in India and official Ayanamsa of the Indian government) is approximately 24.11 degrees.',
      'This means that if the Sun is at 0° Aries in the Tropical zodiac (spring equinox), it is actually at approximately 5°49\' Pisces in the Sidereal zodiac. This is why Western and Vedic astrology often give different zodiac signs for the same person — they are measuring from different reference points.',
    ],
    keyPoints: [
      'Ayanamsa = angular gap between Tropical and Sidereal zodiacs',
      'Caused by precession of equinoxes (~50.3\"/year)',
      'Lahiri Ayanamsa (~24.11° in 2026) is India\'s official standard',
      'The two systems were aligned around 285 CE',
      'Explains why Western and Vedic signs differ for the same person',
    ],
  },
  {
    id: 'muhurat-science',
    title: 'The Science of Muhurat',
    titleHi: 'मुहूर्त का विज्ञान',
    category: 'Spirituality',
    icon: '⏰',
    readTime: '4 min',
    content: [
      'Muhurat is the science of selecting an auspicious time for important activities. In Vedic tradition, the quality of time varies throughout the day based on planetary positions, Tithi, Nakshatra, Yoga, and other factors. A good Muhurat aligns cosmic energies favorably for the intended activity.',
      'Key Muhurats include: Brahma Muhurat (96 minutes before sunrise — ideal for meditation and study), Abhijit Muhurat (the 8th Muhurat of the day centered around solar noon — universally auspicious), and Rahu Kaal (an inauspicious period of ~1.5 hours ruled by Rahu that varies by weekday).',
      'The day is traditionally divided into 30 Muhurats of 48 minutes each (from sunrise to sunrise). Of these, some are naturally auspicious (like Abhijit) and some are inauspicious (like Rahu Kaal, Yamaganda, and Gulika Kaal). The position of the Moon in a particular Nakshatra also affects the quality of the Muhurat.',
    ],
    keyPoints: [
      'Muhurat = auspicious timing based on cosmic alignments',
      'Day divided into 30 Muhurats of 48 minutes each',
      'Brahma Muhurat: 96 min before sunrise (best for meditation)',
      'Abhijit Muhurat: around noon (universally auspicious)',
      'Rahu Kaal, Yamaganda, Gulika Kaal are inauspicious periods',
    ],
  },
  {
    id: 'samvat-systems',
    title: 'Indian Calendar Eras: Samvat Systems',
    titleHi: 'भारतीय कैलेंडर युग: संवत प्रणालियाँ',
    category: 'Calendar',
    icon: '📜',
    readTime: '5 min',
    content: [
      'India uses several calendar eras (Samvats) alongside the Gregorian calendar. The two most prominent are Vikram Samvat and Shaka Samvat. Vikram Samvat, established by King Vikramaditya, starts from 57 BCE and is widely used in North and West India. The current Vikram Samvat year (2026 CE) is 2083.',
      'Shaka Samvat, established by the Shalivahana dynasty, starts from 78 CE and is the official National Calendar of India (adopted in 1957). The current Shaka Samvat year (2026 CE) is 1948. It is used in government gazettes and official communications alongside the Gregorian date.',
      'Other regional calendars include: Bengali San (starts 594 CE), Tamil Calendar (starts 2026 CE — currently Hevilambi year), and Kerala\'s Kollam Era (starts 825 CE). Each region may also start the new year on a different day — Chaitra Shukla Pratipada (Ugadi/Gudi Padwa), Baisakhi (Punjab), Puthandu (Tamil Nadu), or Vishu (Kerala).',
    ],
    keyPoints: [
      'Vikram Samvat: starts 57 BCE, current year 2083 (in 2026 CE)',
      'Shaka Samvat: starts 78 CE, current year 1948 — India\'s official calendar',
      'Each region has its own new year celebration',
      'Indian calendars are lunisolar — months by Moon, year by Sun',
      'Government uses both Shaka and Gregorian dates officially',
    ],
  },
  {
    id: 'rahu-ketu',
    title: 'Rahu & Ketu: The Shadow Planets',
    titleHi: 'राहु और केतु: छाया ग्रह',
    category: 'Astrology',
    icon: '🌑',
    readTime: '5 min',
    content: [
      'Rahu and Ketu are unique to Vedic astrology — they are not physical planets but mathematical points where the Moon\'s orbital plane intersects the ecliptic (the Sun\'s apparent path). Rahu is the ascending node (where the Moon crosses from south to north) and Ketu is the descending node (north to south). They are always exactly 180° apart.',
      'Eclipses occur when the Sun and Moon are near Rahu or Ketu: a solar eclipse happens at a new moon near a node, and a lunar eclipse at a full moon near a node. This astronomical reality is reflected in the mythological story of Rahu swallowing the Sun (solar eclipse) and Ketu swallowing the Moon (lunar eclipse).',
      'In Vedic astrology, Rahu and Ketu have powerful effects: Rahu represents worldly desires, obsession, and material ambition, while Ketu represents spiritual detachment, past-life karma, and liberation. The Rahu-Ketu axis in a birth chart indicates the soul\'s evolutionary direction from past (Ketu) to future (Rahu).',
    ],
    keyPoints: [
      'Not physical planets — they are lunar nodes (orbital intersection points)',
      'Always 180° apart; transit one Rashi every 18 months',
      'Responsible for solar and lunar eclipses',
      'Rahu = ascending node, worldly desires; Ketu = descending node, spiritual liberation',
      'Rahu Kaal (inauspicious daily period) is named after Rahu',
    ],
  },
  {
    id: 'yoga-karana',
    title: 'Yoga and Karana in Panchang',
    titleHi: 'पंचांग में योग और करण',
    category: 'Panchang',
    icon: '🔮',
    readTime: '4 min',
    content: [
      'Yoga is one of the five elements of the Panchang, calculated from the sum of the Sun\'s and Moon\'s sidereal longitudes. When this sum is divided by 13°20\', it gives one of 27 Yogas. Each Yoga has a specific quality: some are auspicious (like Siddha, Shubha, Amrita), some are inauspicious (like Vishkumbha, Atiganda, Vyaghata), and some are neutral.',
      'Karana is another Panchang element — it is exactly half of a Tithi. Since each Tithi spans 12°, each Karana spans 6° of angular separation between the Sun and Moon. There are 11 Karanas in total: 7 Chara (recurring) Karanas — Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti — and 4 Sthira (fixed) Karanas — Shakuni, Chatushpada, Naga, Kimstughna.',
      'Of special note is Vishti Karana (also called Bhadra), which is considered inauspicious for starting new ventures. It recurs 7 times in a lunar month. Conversely, Karanas like Bava and Balava are considered favorable for auspicious activities.',
    ],
    keyPoints: [
      'Yoga: sum of Sun + Moon longitudes divided into 27 segments',
      'Some Yogas are auspicious (Siddha, Amrita), some inauspicious (Vishkumbha)',
      'Karana: half of a Tithi, spans 6° of angular separation',
      '11 Karanas: 7 recurring (Chara) + 4 fixed (Sthira)',
      'Vishti (Bhadra) Karana is avoided for new beginnings',
    ],
  },
  {
    id: 'festivals-significance',
    title: 'Why Festival Dates Change Every Year',
    titleHi: 'त्यौहार की तिथियाँ हर साल क्यों बदलती हैं',
    category: 'Culture',
    icon: '🎊',
    readTime: '3 min',
    content: [
      'Hindu festivals follow the lunar calendar, not the Gregorian (solar) calendar. Since a lunar month is approximately 29.5 days (shorter than a solar month), festivals shift relative to the Gregorian calendar each year. For example, Diwali is always on Kartik Amavasya (new moon in Kartik month), but this falls on different Gregorian dates each year.',
      'To keep the lunar calendar aligned with seasons, an extra month (Adhik Maas or Purushottam Maas) is added approximately every 3 years. This intercalary month ensures that festivals like Holi always fall in spring and Diwali always falls in autumn, despite the shorter lunar year.',
      'Some festivals are solar-based and fall on fixed or near-fixed Gregorian dates: Makar Sankranti (January 14-15), Pongal, and Baisakhi. These are tied to the Sun\'s entry into specific zodiac signs rather than lunar phases.',
    ],
    keyPoints: [
      'Most Hindu festivals follow the lunar calendar (Tithi-based)',
      'Lunar year is ~354 days vs solar year ~365 days = dates shift',
      'Adhik Maas (extra month) added every ~3 years for seasonal alignment',
      'Solar festivals (Sankranti, Pongal) have near-fixed Gregorian dates',
      'Regional variations exist in how festivals are calculated',
    ],
  },
];

export function KnowledgePage() {
  const [category, setCategory] = useState<string>('All');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const categories = ['All', ...Array.from(new Set(ARTICLES.map((a) => a.category)))];

  const filtered = category === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === category);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Knowledge · ज्ञान</h1>
          <p className={styles.subtitle}>Learn about Panchang, Vedic astronomy, and Indian cultural traditions</p>
        </div>

        <div className={styles.categories}>
          {categories.map((c) => (
            <button
              key={c}
              className={`${styles.catBtn} ${category === c ? styles.catBtnActive : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((article) => {
            const isOpen = expanded.has(article.id);
            return (
              <div key={article.id} className={styles.article}>
                <div className={styles.articleHeader} onClick={() => toggle(article.id)}>
                  <div className={styles.articleIcon}>{article.icon}</div>
                  <div className={styles.articleInfo}>
                    <div className={styles.articleTitle}>{article.title}</div>
                    <div className={styles.articleTitleHi}>{article.titleHi}</div>
                    <div className={styles.articleMeta}>
                      <span className={styles.articleCat} style={{ background: CATEGORY_COLORS[article.category] }}>
                        {article.category}
                      </span>
                      <span className={styles.articleRead}>{article.readTime} read</span>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ''}`} />
                </div>
                {isOpen && (
                  <div className={styles.articleBody}>
                    <div className={styles.articleContent}>
                      {article.content.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <div className={styles.keyPoints}>
                      <div className={styles.keyPointsTitle}>Key Points</div>
                      {article.keyPoints.map((kp, i) => (
                        <div key={i} className={styles.keyPoint}>
                          <span className={styles.keyPointBullet}>•</span>
                          <span>{kp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

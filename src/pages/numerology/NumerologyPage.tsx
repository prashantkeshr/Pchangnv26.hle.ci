import { useState, useMemo } from 'react';
import { Hash, Sparkles, User, Calendar } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SriYantra, OmSymbol } from '@/components/decorative/SacredGeometry';
import styles from './NumerologyPage.module.css';

const LIFE_PATH_MEANINGS: Record<number, { title: string; titleHi: string; ruling: string; qualities: string[]; description: string }> = {
  1: { title: 'The Leader', titleHi: 'नेता', ruling: 'Sun (Surya)', qualities: ['Independent', 'Ambitious', 'Innovative', 'Determined'], description: 'Natural born leaders with strong willpower. You pioneer new paths and inspire others through your confidence and originality.' },
  2: { title: 'The Diplomat', titleHi: 'कूटनीतिज्ञ', ruling: 'Moon (Chandra)', qualities: ['Cooperative', 'Sensitive', 'Harmonious', 'Intuitive'], description: 'Peacemakers who thrive in partnerships. You bring balance to relationships and have a deep understanding of others\' emotions.' },
  3: { title: 'The Creator', titleHi: 'सृजनकर्ता', ruling: 'Jupiter (Guru)', qualities: ['Creative', 'Expressive', 'Optimistic', 'Joyful'], description: 'Natural artists and communicators. Your creativity and enthusiasm inspire those around you to see beauty in the world.' },
  4: { title: 'The Builder', titleHi: 'निर्माता', ruling: 'Rahu', qualities: ['Practical', 'Disciplined', 'Stable', 'Hardworking'], description: 'The foundation builders of society. You create lasting structures through dedication, discipline, and meticulous planning.' },
  5: { title: 'The Adventurer', titleHi: 'साहसी', ruling: 'Mercury (Budha)', qualities: ['Free-spirited', 'Versatile', 'Curious', 'Dynamic'], description: 'Seekers of freedom and experience. You embrace change and bring excitement wherever you go through your versatile nature.' },
  6: { title: 'The Nurturer', titleHi: 'पालक', ruling: 'Venus (Shukra)', qualities: ['Responsible', 'Loving', 'Protective', 'Harmonious'], description: 'Natural caregivers devoted to family and community. You create beauty and harmony in every environment you enter.' },
  7: { title: 'The Seeker', titleHi: 'अन्वेषक', ruling: 'Ketu', qualities: ['Analytical', 'Spiritual', 'Introspective', 'Wise'], description: 'Deep thinkers on a quest for truth. You seek knowledge beyond the surface and possess profound spiritual understanding.' },
  8: { title: 'The Powerhouse', titleHi: 'शक्तिशाली', ruling: 'Saturn (Shani)', qualities: ['Authoritative', 'Ambitious', 'Efficient', 'Abundant'], description: 'Masters of material achievement. You understand the balance between spiritual and material worlds, bringing karmic rewards.' },
  9: { title: 'The Humanitarian', titleHi: 'मानवतावादी', ruling: 'Mars (Mangal)', qualities: ['Compassionate', 'Generous', 'Wise', 'Selfless'], description: 'Old souls with universal love. You serve humanity with wisdom and compassion, completing the cycle of spiritual evolution.' },
};

const MASTER_NUMBERS: Record<number, { title: string; description: string }> = {
  11: { title: 'Master Intuitive', description: 'Heightened intuition and spiritual insight. You are a visionary who can illuminate the path for others.' },
  22: { title: 'Master Builder', description: 'Ability to turn grand dreams into reality. You combine spiritual vision with practical mastery.' },
  33: { title: 'Master Teacher', description: 'The ultimate nurturer and healer. You uplift humanity through selfless service and spiritual guidance.' },
};

function reduceToSingle(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    let sum = 0;
    while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
    n = sum;
  }
  return n;
}

function calculateLifePath(day: number, month: number, year: number): number {
  const d = reduceToSingle(day);
  const m = reduceToSingle(month);
  const y = reduceToSingle(year);
  return reduceToSingle(d + m + y);
}

function nameToNumber(name: string): number {
  const map: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  const sum = name.toLowerCase().split('').reduce((acc, ch) => acc + (map[ch] ?? 0), 0);
  return reduceToSingle(sum);
}

const NUM_COLORS: Record<number, string> = {
  1: 'rgba(255, 165, 0, 0.12)',   // Sun - gold
  2: 'rgba(192, 192, 192, 0.12)', // Moon - silver
  3: 'rgba(147, 51, 234, 0.12)',  // Jupiter - violet
  4: 'rgba(100, 116, 139, 0.12)', // Rahu - slate
  5: 'rgba(34, 197, 94, 0.12)',   // Mercury - green
  6: 'rgba(236, 72, 153, 0.12)',  // Venus - pink
  7: 'rgba(234, 179, 8, 0.12)',   // Ketu - amber
  8: 'rgba(99, 102, 241, 0.12)',  // Saturn - indigo
  9: 'rgba(239, 68, 68, 0.12)',   // Mars - red
};

const NUM_BORDER_COLORS: Record<number, string> = {
  1: 'rgba(255, 165, 0, 0.4)',
  2: 'rgba(192, 192, 192, 0.4)',
  3: 'rgba(147, 51, 234, 0.4)',
  4: 'rgba(100, 116, 139, 0.4)',
  5: 'rgba(34, 197, 94, 0.4)',
  6: 'rgba(236, 72, 153, 0.4)',
  7: 'rgba(234, 179, 8, 0.4)',
  8: 'rgba(99, 102, 241, 0.4)',
  9: 'rgba(239, 68, 68, 0.4)',
};

const LUCKY_COLORS: Record<number, string> = {
  1: 'Gold, Orange, Yellow',
  2: 'White, Cream, Silver',
  3: 'Yellow, Purple, Violet',
  4: 'Blue, Grey, Khaki',
  5: 'Green, White, Silver',
  6: 'Pink, Blue, Green',
  7: 'White, Yellow, Green',
  8: 'Dark Blue, Black, Purple',
  9: 'Red, Crimson, Pink',
};

const LUCKY_GEMS: Record<number, string> = {
  1: 'Ruby (Manik)',
  2: 'Pearl (Moti)',
  3: 'Yellow Sapphire (Pukhraj)',
  4: "Cat's Eye (Lehsunia)",
  5: 'Emerald (Panna)',
  6: 'Diamond (Heera)',
  7: "Cat's Eye (Lehsunia)",
  8: 'Blue Sapphire (Neelam)',
  9: 'Red Coral (Moonga)',
};

export function NumerologyPage() {
  const now = new Date();
  const [birthDate, setBirthDate] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  );
  const [name, setName] = useState('');
  const sectionRef = useScrollReveal();

  const result = useMemo(() => {
    const [y, m, d] = birthDate.split('-').map(Number);
    if (!y || !m || !d) return null;
    const lifePath = calculateLifePath(d, m, y);
    const birthDay = reduceToSingle(d);
    const destinyNumber = name ? nameToNumber(name) : null;
    return { lifePath, birthDay, destinyNumber };
  }, [birthDate, name]);

  const baseNum = result ? (result.lifePath > 9 ? reduceToSingle(result.lifePath % 10 + Math.floor(result.lifePath / 10)) : result.lifePath) : 1;
  const meaning = LIFE_PATH_MEANINGS[baseNum > 9 ? 9 : baseNum]!;
  const master = result && result.lifePath > 9 ? MASTER_NUMBERS[result.lifePath] : null;

  return (
    <main className={styles.page} ref={sectionRef}>
      <div className="container">
        <section className={`${styles.hero} animate-on-scroll`}>
          <div className={styles.heroDecor}>
            <SriYantra size={200} className={styles.yantraLeft} opacity={0.06} />
            <SriYantra size={200} className={styles.yantraRight} opacity={0.06} />
          </div>
          <OmSymbol size={48} className={styles.omIcon} opacity={0.2} />
          <h1 className={styles.title}>Numerology</h1>
          <p className={styles.titleHi}>अंक ज्योतिष</p>
          <p className={styles.subtitle}>Discover the cosmic vibrations encoded in your birth date and name through Vedic numerology</p>
        </section>

        <section className={`${styles.form} animate-on-scroll`}>
          <div className={styles.formCard}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <Calendar size={14} />
                Birth Date
              </label>
              <input type="date" className={styles.formInput} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <User size={14} />
                Full Name (optional)
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          </div>
        </section>

        {result && (
          <>
            <section className={`${styles.numbersGrid} stagger-children`}>
              <div className={styles.numberCard}>
                <div
                  className={styles.numCircle}
                  style={{
                    background: NUM_COLORS[baseNum] ?? NUM_COLORS[1],
                    borderColor: NUM_BORDER_COLORS[baseNum] ?? NUM_BORDER_COLORS[1],
                    boxShadow: `0 0 24px ${NUM_BORDER_COLORS[baseNum] ?? NUM_BORDER_COLORS[1]}`,
                  }}
                >
                  <span className={styles.numValue}>{result.lifePath}</span>
                </div>
                <div className={styles.numLabel}>Life Path</div>
                <div className={styles.numLabelHi}>जीवन पथ</div>
                <div className={styles.numPlanet}>{meaning.ruling}</div>
              </div>
              <div className={styles.numberCard}>
                <div
                  className={styles.numCircle}
                  style={{
                    background: NUM_COLORS[result.birthDay] ?? NUM_COLORS[1],
                    borderColor: NUM_BORDER_COLORS[result.birthDay] ?? NUM_BORDER_COLORS[1],
                    boxShadow: `0 0 24px ${NUM_BORDER_COLORS[result.birthDay] ?? NUM_BORDER_COLORS[1]}`,
                  }}
                >
                  <span className={styles.numValue}>{result.birthDay}</span>
                </div>
                <div className={styles.numLabel}>Birth Number</div>
                <div className={styles.numLabelHi}>जन्म अंक</div>
              </div>
              {result.destinyNumber && (
                <div className={styles.numberCard}>
                  <div
                    className={styles.numCircle}
                    style={{
                      background: NUM_COLORS[result.destinyNumber] ?? NUM_COLORS[1],
                      borderColor: NUM_BORDER_COLORS[result.destinyNumber] ?? NUM_BORDER_COLORS[1],
                      boxShadow: `0 0 24px ${NUM_BORDER_COLORS[result.destinyNumber] ?? NUM_BORDER_COLORS[1]}`,
                    }}
                  >
                    <span className={styles.numValue}>{result.destinyNumber}</span>
                  </div>
                  <div className={styles.numLabel}>Destiny</div>
                  <div className={styles.numLabelHi}>भाग्य अंक</div>
                </div>
              )}
            </section>

            <section className={`${styles.meaningSection} animate-on-scroll`}>
              <div className={styles.meaningCard}>
                <div className={styles.meaningHeader}>
                  <Hash size={18} />
                  <div>
                    <h2 className={styles.meaningTitle}>
                      Life Path {result.lifePath}: {meaning.title}
                    </h2>
                    <span className={styles.meaningTitleHi}>{meaning.titleHi}</span>
                  </div>
                </div>
                {master && (
                  <div className={styles.masterBadge}>
                    <Sparkles size={14} />
                    <span>Master Number — {master.title}</span>
                  </div>
                )}
                <p className={styles.meaningDesc}>{meaning.description}</p>
                {master && <p className={styles.meaningDesc}>{master.description}</p>}
                <div className={styles.rulingPlanet}>
                  <span className={styles.rulingLabel}>Ruling Planet</span>
                  <span className={styles.rulingValue}>{meaning.ruling}</span>
                </div>
                <div className={styles.qualities}>
                  {meaning.qualities.map((q) => (
                    <span key={q} className={styles.qualityBadge}>{q}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className={`${styles.insightsGrid} stagger-children`}>
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>💎</div>
                <div className={styles.insightLabel}>Lucky Gemstone</div>
                <div className={styles.insightValue}>{LUCKY_GEMS[baseNum > 9 ? 9 : baseNum]}</div>
              </div>
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>🎨</div>
                <div className={styles.insightLabel}>Lucky Colors</div>
                <div className={styles.insightValue}>{LUCKY_COLORS[baseNum > 9 ? 9 : baseNum]}</div>
              </div>
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>📅</div>
                <div className={styles.insightLabel}>Lucky Days</div>
                <div className={styles.insightValue}>
                  {baseNum <= 3 ? 'Sunday, Monday, Thursday' : baseNum <= 6 ? 'Wednesday, Friday, Saturday' : 'Tuesday, Thursday, Saturday'}
                </div>
              </div>
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>🔢</div>
                <div className={styles.insightLabel}>Compatible Numbers</div>
                <div className={styles.insightValue}>
                  {baseNum <= 3 ? '1, 3, 5, 9' : baseNum <= 6 ? '2, 4, 6, 8' : '1, 3, 7, 9'}
                </div>
              </div>
            </section>
          </>
        )}

        <section className={`${styles.infoSection} animate-on-scroll`}>
          <h2 className={styles.infoTitle}>About Vedic Numerology</h2>
          <p className={styles.infoTitleHi}>वैदिक अंक ज्योतिष</p>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3>Life Path Number</h3>
              <p>Derived from your complete birth date, this number reveals your life's purpose and the path you are destined to walk. It is the sum of all digits in your birth date, reduced to a single digit (or master number).</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Birth Number</h3>
              <p>Simply the day of your birth reduced to a single digit. It represents your personality traits and how you present yourself to the world.</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Destiny Number</h3>
              <p>Calculated from the full name using the Pythagorean system. Each letter corresponds to a number (A=1 through Z=8), revealing your soul's deeper purpose.</p>
            </div>
            <div className={styles.infoItem}>
              <h3>Master Numbers</h3>
              <p>Numbers 11, 22, and 33 are considered master numbers in numerology. They carry heightened spiritual significance and greater potential, but also greater challenges.</p>
            </div>
          </div>
        </section>

        <div className={styles.disclaimer}>
          Numerological readings are based on traditional Vedic and Pythagorean systems. For personal guidance, consult a qualified numerologist.
        </div>
      </div>
    </main>
  );
}

import { useState, useMemo } from 'react';
import { MapPin, Mountain, Calendar } from 'lucide-react';
import styles from './TemplesPage.module.css';

interface Temple {
  name: string;
  nameHi: string;
  location: string;
  state: string;
  deity: string;
  deityHi: string;
  deityColor: string;
  category: string;
  description: string;
  significance: string;
  bestTime?: string;
  tags: string[];
}

const TEMPLES: Temple[] = [
  {
    name: 'Kashi Vishwanath', nameHi: 'काशी विश्वनाथ', location: 'Varanasi', state: 'Uttar Pradesh',
    deity: 'Shiva', deityHi: 'शिव', deityColor: '#3498db', category: 'Jyotirlinga',
    description: 'One of the 12 Jyotirlingas, situated on the western bank of the Ganga. The temple has been destroyed and rebuilt multiple times through history. The current structure was built by Ahilyabai Holkar in 1780.',
    significance: 'Moksha-dayini — liberation from the cycle of birth and death',
    bestTime: 'Oct–Mar', tags: ['Jyotirlinga', 'Shakti Peeth', 'Ganga'],
  },
  {
    name: 'Tirupati Balaji', nameHi: 'तिरुपति बालाजी', location: 'Tirumala', state: 'Andhra Pradesh',
    deity: 'Vishnu', deityHi: 'विष्णु', deityColor: '#2980b9', category: 'Divya Desam',
    description: 'The richest and most visited temple in the world. Sri Venkateswara Swamy temple sits atop seven hills (Saptagiri). Receives over 50,000 devotees daily.',
    significance: 'Kaliyuga Vaikuntham — Heaven on Earth in the current age',
    bestTime: 'Sep–Feb', tags: ['Divya Desam', 'Vaishnava', 'Richest Temple'],
  },
  {
    name: 'Jagannath Puri', nameHi: 'जगन्नाथ पुरी', location: 'Puri', state: 'Odisha',
    deity: 'Vishnu', deityHi: 'विष्णु', deityColor: '#2980b9', category: 'Char Dham',
    description: 'One of the four Char Dhams. Famous for the annual Rath Yatra where the deities are taken in massive chariots. The temple kitchen feeds 100,000 people daily.',
    significance: 'Part of Char Dham pilgrimage — east direction',
    bestTime: 'Jun–Jul (Rath Yatra)', tags: ['Char Dham', 'Rath Yatra', 'Mahaprasad'],
  },
  {
    name: 'Somnath', nameHi: 'सोमनाथ', location: 'Prabhas Patan', state: 'Gujarat',
    deity: 'Shiva', deityHi: 'शिव', deityColor: '#3498db', category: 'Jyotirlinga',
    description: 'The first among the 12 Jyotirlingas. Destroyed and rebuilt 17 times, it stands as a symbol of resilience. The current temple was reconstructed under Sardar Patel\'s initiative in 1951.',
    significance: 'Adi Jyotirlinga — the first pillar of light',
    bestTime: 'Oct–Mar', tags: ['Jyotirlinga', 'First Jyotirlinga', 'Seaside'],
  },
  {
    name: 'Meenakshi Amman', nameHi: 'मीनाक्षी अम्मन', location: 'Madurai', state: 'Tamil Nadu',
    deity: 'Parvati', deityHi: 'पार्वती', deityColor: '#e91e63', category: 'Shakti Peeth',
    description: 'A masterpiece of Dravidian architecture with 14 gopurams (gateway towers). The temple complex has 33,000 sculptures. Dedicated to goddess Meenakshi, a form of Parvati.',
    significance: 'Site of the divine marriage of Meenakshi and Sundareswarar (Shiva)',
    bestTime: 'Apr (Meenakshi Thirukalyanam)', tags: ['Shakti Peeth', 'Dravidian', 'Architecture'],
  },
  {
    name: 'Kedarnath', nameHi: 'केदारनाथ', location: 'Rudraprayag', state: 'Uttarakhand',
    deity: 'Shiva', deityHi: 'शिव', deityColor: '#3498db', category: 'Char Dham',
    description: 'Situated at 3,583m altitude near the head of the Mandakini river. One of the highest Jyotirlingas. The temple is accessible only 6 months a year. Survived devastating 2013 floods.',
    significance: 'Part of Char Dham and Panch Kedar pilgrimages',
    bestTime: 'May–Jun, Sep–Oct', tags: ['Char Dham', 'Jyotirlinga', 'Himalayan'],
  },
  {
    name: 'Golden Temple', nameHi: 'हरमंदिर साहिब', location: 'Amritsar', state: 'Punjab',
    deity: 'Guru Granth Sahib', deityHi: 'गुरु ग्रन्थ साहिब', deityColor: '#f39c12', category: 'Sikh',
    description: 'Sri Harmandir Sahib, the holiest Gurdwara. Its golden dome and marble walkway surrounding the sacred Amrit Sarovar are iconic. The Langar serves 100,000+ free meals daily.',
    significance: 'Spiritual and temporal seat of Sikh religion',
    bestTime: 'Oct–Mar', tags: ['Sikh', 'Langar', 'Architecture'],
  },
  {
    name: 'Rameshwaram', nameHi: 'रामेश्वरम', location: 'Rameswaram', state: 'Tamil Nadu',
    deity: 'Shiva', deityHi: 'शिव', deityColor: '#3498db', category: 'Char Dham',
    description: 'One of the Char Dhams and a Jyotirlinga. Lord Rama is believed to have worshipped Shiva here before crossing to Lanka. Famous for its 1,000-pillar corridor, the longest in India.',
    significance: 'Part of Char Dham — south direction; Setu Bandha',
    bestTime: 'Oct–Apr', tags: ['Char Dham', 'Jyotirlinga', 'Ramayana'],
  },
  {
    name: 'Vaishno Devi', nameHi: 'वैष्णो देवी', location: 'Katra', state: 'Jammu & Kashmir',
    deity: 'Shakti', deityHi: 'शक्ति', deityColor: '#e91e63', category: 'Shakti Peeth',
    description: 'One of the most visited shrines in India with 8 million+ pilgrims annually. The 13 km trek from Katra to the cave shrine at 5,200 ft is a spiritual journey itself.',
    significance: 'Shrine of three Pindis representing Mahakali, Mahalakshmi, Mahasaraswati',
    bestTime: 'Mar–Jul, Sep–Nov', tags: ['Shakti Peeth', 'Cave Temple', 'Trek'],
  },
  {
    name: 'Badrinath', nameHi: 'बद्रीनाथ', location: 'Chamoli', state: 'Uttarakhand',
    deity: 'Vishnu', deityHi: 'विष्णु', deityColor: '#2980b9', category: 'Char Dham',
    description: 'One of the Char Dhams, situated at 3,133m in the Garhwal Himalayas. Dedicated to Lord Vishnu as Badri. The Tapt Kund hot springs near the temple are considered sacred.',
    significance: 'Part of Char Dham — north direction; Vishnu\'s meditation place',
    bestTime: 'May–Jun, Sep–Oct', tags: ['Char Dham', 'Himalayan', 'Vaishnava'],
  },
  {
    name: 'Dwarkadhish', nameHi: 'द्वारकाधीश', location: 'Dwarka', state: 'Gujarat',
    deity: 'Krishna', deityHi: 'कृष्ण', deityColor: '#2980b9', category: 'Char Dham',
    description: 'One of the Char Dhams and one of the Sapta Puris. Believed to be the ancient kingdom of Lord Krishna. The five-storied temple is built over the legendary Hari Griha (Lord\'s house).',
    significance: 'Part of Char Dham — west direction; Krishna\'s kingdom',
    bestTime: 'Oct–Mar', tags: ['Char Dham', 'Sapta Puri', 'Krishna'],
  },
  {
    name: 'Konark Sun Temple', nameHi: 'कोणार्क सूर्य मंदिर', location: 'Konark', state: 'Odisha',
    deity: 'Surya', deityHi: 'सूर्य', deityColor: '#e67e22', category: 'UNESCO',
    description: 'A 13th-century temple shaped as a gigantic chariot of Surya with 24 wheels and 7 horses. A UNESCO World Heritage Site and marvel of Kalinga architecture.',
    significance: 'Architectural wonder — the Sun\'s chariot in stone',
    bestTime: 'Oct–Mar', tags: ['UNESCO', 'Surya', 'Architecture'],
  },
];

interface Yatra {
  name: string;
  nameHi: string;
  description: string;
  stops: string[];
}

const YATRAS: Yatra[] = [
  { name: 'Char Dham Yatra', nameHi: 'चार धाम यात्रा', description: 'The four divine abodes in four directions of India — Badrinath (North), Puri (East), Rameshwaram (South), Dwarka (West). Completing this pilgrimage is said to wash away all sins.', stops: ['Badrinath', 'Puri', 'Rameshwaram', 'Dwarka'] },
  { name: 'Chota Char Dham', nameHi: 'छोटा चार धाम', description: 'The four sacred shrines in the Garhwal Himalayas of Uttarakhand. A popular pilgrimage circuit covering high-altitude temples, open May to November.', stops: ['Yamunotri', 'Gangotri', 'Kedarnath', 'Badrinath'] },
  { name: '12 Jyotirlingas', nameHi: 'द्वादश ज्योतिर्लिंग', description: 'The 12 sacred shrines of Lord Shiva across India. Each Jyotirlinga is a form where Shiva appeared as an infinite pillar of light.', stops: ['Somnath', 'Mallikarjuna', 'Mahakaleshwar', 'Omkareshwar', 'Kedarnath', 'Bhimashankar', 'Kashi Vishwanath', 'Trimbakeshwar', 'Vaidyanath', 'Nageshwar', 'Rameshwaram', 'Grishneshwar'] },
  { name: 'Shakti Peethas', nameHi: 'शक्ति पीठ', description: 'The 51 sacred sites where parts of Goddess Sati\'s body fell. Each site has a Shakti temple and a Bhairava temple. Major Peethas include Kamakhya, Kalighat, and Vindhyavasini.', stops: ['Kamakhya', 'Kalighat', 'Vindhyavasini', 'Jwala Ji', 'Vaishno Devi', 'Naina Devi'] },
  { name: 'Sapta Puri', nameHi: 'सप्तपुरी', description: 'The seven holiest cities in Hinduism, each believed to grant moksha. Visiting all seven is one of the most sacred pilgrimages.', stops: ['Ayodhya', 'Mathura', 'Haridwar', 'Varanasi', 'Kanchi', 'Ujjain', 'Dwarka'] },
];

const CATEGORIES = ['All', 'Char Dham', 'Jyotirlinga', 'Shakti Peeth', 'Sikh', 'UNESCO'];

export function TemplesPage() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'All') return TEMPLES;
    return TEMPLES.filter((t) => t.category === filter || t.tags.includes(filter));
  }, [filter]);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Temples & Pilgrimages · मन्दिर और तीर्थयात्रा</h1>
          <p className={styles.subtitle}>Sacred temples and pilgrimage circuits of India</p>
        </div>

        <div className={styles.filters}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`${styles.filterBtn} ${filter === c ? styles.filterActive : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((t) => (
            <div key={t.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardName}>{t.name}</div>
                  <div className={styles.cardNameHi}>{t.nameHi}</div>
                  <div className={styles.cardLocation}>
                    <MapPin size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {t.location}, {t.state}
                  </div>
                </div>
                <span className={styles.cardDeity} style={{ background: t.deityColor }}>
                  {t.deity}
                </span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardDesc}>{t.description}</div>
                <div className={styles.cardMeta}>
                  {t.tags.map((tag) => (
                    <span key={tag} className={styles.metaTag}>
                      <Mountain size={10} /> {tag}
                    </span>
                  ))}
                  {t.bestTime && (
                    <span className={styles.metaTag}>
                      <Calendar size={10} /> {t.bestTime}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.significance}>{t.significance}</div>
            </div>
          ))}
        </div>

        <div className={styles.yatraSection}>
          <h2 className={styles.sectionTitle}>Sacred Pilgrimage Circuits</h2>
          <p className={styles.sectionTitleHi}>पवित्र तीर्थयात्रा परिक्रमा</p>

          <div className={styles.yatraGrid}>
            {YATRAS.map((y) => (
              <div key={y.name} className={styles.yatraCard}>
                <div className={styles.yatraName}>{y.name}</div>
                <div className={styles.yatraNameHi}>{y.nameHi}</div>
                <div className={styles.yatraDesc}>{y.description}</div>
                <div className={styles.yatraStops}>
                  {y.stops.map((s) => (
                    <span key={s} className={styles.yatraStop}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

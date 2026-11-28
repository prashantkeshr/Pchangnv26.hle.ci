import { useMemo, useState } from 'react';
import { BookOpen, Sparkles, RefreshCw, Quote, Feather } from 'lucide-react';
import { useDate } from '@/context/DateContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { LotusFlower, ChakraWheel } from '@/components/decorative/SacredGeometry';
import styles from './DailyWisdomPage.module.css';

interface WisdomEntry {
  text: string;
  textHi: string;
  source: string;
  sourceHi: string;
  category: string;
}

const WISDOM: WisdomEntry[] = [
  { text: 'You are what your deep, driving desire is. As your desire is, so is your will. As your will is, so is your deed. As your deed is, so is your destiny.', textHi: 'आप वही हैं जो आपकी गहरी इच्छा है। जैसी इच्छा, वैसा संकल्प। जैसा संकल्प, वैसा कर्म। जैसा कर्म, वैसा भाग्य।', source: 'Brihadaranyaka Upanishad', sourceHi: 'बृहदारण्यक उपनिषद', category: 'Upanishads' },
  { text: 'The soul is neither born, and nor does it die. It is not that having come into existence it will never cease to be. It is unborn, eternal, permanent, and primeval.', textHi: 'आत्मा न जन्म लेती है और न मरती है। वह अजन्मा, नित्य, शाश्वत और पुरातन है।', source: 'Bhagavad Gita 2.20', sourceHi: 'भगवद्गीता २.२०', category: 'Gita' },
  { text: 'When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.', textHi: 'जब ध्यान में सिद्धि होती है, तो मन वायुरहित स्थान में दीपक की लौ की तरह स्थिर हो जाता है।', source: 'Bhagavad Gita 6.19', sourceHi: 'भगवद्गीता ६.१९', category: 'Gita' },
  { text: 'Yoga is the journey of the self, through the self, to the self.', textHi: 'योग स्वयं की, स्वयं के माध्यम से, स्वयं तक की यात्रा है।', source: 'Bhagavad Gita 6.47', sourceHi: 'भगवद्गीता ६.४७', category: 'Gita' },
  { text: 'From the unreal, lead me to the real. From darkness, lead me to light. From death, lead me to immortality.', textHi: 'असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय।', source: 'Brihadaranyaka Upanishad 1.3.28', sourceHi: 'बृहदारण्यक उपनिषद १.३.२८', category: 'Upanishads' },
  { text: 'He who sees all beings in his own self, and his own self in all beings, loses all fear.', textHi: 'जो सभी प्राणियों को अपने आत्मा में और अपनी आत्मा को सभी प्राणियों में देखता है, वह सभी भय से मुक्त हो जाता है।', source: 'Isha Upanishad', sourceHi: 'ईशावास्य उपनिषद', category: 'Upanishads' },
  { text: 'Better indeed is knowledge than mechanical practice. Better than knowledge is meditation. But better still is surrender of attachment to results.', textHi: 'अभ्यास से ज्ञान श्रेष्ठ है, ज्ञान से ध्यान श्रेष्ठ है, ध्यान से कर्मफल का त्याग श्रेष्ठ है।', source: 'Bhagavad Gita 12.12', sourceHi: 'भगवद्गीता १२.१२', category: 'Gita' },
  { text: 'As a man who has hands acts with his hands, as a man who has feet walks with his feet, so the wise man acts skillfully.', textHi: 'जैसे हाथ वाला मनुष्य हाथों से कार्य करता है, वैसे ही बुद्धिमान कुशलतापूर्वक कर्म करता है।', source: 'Rig Veda', sourceHi: 'ऋग्वेद', category: 'Vedas' },
  { text: 'The mind acts like an enemy for those who do not control it.', textHi: 'मन उसका शत्रु है जो इसे वश में नहीं करता।', source: 'Bhagavad Gita 6.6', sourceHi: 'भगवद्गीता ६.६', category: 'Gita' },
  { text: 'Truth alone triumphs, not falsehood. Through truth the divine path is spread out.', textHi: 'सत्यमेव जयते नानृतम्। सत्येन पन्था विततो देवयानः।', source: 'Mundaka Upanishad 3.1.6', sourceHi: 'मुण्डक उपनिषद ३.१.६', category: 'Upanishads' },
  { text: 'There is nothing lost or wasted in this life. Even a small effort opens the doors of great opportunity.', textHi: 'इस जीवन में कुछ भी व्यर्थ नहीं जाता। थोड़ा सा प्रयत्न भी महान अवसरों के द्वार खोलता है।', source: 'Bhagavad Gita 2.40', sourceHi: 'भगवद्गीता २.४०', category: 'Gita' },
  { text: 'That which permeates the entire body, know it to be indestructible. No one can cause the destruction of the imperishable soul.', textHi: 'जो सम्पूर्ण शरीर में व्याप्त है उसे अविनाशी जानो। उस अविनाशी आत्मा का विनाश कोई नहीं कर सकता।', source: 'Bhagavad Gita 2.17', sourceHi: 'भगवद्गीता २.१७', category: 'Gita' },
  { text: 'May all beings be happy. May all beings be free from illness. May all beings see what is auspicious. May no one suffer.', textHi: 'सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु। मा कश्चिद्दुःखभाग्भवेत्।', source: 'Shanti Mantra', sourceHi: 'शांति मंत्र', category: 'Mantras' },
  { text: 'Work done with selfish motives is inferior by far to the selfless service of the intellect.', textHi: 'स्वार्थपूर्ण कर्म बुद्धियोग की निःस्वार्थ सेवा से बहुत निम्न है।', source: 'Bhagavad Gita 2.49', sourceHi: 'भगवद्गीता २.४९', category: 'Gita' },
  { text: 'The wise see knowledge and action as one; they see truly.', textHi: 'ज्ञान और कर्म को एक देखने वाले ही सच्चे दृष्टा हैं।', source: 'Bhagavad Gita 5.5', sourceHi: 'भगवद्गीता ५.५', category: 'Gita' },
  { text: 'Let noble thoughts come to us from all sides.', textHi: 'आ नो भद्राः क्रतवो यन्तु विश्वतः।', source: 'Rig Veda 1.89.1', sourceHi: 'ऋग्वेद १.८९.१', category: 'Vedas' },
  { text: 'He who has no attachments can really love others, for his love is pure and divine.', textHi: 'जो आसक्ति से मुक्त है वही सच्चा प्रेम कर सकता है, क्योंकि उसका प्रेम शुद्ध और दिव्य है।', source: 'Bhagavad Gita 2.64', sourceHi: 'भगवद्गीता २.६४', category: 'Gita' },
  { text: 'Knowledge, the object of knowledge, and the knower are the three factors that motivate action.', textHi: 'ज्ञान, ज्ञेय और ज्ञाता — ये तीन कर्म की प्रेरणा के कारक हैं।', source: 'Bhagavad Gita 18.18', sourceHi: 'भगवद्गीता १८.१८', category: 'Gita' },
  { text: 'The earth is supported by the power of truth; it is the power of truth that makes the sun shine.', textHi: 'सत्य की शक्ति से पृथ्वी धारित है; सत्य की शक्ति से सूर्य प्रकाशित होता है।', source: 'Manusmriti', sourceHi: 'मनुस्मृति', category: 'Dharmashastra' },
  { text: 'Perform your obligatory duty, because action is indeed better than inaction.', textHi: 'अपना नियत कर्तव्य कर्म करो, क्योंकि कर्म अकर्म से श्रेष्ठ है।', source: 'Bhagavad Gita 3.8', sourceHi: 'भगवद्गीता ३.८', category: 'Gita' },
  { text: 'As the heat of a fire reduces wood to ashes, the fire of knowledge burns to ashes all karma.', textHi: 'जैसे अग्नि की ज्वाला लकड़ी को भस्म कर देती है, वैसे ही ज्ञानाग्नि सम्पूर्ण कर्मों को भस्म कर देती है।', source: 'Bhagavad Gita 4.37', sourceHi: 'भगवद्गीता ४.३७', category: 'Gita' },
  { text: 'The power of God is with you at all times; through the activities of mind, senses, breathing, and emotions.', textHi: 'ईश्वर की शक्ति सदैव आपके साथ है; मन, इन्द्रियों, प्राण और भावनाओं की क्रियाओं के माध्यम से।', source: 'Bhagavad Gita 18.61', sourceHi: 'भगवद्गीता १८.६१', category: 'Gita' },
  { text: 'May we move from ignorance to knowledge, from sorrow to bliss, from mortality to immortality.', textHi: 'अज्ञान से ज्ञान की ओर, दुःख से आनंद की ओर, मृत्यु से अमरता की ओर बढ़ें।', source: 'Vedic Prayer', sourceHi: 'वैदिक प्रार्थना', category: 'Vedas' },
  { text: 'That person who is not disturbed by happiness and distress, and is steady in both, is certainly eligible for liberation.', textHi: 'जो सुख-दुःख में विचलित नहीं होता और दोनों में स्थिर रहता है, वह निश्चित ही मोक्ष का अधिकारी है।', source: 'Bhagavad Gita 2.15', sourceHi: 'भगवद्गीता २.१५', category: 'Gita' },
  { text: 'Self-knowledge is the beginning of wisdom, which is the ending of fear.', textHi: 'आत्मज्ञान प्रज्ञा का आरम्भ है, जो भय का अंत है।', source: 'Kena Upanishad', sourceHi: 'केन उपनिषद', category: 'Upanishads' },
  { text: 'When a man dwells on the objects of sense, attachment to them arises. From attachment arises desire; from desire arises anger.', textHi: 'विषयों का चिन्तन करने से आसक्ति उत्पन्न होती है। आसक्ति से काम और काम से क्रोध उत्पन्न होता है।', source: 'Bhagavad Gita 2.62', sourceHi: 'भगवद्गीता २.६२', category: 'Gita' },
  { text: 'The wind cannot shatter a mountain; blame and praise cannot move a sage.', textHi: 'वायु पर्वत को हिला नहीं सकती; निंदा और प्रशंसा मुनि को विचलित नहीं कर सकतीं।', source: 'Dhammapada (Buddhist)', sourceHi: 'धम्मपद', category: 'Buddhist' },
  { text: 'He who has faith, who is absorbed in it, and whose senses are controlled — he attains knowledge.', textHi: 'जो श्रद्धावान है, तत्पर है और जिसकी इन्द्रियाँ वश में हैं — वह ज्ञान प्राप्त करता है।', source: 'Bhagavad Gita 4.39', sourceHi: 'भगवद्गीता ४.३९', category: 'Gita' },
  { text: 'An ounce of practice is worth more than tons of preaching.', textHi: 'एक पल का अभ्यास घंटों के उपदेश से अधिक मूल्यवान है।', source: 'Mahatma Gandhi', sourceHi: 'महात्मा गांधी', category: 'Modern' },
  { text: 'Have patience. All things are difficult before they become easy.', textHi: 'धैर्य रखो। सभी चीज़ें आसान होने से पहले कठिन होती हैं।', source: 'Saadi (via Indian tradition)', sourceHi: 'सादी', category: 'Wisdom' },
  { text: 'The essence of all beings is earth. The essence of earth is water. The essence of water is plants. The essence of plants is a human being.', textHi: 'सभी प्राणियों का सार पृथ्वी है। पृथ्वी का सार जल है। जल का सार वनस्पति है। वनस्पति का सार मनुष्य है।', source: 'Chandogya Upanishad', sourceHi: 'छान्दोग्य उपनिषद', category: 'Upanishads' },
];

const CATEGORIES = ['All', 'Gita', 'Upanishads', 'Vedas', 'Mantras', 'Modern'];

function getDailyIndex(date: Date): number {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return seed % WISDOM.length;
}

export function DailyWisdomPage() {
  const { selectedDate } = useDate();
  const [category, setCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useScrollReveal();

  const dailyWisdom = useMemo(() => WISDOM[getDailyIndex(selectedDate)]!, [selectedDate]);

  const filtered = useMemo(
    () => category === 'All' ? WISDOM : WISDOM.filter((w) => w.category === category),
    [category]
  );

  const displayList = showAll ? filtered : filtered.slice(0, 6);

  return (
    <main className={styles.page} ref={sectionRef}>
      <div className="container">
        <section className={`${styles.hero} animate-on-scroll`}>
          <div className={styles.heroDecor}>
            <LotusFlower size={180} className={styles.lotusLeft} opacity={0.05} />
            <ChakraWheel size={160} className={styles.chakraRight} opacity={0.04} />
          </div>
          <Feather size={32} className={styles.heroIcon} />
          <h1 className={styles.title}>Daily Wisdom</h1>
          <p className={styles.titleHi}>दैनिक ज्ञान</p>
          <p className={styles.subtitle}>Ancient wisdom from Vedas, Upanishads, and Bhagavad Gita to illuminate your day</p>
        </section>

        <section className={`${styles.dailyCard} animate-on-scroll`}>
          <div className={styles.dailyInner}>
            <Quote size={28} className={styles.quoteIcon} />
            <blockquote className={styles.dailyQuote}>
              {dailyWisdom.text}
            </blockquote>
            <p className={styles.dailyQuoteHi}>
              {dailyWisdom.textHi}
            </p>
            <div className={styles.dailySource}>
              <BookOpen size={14} />
              <span>{dailyWisdom.source}</span>
              <span className={styles.sourceHi}>({dailyWisdom.sourceHi})</span>
            </div>
            <div className={styles.dailyBadge}>
              <Sparkles size={12} />
              Today's Wisdom
            </div>
          </div>
        </section>

        <section className={styles.collectionSection}>
          <h2 className={styles.sectionTitle}>Wisdom Collection</h2>
          <p className={styles.sectionTitleHi}>ज्ञान संग्रह</p>

          <div className={styles.categoryTabs}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.catTab} ${category === cat ? styles.catActive : ''}`}
                onClick={() => { setCategory(cat); setShowAll(false); }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={`${styles.wisdomGrid} stagger-children`}>
            {displayList.map((w, i) => (
              <div key={i} className={styles.wisdomCard}>
                <Quote size={16} className={styles.cardQuoteIcon} />
                <p className={styles.cardText}>{w.text}</p>
                <p className={styles.cardTextHi}>{w.textHi}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardSource}>{w.source}</span>
                  <span className={styles.cardCat}>{w.category}</span>
                </div>
              </div>
            ))}
          </div>

          {!showAll && filtered.length > 6 && (
            <button className={styles.showMoreBtn} onClick={() => setShowAll(true)}>
              <RefreshCw size={14} />
              Show All ({filtered.length})
            </button>
          )}
        </section>

        <div className={styles.disclaimer}>
          Translations are approximate renderings of Sanskrit/Hindi originals. For scholarly study, refer to authoritative commentaries.
        </div>
      </div>
    </main>
  );
}

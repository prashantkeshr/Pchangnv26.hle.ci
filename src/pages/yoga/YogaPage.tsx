import { useState, useEffect, useRef, useCallback } from 'react';
import { Clock, Activity, Wind } from 'lucide-react';
import styles from './YogaPage.module.css';

type Tab = 'asanas' | 'pranayama' | 'mantras' | 'meditation';

interface Asana {
  name: string;
  nameHi: string;
  emoji: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  levelColor: string;
  duration: string;
  category: string;
  description: string;
  benefits: string[];
  steps: string[];
}

interface Pranayama {
  name: string;
  nameHi: string;
  emoji: string;
  duration: string;
  description: string;
  benefits: string[];
  steps: string[];
}

interface Mantra {
  name: string;
  nameHi: string;
  emoji: string;
  sanskrit: string;
  meaning: string;
  deity: string;
  benefits: string[];
}

const ASANAS: Asana[] = [
  {
    name: 'Surya Namaskar', nameHi: 'सूर्य नमस्कार', emoji: '🌅',
    level: 'Beginner', levelColor: '#22c55e', duration: '15 min', category: 'Full Body',
    description: 'Sun Salutation — a sequence of 12 powerful yoga poses forming a complete body workout that expresses gratitude to the Sun.',
    benefits: ['Full body stretch', 'Improves circulation', 'Strengthens muscles', 'Boosts metabolism'],
    steps: ['Pranamasana (Prayer Pose)', 'Hasta Uttanasana (Raised Arms)', 'Hasta Padasana (Forward Bend)', 'Ashwa Sanchalanasana (Equestrian)', 'Dandasana (Stick Pose)', 'Ashtanga Namaskara (Eight-Limbed)', 'Bhujangasana (Cobra)', 'Adho Mukha Svanasana (Downward Dog)', 'Ashwa Sanchalanasana', 'Hasta Padasana', 'Hasta Uttanasana', 'Pranamasana'],
  },
  {
    name: 'Padmasana', nameHi: 'पद्मासन', emoji: '🪷',
    level: 'Intermediate', levelColor: '#f59e0b', duration: '10 min', category: 'Seated',
    description: 'Lotus Pose — the classic meditation posture that calms the mind, stimulates the pelvis and abdomen.',
    benefits: ['Calms the mind', 'Opens hips', 'Improves posture', 'Stimulates digestion'],
    steps: ['Sit on the floor with legs extended', 'Bend right knee, place foot on left thigh', 'Bend left knee, place foot on right thigh', 'Keep spine erect, hands in Chin Mudra', 'Close eyes, breathe deeply'],
  },
  {
    name: 'Vrikshasana', nameHi: 'वृक्षासन', emoji: '🌳',
    level: 'Beginner', levelColor: '#22c55e', duration: '5 min', category: 'Standing',
    description: 'Tree Pose — a balancing asana that strengthens legs and core while improving focus and concentration.',
    benefits: ['Improves balance', 'Strengthens legs', 'Builds focus', 'Opens hips'],
    steps: ['Stand in Tadasana', 'Shift weight to left foot', 'Place right sole on inner left thigh', 'Join palms above head (Namaskar Mudra)', 'Fix gaze on a point, hold 30 seconds', 'Repeat on the other side'],
  },
  {
    name: 'Bhujangasana', nameHi: 'भुजंगासन', emoji: '🐍',
    level: 'Beginner', levelColor: '#22c55e', duration: '5 min', category: 'Prone',
    description: 'Cobra Pose — a backbend that strengthens the spine, opens the chest and shoulders.',
    benefits: ['Strengthens spine', 'Opens chest', 'Firms buttocks', 'Relieves stress'],
    steps: ['Lie face down, palms beneath shoulders', 'Press palms, lift chest off the floor', 'Keep elbows slightly bent', 'Look upward, shoulders away from ears', 'Hold 15–30 seconds, release slowly'],
  },
  {
    name: 'Shirshasana', nameHi: 'शीर्षासन', emoji: '🧘',
    level: 'Advanced', levelColor: '#ef4444', duration: '5 min', category: 'Inversion',
    description: 'Headstand — the king of all asanas. Reverses blood flow, strengthens the entire body and calms the mind.',
    benefits: ['Increases blood flow to brain', 'Strengthens core & arms', 'Improves focus', 'Reverses gravity effects'],
    steps: ['Interlace fingers, place forearms on mat', 'Place crown of head on the floor', 'Walk feet toward head', 'Lift both legs slowly upward', 'Engage core, hold with steady breathing', 'Come down slowly, rest in Balasana'],
  },
  {
    name: 'Shavasana', nameHi: 'शवासन', emoji: '🌙',
    level: 'Beginner', levelColor: '#22c55e', duration: '10 min', category: 'Supine',
    description: 'Corpse Pose — the ultimate relaxation asana practiced at the end of every yoga session for deep rest.',
    benefits: ['Deep relaxation', 'Reduces blood pressure', 'Calms nervous system', 'Relieves fatigue'],
    steps: ['Lie flat on your back', 'Spread arms and legs slightly apart', 'Close eyes, palms facing upward', 'Relax every muscle from toes to head', 'Breathe naturally, observe sensations', 'Stay for 5–10 minutes'],
  },
  {
    name: 'Trikonasana', nameHi: 'त्रिकोणासन', emoji: '📐',
    level: 'Beginner', levelColor: '#22c55e', duration: '5 min', category: 'Standing',
    description: 'Triangle Pose — stretches and strengthens the legs, groin, hips, shoulders, chest, and spine.',
    benefits: ['Stretches sides', 'Strengthens legs', 'Opens chest', 'Improves digestion'],
    steps: ['Stand with feet wide apart', 'Turn right foot out 90 degrees', 'Extend arms parallel to the floor', 'Bend from the hip, right hand to shin', 'Left arm reaches upward', 'Look toward the left hand, hold', 'Repeat on the other side'],
  },
  {
    name: 'Dhanurasana', nameHi: 'धनुरासन', emoji: '🏹',
    level: 'Intermediate', levelColor: '#f59e0b', duration: '5 min', category: 'Prone',
    description: 'Bow Pose — a deep backbend that stretches the entire front body and strengthens the back.',
    benefits: ['Strengthens back', 'Stretches abdomen', 'Opens chest', 'Stimulates organs'],
    steps: ['Lie face down, bend both knees', 'Reach back, grab ankles with hands', 'Inhale, lift chest and thighs off floor', 'Look straight ahead, hold steady', 'Breathe gently, hold 15–20 seconds', 'Release and rest'],
  },
  {
    name: 'Sarvangasana', nameHi: 'सर्वांगासन', emoji: '⬆️',
    level: 'Intermediate', levelColor: '#f59e0b', duration: '5 min', category: 'Inversion',
    description: 'Shoulder Stand — the queen of asanas. Benefits the entire body, stimulates the thyroid gland.',
    benefits: ['Stimulates thyroid', 'Calms the brain', 'Stretches shoulders', 'Improves digestion'],
    steps: ['Lie on your back, arms alongside', 'Lift legs and hips overhead', 'Support lower back with hands', 'Extend legs straight up toward ceiling', 'Keep chin tucked into chest', 'Hold 30 seconds to 3 minutes'],
  },
];

const PRANAYAMAS: Pranayama[] = [
  {
    name: 'Anulom Vilom', nameHi: 'अनुलोम विलोम', emoji: '🌬️', duration: '10 min',
    description: 'Alternate Nostril Breathing — balances the left and right hemispheres of the brain, calms the mind.',
    benefits: ['Balances energy channels', 'Reduces stress', 'Improves lung capacity', 'Calms the nervous system'],
    steps: ['Sit in Padmasana or Sukhasana', 'Close right nostril with thumb', 'Inhale through left nostril (4 counts)', 'Close left nostril with ring finger', 'Exhale through right nostril (8 counts)', 'Inhale through right nostril (4 counts)', 'Close right, exhale through left', 'Repeat 10–15 rounds'],
  },
  {
    name: 'Kapalbhati', nameHi: 'कपालभाति', emoji: '💨', duration: '5 min',
    description: 'Skull Shining Breath — a powerful cleansing technique that energizes the body and clears the mind.',
    benefits: ['Detoxifies lungs', 'Strengthens core', 'Boosts energy', 'Improves digestion'],
    steps: ['Sit with spine straight', 'Take a deep breath in', 'Exhale forcefully through nose, pulling navel in', 'Inhalation happens passively', 'Start with 30 strokes per round', 'Rest between rounds', 'Practice 3 rounds'],
  },
  {
    name: 'Bhramari', nameHi: 'भ्रामरी', emoji: '🐝', duration: '5 min',
    description: 'Bee Breathing — creates a soothing humming vibration that calms the mind instantly.',
    benefits: ['Instant calm', 'Relieves headache', 'Reduces anger', 'Improves concentration'],
    steps: ['Sit comfortably, spine straight', 'Close ears with thumbs (Shanmukhi Mudra)', 'Place fingers over eyes', 'Inhale deeply through the nose', 'Exhale making a humming sound', 'Feel vibrations in head', 'Repeat 7–10 times'],
  },
  {
    name: 'Ujjayi', nameHi: 'उज्जायी', emoji: '🌊', duration: '10 min',
    description: 'Ocean Breath — a victorious breath that creates a calming ocean-like sound in the throat.',
    benefits: ['Builds internal heat', 'Calms the mind', 'Improves focus', 'Clears throat'],
    steps: ['Sit tall, mouth closed', 'Slightly constrict the back of your throat', 'Inhale slowly through the nose', 'The breath should sound like the ocean', 'Exhale through the nose with same constriction', 'Keep breath slow and even', 'Practice for 5–10 minutes'],
  },
  {
    name: 'Sheetali', nameHi: 'शीतली', emoji: '❄️', duration: '5 min',
    description: 'Cooling Breath — rolls the tongue into a tube and draws in cool air, reducing body heat and calming pitta.',
    benefits: ['Cools the body', 'Reduces pitta', 'Lowers blood pressure', 'Calms anger'],
    steps: ['Sit comfortably, spine erect', 'Roll tongue into a tube shape', 'Inhale slowly through the rolled tongue', 'Close mouth, exhale through nose', 'Feel the cooling sensation', 'Repeat 10–15 rounds'],
  },
  {
    name: 'Surya Bhedana', nameHi: 'सूर्य भेदन', emoji: '☀️', duration: '5 min',
    description: 'Right Nostril Breathing — activates the Pingala (sun) energy channel, warming and energizing the body.',
    benefits: ['Increases vitality', 'Warms the body', 'Boosts digestion', 'Activates sympathetic system'],
    steps: ['Sit in Padmasana', 'Close left nostril with ring finger', 'Inhale through right nostril (4 counts)', 'Close both nostrils, hold (16 counts)', 'Exhale through left nostril (8 counts)', 'Repeat 5–10 rounds', 'Practice in the morning'],
  },
];

const MANTRAS: Mantra[] = [
  {
    name: 'Gayatri Mantra', nameHi: 'गायत्री मन्त्र', emoji: '🔱',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    meaning: 'We meditate on the glory of the Creator who has created the Universe, who is worthy of worship, who is the source of knowledge. May He illuminate our intellect.',
    deity: 'Savitar (Sun)',
    benefits: ['Enhances intellect', 'Purifies mind', 'Brings wisdom', 'Universal protection'],
  },
  {
    name: 'Mahamrityunjaya Mantra', nameHi: 'महामृत्युंजय मन्त्र', emoji: '🪔',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनात् मृत्योर्मुक्षीय मामृतात्',
    meaning: 'We worship the three-eyed Lord Shiva who nourishes all beings. May He liberate us from death and grant immortality.',
    deity: 'Lord Shiva',
    benefits: ['Healing & protection', 'Overcomes fear of death', 'Restores health', 'Spiritual liberation'],
  },
  {
    name: 'Om Namah Shivaya', nameHi: 'ॐ नमः शिवाय', emoji: '🔱',
    sanskrit: 'ॐ नमः शिवाय',
    meaning: 'I bow to Lord Shiva — the auspicious one, the supreme consciousness.',
    deity: 'Lord Shiva',
    benefits: ['Inner peace', 'Removes negativity', 'Spiritual awakening', 'Purifies karma'],
  },
  {
    name: 'Om Mani Padme Hum', nameHi: 'ॐ मणि पद्मे हूँ', emoji: '💎',
    sanskrit: 'ॐ मणि पद्मे हूँ',
    meaning: 'The jewel is in the lotus — the path to compassion, wisdom, and enlightenment.',
    deity: 'Avalokiteshvara',
    benefits: ['Develops compassion', 'Purifies speech', 'Calms emotions', 'Brings wisdom'],
  },
  {
    name: 'Hanuman Chalisa', nameHi: 'हनुमान चालीसा', emoji: '🐒',
    sanskrit: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि। बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥',
    meaning: '40 verses devoted to Lord Hanuman by Tulsidas — the most recited Hindu prayer for courage and protection.',
    deity: 'Lord Hanuman',
    benefits: ['Removes fear', 'Grants courage', 'Protection from evil', 'Fulfills wishes'],
  },
  {
    name: 'Om Gan Ganapataye Namah', nameHi: 'ॐ गं गणपतये नमः', emoji: '🐘',
    sanskrit: 'ॐ गं गणपतये नमः',
    meaning: 'Salutations to Lord Ganesha — the remover of obstacles and the lord of beginnings.',
    deity: 'Lord Ganesha',
    benefits: ['Removes obstacles', 'New beginnings', 'Wisdom & success', 'Clears path'],
  },
  {
    name: 'Lakshmi Mantra', nameHi: 'लक्ष्मी मन्त्र', emoji: '🪷',
    sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
    meaning: 'Salutations to Goddess Mahalakshmi — the bestower of wealth, prosperity and grace.',
    deity: 'Goddess Lakshmi',
    benefits: ['Attracts prosperity', 'Material abundance', 'Spiritual wealth', 'Grace & beauty'],
  },
  {
    name: 'Saraswati Mantra', nameHi: 'सरस्वती मन्त्र', emoji: '📿',
    sanskrit: 'ॐ ऐं सरस्वत्यै नमः',
    meaning: 'Salutations to Goddess Saraswati — the bestower of knowledge, music, and arts.',
    deity: 'Goddess Saraswati',
    benefits: ['Enhances learning', 'Musical talent', 'Artistic expression', 'Sharp memory'],
  },
];

export function YogaPage() {
  const [tab, setTab] = useState<Tab>('asanas');
  const [expanded, setExpanded] = useState<string | null>(null);

  const [timerDuration, setTimerDuration] = useState(300);
  const [timeLeft, setTimeLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { stopTimer(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft, stopTimer]);

  const startTimer = () => setRunning(true);
  const resetTimer = () => { stopTimer(); setTimeLeft(timerDuration); };
  const selectPreset = (s: number) => { stopTimer(); setTimerDuration(s); setTimeLeft(s); };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'asanas', label: 'Yoga Asanas' },
    { id: 'pranayama', label: 'Pranayama' },
    { id: 'mantras', label: 'Mantras' },
    { id: 'meditation', label: 'Meditation' },
  ];

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Yoga & Meditation</h1>
          <p className={styles.subtitle}>योग एवं ध्यान — Ancient practices for body, breath, and mind</p>
        </div>

        <div className={styles.tabs}>
          {tabs.map((t) => (
            <button key={t.id} className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'asanas' && (
          <div className={styles.grid}>
            {ASANAS.map((a) => (
              <div key={a.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardEmoji}>{a.emoji}</span>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardName}>{a.name}</div>
                    <div className={styles.cardNameHi}>{a.nameHi}</div>
                    <span className={styles.cardLevel} style={{ background: a.levelColor }}>{a.level}</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardDesc}>{a.description}</p>
                  <div className={styles.cardBenefits}>
                    {a.benefits.map((b) => <span key={b} className={styles.benefit}>{b}</span>)}
                  </div>
                  {expanded === a.name && (
                    <ol className={styles.steps}>
                      {a.steps.map((s, i) => <li key={i} className={styles.step}>{s}</li>)}
                    </ol>
                  )}
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}><Clock size={12} /> {a.duration}</span>
                  <span className={styles.metaItem}><Activity size={12} /> {a.category}</span>
                </div>
                <button className={styles.toggleBtn} onClick={() => setExpanded(expanded === a.name ? null : a.name)}>
                  {expanded === a.name ? 'Hide Steps' : 'Show Steps'}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'pranayama' && (
          <div className={styles.grid}>
            {PRANAYAMAS.map((p) => (
              <div key={p.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardEmoji}>{p.emoji}</span>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardName}>{p.name}</div>
                    <div className={styles.cardNameHi}>{p.nameHi}</div>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardDesc}>{p.description}</p>
                  <div className={styles.cardBenefits}>
                    {p.benefits.map((b) => <span key={b} className={styles.benefit}>{b}</span>)}
                  </div>
                  {expanded === p.name && (
                    <ol className={styles.steps}>
                      {p.steps.map((s, i) => <li key={i} className={styles.step}>{s}</li>)}
                    </ol>
                  )}
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}><Clock size={12} /> {p.duration}</span>
                  <span className={styles.metaItem}><Wind size={12} /> Breathing</span>
                </div>
                <button className={styles.toggleBtn} onClick={() => setExpanded(expanded === p.name ? null : p.name)}>
                  {expanded === p.name ? 'Hide Steps' : 'Show Steps'}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'mantras' && (
          <div className={styles.grid}>
            {MANTRAS.map((m) => (
              <div key={m.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardEmoji}>{m.emoji}</span>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardName}>{m.name}</div>
                    <div className={styles.cardNameHi}>{m.nameHi}</div>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardDesc} style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)' }}>{m.sanskrit}</p>
                  <p className={styles.cardDesc}>{m.meaning}</p>
                  <div className={styles.cardBenefits}>
                    {m.benefits.map((b) => <span key={b} className={styles.benefit}>{b}</span>)}
                  </div>
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}>Deity: {m.deity}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'meditation' && (
          <div>
            <div className={styles.timer}>
              <div className={styles.timerDisplay}>{mm}:{ss}</div>
              <div className={styles.timerPresets}>
                {[
                  { label: '5 min', s: 300 },
                  { label: '10 min', s: 600 },
                  { label: '15 min', s: 900 },
                  { label: '20 min', s: 1200 },
                  { label: '30 min', s: 1800 },
                ].map((p) => (
                  <button key={p.s} className={`${styles.presetBtn} ${timerDuration === p.s ? styles.presetActive : ''}`} onClick={() => selectPreset(p.s)}>
                    {p.label}
                  </button>
                ))}
              </div>
              <div className={styles.timerActions}>
                <button className={styles.startBtn} onClick={running ? stopTimer : startTimer}>
                  {running ? 'Pause' : timeLeft < timerDuration ? 'Resume' : 'Start'}
                </button>
                <button className={styles.resetBtn} onClick={resetTimer}>Reset</button>
              </div>
            </div>

            <div className={styles.timerSection}>
              <h2 className={styles.sectionTitle}>Meditation Techniques</h2>
              <div className={styles.sectionTitleHi}>ध्यान विधियाँ</div>
              <div className={styles.grid}>
                {[
                  { name: 'Trataka', nameHi: 'त्राटक', emoji: '🕯️', desc: 'Candle gazing meditation — fix your gaze on a steady flame without blinking. Strengthens concentration and purifies the eyes.', benefits: ['Improves focus', 'Purifies eyes', 'Calms mind'] },
                  { name: 'Yoga Nidra', nameHi: 'योग निद्रा', emoji: '😴', desc: 'Psychic Sleep — a guided deep relaxation technique between waking and sleeping. One hour equals four hours of sleep.', benefits: ['Deep rest', 'Reduces anxiety', 'Heals body'] },
                  { name: 'Vipassana', nameHi: 'विपश्यना', emoji: '👁️', desc: 'Insight Meditation — observe bodily sensations with equanimity. The technique taught by S.N. Goenka in 10-day silent retreats.', benefits: ['Self-awareness', 'Equanimity', 'Liberation'] },
                  { name: 'Transcendental', nameHi: 'भावातीत ध्यान', emoji: '🌀', desc: 'TM — silently repeating a personal mantra to settle the mind into a state of restful alertness beyond thought.', benefits: ['Reduces stress', 'Effortless technique', 'Inner calm'] },
                  { name: 'Chakra Dhyana', nameHi: 'चक्र ध्यान', emoji: '🔮', desc: 'Focus on the seven energy centers (chakras) from Muladhara to Sahasrara, visualizing their colors and seed mantras.', benefits: ['Balances energy', 'Opens chakras', 'Spiritual growth'] },
                  { name: 'Anapanasati', nameHi: 'आनापानसति', emoji: '🌬️', desc: 'Mindfulness of Breathing — the Buddha\'s core meditation. Simply observe natural breath at the nostrils with full awareness.', benefits: ['Mindfulness', 'Simple & powerful', 'Calms thoughts'] },
                ].map((m) => (
                  <div key={m.name} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardEmoji}>{m.emoji}</span>
                      <div className={styles.cardInfo}>
                        <div className={styles.cardName}>{m.name}</div>
                        <div className={styles.cardNameHi}>{m.nameHi}</div>
                      </div>
                    </div>
                    <div className={styles.cardBody}>
                      <p className={styles.cardDesc}>{m.desc}</p>
                      <div className={styles.cardBenefits}>
                        {m.benefits.map((b) => <span key={b} className={styles.benefit}>{b}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

import { useState } from 'react';
import { Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './RecipesPage.module.css';

interface Recipe {
  name: string;
  nameHi: string;
  emoji: string;
  category: string;
  categoryColor: string;
  occasion: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  steps: string[];
}

const RECIPES: Recipe[] = [
  {
    name: 'Panchamrit', nameHi: 'पंचामृत', emoji: '🥛', category: 'Prasad', categoryColor: '#e67e22',
    occasion: 'All pujas, Abhishek',
    description: 'The five-nectar mixture used in Hindu worship for abhishek. Made of milk, curd, honey, ghee, and sugar — symbolizing the five elements.',
    prepTime: '10 min', servings: '4',
    ingredients: ['1 cup milk', '2 tbsp curd/yogurt', '1 tbsp honey', '1 tsp ghee', '1 tbsp sugar', 'Tulsi leaves', 'Pinch of cardamom'],
    steps: ['Mix milk and curd in a clean bowl.', 'Add honey and ghee, stir gently.', 'Add sugar and mix until dissolved.', 'Add crushed cardamom and tulsi leaves.', 'Offer to the deity first, then distribute as prasad.'],
  },
  {
    name: 'Kheer', nameHi: 'खीर', emoji: '🍚', category: 'Prasad', categoryColor: '#e67e22',
    occasion: 'Satyanarayan Puja, Purnima, festivals',
    description: 'A rich rice pudding made with milk, sugar, and dry fruits. One of the most common and beloved prasad offerings across India.',
    prepTime: '45 min', servings: '6',
    ingredients: ['½ cup basmati rice', '1 liter full cream milk', '½ cup sugar', '10 cashews', '10 raisins', '2 tbsp ghee', '½ tsp cardamom powder', 'Saffron strands'],
    steps: ['Wash and soak rice for 30 minutes.', 'Boil milk in a heavy-bottom pan, stirring frequently.', 'Add drained rice to boiling milk.', 'Cook on low heat for 25-30 minutes, stirring often.', 'Add sugar, cardamom, and saffron. Mix well.', 'Fry cashews and raisins in ghee, add to kheer.', 'Cool slightly before offering.'],
  },
  {
    name: 'Sabudana Khichdi', nameHi: 'साबूदाना खिचड़ी', emoji: '🥜', category: 'Vrat', categoryColor: '#27ae60',
    occasion: 'Ekadashi, Navratri, all fasting days',
    description: 'A light and filling fasting dish made with tapioca pearls, peanuts, and potatoes. The go-to meal during Ekadashi and Navratri fasts.',
    prepTime: '30 min', servings: '3',
    ingredients: ['1 cup sabudana (soaked 4-6 hrs)', '½ cup roasted peanuts', '2 medium potatoes (cubed)', '2-3 green chillies', '1 tsp cumin seeds', '2 tbsp ghee', 'Rock salt (sendha namak)', 'Fresh coriander', 'Lemon juice'],
    steps: ['Soak sabudana for 4-6 hours, drain completely.', 'Crush peanuts coarsely.', 'Heat ghee, add cumin seeds.', 'Add cubed potatoes, cook until golden.', 'Add green chillies and soaked sabudana.', 'Stir gently on medium heat for 5-7 minutes.', 'Add crushed peanuts and rock salt.', 'Garnish with coriander and lemon juice.'],
  },
  {
    name: 'Kuttu ka Atta Puri', nameHi: 'कुट्टू का आटा पूरी', emoji: '🫓', category: 'Vrat', categoryColor: '#27ae60',
    occasion: 'Navratri, Ekadashi fasting',
    description: 'Deep-fried buckwheat flour puris — a staple during Navratri fasting. Light, crispy, and completely vrat-compliant.',
    prepTime: '25 min', servings: '4',
    ingredients: ['1 cup kuttu (buckwheat) flour', '2 boiled potatoes (mashed)', 'Rock salt', 'Black pepper', 'Oil for frying'],
    steps: ['Mix kuttu flour with mashed potatoes.', 'Add rock salt and black pepper.', 'Knead into a smooth dough using water.', 'Make small balls and roll into puris.', 'Deep fry in hot oil until puffed and golden.', 'Drain on paper towels.'],
  },
  {
    name: 'Panjiri', nameHi: 'पंजीरी', emoji: '🌾', category: 'Prasad', categoryColor: '#e67e22',
    occasion: 'Janmashtami, Diwali, Pujas',
    description: 'A nutritious sweet made from roasted wheat flour, ghee, sugar, and dry fruits. Traditional prasad for Janmashtami and a postpartum superfood.',
    prepTime: '30 min', servings: '8',
    ingredients: ['2 cups wheat flour (atta)', '1 cup ghee', '1 cup powdered sugar', '¼ cup almonds (sliced)', '¼ cup pistachios (chopped)', '2 tbsp melon seeds', '1 tsp cardamom powder', '½ tsp dry ginger powder'],
    steps: ['Heat ghee in a heavy pan.', 'Add wheat flour and roast on low heat for 15-20 minutes until golden and aromatic.', 'Add sliced almonds, pistachios, and melon seeds.', 'Remove from heat and cool slightly.', 'Mix in powdered sugar, cardamom, and ginger powder.', 'Store in an airtight container. Shape into portions when serving.'],
  },
  {
    name: 'Chana Sundal', nameHi: 'चना सुंदल', emoji: '🫘', category: 'Prasad', categoryColor: '#e67e22',
    occasion: 'Navratri, South Indian temples',
    description: 'A protein-rich South Indian temple prasad made from boiled chickpeas tempered with mustard seeds, curry leaves, and coconut.',
    prepTime: '25 min', servings: '4',
    ingredients: ['2 cups boiled chickpeas', '1 tbsp coconut oil', '1 tsp mustard seeds', '1 tsp urad dal', '2 dried red chillies', 'Curry leaves', '¼ cup fresh grated coconut', 'Salt to taste'],
    steps: ['Heat coconut oil in a pan.', 'Add mustard seeds, let them splutter.', 'Add urad dal, red chillies, and curry leaves.', 'Add boiled chickpeas and salt.', 'Toss well for 2-3 minutes.', 'Garnish with fresh grated coconut.', 'Serve warm as prasad.'],
  },
  {
    name: 'Singhare ka Halwa', nameHi: 'सिंघाड़े का हलवा', emoji: '🫕', category: 'Vrat', categoryColor: '#27ae60',
    occasion: 'Navratri, Ekadashi, Maha Shivaratri',
    description: 'A rich halwa made from water chestnut flour — perfectly suited for fasting days. Sweet, aromatic, and deeply satisfying.',
    prepTime: '20 min', servings: '3',
    ingredients: ['1 cup singhara (water chestnut) flour', '½ cup ghee', '¾ cup sugar', '1½ cups water', '¼ tsp cardamom powder', '8-10 cashews'],
    steps: ['Heat ghee in a pan, fry cashews and set aside.', 'Mix singhara flour with water to make a smooth paste.', 'Pour the paste into the ghee, stirring continuously.', 'Cook on low heat for 8-10 minutes until it leaves the sides.', 'Add sugar and cardamom, mix well.', 'Garnish with fried cashews.', 'Serve warm.'],
  },
  {
    name: 'Modak', nameHi: 'मोदक', emoji: '🫓', category: 'Festival', categoryColor: '#9b59b6',
    occasion: 'Ganesh Chaturthi',
    description: 'Lord Ganesha\'s favorite sweet — steamed dumplings filled with coconut and jaggery. Making modaks is a devotional act during Ganesh Chaturthi.',
    prepTime: '60 min', servings: '12',
    ingredients: ['1 cup rice flour', '1 cup fresh grated coconut', '¾ cup jaggery (grated)', '½ tsp cardamom powder', '1 tbsp ghee', 'Pinch of salt', 'Nutmeg powder'],
    steps: ['Boil water with salt and ghee, add rice flour and mix quickly.', 'Knead into a smooth dough, keep covered.', 'Heat a pan, add coconut and jaggery, cook until jaggery melts.', 'Add cardamom and nutmeg, mix well. Cool the filling.', 'Take a small ball of dough, flatten into a cup shape.', 'Fill with coconut-jaggery mixture, close and shape into a modak.', 'Steam for 10-15 minutes. Offer to Lord Ganesha.'],
  },
  {
    name: 'Malpua', nameHi: 'मालपुआ', emoji: '🥞', category: 'Festival', categoryColor: '#9b59b6',
    occasion: 'Holi, Diwali, Chhath Puja',
    description: 'Sweet pancakes soaked in sugar syrup — a traditional festive delicacy from Bihar, Rajasthan, and Bengal. Often offered during Chhath Puja.',
    prepTime: '40 min', servings: '6',
    ingredients: ['1 cup maida (all-purpose flour)', '½ cup sooji (semolina)', '½ cup milk', '1 ripe banana (mashed)', '½ tsp cardamom powder', '¼ tsp fennel seeds', '1 cup sugar (for syrup)', 'Ghee for frying'],
    steps: ['Mix flour, sooji, mashed banana, and milk into a smooth batter.', 'Add cardamom and fennel. Rest for 30 minutes.', 'Make sugar syrup: boil sugar with water until one-string consistency.', 'Heat ghee in a flat pan.', 'Pour batter in small rounds, fry until golden on both sides.', 'Dip hot malpuas in sugar syrup for 2 minutes.', 'Serve warm, optionally with rabdi.'],
  },
];

const CATEGORIES = ['All', 'Prasad', 'Vrat', 'Festival'];

export function RecipesPage() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = filter === 'All' ? RECIPES : RECIPES.filter((r) => r.category === filter);

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Prasad & Recipes · प्रसाद और व्यंजन</h1>
          <p className={styles.subtitle}>Sacred food offerings, fasting recipes & festive sweets</p>
        </div>

        <div className={styles.filters}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`${styles.filterBtn} ${filter === c ? styles.filterActive : ''}`}
              onClick={() => setFilter(c)}
            >
              {c} {c !== 'All' && `(${RECIPES.filter((r) => r.category === c).length})`}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((r) => {
            const isOpen = expanded.has(r.name);
            return (
              <div key={r.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardEmoji}>{r.emoji}</div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardName}>{r.name}</div>
                    <div className={styles.cardNameHi}>{r.nameHi}</div>
                    <div className={styles.cardOccasion}>{r.occasion}</div>
                  </div>
                  <span className={styles.cardBadge} style={{ background: r.categoryColor }}>
                    {r.category}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardDesc}>{r.description}</div>
                </div>

                <div className={styles.meta}>
                  <span className={styles.metaItem}><Clock size={12} /> {r.prepTime}</span>
                  <span className={styles.metaItem}><Users size={12} /> {r.servings} servings</span>
                </div>

                {isOpen && (
                  <div className={styles.cardBody}>
                    <div className={styles.sectionLabel}>Ingredients</div>
                    <div className={styles.ingredients}>
                      {r.ingredients.map((ing) => (
                        <span key={ing} className={styles.ingredient}>{ing}</span>
                      ))}
                    </div>

                    <div className={styles.sectionLabel}>Steps</div>
                    <ol className={styles.steps}>
                      {r.steps.map((step, i) => (
                        <li key={i} className={styles.step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                <button className={styles.toggleBtn} onClick={() => toggle(r.name)}>
                  {isOpen ? <><ChevronUp size={14} /> Hide Recipe</> : <><ChevronDown size={14} /> View Full Recipe</>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export interface Aarti {
  id: string;
  name: string;
  nameHi: string;
  deity: string;
  deityHi: string;
  lyrics: string[];
  lyricsHi: string[];
  occasion: string;
}

export interface Mantra {
  id: string;
  name: string;
  nameHi: string;
  deity: string;
  deityHi: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  benefits: string;
  count?: number;
}

export interface PujaGuide {
  id: string;
  name: string;
  nameHi: string;
  deity: string;
  deityHi: string;
  occasion: string;
  items: string[];
  steps: string[];
  mantra?: string;
  significance: string;
}

export interface Chalisa {
  id: string;
  name: string;
  nameHi: string;
  deity: string;
  deityHi: string;
  dohaCount: number;
  chaupaaiCount: number;
  day: string;
  benefits: string;
  openingDoha: string;
  openingDohaHi: string;
}

export const AARTIS: Aarti[] = [
  {
    id: 'om-jai-jagdish',
    name: 'Om Jai Jagdish Hare',
    nameHi: 'ॐ जय जगदीश हरे',
    deity: 'Lord Vishnu',
    deityHi: 'भगवान विष्णु',
    lyrics: [
      'Om Jai Jagdish Hare, Swami Jai Jagdish Hare',
      'Bhakt jano ke sankat, Daas jano ke sankat',
      'Kshan mein door kare, Om Jai Jagdish Hare',
    ],
    lyricsHi: [
      'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे',
      'भक्त जनों के संकट, दास जनों के संकट',
      'क्षण में दूर करे, ॐ जय जगदीश हरे',
    ],
    occasion: 'Daily evening prayer, all occasions',
  },
  {
    id: 'ganesh-aarti',
    name: 'Jai Ganesh Deva',
    nameHi: 'जय गणेश देवा',
    deity: 'Lord Ganesha',
    deityHi: 'भगवान गणेश',
    lyrics: [
      'Jai Ganesh Jai Ganesh Jai Ganesh Deva',
      'Mata jaaki Parvati, Pita Mahadeva',
    ],
    lyricsHi: [
      'जय गणेश जय गणेश जय गणेश देवा',
      'माता जाकी पार्वती, पिता महादेवा',
    ],
    occasion: 'Beginning of all pujas, Ganesh Chaturthi',
  },
  {
    id: 'lakshmi-aarti',
    name: 'Om Jai Lakshmi Mata',
    nameHi: 'ॐ जय लक्ष्मी माता',
    deity: 'Goddess Lakshmi',
    deityHi: 'देवी लक्ष्मी',
    lyrics: [
      'Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata',
      'Tumko nishdin sevat, Hari Vishnu Vidhata',
    ],
    lyricsHi: [
      'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता',
      'तुमको निशदिन सेवत, हरि विष्णु विधाता',
    ],
    occasion: 'Friday prayers, Diwali, Lakshmi Puja',
  },
  {
    id: 'shiv-aarti',
    name: 'Om Jai Shiv Omkara',
    nameHi: 'ॐ जय शिव ओंकारा',
    deity: 'Lord Shiva',
    deityHi: 'भगवान शिव',
    lyrics: [
      'Om Jai Shiv Omkara, Swami Jai Shiv Omkara',
      'Brahma Vishnu Sadashiv, Ardhaangi Dhara',
    ],
    lyricsHi: [
      'ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा',
      'ब्रह्मा विष्णु सदाशिव, अर्धांगी धारा',
    ],
    occasion: 'Monday prayers, Maha Shivaratri',
  },
  {
    id: 'durga-aarti',
    name: 'Jai Ambe Gauri',
    nameHi: 'जय अम्बे गौरी',
    deity: 'Goddess Durga',
    deityHi: 'देवी दुर्गा',
    lyrics: [
      'Jai Ambe Gauri, Maiya Jai Shyama Gauri',
      'Tumko nishdin dhyavat, Hari Brahma Shivri',
    ],
    lyricsHi: [
      'जय अम्बे गौरी, मैया जय श्यामा गौरी',
      'तुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी',
    ],
    occasion: 'Navratri, Tuesday prayers, Durga Puja',
  },
  {
    id: 'hanuman-aarti',
    name: 'Aarti Kije Hanuman Lala Ki',
    nameHi: 'आरती कीजै हनुमान लला की',
    deity: 'Lord Hanuman',
    deityHi: 'भगवान हनुमान',
    lyrics: [
      'Aarti kije Hanuman lala ki',
      'Dusht dalan Raghunath kala ki',
    ],
    lyricsHi: [
      'आरती कीजै हनुमान लला की',
      'दुष्ट दलन रघुनाथ कला की',
    ],
    occasion: 'Tuesday and Saturday prayers',
  },
  {
    id: 'saraswati-aarti',
    name: 'Jai Saraswati Mata',
    nameHi: 'जय सरस्वती माता',
    deity: 'Goddess Saraswati',
    deityHi: 'देवी सरस्वती',
    lyrics: [
      'Jai Saraswati Mata, Maiya Jai Saraswati Mata',
      'Sadguna vaibhav shaalini, Tribhuvan vikhyata',
    ],
    lyricsHi: [
      'जय सरस्वती माता, मैया जय सरस्वती माता',
      'सद्गुण वैभव शालिनी, त्रिभुवन विख्याता',
    ],
    occasion: 'Vasant Panchami, students\' prayers',
  },
  {
    id: 'krishna-aarti',
    name: 'Aarti Kunj Bihari Ki',
    nameHi: 'आरती कुंज बिहारी की',
    deity: 'Lord Krishna',
    deityHi: 'भगवान कृष्ण',
    lyrics: [
      'Aarti kunj bihari ki, Shri Girdhar Krishna Murari ki',
      'Gale mein baijanti mala, Bajaavent Murali Madhur bala',
    ],
    lyricsHi: [
      'आरती कुंज बिहारी की, श्री गिरधर कृष्ण मुरारी की',
      'गले में बैजंती माला, बजावें मुरली मधुर बाला',
    ],
    occasion: 'Janmashtami, daily Krishna prayers',
  },
];

export const MANTRAS: Mantra[] = [
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    nameHi: 'गायत्री मंत्र',
    deity: 'Sun God / Savitri',
    deityHi: 'सूर्य देव / सावित्री',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    transliteration: 'Om Bhur Bhuvah Svaha Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat',
    meaning: 'We meditate on the glory of that divine being who illuminates all. May that divine light illuminate our intellect.',
    benefits: 'Spiritual wisdom, mental clarity, divine protection',
    count: 108,
  },
  {
    id: 'maha-mrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    nameHi: 'महा मृत्युंजय मंत्र',
    deity: 'Lord Shiva',
    deityHi: 'भगवान शिव',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्',
    transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat',
    meaning: 'We worship the three-eyed one who nourishes all beings. May he free us from the bondage of death, as a cucumber is freed from its vine.',
    benefits: 'Health, longevity, overcoming fear of death',
    count: 108,
  },
  {
    id: 'ganesh-mantra',
    name: 'Ganesh Beej Mantra',
    nameHi: 'गणेश बीज मंत्र',
    deity: 'Lord Ganesha',
    deityHi: 'भगवान गणेश',
    sanskrit: 'ॐ गं गणपतये नमः',
    transliteration: 'Om Gam Ganapataye Namaha',
    meaning: 'Salutations to Lord Ganesha, the remover of obstacles.',
    benefits: 'Removing obstacles, new beginnings, wisdom',
    count: 108,
  },
  {
    id: 'vishnu-mantra',
    name: 'Vishnu Mantra',
    nameHi: 'विष्णु मंत्र',
    deity: 'Lord Vishnu',
    deityHi: 'भगवान विष्णु',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय',
    transliteration: 'Om Namo Bhagavate Vasudevaya',
    meaning: 'I bow to Lord Vasudeva (Krishna), the supreme personality of Godhead.',
    benefits: 'Peace, spiritual liberation, divine grace',
    count: 108,
  },
  {
    id: 'shiv-mantra',
    name: 'Shiva Panchakshari',
    nameHi: 'शिव पंचाक्षरी मंत्र',
    deity: 'Lord Shiva',
    deityHi: 'भगवान शिव',
    sanskrit: 'ॐ नमः शिवाय',
    transliteration: 'Om Namah Shivaya',
    meaning: 'I bow to Lord Shiva, the auspicious one.',
    benefits: 'Inner peace, destruction of negativity, spiritual growth',
    count: 108,
  },
  {
    id: 'lakshmi-mantra',
    name: 'Lakshmi Beej Mantra',
    nameHi: 'लक्ष्मी बीज मंत्र',
    deity: 'Goddess Lakshmi',
    deityHi: 'देवी लक्ष्मी',
    sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
    transliteration: 'Om Shreem Mahalakshmyai Namaha',
    meaning: 'Salutations to Goddess Mahalakshmi, the bestower of wealth.',
    benefits: 'Prosperity, abundance, material and spiritual wealth',
    count: 108,
  },
  {
    id: 'hanuman-mantra',
    name: 'Hanuman Mantra',
    nameHi: 'हनुमान मंत्र',
    deity: 'Lord Hanuman',
    deityHi: 'भगवान हनुमान',
    sanskrit: 'ॐ हनुमते नमः',
    transliteration: 'Om Hanumate Namaha',
    meaning: 'Salutations to Lord Hanuman, the mighty devotee of Rama.',
    benefits: 'Courage, strength, protection from evil',
    count: 108,
  },
  {
    id: 'durga-mantra',
    name: 'Durga Beej Mantra',
    nameHi: 'दुर्गा बीज मंत्र',
    deity: 'Goddess Durga',
    deityHi: 'देवी दुर्गा',
    sanskrit: 'ॐ दुं दुर्गायै नमः',
    transliteration: 'Om Dum Durgayei Namaha',
    meaning: 'Salutations to Goddess Durga, the invincible one.',
    benefits: 'Protection, courage, overcoming difficulties',
    count: 108,
  },
  {
    id: 'saraswati-mantra',
    name: 'Saraswati Mantra',
    nameHi: 'सरस्वती मंत्र',
    deity: 'Goddess Saraswati',
    deityHi: 'देवी सरस्वती',
    sanskrit: 'ॐ ऐं सरस्वत्यै नमः',
    transliteration: 'Om Aim Saraswatyai Namaha',
    meaning: 'Salutations to Goddess Saraswati, the goddess of knowledge.',
    benefits: 'Knowledge, learning, creativity, speech',
    count: 108,
  },
  {
    id: 'surya-mantra',
    name: 'Surya Mantra',
    nameHi: 'सूर्य मंत्र',
    deity: 'Sun God',
    deityHi: 'सूर्य देव',
    sanskrit: 'ॐ सूर्याय नमः',
    transliteration: 'Om Suryaya Namaha',
    meaning: 'Salutations to the Sun God, the source of all energy.',
    benefits: 'Health, vitality, leadership, success',
    count: 12,
  },
];

export const PUJA_GUIDES: PujaGuide[] = [
  {
    id: 'ganesh-puja',
    name: 'Ganesh Puja',
    nameHi: 'गणेश पूजा',
    deity: 'Lord Ganesha',
    deityHi: 'भगवान गणेश',
    occasion: 'Beginning of all pujas, Ganesh Chaturthi, new ventures',
    items: ['Ganesh idol or image', 'Modak or laddoo', 'Durva grass', 'Red flowers', 'Sindoor', 'Incense sticks', 'Ghee lamp', 'Coconut', 'Fruits'],
    steps: [
      'Clean the puja area and place a red cloth',
      'Place the Ganesh idol or image facing east',
      'Invoke Lord Ganesha with the mantra Om Gam Ganapataye Namaha',
      'Offer durva grass (21 blades) and red flowers',
      'Apply sindoor tilak to the idol',
      'Offer modak and fruits as prasad',
      'Light the ghee lamp and incense',
      'Perform aarti with Jai Ganesh Deva',
      'Conclude with the prayer for obstacle removal',
    ],
    mantra: 'ॐ गं गणपतये नमः',
    significance: 'Ganesh Puja is performed first in all Hindu rituals as Lord Ganesha is the remover of obstacles and the lord of beginnings.',
  },
  {
    id: 'lakshmi-puja',
    name: 'Lakshmi Puja',
    nameHi: 'लक्ष्मी पूजा',
    deity: 'Goddess Lakshmi',
    deityHi: 'देवी लक्ष्मी',
    occasion: 'Diwali, Fridays, beginning of business',
    items: ['Lakshmi idol or image', 'Lotus flowers', 'Rice grains (akshata)', 'Turmeric', 'Kumkum', 'Coins', 'Ghee lamp', 'Incense', 'Sweets', 'Coconut'],
    steps: [
      'Clean and decorate the puja area with rangoli',
      'Place the Lakshmi idol on a raised platform with a red cloth',
      'Draw a lotus pattern with turmeric and kumkum',
      'Place coins around the idol',
      'Offer lotus flowers or red roses',
      'Sprinkle akshata (rice) while chanting',
      'Light ghee lamp and incense',
      'Offer sweets and fruits',
      'Perform Lakshmi aarti',
      'Distribute prasad to family members',
    ],
    mantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
    significance: 'Lakshmi Puja invokes the Goddess of wealth, fortune, and prosperity. It is especially important during Diwali.',
  },
  {
    id: 'shiv-puja',
    name: 'Shiva Puja',
    nameHi: 'शिव पूजा',
    deity: 'Lord Shiva',
    deityHi: 'भगवान शिव',
    occasion: 'Mondays, Maha Shivaratri, Pradosh Vrat',
    items: ['Shivalinga or image', 'Bilva (bael) leaves', 'Milk', 'Water', 'Honey', 'Datura flowers', 'Dhatura fruit', 'Vibhuti (sacred ash)', 'Incense', 'Ghee lamp'],
    steps: [
      'Clean the puja area and place the Shivalinga',
      'Abhishek: Pour milk over the Shivalinga',
      'Pour water mixed with honey',
      'Offer bilva (bael) leaves — sets of three',
      'Apply vibhuti to the Shivalinga',
      'Offer white or blue flowers, datura',
      'Light the ghee lamp and incense',
      'Chant Om Namah Shivaya 108 times',
      'Perform Shiva aarti',
      'Offer fruits and sweets as prasad',
    ],
    mantra: 'ॐ नमः शिवाय',
    significance: 'Shiva Puja seeks blessings of the destroyer of evil. The Abhishek (ritual bathing) of Shivalinga is central to this worship.',
  },
  {
    id: 'satyanarayan-puja',
    name: 'Satyanarayan Puja',
    nameHi: 'सत्यनारायण पूजा',
    deity: 'Lord Satyanarayan (Vishnu)',
    deityHi: 'भगवान सत्यनारायण',
    occasion: 'Purnima (full moon), new home, auspicious occasions',
    items: ['Satyanarayan idol or image', 'Banana leaves', 'Wheat flour', 'Sugar', 'Ghee', 'Milk', 'Tulsi leaves', 'Fruits', 'Panchaamrit', 'Betel leaves and nuts'],
    steps: [
      'Set up the puja area with a kalash and mango leaves',
      'Invoke Lord Satyanarayan and perform Ganesh puja first',
      'Offer panchaamrit to the deity',
      'Read the Satyanarayan Katha (5 chapters)',
      'Prepare and offer sheera (halwa) as prasad',
      'Offer tulsi leaves and flowers',
      'Perform aarti after each chapter',
      'Distribute prasad to all attendees',
      'Tie the sacred thread (mauli) on the wrist',
    ],
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    significance: 'Satyanarayan Puja is performed for well-being, prosperity, and fulfillment of wishes. It is traditionally done on Purnima.',
  },
  {
    id: 'navgraha-puja',
    name: 'Navgraha Puja',
    nameHi: 'नवग्रह पूजा',
    deity: 'Nine Planets',
    deityHi: 'नवग्रह',
    occasion: 'Planetary doshas, new ventures, housewarming',
    items: ['9 types of grains', '9 types of flowers', '9 colored cloths', 'Ghee lamps (9)', 'Incense', 'Navgraha yantra', 'Sacred thread', 'Camphor'],
    steps: [
      'Set up 9 small mounds of grain representing each planet',
      'Place appropriate colored cloth under each mound',
      'Invoke each planet with its specific mantra',
      'Offer specific flowers to each planet',
      'Light individual ghee lamps for each planet',
      'Chant the Navgraha Stotram',
      'Offer specific food items for each planet',
      'Perform aarti and distribute prasad',
    ],
    mantra: 'ॐ नवग्रहाय नमः',
    significance: 'Navgraha Puja pacifies the nine celestial bodies (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) and mitigates their negative effects.',
  },
];

export const CHALISAS: Chalisa[] = [
  {
    id: 'hanuman-chalisa',
    name: 'Hanuman Chalisa',
    nameHi: 'हनुमान चालीसा',
    deity: 'Lord Hanuman',
    deityHi: 'भगवान हनुमान',
    dohaCount: 2,
    chaupaaiCount: 40,
    day: 'Tuesday & Saturday',
    benefits: 'Courage, strength, protection from evil, overcoming obstacles',
    openingDoha: 'Shri Guru Charan Saroj Raj, Nij Manu Mukuru Sudhari',
    openingDohaHi: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि',
  },
  {
    id: 'shiv-chalisa',
    name: 'Shiv Chalisa',
    nameHi: 'शिव चालीसा',
    deity: 'Lord Shiva',
    deityHi: 'भगवान शिव',
    dohaCount: 2,
    chaupaaiCount: 40,
    day: 'Monday',
    benefits: 'Peace of mind, fulfillment of desires, destruction of sins',
    openingDoha: 'Jai Ganesh Girija Suvan, Mangal Mul Sujan',
    openingDohaHi: 'जय गणेश गिरिजा सुवन, मंगल मूल सुजान',
  },
  {
    id: 'durga-chalisa',
    name: 'Durga Chalisa',
    nameHi: 'दुर्गा चालीसा',
    deity: 'Goddess Durga',
    deityHi: 'देवी दुर्गा',
    dohaCount: 2,
    chaupaaiCount: 40,
    day: 'Tuesday & Friday',
    benefits: 'Protection, victory over enemies, courage, spiritual power',
    openingDoha: 'Namo Namo Durge Sukh Karani, Namo Namo Ambe Dukh Harani',
    openingDohaHi: 'नमो नमो दुर्गे सुख करनी, नमो नमो अम्बे दुःख हरनी',
  },
  {
    id: 'ganesh-chalisa',
    name: 'Ganesh Chalisa',
    nameHi: 'गणेश चालीसा',
    deity: 'Lord Ganesha',
    deityHi: 'भगवान गणेश',
    dohaCount: 2,
    chaupaaiCount: 40,
    day: 'Wednesday',
    benefits: 'Wisdom, obstacle removal, success in endeavors',
    openingDoha: 'Jai Ganapati Sadgun Sadan, Kavivar Badan Kripaal',
    openingDohaHi: 'जय गणपति सदगुण सदन, कविवर बदन कृपाल',
  },
  {
    id: 'lakshmi-chalisa',
    name: 'Lakshmi Chalisa',
    nameHi: 'लक्ष्मी चालीसा',
    deity: 'Goddess Lakshmi',
    deityHi: 'देवी लक्ष्मी',
    dohaCount: 2,
    chaupaaiCount: 40,
    day: 'Friday',
    benefits: 'Wealth, prosperity, fortune, marital bliss',
    openingDoha: 'Maat Lakshmi Kari Kripa Karo, Hridaya Mein Baas Karo',
    openingDohaHi: 'मात लक्ष्मी करी कृपा करो, हृदय में वास करो',
  },
];

export const DEITY_COLORS: Record<string, string> = {
  'Lord Ganesha': '#e67e22',
  'Lord Shiva': '#3498db',
  'Goddess Lakshmi': '#e91e63',
  'Goddess Durga': '#c0392b',
  'Lord Vishnu': '#2980b9',
  'Lord Hanuman': '#e74c3c',
  'Lord Krishna': '#1a237e',
  'Goddess Saraswati': '#f1c40f',
  'Sun God': '#f39c12',
  'Sun God / Savitri': '#f39c12',
  'Nine Planets': '#9b59b6',
  'Lord Satyanarayan (Vishnu)': '#2980b9',
};

import { useState } from 'react';
import styles from './NakshatraPage.module.css';

interface Nakshatra {
  num: number;
  name: string;
  nameHi: string;
  symbol: string;
  deity: string;
  deityHi: string;
  ruler: string;
  rulerHi: string;
  nature: string;
  natureHi: string;
  gana: string;
  ganaHi: string;
  animal: string;
  startDeg: number;
  endDeg: number;
  traits: string[];
  description: string;
  ppiSymbol: string;
  ppiPadas: Array<{ sign: string; letter: string }>;
}

const NAKSHATRAS: Nakshatra[] = [
  {
    num: 1, name: 'Ashwini', nameHi: 'अश्विनी', symbol: 'Horse head', deity: 'Ashwini Kumaras', deityHi: 'अश्विनी कुमार',
    ruler: 'Ketu', rulerHi: 'केतु', nature: 'Light', natureHi: 'लघु', gana: 'Deva', ganaHi: 'देव', animal: 'Male Horse',
    startDeg: 0, endDeg: 13.33, traits: ['Quick', 'Healing', 'Pioneering', 'Independent'],
    description: 'The first nakshatra symbolizes new beginnings, speed, and healing power. Those born under Ashwini are natural healers with a pioneering spirit.',
    ppiSymbol: '🐎', ppiPadas: [{ sign: 'Aries', letter: 'चु (Chu)' }, { sign: 'Aries', letter: 'चे (Che)' }, { sign: 'Aries', letter: 'चो (Cho)' }, { sign: 'Aries', letter: 'ला (La)' }],
  },
  {
    num: 2, name: 'Bharani', nameHi: 'भरणी', symbol: 'Yoni (female organ)', deity: 'Yama', deityHi: 'यम',
    ruler: 'Venus', rulerHi: 'शुक्र', nature: 'Fierce', natureHi: 'उग्र', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Male Elephant',
    startDeg: 13.33, endDeg: 26.67, traits: ['Restraint', 'Transformation', 'Nurturing', 'Creative'],
    description: 'Bharani represents the power of restraint and transformation. Associated with Yama, it symbolizes the cycle of birth, death, and rebirth.',
    ppiSymbol: '🐘', ppiPadas: [{ sign: 'Aries', letter: 'ली (Li)' }, { sign: 'Aries', letter: 'लू (Lu)' }, { sign: 'Aries', letter: 'ले (Le)' }, { sign: 'Aries', letter: 'लो (Lo)' }],
  },
  {
    num: 3, name: 'Krittika', nameHi: 'कृत्तिका', symbol: 'Razor/Flame', deity: 'Agni', deityHi: 'अग्नि',
    ruler: 'Sun', rulerHi: 'सूर्य', nature: 'Mixed', natureHi: 'मिश्र', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Female Sheep',
    startDeg: 26.67, endDeg: 40, traits: ['Sharp', 'Purifying', 'Courageous', 'Determined'],
    description: 'Named after the six Krittikas (Pleiades) who nursed Kartikeya. Represents the purifying power of fire and the ability to cut through illusion.',
    ppiSymbol: '🔥', ppiPadas: [{ sign: 'Aries', letter: 'अ (A)' }, { sign: 'Taurus', letter: 'ई (Ee)' }, { sign: 'Taurus', letter: 'उ (U)' }, { sign: 'Taurus', letter: 'ए (E)' }],
  },
  {
    num: 4, name: 'Rohini', nameHi: 'रोहिणी', symbol: 'Chariot/Ox cart', deity: 'Brahma', deityHi: 'ब्रह्मा',
    ruler: 'Moon', rulerHi: 'चन्द्र', nature: 'Fixed', natureHi: 'स्थिर', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Male Serpent',
    startDeg: 40, endDeg: 53.33, traits: ['Beautiful', 'Fertile', 'Artistic', 'Material'],
    description: 'The Moon\'s most beloved nakshatra. Rohini bestows beauty, charm, and abundance. It represents growth and material prosperity.',
    ppiSymbol: '🐂', ppiPadas: [{ sign: 'Taurus', letter: 'ओ (O)' }, { sign: 'Taurus', letter: 'वा (Va)' }, { sign: 'Taurus', letter: 'वी (Vi)' }, { sign: 'Taurus', letter: 'वू (Vu)' }],
  },
  {
    num: 5, name: 'Mrigashira', nameHi: 'मृगशिरा', symbol: 'Deer head', deity: 'Soma/Chandra', deityHi: 'सोम',
    ruler: 'Mars', rulerHi: 'मंगल', nature: 'Soft', natureHi: 'मृदु', gana: 'Deva', ganaHi: 'देव', animal: 'Female Serpent',
    startDeg: 53.33, endDeg: 66.67, traits: ['Searching', 'Curious', 'Gentle', 'Perceptive'],
    description: 'The searching star, symbolized by a deer constantly seeking. It represents the eternal quest for knowledge and truth.',
    ppiSymbol: '🦌', ppiPadas: [{ sign: 'Taurus', letter: 'वे (Ve)' }, { sign: 'Gemini', letter: 'वो (Vo)' }, { sign: 'Gemini', letter: 'का (Ka)' }, { sign: 'Gemini', letter: 'की (Ki)' }],
  },
  {
    num: 6, name: 'Ardra', nameHi: 'आर्द्रा', symbol: 'Teardrop/Diamond', deity: 'Rudra', deityHi: 'रुद्र',
    ruler: 'Rahu', rulerHi: 'राहु', nature: 'Sharp', natureHi: 'तीक्ष्ण', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Female Dog',
    startDeg: 66.67, endDeg: 80, traits: ['Stormy', 'Intellectual', 'Destructive', 'Renewing'],
    description: 'The star of storms and dissolution. Ardra brings the cleansing power of Rudra — destruction that paves the way for renewal.',
    ppiSymbol: '💧', ppiPadas: [{ sign: 'Gemini', letter: 'कू (Ku)' }, { sign: 'Gemini', letter: 'घ (Gha)' }, { sign: 'Gemini', letter: 'ङ (Nga)' }, { sign: 'Gemini', letter: 'छ (Chha)' }],
  },
  {
    num: 7, name: 'Punarvasu', nameHi: 'पुनर्वसु', symbol: 'Bow/Quiver', deity: 'Aditi', deityHi: 'अदिति',
    ruler: 'Jupiter', rulerHi: 'बृहस्पति', nature: 'Movable', natureHi: 'चर', gana: 'Deva', ganaHi: 'देव', animal: 'Female Cat',
    startDeg: 80, endDeg: 93.33, traits: ['Renewing', 'Abundant', 'Wise', 'Generous'],
    description: 'The star of renewal and return. Punarvasu brings the ability to regain what was lost and find abundance again. Associated with Mother Aditi.',
    ppiSymbol: '🏹', ppiPadas: [{ sign: 'Gemini', letter: 'के (Ke)' }, { sign: 'Cancer', letter: 'को (Ko)' }, { sign: 'Cancer', letter: 'हा (Ha)' }, { sign: 'Cancer', letter: 'ही (Hi)' }],
  },
  {
    num: 8, name: 'Pushya', nameHi: 'पुष्य', symbol: 'Lotus/Cow udder', deity: 'Brihaspati', deityHi: 'बृहस्पति',
    ruler: 'Saturn', rulerHi: 'शनि', nature: 'Light', natureHi: 'लघु', gana: 'Deva', ganaHi: 'देव', animal: 'Male Sheep',
    startDeg: 93.33, endDeg: 106.67, traits: ['Nourishing', 'Prosperous', 'Benevolent', 'Protective'],
    description: 'Considered the most auspicious nakshatra. Pushya nourishes and protects, bringing spiritual and material prosperity.',
    ppiSymbol: '🪷', ppiPadas: [{ sign: 'Cancer', letter: 'हू (Hu)' }, { sign: 'Cancer', letter: 'हे (He)' }, { sign: 'Cancer', letter: 'हो (Ho)' }, { sign: 'Cancer', letter: 'डा (Da)' }],
  },
  {
    num: 9, name: 'Ashlesha', nameHi: 'आश्लेषा', symbol: 'Coiled serpent', deity: 'Sarpa (Naga)', deityHi: 'सर्प',
    ruler: 'Mercury', rulerHi: 'बुध', nature: 'Sharp', natureHi: 'तीक्ष्ण', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Male Cat',
    startDeg: 106.67, endDeg: 120, traits: ['Mystical', 'Cunning', 'Intuitive', 'Hypnotic'],
    description: 'The embracing star with serpentine energy. Ashlesha grants deep intuition, mystical powers, and the ability to mesmerize.',
    ppiSymbol: '🐍', ppiPadas: [{ sign: 'Cancer', letter: 'डी (Di)' }, { sign: 'Cancer', letter: 'डू (Du)' }, { sign: 'Cancer', letter: 'डे (De)' }, { sign: 'Cancer', letter: 'डो (Do)' }],
  },
  {
    num: 10, name: 'Magha', nameHi: 'मघा', symbol: 'Royal throne', deity: 'Pitris (Ancestors)', deityHi: 'पितृ',
    ruler: 'Ketu', rulerHi: 'केतु', nature: 'Fierce', natureHi: 'उग्र', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Male Rat',
    startDeg: 120, endDeg: 133.33, traits: ['Royal', 'Ancestral', 'Authoritative', 'Traditional'],
    description: 'The royal star connected to ancestors and lineage. Magha bestows authority, power, and deep respect for tradition and heritage.',
    ppiSymbol: '👑', ppiPadas: [{ sign: 'Leo', letter: 'मा (Ma)' }, { sign: 'Leo', letter: 'मी (Mi)' }, { sign: 'Leo', letter: 'मू (Mu)' }, { sign: 'Leo', letter: 'मे (Me)' }],
  },
  {
    num: 11, name: 'Purva Phalguni', nameHi: 'पूर्वा फाल्गुनी', symbol: 'Front legs of bed', deity: 'Bhaga', deityHi: 'भग',
    ruler: 'Venus', rulerHi: 'शुक्र', nature: 'Fierce', natureHi: 'उग्र', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Female Rat',
    startDeg: 133.33, endDeg: 146.67, traits: ['Joyful', 'Creative', 'Romantic', 'Generous'],
    description: 'The star of happiness and relaxation. Purva Phalguni brings love, creativity, good fortune, and the ability to enjoy life\'s pleasures.',
    ppiSymbol: '🛏️', ppiPadas: [{ sign: 'Leo', letter: 'मो (Mo)' }, { sign: 'Leo', letter: 'टा (Ta)' }, { sign: 'Leo', letter: 'टी (Ti)' }, { sign: 'Leo', letter: 'टू (Tu)' }],
  },
  {
    num: 12, name: 'Uttara Phalguni', nameHi: 'उत्तरा फाल्गुनी', symbol: 'Back legs of bed', deity: 'Aryaman', deityHi: 'अर्यमन',
    ruler: 'Sun', rulerHi: 'सूर्य', nature: 'Fixed', natureHi: 'स्थिर', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Male Cow',
    startDeg: 146.67, endDeg: 160, traits: ['Helpful', 'Friendly', 'Loyal', 'Prosperous'],
    description: 'The star of patronage and friendship. Uttara Phalguni brings lasting partnerships, social connections, and steady prosperity.',
    ppiSymbol: '🤝', ppiPadas: [{ sign: 'Leo', letter: 'टे (Te)' }, { sign: 'Virgo', letter: 'टो (To)' }, { sign: 'Virgo', letter: 'पा (Pa)' }, { sign: 'Virgo', letter: 'पी (Pi)' }],
  },
  {
    num: 13, name: 'Hasta', nameHi: 'हस्त', symbol: 'Hand/Fist', deity: 'Savitar', deityHi: 'सवितार',
    ruler: 'Moon', rulerHi: 'चन्द्र', nature: 'Light', natureHi: 'लघु', gana: 'Deva', ganaHi: 'देव', animal: 'Female Buffalo',
    startDeg: 160, endDeg: 173.33, traits: ['Skilled', 'Witty', 'Resourceful', 'Dexterous'],
    description: 'The star of skill and craftsmanship. Hasta grants exceptional manual dexterity, wit, and the ability to manifest through action.',
    ppiSymbol: '✋', ppiPadas: [{ sign: 'Virgo', letter: 'पू (Pu)' }, { sign: 'Virgo', letter: 'ष (Sha)' }, { sign: 'Virgo', letter: 'ण (Na)' }, { sign: 'Virgo', letter: 'ठ (Tha)' }],
  },
  {
    num: 14, name: 'Chitra', nameHi: 'चित्रा', symbol: 'Bright jewel', deity: 'Tvashtar', deityHi: 'त्वष्टा',
    ruler: 'Mars', rulerHi: 'मंगल', nature: 'Soft', natureHi: 'मृदु', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Female Tiger',
    startDeg: 173.33, endDeg: 186.67, traits: ['Artistic', 'Brilliant', 'Elegant', 'Creative'],
    description: 'The star of brilliance and beauty. Chitra grants artistic talent, visual appeal, and the ability to create beautiful things.',
    ppiSymbol: '💎', ppiPadas: [{ sign: 'Virgo', letter: 'पे (Pe)' }, { sign: 'Libra', letter: 'पो (Po)' }, { sign: 'Libra', letter: 'रा (Ra)' }, { sign: 'Libra', letter: 'री (Ri)' }],
  },
  {
    num: 15, name: 'Swati', nameHi: 'स्वाती', symbol: 'Young shoot/Coral', deity: 'Vayu', deityHi: 'वायु',
    ruler: 'Rahu', rulerHi: 'राहु', nature: 'Movable', natureHi: 'चर', gana: 'Deva', ganaHi: 'देव', animal: 'Male Buffalo',
    startDeg: 186.67, endDeg: 200, traits: ['Independent', 'Flexible', 'Diplomatic', 'Scattered'],
    description: 'The self-going star ruled by Vayu (Wind). Swati grants independence, adaptability, and the ability to thrive in diverse environments.',
    ppiSymbol: '🌱', ppiPadas: [{ sign: 'Libra', letter: 'रू (Ru)' }, { sign: 'Libra', letter: 'रे (Re)' }, { sign: 'Libra', letter: 'रो (Ro)' }, { sign: 'Libra', letter: 'ता (Ta)' }],
  },
  {
    num: 16, name: 'Vishakha', nameHi: 'विशाखा', symbol: 'Triumphal arch', deity: 'Indra-Agni', deityHi: 'इन्द्राग्नि',
    ruler: 'Jupiter', rulerHi: 'बृहस्पति', nature: 'Mixed', natureHi: 'मिश्र', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Male Tiger',
    startDeg: 200, endDeg: 213.33, traits: ['Determined', 'Ambitious', 'Focused', 'Competitive'],
    description: 'The star of purpose. Vishakha grants unwavering determination and single-pointed focus towards achieving one\'s goals.',
    ppiSymbol: '🏛️', ppiPadas: [{ sign: 'Libra', letter: 'ती (Ti)' }, { sign: 'Scorpio', letter: 'तू (Tu)' }, { sign: 'Scorpio', letter: 'ते (Te)' }, { sign: 'Scorpio', letter: 'तो (To)' }],
  },
  {
    num: 17, name: 'Anuradha', nameHi: 'अनुराधा', symbol: 'Lotus/Archway', deity: 'Mitra', deityHi: 'मित्र',
    ruler: 'Saturn', rulerHi: 'शनि', nature: 'Soft', natureHi: 'मृदु', gana: 'Deva', ganaHi: 'देव', animal: 'Female Hare',
    startDeg: 213.33, endDeg: 226.67, traits: ['Devoted', 'Friendly', 'Successful', 'Disciplined'],
    description: 'The star of devotion and friendship. Anuradha grants the ability to form deep bonds, travel successfully, and lead organizations.',
    ppiSymbol: '🪷', ppiPadas: [{ sign: 'Scorpio', letter: 'ना (Na)' }, { sign: 'Scorpio', letter: 'नी (Ni)' }, { sign: 'Scorpio', letter: 'नू (Nu)' }, { sign: 'Scorpio', letter: 'ने (Ne)' }],
  },
  {
    num: 18, name: 'Jyeshtha', nameHi: 'ज्येष्ठा', symbol: 'Earring/Umbrella', deity: 'Indra', deityHi: 'इन्द्र',
    ruler: 'Mercury', rulerHi: 'बुध', nature: 'Sharp', natureHi: 'तीक्ष्ण', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Male Hare',
    startDeg: 226.67, endDeg: 240, traits: ['Protective', 'Senior', 'Resourceful', 'Warrior'],
    description: 'The eldest star associated with Indra, king of gods. Jyeshtha grants seniority, protective power, and the ability to overcome adversaries.',
    ppiSymbol: '⚡', ppiPadas: [{ sign: 'Scorpio', letter: 'नो (No)' }, { sign: 'Scorpio', letter: 'या (Ya)' }, { sign: 'Scorpio', letter: 'यी (Yi)' }, { sign: 'Scorpio', letter: 'यू (Yu)' }],
  },
  {
    num: 19, name: 'Mula', nameHi: 'मूल', symbol: 'Root/Tied bunch', deity: 'Nirriti', deityHi: 'निऋति',
    ruler: 'Ketu', rulerHi: 'केतु', nature: 'Sharp', natureHi: 'तीक्ष्ण', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Male Dog',
    startDeg: 240, endDeg: 253.33, traits: ['Investigative', 'Destructive', 'Philosophical', 'Deep'],
    description: 'The root star that gets to the bottom of things. Mula uproots what is false and helps discover fundamental truths and spiritual insights.',
    ppiSymbol: '🌿', ppiPadas: [{ sign: 'Sagittarius', letter: 'ये (Ye)' }, { sign: 'Sagittarius', letter: 'यो (Yo)' }, { sign: 'Sagittarius', letter: 'भा (Bha)' }, { sign: 'Sagittarius', letter: 'भी (Bhi)' }],
  },
  {
    num: 20, name: 'Purva Ashadha', nameHi: 'पूर्वाषाढ़ा', symbol: 'Elephant tusk/Fan', deity: 'Apas (Water)', deityHi: 'अपस्',
    ruler: 'Venus', rulerHi: 'शुक्र', nature: 'Fierce', natureHi: 'उग्र', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Male Monkey',
    startDeg: 253.33, endDeg: 266.67, traits: ['Invincible', 'Purifying', 'Revitalizing', 'Confident'],
    description: 'The invincible star. Purva Ashadha grants the energy of invincibility, the power of purification through water, and unshakeable confidence.',
    ppiSymbol: '🐘', ppiPadas: [{ sign: 'Sagittarius', letter: 'भू (Bhu)' }, { sign: 'Sagittarius', letter: 'धा (Dha)' }, { sign: 'Sagittarius', letter: 'फा (Pha)' }, { sign: 'Sagittarius', letter: 'ढा (Dha)' }],
  },
  {
    num: 21, name: 'Uttara Ashadha', nameHi: 'उत्तराषाढ़ा', symbol: 'Elephant tusk/Small bed', deity: 'Vishvadevas', deityHi: 'विश्वदेव',
    ruler: 'Sun', rulerHi: 'सूर्य', nature: 'Fixed', natureHi: 'स्थिर', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Male Mongoose',
    startDeg: 266.67, endDeg: 280, traits: ['Leadership', 'Virtuous', 'Enduring', 'Victorious'],
    description: 'The universal star of final victory. Uttara Ashadha grants lasting achievement, leadership, and the ability to bring people together.',
    ppiSymbol: '🏆', ppiPadas: [{ sign: 'Sagittarius', letter: 'भे (Bhe)' }, { sign: 'Capricorn', letter: 'भो (Bho)' }, { sign: 'Capricorn', letter: 'जा (Ja)' }, { sign: 'Capricorn', letter: 'जी (Ji)' }],
  },
  {
    num: 22, name: 'Shravana', nameHi: 'श्रवण', symbol: 'Three footprints/Ear', deity: 'Vishnu', deityHi: 'विष्णु',
    ruler: 'Moon', rulerHi: 'चन्द्र', nature: 'Movable', natureHi: 'चर', gana: 'Deva', ganaHi: 'देव', animal: 'Female Monkey',
    startDeg: 280, endDeg: 293.33, traits: ['Listening', 'Learning', 'Connected', 'Scholarly'],
    description: 'The star of listening and learning. Shravana grants wisdom through careful listening, connections, and the preservation of knowledge.',
    ppiSymbol: '👂', ppiPadas: [{ sign: 'Capricorn', letter: 'खी (Khi)' }, { sign: 'Capricorn', letter: 'खू (Khu)' }, { sign: 'Capricorn', letter: 'खे (Khe)' }, { sign: 'Capricorn', letter: 'खो (Kho)' }],
  },
  {
    num: 23, name: 'Dhanishtha', nameHi: 'धनिष्ठा', symbol: 'Drum/Flute', deity: 'Vasus', deityHi: 'वसु',
    ruler: 'Mars', rulerHi: 'मंगल', nature: 'Movable', natureHi: 'चर', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Female Lion',
    startDeg: 293.33, endDeg: 306.67, traits: ['Musical', 'Wealthy', 'Generous', 'Rhythmic'],
    description: 'The star of symphony and wealth. Dhanishtha bestows musical talent, abundance, and the ability to keep rhythm in all aspects of life.',
    ppiSymbol: '🥁', ppiPadas: [{ sign: 'Capricorn', letter: 'गा (Ga)' }, { sign: 'Aquarius', letter: 'गी (Gi)' }, { sign: 'Aquarius', letter: 'गू (Gu)' }, { sign: 'Aquarius', letter: 'गे (Ge)' }],
  },
  {
    num: 24, name: 'Shatabhisha', nameHi: 'शतभिषा', symbol: 'Empty circle/1000 flowers', deity: 'Varuna', deityHi: 'वरुण',
    ruler: 'Rahu', rulerHi: 'राहु', nature: 'Movable', natureHi: 'चर', gana: 'Rakshasa', ganaHi: 'राक्षस', animal: 'Female Horse',
    startDeg: 306.67, endDeg: 320, traits: ['Healing', 'Secretive', 'Truthful', 'Independent'],
    description: 'The hundred healers star. Shatabhisha grants healing powers, the ability to uncover hidden truths, and protection through secrecy.',
    ppiSymbol: '⭕', ppiPadas: [{ sign: 'Aquarius', letter: 'गो (Go)' }, { sign: 'Aquarius', letter: 'सा (Sa)' }, { sign: 'Aquarius', letter: 'सी (Si)' }, { sign: 'Aquarius', letter: 'सू (Su)' }],
  },
  {
    num: 25, name: 'Purva Bhadrapada', nameHi: 'पूर्वा भाद्रपद', symbol: 'Front of funeral cot', deity: 'Aja Ekapada', deityHi: 'अजैकपाद',
    ruler: 'Jupiter', rulerHi: 'बृहस्पति', nature: 'Fierce', natureHi: 'उग्र', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Male Lion',
    startDeg: 320, endDeg: 333.33, traits: ['Passionate', 'Transformative', 'Philosophical', 'Extreme'],
    description: 'The scorching star of purification. Purva Bhadrapada brings intense transformation, philosophical depth, and the courage to face extremes.',
    ppiSymbol: '🌋', ppiPadas: [{ sign: 'Aquarius', letter: 'से (Se)' }, { sign: 'Aquarius', letter: 'सो (So)' }, { sign: 'Pisces', letter: 'दा (Da)' }, { sign: 'Pisces', letter: 'दी (Di)' }],
  },
  {
    num: 26, name: 'Uttara Bhadrapada', nameHi: 'उत्तरा भाद्रपद', symbol: 'Back of funeral cot', deity: 'Ahir Budhnya', deityHi: 'अहिर्बुध्न्य',
    ruler: 'Saturn', rulerHi: 'शनि', nature: 'Fixed', natureHi: 'स्थिर', gana: 'Manushya', ganaHi: 'मनुष्य', animal: 'Female Cow',
    startDeg: 333.33, endDeg: 346.67, traits: ['Wise', 'Controlled', 'Deep', 'Selfless'],
    description: 'The warrior star of the deep. Uttara Bhadrapada brings wisdom through self-control, deep meditation, and selfless service to humanity.',
    ppiSymbol: '🧘', ppiPadas: [{ sign: 'Pisces', letter: 'दू (Du)' }, { sign: 'Pisces', letter: 'थ (Tha)' }, { sign: 'Pisces', letter: 'झ (Jha)' }, { sign: 'Pisces', letter: 'ञ (Jna)' }],
  },
  {
    num: 27, name: 'Revati', nameHi: 'रेवती', symbol: 'Fish/Drum', deity: 'Pushan', deityHi: 'पूषन',
    ruler: 'Mercury', rulerHi: 'बुध', nature: 'Soft', natureHi: 'मृदु', gana: 'Deva', ganaHi: 'देव', animal: 'Female Elephant',
    startDeg: 346.67, endDeg: 360, traits: ['Nurturing', 'Prosperous', 'Safe', 'Protective'],
    description: 'The final nakshatra completing the zodiac. Revati brings safe journeys, nourishment, prosperity, and the gentle completion of cycles.',
    ppiSymbol: '🐟', ppiPadas: [{ sign: 'Pisces', letter: 'दे (De)' }, { sign: 'Pisces', letter: 'दो (Do)' }, { sign: 'Pisces', letter: 'चा (Cha)' }, { sign: 'Pisces', letter: 'ची (Chi)' }],
  },
];

export function NakshatraPage() {
  const [selected, setSelected] = useState(0);
  const n = NAKSHATRAS[selected]!;

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>27 Nakshatras · सत्ताईस नक्षत्र</h1>
          <p className={styles.subtitle}>Lunar mansions — the celestial framework of Vedic astrology</p>
        </div>

        {/* Detail panel */}
        <div className={styles.detail}>
          <div className={styles.detailHeader}>
            <div className={styles.detailIcon}>{n.ppiSymbol}</div>
            <div>
              <div className={styles.detailName}>{n.name}</div>
              <div className={styles.detailNameHi}>{n.nameHi}</div>
              <div className={styles.detailNum}>Nakshatra #{n.num} · {n.startDeg.toFixed(2)}° – {n.endDeg.toFixed(2)}°</div>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Deity</div>
              <div className={styles.infoValue}>{n.deity}</div>
              <div className={styles.infoValueHi}>{n.deityHi}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Ruling Planet</div>
              <div className={styles.infoValue}>{n.ruler}</div>
              <div className={styles.infoValueHi}>{n.rulerHi}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Nature</div>
              <div className={styles.infoValue}>{n.nature}</div>
              <div className={styles.infoValueHi}>{n.natureHi}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Gana</div>
              <div className={styles.infoValue}>{n.gana}</div>
              <div className={styles.infoValueHi}>{n.ganaHi}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Symbol</div>
              <div className={styles.infoValue}>{n.symbol}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Yoni Animal</div>
              <div className={styles.infoValue}>{n.animal}</div>
            </div>
          </div>

          <div className={styles.descSection}>
            <div className={styles.descTitle}>About</div>
            <div className={styles.descText}>{n.description}</div>
            <div className={styles.traits}>
              {n.traits.map((t) => (
                <span key={t} className={styles.trait}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.descSection}>
            <div className={styles.descTitle}>Padas (Quarters)</div>
            <div className={styles.padaGrid}>
              {n.ppiPadas.map((p, i) => (
                <div key={i} className={styles.pada}>
                  <div className={styles.padaNum}>Pada {i + 1}</div>
                  <div className={styles.padaSign}>{p.sign}</div>
                  <div className={styles.padaLetter}>{p.letter}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid of all 27 */}
        <div className={styles.grid}>
          {NAKSHATRAS.map((nk, i) => (
            <div
              key={nk.num}
              className={`${styles.card} ${i === selected ? styles.cardActive : ''}`}
              onClick={() => setSelected(i)}
            >
              <div className={styles.cardNum}>#{nk.num} · {nk.ruler}</div>
              <div className={styles.cardName}>{nk.ppiSymbol} {nk.name}</div>
              <div className={styles.cardNameHi}>{nk.nameHi}</div>
              <div className={styles.cardSymbol}>{nk.symbol}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

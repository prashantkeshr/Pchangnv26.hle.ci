import { useState } from 'react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import {
  Menu, X, Sun, Moon, MapPin, ChevronDown,
  Calendar, Star, Clock, BookOpen, Search, Settings,
  Sunrise, MoonStar, Telescope, Heart, CalendarHeart, GraduationCap,
  UserCircle, Globe, Sparkles, CircleDot, Landmark, CookingPot,
  Flower2, CalendarRange
} from 'lucide-react';
import { CelestialIcon } from '@/components/icons/CelestialIcon';
import { useTheme } from '@/context/ThemeContext';
import { useLocation } from '@/context/LocationContext';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Star },
  { path: '/panchang', label: 'Panchang', icon: Sunrise },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/festivals', label: 'Festivals', icon: Heart },
  { path: '/muhurat', label: 'Muhurat', icon: Clock },
  { path: '/astronomy', label: 'Astronomy', icon: Telescope },
  { path: '/devotional', label: 'Devotional', icon: BookOpen },
  { path: '/horoscope', label: 'Horoscope', icon: MoonStar },
  { path: '/vrat', label: 'Vrat', icon: CalendarHeart },
  { path: '/knowledge', label: 'Knowledge', icon: GraduationCap },
  { path: '/personal', label: 'My Calendar', icon: UserCircle },
  { path: '/regional', label: 'Regional', icon: Globe },
  { path: '/nakshatra', label: 'Nakshatra', icon: Sparkles },
  { path: '/kundli', label: 'Kundli', icon: CircleDot },
  { path: '/temples', label: 'Temples', icon: Landmark },
  { path: '/recipes', label: 'Recipes', icon: CookingPot },
  { path: '/yoga', label: 'Yoga', icon: Flower2 },
  { path: '/samvat', label: 'Samvat', icon: CalendarRange },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const { setTheme, resolved } = useTheme();
  const { location, setLocation, cities } = useLocation();
  const routerLocation = useRouterLocation();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <CelestialIcon size={28} />
          <span className={styles.brandName}>Panchang</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${routerLocation.pathname === item.path ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.locationWrapper}>
            <button
              className={styles.locationBtn}
              onClick={() => setLocationOpen(!locationOpen)}
              aria-label="Change location"
            >
              <MapPin size={15} />
              <span className={styles.locationName}>{location.name}</span>
              <ChevronDown size={14} />
            </button>
            {locationOpen && (
              <div className={styles.locationDropdown}>
                <div className={styles.dropdownHeader}>Select Location</div>
                <div className={styles.cityList}>
                  {cities.map((city) => (
                    <button
                      key={city.name}
                      className={`${styles.cityBtn} ${city.name === location.name ? styles.cityActive : ''}`}
                      onClick={() => { setLocation(city); setLocationOpen(false); }}
                    >
                      <span>{city.name}</span>
                      <span className={styles.cityState}>{city.state}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            className={styles.themeBtn}
            onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} theme`}
          >
            {resolved === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to="/search" className={styles.searchBtn} aria-label="Search">
            <Search size={18} />
          </Link>

          <Link to="/settings" className={styles.settingsBtn} aria-label="Settings">
            <Settings size={18} />
          </Link>

          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {locationOpen && <div className={styles.backdrop} onClick={() => setLocationOpen(false)} />}
    </header>
  );
}

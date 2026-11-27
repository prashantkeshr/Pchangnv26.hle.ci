import { Sun, Moon, Monitor, MapPin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLocation, CITIES } from '@/context/LocationContext';
import { Card } from '@/components/common/Card';
import styles from './SettingsPage.module.css';
import type { ThemeMode } from '@/types';

const THEME_OPTIONS: Array<{ value: ThemeMode; label: string; labelHi: string; icon: typeof Sun }> = [
  { value: 'light', label: 'Light', labelHi: 'उजाला', icon: Sun },
  { value: 'dark', label: 'Dark', labelHi: 'अंधेरा', icon: Moon },
  { value: 'system', label: 'System', labelHi: 'सिस्टम', icon: Monitor },
];

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { location, setLocation } = useLocation();

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Settings · सेटिंग्स</h1>
          <p className={styles.subtitle}>Customize your Panchang experience</p>
        </div>

        <div className={styles.sections}>
          <Card title="Theme" titleHi="थीम">
            <div className={styles.themeGrid}>
              {THEME_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    className={`${styles.themeBtn} ${theme === opt.value ? styles.themeActive : ''}`}
                    onClick={() => setTheme(opt.value)}
                  >
                    <Icon size={20} />
                    <span className={styles.themeLabel}>{opt.label}</span>
                    <span className={styles.themeLabelHi}>{opt.labelHi}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card title="Location" titleHi="स्थान">
            <div className={styles.locationInfo}>
              <div className={styles.currentLocation}>
                <MapPin size={16} />
                <div>
                  <div className={styles.locName}>{location.name}, {location.state}</div>
                  <div className={styles.locCoords}>
                    {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E · {location.tz}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cityGrid}>
              {CITIES.map((city) => (
                <button
                  key={city.name}
                  className={`${styles.cityBtn} ${location.name === city.name ? styles.cityActive : ''}`}
                  onClick={() => setLocation(city)}
                >
                  <span className={styles.cityName}>{city.name}</span>
                  <span className={styles.cityState}>{city.state}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="About" titleHi="जानकारी">
            <div className={styles.about}>
              <h3 className={styles.aboutTitle}>Panchang · पंचांग</h3>
              <p className={styles.aboutText}>
                A comprehensive Indian Panchang, Calendar, and Celestial Intelligence Platform.
                All astronomical calculations are performed locally in your browser using the
                astronomy-engine library. No data is sent to any server.
              </p>
              <div className={styles.aboutMeta}>
                <div className={styles.aboutRow}>
                  <span>Ayanamsa</span>
                  <span>Lahiri (~24.11°)</span>
                </div>
                <div className={styles.aboutRow}>
                  <span>Calculation</span>
                  <span>Client-side (astronomy-engine)</span>
                </div>
                <div className={styles.aboutRow}>
                  <span>Storage</span>
                  <span>localStorage only (browser-local)</span>
                </div>
                <div className={styles.aboutRow}>
                  <span>Privacy</span>
                  <span>No tracking, no analytics, no cookies</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

import { CelestialIcon } from '@/components/icons/CelestialIcon';
import { LotusFlower } from '@/components/decorative/SacredGeometry';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.sacredDivider}>
        <span className={styles.dividerLine} />
        <LotusFlower size={40} opacity={0.3} />
        <span className={styles.dividerLine} />
      </div>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <CelestialIcon size={22} />
          <span className={styles.brandName}>Panchang</span>
        </div>
        <p className={styles.tagline}>
          Indian Calendar, Panchang & Celestial Intelligence
        </p>
        <p className={styles.taglineHi}>
          भारतीय पंचांग एवं खगोलीय बुद्धिमत्ता
        </p>
        <div className={styles.links}>
          <span className={styles.link}>About</span>
          <span className={styles.sep}>·</span>
          <span className={styles.link}>Privacy</span>
          <span className={styles.sep}>·</span>
          <span className={styles.link}>Calculations</span>
          <span className={styles.sep}>·</span>
          <span className={styles.link}>Data Sources</span>
        </div>
        <p className={styles.disclaimer}>
          Astronomical calculations are approximate. Festival dates may vary by region and tradition.
          This platform does not provide medical, financial, or legal advice.
        </p>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Panchang. All astronomical data calculated client-side.
          No personal data is transmitted to any server.
        </p>
      </div>
    </footer>
  );
}

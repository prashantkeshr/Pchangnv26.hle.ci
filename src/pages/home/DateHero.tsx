import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useDate } from '@/context/DateContext';
import { useLocation } from '@/context/LocationContext';
import { formatDateLong, getDayName, getGreetingTime } from '@/utils/format';
import type { PanchangData } from '@/types';
import styles from './DateHero.module.css';

interface Props {
  panchang: PanchangData;
}

const GREETINGS: Record<string, [string, string]> = {
  morning: ['Good Morning', 'शुभ प्रभात'],
  afternoon: ['Good Afternoon', 'शुभ दोपहर'],
  evening: ['Good Evening', 'शुभ संध्या'],
  night: ['Good Night', 'शुभ रात्रि'],
};

export function DateHero({ panchang }: Props) {
  const { selectedDate, goToPrevDay, goToNextDay, goToToday, isToday, setSelectedDate } = useDate();
  const { location } = useLocation();
  const greeting = GREETINGS[getGreetingTime()]!;

  return (
    <section className={styles.hero}>
      <div className={styles.top}>
        <div className={styles.greeting}>
          <h1 className={styles.greetingText}>{greeting[0]}</h1>
          <span className={styles.greetingHi}>{greeting[1]}</span>
        </div>
        <div className={styles.location}>
          {location.name}, {location.state}
        </div>
      </div>

      <div className={styles.dateRow}>
        <button onClick={goToPrevDay} className={styles.navBtn} aria-label="Previous day">
          <ChevronLeft size={20} />
        </button>

        <div className={styles.dateCenter}>
          <div className={styles.dayName}>{getDayName(selectedDate)}</div>
          <div className={styles.dateNum}>{selectedDate.getDate()}</div>
          <div className={styles.dateFull}>{formatDateLong(selectedDate)}</div>
          <div className={styles.samvat}>
            <span>विक्रम संवत {panchang.vikramSamvat}</span>
            <span className={styles.dot}>·</span>
            <span>शक संवत {panchang.shakaSamvat}</span>
          </div>
          <div className={styles.masa}>
            {panchang.masa} · {panchang.masaHi}
          </div>
        </div>

        <button onClick={goToNextDay} className={styles.navBtn} aria-label="Next day">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className={styles.actions}>
        {!isToday && (
          <button onClick={goToToday} className={styles.todayBtn}>
            <CalendarDays size={14} />
            Today
          </button>
        )}
        <input
          type="date"
          className={styles.datePicker}
          value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`}
          onChange={(e) => {
            const d = new Date(e.target.value + 'T00:00:00');
            if (!isNaN(d.getTime())) setSelectedDate(d);
          }}
          aria-label="Select date"
        />
      </div>

      <div className={styles.quickInfo}>
        <span className={styles.quickItem}>
          <span className={styles.quickLabel}>{panchang.vaarHi}</span>
        </span>
        <span className={styles.quickItem}>
          <span className={styles.quickLabel}>तिथि</span>
          <span>{panchang.tithi.nameHi}</span>
        </span>
        <span className={styles.quickItem}>
          <span className={styles.quickLabel}>नक्षत्र</span>
          <span>{panchang.nakshatra.nameHi}</span>
        </span>
        <span className={styles.quickItem}>
          <span className={styles.quickLabel}>पक्ष</span>
          <span>{panchang.paksha === 'Shukla' ? 'शुक्ल' : 'कृष्ण'}</span>
        </span>
      </div>
    </section>
  );
}

import { Heart } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { getFestivalsForDate, getUpcomingFestivals } from '@/data/festivals';
import type { Festival } from '@/types';
import styles from './FestivalPanel.module.css';

function getRelevantFestivals(date: Date): Festival[] {
  const today = getFestivalsForDate(date);
  if (today.length > 0) return today;
  return getUpcomingFestivals(date, 3);
}

interface Props {
  date: Date;
}

export function FestivalPanel({ date }: Props) {
  const festivals = getRelevantFestivals(date);
  const dateStr = date.toISOString().split('T')[0];
  const isToday = festivals.length > 0 && festivals[0]!.date === dateStr;

  return (
    <Card
      title={isToday ? "Today's Festivals" : 'Upcoming Festivals'}
      titleHi={isToday ? 'आज के त्यौहार' : 'आगामी त्यौहार'}
      icon={<Heart size={16} />}
    >
      {festivals.length === 0 ? (
        <p className={styles.empty}>No festivals found for this date.</p>
      ) : (
        <div className={styles.list}>
          {festivals.map((f) => (
            <div key={f.id} className={styles.item}>
              <div className={`${styles.badge} ${styles[f.type] ?? ''}`}>
                {f.type === 'hindu' ? '🕉' : f.type === 'national' ? '🇮🇳' : f.type === 'sikh' ? '☬' : f.type === 'buddhist' ? '☸' : f.type === 'christian' ? '✝' : '◆'}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{f.name}</div>
                <div className={styles.nameHi}>{f.nameHi}</div>
                <div className={styles.desc}>{f.description}</div>
                {!isToday && (
                  <div className={styles.date}>
                    {new Date(f.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

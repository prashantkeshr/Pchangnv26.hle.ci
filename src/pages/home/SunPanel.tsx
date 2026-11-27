import { Sunrise, Sunset } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { formatTime, formatDuration } from '@/utils/format';
import type { SunData } from '@/types';
import styles from './SunPanel.module.css';

interface Props {
  data: SunData;
}

export function SunPanel({ data }: Props) {
  const progress = (() => {
    if (!data.sunrise || !data.sunset) return 0;
    const now = Date.now();
    const start = data.sunrise.getTime();
    const end = data.sunset.getTime();
    if (now < start) return 0;
    if (now > end) return 1;
    return (now - start) / (end - start);
  })();

  return (
    <Card title="Sun" titleHi="सूर्य" icon={<Sunrise size={16} />}>
      <div className={styles.sunArc}>
        <svg viewBox="0 0 200 110" className={styles.arcSvg}>
          <path
            d="M 10 100 Q 100 -10 190 100"
            fill="none"
            stroke="var(--border-primary)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 10 100 Q 100 -10 190 100"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="2.5"
            strokeDasharray={`${progress * 290} 290`}
          />
          {progress > 0 && progress < 1 && (
            <circle
              cx={10 + progress * 180}
              cy={100 - Math.sin(progress * Math.PI) * 110}
              r="6"
              fill="var(--accent-primary)"
            />
          )}
          <line x1="10" y1="100" x2="190" y2="100" stroke="var(--border-primary)" strokeWidth="1" />
        </svg>
      </div>

      <div className={styles.times}>
        <div className={styles.timeItem}>
          <Sunrise size={14} className={styles.riseIcon} />
          <div>
            <div className={styles.timeLabel}>Sunrise</div>
            <div className={styles.timeValue}>{formatTime(data.sunrise)}</div>
          </div>
        </div>
        <div className={styles.timeItem}>
          <Sunset size={14} className={styles.setIcon} />
          <div>
            <div className={styles.timeLabel}>Sunset</div>
            <div className={styles.timeValue}>{formatTime(data.sunset)}</div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Solar Noon</span>
          <span className={styles.detailValue}>{formatTime(data.solarNoon)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Day Duration</span>
          <span className={styles.detailValue}>{formatDuration(data.dayDuration)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Dawn</span>
          <span className={styles.detailValue}>{formatTime(data.dawn)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Dusk</span>
          <span className={styles.detailValue}>{formatTime(data.dusk)}</span>
        </div>
      </div>
    </Card>
  );
}

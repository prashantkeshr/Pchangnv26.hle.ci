import { MoonStar } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { MoonPhaseIcon } from '@/components/icons/MoonPhaseIcon';
import { formatTime, formatDateShort } from '@/utils/format';
import type { MoonData } from '@/types';
import styles from './MoonPanel.module.css';

interface Props {
  data: MoonData;
}

export function MoonPanel({ data }: Props) {
  return (
    <Card title="Moon" titleHi="चंद्रमा" icon={<MoonStar size={16} />}>
      <div className={styles.phaseDisplay}>
        <MoonPhaseIcon phase={data.phase} size={72} />
        <div className={styles.phaseInfo}>
          <div className={styles.phaseName}>{data.phaseName}</div>
          <div className={styles.illumination}>{data.illumination.toFixed(1)}% illuminated</div>
          <div className={styles.age}>Moon age: {data.age.toFixed(1)} days</div>
        </div>
      </div>

      <div className={styles.times}>
        <div className={styles.timeItem}>
          <span className={styles.timeLabel}>Moonrise</span>
          <span className={styles.timeValue}>{formatTime(data.moonrise)}</span>
        </div>
        <div className={styles.timeItem}>
          <span className={styles.timeLabel}>Moonset</span>
          <span className={styles.timeValue}>{formatTime(data.moonset)}</span>
        </div>
      </div>

      <div className={styles.upcoming}>
        {data.nextFullMoon && (
          <div className={styles.upcomingItem}>
            <span className={styles.upcomingLabel}>Next Full Moon</span>
            <span className={styles.upcomingValue}>{formatDateShort(data.nextFullMoon)}</span>
          </div>
        )}
        {data.nextNewMoon && (
          <div className={styles.upcomingItem}>
            <span className={styles.upcomingLabel}>Next New Moon</span>
            <span className={styles.upcomingValue}>{formatDateShort(data.nextNewMoon)}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

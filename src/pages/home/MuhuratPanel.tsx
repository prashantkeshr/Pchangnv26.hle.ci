import { Clock } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { formatTimeRange } from '@/utils/format';
import type { MuhuratWindow } from '@/types';
import styles from './MuhuratPanel.module.css';

interface Props {
  muhurats: MuhuratWindow[];
}

export function MuhuratPanel({ muhurats }: Props) {
  if (muhurats.length === 0) {
    return (
      <Card title="Muhurat" titleHi="मुहूर्त" icon={<Clock size={16} />}>
        <p className={styles.empty}>Muhurat timings require sunrise and sunset data.</p>
      </Card>
    );
  }

  return (
    <Card title="Muhurat" titleHi="मुहूर्त" icon={<Clock size={16} />}>
      <div className={styles.list}>
        {muhurats.map((m, i) => {
          const now = Date.now();
          const isActive = now >= m.start.getTime() && now <= m.end.getTime();

          return (
            <div
              key={i}
              className={`${styles.item} ${styles[m.type]} ${isActive ? styles.active : ''}`}
            >
              <div className={styles.indicator} />
              <div className={styles.content}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>{m.name}</span>
                  <span className={styles.nameHi}>{m.nameHi}</span>
                </div>
                <div className={styles.time}>{formatTimeRange(m.start, m.end)}</div>
                {isActive && <span className={styles.activeBadge}>Now</span>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

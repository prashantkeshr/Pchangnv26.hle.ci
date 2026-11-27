import { BookOpen } from 'lucide-react';
import { Card } from '@/components/common/Card';
import type { PanchangData } from '@/types';
import styles from './PanchangPanel.module.css';

interface Props {
  panchang: PanchangData;
}

export function PanchangPanel({ panchang }: Props) {
  const rows = [
    { label: 'Tithi', labelHi: 'तिथि', value: panchang.tithi.name, valueHi: panchang.tithi.nameHi },
    { label: 'Nakshatra', labelHi: 'नक्षत्र', value: `${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})`, valueHi: panchang.nakshatra.nameHi },
    { label: 'Yoga', labelHi: 'योग', value: panchang.yoga.name, valueHi: panchang.yoga.nameHi },
    { label: 'Karana', labelHi: 'करण', value: panchang.karana.name, valueHi: panchang.karana.nameHi },
    { label: 'Paksha', labelHi: 'पक्ष', value: panchang.paksha, valueHi: panchang.paksha === 'Shukla' ? 'शुक्ल' : 'कृष्ण' },
    { label: 'Chandra Rashi', labelHi: 'चंद्र राशि', value: panchang.chandraRashi },
    { label: 'Surya Rashi', labelHi: 'सूर्य राशि', value: panchang.suryaRashi },
  ];

  return (
    <Card title="Panchang" titleHi="पंचांग" icon={<BookOpen size={16} />}>
      <div className={styles.list}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <div className={styles.labelCol}>
              <span className={styles.label}>{row.label}</span>
              <span className={styles.labelHi}>{row.labelHi}</span>
            </div>
            <div className={styles.valueCol}>
              <span className={styles.value}>{row.value}</span>
              {row.valueHi && <span className={styles.valueHi}>{row.valueHi}</span>}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

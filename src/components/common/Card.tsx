import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface Props {
  title?: string;
  titleHi?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function Card({ title, titleHi, icon, children, className, compact }: Props) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ''} ${className ?? ''}`}>
      {title && (
        <div className={styles.header}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <div>
            <h3 className={styles.title}>{title}</h3>
            {titleHi && <span className={styles.titleHi}>{titleHi}</span>}
          </div>
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  );
}

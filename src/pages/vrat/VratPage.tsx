import { useState, useMemo } from 'react';
import { CalendarHeart } from 'lucide-react';
import { VRATS, VRAT_DATES_2026, VRAT_TYPE_COLORS, VRAT_TYPE_LABELS, getUpcomingVrats, getVratById } from '@/data/vrat';
import styles from './VratPage.module.css';

export function VratPage() {
  const [selectedVratId, setSelectedVratId] = useState(VRATS[0]!.id);
  const selectedVrat = VRATS.find((v) => v.id === selectedVratId) ?? VRATS[0]!;

  const upcoming = useMemo(() => getUpcomingVrats(new Date(), 15), []);
  const nextVrat = upcoming[0];

  const vratCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const v of VRAT_DATES_2026) {
      counts[v.vratId] = (counts[v.vratId] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Vrat & Upvas · व्रत और उपवास</h1>
          <p className={styles.subtitle}>Fasting calendar, rules, and spiritual significance</p>
        </div>

        {nextVrat && (() => {
          const vrat = getVratById(nextVrat.vratId);
          const d = new Date(nextVrat.date + 'T00:00:00');
          const diff = Math.ceil((d.getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000);
          return (
            <div className={styles.upcomingBanner}>
              <div className={styles.bannerIcon}>
                <CalendarHeart size={20} />
              </div>
              <div className={styles.bannerContent}>
                <div className={styles.bannerLabel}>Next Vrat</div>
                <div className={styles.bannerTitle}>
                  {nextVrat.special ?? vrat?.name ?? nextVrat.vratId} — {nextVrat.month} {nextVrat.paksha} Paksha
                </div>
                <div className={styles.bannerDate}>
                  {d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  {diff === 0 ? ' (Today!)' : diff === 1 ? ' (Tomorrow)' : ` (in ${diff} days)`}
                </div>
              </div>
            </div>
          );
        })()}

        <div className={styles.tabs}>
          {VRATS.map((v) => (
            <button
              key={v.id}
              className={`${styles.tab} ${selectedVratId === v.id ? styles.tabActive : ''}`}
              onClick={() => setSelectedVratId(v.id)}
            >
              <span>{v.name}</span>
              <span className={styles.tabBadge} style={{ background: VRAT_TYPE_COLORS[v.type] }}>
                {vratCounts[v.id] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.layout}>
          {/* Detail panel */}
          <div className={styles.vratDetail}>
            <div className={styles.vratHeader}>
              <div className={styles.vratDot} style={{ background: VRAT_TYPE_COLORS[selectedVrat.type] }} />
              <div>
                <div className={styles.vratName}>{selectedVrat.name}</div>
                <div className={styles.vratNameHi}>{selectedVrat.nameHi}</div>
                <div className={styles.vratMeta}>
                  {selectedVrat.deity} · {selectedVrat.deityHi} · {selectedVrat.frequency}
                </div>
              </div>
            </div>

            <p className={styles.vratDesc}>{selectedVrat.description}</p>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Rules & Guidelines (Niyam)</div>
              <ol className={styles.rulesList}>
                {selectedVrat.rules.map((r, i) => (
                  <li key={i} className={styles.rule}><span>{r}</span></li>
                ))}
              </ol>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Food Guidelines</div>
              <div className={styles.foodGrid}>
                <div className={styles.foodCol}>
                  <div className={styles.sectionTitle} style={{ color: '#27ae60' }}>Allowed</div>
                  <div className={styles.foodChips}>
                    {selectedVrat.foodAllowed.map((f) => (
                      <span key={f} className={styles.foodAllowed}>{f}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.foodCol}>
                  <div className={styles.sectionTitle} style={{ color: '#e74c3c' }}>Prohibited</div>
                  <div className={styles.foodChips}>
                    {selectedVrat.foodProhibited.map((f) => (
                      <span key={f} className={styles.foodProhibited}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Spiritual Benefits</div>
              <div className={styles.benefits}>{selectedVrat.benefits}</div>
            </div>
          </div>

          {/* Sidebar: upcoming dates */}
          <div className={styles.sidebar}>
            <div className={styles.upcomingList}>
              <div className={styles.upcomingTitle}>Upcoming Vrat Dates</div>
              {upcoming.map((v, i) => {
                const d = new Date(v.date + 'T00:00:00');
                const vrat = getVratById(v.vratId);
                return (
                  <div key={i} className={styles.upcomingItem}>
                    <div className={styles.upcomingTypeDot} style={{ background: VRAT_TYPE_COLORS[vrat?.type ?? 'other'] }} />
                    <div className={styles.upcomingDate}>
                      <div className={styles.upcomingDay}>{d.getDate()}</div>
                      <div className={styles.upcomingMonth}>{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                    </div>
                    <div className={styles.upcomingInfo}>
                      <div className={styles.upcomingName}>{v.special ?? VRAT_TYPE_LABELS[vrat?.type ?? 'other']}</div>
                      <div className={styles.upcomingPaksha}>{v.paksha} · {v.month} · {v.monthHi}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

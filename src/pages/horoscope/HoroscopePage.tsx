import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Star, Briefcase, Heart, Activity, Wallet, Info } from 'lucide-react';
import { useDate } from '@/context/DateContext';
import { RASHIS, ELEMENT_COLORS, getDailyInsight } from '@/data/horoscope';
import { formatDateLong } from '@/utils/format';
import styles from './HoroscopePage.module.css';

export function HoroscopePage() {
  const { selectedDate, goToPrevDay, goToNextDay, goToToday, isToday, setSelectedDate } = useDate();
  const [selectedRashi, setSelectedRashi] = useState(RASHIS[0]!);

  const insight = useMemo(() => getDailyInsight(selectedRashi, selectedDate), [selectedRashi, selectedDate]);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Horoscope · राशिफल</h1>
          <p className={styles.subtitle}>Vedic Rashi insights and daily predictions</p>
        </div>

        <div className={styles.rashiGrid}>
          {RASHIS.map((r) => (
            <button
              key={r.id}
              className={`${styles.rashiCard} ${selectedRashi.id === r.id ? styles.rashiCardActive : ''}`}
              onClick={() => setSelectedRashi(r)}
            >
              <span className={styles.rashiSymbol}>{r.symbol}</span>
              <span className={styles.rashiName}>{r.name}</span>
              <span className={styles.rashiNameHi}>{r.nameHi}</span>
              <span className={styles.rashiWestern}>{r.western}</span>
            </button>
          ))}
        </div>

        <div className={styles.detail}>
          {/* Left: Info Panel */}
          <div className={styles.infoPanel}>
            <div className={styles.infoHeader}>
              <div className={styles.infoSymbol}>{selectedRashi.symbol}</div>
              <div className={styles.infoName}>{selectedRashi.name}</div>
              <div className={styles.infoNameHi}>{selectedRashi.nameHi}</div>
              <div className={styles.infoWestern}>{selectedRashi.western} · {selectedRashi.dateRange}</div>
              <span className={styles.elementBadge} style={{ background: ELEMENT_COLORS[selectedRashi.element] }}>
                {selectedRashi.element} · {selectedRashi.elementHi}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Ruler</span>
              <span className={styles.infoValue}>{selectedRashi.ruler}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Quality</span>
              <span className={styles.infoValue}>{selectedRashi.quality} · {selectedRashi.qualityHi}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Lucky Day</span>
              <span className={styles.infoValue}>{selectedRashi.luckyDay}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Lucky Color</span>
              <span className={styles.infoValue}>{selectedRashi.luckyColor}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Lucky Number</span>
              <span className={styles.infoValue}>{selectedRashi.luckyNumber}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Body Part</span>
              <span className={styles.infoValue}>{selectedRashi.bodyPart}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Gemstone</span>
              <span className={styles.infoValue}>{selectedRashi.gemstone} · {selectedRashi.gemstoneHi}</span>
            </div>

            <div className={styles.traitsSection}>
              <div className={styles.sectionTitle}>Key Traits</div>
              <div className={styles.traitChips}>
                {selectedRashi.traits.map((t) => (
                  <span key={t} className={styles.traitChip}>{t}</span>
                ))}
              </div>
            </div>

            <div className={styles.compatSection}>
              <div className={styles.sectionTitle}>Compatible With</div>
              <div className={styles.compatChips}>
                {selectedRashi.compatibility.map((c) => {
                  const r = RASHIS.find((r) => r.name === c);
                  return (
                    <button
                      key={c}
                      className={styles.compatChip}
                      onClick={() => r && setSelectedRashi(r)}
                    >
                      {r?.symbol} {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Daily Insight */}
          <div className={styles.insightPanel}>
            <div className={styles.dateNav}>
              <button onClick={goToPrevDay} className={styles.navBtn}><ChevronLeft size={18} /></button>
              <span className={styles.dateLabel}>{formatDateLong(selectedDate)}</span>
              <button onClick={goToNextDay} className={styles.navBtn}><ChevronRight size={18} /></button>
              {!isToday && (
                <button onClick={goToToday} className={styles.todayBtn}><CalendarDays size={14} /> Today</button>
              )}
              <input
                type="date" className={styles.datePicker}
                value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`}
                onChange={(e) => { const d = new Date(e.target.value + 'T00:00:00'); if (!isNaN(d.getTime())) setSelectedDate(d); }}
                style={{ opacity: 0, position: 'absolute', width: 0 }}
              />
            </div>

            <div className={styles.overallRating}>
              <span className={styles.overallLabel}>Overall Rating</span>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={18}
                    fill={s <= insight.overall ? 'var(--accent-primary)' : 'none'}
                    className={s <= insight.overall ? styles.starFilled : styles.starEmpty}
                  />
                ))}
              </div>
            </div>

            <div className={styles.insightGrid}>
              <div className={styles.insightCard}>
                <div className={styles.insightHeader}>
                  <div className={styles.insightIcon}><Briefcase size={14} /></div>
                  <span className={styles.insightTitle}>Career · करियर</span>
                </div>
                <p className={styles.insightText}>{insight.career}</p>
              </div>

              <div className={styles.insightCard}>
                <div className={styles.insightHeader}>
                  <div className={styles.insightIcon}><Activity size={14} /></div>
                  <span className={styles.insightTitle}>Health · स्वास्थ्य</span>
                </div>
                <p className={styles.insightText}>{insight.health}</p>
              </div>

              <div className={styles.insightCard}>
                <div className={styles.insightHeader}>
                  <div className={styles.insightIcon}><Heart size={14} /></div>
                  <span className={styles.insightTitle}>Love · प्रेम</span>
                </div>
                <p className={styles.insightText}>{insight.love}</p>
              </div>

              <div className={styles.insightCard}>
                <div className={styles.insightHeader}>
                  <div className={styles.insightIcon}><Wallet size={14} /></div>
                  <span className={styles.insightTitle}>Finance · वित्त</span>
                </div>
                <p className={styles.insightText}>{insight.finance}</p>
              </div>
            </div>

            <div className={styles.disclaimer}>
              <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>
                Horoscope predictions are generated algorithmically based on Vedic Rashi data and are for entertainment purposes only.
                They are not astrological advice. Consult a qualified astrologer for personalized readings.
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

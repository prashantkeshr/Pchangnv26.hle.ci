import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useDate } from '@/context/DateContext';
import { useLocation } from '@/context/LocationContext';
import { getSunData } from '@/calculations/astronomy';
import { getAllMuhurats } from '@/calculations/muhurat';
import { formatTime, formatTimeRange, formatDateLong, formatDuration } from '@/utils/format';
import { Card } from '@/components/common/Card';
import styles from './MuhuratPage.module.css';

const MUHURAT_EXPLANATIONS: Record<string, { description: string; descHi: string; significance: string }> = {
  'Brahma Muhurat': {
    description: 'The auspicious time 96 minutes before sunrise to 48 minutes before sunrise.',
    descHi: 'सूर्योदय से 96 मिनट पहले से 48 मिनट पहले तक का शुभ समय।',
    significance: 'Ideal for meditation, prayer, study, and spiritual practices. The atmosphere is calm and sattvic.',
  },
  'Abhijit Muhurat': {
    description: 'The most auspicious muhurat of the day, centered around solar noon.',
    descHi: 'दिन का सबसे शुभ मुहूर्त, सौर मध्याह्न के आसपास।',
    significance: 'Suitable for starting any new venture, journey, or important task. Removes the doshas of all other muhurats.',
  },
  'Rahu Kaal': {
    description: 'An inauspicious time period ruled by Rahu, one of the shadow planets.',
    descHi: 'राहु द्वारा शासित अशुभ समय।',
    significance: 'Avoid starting new activities, signing contracts, or beginning journeys during this period.',
  },
  'Yamaganda': {
    description: 'An inauspicious period named after Yama, the god of death.',
    descHi: 'यम के नाम पर अशुभ काल।',
    significance: 'Avoid important events and new beginnings. Less severe than Rahu Kaal but still considered unfavorable.',
  },
  'Gulika Kaal': {
    description: 'An inauspicious period ruled by Gulika (Mandi), son of Saturn.',
    descHi: 'शनि के पुत्र गुलिक (मान्डी) द्वारा शासित अशुभ काल।',
    significance: 'Avoid starting auspicious activities. Considered less severe than Rahu Kaal.',
  },
};

export function MuhuratPage() {
  const { selectedDate, goToPrevDay, goToNextDay, goToToday, isToday, setSelectedDate } = useDate();
  const { location } = useLocation();

  const sunData = useMemo(() => getSunData(selectedDate, location.lat, location.lng), [selectedDate, location.lat, location.lng]);
  const muhurats = useMemo(() => {
    if (!sunData.sunrise || !sunData.sunset) return [];
    return getAllMuhurats(sunData.sunrise, sunData.sunset, selectedDate.getDay());
  }, [sunData, selectedDate]);

  const auspicious = muhurats.filter((m) => m.type === 'auspicious');
  const inauspicious = muhurats.filter((m) => m.type === 'inauspicious');

  const now = new Date();

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Muhurat · मुहूर्त</h1>
          <p className={styles.subtitle}>Auspicious and inauspicious time windows for {formatDateLong(selectedDate)}</p>
        </div>

        <div className={styles.dateNav}>
          <button onClick={goToPrevDay} className={styles.navBtn} aria-label="Previous day">
            <ChevronLeft size={18} />
          </button>
          <span className={styles.dateLabel}>{formatDateLong(selectedDate)}</span>
          <button onClick={goToNextDay} className={styles.navBtn} aria-label="Next day">
            <ChevronRight size={18} />
          </button>
          {!isToday && (
            <button onClick={goToToday} className={styles.todayBtn}>
              <CalendarDays size={14} /> Today
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
          />
        </div>

        <div className={styles.sunInfo}>
          <div className={styles.sunItem}>
            <span className={styles.sunLabel}>Sunrise</span>
            <span className={styles.sunValue}>{formatTime(sunData.sunrise)}</span>
          </div>
          <div className={styles.sunItem}>
            <span className={styles.sunLabel}>Sunset</span>
            <span className={styles.sunValue}>{formatTime(sunData.sunset)}</span>
          </div>
          <div className={styles.sunItem}>
            <span className={styles.sunLabel}>Day Duration</span>
            <span className={styles.sunValue}>{formatDuration(sunData.dayDuration)}</span>
          </div>
          <div className={styles.sunItem}>
            <span className={styles.sunLabel}>Location</span>
            <span className={styles.sunValue}>{location.name}</span>
          </div>
        </div>

        {muhurats.length === 0 ? (
          <div className={styles.empty}>
            <p>Muhurat data requires sunrise and sunset times.</p>
          </div>
        ) : (
          <div className={styles.sections}>
            {/* Timeline */}
            <Card title="Day Timeline" titleHi="दिन की समय-रेखा">
              <div className={styles.timeline}>
                {muhurats.map((m, i) => {
                  const isNow = isToday && now >= m.start && now < m.end;
                  const durationMs = m.end.getTime() - m.start.getTime();
                  const durationMin = Math.round(durationMs / 60000);

                  return (
                    <div key={i} className={`${styles.timelineItem} ${styles[m.type]} ${isNow ? styles.active : ''}`}>
                      <div className={styles.timelineBar} />
                      <div className={styles.timelineContent}>
                        <div className={styles.timelineName}>
                          {m.type === 'auspicious' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                          <span>{m.name}</span>
                          <span className={styles.timelineNameHi}>{m.nameHi}</span>
                          {isNow && <span className={styles.nowBadge}>NOW</span>}
                        </div>
                        <div className={styles.timelineTime}>
                          {formatTimeRange(m.start, m.end)} · {durationMin} min
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className={styles.twoCol}>
              {/* Auspicious */}
              <Card title="Auspicious" titleHi="शुभ मुहूर्त">
                <div className={styles.muhuratList}>
                  {auspicious.map((m, i) => {
                    const info = MUHURAT_EXPLANATIONS[m.name];
                    return (
                      <div key={i} className={styles.muhuratCard}>
                        <div className={styles.muhuratHeader}>
                          <CheckCircle size={16} className={styles.auspiciousIcon} />
                          <div>
                            <div className={styles.muhuratName}>{m.name}</div>
                            <div className={styles.muhuratNameHi}>{m.nameHi}</div>
                          </div>
                        </div>
                        <div className={styles.muhuratTime}>
                          <Clock size={12} />
                          {formatTimeRange(m.start, m.end)}
                        </div>
                        {info && (
                          <>
                            <p className={styles.muhuratDesc}>{info.description}</p>
                            <div className={styles.significance}>
                              <Info size={12} />
                              <span>{info.significance}</span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Inauspicious */}
              <Card title="Inauspicious" titleHi="अशुभ काल">
                <div className={styles.muhuratList}>
                  {inauspicious.map((m, i) => {
                    const info = MUHURAT_EXPLANATIONS[m.name];
                    return (
                      <div key={i} className={styles.muhuratCard}>
                        <div className={styles.muhuratHeader}>
                          <AlertTriangle size={16} className={styles.inauspiciousIcon} />
                          <div>
                            <div className={styles.muhuratName}>{m.name}</div>
                            <div className={styles.muhuratNameHi}>{m.nameHi}</div>
                          </div>
                        </div>
                        <div className={styles.muhuratTime}>
                          <Clock size={12} />
                          {formatTimeRange(m.start, m.end)}
                        </div>
                        {info && (
                          <>
                            <p className={styles.muhuratDesc}>{info.description}</p>
                            <div className={styles.significance}>
                              <Info size={12} />
                              <span>{info.significance}</span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

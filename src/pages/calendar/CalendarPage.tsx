import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useDate } from '@/context/DateContext';
import { getFullPanchang } from '@/calculations/panchang';
import { getFestivalsForDate, getFestivalsForMonth, FESTIVAL_TYPE_COLORS } from '@/data/festivals';
import styles from './CalendarPage.module.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function CalendarPage() {
  const { selectedDate, setSelectedDate } = useDate();
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days: Array<{ day: number; date: Date; isCurrentMonth: boolean }> = [];

    const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      days.push({ day: d, date: new Date(viewYear, viewMonth - 1, d), isCurrentMonth: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, date: new Date(viewYear, viewMonth, d), isCurrentMonth: true });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({ day: d, date: new Date(viewYear, viewMonth + 1, d), isCurrentMonth: false });
    }

    return days;
  }, [viewYear, viewMonth]);

  const monthFestivals = useMemo(() => getFestivalsForMonth(viewYear, viewMonth), [viewYear, viewMonth]);

  const selectedDayPanchang = useMemo(() => getFullPanchang(selectedDate), [selectedDate]);
  const selectedDayFestivals = useMemo(() => getFestivalsForDate(selectedDate), [selectedDate]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  function goToPrevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  }

  function goToNextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  }

  function goToCurrentMonth() {
    const now = new Date();
    setViewMonth(now.getMonth());
    setViewYear(now.getFullYear());
    setSelectedDate(now);
  }

  function handleDayClick(date: Date) {
    setSelectedDate(date);
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.monthNav}>
            <button onClick={goToPrevMonth} className={styles.navBtn} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <h1 className={styles.monthTitle}>
              {MONTHS[viewMonth]} {viewYear}
            </h1>
            <button onClick={goToNextMonth} className={styles.navBtn} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>
          <button onClick={goToCurrentMonth} className={styles.todayBtn}>
            <CalendarDays size={14} /> Today
          </button>
        </div>

        <div className={styles.layout}>
          <div className={styles.calendarSection}>
            <div className={styles.weekdayHeader}>
              {WEEKDAYS.map((d) => (
                <div key={d} className={styles.weekday}>{d}</div>
              ))}
            </div>

            <div className={styles.grid}>
              {calendarDays.map((item, i) => {
                const dateStr = `${item.date.getFullYear()}-${item.date.getMonth()}-${item.date.getDate()}`;
                const isToday = dateStr === todayStr;
                const isSelected = item.date.getFullYear() === selectedDate.getFullYear()
                  && item.date.getMonth() === selectedDate.getMonth()
                  && item.date.getDate() === selectedDate.getDate();
                const festivals = getFestivalsForDate(item.date);
                const panchang = item.isCurrentMonth ? getFullPanchang(item.date) : null;

                return (
                  <button
                    key={i}
                    className={`${styles.dayCell} ${!item.isCurrentMonth ? styles.otherMonth : ''} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''}`}
                    onClick={() => handleDayClick(item.date)}
                  >
                    <span className={styles.dayNum}>{item.day}</span>
                    {panchang && (
                      <span className={styles.tithiName}>{panchang.tithi.nameHi}</span>
                    )}
                    {festivals.length > 0 && (
                      <div className={styles.festivalDots}>
                        {festivals.slice(0, 3).map((f, j) => (
                          <span
                            key={j}
                            className={styles.dot}
                            style={{ background: FESTIVAL_TYPE_COLORS[f.type] ?? 'var(--accent-primary)' }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarDate}>
              <div className={styles.sidebarDay}>{selectedDate.getDate()}</div>
              <div className={styles.sidebarFull}>
                {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Panchang · पंचांग</h3>
              <div className={styles.panchangMini}>
                <div className={styles.miniRow}>
                  <span>Tithi</span>
                  <span>{selectedDayPanchang.tithi.name} ({selectedDayPanchang.tithi.nameHi})</span>
                </div>
                <div className={styles.miniRow}>
                  <span>Nakshatra</span>
                  <span>{selectedDayPanchang.nakshatra.name} ({selectedDayPanchang.nakshatra.nameHi})</span>
                </div>
                <div className={styles.miniRow}>
                  <span>Yoga</span>
                  <span>{selectedDayPanchang.yoga.name}</span>
                </div>
                <div className={styles.miniRow}>
                  <span>Karana</span>
                  <span>{selectedDayPanchang.karana.name}</span>
                </div>
                <div className={styles.miniRow}>
                  <span>Paksha</span>
                  <span>{selectedDayPanchang.paksha} ({selectedDayPanchang.paksha === 'Shukla' ? 'शुक्ल' : 'कृष्ण'})</span>
                </div>
              </div>
            </div>

            {selectedDayFestivals.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Festivals · त्यौहार</h3>
                <div className={styles.festivalList}>
                  {selectedDayFestivals.map((f) => (
                    <div key={f.id} className={styles.festivalItem}>
                      <span className={styles.festivalDot} style={{ background: FESTIVAL_TYPE_COLORS[f.type] ?? 'var(--accent-primary)' }} />
                      <div>
                        <div className={styles.festivalName}>{f.name} · {f.nameHi}</div>
                        <div className={styles.festivalDesc}>{f.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {monthFestivals.length > 0 && (
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>This Month</h3>
                <div className={styles.monthFestList}>
                  {monthFestivals.map((f) => (
                    <div key={f.id} className={styles.monthFestItem}>
                      <span className={styles.monthFestDate}>
                        {new Date(f.date + 'T00:00:00').getDate()}
                      </span>
                      <span className={styles.monthFestName}>{f.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

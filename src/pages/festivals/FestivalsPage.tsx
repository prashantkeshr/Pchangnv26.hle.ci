import { useMemo, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { FESTIVALS_2026, FESTIVAL_TYPE_COLORS, FESTIVAL_TYPE_LABELS } from '@/data/festivals';
import styles from './FestivalsPage.module.css';

const ALL_TYPES = Object.keys(FESTIVAL_TYPE_LABELS);
const MONTHS = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function FestivalsPage() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState(0);

  const filtered = useMemo(() => {
    let list = [...FESTIVALS_2026];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((f) =>
        f.name.toLowerCase().includes(q) ||
        f.nameHi.includes(q) ||
        f.description.toLowerCase().includes(q)
      );
    }

    if (selectedType !== 'all') {
      list = list.filter((f) => f.type === selectedType);
    }

    if (selectedMonth > 0) {
      const monthStr = String(selectedMonth).padStart(2, '0');
      list = list.filter((f) => f.date.substring(5, 7) === monthStr);
    }

    return list;
  }, [search, selectedType, selectedMonth]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const f of filtered) {
      const monthKey = f.date.substring(0, 7);
      if (!groups[monthKey]) groups[monthKey] = [];
      groups[monthKey].push(f);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Festivals & Observances</h1>
          <p className={styles.titleHi}>त्यौहार एवं उत्सव</p>
          <p className={styles.subtitle}>
            {FESTIVALS_2026.length} festivals and observances for 2026
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search festivals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <Filter size={14} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Types</option>
                {ALL_TYPES.map((t) => (
                  <option key={t} value={t}>{FESTIVAL_TYPE_LABELS[t]}</option>
                ))}
              </select>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className={styles.select}
            >
              {MONTHS.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.typeChips}>
          <button
            className={`${styles.chip} ${selectedType === 'all' ? styles.chipActive : ''}`}
            onClick={() => setSelectedType('all')}
          >
            All ({FESTIVALS_2026.length})
          </button>
          {ALL_TYPES.map((t) => {
            const count = FESTIVALS_2026.filter((f) => f.type === t).length;
            if (count === 0) return null;
            return (
              <button
                key={t}
                className={`${styles.chip} ${selectedType === t ? styles.chipActive : ''}`}
                onClick={() => setSelectedType(t)}
                style={{ '--chip-color': FESTIVAL_TYPE_COLORS[t] } as React.CSSProperties}
              >
                {FESTIVAL_TYPE_LABELS[t]} ({count})
              </button>
            );
          })}
        </div>

        {grouped.length === 0 ? (
          <div className={styles.empty}>
            <p>No festivals found matching your criteria.</p>
          </div>
        ) : (
          <div className={styles.results}>
            {grouped.map(([monthKey, festivals]) => {
              const [y, m] = monthKey.split('-').map(Number);
              const monthName = new Date(y!, m! - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
              return (
                <section key={monthKey} className={styles.monthGroup}>
                  <h2 className={styles.monthHeading}>{monthName}</h2>
                  <div className={styles.festList}>
                    {festivals.map((f) => (
                      <article key={f.id} className={styles.festCard}>
                        <div className={styles.festDate}>
                          <span className={styles.festDay}>
                            {new Date(f.date + 'T00:00:00').getDate()}
                          </span>
                          <span className={styles.festWeekday}>
                            {new Date(f.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short' })}
                          </span>
                        </div>
                        <div className={styles.festBody}>
                          <div className={styles.festHeader}>
                            <h3 className={styles.festName}>{f.name}</h3>
                            <span className={styles.festNameHi}>{f.nameHi}</span>
                          </div>
                          <p className={styles.festDesc}>{f.description}</p>
                          <div className={styles.festTags}>
                            <span
                              className={styles.typeBadge}
                              style={{ background: FESTIVAL_TYPE_COLORS[f.type] ?? 'var(--accent-primary)' }}
                            >
                              {FESTIVAL_TYPE_LABELS[f.type] ?? f.type}
                            </span>
                            {f.region?.map((r) => (
                              <span key={r} className={styles.regionBadge}>{r}</span>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

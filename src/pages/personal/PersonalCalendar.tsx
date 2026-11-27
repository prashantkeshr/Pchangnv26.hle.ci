import { useState, useMemo, useCallback } from 'react';
import { Plus, Download, Shield, CalendarPlus } from 'lucide-react';
import styles from './PersonalCalendar.module.css';

interface PersonalEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: string;
  description?: string;
  recurring?: 'none' | 'yearly';
}

const CATEGORIES: Array<{ value: string; label: string; color: string }> = [
  { value: 'personal', label: 'Personal', color: '#3498db' },
  { value: 'religious', label: 'Religious', color: '#e67e22' },
  { value: 'family', label: 'Family', color: '#e91e63' },
  { value: 'reminder', label: 'Reminder', color: '#9b59b6' },
  { value: 'birthday', label: 'Birthday', color: '#27ae60' },
  { value: 'anniversary', label: 'Anniversary', color: '#f1c40f' },
];

function loadEvents(): PersonalEvent[] {
  try {
    const saved = localStorage.getItem('panchang-events');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveEvents(events: PersonalEvent[]) {
  try {
    localStorage.setItem('panchang-events', JSON.stringify(events));
  } catch { /* quota exceeded */ }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function exportToICS(events: PersonalEvent[]): void {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Panchang//Personal Calendar//EN',
    'CALSCALE:GREGORIAN',
  ];

  for (const e of events) {
    const dateStr = e.date.replace(/-/g, '');
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${e.id}@panchang`);
    lines.push(`DTSTART;VALUE=DATE:${dateStr}`);
    lines.push(`SUMMARY:${e.title}`);
    if (e.description) lines.push(`DESCRIPTION:${e.description}`);
    lines.push(`CATEGORIES:${e.category}`);
    if (e.recurring === 'yearly') lines.push('RRULE:FREQ=YEARLY');
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'panchang-events.ics';
  a.click();
  URL.revokeObjectURL(url);
}

export function PersonalCalendar() {
  const [events, setEvents] = useState<PersonalEvent[]>(loadEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<PersonalEvent | null>(null);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    category: 'personal',
    description: '',
    recurring: 'none' as 'none' | 'yearly',
  });

  const updateEvents = useCallback((next: PersonalEvent[]) => {
    setEvents(next);
    saveEvents(next);
  }, []);

  const openAdd = () => {
    const today = new Date();
    setForm({
      title: '',
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      time: '',
      category: 'personal',
      description: '',
      recurring: 'none',
    });
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEdit = (e: PersonalEvent) => {
    setForm({
      title: e.title,
      date: e.date,
      time: e.time ?? '',
      category: e.category,
      description: e.description ?? '',
      recurring: e.recurring ?? 'none',
    });
    setEditingEvent(e);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.date) return;
    if (editingEvent) {
      updateEvents(events.map((e) => e.id === editingEvent.id ? { ...editingEvent, ...form, time: form.time || undefined, description: form.description || undefined } : e));
    } else {
      updateEvents([...events, { id: generateId(), ...form, time: form.time || undefined, description: form.description || undefined }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!editingEvent) return;
    updateEvents(events.filter((e) => e.id !== editingEvent.id));
    setModalOpen(false);
  };

  const grouped = useMemo(() => {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
    const groups: Record<string, PersonalEvent[]> = {};
    for (const e of sorted) {
      const d = new Date(e.date + 'T00:00:00');
      const key = d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      (groups[key] ??= []).push(e);
    }
    return groups;
  }, [events]);

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>My Calendar · मेरा कैलेंडर</h1>
          <p className={styles.subtitle}>Personal events stored locally on your device — never sent to any server</p>
        </div>

        <div className={styles.toolbar}>
          <button className={styles.addBtn} onClick={openAdd}>
            <Plus size={16} /> Add Event
          </button>
          {events.length > 0 && (
            <button className={styles.exportBtn} onClick={() => exportToICS(events)}>
              <Download size={14} /> Export .ics
            </button>
          )}
          <span className={styles.eventCount}>{events.length} event{events.length !== 1 ? 's' : ''}</span>
        </div>

        {events.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}><CalendarPlus size={48} strokeWidth={1} /></div>
            <p>No personal events yet</p>
            <p style={{ marginTop: 'var(--space-1)' }}>Add birthdays, anniversaries, puja dates, and reminders</p>
          </div>
        ) : (
          Object.entries(grouped).map(([month, evts]) => (
            <div key={month} className={styles.monthGroup}>
              <div className={styles.monthLabel}>{month}</div>
              {evts.map((e) => {
                const d = new Date(e.date + 'T00:00:00');
                const cat = CATEGORIES.find((c) => c.value === e.category);
                const isPast = e.date < todayStr;
                return (
                  <div key={e.id} className={`${styles.eventCard} ${isPast ? styles.eventPast : ''}`} onClick={() => openEdit(e)}>
                    <div className={styles.eventDate}>
                      <div className={styles.eventDay}>{d.getDate()}</div>
                      <div className={styles.eventMonth}>{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                      <div className={styles.eventWeekday}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                    </div>
                    <div className={styles.eventInfo}>
                      <div className={styles.eventName}>{e.title}</div>
                      {e.description && <div className={styles.eventDesc}>{e.description}</div>}
                      <div className={styles.eventMeta}>
                        <span className={styles.eventTag} style={{ background: cat?.color }}>{cat?.label}</span>
                        {e.time && <span className={styles.eventTime}>{e.time}</span>}
                        {e.recurring === 'yearly' && <span className={styles.eventTime}>Yearly</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}

        <div className={styles.privacyNote}>
          <Shield size={14} />
          <span>All events are stored in your browser's localStorage. No data is sent to any server. Clear browser data to remove events.</span>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{editingEvent ? 'Edit Event' : 'Add Event'}</h2>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Event name..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                autoFocus
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date</label>
                <input
                  type="date"
                  className={styles.formInput}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Time (optional)</label>
                <input
                  type="time"
                  className={styles.formInput}
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category</label>
                <select
                  className={styles.formSelect}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Repeat</label>
                <select
                  className={styles.formSelect}
                  value={form.recurring}
                  onChange={(e) => setForm({ ...form, recurring: e.target.value as 'none' | 'yearly' })}
                >
                  <option value="none">No repeat</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Notes (optional)</label>
              <textarea
                className={styles.formTextarea}
                placeholder="Additional details..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className={styles.modalActions}>
              {editingEvent && (
                <button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
              )}
              <button className={styles.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave}>
                {editingEvent ? 'Update' : 'Add Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

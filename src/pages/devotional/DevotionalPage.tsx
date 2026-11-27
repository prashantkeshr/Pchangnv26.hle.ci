import { useState } from 'react';
import { BookOpen, Music, Sparkles, ChevronDown, Calendar, BookMarked } from 'lucide-react';
import { AARTIS, MANTRAS, PUJA_GUIDES, CHALISAS, DEITY_COLORS } from '@/data/devotional';
import styles from './DevotionalPage.module.css';

type Tab = 'aarti' | 'mantra' | 'puja' | 'chalisa';

export function DevotionalPage() {
  const [activeTab, setActiveTab] = useState<Tab>('aarti');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tabs: Array<{ key: Tab; label: string; labelHi: string; icon: typeof BookOpen; count: number }> = [
    { key: 'aarti', label: 'Aarti', labelHi: 'आरती', icon: Music, count: AARTIS.length },
    { key: 'mantra', label: 'Mantras', labelHi: 'मंत्र', icon: Sparkles, count: MANTRAS.length },
    { key: 'puja', label: 'Puja Guide', labelHi: 'पूजा विधि', icon: BookOpen, count: PUJA_GUIDES.length },
    { key: 'chalisa', label: 'Chalisa', labelHi: 'चालीसा', icon: BookMarked, count: CHALISAS.length },
  ];

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Devotional · भक्ति</h1>
          <p className={styles.subtitle}>Aartis, Mantras, Puja guides and Chalisas for daily worship</p>
        </div>

        <div className={styles.tabs}>
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                <Icon size={14} />
                <span>{t.label}</span>
                <span className={styles.countBadge}>{t.count}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'aarti' && (
          <div className={styles.grid}>
            {AARTIS.map((a) => {
              const isOpen = expanded.has(a.id);
              return (
                <div key={a.id} className={styles.card}>
                  <div className={styles.cardHeader} onClick={() => toggle(a.id)}>
                    <div className={styles.deityDot} style={{ background: DEITY_COLORS[a.deity] ?? 'var(--accent-primary)' }} />
                    <div className={styles.cardTitleGroup}>
                      <div className={styles.cardTitle}>{a.name}</div>
                      <div className={styles.cardTitleHi}>{a.nameHi}</div>
                      <div className={styles.cardDeity}>{a.deity} · {a.deityHi}</div>
                    </div>
                    <ChevronDown size={16} className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ''}`} />
                  </div>
                  {isOpen && (
                    <div className={styles.cardBody}>
                      <div className={styles.lyricsSection}>
                        <div className={styles.lyricsLabel}>Hindi</div>
                        {a.lyricsHi.map((line, i) => (
                          <div key={i} className={styles.lyricsLineHi}>{line}</div>
                        ))}
                      </div>
                      <div className={styles.lyricsSection}>
                        <div className={styles.lyricsLabel}>Transliteration</div>
                        {a.lyrics.map((line, i) => (
                          <div key={i} className={styles.lyricsLine}>{line}</div>
                        ))}
                      </div>
                      <div className={styles.occasion}>
                        <Calendar size={10} /> {a.occasion}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'mantra' && (
          <div className={styles.grid}>
            {MANTRAS.map((m) => {
              const isOpen = expanded.has(m.id);
              return (
                <div key={m.id} className={styles.card}>
                  <div className={styles.cardHeader} onClick={() => toggle(m.id)}>
                    <div className={styles.deityDot} style={{ background: DEITY_COLORS[m.deity] ?? 'var(--accent-primary)' }} />
                    <div className={styles.cardTitleGroup}>
                      <div className={styles.cardTitle}>{m.name}</div>
                      <div className={styles.cardTitleHi}>{m.nameHi}</div>
                      <div className={styles.cardDeity}>{m.deity} · {m.deityHi}</div>
                    </div>
                    {m.count && <span className={styles.countBadge}>{m.count}x</span>}
                    <ChevronDown size={16} className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ''}`} />
                  </div>
                  {isOpen && (
                    <div className={styles.cardBody}>
                      <div className={styles.mantraSanskrit}>{m.sanskrit}</div>
                      <div className={styles.mantraTranslit}>{m.transliteration}</div>
                      <div className={styles.mantraRow}>
                        <span className={styles.mantraLabel}>Meaning</span>
                        <span className={styles.mantraValue}>{m.meaning}</span>
                      </div>
                      <div className={styles.mantraRow}>
                        <span className={styles.mantraLabel}>Benefits</span>
                        <span className={styles.mantraValue}>{m.benefits}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'puja' && (
          <div className={styles.grid}>
            {PUJA_GUIDES.map((p) => {
              const isOpen = expanded.has(p.id);
              return (
                <div key={p.id} className={styles.pujaCard}>
                  <div className={styles.pujaHeader} onClick={() => toggle(p.id)}>
                    <div className={styles.deityDot} style={{ background: DEITY_COLORS[p.deity] ?? 'var(--accent-primary)' }} />
                    <div className={styles.cardTitleGroup}>
                      <div className={styles.cardTitle}>{p.name}</div>
                      <div className={styles.cardTitleHi}>{p.nameHi}</div>
                      <div className={styles.cardDeity}>{p.deity} · {p.deityHi}</div>
                    </div>
                    <ChevronDown size={16} className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ''}`} />
                  </div>
                  {isOpen && (
                    <div className={styles.pujaBody}>
                      <div className={styles.occasion}>
                        <Calendar size={10} /> {p.occasion}
                      </div>

                      <div className={styles.pujaSection}>
                        <div className={styles.pujaSectionTitle}>Items Required (Samagri)</div>
                        <div className={styles.pujaItems}>
                          {p.items.map((item, i) => (
                            <span key={i} className={styles.pujaItem}>{item}</span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.pujaSection}>
                        <div className={styles.pujaSectionTitle}>Steps (Vidhi)</div>
                        <ol className={styles.pujaSteps}>
                          {p.steps.map((step, i) => (
                            <li key={i} className={styles.pujaStep}><span>{step}</span></li>
                          ))}
                        </ol>
                      </div>

                      {p.mantra && (
                        <div className={styles.pujaSection}>
                          <div className={styles.pujaSectionTitle}>Mantra</div>
                          <div className={styles.pujaMantra}>{p.mantra}</div>
                        </div>
                      )}

                      <div className={styles.pujaSection}>
                        <div className={styles.pujaSectionTitle}>Significance</div>
                        <div className={styles.pujaSignificance}>{p.significance}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'chalisa' && (
          <div className={styles.grid}>
            {CHALISAS.map((c) => {
              const isOpen = expanded.has(c.id);
              return (
                <div key={c.id} className={styles.card}>
                  <div className={styles.cardHeader} onClick={() => toggle(c.id)}>
                    <div className={styles.deityDot} style={{ background: DEITY_COLORS[c.deity] ?? 'var(--accent-primary)' }} />
                    <div className={styles.cardTitleGroup}>
                      <div className={styles.cardTitle}>{c.name}</div>
                      <div className={styles.cardTitleHi}>{c.nameHi}</div>
                      <div className={styles.cardDeity}>{c.deity} · {c.deityHi}</div>
                    </div>
                    <ChevronDown size={16} className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ''}`} />
                  </div>
                  {isOpen && (
                    <div className={styles.cardBody}>
                      <div className={styles.chalisaMeta}>
                        <span>{c.dohaCount} Dohas</span>
                        <span>{c.chaupaaiCount} Chaupais</span>
                        <span>{c.day}</span>
                      </div>
                      <div className={styles.chalisaDoha}>
                        <div className={styles.chalisaDohaLabel}>Opening Doha</div>
                        <div className={styles.chalisaDohaHi}>{c.openingDohaHi}</div>
                        <div className={styles.chalisaDohaText}>{c.openingDoha}</div>
                      </div>
                      <div className={styles.chalisaBenefits}>
                        <strong>Benefits:</strong> {c.benefits}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

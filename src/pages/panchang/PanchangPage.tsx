import { useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Info } from 'lucide-react';
import { useDate } from '@/context/DateContext';
import { useLocation } from '@/context/LocationContext';
import { getSunData, getMoonData } from '@/calculations/astronomy';
import { getFullPanchang } from '@/calculations/panchang';
import { getAllMuhurats } from '@/calculations/muhurat';
import { Card } from '@/components/common/Card';
import { formatTime, formatDuration, formatDateLong, formatTimeRange } from '@/utils/format';
import { MoonPhaseIcon } from '@/components/icons/MoonPhaseIcon';
import styles from './PanchangPage.module.css';

const TITHI_INFO: Record<string, string> = {
  Pratipada: 'The first tithi after New Moon or Full Moon. Ruled by Agni.',
  Dwitiya: 'The second tithi. Considered auspicious for starting new ventures.',
  Tritiya: 'The third tithi. Akshaya Tritiya falls on this tithi in Vaishakha.',
  Chaturthi: 'The fourth tithi. Associated with Lord Ganesha.',
  Panchami: 'The fifth tithi. Naga Panchami and Basant Panchami fall on this tithi.',
  Shashthi: 'The sixth tithi. Associated with Skanda/Kartikeya.',
  Saptami: 'The seventh tithi. Chhath Puja starts on Saptami.',
  Ashtami: 'The eighth tithi. Durga Ashtami and Krishna Janmashtami fall on this tithi.',
  Navami: 'The ninth tithi. Ram Navami falls on Chaitra Shukla Navami.',
  Dashami: 'The tenth tithi. Dussehra falls on Ashwin Shukla Dashami.',
  Ekadashi: 'The eleventh tithi. Considered very auspicious for fasting and devotion.',
  Dwadashi: 'The twelfth tithi. Parana (breaking the Ekadashi fast) is done on this tithi.',
  Trayodashi: 'The thirteenth tithi. Pradosh Vrat is observed on Trayodashi.',
  Chaturdashi: 'The fourteenth tithi. Maha Shivaratri falls on Krishna Chaturdashi.',
  Purnima: 'Full Moon day. Many festivals and observances are held on Purnima.',
  Amavasya: 'New Moon day. Considered significant for Pitru Tarpan and Darsha Amavasya.',
};

export function PanchangPage() {
  const { selectedDate, goToPrevDay, goToNextDay, goToToday, isToday, setSelectedDate } = useDate();
  const { location } = useLocation();

  const panchang = useMemo(() => getFullPanchang(selectedDate), [selectedDate]);
  const sunData = useMemo(() => getSunData(selectedDate, location.lat, location.lng), [selectedDate, location.lat, location.lng]);
  const moonData = useMemo(() => getMoonData(selectedDate, location.lat, location.lng), [selectedDate, location.lat, location.lng]);
  const muhurats = useMemo(() => {
    if (!sunData.sunrise || !sunData.sunset) return [];
    return getAllMuhurats(sunData.sunrise, sunData.sunset, selectedDate.getDay());
  }, [sunData, selectedDate]);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.dateNav}>
          <button onClick={goToPrevDay} className={styles.navBtn} aria-label="Previous day">
            <ChevronLeft size={18} />
          </button>
          <div className={styles.dateCenter}>
            <h1 className={styles.dateTitle}>{formatDateLong(selectedDate)}</h1>
            <span className={styles.samvat}>
              विक्रम संवत {panchang.vikramSamvat} · शक संवत {panchang.shakaSamvat} · {panchang.masa} ({panchang.masaHi})
            </span>
          </div>
          <button onClick={goToNextDay} className={styles.navBtn} aria-label="Next day">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className={styles.dateActions}>
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

        {/* Panchang Summary Bar */}
        <div className={styles.summaryBar}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>वार</span>
            <span className={styles.summaryValue}>{panchang.vaarHi}</span>
            <span className={styles.summaryEn}>{panchang.vaar}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>तिथि</span>
            <span className={styles.summaryValue}>{panchang.tithi.nameHi}</span>
            <span className={styles.summaryEn}>{panchang.tithi.name}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>नक्षत्र</span>
            <span className={styles.summaryValue}>{panchang.nakshatra.nameHi}</span>
            <span className={styles.summaryEn}>{panchang.nakshatra.name}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>योग</span>
            <span className={styles.summaryValue}>{panchang.yoga.nameHi}</span>
            <span className={styles.summaryEn}>{panchang.yoga.name}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>करण</span>
            <span className={styles.summaryValue}>{panchang.karana.nameHi}</span>
            <span className={styles.summaryEn}>{panchang.karana.name}</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Tithi Detail */}
          <Card title="Tithi" titleHi="तिथि">
            <div className={styles.detailSection}>
              <div className={styles.detailMain}>
                <span className={styles.detailName}>{panchang.tithi.name}</span>
                <span className={styles.detailNameHi}>{panchang.tithi.nameHi}</span>
              </div>
              <div className={styles.detailMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Number</span>
                  <span className={styles.metaValue}>{panchang.tithi.number} of 30</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Paksha</span>
                  <span className={styles.metaValue}>{panchang.paksha} ({panchang.paksha === 'Shukla' ? 'शुक्ल' : 'कृष्ण'})</span>
                </div>
              </div>
              {TITHI_INFO[panchang.tithi.name] && (
                <div className={styles.infoBox}>
                  <Info size={14} />
                  <span>{TITHI_INFO[panchang.tithi.name]}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Nakshatra Detail */}
          <Card title="Nakshatra" titleHi="नक्षत्र">
            <div className={styles.detailSection}>
              <div className={styles.detailMain}>
                <span className={styles.detailName}>{panchang.nakshatra.name}</span>
                <span className={styles.detailNameHi}>{panchang.nakshatra.nameHi}</span>
              </div>
              <div className={styles.detailMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Number</span>
                  <span className={styles.metaValue}>{panchang.nakshatra.number} of 27</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Pada</span>
                  <span className={styles.metaValue}>{panchang.nakshatra.pada}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Deity</span>
                  <span className={styles.metaValue}>{panchang.nakshatra.deity}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Yoga Detail */}
          <Card title="Yoga" titleHi="योग">
            <div className={styles.detailSection}>
              <div className={styles.detailMain}>
                <span className={styles.detailName}>{panchang.yoga.name}</span>
                <span className={styles.detailNameHi}>{panchang.yoga.nameHi}</span>
              </div>
              <div className={styles.detailMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Number</span>
                  <span className={styles.metaValue}>{panchang.yoga.number} of 27</span>
                </div>
              </div>
              <div className={styles.infoBox}>
                <Info size={14} />
                <span>Yoga is determined by the sum of Sun and Moon longitudes divided into 27 equal parts of 13°20' each.</span>
              </div>
            </div>
          </Card>

          {/* Karana Detail */}
          <Card title="Karana" titleHi="करण">
            <div className={styles.detailSection}>
              <div className={styles.detailMain}>
                <span className={styles.detailName}>{panchang.karana.name}</span>
                <span className={styles.detailNameHi}>{panchang.karana.nameHi}</span>
              </div>
              <div className={styles.detailMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Number</span>
                  <span className={styles.metaValue}>{panchang.karana.number} of 60</span>
                </div>
              </div>
              <div className={styles.infoBox}>
                <Info size={14} />
                <span>Karana is half a Tithi. Each Tithi has two Karanas. There are 11 Karanas in total — 7 recurring and 4 fixed.</span>
              </div>
            </div>
          </Card>

          {/* Rashi */}
          <Card title="Rashi" titleHi="राशि">
            <div className={styles.detailSection}>
              <div className={styles.detailMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Chandra Rashi (Moon Sign)</span>
                  <span className={styles.metaValue}>{panchang.chandraRashi}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Surya Rashi (Sun Sign)</span>
                  <span className={styles.metaValue}>{panchang.suryaRashi}</span>
                </div>
              </div>
              <div className={styles.infoBox}>
                <Info size={14} />
                <span>Rashi is determined by the sidereal position (Lahiri Ayanamsa). Chandra Rashi is based on Moon's longitude, Surya Rashi on Sun's longitude.</span>
              </div>
            </div>
          </Card>

          {/* Sun & Moon Times */}
          <Card title="Sun & Moon" titleHi="सूर्य एवं चंद्रमा">
            <div className={styles.celestialGrid}>
              <div className={styles.celestialCol}>
                <h4 className={styles.celestialTitle}>Sun · सूर्य</h4>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Sunrise</span>
                  <span className={styles.metaValue}>{formatTime(sunData.sunrise)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Sunset</span>
                  <span className={styles.metaValue}>{formatTime(sunData.sunset)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Solar Noon</span>
                  <span className={styles.metaValue}>{formatTime(sunData.solarNoon)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Day Duration</span>
                  <span className={styles.metaValue}>{formatDuration(sunData.dayDuration)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Dawn</span>
                  <span className={styles.metaValue}>{formatTime(sunData.dawn)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Dusk</span>
                  <span className={styles.metaValue}>{formatTime(sunData.dusk)}</span>
                </div>
              </div>
              <div className={styles.celestialCol}>
                <h4 className={styles.celestialTitle}>Moon · चंद्रमा</h4>
                <div className={styles.moonVisual}>
                  <MoonPhaseIcon phase={moonData.phase} size={48} />
                  <div>
                    <div className={styles.phaseName}>{moonData.phaseName}</div>
                    <div className={styles.phaseDetail}>{moonData.illumination.toFixed(1)}%</div>
                  </div>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Moonrise</span>
                  <span className={styles.metaValue}>{formatTime(moonData.moonrise)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Moonset</span>
                  <span className={styles.metaValue}>{formatTime(moonData.moonset)}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Moon Age</span>
                  <span className={styles.metaValue}>{moonData.age.toFixed(1)} days</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Muhurat Timeline */}
          <Card title="Muhurat" titleHi="मुहूर्त">
            <div className={styles.muhuratList}>
              {muhurats.length === 0 ? (
                <p className={styles.empty}>Muhurat data requires sunrise/sunset.</p>
              ) : muhurats.map((m, i) => (
                <div key={i} className={`${styles.muhuratItem} ${styles[m.type]}`}>
                  <div className={styles.muhuratIndicator} />
                  <div className={styles.muhuratInfo}>
                    <div className={styles.muhuratName}>
                      {m.name} <span className={styles.muhuratNameHi}>{m.nameHi}</span>
                    </div>
                    <div className={styles.muhuratTime}>{formatTimeRange(m.start, m.end)}</div>
                    {m.description && <div className={styles.muhuratDesc}>{m.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Calculation Info */}
          <Card title="Calculation Details" titleHi="गणना विवरण">
            <div className={styles.detailSection}>
              <div className={styles.detailMeta}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>{location.name}, {location.state}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Coordinates</span>
                  <span className={styles.metaValue}>{location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Time Zone</span>
                  <span className={styles.metaValue}>{location.tz} (IST +5:30)</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Ayanamsa</span>
                  <span className={styles.metaValue}>Lahiri (~24.11°)</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Calculation</span>
                  <span className={styles.metaValue}>Client-side (astronomy-engine)</span>
                </div>
              </div>
              <div className={styles.infoBox}>
                <Info size={14} />
                <span>All calculations are performed locally in your browser using the astronomy-engine library. Panchang elements use sidereal (Lahiri) positions. Times are approximate and may differ from traditional almanacs due to differences in calculation methods.</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

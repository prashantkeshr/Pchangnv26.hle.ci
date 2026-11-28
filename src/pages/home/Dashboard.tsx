import { useMemo } from 'react';
import { useDate } from '@/context/DateContext';
import { useLocation } from '@/context/LocationContext';
import { getSunData, getMoonData } from '@/calculations/astronomy';
import { getFullPanchang } from '@/calculations/panchang';
import { getAllMuhurats } from '@/calculations/muhurat';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { DateHero } from './DateHero';
import { PanchangPanel } from './PanchangPanel';
import { SunPanel } from './SunPanel';
import { MoonPanel } from './MoonPanel';
import { MuhuratPanel } from './MuhuratPanel';
import { FestivalPanel } from './FestivalPanel';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const { selectedDate } = useDate();
  const { location } = useLocation();
  const gridRef = useScrollReveal();

  const sunData = useMemo(
    () => getSunData(selectedDate, location.lat, location.lng),
    [selectedDate, location.lat, location.lng]
  );

  const moonData = useMemo(
    () => getMoonData(selectedDate, location.lat, location.lng),
    [selectedDate, location.lat, location.lng]
  );

  const panchang = useMemo(
    () => getFullPanchang(selectedDate),
    [selectedDate]
  );

  const muhurats = useMemo(
    () => {
      if (!sunData.sunrise || !sunData.sunset) return [];
      return getAllMuhurats(sunData.sunrise, sunData.sunset, selectedDate.getDay());
    },
    [sunData, selectedDate]
  );

  return (
    <main className={styles.dashboard}>
      <div className="container">
        <DateHero panchang={panchang} />
        <div className={`${styles.grid} stagger-children`} ref={gridRef}>
          <PanchangPanel panchang={panchang} />
          <SunPanel data={sunData} />
          <MoonPanel data={moonData} />
          <MuhuratPanel muhurats={muhurats} />
          <FestivalPanel date={selectedDate} />
        </div>
      </div>
    </main>
  );
}

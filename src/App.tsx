import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/layout/PageTransition';
import { ThemeProvider } from '@/context/ThemeContext';
import { LocationProvider } from '@/context/LocationContext';
import { DateProvider } from '@/context/DateContext';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/layout/Footer';
import { Dashboard } from '@/pages/home/Dashboard';
import { PanchangPage } from '@/pages/panchang/PanchangPage';
import { CalendarPage } from '@/pages/calendar/CalendarPage';
import { FestivalsPage } from '@/pages/festivals/FestivalsPage';
import { MuhuratPage } from '@/pages/muhurat/MuhuratPage';
import { AstronomyPage } from '@/pages/astronomy/AstronomyPage';
import { SearchPage } from '@/pages/search/SearchPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { DevotionalPage } from '@/pages/devotional/DevotionalPage';
import { HoroscopePage } from '@/pages/horoscope/HoroscopePage';
import { VratPage } from '@/pages/vrat/VratPage';
import { KnowledgePage } from '@/pages/knowledge/KnowledgePage';
import { PersonalCalendar } from '@/pages/personal/PersonalCalendar';
import { RegionalCalendar } from '@/pages/regional/RegionalCalendar';
import { NakshatraPage } from '@/pages/nakshatra/NakshatraPage';
import { KundliPage } from '@/pages/kundli/KundliPage';
import { TemplesPage } from '@/pages/temples/TemplesPage';
import { RecipesPage } from '@/pages/recipes/RecipesPage';
import { YogaPage } from '@/pages/yoga/YogaPage';
import { SamvatConverter } from '@/pages/samvat/SamvatConverter';
import { NumerologyPage } from '@/pages/numerology/NumerologyPage';
import { DailyWisdomPage } from '@/pages/wisdom/DailyWisdomPage';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
          {title}
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Coming soon</p>
      </div>
    </main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition key={location.pathname}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/panchang" element={<PanchangPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/festivals" element={<FestivalsPage />} />
        <Route path="/muhurat" element={<MuhuratPage />} />
        <Route path="/astronomy" element={<AstronomyPage />} />
        <Route path="/devotional" element={<DevotionalPage />} />
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/vrat" element={<VratPage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
        <Route path="/personal" element={<PersonalCalendar />} />
        <Route path="/regional" element={<RegionalCalendar />} />
        <Route path="/nakshatra" element={<NakshatraPage />} />
        <Route path="/kundli" element={<KundliPage />} />
        <Route path="/temples" element={<TemplesPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/yoga" element={<YogaPage />} />
        <Route path="/samvat" element={<SamvatConverter />} />
        <Route path="/numerology" element={<NumerologyPage />} />
        <Route path="/wisdom" element={<DailyWisdomPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
      </Routes>
      <Footer />
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LocationProvider>
          <DateProvider>
            <Header />
            <AnimatedRoutes />
          </DateProvider>
        </LocationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

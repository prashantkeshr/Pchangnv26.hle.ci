import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Location } from '@/types';

const DEFAULT_LOCATION: Location = {
  name: 'New Delhi',
  state: 'Delhi',
  country: 'India',
  lat: 28.6139,
  lng: 77.209,
  tz: 'Asia/Kolkata',
};

export const CITIES: Location[] = [
  { name: 'New Delhi', state: 'Delhi', country: 'India', lat: 28.6139, lng: 77.209, tz: 'Asia/Kolkata' },
  { name: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.076, lng: 72.8777, tz: 'Asia/Kolkata' },
  { name: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lng: 88.3639, tz: 'Asia/Kolkata' },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lng: 80.2707, tz: 'Asia/Kolkata' },
  { name: 'Bengaluru', state: 'Karnataka', country: 'India', lat: 12.9716, lng: 77.5946, tz: 'Asia/Kolkata' },
  { name: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.385, lng: 78.4867, tz: 'Asia/Kolkata' },
  { name: 'Ahmedabad', state: 'Gujarat', country: 'India', lat: 23.0225, lng: 72.5714, tz: 'Asia/Kolkata' },
  { name: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lng: 73.8567, tz: 'Asia/Kolkata' },
  { name: 'Jaipur', state: 'Rajasthan', country: 'India', lat: 26.9124, lng: 75.7873, tz: 'Asia/Kolkata' },
  { name: 'Lucknow', state: 'Uttar Pradesh', country: 'India', lat: 26.8467, lng: 80.9462, tz: 'Asia/Kolkata' },
  { name: 'Varanasi', state: 'Uttar Pradesh', country: 'India', lat: 25.3176, lng: 82.9739, tz: 'Asia/Kolkata' },
  { name: 'Patna', state: 'Bihar', country: 'India', lat: 25.5941, lng: 85.1376, tz: 'Asia/Kolkata' },
  { name: 'Bhubaneswar', state: 'Odisha', country: 'India', lat: 20.2961, lng: 85.8245, tz: 'Asia/Kolkata' },
  { name: 'Ranchi', state: 'Jharkhand', country: 'India', lat: 23.3441, lng: 85.3096, tz: 'Asia/Kolkata' },
  { name: 'Hazaribagh', state: 'Jharkhand', country: 'India', lat: 23.9925, lng: 85.3637, tz: 'Asia/Kolkata' },
  { name: 'Thiruvananthapuram', state: 'Kerala', country: 'India', lat: 8.5241, lng: 76.9366, tz: 'Asia/Kolkata' },
  { name: 'Guwahati', state: 'Assam', country: 'India', lat: 26.1445, lng: 91.7362, tz: 'Asia/Kolkata' },
  { name: 'Chandigarh', state: 'Punjab', country: 'India', lat: 30.7333, lng: 76.7794, tz: 'Asia/Kolkata' },
  { name: 'Indore', state: 'Madhya Pradesh', country: 'India', lat: 22.7196, lng: 75.8577, tz: 'Asia/Kolkata' },
  { name: 'Ujjain', state: 'Madhya Pradesh', country: 'India', lat: 23.1765, lng: 75.7885, tz: 'Asia/Kolkata' },
];

interface LocationContextValue {
  location: Location;
  setLocation: (loc: Location) => void;
  cities: Location[];
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<Location>(() => {
    try {
      const saved = localStorage.getItem('panchang-location');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return DEFAULT_LOCATION;
  });

  const setLocation = (loc: Location) => {
    setLocationState(loc);
    try {
      localStorage.setItem('panchang-location', JSON.stringify(loc));
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (!navigator.geolocation) return;
    try {
      const saved = localStorage.getItem('panchang-location');
      if (saved) return;
    } catch { /* ignore */ }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = CITIES.reduce((closest, city) => {
          const dist = Math.hypot(city.lat - pos.coords.latitude, city.lng - pos.coords.longitude);
          const closestDist = Math.hypot(closest.lat - pos.coords.latitude, closest.lng - pos.coords.longitude);
          return dist < closestDist ? city : closest;
        }, CITIES[0]!);
        setLocation(nearest);
      },
      () => { /* user denied */ }
    );
  }, []);

  return (
    <LocationContext value={{ location, setLocation, cities: CITIES }}>
      {children}
    </LocationContext>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}

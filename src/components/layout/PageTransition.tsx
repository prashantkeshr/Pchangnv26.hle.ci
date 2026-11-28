import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export function PageTransition({ children }: Props) {
  const location = useLocation();
  return (
    <div key={location.pathname} style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeInUp 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>
      {children}
    </div>
  );
}

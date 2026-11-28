interface SvgProps {
  size?: number;
  className?: string;
  opacity?: number;
}

export function MandalaRing({ size = 200, className, opacity = 0.12 }: SvgProps) {
  const r = size / 2;
  const petals = 12;
  const paths: string[] = [];
  for (let i = 0; i < petals; i++) {
    const angle = (i * 360) / petals;
    const rad = (angle * Math.PI) / 180;
    const x = r + Math.cos(rad) * r * 0.6;
    const y = r + Math.sin(rad) * r * 0.6;
    paths.push(`M ${r} ${r} Q ${r + Math.cos(rad - 0.3) * r * 0.9} ${r + Math.sin(rad - 0.3) * r * 0.9} ${x} ${y} Q ${r + Math.cos(rad + 0.3) * r * 0.9} ${r + Math.sin(rad + 0.3) * r * 0.9} ${r} ${r}`);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={{ opacity }}>
      <circle cx={r} cy={r} r={r * 0.95} fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" />
      <circle cx={r} cy={r} r={r * 0.7} fill="none" stroke="var(--accent-primary)" strokeWidth="0.3" />
      <circle cx={r} cy={r} r={r * 0.4} fill="none" stroke="var(--accent-primary)" strokeWidth="0.3" />
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        const rad = (angle * Math.PI) / 180;
        return (
          <circle key={i} cx={r + Math.cos(rad) * r * 0.7} cy={r + Math.sin(rad) * r * 0.7} r={2} fill="var(--accent-primary)" />
        );
      })}
    </svg>
  );
}

export function LotusFlower({ size = 120, className, opacity = 0.15 }: SvgProps) {
  const cx = size / 2;
  const cy = size / 2;
  const petalCount = 8;
  const innerPetalCount = 8;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={{ opacity }}>
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i * 360) / petalCount - 90;
        const rad = (angle * Math.PI) / 180;
        const px = cx + Math.cos(rad) * size * 0.35;
        const py = cy + Math.sin(rad) * size * 0.35;
        return (
          <ellipse
            key={`outer-${i}`}
            cx={px}
            cy={py}
            rx={size * 0.14}
            ry={size * 0.08}
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="0.6"
            transform={`rotate(${angle} ${px} ${py})`}
          />
        );
      })}
      {Array.from({ length: innerPetalCount }).map((_, i) => {
        const angle = (i * 360) / innerPetalCount - 90 + 22.5;
        const rad = (angle * Math.PI) / 180;
        const px = cx + Math.cos(rad) * size * 0.2;
        const py = cy + Math.sin(rad) * size * 0.2;
        return (
          <ellipse
            key={`inner-${i}`}
            cx={px}
            cy={py}
            rx={size * 0.09}
            ry={size * 0.05}
            fill="none"
            stroke="var(--accent-secondary)"
            strokeWidth="0.5"
            transform={`rotate(${angle} ${px} ${py})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={size * 0.06} fill="none" stroke="var(--accent-primary)" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={size * 0.025} fill="var(--accent-primary)" />
    </svg>
  );
}

export function SriYantra({ size = 160, className, opacity = 0.1 }: SvgProps) {
  const cx = size / 2;
  const cy = size / 2;
  const s = size * 0.4;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={{ opacity }}>
      <circle cx={cx} cy={cy} r={size * 0.46} fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={size * 0.42} fill="none" stroke="var(--accent-primary)" strokeWidth="0.3" />
      {/* Upward triangle */}
      <polygon
        points={`${cx},${cy - s} ${cx - s * 0.87},${cy + s * 0.5} ${cx + s * 0.87},${cy + s * 0.5}`}
        fill="none" stroke="var(--accent-primary)" strokeWidth="0.6"
      />
      {/* Downward triangle */}
      <polygon
        points={`${cx},${cy + s * 0.8} ${cx - s * 0.75},${cy - s * 0.35} ${cx + s * 0.75},${cy - s * 0.35}`}
        fill="none" stroke="var(--accent-secondary)" strokeWidth="0.6"
      />
      {/* Inner triangles */}
      <polygon
        points={`${cx},${cy - s * 0.5} ${cx - s * 0.43},${cy + s * 0.25} ${cx + s * 0.43},${cy + s * 0.25}`}
        fill="none" stroke="var(--accent-primary)" strokeWidth="0.4"
      />
      <polygon
        points={`${cx},${cy + s * 0.4} ${cx - s * 0.37},${cy - s * 0.17} ${cx + s * 0.37},${cy - s * 0.17}`}
        fill="none" stroke="var(--accent-secondary)" strokeWidth="0.4"
      />
      <circle cx={cx} cy={cy} r={3} fill="var(--accent-primary)" />
    </svg>
  );
}

export function OmSymbol({ size = 60, className, opacity = 0.15 }: SvgProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} style={{ opacity }}>
      <text x="30" y="42" textAnchor="middle" fontSize="36" fontFamily="var(--font-serif)" fill="var(--accent-primary)">
        ॐ
      </text>
    </svg>
  );
}

export function ChakraWheel({ size = 100, className, opacity = 0.12 }: SvgProps) {
  const cx = size / 2;
  const cy = size / 2;
  const spokes = 24;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={{ opacity }}>
      <circle cx={cx} cy={cy} r={size * 0.45} fill="none" stroke="var(--accent-secondary)" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={size * 0.3} fill="none" stroke="var(--accent-secondary)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={size * 0.12} fill="none" stroke="var(--accent-secondary)" strokeWidth="0.6" />
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i * 360) / spokes;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx + Math.cos(rad) * size * 0.12}
            y1={cy + Math.sin(rad) * size * 0.12}
            x2={cx + Math.cos(rad) * size * 0.45}
            y2={cy + Math.sin(rad) * size * 0.45}
            stroke="var(--accent-secondary)"
            strokeWidth="0.4"
          />
        );
      })}
    </svg>
  );
}

export function FloatingParticles({ count = 20, className }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
  }));

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--accent-primary)',
            opacity: 0.15,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function DecorativeCorner({ position = 'top-left', size = 80 }: { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; size?: number }) {
  const transforms: Record<string, string> = {
    'top-left': 'none',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1)',
  };

  const positions: Record<string, React.CSSProperties> = {
    'top-left': { top: 0, left: 0 },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      style={{
        position: 'absolute',
        ...positions[position],
        transform: transforms[position],
        opacity: 0.08,
        pointerEvents: 'none',
      }}
    >
      <path d="M 0 0 L 60 0 Q 40 10 30 30 Q 10 40 0 60 Z" fill="var(--accent-primary)" />
      <path d="M 0 0 L 40 0 Q 25 8 18 18 Q 8 25 0 40 Z" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" />
    </svg>
  );
}

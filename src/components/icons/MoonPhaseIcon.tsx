interface Props {
  phase: number;
  size?: number;
  className?: string;
}

export function MoonPhaseIcon({ phase, size = 48, className }: Props) {
  const r = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;

  const angle = phase * 360;
  let d: string;

  if (angle <= 180) {
    const sweep = Math.cos((angle * Math.PI) / 180) * r;
    d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${Math.abs(sweep)} ${r} 0 0 ${sweep >= 0 ? 1 : 0} ${cx} ${cy - r} Z`;
  } else {
    const sweep = Math.cos((angle * Math.PI) / 180) * r;
    d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${Math.abs(sweep)} ${r} 0 0 ${sweep >= 0 ? 0 : 1} ${cx} ${cy - r} Z`;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-label={`Moon phase: ${Math.round(phase * 100)}% illuminated`}
    >
      <circle cx={cx} cy={cy} r={r} fill="var(--bg-tertiary)" stroke="var(--border-secondary)" strokeWidth="1" />
      <path d={d} fill="var(--accent-primary)" opacity="0.9" />
    </svg>
  );
}

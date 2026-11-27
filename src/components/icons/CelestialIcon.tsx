interface Props {
  size?: number;
  className?: string;
}

export function CelestialIcon({ size = 32, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(256,256)">
        <g stroke="var(--accent-primary)" strokeWidth="3.5" strokeLinecap="round">
          <line x1="0" y1="-85" x2="0" y2="-155"/>
          <line x1="0" y1="85" x2="0" y2="155"/>
          <line x1="-85" y1="0" x2="-155" y2="0"/>
          <line x1="85" y1="0" x2="155" y2="0"/>
          <line x1="-60" y1="-60" x2="-110" y2="-110"/>
          <line x1="60" y1="-60" x2="110" y2="-110"/>
          <line x1="-60" y1="60" x2="-110" y2="110"/>
          <line x1="60" y1="60" x2="110" y2="110"/>
        </g>
        <g stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round">
          <line x1="-32" y1="-80" x2="-52" y2="-130"/>
          <line x1="32" y1="-80" x2="52" y2="-130"/>
          <line x1="-80" y1="-32" x2="-130" y2="-52"/>
          <line x1="80" y1="-32" x2="130" y2="-52"/>
          <line x1="-32" y1="80" x2="-52" y2="130"/>
          <line x1="32" y1="80" x2="52" y2="130"/>
          <line x1="-80" y1="32" x2="-130" y2="52"/>
          <line x1="80" y1="32" x2="130" y2="52"/>
        </g>
        <g stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round">
          <line x1="-16" y1="-83" x2="-24" y2="-118"/>
          <line x1="16" y1="-83" x2="24" y2="-118"/>
          <line x1="-48" y1="-68" x2="-75" y2="-108"/>
          <line x1="48" y1="-68" x2="75" y2="-108"/>
          <line x1="-68" y1="-48" x2="-108" y2="-75"/>
          <line x1="68" y1="-48" x2="108" y2="-75"/>
          <line x1="-83" y1="-16" x2="-118" y2="-24"/>
          <line x1="83" y1="-16" x2="118" y2="-24"/>
          <line x1="-83" y1="16" x2="-118" y2="24"/>
          <line x1="83" y1="16" x2="118" y2="24"/>
          <line x1="-68" y1="48" x2="-108" y2="75"/>
          <line x1="68" y1="48" x2="108" y2="75"/>
          <line x1="-48" y1="68" x2="-75" y2="108"/>
          <line x1="48" y1="68" x2="75" y2="108"/>
          <line x1="-16" y1="83" x2="-24" y2="118"/>
          <line x1="16" y1="83" x2="24" y2="118"/>
        </g>
        <circle cx="0" cy="0" r="70" fill="var(--accent-primary)"/>
        <circle cx="-28" cy="-8" r="52" fill="var(--bg-primary)"/>
        <path d="M -10 -65 A 70 70 0 0 0 -38 60" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5"/>
      </g>
    </svg>
  );
}

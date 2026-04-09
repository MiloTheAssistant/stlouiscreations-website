interface MaterialVisualProps {
  material: string;
}

/**
 * Abstract SVG illustrations representing each material.
 * Designed to match the dark industrial aesthetic (#0a0a0a / #FF6B00).
 */
export default function MaterialVisual({ material }: MaterialVisualProps) {
  const visuals: Record<string, React.ReactNode> = {
    Acrylic: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <linearGradient id="acrylic-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="acrylic-b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="#0f0f0f" />
        <g transform="translate(400 400)">
          <rect x="-220" y="-220" width="440" height="440" fill="url(#acrylic-a)" stroke="#FF6B00" strokeWidth="1.5" strokeOpacity="0.4" transform="rotate(-8)" />
          <rect x="-200" y="-200" width="400" height="400" fill="url(#acrylic-b)" stroke="#FF6B00" strokeWidth="1.5" strokeOpacity="0.3" transform="rotate(4)" />
          <rect x="-180" y="-180" width="360" height="360" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeOpacity="0.5" transform="rotate(12)" />
          <line x1="-250" y1="-150" x2="250" y2="150" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="-250" y1="100" x2="250" y2="-100" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.15" />
        </g>
      </svg>
    ),
    Wood: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <linearGradient id="wood-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a0f0a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#wood-bg)" />
        <g stroke="#8B5A2B" fill="none" strokeLinecap="round">
          <path d="M0 120 Q200 100 400 120 T800 115" strokeWidth="2" strokeOpacity="0.6" />
          <path d="M0 180 Q200 165 400 175 T800 180" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M0 240 Q180 225 400 240 T800 235" strokeWidth="3" strokeOpacity="0.7" />
          <path d="M0 300 Q200 285 400 295 T800 300" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M0 360 Q220 340 400 360 T800 355" strokeWidth="2" strokeOpacity="0.55" />
          <path d="M0 420 Q180 410 400 420 T800 418" strokeWidth="1.5" strokeOpacity="0.45" />
          <path d="M0 480 Q200 465 400 475 T800 480" strokeWidth="3" strokeOpacity="0.65" />
          <path d="M0 540 Q180 525 400 540 T800 535" strokeWidth="1.5" strokeOpacity="0.5" />
          <path d="M0 600 Q220 580 400 600 T800 595" strokeWidth="2" strokeOpacity="0.55" />
          <path d="M0 660 Q200 645 400 655 T800 660" strokeWidth="1.5" strokeOpacity="0.4" />
          <path d="M0 720 Q180 705 400 720 T800 715" strokeWidth="2.5" strokeOpacity="0.6" />
        </g>
        <ellipse cx="200" cy="400" rx="40" ry="12" fill="none" stroke="#8B5A2B" strokeWidth="1.5" strokeOpacity="0.3" />
        <ellipse cx="600" cy="250" rx="30" ry="8" fill="none" stroke="#8B5A2B" strokeWidth="1.5" strokeOpacity="0.3" />
      </svg>
    ),
    Glass: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <radialGradient id="glass-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="800" fill="#0a0a0a" />
        <circle cx="400" cy="400" r="300" fill="url(#glass-glow)" />
        <g fill="none" stroke="#ffffff" strokeOpacity="0.4">
          <polygon points="400,150 560,400 400,650 240,400" strokeWidth="2" />
          <polygon points="400,200 510,400 400,600 290,400" strokeWidth="1.5" strokeOpacity="0.3" />
          <polygon points="400,250 460,400 400,550 340,400" strokeWidth="1" strokeOpacity="0.25" />
        </g>
        <g stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.5" fill="none">
          <line x1="400" y1="150" x2="400" y2="650" />
          <line x1="240" y1="400" x2="560" y2="400" />
          <line x1="280" y1="280" x2="520" y2="520" />
          <line x1="280" y1="520" x2="520" y2="280" />
        </g>
        <circle cx="400" cy="400" r="6" fill="#FF6B00" />
      </svg>
    ),
    Metal: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <linearGradient id="metal-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#metal-bg)" />
        <g stroke="#555555" strokeWidth="0.5" strokeOpacity="0.6">
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 20} x2="800" y2={i * 20} />
          ))}
        </g>
        <g stroke="#888888" strokeWidth="1" strokeOpacity="0.4">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 40} y1="0" x2={i * 40 + 100} y2="800" />
          ))}
        </g>
        <rect x="200" y="200" width="400" height="400" fill="none" stroke="#FF6B00" strokeWidth="2" strokeOpacity="0.6" />
        <rect x="250" y="250" width="300" height="300" fill="none" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
    Leather: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <radialGradient id="leather-bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1f1410" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
        </defs>
        <rect width="800" height="800" fill="url(#leather-bg)" />
        <g fill="#4a2c17" fillOpacity="0.5">
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 127) % 800;
            const y = (i * 83) % 800;
            const r = 8 + (i % 12);
            return <circle key={i} cx={x} cy={y} r={r} />;
          })}
        </g>
        <g fill="#8B5A2B" fillOpacity="0.3">
          {Array.from({ length: 40 }).map((_, i) => {
            const x = (i * 191) % 800;
            const y = (i * 149) % 800;
            return <circle key={i} cx={x} cy={y} r="4" />;
          })}
        </g>
        <g stroke="#FF6B00" strokeOpacity="0.4" fill="none">
          <path d="M150 150 L650 150 L650 650 L150 650 Z" strokeWidth="2" strokeDasharray="8 4" />
        </g>
      </svg>
    ),
    Stone: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <linearGradient id="stone-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1e" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#stone-bg)" />
        <g fill="none" stroke="#3a3a42" strokeWidth="1.5" strokeOpacity="0.7">
          <polygon points="100,100 280,150 220,320 60,260" />
          <polygon points="280,150 480,80 540,280 340,300" />
          <polygon points="480,80 700,150 720,340 540,280" />
          <polygon points="60,260 220,320 160,520 30,440" />
          <polygon points="220,320 340,300 380,520 200,540" />
          <polygon points="340,300 540,280 560,500 380,520" />
          <polygon points="540,280 720,340 730,540 560,500" />
          <polygon points="30,440 160,520 180,700 40,680" />
          <polygon points="160,520 200,540 260,720 180,700" />
          <polygon points="200,540 380,520 400,720 260,720" />
          <polygon points="380,520 560,500 580,720 400,720" />
          <polygon points="560,500 730,540 750,720 580,720" />
        </g>
        <g fill="#FF6B00" fillOpacity="0.3">
          <circle cx="400" cy="400" r="4" />
          <circle cx="200" cy="250" r="3" />
          <circle cx="600" cy="450" r="3" />
        </g>
      </svg>
    ),
    Fabric: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <pattern id="fabric-weave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#0f0f0f" />
            <rect x="0" y="0" width="20" height="20" fill="#1f1f1f" />
            <rect x="20" y="20" width="20" height="20" fill="#1f1f1f" />
            <line x1="0" y1="10" x2="40" y2="10" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="0" y1="30" x2="40" y2="30" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="10" y1="0" x2="10" y2="40" stroke="#2a2a2a" strokeWidth="1" />
            <line x1="30" y1="0" x2="30" y2="40" stroke="#2a2a2a" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="800" fill="url(#fabric-weave)" />
        <g opacity="0.8">
          <rect x="150" y="150" width="500" height="500" fill="none" stroke="#FF6B00" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="150" y1="400" x2="650" y2="400" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.4" />
          <line x1="400" y1="150" x2="400" y2="650" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.4" />
        </g>
      </svg>
    ),
    Rubber: (
      <svg viewBox="0 0 800 800" className="w-full h-full">
        <defs>
          <radialGradient id="rubber-bg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#171717" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
        </defs>
        <rect width="800" height="800" fill="url(#rubber-bg)" />
        <g fill="#2a2a2a">
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={80 + col * 72}
                cy={80 + row * 72}
                r="18"
              />
            ))
          )}
        </g>
        <g fill="#FF6B00" fillOpacity="0.15">
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={80 + col * 72}
                cy={80 + row * 72}
                r="6"
              />
            ))
          )}
        </g>
      </svg>
    ),
  };

  return (
    <div className="absolute inset-0">
      {visuals[material] || visuals.Metal}
    </div>
  );
}

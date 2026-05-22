export default function Logo({ className = "", width = 200, height = 200 }) {
  return (
    <svg 
      className={className} 
      width={width} 
      height={height} 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Glow / Atmosphere */}
      <defs>
        <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: "#c3f400", stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: "#c3f400", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#neonGlow)" />
      
      {/* Stylized Padel Racket */}
      <path 
        d="M70 120 L50 160 Q45 170 55 175 L60 172 Q70 168 75 155 L95 115" 
        fill="#333" 
        stroke="#c3f400" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      <circle cx="110" cy="85" r="45" fill="#1A1A1A" stroke="#c3f400" strokeWidth="6" />
      
      {/* Padel Ball with Motion */}
      <circle cx="135" cy="65" r="12" fill="#c3f400">
        <animate attributeName="cy" values="65;60;65" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M145 55 Q155 45 165 50" stroke="#c3f400" strokeWidth="2" fill="none" opacity="0.6">
        <animate attributeName="stroke-dasharray" values="0,20; 20,0" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Brand Initial 'P' */}
      <text 
        x="110" 
        y="100" 
        fontFamily="Outfit, sans-serif" 
        fontWeight="900" 
        fontSize="40" 
        fill="#c3f400" 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        P
      </text>
    </svg>
  );
}

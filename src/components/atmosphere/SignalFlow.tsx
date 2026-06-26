interface SignalFlowProps {
  className?: string;
  intensity?: "subtle" | "active" | "discovery";
}

export function SignalFlow({ className = "", intensity = "subtle" }: SignalFlowProps) {
  const opacity = intensity === "discovery" ? 0.7 : intensity === "active" ? 0.5 : 0.25;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 174, 239, 0)" />
          <stop offset="50%" stopColor="rgba(18, 216, 255, 0.6)" />
          <stop offset="100%" stopColor="rgba(47, 128, 255, 0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,80 Q200,40 400,90 T800,60 T1200,100"
        fill="none"
        stroke="url(#signal-gradient)"
        strokeWidth="1.5"
        strokeDasharray="8 12"
        opacity={opacity}
        className="animate-signal-flow"
      />
      <path
        d="M0,200 Q300,160 600,220 T1200,180"
        fill="none"
        stroke="url(#signal-gradient)"
        strokeWidth="1"
        strokeDasharray="6 10"
        opacity={opacity * 0.6}
        className="animate-signal-flow-delayed"
      />
    </svg>
  );
}

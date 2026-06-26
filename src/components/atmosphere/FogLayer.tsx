interface FogLayerProps {
  /** 0 = clear, 1 = fully fogged */
  density?: number;
  className?: string;
  animated?: boolean;
}

export function FogLayer({ density = 0.6, className = "", animated = true }: FogLayerProps) {
  const opacity = Math.min(1, Math.max(0, density));

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{ opacity }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b from-fog-mist/40 via-fog-deep/20 to-mbn-bg/80 ${
          animated ? "animate-fog-drift" : ""
        }`}
      />
      <div
        className={`absolute -left-1/4 top-1/4 h-1/2 w-3/4 rounded-full bg-fog-mist/30 blur-3xl ${
          animated ? "animate-fog-roll" : ""
        }`}
      />
      <div
        className={`absolute -right-1/4 bottom-0 h-2/5 w-2/3 rounded-full bg-fog-deep/25 blur-3xl ${
          animated ? "animate-fog-roll-slow" : ""
        }`}
      />
    </div>
  );
}

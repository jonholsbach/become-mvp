"use client";

import { useEffect, useState } from "react";

interface FogRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

export function FogReveal({ children, delayMs = 0, className = "" }: FogRevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface UnknownMetricProps {
  label: string;
  revealed?: boolean;
  value?: string;
  delayMs?: number;
}

export function UnknownMetric({ label, revealed = false, value, delayMs = 0 }: UnknownMetricProps) {
  if (!revealed) {
    return (
      <div className="rounded-xl border border-white/5 bg-mbn-panel/20 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">{label}</p>
        <p className="mt-2 font-display text-lg text-fog-mist/60">Unknown</p>
      </div>
    );
  }

  return (
    <FogReveal delayMs={delayMs}>
      <div className="rounded-xl border border-electric-primary/20 bg-electric-glow/5 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">{label}</p>
        <p className="mt-2 text-sm leading-relaxed text-mbn-white">{value}</p>
      </div>
    </FogReveal>
  );
}

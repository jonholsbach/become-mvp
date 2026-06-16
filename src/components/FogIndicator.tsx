import type { FogMetrics } from "@/lib/pillars";

interface FogIndicatorProps {
  metrics: FogMetrics;
  compact?: boolean;
}

export function FogIndicator({ metrics, compact = false }: FogIndicatorProps) {
  const items = [
    { label: "Visibility", value: metrics.visibility },
    { label: "Fog cleared", value: `${metrics.fogClearedPercent}%` },
    { label: "Back sphere access", value: `${metrics.backSphereAccessPercent}%` },
    { label: "New signals", value: String(metrics.newSignalsDetected) },
    { label: "Missions available", value: String(metrics.missionsAvailable) },
  ];

  if (metrics.forwardDriftDetected) {
    items.push({ label: "Alert", value: "Forward drift detected" });
  }

  return (
    <div className={`glass-panel border-electric-glow/10 ${compact ? "p-4" : "p-5"}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
        Fog of Awareness
      </p>
      {!compact && (
        <p className="mt-1 text-xs text-mbn-steel-dim">
          Awareness is the light. Fog is missing signal, distorted pattern, and unexplored territory.
        </p>
      )}
      <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3"}`}>
        {items.map((item) => (
          <div key={item.label} className="rounded-lg bg-mbn-navy/50 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-mbn-steel-dim">{item.label}</p>
            <p className="mt-0.5 text-sm font-medium text-mbn-white">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-[10px] text-mbn-steel-dim">
          <span>Territory revealed</span>
          <span>{metrics.fogClearedPercent}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mbn-navy">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric-glow/50 to-electric-bright transition-all"
            style={{ width: `${metrics.fogClearedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

import type { AssessmentMetrics } from "@/lib/types";

interface AssessmentMetricsPanelProps {
  metrics: AssessmentMetrics;
  compact?: boolean;
}

export function AssessmentMetricsPanel({ metrics, compact = false }: AssessmentMetricsPanelProps) {
  return (
    <div className={`rounded-2xl border border-electric-primary/20 bg-gradient-to-br from-electric-glow/10 to-transparent ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
        Scan Results · Fog lifting
      </p>

      <div className={`mt-4 grid gap-4 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        <MetricBlock label="Center Score" value={`${metrics.centerScore}/100`} accent />
        <MetricBlock label="Current Vector" value={metrics.currentVector} />
        <MetricBlock label="Primary Mission" value={metrics.primaryMission} />
        <MetricBlock label="Recommended Direction" value={metrics.recommendedDirection} />
        <MetricBlock
          label="Red Territory"
          value={metrics.redTerritory.join(" · ") || "None mapped"}
          variant="red"
        />
        <MetricBlock
          label="Blue Territory"
          value={metrics.blueTerritory.join(" · ") || "None mapped"}
          variant="blue"
        />
      </div>

      <div className="mt-5 rounded-xl border border-white/5 bg-mbn-panel/30 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
          Predicted experience
        </p>
        <p className="mt-2 text-sm italic text-mbn-steel">&ldquo;{metrics.predictedExperience}&rdquo;</p>
      </div>
    </div>
  );
}

function MetricBlock({
  label,
  value,
  accent,
  variant,
}: {
  label: string;
  value: string;
  accent?: boolean;
  variant?: "red" | "blue";
}) {
  const borderClass =
    variant === "red"
      ? "border-red-500/20"
      : variant === "blue"
        ? "border-electric-primary/20"
        : accent
          ? "border-electric-primary/30"
          : "border-white/5";

  return (
    <div className={`rounded-xl border ${borderClass} bg-mbn-panel/30 p-4`}>
      <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">{label}</p>
      <p className={`mt-1 text-sm leading-relaxed ${accent ? "font-semibold text-mbn-white" : "text-mbn-steel"}`}>
        {value}
      </p>
    </div>
  );
}

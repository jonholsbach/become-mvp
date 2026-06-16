import { PILLARS, type PillarStatus } from "@/lib/pillars";

const STATUS_STYLES: Record<PillarStatus, string> = {
  locked: "border-white/5 bg-mbn-navy/30 opacity-60",
  available: "border-electric-primary/40 bg-electric-glow/10 shadow-glow-sm",
  discovered: "border-electric-bright/30 bg-electric-primary/5",
};

const STATUS_LABELS: Record<PillarStatus, string> = {
  locked: "Locked",
  available: "Available",
  discovered: "Discovered",
};

interface JourneyMapProps {
  compact?: boolean;
}

export function JourneyMap({ compact = false }: JourneyMapProps) {
  return (
    <div>
      {!compact && (
        <p className="mb-6 max-w-2xl text-sm text-mbn-steel">
          Each mission pushes back the fog. Every breath, position, contraction, and reflection
          reveals more of the system you live inside.
        </p>
      )}
      <div className={`grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {PILLARS.map((pillar, index) => (
          <div
            key={pillar.id}
            className={`relative rounded-xl border p-4 transition-all ${STATUS_STYLES[pillar.status]}`}
          >
            {index < PILLARS.length - 1 && !compact && (
              <span className="absolute -right-2 top-1/2 hidden translate-x-full text-electric-primary/30 lg:inline">
                →
              </span>
            )}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-electric-bright">
                {pillar.name}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  pillar.status === "available"
                    ? "bg-electric-primary/20 text-electric-bright"
                    : pillar.status === "discovered"
                      ? "bg-white/10 text-mbn-white"
                      : "bg-white/5 text-mbn-steel-dim"
                }`}
              >
                {STATUS_LABELS[pillar.status]}
              </span>
            </div>
            {!compact && (
              <>
                <p className="mt-2 text-xs leading-relaxed text-mbn-steel">{pillar.journeyCopy}</p>
                <p className="mt-2 text-[10px] italic text-mbn-steel-dim">{pillar.fogLanguage}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

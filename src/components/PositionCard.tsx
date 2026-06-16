import type { PositionCardData } from "@/lib/types";

interface PositionCardProps {
  data: PositionCardData;
}

export function PositionCard({ data }: PositionCardProps) {
  const fields = [
    { label: "Default Position", value: data.defaultPosition },
    { label: "Opposite Coordinate", value: data.oppositeCoordinate },
    { label: "Direction Back to Center", value: data.directionBackToCenter },
    { label: "Time to Spend There", value: data.timeToSpendThere },
  ];

  return (
    <div className="glass-panel border-electric-primary/10 p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
        Position Card
      </p>
      <p className="mt-1 text-xs text-mbn-steel-dim">
        Positions are coordinates. Reps and sets are tools — time in a new coordinate is the point.
      </p>
      <dl className="mt-4 space-y-3">
        {fields.map((field) => (
          <div key={field.label} className="rounded-lg bg-mbn-navy/40 px-4 py-3">
            <dt className="text-[10px] font-medium uppercase tracking-wider text-mbn-steel-dim">
              {field.label}
            </dt>
            <dd className="mt-1 text-sm text-mbn-white">{field.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

import type { SignalMapRegion } from "@/lib/types";

const SIGNAL_STYLES = {
  red: "border-red-500/40 bg-red-500/10 text-red-300",
  blue: "border-blue-400/40 bg-blue-400/10 text-blue-300",
  integrated: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
};

const SIGNAL_LABELS = {
  red: "High tension / distorted signal",
  blue: "Low signal / dormant pathway",
  integrated: "Coherent / integrated",
};

interface TensionMapProps {
  regions: SignalMapRegion[];
}

export function TensionMap({ regions }: TensionMapProps) {
  const grouped = {
    red: regions.filter((r) => r.signal === "red"),
    blue: regions.filter((r) => r.signal === "blue"),
    integrated: regions.filter((r) => r.signal === "integrated"),
  };

  return (
    <div className="glass-panel p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">Signal Map</p>
      <p className="mt-2 text-sm text-mbn-steel">
        Red does not mean broken. Blue does not mean weak. The map shows where the system has
        adapted — and where awareness must return.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {(["red", "blue", "integrated"] as const).map((signal) => (
          <div key={signal}>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-mbn-steel-dim">
              {SIGNAL_LABELS[signal]}
            </p>
            <ul className="space-y-2">
              {grouped[signal].map((region) => (
                <li
                  key={region.name}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${SIGNAL_STYLES[signal]}`}
                >
                  {region.name}
                </li>
              ))}
              {grouped[signal].length === 0 && (
                <li className="rounded-lg border border-dashed border-white/10 px-3 py-2 text-xs text-mbn-steel-dim">
                  None detected yet
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

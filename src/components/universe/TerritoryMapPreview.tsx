import type { MapNode } from "@/lib/domain/maps";

interface TerritoryMapPreviewProps {
  nodes: MapNode[];
  fogClearedPercent: number;
}

export function TerritoryMapPreview({ nodes, fogClearedPercent }: TerritoryMapPreviewProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 bg-mbn-navy/40">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 60%, rgba(11, 40, 28, 0.5) 0%, transparent 50%), radial-gradient(circle at 30% 40%, rgba(0, 174, 239, 0.08) 0%, transparent 40%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" aria-label="Territory map preview">
        {nodes.map((node) => {
          const x = node.coordinates.x * 100;
          const y = node.coordinates.y * 100;
          const colors = {
            red: "rgba(239, 68, 68, 0.7)",
            blue: "rgba(0, 174, 239, 0.7)",
            integrated: "rgba(18, 216, 255, 0.8)",
            unknown: "rgba(170, 183, 196, 0.4)",
          };

          return (
            <g key={node.id}>
              {node.unlocked && (
                <line
                  x1="50%"
                  y1="55%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="rgba(18, 216, 255, 0.15)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              )}
              <circle
                cx={`${x}%`}
                cy={`${y}%`}
                r={node.layer === "territory" ? 6 : 4}
                fill={colors[node.signal]}
                opacity={node.clarity}
              />
              {node.unlocked && (
                <text
                  x={`${x}%`}
                  y={`${y + 5}%`}
                  textAnchor="middle"
                  className="fill-mbn-steel text-[8px]"
                >
                  {node.label.split(" ")[0]}
                </text>
              )}
            </g>
          );
        })}
        <circle cx="50%" cy="55%" r="8" fill="rgba(18, 216, 255, 0.3)" stroke="rgba(0, 174, 239, 0.6)" />
        <text x="50%" y="58%" textAnchor="middle" className="fill-electric-bright text-[9px] font-medium">
          Center
        </text>
      </svg>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mbn-bg/60 to-transparent"
        style={{ opacity: Math.max(0, 1 - fogClearedPercent / 25) }}
      />
      <p className="absolute bottom-3 left-4 text-xs text-mbn-steel-dim">
        Territory Map · {fogClearedPercent}% fog cleared
      </p>
    </div>
  );
}

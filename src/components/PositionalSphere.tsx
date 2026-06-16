interface PositionalSphereProps {
  backSphereAccessPercent: number;
  forwardDriftDetected?: boolean;
  fogClearedPercent?: number;
}

export function PositionalSphere({
  backSphereAccessPercent,
  forwardDriftDetected = true,
  fogClearedPercent = 8,
}: PositionalSphereProps) {
  return (
    <div className="glass-panel p-5 sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
        Positional Sphere
      </p>
      <p className="mt-1 text-xs text-mbn-steel-dim">
        Center is balanced access. Modern life pulls many forward — the back of the sphere fades
        into fog.
      </p>

      <div className="relative mx-auto mt-6 flex h-48 w-48 items-center justify-center">
        {/* Outer sphere ring */}
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-3 rounded-full border border-dashed border-white/5" />

        {/* Fog on back hemisphere (visual: left side) */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-l from-mbn-navy/80 via-transparent to-transparent"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        />

        {/* Back sphere access arc */}
        <div
          className="absolute inset-0 rounded-full border-2 border-electric-primary/30"
          style={{
            clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
            opacity: backSphereAccessPercent / 100 + 0.2,
          }}
        />

        {/* Center dot */}
        <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-electric-bright shadow-glow-sm">
          <span className="sr-only">Center</span>
        </div>

        {/* Forward drift marker */}
        {forwardDriftDetected && (
          <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
            <div className="h-2 w-2 rounded-full bg-red-400/80 shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
            <p className="mt-1 whitespace-nowrap text-[9px] text-red-300/80">Forward drift</p>
          </div>
        )}

        {/* Unlocked coordinate marker */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="h-2 w-2 rounded-full bg-electric-bright shadow-glow-sm" />
          <p className="mt-1 whitespace-nowrap text-[9px] text-electric-bright/80">Unlocked</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-mbn-navy/50 px-3 py-2">
          <p className="text-[10px] uppercase text-mbn-steel-dim">Back sphere access</p>
          <p className="text-sm font-medium text-electric-bright">{backSphereAccessPercent}%</p>
        </div>
        <div className="rounded-lg bg-mbn-navy/50 px-3 py-2">
          <p className="text-[10px] uppercase text-mbn-steel-dim">Fog cleared</p>
          <p className="text-sm font-medium text-mbn-white">{fogClearedPercent}%</p>
        </div>
      </div>

      {forwardDriftDetected && (
        <p className="mt-3 text-center text-xs text-red-300/70">Forward drift detected</p>
      )}
    </div>
  );
}

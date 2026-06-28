export type SpherePhase =
  | "rest"
  | "move"
  | "spark"
  | "assemble"
  | "stabilize"
  | "reveal"
  | "complete";

interface GeneratingSphereProps {
  phase: SpherePhase;
  mouseX: number;
  mouseY: number;
  reducedMotion?: boolean;
}

/** Symbolic sphere — journey, awareness, and integrated potential (not literal energy). */
export function GeneratingSphere({
  phase,
  mouseX,
  mouseY,
  reducedMotion = false,
}: GeneratingSphereProps) {
  const active =
    phase === "spark" ||
    phase === "assemble" ||
    phase === "stabilize" ||
    phase === "reveal" ||
    phase === "complete";
  const growing = phase === "assemble" || phase === "stabilize" || phase === "reveal" || phase === "complete";
  const stable = phase === "stabilize" || phase === "reveal" || phase === "complete";

  const leanX = (mouseX - 0.5) * 14;
  const leanY = (mouseY - 0.5) * 10;

  if (!active && !reducedMotion) return null;
  if (reducedMotion && phase !== "complete" && phase !== "reveal") {
    return (
      <div className="generator-sphere pointer-events-none absolute left-[54%] top-[6%] z-30 -translate-x-1/2">
        <div className="generator-sphere-core h-24 w-24 rounded-full opacity-90" />
      </div>
    );
  }

  return (
    <div
      className={`generator-sphere pointer-events-none absolute left-[54%] top-[6%] z-30 -translate-x-1/2 transition-transform duration-[3s] ease-out ${
        phase === "spark" ? "generator-sphere-spark" : ""
      } ${growing ? "generator-sphere-growing" : ""} ${stable ? "generator-sphere-stable" : ""}`}
      style={{
        transform: `translate(calc(-50% + ${leanX}px), ${leanY}px)`,
      }}
      aria-hidden
    >
      {/* Scene 3 — single star of possibility */}
      <div className="generator-sphere-star absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-bright shadow-[0_0_8px_rgba(18,216,255,0.9)]" />

      {/* Core */}
      <div className="generator-sphere-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />

      {/* Hex lattice — order emerging from chaos */}
      <svg
        className="generator-sphere-hex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <defs>
          <pattern id="hex-lattice" width="24" height="20.8" patternUnits="userSpaceOnUse">
            <path
              d="M12 0 L24 6.9 L24 13.9 L12 20.8 L0 13.9 L0 6.9 Z"
              stroke="rgba(18,216,255,0.35)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <circle cx="100" cy="100" r="88" fill="url(#hex-lattice)" opacity="0.55" />
        <circle cx="100" cy="100" r="72" stroke="rgba(0,174,239,0.25)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="56" stroke="rgba(47,128,255,0.2)" strokeWidth="0.5" />
        <ellipse cx="100" cy="100" rx="88" ry="32" stroke="rgba(18,216,255,0.15)" strokeWidth="0.5" transform="rotate(30 100 100)" />
        <ellipse cx="100" cy="100" rx="88" ry="32" stroke="rgba(18,216,255,0.12)" strokeWidth="0.5" transform="rotate(-30 100 100)" />
      </svg>

      {/* Orbiting particles */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="generator-sphere-orbit absolute left-1/2 top-1/2"
          style={{ ["--orbit-i" as string]: i }}
        >
          <div className="generator-sphere-particle h-1 w-1 rounded-full bg-electric-bright/80" />
        </div>
      ))}

      {/* Soft field — symbolic, not literal */}
      <div className="generator-sphere-field absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </div>
  );
}

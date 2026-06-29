import type { SpherePhase } from "@/components/atmosphere/GeneratingSphere";
import { getArmHeroSrc } from "@/lib/brand-assets";

const ARM_SRC = getArmHeroSrc();

interface MechanicalArmVisualProps {
  phase?: SpherePhase;
  reducedMotion?: boolean;
  mouse?: { x: number; y: number };
  className?: string;
}

export function MechanicalArmVisual({
  phase = "complete",
  reducedMotion = false,
  mouse = { x: 0.5, y: 0.5 },
  className = "",
}: MechanicalArmVisualProps) {
  const animating = phase === "move" || phase === "spark" || phase === "assemble";
  const subtleShiftX = (mouse.x - 0.5) * 3;
  const subtleShiftY = (mouse.y - 0.5) * 2;

  return (
    <div
      className={`cinematic-arm-stage relative mx-auto w-[min(48vw,560px)] max-w-none ${className}`}
      data-phase={phase}
      style={{
        transform: `translate(${subtleShiftX}px, ${subtleShiftY}px)`,
        transition: "transform 5s ease-out",
      }}
    >
      <div className="cinematic-arm-glow pointer-events-none absolute left-1/2 top-[38%] z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden />

      <div
        className={`cinematic-arm-motion relative z-10 ${
          reducedMotion ? "" : phase === "rest" ? "cinematic-arm-rest" : animating ? "cinematic-arm-generate" : "cinematic-arm-settled"
        }`}
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 15%, rgba(0,0,0,0.7) 55%, transparent 82%), linear-gradient(to bottom, black 30%, rgba(0,0,0,0.45) 75%, transparent 95%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, black 15%, rgba(0,0,0,0.7) 55%, transparent 82%), linear-gradient(to bottom, black 30%, rgba(0,0,0,0.45) 75%, transparent 95%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ARM_SRC}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="cinematic-arm-image mx-auto h-[min(60vh,600px)] w-auto max-w-none object-contain sm:h-[min(64vh,660px)]"
        />

        {!reducedMotion && animating && (
          <>
            <div className="cinematic-energy-flow pointer-events-none absolute inset-0 mix-blend-screen" aria-hidden />
            <div className="cinematic-tension-line pointer-events-none absolute inset-0 mix-blend-plus-lighter opacity-30" aria-hidden />
          </>
        )}
      </div>

      <div className="cinematic-arm-mist pointer-events-none absolute -bottom-8 left-1/2 z-20 h-36 w-[150%] -translate-x-1/2" aria-hidden />
    </div>
  );
}

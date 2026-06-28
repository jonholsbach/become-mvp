import type { SpherePhase } from "@/components/atmosphere/GeneratingSphere";

interface VolumetricFogProps {
  mode?: "artifact" | "journey" | "cinematic";
  phase?: SpherePhase | "dark" | "move" | "transform";
  expanded?: boolean;
  focalX?: string;
  focalY?: string;
  className?: string;
}

function clearingMask(focalX: string, focalY: string, openness: string) {
  return `
    radial-gradient(ellipse 54% 46% at ${focalX} ${focalY}, rgba(0,0,0,${openness}) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 65%, black 100%),
    radial-gradient(ellipse 36% 30% at calc(${focalX} + 3%) calc(${focalY} + 4%), rgba(0,0,0,0.2) 0%, black 68%)
  `;
}

export function VolumetricFog({
  mode = "journey",
  phase = "complete",
  expanded = false,
  focalX = "50%",
  focalY = "36%",
  className = "",
}: VolumetricFogProps) {
  const isCinematic = mode === "cinematic";

  const openness = expanded
    ? "0.03"
    : phase === "assemble" || phase === "spark"
      ? "0.14"
      : phase === "move"
        ? "0.2"
        : "0.26";

  const fogLayerStyle =
    mode === "artifact" || isCinematic
      ? {
          maskImage: clearingMask(focalX, focalY, openness),
          WebkitMaskImage: clearingMask(focalX, focalY, openness),
        }
      : undefined;

  const mouseShiftX = "calc((var(--mouse-x, 0.5) - 0.5) * 12px)";
  const mouseShiftY = "calc((var(--mouse-y, 0.5) - 0.5) * 8px)";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-mbn-bg/5 to-black/90" />

      <div
        className="absolute inset-0 transition-[mask-image] duration-[4s]"
        style={{
          ...fogLayerStyle,
          transform: isCinematic ? `translate(${mouseShiftX}, ${mouseShiftY})` : undefined,
        }}
      >
        <div
          className="absolute -left-[40%] top-[5%] h-[32%] w-[180%] animate-fog-bank-1 opacity-[0.22] blur-[56px]"
          style={{
            background:
              "linear-gradient(100deg, transparent 0%, rgba(139,164,184,0.28) 38%, rgba(61,82,102,0.18) 58%, transparent 88%)",
          }}
        />
        <div
          className="absolute -right-[35%] top-[18%] h-[38%] w-[170%] animate-fog-bank-2 opacity-[0.18] blur-[64px]"
          style={{
            background:
              "linear-gradient(260deg, transparent 0%, rgba(61,82,102,0.25) 42%, rgba(139,164,184,0.15) 62%, transparent 92%)",
          }}
        />
        <div
          className="absolute -left-[25%] top-[38%] h-[42%] w-[160%] animate-fog-bank-3 opacity-[0.26] blur-[72px]"
          style={{
            background:
              "linear-gradient(88deg, transparent 4%, rgba(26,40,56,0.4) 46%, rgba(61,82,102,0.22) 68%, transparent 96%)",
          }}
        />
        <div
          className="absolute inset-x-[-10%] bottom-0 h-[55%] animate-fog-breathe opacity-[0.35] blur-[80px]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.98) 0%, rgba(26,40,56,0.5) 40%, rgba(61,82,102,0.15) 72%, transparent 100%)",
          }}
        />
      </div>

      <svg className="absolute inset-0 h-full w-full opacity-[0.14] mix-blend-soft-light" aria-hidden>
        <defs>
          <filter id="mbn-fog-turbulence" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="4" seed="8">
              <animate attributeName="baseFrequency" dur="56s" values="0.005;0.008;0.005" repeatCount="indefinite" />
            </feTurbulence>
            <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.62  0 0 0 0 0.72  0 0 0 0.28 0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#mbn-fog-turbulence)" />
      </svg>
    </div>
  );
}

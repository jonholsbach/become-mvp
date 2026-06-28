"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GeneratingSphere, type SpherePhase } from "@/components/atmosphere/GeneratingSphere";
import { MechanicalArmVisual } from "@/components/atmosphere/MechanicalArmVisual";
import { VolumetricFog } from "@/components/atmosphere/VolumetricFog";

type CinematicPhase = SpherePhase;

export function OpeningCinematic() {
  const [phase, setPhase] = useState<CinematicPhase>("rest");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    if (mq.matches) {
      setPhase("complete");
      return () => {
        mq.removeEventListener("change", onChange);
        window.removeEventListener("mousemove", onMouseMove);
      };
    }

    const timeline: Array<[number, CinematicPhase]> = [
      [0, "rest"],
      [4000, "move"],
      [10000, "spark"],
      [14000, "assemble"],
      [22000, "stabilize"],
      [26000, "reveal"],
      [29000, "complete"],
    ];

    const timers = timeline.map(([ms, next]) => window.setTimeout(() => setPhase(next), ms));
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMouseMove);
      timers.forEach(clearTimeout);
    };
  }, [onMouseMove]);

  const showTypography = phase === "reveal" || phase === "complete" || reducedMotion;
  const fogClearing =
    phase === "stabilize" || phase === "reveal" || phase === "complete";

  return (
    <section
      ref={sectionRef}
      className="opening-cinematic relative min-h-[100svh] overflow-hidden bg-black"
      data-phase={phase}
      style={
        {
          "--mouse-x": mouse.x,
          "--mouse-y": mouse.y,
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 bg-black" aria-hidden />
      <div className="cinematic-void pointer-events-none absolute inset-0" aria-hidden />

      <VolumetricFog mode="cinematic" phase={phase} focalY="30%" expanded={fogClearing} />

      <div
        className="cinematic-foreground-fog pointer-events-none absolute inset-0"
        style={{
          transform: `translate(${(mouse.x - 0.5) * 6}px, ${(mouse.y - 0.5) * 4}px)`,
          transition: "transform 4s ease-out",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center px-6 pt-[5vh] sm:pt-[7vh]">
        <div className="relative w-full max-w-2xl">
          <MechanicalArmVisual phase={phase} reducedMotion={reducedMotion} mouse={mouse} />
          <GeneratingSphere
            phase={phase}
            mouseX={mouse.x}
            mouseY={mouse.y}
            reducedMotion={reducedMotion}
          />
        </div>

        <div
          className={`cinematic-typography mt-16 flex flex-col items-center text-center sm:mt-24 ${
            showTypography ? "cinematic-typography-visible cinematic-presents-visible" : ""
          }`}
        >
          <p className="cinematic-title-mechanical font-medium uppercase tracking-[0.42em] text-mbn-white sm:tracking-[0.52em]">
            Mechanical by Nature
          </p>
          <div className="cinematic-presents-rule mt-7 h-px w-20 bg-gradient-to-r from-transparent via-electric-primary/70 to-transparent" />
          <p className="cinematic-presents mt-7 text-[10px] font-medium uppercase tracking-[0.6em] text-electric-bright sm:text-xs">
            Presents
          </p>
          <p className="mt-6 max-w-sm text-xs leading-relaxed text-mbn-steel-dim">
            A symbolic map of awareness, progress, and potential.
          </p>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-electric-primary/30 transition-opacity duration-[2s] ${
          phase === "complete" || reducedMotion ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <svg className="h-5 w-5 animate-[bounce_3s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

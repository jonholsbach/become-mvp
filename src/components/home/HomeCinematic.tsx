"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ARM_SRC = "/images/mbn-arm-generator.png";

export type CinematicPhase =
  | "darkness"
  | "fogReveal"
  | "armEmerges"
  | "signalPulse"
  | "brandReveal"
  | "becomeReveal";

const PHASE_ORDER: CinematicPhase[] = [
  "darkness",
  "fogReveal",
  "armEmerges",
  "signalPulse",
  "brandReveal",
  "becomeReveal",
];

/** Milliseconds from mount when each phase begins */
const TIMELINE_MS: Record<CinematicPhase, number> = {
  darkness: 0,
  fogReveal: 600,
  armEmerges: 2200,
  signalPulse: 3800,
  brandReveal: 5500,
  becomeReveal: 8000,
};

function phaseIndex(phase: CinematicPhase): number {
  return PHASE_ORDER.indexOf(phase);
}

export function HomeCinematic() {
  const [phase, setPhase] = useState<CinematicPhase>("darkness");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);

    if (mq.matches) {
      setPhase("becomeReveal");
      return () => mq.removeEventListener("change", onChange);
    }

    const timers = PHASE_ORDER.filter((p) => p !== "darkness").map((p) =>
      window.setTimeout(() => setPhase(p), TIMELINE_MS[p])
    );

    return () => {
      mq.removeEventListener("change", onChange);
      timers.forEach(clearTimeout);
    };
  }, []);

  const idx = phaseIndex(phase);
  const fogActive = idx >= phaseIndex("fogReveal");
  const armActive = idx >= phaseIndex("armEmerges");
  const signalActive = idx >= phaseIndex("signalPulse");
  const brandActive = idx >= phaseIndex("brandReveal");
  const becomeActive = idx >= phaseIndex("becomeReveal");

  return (
    <div className="home-cinematic bg-black" data-phase={phase}>
      {/* ── Viewport 1: Intro cinematic ───────────────────────────── */}
      <section
        className="hc-intro relative min-h-[100svh] overflow-hidden bg-black"
        aria-label="Mechanical by Nature presents"
      >
        <div className="hc-void absolute inset-0" aria-hidden />

        {/* Fog layers — always subtly moving once revealed */}
        <div
          className={`hc-fog-layer hc-fog-back ${fogActive ? "hc-fog-visible" : ""} ${!reducedMotion ? "hc-fog-drift" : ""}`}
          aria-hidden
        />
        <div
          className={`hc-fog-layer hc-fog-mid ${fogActive ? "hc-fog-visible" : ""} ${!reducedMotion ? "hc-fog-roll" : ""}`}
          aria-hidden
        />
        <div
          className={`hc-fog-layer hc-fog-front ${fogActive ? "hc-fog-visible" : ""} ${!reducedMotion ? "hc-fog-breathe" : ""}`}
          aria-hidden
        />

        {/* Clearing opens as fog reveals */}
        <div
          className={`hc-fog-clearing pointer-events-none absolute inset-0 ${fogActive ? "hc-clearing-open" : ""}`}
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center px-6 pt-[6vh] sm:pt-[8vh]">
          {/* Arm artifact */}
          <div
            className={`hc-arm-wrap relative mx-auto w-[min(48vw,540px)] ${armActive ? "hc-arm-visible" : ""}`}
          >
            <div
              className={`hc-signal-core pointer-events-none absolute left-1/2 top-[36%] z-0 -translate-x-1/2 -translate-y-1/2 ${signalActive ? "hc-signal-active" : ""}`}
              aria-hidden
            />
            <div
              className={`hc-signal-pulse pointer-events-none absolute left-1/2 top-[36%] z-0 -translate-x-1/2 -translate-y-1/2 ${signalActive ? "hc-signal-pulsing" : ""}`}
              aria-hidden
            />
            <div className="hc-arm-mask relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ARM_SRC}
                alt=""
                decoding="async"
                fetchPriority="high"
                className={`hc-arm-image mx-auto h-[min(58vh,580px)] w-auto max-w-none object-contain sm:h-[min(62vh,620px)] ${armActive ? "hc-arm-emerged" : ""}`}
              />
              {signalActive && !reducedMotion && (
                <div className="hc-light-sweep pointer-events-none absolute inset-0" aria-hidden />
              )}
            </div>
            <div className="hc-arm-mist pointer-events-none absolute -bottom-6 left-1/2 z-20 h-28 w-[140%] -translate-x-1/2" aria-hidden />
          </div>

          {/* Brand typography */}
          <div
            className={`hc-brand mt-16 flex flex-col items-center text-center sm:mt-24 ${brandActive ? "hc-brand-visible" : ""}`}
          >
            <p className="hc-brand-title font-medium uppercase tracking-[0.42em] text-mbn-white sm:tracking-[0.52em]">
              Mechanical by Nature
            </p>
            <div className="hc-brand-rule mt-7 h-px w-20 bg-gradient-to-r from-transparent via-electric-primary/70 to-transparent" />
            <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.6em] text-electric-bright sm:text-xs">
              Presents
            </p>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-electric-primary/30 transition-opacity duration-[2s] ${becomeActive ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        >
          <svg className="h-5 w-5 hc-scroll-cue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Viewport 2: Become — no arm, no logo ──────────────────── */}
      <section
        className={`hc-become relative min-h-[100svh] overflow-hidden border-b border-white/5 bg-black ${becomeActive ? "hc-become-visible" : ""}`}
        aria-label="Become"
      >
        <div className="hc-void absolute inset-0 opacity-80" aria-hidden />
        <div className={`hc-fog-layer hc-fog-mid hc-fog-visible ${!reducedMotion ? "hc-fog-roll" : ""}`} aria-hidden />
        <div className={`hc-fog-layer hc-fog-front hc-fog-visible opacity-25 ${!reducedMotion ? "hc-fog-breathe" : ""}`} aria-hidden />

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
          <div className="hc-become-content">
            <div className="mb-8 h-px w-24 bg-gradient-to-r from-transparent via-electric-primary/45 to-transparent" />
            <h1 className="font-display text-6xl tracking-tight text-mbn-white sm:text-7xl lg:text-8xl">
              BECOME
            </h1>
            <p className="mt-8 max-w-lg font-display text-2xl leading-snug text-mbn-white sm:text-3xl">
              Enter the Body.
              <br />
              <span className="gradient-text">Push Back the Fog.</span>
            </p>
            <Link
              href="/enter"
              className="btn-primary mt-10 inline-flex px-10 py-4 text-base shadow-glow-sm"
            >
              Enter the Body
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

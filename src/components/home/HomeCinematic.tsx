"use client";

import { useEffect, useState } from "react";
import {
  getArmHeroDimensions,
  getArmHeroMaxCssWidth,
  getArmHeroSrc,
} from "@/lib/brand-assets";

const heroSrc = getArmHeroSrc();
const heroDimensions = getArmHeroDimensions();
const heroMaxCssWidth = getArmHeroMaxCssWidth();

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
  signalPulse: 2600,
  brandReveal: 3000,
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
  const artifactRevealed = idx >= phaseIndex("armEmerges");
  const signalActive = idx >= phaseIndex("signalPulse");
  const brandActive = idx >= phaseIndex("brandReveal");
  const becomeActive = idx >= phaseIndex("becomeReveal");

  return (
    <div className="home-cinematic bg-black" data-phase={phase}>
      {/* ── Viewport 1: Intro cinematic ───────────────────────────── */}
      <section
        className={`hc-intro relative min-h-[100svh] overflow-hidden bg-black ${artifactRevealed ? "hc-atmosphere-revealed" : ""} ${signalActive ? "hc-signal-live" : ""}`}
        aria-label="Mechanical by Nature presents"
      >
        <div className="hc-void absolute inset-0 z-0" aria-hidden />

        {/* Fog — back layers pass behind logo/text */}
        <div
          className={`hc-fog-layer hc-fog-back hc-fog-z-back ${fogActive ? "hc-fog-visible" : ""} ${!reducedMotion ? "hc-fog-drift" : ""}`}
          aria-hidden
        />
        <div
          className={`hc-fog-layer hc-fog-mid hc-fog-z-back ${fogActive ? "hc-fog-visible" : ""} ${!reducedMotion ? "hc-fog-roll" : ""}`}
          aria-hidden
        />
        <div
          className={`hc-fog-layer hc-fog-roll-bank ${fogActive ? "hc-fog-visible" : ""} ${!reducedMotion ? "hc-fog-bank-drift" : ""}`}
          aria-hidden
        />

        {signalActive && !reducedMotion && (
          <div className="hc-fog-signal hc-fog-z-mid pointer-events-none absolute inset-0" aria-hidden />
        )}

        <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-4 sm:px-6">
          <div className="flex w-full max-w-[min(96vw,840px)] flex-col items-center">
          {/* Arm — master asset only; atmosphere/shadow as separate layers */}
          <div
            className="hc-artifact-stage relative mx-auto w-full"
            style={{ "--hc-artifact-max": `${heroMaxCssWidth}px` } as React.CSSProperties}
          >
            <div className="hc-artifact-rim pointer-events-none absolute left-1/2 top-[42%] z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden />
            <div className="hc-artifact-ground pointer-events-none absolute left-1/2 z-[5] -translate-x-1/2" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc}
              alt=""
              width={heroDimensions.width}
              height={heroDimensions.height}
              decoding="async"
              fetchPriority="high"
              className="hc-artifact relative z-10 mx-auto"
            />
          </div>

          {/* Brand typography — live HTML only; reflection via CSS ::after */}
          <div
            className={`hc-brand -mt-10 w-full max-w-4xl sm:-mt-12 ${brandActive ? "hc-brand-visible" : ""}`}
          >
            <div className="hc-brand-title-wrap relative flex flex-col items-center">
              <p className="hc-brand-title font-brand text-[clamp(1.05rem,3.1vw,2.25rem)] font-bold uppercase leading-none tracking-[0.24em] sm:tracking-[0.28em]">
                Mechanical by Nature
              </p>
            </div>
            <div className="hc-brand-rule mx-auto mt-7 w-32 sm:w-44" aria-hidden />
            <p className="hc-brand-presents mt-7 font-sans text-[11px] font-semibold uppercase tracking-[0.62em] text-electric-bright sm:text-xs sm:tracking-[0.68em]">
              Presents
            </p>
          </div>
          </div>
        </div>

        {/* Fog — front veil passes over logo/text */}
        <div
          className={`hc-fog-layer hc-fog-front hc-fog-veil-front ${fogActive ? "hc-fog-visible" : ""} ${!reducedMotion ? "hc-fog-breathe" : ""}`}
          aria-hidden
        />

        <div
          className={`hc-scroll-invite pointer-events-none absolute bottom-[16%] left-1/2 z-20 -translate-x-1/2 transition-opacity duration-[2.4s] ${brandActive ? (becomeActive ? "opacity-100" : "opacity-55") : "opacity-0"}`}
          aria-hidden
        >
          <div className={`hc-scroll-path ${!reducedMotion ? "hc-scroll-path-active" : ""}`}>
            <span className="hc-scroll-mark" />
            <span className="hc-scroll-mark" />
            <span className="hc-scroll-mark" />
          </div>
          <svg className="hc-scroll-cue h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M19 9l-7 7-7-7" />
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
            <div className="hc-become-rule mx-auto mb-10" aria-hidden />
            <p className="font-display text-xl leading-snug text-mbn-steel sm:text-2xl">
              The fog does not move until you do.
            </p>
            <h1 className="hc-become-title font-brand mt-8 text-[clamp(3.5rem,12vw,6.5rem)] font-bold uppercase leading-none tracking-[0.18em] sm:tracking-[0.22em]">
              Become
            </h1>
            <p className="mx-auto mt-8 max-w-md font-display text-lg leading-relaxed text-mbn-steel sm:text-xl">
              Become begins where autopilot ends.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

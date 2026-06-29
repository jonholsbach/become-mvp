"use client";

import Link from "next/link";
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
  const artifactRevealed = idx >= phaseIndex("armEmerges");
  const signalActive = idx >= phaseIndex("signalPulse");
  const brandActive = idx >= phaseIndex("brandReveal");
  const becomeActive = idx >= phaseIndex("becomeReveal");

  return (
    <div className="home-cinematic bg-black" data-phase={phase}>
      {/* ── Viewport 1: Intro cinematic ───────────────────────────── */}
      <section
        className={`hc-intro relative min-h-[100svh] overflow-hidden bg-black ${artifactRevealed ? "hc-atmosphere-revealed" : ""}`}
        aria-label="Mechanical by Nature presents"
      >
        <div className="hc-void absolute inset-0" aria-hidden />

        {/* Atmospheric fog — movement and light live here */}
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

        {signalActive && !reducedMotion && (
          <div className="hc-fog-signal pointer-events-none absolute inset-0" aria-hidden />
        )}

        <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-4 sm:px-6">
          {/* Arm — master asset only; atmosphere/shadow as separate layers */}
          <div
            className="hc-artifact-stage relative mx-auto w-full max-w-[min(96vw,840px)]"
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
            className={`hc-brand mt-6 w-full max-w-4xl sm:mt-8 ${brandActive ? "hc-brand-visible" : ""}`}
          >
            <div className="hc-brand-title-wrap relative flex flex-col items-center">
              <p className="hc-brand-title font-brand text-[clamp(1.05rem,3.1vw,2.25rem)] font-bold uppercase leading-none tracking-[0.24em] sm:tracking-[0.28em]">
                Mechanical by Nature
              </p>
            </div>
            <div className="hc-brand-rule mx-auto mt-7 h-px w-32 sm:w-44" aria-hidden />
            <p className="hc-brand-presents mt-7 font-sans text-[11px] font-semibold uppercase tracking-[0.62em] text-electric-bright sm:text-xs sm:tracking-[0.68em]">
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

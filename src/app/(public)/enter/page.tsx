import Link from "next/link";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { LogoWatermark } from "@/components/atmosphere/LogoWatermark";
import { SignalFlow } from "@/components/atmosphere/SignalFlow";
import { WildernessBackdrop } from "@/components/atmosphere/WildernessBackdrop";
import { ViewportSection } from "@/components/layout/ViewportSection";
import { MISSION_ZERO_QUESTION_COUNT } from "@/lib/mission-zero/content";

export default function EnterPage() {
  return (
    <WildernessBackdrop variant="forest" className="min-h-[100svh]">
      <LogoWatermark opacity={0.04} />
      <FogLayer density={0.85} animated />
      <SignalFlow intensity="subtle" />

      <ViewportSection className="relative">
        <Link
          href="/"
          className="absolute left-6 top-6 text-xs font-medium text-mbn-steel transition-colors hover:text-mbn-white sm:left-8"
        >
          ← Return to homepage
        </Link>

        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-mbn-steel-dim">
          Mechanical by Nature
        </p>
        <p className="mt-4 font-display text-5xl tracking-tight text-mbn-white sm:text-6xl">
          BECOME
        </p>

        <p className="mt-12 text-xs font-medium uppercase tracking-widest text-electric-bright">
          Mission 0 · The System Scan
        </p>
        <h1 className="mt-4 font-display text-3xl text-mbn-white sm:text-4xl">Enter the Body</h1>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-mbn-steel">
          <p>Everything is fog. Nothing is wrong. Nothing is broken.</p>
          <p>
            Your body is simply a landscape that has not yet been explored. Today we begin revealing
            the map.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/5 bg-mbn-panel/40 p-6 text-left">
          <p className="text-sm font-medium text-mbn-white">Before we begin</p>
          <p className="mt-3 text-sm leading-relaxed text-mbn-steel-dim">
            This is not a test. There are no correct answers. There is only observation. Your goal is
            not to perform — your goal is to notice.
          </p>
          <p className="mt-3 text-sm text-mbn-steel-dim">Take one slow breath. Let&apos;s begin.</p>
        </div>

        <Link href="/assessment" className="btn-primary mt-12 inline-flex px-10 py-4 text-base">
          Step into the fog
        </Link>
        <p className="mt-4 text-xs text-mbn-steel-dim">
          {MISSION_ZERO_QUESTION_COUNT} observations · ~8 minutes · The map forms as you walk
        </p>
      </ViewportSection>
    </WildernessBackdrop>
  );
}

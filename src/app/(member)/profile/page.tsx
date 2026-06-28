"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { ViewportSection } from "@/components/layout/ViewportSection";
import { UnknownMetric } from "@/components/member/FogReveal";
import { TensionMap } from "@/components/TensionMap";
import type { CenterProfile } from "@/lib/types";
import { loadProfile } from "@/lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CenterProfile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/enter");
      return;
    }
    setProfile(saved);
    setLoaded(true);
    const timer = window.setTimeout(() => setRevealed(true), 600);
    return () => window.clearTimeout(timer);
  }, [router]);

  if (!loaded || !profile) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
      </div>
    );
  }

  const metrics = profile.assessmentMetrics;

  return (
    <div className="snap-scroll-y relative bg-mbn-bg">
      <div className="pointer-events-none fixed inset-0 z-0">
        <FogLayer density={0.4} animated />
      </div>

      <div className="relative z-10">
        {/* Viewport 1 — Fog lifts */}
        <ViewportSection>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-electric-bright">
            Your map emerges
          </p>
          <h1 className="mt-6 font-display text-4xl text-mbn-white sm:text-5xl">The fog lifts</h1>
          <p className="mt-8 text-lg leading-relaxed text-mbn-steel">
            Territory becomes visible. Not who you are — where you are, and which direction opens
            next.
          </p>
          <p className="mt-4 text-sm text-mbn-steel-dim">Scroll to reveal your coordinates.</p>
        </ViewportSection>

        {/* Viewport 2 — Center Score */}
        <ViewportSection>
          <p className="text-xs uppercase tracking-widest text-mbn-steel-dim">Starting point</p>
          <h2 className="mt-4 font-display text-3xl text-mbn-white sm:text-4xl">Center Score</h2>
          <p className="mt-4 text-mbn-steel-dim">Not a grade. A coordinate.</p>
          <div className="mt-10">
            <UnknownMetric
              label="Center Score"
              revealed={revealed}
              value={metrics ? `${metrics.centerScore}/100` : undefined}
              delayMs={0}
            />
          </div>
        </ViewportSection>

        {/* Viewport 3 — Current Direction */}
        <ViewportSection>
          <p className="text-xs uppercase tracking-widest text-mbn-steel-dim">Current vector</p>
          <h2 className="mt-4 font-display text-3xl text-mbn-white sm:text-4xl">
            Where you are pulled
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-mbn-steel">
            {metrics?.currentVector ?? profile.directionBackToCenter}
          </p>
          <p className="mt-6 text-sm text-mbn-steel-dim">
            The map has always been there. You are not broken — you are discovering.
          </p>
        </ViewportSection>

        {/* Viewport 4 — Signal Map */}
        <ViewportSection align="start">
          <p className="text-xs uppercase tracking-widest text-mbn-steel-dim">Signal map</p>
          <h2 className="mt-4 font-display text-3xl text-mbn-white sm:text-4xl">
            Red and blue territory
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <UnknownMetric
              label="Red Territory"
              revealed={revealed}
              value={metrics?.redTerritory.join(" · ")}
              delayMs={200}
            />
            <UnknownMetric
              label="Blue Territory"
              revealed={revealed}
              value={metrics?.blueTerritory.join(" · ")}
              delayMs={400}
            />
          </div>
          <div className="mt-10 w-full">
            <TensionMap regions={profile.signalMap} />
          </div>
        </ViewportSection>

        {/* Viewport 5 — First Mission */}
        <ViewportSection>
          <p className="text-xs uppercase tracking-widest text-mbn-steel-dim">Strongest opportunity</p>
          <h2 className="mt-4 font-display text-3xl text-mbn-white sm:text-4xl">
            {metrics?.recommendedDirection ?? profile.primaryCoordinateToReclaim}
          </h2>
          <div className="mt-8">
            <UnknownMetric
              label="First Mission"
              revealed={revealed}
              value={metrics?.primaryMission.replace("Mission 01", "Mission #1")}
              delayMs={600}
            />
          </div>
          <p className="mt-6 text-sm text-mbn-steel-dim">{profile.awarenessCue}</p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/module" className="btn-primary text-center">
              Begin Mission #1
            </Link>
            <Link href="/universe" className="btn-secondary text-center">
              Enter your universe
            </Link>
          </div>
        </ViewportSection>
      </div>
    </div>
  );
}

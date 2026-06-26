"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProfileCard } from "@/components/ProfileCard";
import { FogIndicator } from "@/components/FogIndicator";
import { TensionMap } from "@/components/TensionMap";
import { PositionalSphere } from "@/components/PositionalSphere";
import { PositionCard } from "@/components/PositionCard";
import { FogReveal, UnknownMetric } from "@/components/member/FogReveal";
import { POST_SCAN_FOG } from "@/lib/pillars";
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
    const timer = window.setTimeout(() => setRevealed(true), 400);
    return () => window.clearTimeout(timer);
  }, [router]);

  if (!loaded || !profile) {
    return (
      <PageShell maxWidth="4xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
        </div>
      </PageShell>
    );
  }

  const metrics = profile.assessmentMetrics;

  return (
    <PageShell
      title="The fog lifts"
      subtitle="Territory becomes visible. Not who you are — where you are, and which direction opens next."
      backHref="/assessment"
      backLabel="Continue observing"
      maxWidth="4xl"
    >
      <FogIndicator
        metrics={{
          ...POST_SCAN_FOG,
          fogClearedPercent: profile.fogClearedPercent,
          backSphereAccessPercent: profile.backSphereAccessPercent,
        }}
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <UnknownMetric
          label="Center Score"
          revealed={revealed}
          value={metrics ? `${metrics.centerScore}/100` : undefined}
          delayMs={0}
        />
        <UnknownMetric
          label="Current Vector"
          revealed={revealed}
          value={metrics?.currentVector ?? profile.directionBackToCenter}
          delayMs={200}
        />
        <UnknownMetric
          label="Primary Mission"
          revealed={revealed}
          value={metrics?.primaryMission.replace("Mission 01", "Mission #1")}
          delayMs={400}
        />
        <UnknownMetric
          label="Red Territory"
          revealed={revealed}
          value={metrics?.redTerritory.join(" · ")}
          delayMs={600}
        />
        <UnknownMetric
          label="Blue Territory"
          revealed={revealed}
          value={metrics?.blueTerritory.join(" · ")}
          delayMs={800}
        />
        <UnknownMetric
          label="Strongest Opportunity"
          revealed={revealed}
          value={metrics?.recommendedDirection}
          delayMs={1000}
        />
      </div>

      <FogReveal delayMs={1200} className="mb-8 mt-10">
        <div className="rounded-2xl border border-electric-primary/20 bg-gradient-to-br from-electric-glow/10 to-transparent p-6 shadow-glow-sm sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
            Body Map · {profile.currentPillar} pillar
          </p>
          <h2 className="mt-2 font-display text-2xl text-mbn-white sm:text-3xl">Your current direction</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-mbn-steel">
            {profile.directionBackToCenter}
          </p>
          <p className="mt-3 text-sm text-mbn-steel-dim">
            The map has always been there. You are not broken — you are discovering.
          </p>
        </div>
      </FogReveal>

      <FogReveal delayMs={1400}>
        <div className="grid gap-6 lg:grid-cols-2">
          <PositionalSphere
            backSphereAccessPercent={profile.backSphereAccessPercent}
            fogClearedPercent={profile.fogClearedPercent}
          />
          <PositionCard data={profile.positionCard} />
        </div>
      </FogReveal>

      <FogReveal delayMs={1600} className="mt-6">
        <TensionMap regions={profile.signalMap} />
      </FogReveal>

      <FogReveal delayMs={1800} className="mt-6 grid gap-4 sm:grid-cols-2">
        <ProfileCard label="Primary Distortion" value={profile.primaryDistortion} />
        <ProfileCard label="Positional Drift" value={profile.positionalDrift} />
        <ProfileCard label="Unexplored Territory" value={profile.unexploredTerritory} />
        <ProfileCard label="Navigation Rule" value={profile.navigationRule} />
        <ProfileCard
          label="Awareness Cue"
          value={profile.awarenessCue}
          description="Carry this signal into Mission #1."
        />
      </FogReveal>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/module" className="btn-primary text-center">
          Begin Mission #1
        </Link>
        <Link href="/dashboard" className="btn-secondary text-center">
          Command Center
        </Link>
      </div>
    </PageShell>
  );
}

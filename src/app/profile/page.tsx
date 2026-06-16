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
import { POST_SCAN_FOG } from "@/lib/pillars";
import type { CenterProfile } from "@/lib/types";
import { loadProfile } from "@/lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CenterProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/assessment");
      return;
    }
    setProfile(saved);
    setLoaded(true);
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

  return (
    <PageShell
      title="Your Center Profile"
      subtitle="This is not a judgment. It is a map. Your body has simply spent more time in some coordinates than others. The mission is to restore access."
      backHref="/assessment"
      backLabel="Retake system scan"
      maxWidth="4xl"
    >
      <FogIndicator
        metrics={{
          ...POST_SCAN_FOG,
          fogClearedPercent: profile.fogClearedPercent,
          backSphereAccessPercent: profile.backSphereAccessPercent,
        }}
      />

      <div className="mb-8 mt-8 rounded-2xl border border-electric-primary/20 bg-gradient-to-br from-electric-glow/10 to-transparent p-6 shadow-glow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
          Center Profile · {profile.currentPillar} pillar
        </p>
        <h2 className="mt-2 font-display text-3xl text-mbn-white sm:text-4xl">{profile.archetype}</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-mbn-steel">
          {profile.archetypeDescription}
        </p>
        <p className="mt-3 text-sm text-mbn-steel-dim">
          Your body is not broken. It has adapted. This profile identifies the pattern and the next
          direction back toward center.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PositionalSphere
          backSphereAccessPercent={profile.backSphereAccessPercent}
          fogClearedPercent={profile.fogClearedPercent}
        />
        <PositionCard data={profile.positionCard} />
      </div>

      <div className="mt-6">
        <TensionMap regions={profile.signalMap} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ProfileCard label="Primary Distortion" value={profile.primaryDistortion} />
        <ProfileCard label="Positional Drift" value={profile.positionalDrift} />
        <ProfileCard label="Direction Back to Center" value={profile.directionBackToCenter} />
        <ProfileCard label="Unexplored Territory" value={profile.unexploredTerritory} />
        <ProfileCard
          label="Primary Coordinate to Reclaim"
          value={profile.primaryCoordinateToReclaim}
        />
        <ProfileCard label="Navigation Rule" value={profile.navigationRule} />
        <ProfileCard
          label="First Mission"
          value={profile.firstRecalibrationStep}
          description="Your precise entry point into the territory — complete before advancing."
          accent
        />
        <ProfileCard
          label="Awareness Cue"
          value={profile.awarenessCue}
          description="Carry this signal into Mission 01."
        />
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/module" className="btn-primary text-center">
          Begin Mission 01
        </Link>
        <Link href="/coach" className="btn-secondary text-center">
          View Mission Control
        </Link>
      </div>
    </PageShell>
  );
}

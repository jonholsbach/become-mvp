"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { FogIndicator } from "@/components/FogIndicator";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { SignalFlow } from "@/components/atmosphere/SignalFlow";
import { MemberDashboard } from "@/components/member/MemberDashboard";
import { TerritoryMapPreview } from "@/components/universe/TerritoryMapPreview";
import { isUnlocked, resolveProgression } from "@/lib/domain/progression";
import { buildUniverseState } from "@/lib/domain/universe";
import { getFogMetrics, loadMapUpdate, loadProfile, loadStepChecklist } from "@/lib/storage";
import type { CenterProfile } from "@/lib/types";

export default function UniversePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CenterProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/enter");
      return;
    }
    const mapUpdate = loadMapUpdate();
    const checklist = loadStepChecklist();
    const progression = resolveProgression(saved, mapUpdate, checklist);
    if (!isUnlocked(progression, "universe")) {
      router.replace("/dashboard");
      return;
    }
    setProfile(saved);
    setLoaded(true);
  }, [router]);

  if (!loaded || !profile) {
    return (
      <PageShell maxWidth="6xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
        </div>
      </PageShell>
    );
  }

  const mapUpdate = loadMapUpdate();
  const checklist = loadStepChecklist();
  const progression = resolveProgression(profile, mapUpdate, checklist);
  const universe = buildUniverseState(profile, mapUpdate, checklist)!;
  const fogMetrics = getFogMetrics();

  return (
    <PageShell
      title="Your Universe"
      subtitle="You earned this map. Walk freely — every place here is part of you."
      maxWidth="6xl"
    >
      <div className="relative overflow-hidden rounded-2xl border border-electric-primary/20">
        <FogLayer density={0.08} animated />
        <SignalFlow intensity="discovery" />
        <div className="relative p-6 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">Home</p>
          <h2 className="mt-2 font-display text-3xl text-mbn-white sm:text-4xl">
            The fog has receded. The world is yours.
          </h2>
          <Link href={progression.nextStep.href} className="btn-primary mt-6 inline-flex">
            {progression.nextStep.cta}
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <FogIndicator
          metrics={{
            ...fogMetrics,
            fogClearedPercent: universe.fogClearedPercent,
            backSphereAccessPercent: universe.backSphereAccessPercent,
          }}
        />
      </div>

      <div className="mt-10">
        <MemberDashboard
          profile={profile}
          progression={progression}
          mapUpdate={mapUpdate}
          checklist={checklist}
        />
      </div>

      <section className="mt-12">
        <h3 className="mb-4 font-display text-xl text-mbn-white">Territory · celestial view</h3>
        <TerritoryMapPreview
          nodes={universe.territoryNodes}
          fogClearedPercent={universe.fogClearedPercent}
        />
      </section>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/profile", label: "Body Map", sub: "Anatomy & signal" },
          { href: "/territory", label: "Territory Map", sub: "Explored access" },
          { href: "/paths", label: "Skill Paths", sub: "Destinations" },
          { href: "/journal", label: "Journal", sub: "Reflections" },
        ].map((place) => (
          <Link
            key={place.href}
            href={place.href}
            className="glass-panel block p-5 transition-all hover:border-electric-primary/30 hover:shadow-glow-sm"
          >
            <p className="font-medium text-mbn-white">{place.label}</p>
            <p className="mt-1 text-xs text-mbn-steel-dim">{place.sub}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}

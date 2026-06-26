"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { TensionMap } from "@/components/TensionMap";
import { TerritoryMapPreview } from "@/components/universe/TerritoryMapPreview";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { isUnlocked, resolveProgression } from "@/lib/domain/progression";
import { buildTerritoryNodes } from "@/lib/domain/maps";
import { loadMapUpdate, loadProfile, loadStepChecklist } from "@/lib/storage";

export default function TerritoryPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [fogPercent, setFogPercent] = useState(8);

  useEffect(() => {
    const profile = loadProfile();
    if (!profile) {
      router.replace("/enter");
      return;
    }
    const progression = resolveProgression(profile, loadMapUpdate(), loadStepChecklist());
    if (!isUnlocked(progression, "territory")) {
      router.replace("/dashboard");
      return;
    }
    setFogPercent(progression.fogClearedPercent);
    setLoaded(true);
  }, [router]);

  if (!loaded) {
    return (
      <PageShell maxWidth="6xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
        </div>
      </PageShell>
    );
  }

  const profile = loadProfile()!;
  const nodes = buildTerritoryNodes(profile);

  return (
    <PageShell
      title="Territory Map"
      subtitle="Abstract exploration — celestial pathways, not anatomy. The same signal, viewed from above."
      backHref="/dashboard"
      backLabel="Command center"
      maxWidth="6xl"
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/profile" className="rounded-full border border-white/10 px-4 py-2 text-xs text-mbn-steel hover:text-mbn-white">
          ← Body Map
        </Link>
        <span className="rounded-full border border-electric-primary/20 bg-electric-glow/5 px-4 py-2 text-xs text-electric-bright">
          Territory Map →
        </span>
      </div>

      <TerritoryMapPreview nodes={nodes} fogClearedPercent={fogPercent} />

      <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/5 p-6">
        <FogLayer density={0.15} animated={false} />
        <p className="relative text-sm text-mbn-steel">
          Body Map shows anatomy — muscles, joints, signal. Territory Map shows access — explored
          coordinates, fog, and the paths between. They are the same world from two perspectives.
        </p>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-xs uppercase tracking-wider text-mbn-steel-dim">Linked signal · biological view</p>
        <TensionMap regions={profile.signalMap} />
      </div>
    </PageShell>
  );
}

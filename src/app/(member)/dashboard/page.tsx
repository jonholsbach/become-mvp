"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { MemberDashboard } from "@/components/member/MemberDashboard";
import { resolveProgression } from "@/lib/domain/progression";
import {
  loadMapUpdate,
  loadProfile,
  loadStepChecklist,
} from "@/lib/storage";
import type { CenterProfile } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CenterProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/enter");
      return;
    }
    setProfile(saved);
    setLoaded(true);
  }, [router]);

  useEffect(() => {
    if (!profile) return;
    const progression = resolveProgression(profile, loadMapUpdate(), loadStepChecklist());
    if (progression.universeHome) {
      router.replace("/universe");
    }
  }, [profile, router]);

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

  if (progression.universeHome) {
    return (
      <PageShell maxWidth="6xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Command Center"
      subtitle="Desktop depth — your vector, territory, and the path illuminated ahead."
      maxWidth="6xl"
    >
      <MemberDashboard
        profile={profile}
        progression={progression}
        mapUpdate={mapUpdate}
        checklist={checklist}
      />
    </PageShell>
  );
}

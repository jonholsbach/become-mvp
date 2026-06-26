"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { SkillPathCard } from "@/components/universe/SkillPathCard";
import { buildSkillPaths } from "@/lib/domain/skills";
import { loadProfile } from "@/lib/storage";
import type { CenterProfile } from "@/lib/types";

export default function SkillPathsPage() {
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
      <PageShell maxWidth="6xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
        </div>
      </PageShell>
    );
  }

  const skills = buildSkillPaths(profile);
  const ready = skills.filter((s) => s.status === "ready" || s.status === "approaching");
  const locked = skills.filter((s) => s.status === "locked");

  return (
    <PageShell
      title="Skill Paths"
      subtitle="Each skill is a destination — enter a path and walk it. Tradeoffs, not walls."
      backHref="/dashboard"
      backLabel="Command center"
      maxWidth="6xl"
    >
      <div className="wilderness-panel p-6">
        <p className="text-sm text-mbn-steel">
          You do not need to fully return to center before exploring. Specializing early remains
          possible — the system communicates tradeoffs, not walls.
        </p>
      </div>

      {ready.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-electric-bright">
            Approaching · Ready
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ready.map((skill) => (
              <SkillPathCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-mbn-steel-dim">
          Skill Network
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locked.map((skill) => (
            <SkillPathCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

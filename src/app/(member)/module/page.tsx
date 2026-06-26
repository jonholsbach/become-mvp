"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { FogIndicator } from "@/components/FogIndicator";
import { getMissionById } from "@/lib/assessment";
import { POST_SCAN_FOG } from "@/lib/pillars";
import type { MissionContent } from "@/lib/types";
import { loadProfile, loadStepChecklist, saveStepChecklist } from "@/lib/storage";

function BriefSection({
  label,
  content,
  accent,
}: {
  label: string;
  content: string;
  accent?: boolean;
}) {
  return (
    <section
      className={`rounded-xl border p-5 ${accent ? "border-electric-primary/20 bg-electric-glow/5" : "border-white/5 bg-mbn-panel/30"}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-mbn-steel">{content}</p>
    </section>
  );
}

export default function ModulePage() {
  const router = useRouter();
  const [mission, setMission] = useState<MissionContent | null>(null);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const profile = loadProfile();
    if (!profile) {
      router.replace("/assessment");
      return;
    }

    const missionContent = getMissionById(profile.firstStepId);
    setMission(missionContent);

    const savedChecks = loadStepChecklist();
    setChecked(savedChecks ?? new Array(missionContent.completionCriteria.length).fill(false));
    setLoaded(true);
  }, [router]);

  function toggleCheck(index: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      saveStepChecklist(next);
      return next;
    });
  }

  const allChecked = checked.length > 0 && checked.every(Boolean);

  if (!loaded || !mission) {
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
      title={mission.fullTitle}
      subtitle={`${mission.pillar} pillar · ${mission.pathway} · Mission briefing`}
      backHref="/profile"
      backLabel="Back to Center Profile"
      maxWidth="4xl"
    >
      <FogIndicator metrics={{ ...POST_SCAN_FOG, missionsAvailable: 1 }} compact />

      <div className="mt-6 glass-panel overflow-hidden">
        <div className="relative flex aspect-video items-center justify-center bg-mbn-navy">
          <div className="absolute inset-0 bg-gradient-to-t from-mbn-bg/80 via-transparent to-transparent" />
          <div className="biomechanical-glow inset-0 opacity-60" />
          <div className="relative text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-electric-primary/40 bg-mbn-panel/80 shadow-glow-sm">
              <svg className="ml-1 h-7 w-7 text-electric-bright" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium text-mbn-white">{mission.videoLabel}</p>
            <p className="mt-1 text-xs text-mbn-steel-dim">Mission briefing video — embed in production</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <BriefSection label="Objective" content={mission.objective} accent />
        <BriefSection label="Territory" content={mission.territory} />
        <BriefSection label="Signal Focus" content={mission.signalFocus} />
        <BriefSection label="Movement Assignment" content={mission.movementAssignment} accent />
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-wider text-mbn-steel-dim">
          Completion Criteria
        </h2>
        <p className="mt-1 text-sm text-mbn-steel-dim">
          Complete each criterion before the reflection gate opens
        </p>
        <ul className="mt-4 space-y-3">
          {mission.completionCriteria.map((item, index) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/5 bg-mbn-panel/30 p-4 transition-colors hover:bg-mbn-panel/50">
                <input
                  type="checkbox"
                  checked={checked[index] ?? false}
                  onChange={() => toggleCheck(index)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-mbn-navy text-electric-primary focus:ring-electric-primary/50"
                />
                <span className={`text-sm ${checked[index] ? "text-mbn-white" : "text-mbn-steel"}`}>
                  {item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 glass-panel border-electric-primary/20 p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
          Reflection Gate
        </p>
        <p className="mt-2 text-sm italic text-mbn-steel">&ldquo;{mission.reflectionGate}&rdquo;</p>
        <p className="mt-3 text-xs text-mbn-steel-dim">
          You are not here to obey the program blindly. You are here to learn how to read the signal.
        </p>
      </section>

      <div className="mt-10">
        {allChecked ? (
          <Link href="/reflection" className="btn-primary">
            Open Map Update
          </Link>
        ) : (
          <button type="button" disabled className="btn-primary cursor-not-allowed opacity-40">
            Complete criteria to open map update
          </button>
        )}
        <p className="mt-3 text-xs text-mbn-steel-dim">
          {checked.filter(Boolean).length} of {checked.length} criteria met
        </p>
      </div>
    </PageShell>
  );
}

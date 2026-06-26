"use client";

import Link from "next/link";
import { FogLayer } from "@/components/atmosphere/FogLayer";
import { TerritoryMapPreview } from "@/components/universe/TerritoryMapPreview";
import type { ProgressionState } from "@/lib/domain/progression";
import { isUnlocked } from "@/lib/domain/progression";
import { buildUniverseState } from "@/lib/domain/universe";
import type { CenterProfile } from "@/lib/types";
import { getMissionById } from "@/lib/assessment";

interface MemberDashboardProps {
  profile: CenterProfile;
  progression: ProgressionState;
  mapUpdate: ReturnType<typeof import("@/lib/storage").loadMapUpdate>;
  checklist: boolean[] | null;
}

export function MemberDashboard({ profile, progression, mapUpdate, checklist }: MemberDashboardProps) {
  const metrics = profile.assessmentMetrics;
  const mission = getMissionById(profile.firstStepId);
  const universe = buildUniverseState(profile, mapUpdate, checklist);
  const centerProgress = Math.min(100, metrics?.centerScore ?? profile.fogClearedPercent * 5);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-electric-primary/20 bg-gradient-to-br from-electric-glow/10 via-mbn-panel/40 to-mbn-bg p-6 sm:p-8">
        <FogLayer density={Math.max(0.05, 1 - progression.fogClearedPercent / 20)} animated={false} />
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">Your next step</p>
          <h2 className="mt-2 font-display text-2xl text-mbn-white sm:text-3xl">{progression.nextStep.label}</h2>
          <p className="mt-3 max-w-xl text-sm text-mbn-steel">{progression.nextStep.description}</p>
          <Link href={progression.nextStep.href} className="btn-primary mt-6 inline-flex">
            {progression.nextStep.cta}
          </Link>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardCard title="Current Vector" locked={!metrics}>
          {metrics ? (
            <p className="text-sm leading-relaxed text-mbn-steel">{metrics.currentVector}</p>
          ) : (
            <p className="text-fog-mist/60">Unknown</p>
          )}
        </DashboardCard>

        <DashboardCard title="Current Mission" locked={!isUnlocked(progression, "mission")}>
          <p className="font-medium text-mbn-white">{mission.fullTitle.replace("Mission 01", "Mission #1")}</p>
          <p className="mt-2 text-sm text-mbn-steel-dim">{mission.objective}</p>
          {isUnlocked(progression, "workout") && (
            <Link href="/today" className="mt-4 inline-block text-xs font-medium text-electric-bright hover:underline">
              Open workout mode →
            </Link>
          )}
        </DashboardCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <DashboardCard title="Red Territory" locked={!metrics} variant="red">
          {metrics?.redTerritory.length ? (
            <ul className="space-y-1 text-sm text-mbn-steel">
              {metrics.redTerritory.map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
          ) : (
            <p className="text-fog-mist/60">Unknown</p>
          )}
        </DashboardCard>
        <DashboardCard title="Blue Territory" locked={!metrics} variant="blue">
          {metrics?.blueTerritory.length ? (
            <ul className="space-y-1 text-sm text-mbn-steel">
              {metrics.blueTerritory.map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
          ) : (
            <p className="text-fog-mist/60">Unknown</p>
          )}
        </DashboardCard>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <QuickAction
          title="Today's Workout"
          href="/today"
          locked={!isUnlocked(progression, "workout")}
          description="Signal · sensation · timer"
        />
        <QuickAction
          title="Quick Body Scan"
          href="/assessment"
          locked={false}
          description="Re-enter the fog"
        />
        <QuickAction
          title="Body Map"
          href="/profile"
          locked={!isUnlocked(progression, "body_map")}
          description="Anatomy · signal · red & blue"
        />
      </section>

      <section id="progress">
        <DashboardCard title="Progress Toward Center">
          <div className="flex items-end justify-between">
            <p className="font-display text-3xl text-electric-bright">{centerProgress}%</p>
            <p className="text-xs text-mbn-steel-dim">Fog cleared {progression.fogClearedPercent}%</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-mbn-navy">
            <div
              className="h-full rounded-full bg-gradient-to-r from-electric-glow to-electric-bright transition-all duration-1000"
              style={{ width: `${centerProgress}%` }}
            />
          </div>
          {metrics?.predictedExperience && (
            <p className="mt-4 text-sm italic text-mbn-steel-dim">
              &ldquo;{metrics.predictedExperience}&rdquo;
            </p>
          )}
        </DashboardCard>
      </section>

      {universe && isUnlocked(progression, "territory") ? (
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h3 className="font-display text-xl text-mbn-white">Universe Preview</h3>
              <p className="mt-1 text-sm text-mbn-steel-dim">Explored territory — abstract, celestial</p>
            </div>
            {isUnlocked(progression, "universe") && (
              <Link href="/universe" className="text-xs font-medium text-electric-bright hover:underline">
                Enter universe →
              </Link>
            )}
          </div>
          <TerritoryMapPreview
            nodes={universe.territoryNodes}
            fogClearedPercent={universe.fogClearedPercent}
          />
        </section>
      ) : (
        <section className="relative overflow-hidden rounded-2xl border border-dashed border-white/10 p-10 text-center">
          <FogLayer density={0.85} animated />
          <div className="relative">
            <p className="font-display text-lg text-mbn-steel">Personal universe preview</p>
            <p className="mt-2 text-sm text-mbn-steel-dim">
              Complete your first mission and reflection to reveal the territory beyond.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

function DashboardCard({
  title,
  children,
  locked,
  variant,
}: {
  title: string;
  children: React.ReactNode;
  locked?: boolean;
  variant?: "red" | "blue";
}) {
  const border =
    variant === "red"
      ? "border-red-500/15"
      : variant === "blue"
        ? "border-electric-primary/15"
        : "border-white/5";

  return (
    <div className={`glass-panel relative overflow-hidden border p-5 sm:p-6 ${border}`}>
      {locked && <FogLayer density={0.7} animated={false} className="rounded-2xl" />}
      <div className="relative">
        <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">{title}</p>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

function QuickAction({
  title,
  href,
  locked,
  description,
}: {
  title: string;
  href: string;
  locked: boolean;
  description: string;
}) {
  const inner = (
    <div
      className={`rounded-xl border p-4 transition-all ${
        locked
          ? "cursor-not-allowed border-white/5 bg-mbn-panel/20 opacity-50"
          : "border-white/10 bg-mbn-panel/40 hover:border-electric-primary/30 hover:bg-mbn-panel/70"
      }`}
    >
      <p className="font-medium text-mbn-white">{title}</p>
      <p className="mt-1 text-xs text-mbn-steel-dim">{description}</p>
      {locked && <p className="mt-2 text-[10px] uppercase tracking-wider text-fog-mist/50">Locked</p>}
    </div>
  );

  return locked ? inner : <Link href={href}>{inner}</Link>;
}

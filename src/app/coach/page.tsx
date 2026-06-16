"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { MOCK_COACH_USERS, getStatusColor } from "@/lib/mock-coach-data";
import type { CoachUser } from "@/lib/types";

function ExplorerPanel({ user }: { user: CoachUser }) {
  return (
    <div className="glass-panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">Explorer</p>
          <h2 className="text-xl font-semibold text-mbn-white">{user.explorer}</h2>
          <p className="mt-1 text-sm text-electric-bright">{user.centerProfile}</p>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(user.completionStatus)}`}
        >
          {user.completionLabel}
        </span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-mbn-steel-dim">
          <span>Fog cleared</span>
          <span>{user.fogClearedPercent}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-mbn-navy">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric-glow to-electric-bright transition-all"
            style={{ width: `${user.fogClearedPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          { label: "Current Pillar", value: user.currentPillar },
          { label: "Signal Map Status", value: user.signalMapStatus },
          { label: "Primary Distortion", value: user.primaryDistortion },
          { label: "Direction Back to Center", value: user.directionBackToCenter },
          { label: "Default Position Pattern", value: user.defaultPositionPattern },
          { label: "Positional Drift", value: user.positionalDrift },
          { label: "Unexplored Territory", value: user.unexploredTerritory },
          { label: "Resistance Type", value: user.resistanceType },
          { label: "Recommended Direction", value: user.recommendedDirection },
          { label: "Next Coordinate", value: user.nextCoordinate },
          { label: "Next Mission", value: user.nextMission },
        ].map((item) => (
          <div key={item.label} className={item.label === "Direction Back to Center" || item.label === "Recommended Direction" ? "sm:col-span-2" : ""}>
            <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">{item.label}</p>
            <p className="mt-1 text-sm text-mbn-white">{item.value}</p>
          </div>
        ))}
      </div>

      {user.latestMapUpdate ? (
        <div className="mt-6 rounded-xl border border-white/5 bg-mbn-panel/30 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">
            Latest Map Update
          </p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              { label: "Restriction", value: user.latestMapUpdate.feltRestricted },
              { label: "New space", value: user.latestMapUpdate.createdSpace },
              { label: "Signal clearer", value: user.latestMapUpdate.signalClearer },
              { label: "Unfamiliar position", value: user.latestMapUpdate.unfamiliarPosition },
              { label: "Escape / compensation", value: user.latestMapUpdate.escapeOrCompensation },
              { label: "Next direction", value: user.latestMapUpdate.directionToExplore },
              { label: "Navigation", value: user.latestMapUpdate.stayedCourseOrRedirected },
            ]
              .filter((f) => f.value)
              .map((field) => (
                <div key={field.label}>
                  <p className="text-xs text-electric-bright">{field.label}</p>
                  <p className="text-mbn-steel">{field.value}</p>
                </div>
              ))}
          </div>
          {user.intuitionNote && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <p className="text-xs font-medium text-electric-bright">Intuition note</p>
              <p className="mt-1 text-sm text-mbn-steel">{user.intuitionNote}</p>
            </div>
          )}
          {user.latestMapUpdate.coachShouldKnow && (
            <div className="mt-4 border-t border-white/5 pt-4">
              <p className="text-xs font-medium text-electric-bright">Coach should know</p>
              <p className="mt-1 text-sm text-mbn-steel">{user.latestMapUpdate.coachShouldKnow}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 p-5 text-center">
          <p className="text-sm text-mbn-steel-dim">No map update submitted yet</p>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-electric-primary/20 bg-electric-glow/5 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-electric-bright">
          Recommended Coach Action
        </p>
        <p className="mt-2 text-sm leading-relaxed text-mbn-white">{user.recommendedCoachAction}</p>
      </div>
    </div>
  );
}

export default function CoachDashboardPage() {
  const [selectedId, setSelectedId] = useState(MOCK_COACH_USERS[0].id);
  const selectedUser = MOCK_COACH_USERS.find((u) => u.id === selectedId)!;

  const stats = {
    total: MOCK_COACH_USERS.length,
    needsAction: MOCK_COACH_USERS.filter(
      (u) => u.completionStatus === "reflection_submitted" || u.completionStatus === "not_started"
    ).length,
    inProgress: MOCK_COACH_USERS.filter((u) => u.completionStatus === "in_progress").length,
  };

  return (
    <PageShell
      title="Mission Control"
      subtitle="Center Intelligence for coach-guided human calibration. Review explorers, map updates, signal status, and next missions."
      backHref="/"
      maxWidth="6xl"
    >
      <p className="-mt-4 mb-6 text-xs font-medium uppercase tracking-wider text-electric-bright/70">
        Center Intelligence · Active
      </p>

      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Active explorers", value: stats.total },
          { label: "Needs attention", value: stats.needsAction },
          { label: "In mission", value: stats.inProgress },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-4 text-center sm:p-5">
            <p className="font-display text-2xl text-mbn-white sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-mbn-steel-dim">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-mbn-steel-dim">
            Explorers
          </h2>
          <ul className="space-y-2">
            {MOCK_COACH_USERS.map((user) => (
              <li key={user.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(user.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selectedId === user.id
                      ? "border-electric-primary/40 bg-electric-glow/10 shadow-glow-sm"
                      : "border-white/5 bg-mbn-panel/30 hover:bg-mbn-panel/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-mbn-white">{user.name}</span>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusColor(user.completionStatus)}`}
                    >
                      {user.fogClearedPercent}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-mbn-steel-dim">
                    {user.currentPillar} · {user.currentStep}
                  </p>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-white/5 bg-mbn-panel/40 p-4">
            <p className="text-xs text-mbn-steel-dim">
              Demo data. In production, Mission Control syncs scan data, mission progress, map
              updates, and signal maps in real time.
            </p>
            <Link
              href="/assessment"
              className="mt-3 inline-block text-xs font-medium text-electric-bright hover:underline"
            >
              Run live System Scan →
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ExplorerPanel user={selectedUser} />
        </div>
      </div>
    </PageShell>
  );
}

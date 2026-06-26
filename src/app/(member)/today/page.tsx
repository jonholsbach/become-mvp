"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMissionById } from "@/lib/assessment";
import { isUnlocked, resolveProgression } from "@/lib/domain/progression";
import { loadMapUpdate, loadProfile, loadStepChecklist } from "@/lib/storage";
import type { CenterProfile, MissionContent } from "@/lib/types";

export default function TodayMissionPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CenterProfile | null>(null);
  const [mission, setMission] = useState<MissionContent | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/enter");
      return;
    }
    const progression = resolveProgression(saved, loadMapUpdate(), loadStepChecklist());
    if (!isUnlocked(progression, "workout")) {
      router.replace("/dashboard");
      return;
    }
    setProfile(saved);
    setMission(getMissionById(saved.firstStepId));
    setLoaded(true);
  }, [router]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  if (!loaded || !profile || !mission) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
      </div>
    );
  }

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="mx-auto min-h-[80vh] max-w-lg px-4 py-6 sm:py-10">
      <p className="text-center text-[10px] uppercase tracking-[0.2em] text-electric-bright">
        Workout Mode
      </p>
      <h1 className="mt-2 text-center font-display text-2xl text-mbn-white">
        {mission.title.replace("Recalibration Scan", "Enter the Body")}
      </h1>

      <section className="mt-8 space-y-4">
        <GymBlock label="What am I doing?" value={mission.movementAssignment} />
        <GymBlock label="What should I feel?" value={mission.signalFocus} accent />
        <GymBlock label="What should I avoid?" value="Force, guarding, compensation — redirect if signal distorts." />
        <GymBlock label="Signal cue" value={profile.awarenessCue} />
      </section>

      <div className="mt-8 rounded-2xl border border-electric-primary/20 bg-mbn-panel/60 p-6 text-center">
        <p className="text-xs uppercase tracking-wider text-mbn-steel-dim">Timer</p>
        <p className="mt-2 font-display text-5xl tabular-nums text-mbn-white">
          {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </p>
        <button type="button" onClick={() => setRunning((r) => !r)} className="btn-primary mt-4 w-full">
          {running ? "Pause" : "Begin"}
        </button>
      </div>

      <div className="mt-8 space-y-3">
        <Link href="/reflection" className="btn-secondary block w-full text-center">
          Log reflection
        </Link>
        <Link href="/module" className="block text-center text-xs text-mbn-steel-dim hover:text-electric-bright">
          Full mission briefing
        </Link>
      </div>
    </div>
  );
}

function GymBlock({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${accent ? "border-electric-primary/30 bg-electric-glow/5" : "border-white/5 bg-mbn-panel/40"}`}
    >
      <p className="text-[10px] font-medium uppercase tracking-wider text-mbn-steel-dim">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-mbn-steel">{value}</p>
    </div>
  );
}

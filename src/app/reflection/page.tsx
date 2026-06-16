"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { FogIndicator } from "@/components/FogIndicator";
import { POST_MISSION_FOG } from "@/lib/pillars";
import type { MapUpdateSubmission } from "@/lib/types";
import { loadProfile, loadMapUpdate, saveMapUpdate } from "@/lib/storage";

const PROMPT = "What changed in the territory?";

export default function ReflectionPage() {
  const router = useRouter();
  const [feltRestricted, setFeltRestricted] = useState("");
  const [createdSpace, setCreatedSpace] = useState("");
  const [signalClearer, setSignalClearer] = useState("");
  const [coachShouldKnow, setCoachShouldKnow] = useState("");
  const [unfamiliarPosition, setUnfamiliarPosition] = useState("");
  const [escapeOrCompensation, setEscapeOrCompensation] = useState("");
  const [directionToExplore, setDirectionToExplore] = useState("");
  const [stayedCourseOrRedirected, setStayedCourseOrRedirected] = useState("");
  const [intuitionNote, setIntuitionNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const profile = loadProfile();
    if (!profile) {
      router.replace("/assessment");
      return;
    }

    const existing = loadMapUpdate();
    if (existing) {
      setFeltRestricted(existing.feltRestricted);
      setCreatedSpace(existing.createdSpace);
      setSignalClearer(existing.signalClearer);
      setCoachShouldKnow(existing.coachShouldKnow);
      setUnfamiliarPosition(existing.unfamiliarPosition);
      setEscapeOrCompensation(existing.escapeOrCompensation);
      setDirectionToExplore(existing.directionToExplore);
      setStayedCourseOrRedirected(existing.stayedCourseOrRedirected);
      setIntuitionNote(existing.intuitionNote);
      setSubmitted(true);
    }
    setLoaded(true);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const update: MapUpdateSubmission = {
      feltRestricted,
      createdSpace,
      signalClearer,
      coachShouldKnow,
      unfamiliarPosition,
      escapeOrCompensation,
      directionToExplore,
      stayedCourseOrRedirected,
      intuitionNote,
      submittedAt: new Date().toISOString(),
    };
    saveMapUpdate(update);
    setSubmitted(true);
  }

  const inputClassName =
    "mt-2 w-full rounded-xl border border-white/10 bg-mbn-panel/50 px-4 py-3 text-sm text-mbn-white placeholder:text-mbn-steel-dim focus:border-electric-primary/50 focus:outline-none focus:ring-1 focus:ring-electric-primary/30";

  if (!loaded) {
    return (
      <PageShell maxWidth="2xl">
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-electric-primary" />
        </div>
      </PageShell>
    );
  }

  if (submitted) {
    return (
      <PageShell maxWidth="2xl">
        <FogIndicator metrics={POST_MISSION_FOG} compact />
        <div className="mt-6 glass-panel border-electric-primary/20 bg-electric-glow/5 p-8 text-center shadow-glow-sm sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-electric-primary/20">
            <svg className="h-7 w-7 text-electric-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-3xl text-mbn-white">Map updated</h1>
          <p className="mx-auto mt-3 max-w-md text-mbn-steel">
            Fog cleared: 15%. New signal integrated. Mission Control will review your map update and
            recommend the next mission.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/coach" className="btn-primary">
              View Mission Control
            </Link>
            <Link href="/profile" className="btn-secondary">
              Back to Center Profile
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  const fields = [
    { id: "feltRestricted", label: "Where did you feel restriction?", value: feltRestricted, set: setFeltRestricted, required: true, placeholder: "Guarding, tightness, resistance..." },
    { id: "createdSpace", label: "Where did you feel new space?", value: createdSpace, set: setCreatedSpace, required: true, placeholder: "Opening, release, new coordinate access..." },
    { id: "signalClearer", label: "What signal became clearer?", value: signalClearer, set: setSignalClearer, required: true, placeholder: "Distortion, compensation, or clarity..." },
    { id: "unfamiliarPosition", label: "What position felt most unfamiliar?", value: unfamiliarPosition, set: setUnfamiliarPosition, required: false, placeholder: "A coordinate your body rarely visits..." },
    { id: "escapeOrCompensation", label: "Where did your body try to escape or compensate?", value: escapeOrCompensation, set: setEscapeOrCompensation, required: false, placeholder: "Default patterns, guarding, force..." },
    { id: "directionToExplore", label: "What direction do you feel called to explore next?", value: directionToExplore, set: setDirectionToExplore, required: false, placeholder: "The next coordinate on the map..." },
    { id: "stayedCourseOrRedirected", label: "Did you stay the course or redirect the ship?", value: stayedCourseOrRedirected, set: setStayedCourseOrRedirected, required: false, placeholder: "How you navigated by signal..." },
    { id: "intuitionNote", label: "What did your intuition tell you?", value: intuitionNote, set: setIntuitionNote, required: false, placeholder: "Inner navigation, gut signal..." },
    { id: "coachShouldKnow", label: "What should your coach know before the next mission?", value: coachShouldKnow, set: setCoachShouldKnow, required: false, placeholder: "Context for Mission Control..." },
  ];

  return (
    <PageShell
      title="Map Update"
      subtitle="Update the internal map with what you discovered in the territory."
      backHref="/module"
      maxWidth="2xl"
    >
      <div className="mb-6 rounded-xl border border-white/5 bg-mbn-panel/30 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-mbn-steel-dim">Prompt</p>
        <p className="mt-2 text-sm italic text-mbn-steel">&ldquo;{PROMPT}&rdquo;</p>
        <p className="mt-3 text-xs text-electric-primary/80">
          The program gives you a map. Your body gives you the signal. Learn to use both.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="text-sm font-medium text-mbn-white">
              {field.label}
            </label>
            <textarea
              id={field.id}
              required={field.required}
              rows={2}
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.placeholder}
              className={inputClassName}
            />
          </div>
        ))}

        <button type="submit" className="btn-primary w-full sm:w-auto">
          Submit Map Update
        </button>
      </form>
    </PageShell>
  );
}

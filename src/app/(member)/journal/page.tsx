"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { loadMapUpdate, loadProfile } from "@/lib/storage";
import type { CenterProfile, MapUpdateSubmission } from "@/lib/types";

export default function JournalPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CenterProfile | null>(null);
  const [entries, setEntries] = useState<MapUpdateSubmission[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/assessment");
      return;
    }
    const update = loadMapUpdate();
    setProfile(saved);
    setEntries(update ? [update] : []);
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
      title="Journal"
      subtitle="Map updates and discovery notes — the territory you have explored and what it revealed."
      backHref="/universe"
      backLabel="Universe"
      maxWidth="4xl"
    >
      {entries.length === 0 ? (
        <div className="glass-panel border-dashed p-10 text-center">
          <p className="text-mbn-steel">No map updates yet.</p>
          <p className="mt-2 text-sm text-mbn-steel-dim">
            Complete a mission and submit a Map Update to begin your journal.
          </p>
          <Link href="/module" className="btn-primary mt-6 inline-flex">
            Continue mission
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <article key={entry.submittedAt} className="glass-panel p-6 sm:p-8">
              <p className="text-xs text-mbn-steel-dim">
                {new Date(entry.submittedAt).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Restriction felt", value: entry.feltRestricted },
                  { label: "Space created", value: entry.createdSpace },
                  { label: "Signal clearer", value: entry.signalClearer },
                  { label: "Unfamiliar position", value: entry.unfamiliarPosition },
                  { label: "Compensation", value: entry.escapeOrCompensation },
                  { label: "Next direction", value: entry.directionToExplore },
                  { label: "Navigation", value: entry.stayedCourseOrRedirected },
                ]
                  .filter((f) => f.value)
                  .map((field) => (
                    <div key={field.label}>
                      <p className="text-xs font-medium text-electric-bright">{field.label}</p>
                      <p className="mt-1 text-sm text-mbn-steel">{field.value}</p>
                    </div>
                  ))}
              </div>
              {entry.intuitionNote && (
                <div className="mt-4 border-t border-white/5 pt-4">
                  <p className="text-xs font-medium text-electric-bright">Intuition</p>
                  <p className="mt-1 text-sm italic text-mbn-steel">{entry.intuitionNote}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}

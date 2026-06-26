"use client";

import { computeAssessmentMetrics } from "@/lib/assessment-metrics";
import type {
  AssessmentAnswers,
  CenterProfile,
  MapUpdateSubmission,
  PositionCardData,
  SignalMapRegion,
} from "@/lib/types";
import type { StorageAdapter, StorageKeys } from "./types";
import { DEFAULT_STORAGE_KEYS } from "./types";

const DEFAULT_SIGNAL_MAP: SignalMapRegion[] = [
  { name: "Anterior shoulder", signal: "red" },
  { name: "Upper trap", signal: "red" },
  { name: "Hip flexor", signal: "red" },
  { name: "Lower trap", signal: "blue" },
  { name: "External rotators", signal: "blue" },
  { name: "Glute med", signal: "blue" },
  { name: "Deep core", signal: "blue" },
];

const DEFAULT_POSITION_CARD: PositionCardData = {
  defaultPosition: "Seated flexion",
  oppositeCoordinate: "Hip extension + open chest",
  directionBackToCenter: "Open front body, activate posterior chain",
  timeToSpendThere: "2–5 minutes daily",
};

function migrateProfile(data: Record<string, unknown>, getAssessment: () => AssessmentAnswers | null): CenterProfile {
  const positionCardRaw = data.positionCard as Partial<PositionCardData> | undefined;

  const migrated: CenterProfile = {
    archetype: (data.archetype as string) ?? "The New Explorer",
    archetypeDescription: (data.archetypeDescription as string) ?? "",
    primaryDistortion:
      (data.primaryDistortion as string) ?? (data.primaryConstraint as string) ?? "",
    directionBackToCenter:
      (data.directionBackToCenter as string) ?? (data.recommendedFocus as string) ?? "",
    pathway: (data.pathway as string) ?? "Return to Center",
    pathwayDescription:
      (data.pathwayDescription as string) ??
      "The opening journey — scan the system and reclaim your first coordinates.",
    firstRecalibrationStep:
      (data.firstRecalibrationStep as string) ??
      (data.firstModuleTitle as string) ??
      "Mission 01: Recalibration Scan",
    firstStepId:
      (data.firstStepId as string) ?? (data.firstModuleId as string) ?? "recalibration-scan",
    awarenessCue: (data.awarenessCue as string) ?? "Slow down. Feel before you move.",
    positionalDrift:
      (data.positionalDrift as string) ??
      "Forward sphere drift from seated life and shoulder protraction.",
    unexploredTerritory:
      (data.unexploredTerritory as string) ??
      "Back of the sphere: hip extension, overhead reach, upper-back access.",
    primaryCoordinateToReclaim:
      (data.primaryCoordinateToReclaim as string) ??
      "Shoulders overhead with external rotation while ribs and pelvis stay organized.",
    navigationRule:
      (data.navigationRule as string) ??
      "If the movement creates more signal and space, continue. If it creates force, guarding, or compensation, redirect.",
    signalMap: Array.isArray(data.signalMap)
      ? (data.signalMap as SignalMapRegion[])
      : DEFAULT_SIGNAL_MAP,
    positionCard: {
      ...DEFAULT_POSITION_CARD,
      ...positionCardRaw,
    },
    currentPillar: (data.currentPillar as string) ?? "Breathe",
    fogClearedPercent: typeof data.fogClearedPercent === "number" ? data.fogClearedPercent : 8,
    backSphereAccessPercent:
      typeof data.backSphereAccessPercent === "number" ? data.backSphereAccessPercent : 12,
    assessmentMetrics: data.assessmentMetrics as CenterProfile["assessmentMetrics"],
  };

  if (!migrated.assessmentMetrics) {
    migrated.assessmentMetrics = computeAssessmentMetrics(migrated, getAssessment());
  }

  return migrated;
}

function migrateMapUpdate(data: Record<string, unknown>): MapUpdateSubmission {
  return {
    feltRestricted: (data.feltRestricted as string) ?? (data.noticed as string) ?? "",
    createdSpace: (data.createdSpace as string) ?? "",
    signalClearer: (data.signalClearer as string) ?? (data.bodyTaught as string) ?? "",
    coachShouldKnow: (data.coachShouldKnow as string) ?? "",
    unfamiliarPosition: (data.unfamiliarPosition as string) ?? "",
    escapeOrCompensation: (data.escapeOrCompensation as string) ?? "",
    directionToExplore: (data.directionToExplore as string) ?? "",
    stayedCourseOrRedirected: (data.stayedCourseOrRedirected as string) ?? "",
    intuitionNote: (data.intuitionNote as string) ?? "",
    submittedAt: (data.submittedAt as string) ?? new Date().toISOString(),
  };
}

export function createLocalStorageAdapter(keys: StorageKeys = DEFAULT_STORAGE_KEYS): StorageAdapter {
  const getAssessment = (): AssessmentAnswers | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(keys.assessment);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AssessmentAnswers;
    } catch {
      return null;
    }
  };

  return {
    getAssessment,
    setAssessment(answers) {
      if (typeof window === "undefined") return;
      localStorage.setItem(keys.assessment, JSON.stringify(answers));
    },
    getProfile() {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem(keys.profile) ?? localStorage.getItem("foundation-profile");
      if (!raw) return null;
      try {
        return migrateProfile(JSON.parse(raw), getAssessment);
      } catch {
        return null;
      }
    },
    setProfile(profile) {
      if (typeof window === "undefined") return;
      localStorage.setItem(keys.profile, JSON.stringify(profile));
    },
    getMapUpdate() {
      if (typeof window === "undefined") return null;
      const raw =
        localStorage.getItem(keys.mapUpdate) ??
        localStorage.getItem("become-reflection") ??
        localStorage.getItem("foundation-reflection");
      if (!raw) return null;
      try {
        return migrateMapUpdate(JSON.parse(raw));
      } catch {
        return null;
      }
    },
    setMapUpdate(update) {
      if (typeof window === "undefined") return;
      localStorage.setItem(keys.mapUpdate, JSON.stringify(update));
    },
    getStepChecklist() {
      if (typeof window === "undefined") return null;
      const raw =
        localStorage.getItem(keys.stepProgress) ??
        localStorage.getItem("foundation-module-progress");
      if (!raw) return null;
      try {
        return JSON.parse(raw) as boolean[];
      } catch {
        return null;
      }
    },
    setStepChecklist(checked) {
      if (typeof window === "undefined") return;
      localStorage.setItem(keys.stepProgress, JSON.stringify(checked));
    },
    clearSession() {
      if (typeof window === "undefined") return;
      Object.values(keys).forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem("foundation-profile");
      localStorage.removeItem("foundation-reflection");
      localStorage.removeItem("foundation-module-progress");
      localStorage.removeItem("become-reflection");
    },
  };
}

export const localStorageAdapter = createLocalStorageAdapter();

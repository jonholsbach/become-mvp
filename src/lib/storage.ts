"use client";

import type {
  AssessmentAnswers,
  CenterProfile,
  MapUpdateSubmission,
  PositionCardData,
  SignalMapRegion,
} from "./types";
import { POST_MISSION_FOG, POST_SCAN_FOG, type FogMetrics } from "./pillars";

const STORAGE_KEYS = {
  assessment: "become-assessment",
  profile: "become-profile",
  mapUpdate: "become-map-update",
  stepProgress: "become-step-progress",
} as const;

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

export function saveAssessment(answers: AssessmentAnswers): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.assessment, JSON.stringify(answers));
}

export function loadAssessment(): AssessmentAnswers | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.assessment);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AssessmentAnswers;
  } catch {
    return null;
  }
}

export function saveProfile(profile: CenterProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function loadProfile(): CenterProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEYS.profile) ?? localStorage.getItem("foundation-profile");
  if (!raw) return null;
  try {
    return migrateProfile(JSON.parse(raw));
  } catch {
    return null;
  }
}

function migrateProfile(data: Record<string, unknown>): CenterProfile {
  const positionCardRaw = data.positionCard as Partial<PositionCardData> | undefined;

  return {
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
  };
}

export function saveMapUpdate(update: MapUpdateSubmission): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.mapUpdate, JSON.stringify(update));
}

export function loadMapUpdate(): MapUpdateSubmission | null {
  if (typeof window === "undefined") return null;
  const raw =
    localStorage.getItem(STORAGE_KEYS.mapUpdate) ??
    localStorage.getItem("become-reflection") ??
    localStorage.getItem("foundation-reflection");
  if (!raw) return null;
  try {
    return migrateMapUpdate(JSON.parse(raw));
  } catch {
    return null;
  }
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

/** @deprecated Use saveMapUpdate */
export const saveReflection = saveMapUpdate;

/** @deprecated Use loadMapUpdate */
export const loadReflection = loadMapUpdate;

export function saveStepChecklist(checked: boolean[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.stepProgress, JSON.stringify(checked));
}

export function loadStepChecklist(): boolean[] | null {
  if (typeof window === "undefined") return null;
  const raw =
    localStorage.getItem(STORAGE_KEYS.stepProgress) ??
    localStorage.getItem("foundation-module-progress");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as boolean[];
  } catch {
    return null;
  }
}

export const saveModuleChecklist = saveStepChecklist;
export const loadModuleChecklist = loadStepChecklist;

export function getFogMetrics(): FogMetrics {
  if (typeof window === "undefined") return POST_SCAN_FOG;
  if (loadMapUpdate()) return POST_MISSION_FOG;
  if (loadProfile()) return POST_SCAN_FOG;
  return {
    visibility: "Low",
    fogClearedPercent: 3,
    backSphereAccessPercent: 12,
    forwardDriftDetected: true,
    newSignalsDetected: 0,
    missionsAvailable: 1,
  };
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem("foundation-profile");
  localStorage.removeItem("foundation-reflection");
  localStorage.removeItem("foundation-module-progress");
  localStorage.removeItem("become-reflection");
}

import type { CenterProfile, MapUpdateSubmission } from "../types";
import { routePath, ROUTES } from "./routes";

export type JourneyStage =
  | "visitor"
  | "scanning"
  | "profile_revealed"
  | "mission_active"
  | "mission_complete"
  | "reflection_complete"
  | "world_open";

export type UnlockId =
  | "enter"
  | "dashboard"
  | "body_map"
  | "mission"
  | "workout"
  | "territory"
  | "universe"
  | "paths"
  | "journal"
  | "progress";

export interface NextStep {
  label: string;
  href: string;
  description: string;
  cta: string;
}

export interface ProgressionState {
  stage: JourneyStage;
  fogClearedPercent: number;
  unlocked: UnlockId[];
  nextStep: NextStep;
  universeHome: boolean;
}

const UNLOCK_ORDER: UnlockId[] = [
  "enter",
  "dashboard",
  "body_map",
  "mission",
  "workout",
  "territory",
  "universe",
  "paths",
  "journal",
  "progress",
];

export function resolveProgression(
  profile: CenterProfile | null,
  mapUpdate: MapUpdateSubmission | null,
  checklist: boolean[] | null,
  scanning = false
): ProgressionState {
  const missionStarted = checklist ? checklist.some(Boolean) : false;
  const missionComplete = checklist ? checklist.every(Boolean) : false;
  const hasReflection = !!mapUpdate;

  let stage: JourneyStage = "visitor";
  let fogClearedPercent = 3;
  const unlocked: UnlockId[] = ["enter"];

  if (scanning) {
    stage = "scanning";
    fogClearedPercent = 5;
    unlocked.push("dashboard");
  } else if (profile) {
    stage = "profile_revealed";
    fogClearedPercent = profile.fogClearedPercent;
    unlocked.push("dashboard", "body_map", "mission", "workout", "progress");

    if (missionStarted) stage = "mission_active";
    if (missionComplete) {
      stage = "mission_complete";
      fogClearedPercent = 12;
      unlocked.push("territory", "journal");
    }
    if (hasReflection) {
      stage = "reflection_complete";
      fogClearedPercent = 15;
      unlocked.push("universe", "paths");
    }
    if (hasReflection && fogClearedPercent >= 15) {
      stage = "world_open";
    }
  }

  const nextStep = resolveNextStep(stage, profile, missionComplete, hasReflection);
  const universeHome = unlocked.includes("universe");

  return {
    stage,
    fogClearedPercent,
    unlocked,
    nextStep,
    universeHome,
  };
}

function resolveNextStep(
  stage: JourneyStage,
  profile: CenterProfile | null,
  missionComplete: boolean,
  hasReflection: boolean
): NextStep {
  switch (stage) {
    case "visitor":
      return {
        label: "Mission #1",
        href: routePath("enter"),
        description: "Everything is fog. The map has not yet formed.",
        cta: "Enter the Body",
      };
    case "scanning":
      return {
        label: "Continue the scan",
        href: routePath("assessment"),
        description: "Signal is emerging. Keep walking.",
        cta: "Continue",
      };
    case "profile_revealed":
      return {
        label: "First mission",
        href: routePath("module"),
        description: profile
          ? `${profile.firstRecalibrationStep.replace("Mission 01", "Mission #1")} awaits.`
          : "Your first mission awaits.",
        cta: "Begin Mission #1",
      };
    case "mission_active":
      return {
        label: "Today's workout",
        href: routePath("today"),
        description: "You are inside the mission. Feel, don't count.",
        cta: "Continue workout",
      };
    case "mission_complete":
      return {
        label: "Reflection",
        href: routePath("reflection"),
        description: "The territory shifted. Capture what became visible.",
        cta: "Map update",
      };
    case "reflection_complete":
    case "world_open":
      return {
        label: hasReflection ? "Your universe" : "Dashboard",
        href: hasReflection ? routePath("universe") : routePath("dashboard"),
        description: "The world has opened. Walk where you will.",
        cta: hasReflection ? "Enter universe" : "View dashboard",
      };
    default:
      return {
        label: "Enter the Body",
        href: routePath("enter"),
        description: "Step into the fog.",
        cta: "Begin",
      };
  }
}

export function isUnlocked(progression: ProgressionState, id: UnlockId): boolean {
  return progression.unlocked.includes(id);
}

export function getUnlockLabel(id: UnlockId): string {
  const labels: Record<UnlockId, string> = {
    enter: "Enter the Body",
    dashboard: "Dashboard",
    body_map: "Body Map",
    mission: "Current Mission",
    workout: "Workout Mode",
    territory: "Territory Map",
    universe: "Universe",
    paths: "Skill Paths",
    journal: "Journal",
    progress: "Progress",
  };
  return labels[id];
}

export function getUnlockHref(id: UnlockId): string {
  const map: Record<UnlockId, keyof typeof ROUTES> = {
    enter: "enter",
    dashboard: "dashboard",
    body_map: "profile",
    mission: "module",
    workout: "today",
    territory: "territory",
    universe: "universe",
    paths: "paths",
    journal: "journal",
    progress: "dashboard",
  };
  return routePath(map[id]);
}

export const MEMBER_NAV_ORDER: UnlockId[] = UNLOCK_ORDER.filter(
  (id) => id !== "enter" && id !== "mission"
);

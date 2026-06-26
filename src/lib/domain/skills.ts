import type { CenterProfile } from "../types";

export type SkillStatus = "locked" | "approaching" | "ready" | "active";

export interface SkillPath {
  id: string;
  name: string;
  category: "push" | "pull" | "balance" | "power" | "expression";
  readiness: number;
  requiredTerritory: string[];
  recommendedMissions: string[];
  tradeoffs: string;
  futureUnlocks: string[];
  status: SkillStatus;
  prerequisites: string[];
}

const SKILL_CATALOG: Omit<SkillPath, "readiness" | "status">[] = [
  {
    id: "push-up",
    name: "Push-up",
    category: "push",
    requiredTerritory: ["Scapular stability", "Core integration"],
    recommendedMissions: ["recalibration-scan", "breath-center-reset"],
    tradeoffs: "Specializing early without center work increases shoulder compensation risk.",
    futureUnlocks: ["Handstand", "Planche progression"],
    prerequisites: [],
  },
  {
    id: "handstand",
    name: "Handstand",
    category: "push",
    requiredTerritory: ["Overhead reach", "Wrist stability", "Core anti-extension"],
    recommendedMissions: ["breath-center-reset"],
    tradeoffs: "Requires strong center — rushing overhead load without hip extension access limits progress.",
    futureUnlocks: ["Press to handstand", "One-arm balance"],
    prerequisites: ["push-up"],
  },
  {
    id: "pull-up",
    name: "Pull-up",
    category: "pull",
    requiredTerritory: ["Upper back access", "Scapular depression"],
    recommendedMissions: ["recalibration-scan", "hip-hinge-recalibration"],
    tradeoffs: "Pulling without lower trap activation reinforces upper trap dominance.",
    futureUnlocks: ["Front lever", "Muscle-up"],
    prerequisites: [],
  },
  {
    id: "front-lever",
    name: "Front Lever",
    category: "pull",
    requiredTerritory: ["Posterior chain", "Lat integration", "Core tension"],
    recommendedMissions: ["hip-hinge-recalibration"],
    tradeoffs: "High tension skill — center must hold under load or lumbar compensation appears.",
    futureUnlocks: ["Back lever", "Iron cross pathway"],
    prerequisites: ["pull-up"],
  },
  {
    id: "pistol-squat",
    name: "Pistol Squat",
    category: "balance",
    requiredTerritory: ["Hip extension", "Ankle mobility", "Single-leg control"],
    recommendedMissions: ["single-leg-recalibration"],
    tradeoffs: "Unilateral demand exposes asymmetry — center work makes this easier.",
    futureUnlocks: ["Weighted pistol", "Jump pistol"],
    prerequisites: [],
  },
  {
    id: "sprint",
    name: "Sprint",
    category: "power",
    requiredTerritory: ["Hip extension", "Hamstring elasticity", "Foot strike awareness"],
    recommendedMissions: ["hip-hinge-recalibration", "single-leg-recalibration"],
    tradeoffs: "Speed without positional awareness amplifies existing drift patterns.",
    futureUnlocks: ["Acceleration blocks", "Change of direction"],
    prerequisites: [],
  },
  {
    id: "dance",
    name: "Dance",
    category: "expression",
    requiredTerritory: ["Transverse plane", "Rhythm", "Multi-directional access"],
    recommendedMissions: ["recalibration-scan", "rhythm-anchor"],
    tradeoffs: "Expression skills reward mobility — but only after signal clarity is established.",
    futureUnlocks: ["Freestyle flow", "Partner work"],
    prerequisites: [],
  },
  {
    id: "climbing",
    name: "Climbing",
    category: "pull",
    requiredTerritory: ["Grip endurance", "Shoulder stability", "Hip extension under load"],
    recommendedMissions: ["breath-center-reset", "hip-hinge-recalibration"],
    tradeoffs: "Pull-dominant patterns without hip extension create anterior chain overload.",
    futureUnlocks: ["Boulder problems", "Lead climbing"],
    prerequisites: ["pull-up"],
  },
  {
    id: "weightlifting",
    name: "Weightlifting",
    category: "power",
    requiredTerritory: ["Hip hinge", "Overhead stability", "Triple extension"],
    recommendedMissions: ["hip-hinge-recalibration", "breath-center-reset"],
    tradeoffs: "Load magnifies distortion — center must precede intensity.",
    futureUnlocks: ["Snatch", "Clean & jerk"],
    prerequisites: [],
  },
];

function computeReadiness(profile: CenterProfile, skill: Omit<SkillPath, "readiness" | "status">): number {
  let score = profile.backSphereAccessPercent + profile.fogClearedPercent * 0.5;

  if (skill.category === "push" && profile.unexploredTerritory.includes("overhead")) score += 8;
  if (skill.category === "pull" && profile.signalMap.some((r) => r.name.includes("trap"))) score += 5;
  if (skill.category === "balance") score += profile.fogClearedPercent * 0.3;
  if (skill.category === "power") score += profile.backSphereAccessPercent * 0.4;

  return Math.min(100, Math.round(score));
}

function resolveStatus(readiness: number, fogCleared: number): SkillStatus {
  if (readiness >= 70 && fogCleared >= 12) return "ready";
  if (readiness >= 45) return "approaching";
  if (fogCleared >= 8) return "approaching";
  return "locked";
}

export function buildSkillPaths(profile: CenterProfile): SkillPath[] {
  return SKILL_CATALOG.map((skill) => {
    const readiness = computeReadiness(profile, skill);
    return {
      ...skill,
      readiness,
      status: resolveStatus(readiness, profile.fogClearedPercent),
    };
  });
}

export function getSkillById(profile: CenterProfile, id: string): SkillPath | undefined {
  return buildSkillPaths(profile).find((s) => s.id === id);
}

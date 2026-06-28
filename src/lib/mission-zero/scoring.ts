import { computeAssessmentMetrics } from "@/lib/assessment-metrics";
import { getMissionById } from "@/lib/assessment";
import type { MissionZeroAnswers } from "@/lib/domain/models/mission-zero";
import type { AssessmentAnswers, CenterProfile, SignalMapRegion } from "@/lib/types";

export function generateProfileFromMissionZero(answers: MissionZeroAnswers): CenterProfile {
  const legacy = mapToLegacyAnswers(answers);
  const signalMap = buildSignalMap(answers);
  const directionBackToCenter = resolveDirection(answers);
  const mission = getMissionById("recalibration-scan");

  const profile: CenterProfile = {
    archetype: "Explorer",
    archetypeDescription: directionBackToCenter,
    primaryDistortion: resolveDistortion(answers),
    directionBackToCenter,
    pathway: "Return to Center",
    pathwayDescription:
      "Mission 0 revealed your starting coordinates. Mission #1 begins the first discovery.",
    firstRecalibrationStep: mission.fullTitle,
    firstStepId: mission.id,
    awarenessCue: resolveAwarenessCue(answers),
    positionalDrift: resolveDrift(answers),
    unexploredTerritory: resolveUnexplored(answers),
    primaryCoordinateToReclaim: resolveOpportunity(answers),
    navigationRule:
      "If the movement creates more signal and space, continue. If it creates force, guarding, or compensation, redirect.",
    signalMap,
    positionCard: resolvePositionCard(answers),
    currentPillar: mission.pillar,
    fogClearedPercent: 8,
    backSphereAccessPercent: resolveBackAccess(answers),
  };

  profile.assessmentMetrics = computeAssessmentMetrics(profile, legacy);
  return profile;
}

function mapToLegacyAnswers(answers: MissionZeroAnswers): AssessmentAnswers {
  const signalReadingMap = {
    immediate: "ignore" as const,
    several: "pain_fatigue" as const,
    return: "some_restrictions" as const,
    connected: "trust_intuition" as const,
  };

  const defaultPositionMap = {
    sitting: "seated_flexion" as const,
    standing: "standing_compressed" as const,
    walking: "varied" as const,
    training: "training_limited" as const,
    mixed: "varied" as const,
  };

  const hardestMap: Record<string, AssessmentAnswers["hardestDirection"]> = {
    open_chest: "open_front",
    hip_extension: "hip_extension",
    overhead: "overhead",
    rotation: "spine_rotation",
    deep_squat: "hip_extension",
    balance: "back_body",
    hanging: "upper_back",
  };

  const least = answers.leastAccessible[0];
  const hardestDirection = least ? hardestMap[least] ?? "upper_back" : "upper_back";

  return {
    primaryGoal: "move_pain_free",
    trainingExperience: answers.attentionLocation === "body" ? "intermediate" : "beginner",
    biggestObstacle: answers.attentionDrift === "connected" ? "motivation" : "not_sure_what_to_do",
    painLimitation: answers.tensionAreas.includes("lower_back")
      ? "lower_back"
      : answers.tensionAreas.includes("hip_flexors")
        ? "hip"
        : "none",
    equipmentAccess: "bodyweight_only",
    trainingStyle: "functional_movement",
    consistencyLevel: answers.attentionDrift === "connected" ? "moderate" : "inconsistent",
    defaultPosition: defaultPositionMap[answers.lifePosition],
    hardestDirection,
    exerciseResistance: answers.attentionLocation === "thoughts" ? "dont_know" : "uncomfortable",
    signalReading:
      answers.signalDiscrimination === "easily"
        ? "space"
        : answers.signalDiscrimination === "sometimes"
          ? "some_restrictions"
          : signalReadingMap[answers.attentionDrift],
  };
}

function buildSignalMap(answers: MissionZeroAnswers): SignalMapRegion[] {
  const red: SignalMapRegion[] = [];
  const blue: SignalMapRegion[] = [];

  const redMap: Partial<Record<string, string>> = {
    neck: "Neck / upper trap",
    chest: "Anterior chest",
    front_shoulders: "Anterior shoulder",
    upper_traps: "Upper trap",
    lower_back: "Lumbar erectors",
    hip_flexors: "Hip flexor",
    jaw: "Jaw / suboccipital",
  };

  answers.tensionAreas.forEach((area) => {
    const name = redMap[area];
    if (name) red.push({ name, signal: "red" });
  });

  if (answers.overheadEffort === "front_shoulder" || answers.overheadEffort === "chest") {
    red.push({ name: "Anterior shoulder", signal: "red" });
  }

  blue.push(
    { name: "Lower trap", signal: "blue" },
    { name: "Deep core", signal: "blue" },
    { name: "Glute med", signal: "blue" }
  );

  if (answers.upperBackControl === "easily") {
    blue.push({ name: "External rotators", signal: "blue" });
  }

  const merged = [...red, ...blue];
  if (merged.length < 5) {
    merged.push(
      { name: "Hip flexor", signal: "red" },
      { name: "Upper trap", signal: "red" },
      { name: "Lower trap", signal: "blue" }
    );
  }

  const seen = new Set<string>();
  return merged.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });
}

function resolveDirection(answers: MissionZeroAnswers): string {
  if (answers.reflectionDrawn.trim()) return answers.reflectionDrawn.trim();
  if (answers.leastAccessible.includes("hip_extension")) return "Reclaim hip extension — access the back of the sphere";
  if (answers.leastAccessible.includes("overhead")) return "Restore overhead reach with organized ribs and pelvis";
  if (answers.bodyPattern === "forward_drift") return "Open front body, activate posterior chain";
  return "Redirect habitual drift — one coordinate at a time";
}

function resolveDistortion(answers: MissionZeroAnswers): string {
  if (answers.bodyPattern === "forward_drift") return "Forward sphere drift — seated flexion and shoulder protraction";
  if (answers.bodyPattern === "compression") return "Vertical compression — shallow breath, guarded shoulders";
  if (answers.squatEffort === "lower_back") return "Lower back compensation under flexion patterns";
  return "Habitual tension map — distorted signal in repeated positions";
}

function resolveDrift(answers: MissionZeroAnswers): string {
  const map: Record<MissionZeroAnswers["bodyPattern"], string> = {
    forward_drift: "Forward sphere drift from repeated flexion and anterior dominance.",
    extension: "Extension-dominant organization — posterior chain carries the load.",
    compression: "Vertical compression — breath and ribs locked down.",
    balanced: "Moderate drift — some coordinates accessible, others fading into fog.",
    unsure: "Pattern still forming — awareness is the first coordinate.",
  };
  return map[answers.bodyPattern];
}

function resolveUnexplored(answers: MissionZeroAnswers): string {
  if (answers.leastAccessible.includes("hip_extension")) return "Back of the sphere: hip extension, posterior chain activation.";
  if (answers.leastAccessible.includes("overhead")) return "Overhead reach — shoulders externally rotated, ribs organized.";
  if (answers.leastAccessible.includes("rotation")) return "Transverse plane — rotation through organized spine.";
  return "Coordinates lost to habit — waiting for intentional exploration.";
}

function resolveOpportunity(answers: MissionZeroAnswers): string {
  if (answers.excitedSkill.trim()) return `First skill path: ${answers.excitedSkill.trim()}`;
  return resolveDirection(answers);
}

function resolveAwarenessCue(answers: MissionZeroAnswers): string {
  if (answers.reflectionLoudest.trim()) return `Notice when ${answers.reflectionLoudest.trim().toLowerCase()} speaks — that is signal.`;
  if (answers.signalDiscrimination === "rarely") return "Slow down. Feel before you move. One sensation at a time.";
  return "Track restriction, space, and the direction that creates quiet in the nervous system.";
}

function resolvePositionCard(answers: MissionZeroAnswers) {
  const lifeLabels: Record<MissionZeroAnswers["lifePosition"], string> = {
    sitting: "Seated life",
    standing: "Standing compression",
    walking: "Walking dominant",
    training: "Training patterns",
    mixed: "Mixed daily positions",
  };
  return {
    defaultPosition: lifeLabels[answers.lifePosition],
    oppositeCoordinate: resolveDirection(answers),
    directionBackToCenter: resolveDirection(answers),
    timeToSpendThere: "2–5 minutes daily",
  };
}

function resolveBackAccess(answers: MissionZeroAnswers): number {
  let score = 10;
  if (answers.attentionLocation === "body") score += 8;
  if (answers.signalDiscrimination === "easily") score += 10;
  if (answers.attentionDrift === "connected") score += 8;
  if (answers.bodyPattern === "balanced") score += 12;
  if (answers.leastAccessible.includes("hip_extension")) score -= 4;
  return Math.min(35, Math.max(6, score));
}

export function createEmptyMissionZeroAnswers(): Partial<MissionZeroAnswers> {
  return {
    version: "mission-zero-v1",
    tensionAreas: [],
    leastAccessible: [],
  };
}

export function isMissionZeroAnswers(data: unknown): data is MissionZeroAnswers {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as MissionZeroAnswers).version === "mission-zero-v1"
  );
}

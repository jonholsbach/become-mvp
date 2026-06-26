import type { AssessmentAnswers, AssessmentMetrics, CenterProfile } from "./types";

export type { AssessmentMetrics };

export function computeAssessmentMetrics(
  profile: CenterProfile,
  answers: AssessmentAnswers | null
): AssessmentMetrics {
  const redTerritory = profile.signalMap
    .filter((r) => r.signal === "red")
    .map((r) => r.name);
  const blueTerritory = profile.signalMap
    .filter((r) => r.signal === "blue")
    .map((r) => r.name);

  const centerScore = computeCenterScore(profile, answers);
  const currentVector = profile.directionBackToCenter;
  const predictedExperience = predictExperience(profile, answers);

  return {
    centerScore,
    currentVector,
    redTerritory,
    blueTerritory,
    primaryMission: profile.firstRecalibrationStep,
    recommendedDirection: profile.primaryCoordinateToReclaim,
    predictedExperience,
  };
}

function computeCenterScore(profile: CenterProfile, answers: AssessmentAnswers | null): number {
  let score = 35 + profile.backSphereAccessPercent;

  if (answers) {
    const signalBonus: Record<string, number> = {
      ignore: 0,
      pain_fatigue: 5,
      some_restrictions: 12,
      space: 20,
      trust_intuition: 28,
    };
    score += signalBonus[answers.signalReading] ?? 0;

    if (answers.painLimitation === "none") score += 8;
    if (answers.consistencyLevel === "consistent") score += 10;
    if (answers.defaultPosition === "varied") score += 12;
  }

  return Math.min(100, Math.round(score));
}

function predictExperience(profile: CenterProfile, answers: AssessmentAnswers | null): string {
  if (answers?.hardestDirection === "upper_back") {
    return "I've never felt my upper back activate like this before.";
  }
  if (answers?.hardestDirection === "hip_extension") {
    return "My hips suddenly feel lighter — like the back of my body came online.";
  }
  if (answers?.defaultPosition === "seated_flexion" || answers?.defaultPosition === "driving_desk") {
    return "My posture feels effortless — not forced, just reorganized.";
  }
  if (answers?.signalReading === "ignore" || answers?.signalReading === "pain_fatigue") {
    return "I noticed restriction I usually skip past — and it had something to teach me.";
  }
  if (profile.primaryDistortion.includes("shoulder")) {
    return "My shoulders feel organized overhead for the first time in a while.";
  }
  return "Something unfamiliar created space — a coordinate my body had stopped visiting.";
}

import type { AssessmentAnswers, CenterProfile, CoachUser, MapUpdateSubmission } from "../types";
import { getMissionById } from "../assessment";
import { computeAssessmentMetrics } from "../assessment-metrics";

export interface MemberSession {
  hasProfile: boolean;
  hasMapUpdate: boolean;
  missionComplete: boolean;
  fogClearedPercent: number;
}

export function getMemberSession(
  profile: CenterProfile | null,
  mapUpdate: MapUpdateSubmission | null,
  checklist: boolean[] | null
): MemberSession {
  const missionComplete = checklist ? checklist.every(Boolean) : false;
  const fogClearedPercent = mapUpdate
    ? 15
    : missionComplete
      ? 12
      : profile?.fogClearedPercent ?? 3;

  return {
    hasProfile: !!profile,
    hasMapUpdate: !!mapUpdate,
    missionComplete,
    fogClearedPercent,
  };
}

export function profileToCoachUser(
  profile: CenterProfile,
  answers: AssessmentAnswers | null,
  mapUpdate: MapUpdateSubmission | null,
  checklist: boolean[] | null
): CoachUser {
  const metrics = profile.assessmentMetrics ?? computeAssessmentMetrics(profile, answers);
  const mission = getMissionById(profile.firstStepId);
  const session = getMemberSession(profile, mapUpdate, checklist);

  let completionStatus: CoachUser["completionStatus"] = "not_started";
  let completionLabel = "Scan complete — mission not started";
  let progressPercent = profile.fogClearedPercent;

  if (mapUpdate) {
    completionStatus = "reflection_submitted";
    completionLabel = "Map update submitted";
    progressPercent = 15;
  } else if (checklist?.every(Boolean)) {
    completionStatus = "completed_step";
    completionLabel = "Mission complete — map update pending";
    progressPercent = 12;
  } else if (checklist?.some(Boolean)) {
    completionStatus = "in_progress";
    completionLabel = "Mission in progress";
    progressPercent = 10;
  }

  return {
    id: "local-explorer",
    name: "You",
    explorer: profile.directionBackToCenter,
    centerProfile: profile.directionBackToCenter,
    currentPillar: profile.currentPillar,
    fogClearedPercent: session.fogClearedPercent,
    signalMapStatus: `${metrics.redTerritory.length} red · ${metrics.blueTerritory.length} blue regions mapped`,
    primaryDistortion: profile.primaryDistortion,
    directionBackToCenter: profile.directionBackToCenter,
    defaultPositionPattern: profile.positionCard.defaultPosition,
    positionalDrift: profile.positionalDrift,
    unexploredTerritory: profile.unexploredTerritory,
    resistanceType: answers?.exerciseResistance?.replace(/_/g, " ") ?? "Unknown",
    recommendedDirection: metrics.recommendedDirection,
    nextCoordinate: profile.primaryCoordinateToReclaim,
    nextMission: mission.fullTitle.replace("Mission 01", "Mission #1"),
    completionStatus,
    completionLabel,
    progressPercent,
    latestMapUpdate: mapUpdate,
    intuitionNote: mapUpdate?.intuitionNote ?? null,
    recommendedCoachAction: mapUpdate
      ? `Review map update. Confirm ${metrics.recommendedDirection.toLowerCase()} before next mission.`
      : checklist?.every(Boolean)
        ? "Prompt map update — capture what the mission revealed."
        : `Guide through ${mission.title}. Predicted experience: ${metrics.predictedExperience}`,
    pathway: profile.pathway,
    currentStep: mission.fullTitle.replace("Mission 01", "Mission #1"),
  };
}

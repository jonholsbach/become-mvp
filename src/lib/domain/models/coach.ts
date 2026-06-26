import type { MapUpdateSubmission } from "./map-update";

export interface CoachUser {
  id: string;
  name: string;
  explorer: string;
  centerProfile: string;
  currentPillar: string;
  fogClearedPercent: number;
  signalMapStatus: string;
  primaryDistortion: string;
  directionBackToCenter: string;
  defaultPositionPattern: string;
  positionalDrift: string;
  unexploredTerritory: string;
  resistanceType: string;
  recommendedDirection: string;
  nextCoordinate: string;
  nextMission: string;
  completionStatus: "not_started" | "in_progress" | "completed_step" | "reflection_submitted";
  completionLabel: string;
  progressPercent: number;
  latestMapUpdate: MapUpdateSubmission | null;
  intuitionNote: string | null;
  recommendedCoachAction: string;
  pathway: string;
  currentStep: string;
}

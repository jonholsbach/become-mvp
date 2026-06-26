import type { SignalMapRegion } from "./signal";
import type { PositionCardData } from "./signal";

export interface AssessmentMetrics {
  centerScore: number;
  currentVector: string;
  redTerritory: string[];
  blueTerritory: string[];
  primaryMission: string;
  recommendedDirection: string;
  predictedExperience: string;
}

export interface CenterProfile {
  archetype: string;
  archetypeDescription: string;
  primaryDistortion: string;
  directionBackToCenter: string;
  pathway: string;
  pathwayDescription: string;
  firstRecalibrationStep: string;
  firstStepId: string;
  awarenessCue: string;
  positionalDrift: string;
  unexploredTerritory: string;
  primaryCoordinateToReclaim: string;
  navigationRule: string;
  signalMap: SignalMapRegion[];
  positionCard: PositionCardData;
  currentPillar: string;
  fogClearedPercent: number;
  backSphereAccessPercent: number;
  assessmentMetrics?: AssessmentMetrics;
}

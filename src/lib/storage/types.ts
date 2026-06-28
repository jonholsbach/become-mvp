import type { AssessmentAnswers, CenterProfile, MapUpdateSubmission } from "@/lib/types";
import type { MissionZeroAnswers } from "@/lib/domain/models/mission-zero";

export interface StorageAdapter {
  getAssessment(): AssessmentAnswers | null;
  setAssessment(answers: AssessmentAnswers): void;
  getMissionZeroScan(): MissionZeroAnswers | null;
  setMissionZeroScan(answers: MissionZeroAnswers): void;
  getProfile(): CenterProfile | null;
  setProfile(profile: CenterProfile): void;
  getMapUpdate(): MapUpdateSubmission | null;
  setMapUpdate(update: MapUpdateSubmission): void;
  getStepChecklist(): boolean[] | null;
  setStepChecklist(checked: boolean[]): void;
  clearSession(): void;
}

export interface StorageKeys {
  assessment: string;
  missionZero: string;
  profile: string;
  mapUpdate: string;
  stepProgress: string;
}

export const DEFAULT_STORAGE_KEYS: StorageKeys = {
  assessment: "become-assessment",
  missionZero: "become-mission-zero",
  profile: "become-profile",
  mapUpdate: "become-map-update",
  stepProgress: "become-step-progress",
};

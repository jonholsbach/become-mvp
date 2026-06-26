import type { AssessmentAnswers, CenterProfile, MapUpdateSubmission } from "@/lib/types";

export interface StorageAdapter {
  getAssessment(): AssessmentAnswers | null;
  setAssessment(answers: AssessmentAnswers): void;
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
  profile: string;
  mapUpdate: string;
  stepProgress: string;
}

export const DEFAULT_STORAGE_KEYS: StorageKeys = {
  assessment: "become-assessment",
  profile: "become-profile",
  mapUpdate: "become-map-update",
  stepProgress: "become-step-progress",
};

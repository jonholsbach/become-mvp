"use client";

import { POST_MISSION_FOG, POST_SCAN_FOG, type FogMetrics } from "@/lib/pillars";
import type { AssessmentAnswers, CenterProfile, MapUpdateSubmission } from "@/lib/types";
import { localStorageAdapter } from "./storage/localStorageAdapter";
import type { StorageAdapter } from "./storage/types";

/** Default adapter — swap for API/database implementation later. */
let adapter: StorageAdapter = localStorageAdapter;

export function setStorageAdapter(next: StorageAdapter): void {
  adapter = next;
}

export function getStorageAdapter(): StorageAdapter {
  return adapter;
}

export function saveAssessment(answers: AssessmentAnswers): void {
  adapter.setAssessment(answers);
}

export function loadAssessment(): AssessmentAnswers | null {
  return adapter.getAssessment();
}

export function saveProfile(profile: CenterProfile): void {
  adapter.setProfile(profile);
}

export function loadProfile(): CenterProfile | null {
  return adapter.getProfile();
}

export function saveMapUpdate(update: MapUpdateSubmission): void {
  adapter.setMapUpdate(update);
}

export function loadMapUpdate(): MapUpdateSubmission | null {
  return adapter.getMapUpdate();
}

/** @deprecated Use saveMapUpdate */
export const saveReflection = saveMapUpdate;

/** @deprecated Use loadMapUpdate */
export const loadReflection = loadMapUpdate;

export function saveStepChecklist(checked: boolean[]): void {
  adapter.setStepChecklist(checked);
}

export function loadStepChecklist(): boolean[] | null {
  return adapter.getStepChecklist();
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
  adapter.clearSession();
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { getMemberSession, type MemberSession } from "@/lib/domain/member";
import { resolveProgression, type ProgressionState } from "@/lib/domain/progression";
import {
  loadAssessment,
  loadMapUpdate,
  loadMissionZeroScan,
  loadProfile,
  loadStepChecklist,
} from "@/lib/storage";
import type { AssessmentAnswers, CenterProfile, MapUpdateSubmission } from "@/lib/types";

export interface MemberSessionState {
  profile: CenterProfile | null;
  assessment: AssessmentAnswers | null;
  mapUpdate: MapUpdateSubmission | null;
  checklist: boolean[] | null;
  session: MemberSession;
  progression: ProgressionState;
  refresh: () => void;
}

function readSession(): Omit<MemberSessionState, "refresh"> {
  const profile = loadProfile();
  const assessment = loadAssessment();
  const mapUpdate = loadMapUpdate();
  const checklist = loadStepChecklist();
  const missionZero = loadMissionZeroScan();
  const session = getMemberSession(profile, mapUpdate, checklist);
  const scanning = !profile && !!missionZero;
  const progression = resolveProgression(profile, mapUpdate, checklist, scanning);
  return { profile, assessment, mapUpdate, checklist, session, progression };
}

export function useMemberSession(): MemberSessionState {
  const [state, setState] = useState(readSession);

  const refresh = useCallback(() => {
    setState(readSession());
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key?.startsWith("become-") || event.key?.startsWith("foundation-")) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  return { ...state, refresh };
}

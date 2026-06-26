import type { CenterProfile, MapUpdateSubmission } from "../types";
import { getMissionById } from "../assessment";
import { buildBodyMapNodes, buildTerritoryNodes, type MapNode } from "./maps";
import { buildSkillPaths, type SkillPath } from "./skills";
import { getMemberSession, type MemberSession } from "./member";

export interface UniverseState {
  session: MemberSession;
  fogClearedPercent: number;
  backSphereAccessPercent: number;
  currentMissionId: string;
  currentMissionTitle: string;
  activePillar: string;
  bodyNodes: MapNode[];
  territoryNodes: MapNode[];
  skillPaths: SkillPath[];
  journalEntryCount: number;
  predictedExperience: string;
}

export function buildUniverseState(
  profile: CenterProfile | null,
  mapUpdate: MapUpdateSubmission | null,
  checklist: boolean[] | null
): UniverseState | null {
  if (!profile) return null;

  const session = getMemberSession(profile, mapUpdate, checklist);
  const mission = getMissionById(profile.firstStepId);

  return {
    session,
    fogClearedPercent: session.fogClearedPercent,
    backSphereAccessPercent: profile.backSphereAccessPercent,
    currentMissionId: profile.firstStepId,
    currentMissionTitle: mission.fullTitle,
    activePillar: profile.currentPillar,
    bodyNodes: buildBodyMapNodes(profile),
    territoryNodes: buildTerritoryNodes(profile),
    skillPaths: buildSkillPaths(profile),
    journalEntryCount: mapUpdate ? 1 : 0,
    predictedExperience:
      profile.assessmentMetrics?.predictedExperience ??
      "A moment of unfamiliar clarity — a coordinate your body had forgotten.",
  };
}

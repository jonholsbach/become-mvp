export interface MissionContent {
  id: string;
  missionNumber: string;
  title: string;
  fullTitle: string;
  pillar: string;
  pathway: string;
  objective: string;
  territory: string;
  signalFocus: string;
  movementAssignment: string;
  completionCriteria: string[];
  reflectionGate: string;
  videoLabel: string;
}

/** @deprecated Use MissionContent */
export type StepContent = MissionContent & {
  lessonSummary?: string;
  selfCheckItems?: string[];
  reflectionPrompt?: string;
};

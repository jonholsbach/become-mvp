export interface MapUpdateSubmission {
  feltRestricted: string;
  createdSpace: string;
  signalClearer: string;
  coachShouldKnow: string;
  unfamiliarPosition: string;
  escapeOrCompensation: string;
  directionToExplore: string;
  stayedCourseOrRedirected: string;
  intuitionNote: string;
  submittedAt: string;
}

/** @deprecated Use MapUpdateSubmission */
export type ReflectionSubmission = MapUpdateSubmission & {
  bodyTaught?: string;
};

export type AttentionLocation =
  | "thoughts"
  | "between"
  | "body"
  | "unknown";

export type AttentionDrift = "immediate" | "several" | "return" | "connected";

export type DriftDestination = "future" | "past" | "random" | "planning" | "body";

export type WeightSettle = "heels" | "midfoot" | "toes" | "left" | "right" | "unsure";

export type TensionArea =
  | "neck"
  | "chest"
  | "front_shoulders"
  | "upper_traps"
  | "lower_back"
  | "hip_flexors"
  | "hamstrings"
  | "calves"
  | "jaw"
  | "other";

export type LifePosition = "sitting" | "standing" | "walking" | "training" | "mixed";

export type EffortLocation =
  | "neck"
  | "chest"
  | "front_shoulder"
  | "upper_back"
  | "lats"
  | "knees"
  | "quads"
  | "lower_back"
  | "glutes"
  | "ankles"
  | "unknown";

export type SignalControl = "easily" | "somewhat" | "difficult" | "unknown";

export type YesSomewhatNo = "yes" | "somewhat" | "no";

export type ResistanceSensation =
  | "stretch"
  | "sharp"
  | "compression"
  | "guarding"
  | "shaking"
  | "unsure";

export type RangeFeel = "relaxed" | "same" | "difficult";

export type SignalDiscrimination = "easily" | "sometimes" | "rarely";

export type BodyPattern =
  | "forward_drift"
  | "extension"
  | "compression"
  | "balanced"
  | "unsure";

export type MovementAccess =
  | "open_chest"
  | "hip_extension"
  | "overhead"
  | "rotation"
  | "deep_squat"
  | "balance"
  | "hanging";

export interface MissionZeroAnswers {
  version: "mission-zero-v1";
  attentionLocation: AttentionLocation;
  attentionDrift: AttentionDrift;
  driftDestination: DriftDestination;
  weightSettle: WeightSettle;
  tensionAreas: TensionArea[];
  lifePosition: LifePosition;
  overheadEffort: EffortLocation;
  squatEffort: EffortLocation;
  upperBackControl: SignalControl;
  chestRelax: YesSomewhatNo;
  resistanceSensation: ResistanceSensation;
  reducedRangeFeel: RangeFeel;
  signalDiscrimination: SignalDiscrimination;
  bodyPattern: BodyPattern;
  leastAccessible: MovementAccess[];
  excitedSkill: string;
  reflectionSurprised: string;
  reflectionUnfamiliar: string;
  reflectionLoudest: string;
  reflectionQuiet: string;
  reflectionDrawn: string;
}

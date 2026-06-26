export type PrimaryGoal =
  | "build_strength"
  | "lose_weight"
  | "move_pain_free"
  | "athletic_performance"
  | "general_fitness";

export type TrainingExperience = "beginner" | "returning" | "intermediate" | "advanced";

export type BiggestObstacle =
  | "consistency"
  | "pain_injury"
  | "time"
  | "motivation"
  | "not_sure_what_to_do";

export type PainLimitation =
  | "none"
  | "lower_back"
  | "knee"
  | "shoulder"
  | "hip"
  | "multiple";

export type EquipmentAccess = "bodyweight_only" | "home_basic" | "full_gym";

export type TrainingStyle =
  | "structured_programs"
  | "functional_movement"
  | "strength_focused"
  | "mixed_modal";

export type ConsistencyLevel = "starting_over" | "inconsistent" | "moderate" | "consistent";

export type DefaultPosition =
  | "seated_flexion"
  | "standing_compressed"
  | "driving_desk"
  | "training_limited"
  | "varied";

export type HardestDirection =
  | "open_front"
  | "overhead"
  | "hip_extension"
  | "spine_rotation"
  | "upper_back"
  | "back_body";

export type ExerciseResistance =
  | "obligation"
  | "dont_know"
  | "uncomfortable"
  | "inconsistent"
  | "no_enjoyment"
  | "dont_trust";

export type SignalReading =
  | "ignore"
  | "pain_fatigue"
  | "some_restrictions"
  | "space"
  | "trust_intuition";

export interface AssessmentAnswers {
  primaryGoal: PrimaryGoal;
  trainingExperience: TrainingExperience;
  biggestObstacle: BiggestObstacle;
  painLimitation: PainLimitation;
  equipmentAccess: EquipmentAccess;
  trainingStyle: TrainingStyle;
  consistencyLevel: ConsistencyLevel;
  defaultPosition: DefaultPosition;
  hardestDirection: HardestDirection;
  exerciseResistance: ExerciseResistance;
  signalReading: SignalReading;
}

export const ASSESSMENT_OPTIONS = {
  primaryGoal: [
    { value: "build_strength" as const, label: "Build real strength", description: "Restore mechanical output without compensation" },
    { value: "lose_weight" as const, label: "Reclaim body composition", description: "Move with awareness, recover, and reorganize" },
    { value: "move_pain_free" as const, label: "Move without restriction", description: "Identify and redirect patterns causing pain" },
    { value: "athletic_performance" as const, label: "Improve performance", description: "Precision, power, and resilient transfer" },
    { value: "general_fitness" as const, label: "Restore daily capacity", description: "Feel capable and present in your body" },
  ],
  trainingExperience: [
    { value: "beginner" as const, label: "Just getting started", description: "New to systematic body exploration" },
    { value: "returning" as const, label: "Coming back after a break", description: "Prior experience, need recalibration" },
    { value: "intermediate" as const, label: "Training regularly", description: "1–3 years of consistent input" },
    { value: "advanced" as const, label: "Experienced mover", description: "Strong base, seeking refinement" },
  ],
  biggestObstacle: [
    { value: "consistency" as const, label: "Rhythm instability", description: "Patterns start but don't hold" },
    { value: "pain_injury" as const, label: "Pain or injury cycle", description: "Body signals restriction repeatedly" },
    { value: "time" as const, label: "Schedule compression", description: "Life limits exploration bandwidth" },
    { value: "motivation" as const, label: "Direction uncertainty", description: "Unsure if input is correct" },
    { value: "not_sure_what_to_do" as const, label: "No clear system", description: "Too many inputs, no precise direction" },
  ],
  painLimitation: [
    { value: "none" as const, label: "No significant restriction", description: "Body signals are generally clear" },
    { value: "lower_back" as const, label: "Lower back", description: "Guarding, tightness, or load sensitivity" },
    { value: "knee" as const, label: "Knee", description: "Restriction with squatting, stairs, or impact" },
    { value: "shoulder" as const, label: "Shoulder", description: "Overhead or pressing limitations" },
    { value: "hip" as const, label: "Hip", description: "Mobility restriction or groin discomfort" },
    { value: "multiple" as const, label: "Multiple regions", description: "Several areas signaling restriction" },
  ],
  equipmentAccess: [
    { value: "bodyweight_only" as const, label: "Bodyweight only", description: "No equipment available" },
    { value: "home_basic" as const, label: "Home basics", description: "Bands, dumbbells, or kettlebells" },
    { value: "full_gym" as const, label: "Full gym access", description: "Barbells, racks, full setup" },
  ],
  trainingStyle: [
    { value: "structured_programs" as const, label: "Structured progression", description: "Clear, systematic week-to-week input" },
    { value: "functional_movement" as const, label: "Pattern-based movement", description: "Train mechanics and transfer" },
    { value: "strength_focused" as const, label: "Strength loading", description: "Compound patterns with progressive load" },
    { value: "mixed_modal" as const, label: "Integrated training", description: "Strength, conditioning, and mobility blend" },
  ],
  consistencyLevel: [
    { value: "starting_over" as const, label: "Rhythm lost", description: "Haven't explored consistently in months" },
    { value: "inconsistent" as const, label: "Unstable rhythm", description: "On and off — no reliable pattern" },
    { value: "moderate" as const, label: "Moderate stability", description: "2–3 sessions most weeks" },
    { value: "consistent" as const, label: "Stable rhythm", description: "4+ sessions, pattern holds" },
  ],
  defaultPosition: [
    { value: "seated_flexion" as const, label: "Seated, hips flexed, shoulders forward", description: "Desk, car, couch — forward drift dominant" },
    { value: "standing_compressed" as const, label: "Standing but compressed or locked", description: "Upright but guarded, shallow breath" },
    { value: "driving_desk" as const, label: "Driving or desk posture most of the day", description: "Prolonged seated forward sphere drift" },
    { value: "training_limited" as const, label: "Training positions but limited daily variety", description: "Gym patterns without positional diversity" },
    { value: "varied" as const, label: "I move through many positions daily", description: "Broader coordinate access already" },
  ],
  hardestDirection: [
    { value: "open_front" as const, label: "Opening the front of the body", description: "Chest, hip flexors, anterior chain" },
    { value: "overhead" as const, label: "Reaching overhead", description: "Shoulders overhead, external rotation" },
    { value: "hip_extension" as const, label: "Extending the hips", description: "Back of sphere — hip extension access" },
    { value: "spine_rotation" as const, label: "Rotating through the spine", description: "Transverse plane exploration" },
    { value: "upper_back" as const, label: "Accessing the upper back", description: "Scapular retraction, thoracic extension" },
    { value: "back_body" as const, label: "Feeling the back side of the body", description: "Posterior chain awareness and access" },
  ],
  exerciseResistance: [
    { value: "obligation" as const, label: "It feels like an obligation", description: "Exercise framed as duty, not exploration" },
    { value: "dont_know" as const, label: "I do not know what to do", description: "No map, no direction" },
    { value: "uncomfortable" as const, label: "My body feels uncomfortable or restricted", description: "Physical signal creates avoidance" },
    { value: "inconsistent" as const, label: "I start but do not stay consistent", description: "Rhythm doesn't hold" },
    { value: "no_enjoyment" as const, label: "I do not enjoy the process", description: "Missing the play and discovery frame" },
    { value: "dont_trust" as const, label: "I do not trust my body", description: "Fear of pain or failure" },
  ],
  signalReading: [
    { value: "ignore" as const, label: "I mostly ignore it", description: "Low internal signal awareness" },
    { value: "pain_fatigue" as const, label: "I only notice pain or fatigue", description: "Signal only at extremes" },
    { value: "some_restrictions" as const, label: "I can feel some restrictions", description: "Growing awareness of distortion" },
    { value: "space" as const, label: "I can tell when a position creates space", description: "Can read positive signal" },
    { value: "trust_intuition" as const, label: "I trust my intuition and adjust often", description: "Self-directed navigation emerging" },
  ],
} as const;

export const ASSESSMENT_STEPS: (keyof AssessmentAnswers)[] = [
  "defaultPosition",
  "hardestDirection",
  "biggestObstacle",
  "painLimitation",
  "exerciseResistance",
  "signalReading",
  "primaryGoal",
  "trainingExperience",
  "equipmentAccess",
  "trainingStyle",
  "consistencyLevel",
];

export const STEP_LABELS: Record<keyof AssessmentAnswers, string> = {
  primaryGoal: "What direction are you moving toward?",
  trainingExperience: "What is your exploration history?",
  biggestObstacle: "What pattern is pulling you furthest from center?",
  painLimitation: "Where does your body signal restriction?",
  equipmentAccess: "What equipment do you have access to?",
  trainingStyle: "What training input does your body respond to best?",
  consistencyLevel: "How stable is your current rhythm?",
  defaultPosition: "Which position do you spend the most time in?",
  hardestDirection: "What direction feels hardest to access?",
  exerciseResistance: "What creates the most resistance to exercise?",
  signalReading: "How well can you read your body's signal?",
};

export const STEP_HINTS: Partial<Record<keyof AssessmentAnswers, string>> = {
  defaultPosition: "Mapping your default coordinates in the positional sphere.",
  hardestDirection: "Identifying fog-covered territory.",
  signalReading: "Your navigation skill determines how fast the map opens.",
};

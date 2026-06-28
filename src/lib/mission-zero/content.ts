import type { MissionZeroAnswers } from "@/lib/domain/models/mission-zero";

export type MissionZeroStep =
  | {
      kind: "intro";
      id: string;
      title: string;
      paragraphs: string[];
    }
  | {
      kind: "stage-lesson";
      id: string;
      stage: string;
      title: string;
      body: string;
    }
  | {
      kind: "question";
      id: keyof MissionZeroAnswers;
      stage: string;
      prompt: string;
      hint?: string;
      input: "single" | "multi" | "text";
      options?: { value: string; label: string }[];
    };

export const MISSION_ZERO_STEPS: MissionZeroStep[] = [
  {
    kind: "intro",
    id: "mission-zero",
    title: "Mission 0 · Enter the Body",
    paragraphs: [
      "Everything is fog.",
      "Nothing is wrong. Nothing is broken.",
      "Your body is simply a landscape that has not yet been explored.",
      "Today we begin revealing the map.",
    ],
  },
  {
    kind: "intro",
    id: "before-begin",
    title: "Before We Begin",
    paragraphs: [
      "This is not a test. There are no correct answers. There is only observation.",
      "Your goal is not to perform. Your goal is to notice.",
      "The map forms every time you become aware of something you couldn't perceive before.",
      "Take one slow breath. Let's begin.",
    ],
  },
  {
    kind: "stage-lesson",
    id: "attention-lesson",
    stage: "Attention",
    title: "Before we can change the body, we have to find it.",
    body: "Most people spend their lives inside thought. The first mission is simply bringing awareness into the body.",
  },
  {
    kind: "question",
    id: "attentionLocation",
    stage: "Attention",
    prompt: "Without changing anything… where is your attention right now?",
    input: "single",
    options: [
      { value: "thoughts", label: "Mostly in my thoughts" },
      { value: "between", label: "Somewhere between thoughts and body" },
      { value: "body", label: "Mostly in my body" },
      { value: "unknown", label: "I don't know" },
    ],
  },
  {
    kind: "question",
    id: "attentionDrift",
    stage: "Attention",
    prompt: "Close your eyes for 20 seconds. Can you keep your attention inside your body?",
    input: "single",
    options: [
      { value: "immediate", label: "Almost immediately my attention drifted" },
      { value: "several", label: "It drifted several times" },
      { value: "return", label: "I could return when I noticed" },
      { value: "connected", label: "I stayed connected the entire time" },
    ],
  },
  {
    kind: "question",
    id: "driftDestination",
    stage: "Attention",
    prompt: "When your attention drifted… where did it go?",
    input: "single",
    options: [
      { value: "future", label: "Future" },
      { value: "past", label: "Past" },
      { value: "random", label: "Random thoughts" },
      { value: "planning", label: "Planning" },
      { value: "body", label: "It stayed with my body" },
    ],
  },
  {
    kind: "stage-lesson",
    id: "observation-lesson",
    stage: "Observation",
    title: "The body is constantly communicating.",
    body: "Most people simply haven't learned the language.",
  },
  {
    kind: "question",
    id: "weightSettle",
    stage: "Observation",
    prompt: "Standing naturally… where does your weight settle?",
    input: "single",
    options: [
      { value: "heels", label: "Heels" },
      { value: "midfoot", label: "Midfoot" },
      { value: "toes", label: "Toes" },
      { value: "left", label: "Left" },
      { value: "right", label: "Right" },
      { value: "unsure", label: "Unsure" },
    ],
  },
  {
    kind: "question",
    id: "tensionAreas",
    stage: "Observation",
    prompt: "Without changing posture… where do you notice the most tension?",
    hint: "Select all that apply.",
    input: "multi",
    options: [
      { value: "neck", label: "Neck" },
      { value: "chest", label: "Chest" },
      { value: "front_shoulders", label: "Front shoulders" },
      { value: "upper_traps", label: "Upper traps" },
      { value: "lower_back", label: "Lower back" },
      { value: "hip_flexors", label: "Hip flexors" },
      { value: "hamstrings", label: "Hamstrings" },
      { value: "calves", label: "Calves" },
      { value: "jaw", label: "Jaw" },
      { value: "other", label: "Other" },
    ],
  },
  {
    kind: "question",
    id: "lifePosition",
    stage: "Observation",
    prompt: "Which position do you spend most of your life in?",
    input: "single",
    options: [
      { value: "sitting", label: "Sitting" },
      { value: "standing", label: "Standing" },
      { value: "walking", label: "Walking" },
      { value: "training", label: "Training" },
      { value: "mixed", label: "Mixed" },
    ],
  },
  {
    kind: "stage-lesson",
    id: "signal-lesson",
    stage: "Signal",
    title: "Movement is not the goal. Signal is.",
    body: "The question is not: Can you move? The question is: Can you choose where the movement comes from?",
  },
  {
    kind: "question",
    id: "overheadEffort",
    stage: "Signal",
    prompt: "Reach both arms overhead. Where did you first feel effort?",
    input: "single",
    options: [
      { value: "neck", label: "Neck" },
      { value: "chest", label: "Chest" },
      { value: "front_shoulder", label: "Front shoulder" },
      { value: "upper_back", label: "Upper back" },
      { value: "lats", label: "Lats" },
      { value: "unknown", label: "I couldn't tell" },
    ],
  },
  {
    kind: "question",
    id: "squatEffort",
    stage: "Signal",
    prompt: "Perform five bodyweight squats. Where did you first feel effort?",
    input: "single",
    options: [
      { value: "knees", label: "Knees" },
      { value: "quads", label: "Quads" },
      { value: "lower_back", label: "Lower back" },
      { value: "glutes", label: "Glutes" },
      { value: "ankles", label: "Ankles" },
      { value: "unknown", label: "I couldn't tell" },
    ],
  },
  {
    kind: "question",
    id: "upperBackControl",
    stage: "Signal",
    prompt: "Can you intentionally tighten your upper back without tightening your neck?",
    input: "single",
    options: [
      { value: "easily", label: "Easily" },
      { value: "somewhat", label: "Somewhat" },
      { value: "difficult", label: "Very difficult" },
      { value: "unknown", label: "I don't know" },
    ],
  },
  {
    kind: "question",
    id: "chestRelax",
    stage: "Signal",
    prompt: "Can you intentionally relax your chest?",
    input: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "somewhat", label: "Somewhat" },
      { value: "no", label: "No" },
    ],
  },
  {
    kind: "stage-lesson",
    id: "position-lesson",
    stage: "Position",
    title: "Every position creates a different conversation with the nervous system.",
    body: "The goal is not finding the deepest position. The goal is finding the position where the nervous system becomes quieter.",
  },
  {
    kind: "question",
    id: "resistanceSensation",
    stage: "Position",
    prompt: "Raise your arm until you first feel resistance. Which best describes the sensation?",
    input: "single",
    options: [
      { value: "stretch", label: "Stretch" },
      { value: "sharp", label: "Sharp" },
      { value: "compression", label: "Compression" },
      { value: "guarding", label: "Guarding" },
      { value: "shaking", label: "Shaking" },
      { value: "unsure", label: "Unsure" },
    ],
  },
  {
    kind: "question",
    id: "reducedRangeFeel",
    stage: "Position",
    prompt: "When you slightly reduce the range… does the movement feel:",
    input: "single",
    options: [
      { value: "relaxed", label: "More relaxed" },
      { value: "same", label: "About the same" },
      { value: "difficult", label: "More difficult" },
    ],
  },
  {
    kind: "question",
    id: "signalDiscrimination",
    stage: "Position",
    prompt: "Can you distinguish between stretch, force, guarding, space, and control?",
    input: "single",
    options: [
      { value: "easily", label: "Easily" },
      { value: "sometimes", label: "Sometimes" },
      { value: "rarely", label: "Rarely" },
    ],
  },
  {
    kind: "stage-lesson",
    id: "direction-lesson",
    stage: "Direction",
    title: "Every repeated position becomes a path.",
    body: "Every path changes the landscape.",
  },
  {
    kind: "question",
    id: "bodyPattern",
    stage: "Direction",
    prompt: "Which description feels most like you?",
    input: "single",
    options: [
      { value: "forward_drift", label: "Forward drift" },
      { value: "extension", label: "Extension" },
      { value: "compression", label: "Compression" },
      { value: "balanced", label: "Balanced" },
      { value: "unsure", label: "Unsure" },
    ],
  },
  {
    kind: "question",
    id: "leastAccessible",
    stage: "Direction",
    prompt: "Which movement feels least accessible?",
    hint: "Select all that apply.",
    input: "multi",
    options: [
      { value: "open_chest", label: "Opening chest" },
      { value: "hip_extension", label: "Hip extension" },
      { value: "overhead", label: "Overhead reach" },
      { value: "rotation", label: "Rotation" },
      { value: "deep_squat", label: "Deep squat" },
      { value: "balance", label: "Balance" },
      { value: "hanging", label: "Hanging" },
    ],
  },
  {
    kind: "question",
    id: "excitedSkill",
    stage: "Direction",
    prompt: "Which movement are you most excited to develop?",
    hint: "This becomes your first skill path.",
    input: "text",
  },
  {
    kind: "stage-lesson",
    id: "reflection-lesson",
    stage: "Reflection",
    title: "Nothing changed. Except your awareness.",
    body: "That is how every journey begins.",
  },
  {
    kind: "question",
    id: "reflectionSurprised",
    stage: "Reflection",
    prompt: "During this scan… what surprised you?",
    input: "text",
  },
  {
    kind: "question",
    id: "reflectionUnfamiliar",
    stage: "Reflection",
    prompt: "What movement felt unfamiliar?",
    input: "text",
  },
  {
    kind: "question",
    id: "reflectionLoudest",
    stage: "Reflection",
    prompt: "What part of your body spoke the loudest?",
    input: "text",
  },
  {
    kind: "question",
    id: "reflectionQuiet",
    stage: "Reflection",
    prompt: "What part felt quiet?",
    input: "text",
  },
  {
    kind: "question",
    id: "reflectionDrawn",
    stage: "Reflection",
    prompt: "What direction do you feel drawn toward?",
    input: "text",
  },
];

export const MISSION_ZERO_QUESTION_COUNT = MISSION_ZERO_STEPS.filter((s) => s.kind === "question").length;

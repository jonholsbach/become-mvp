export type PillarId = "breathe" | "balance" | "burn" | "build" | "boost" | "become";

export type PillarStatus = "locked" | "available" | "discovered";

export interface Pillar {
  id: PillarId;
  name: string;
  order: number;
  status: PillarStatus;
  journeyCopy: string;
  keywords: string[];
  description: string;
  fogLanguage: string;
}

export const PILLARS: Pillar[] = [
  {
    id: "breathe",
    name: "Breathe",
    order: 1,
    status: "available",
    journeyCopy: "Orient inside the sphere. Bring awareness from the mind back into the body.",
    keywords: ["awareness", "breath", "signal detection", "presence", "body online"],
    description: "Bring awareness back into the body through breath and nervous system calibration.",
    fogLanguage: "Visibility increases as breath returns to the territory.",
  },
  {
    id: "balance",
    name: "Balance",
    order: 2,
    status: "locked",
    journeyCopy:
      "Identify red high-tension zones and blue low-signal zones. Begin restoring access to forgotten positions.",
    keywords: ["tension map", "corrective", "signal redistribution", "joint position"],
    description: "Corrective work — stretch high-tension tissue, activate dormant pathways.",
    fogLanguage: "Red and blue zones emerge as the map sharpens.",
  },
  {
    id: "burn",
    name: "Burn",
    order: 3,
    status: "locked",
    journeyCopy: "Stay present as the system heats up. Expand capacity without losing control.",
    keywords: ["capacity", "controlled fatigue", "nervous system control", "non-reactivity"],
    description: "High-volume conditioning while maintaining signal integrity under intensity.",
    fogLanguage: "Capacity expands — fog thins under controlled heat.",
  },
  {
    id: "build",
    name: "Build",
    order: 4,
    status: "locked",
    journeyCopy: "Load new positions until they become durable.",
    keywords: ["load", "hypertrophy", "alignment under pressure", "durability"],
    description: "Strength and hypertrophy while preserving alignment under load.",
    fogLanguage: "Loaded coordinates become permanent territory.",
  },
  {
    id: "boost",
    name: "Boost",
    order: 5,
    status: "locked",
    journeyCopy: "Simplify movement into front/back, on/off, compress/expand.",
    keywords: ["neural efficiency", "speed", "power", "front/back", "on/off"],
    description: "Speed, power, and neural efficiency — movement simplified to on/off control.",
    fogLanguage: "Movement becomes expression — less thinking, more signal.",
  },
  {
    id: "become",
    name: "Become",
    order: 6,
    status: "locked",
    journeyCopy: "Integrate the sphere. Move with coherence, intuition, and self-direction.",
    keywords: ["integration", "coherence", "flow", "mastery", "human calibration"],
    description: "Complete integration — breath, alignment, tension, power, and awareness unified.",
    fogLanguage: "The full sphere becomes navigable by intuition.",
  },
];

export interface FogMetrics {
  visibility: "Low" | "Moderate" | "Clearing";
  fogClearedPercent: number;
  backSphereAccessPercent: number;
  forwardDriftDetected: boolean;
  newSignalsDetected: number;
  missionsAvailable: number;
}

export const DEFAULT_FOG: FogMetrics = {
  visibility: "Low",
  fogClearedPercent: 3,
  backSphereAccessPercent: 12,
  forwardDriftDetected: true,
  newSignalsDetected: 0,
  missionsAvailable: 1,
};

export const POST_SCAN_FOG: FogMetrics = {
  visibility: "Moderate",
  fogClearedPercent: 8,
  backSphereAccessPercent: 12,
  forwardDriftDetected: true,
  newSignalsDetected: 2,
  missionsAvailable: 1,
};

export const POST_MISSION_FOG: FogMetrics = {
  visibility: "Clearing",
  fogClearedPercent: 15,
  backSphereAccessPercent: 18,
  forwardDriftDetected: true,
  newSignalsDetected: 4,
  missionsAvailable: 1,
};

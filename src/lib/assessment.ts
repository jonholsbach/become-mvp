import type { AssessmentAnswers, CenterProfile, MissionContent, SignalMapRegion } from "./types";

const MISSIONS: Record<string, MissionContent> = {
  "recalibration-scan": {
    id: "recalibration-scan",
    missionNumber: "01",
    title: "Recalibration Scan",
    fullTitle: "Mission 01: Recalibration Scan",
    pillar: "Breathe",
    pathway: "Return to Center",
    objective: "Identify the coordinates your body has stopped visiting.",
    territory:
      "Forward drift, shoulder protraction, hip flexion, and missing access to the back of the sphere.",
    signalFocus:
      "Notice the difference between stretch, force, guarding, space, and control.",
    movementAssignment:
      "Spend slow, intentional time in positions that move you away from your default shape. Do not chase range. Chase signal clarity.",
    completionCriteria: [
      "I identified one default position my body returns to.",
      "I found one position that felt unfamiliar but useful.",
      "I noticed whether my body created space or compensation.",
      "I can name the direction I need to explore next.",
    ],
    reflectionGate:
      "What position did your body resist — and what did that resistance teach you?",
    videoLabel: "Recalibration Scan Protocol — 16 min",
  },
  "breath-center-reset": {
    id: "breath-center-reset",
    missionNumber: "02",
    title: "Breath & Center Reset",
    fullTitle: "Mission 02: Breath & Center Reset",
    pillar: "Breathe",
    pathway: "Return to Center",
    objective: "Bring awareness from the mind back into the body through breath.",
    territory: "Diaphragm, rib cage orientation, and internal pressure system.",
    signalFocus: "Distinguish brace from grip. Feel breath expand without chest lifting.",
    movementAssignment:
      "Complete 3 rounds: 5 breaths supine 90/90, 10 dead bugs (slow), 30s side plank each side.",
    completionCriteria: [
      "I can feel my lower ribs expand on inhale without lifting my chest.",
      "My brace feels stable, not like I'm holding my breath.",
      "Dead bugs stay controlled — no lower back arching.",
      "I can describe what changed in my body.",
    ],
    reflectionGate: "What did breath reveal about your default tension map?",
    videoLabel: "Breath & Center Fundamentals — 12 min",
  },
  "hip-hinge-recalibration": {
    id: "hip-hinge-recalibration",
    missionNumber: "03",
    title: "Hip Hinge Recalibration",
    fullTitle: "Mission 03: Hip Hinge Recalibration",
    pillar: "Balance",
    pathway: "Return to Center",
    objective: "Restore hip-driven mechanics — reclaim the back of the sphere.",
    territory: "Posterior chain, hamstrings, hip extension coordinates.",
    signalFocus: "Feel hamstring stretch vs. lower back compensation.",
    movementAssignment:
      "Wall touch hinge drill: 3×10. Romanian deadlift pattern with dowel: 3×8. Move slowly.",
    completionCriteria: [
      "I feel the stretch in hamstrings, not sharp lower back tension.",
      "The dowel stays in contact at head, upper back, and tailbone.",
      "I found one direction that created more space.",
      "I can describe what changed in my body.",
    ],
    reflectionGate: "Did the hinge feel different from how you normally bend?",
    videoLabel: "Hip Hinge Recalibration — 14 min",
  },
  "rhythm-anchor": {
    id: "rhythm-anchor",
    missionNumber: "04",
    title: "Rhythm Anchor",
    fullTitle: "Mission 04: Rhythm Anchor",
    pillar: "Breathe",
    pathway: "Return to Center",
    objective: "Design a minimum viable exploration session you can hold every week.",
    territory: "Daily rhythm, habit design, positional consistency.",
    signalFocus: "The smallest repeatable session beats the perfect session you skip.",
    movementAssignment:
      "Design your anchor: pick 3 movements. Complete one full session today — 12–18 minutes.",
    completionCriteria: [
      "My anchor session takes under 20 minutes.",
      "I chose movements matched to my current equipment.",
      "I scheduled when this anchor happens each week.",
      "I can describe what changed in my body.",
    ],
    reflectionGate: "What would cause you to skip this anchor?",
    videoLabel: "Building Your Rhythm Anchor — 10 min",
  },
  "single-leg-recalibration": {
    id: "single-leg-recalibration",
    missionNumber: "05",
    title: "Single-Leg Recalibration",
    fullTitle: "Mission 05: Single-Leg Recalibration",
    pillar: "Balance",
    pathway: "Return to Center",
    objective: "Reveal asymmetries that pull the body off center.",
    territory: "Unilateral control, left-right signal comparison.",
    signalFocus: "Notice which leg guards, wobbles, or compensates.",
    movementAssignment:
      "Split squat holds: 3×20s each leg. Step-ups: 3×6 each leg. Single-leg RDL reach: 2×8 each leg.",
    completionCriteria: [
      "I identified where my body is guarding.",
      "I noticed asymmetry between left and right sides.",
      "I found one direction that created more space.",
      "I can describe what changed in my body.",
    ],
    reflectionGate: "Which leg is the weak link — and where does that show up in life?",
    videoLabel: "Unilateral Recalibration — 13 min",
  },
};

export function generateCenterProfile(answers: AssessmentAnswers): CenterProfile {
  const archetype = resolveArchetype(answers);
  const primaryDistortion = resolvePrimaryDistortion(answers);
  const directionBackToCenter = resolveDirectionBackToCenter(answers, primaryDistortion);
  const pathway = resolvePathway(answers);
  const firstStepId = resolveFirstStep(answers);
  const mission = MISSIONS[firstStepId];
  const awarenessCue = resolveAwarenessCue(answers, primaryDistortion);
  const positionalDrift = resolvePositionalDrift(answers);
  const unexploredTerritory = resolveUnexploredTerritory(answers);
  const primaryCoordinateToReclaim = resolvePrimaryCoordinate(answers);
  const navigationRule =
    "If the movement creates more signal and space, continue. If it creates force, guarding, or compensation, redirect.";
  const signalMap = resolveSignalMap(answers);
  const positionCard = resolvePositionCard(answers);

  return {
    archetype: archetype.name,
    archetypeDescription: archetype.description,
    primaryDistortion,
    directionBackToCenter,
    pathway: pathway.name,
    pathwayDescription: pathway.description,
    firstRecalibrationStep: mission.fullTitle,
    firstStepId,
    awarenessCue,
    positionalDrift,
    unexploredTerritory,
    primaryCoordinateToReclaim,
    navigationRule,
    signalMap,
    positionCard,
    currentPillar: mission.pillar,
    fogClearedPercent: 8,
    backSphereAccessPercent: resolveBackSphereAccess(answers),
  };
}

export const generateFoundationProfile = generateCenterProfile;

export function getMissionById(id: string): MissionContent {
  return MISSIONS[id] ?? MISSIONS["recalibration-scan"];
}

export const getStepById = getMissionById;
export const getModuleById = getMissionById;

function resolveArchetype(answers: AssessmentAnswers) {
  if (answers.painLimitation !== "none" || answers.biggestObstacle === "pain_injury") {
    return {
      name: "The Signal Restorer",
      description:
        "Your body has adapted around restriction. The first mission is orientation — bring awareness back online before intensity.",
    };
  }
  if (answers.exerciseResistance === "obligation" || answers.exerciseResistance === "no_enjoyment") {
    return {
      name: "The Reluctant Explorer",
      description:
        "Exercise has been framed as obligation. Become reframes it as map expansion — exploration, not punishment.",
    };
  }
  if (answers.consistencyLevel === "starting_over" || answers.consistencyLevel === "inconsistent") {
    return {
      name: "The Rhythm Restorer",
      description:
        "The pattern isn't missing effort — it's missing a system that holds under real life.",
    };
  }
  if (answers.signalReading === "trust_intuition" || answers.signalReading === "space") {
    return {
      name: "The Intuitive Navigator",
      description:
        "You can already read signal. Become sharpens your map and gives you precise coordinates to explore.",
    };
  }
  if (answers.trainingExperience === "beginner" || answers.biggestObstacle === "not_sure_what_to_do") {
    return {
      name: "The New Explorer",
      description:
        "You're entering unknown territory. The map starts with one scan — then one mission at a time.",
    };
  }
  return {
    name: "The Returner",
    description:
      "You know what aligned movement feels like. Become maps the fog and gives you the next coordinate to reclaim.",
  };
}

function resolvePrimaryDistortion(answers: AssessmentAnswers): string {
  if (answers.painLimitation !== "none") {
    const painLabels: Record<string, string> = {
      lower_back: "Lower back compensation — distorted signal under load",
      knee: "Knee tracking distortion — guarding in flexion patterns",
      shoulder: "Shoulder stability distortion — overhead coordinates restricted",
      hip: "Hip restriction — glute inhibition and anterior dominance",
      multiple: "Multi-region compensation — systemic forward drift",
    };
    return painLabels[answers.painLimitation];
  }
  if (answers.defaultPosition === "seated_flexion" || answers.defaultPosition === "driving_desk") {
    return "Forward sphere drift — seated flexion and shoulder protraction";
  }
  const obstacleLabels: Record<string, string> = {
    consistency: "Rhythm instability — no repeatable exploration anchor",
    pain_injury: "Unresolved restriction-pain cycle",
    time: "Schedule compression — limited time in new coordinates",
    motivation: "Direction uncertainty — fog obscures the map",
    not_sure_what_to_do: "Pattern confusion — no navigation system",
  };
  return obstacleLabels[answers.biggestObstacle];
}

function resolveDirectionBackToCenter(answers: AssessmentAnswers, distortion: string): string {
  const directionLabels: Record<string, string> = {
    open_front: "Open front body, activate posterior chain",
    overhead: "Restore overhead reach with organized ribs and pelvis",
    hip_extension: "Reclaim hip extension — access the back of the sphere",
    spine_rotation: "Restore transverse plane access through breath and control",
    upper_back: "Open upper back, activate lower traps and serratus",
    back_body: "Bring awareness to posterior chain — feel the back side",
  };

  if (answers.hardestDirection in directionLabels) {
    return directionLabels[answers.hardestDirection];
  }
  if (answers.painLimitation !== "none") {
    return "Systematic restriction scan before any loading progression";
  }
  return `Redirect ${distortion.toLowerCase()} — one coordinate at a time`;
}

function resolvePositionalDrift(answers: AssessmentAnswers): string {
  const driftLabels: Record<string, string> = {
    seated_flexion: "Forward sphere drift from seated life and shoulder protraction.",
    standing_compressed: "Vertical compression — shallow breath, locked hips, guarded shoulders.",
    driving_desk: "Prolonged desk/driving posture — hips flexed, head forward, chest shortened.",
    training_limited: "Narrow training coordinates — gym patterns without daily positional variety.",
    varied: "Moderate drift — some coordinates accessible, others fading into fog.",
  };
  return driftLabels[answers.defaultPosition];
}

function resolveUnexploredTerritory(answers: AssessmentAnswers): string {
  const territoryLabels: Record<string, string> = {
    open_front: "Front body opening — hip extension with open chest coordinates.",
    overhead: "Overhead reach — shoulders externally rotated, ribs organized.",
    hip_extension: "Back of the sphere: hip extension, posterior chain activation.",
    spine_rotation: "Transverse plane — rotation through organized spine.",
    upper_back: "Upper back access — scapular retraction, thoracic extension.",
    back_body: "Full posterior awareness — hamstrings, glutes, upper back integration.",
  };
  return territoryLabels[answers.hardestDirection] ?? "Back of the sphere — coordinates lost to forward drift.";
}

function resolvePrimaryCoordinate(answers: AssessmentAnswers): string {
  const coordinateLabels: Record<string, string> = {
    open_front: "Hip extension with open chest — ribs down, pelvis organized.",
    overhead: "Shoulders overhead with external rotation while ribs and pelvis stay organized.",
    hip_extension: "Single-leg hip extension — feel glute activation without lumbar compensation.",
    spine_rotation: "Controlled rotation — breath-led, no forcing range.",
    upper_back: "Scapular depression and retraction — lower trap activation.",
    back_body: "Posterior chain integration — hinge pattern with hip-driven mechanics.",
  };
  return coordinateLabels[answers.hardestDirection] ?? "Organized overhead reach with external rotation.";
}

function resolveSignalMap(answers: AssessmentAnswers): SignalMapRegion[] {
  const base: SignalMapRegion[] = [
    { name: "Anterior shoulder", signal: "red" },
    { name: "Upper trap", signal: "red" },
    { name: "Hip flexor", signal: "red" },
    { name: "Lower trap", signal: "blue" },
    { name: "External rotators", signal: "blue" },
    { name: "Glute med", signal: "blue" },
    { name: "Deep core", signal: "blue" },
  ];

  if (answers.painLimitation === "lower_back") {
    base.push({ name: "Erector spinae", signal: "red" });
  }
  if (answers.painLimitation === "hip") {
    base[2] = { name: "Hip flexor / TFL", signal: "red" };
  }
  if (answers.defaultPosition === "varied") {
    base.push({ name: "Diaphragm", signal: "integrated" });
  }

  return base;
}

function resolvePositionCard(answers: AssessmentAnswers) {
  const defaults: Record<string, { default: string; opposite: string; direction: string }> = {
    seated_flexion: {
      default: "Seated flexion",
      opposite: "Hip extension + open chest",
      direction: "Open front body, activate posterior chain",
    },
    standing_compressed: {
      default: "Standing compression",
      opposite: "Overhead reach + hip extension",
      direction: "Decompress spine, expand breath, open shoulders",
    },
    driving_desk: {
      default: "Desk / driving posture",
      opposite: "Hip extension + thoracic extension",
      direction: "Reverse forward drift — open chest, activate glutes",
    },
    training_limited: {
      default: "Limited gym patterns",
      opposite: "Daily positional variety",
      direction: "Spend time in coordinates outside training",
    },
    varied: {
      default: "Mixed daily positions",
      opposite: "Targeted restriction coordinates",
      direction: "Focus on hardest-direction access",
    },
  };

  const pos = defaults[answers.defaultPosition] ?? defaults.seated_flexion;

  return {
    defaultPosition: pos.default,
    oppositeCoordinate: pos.opposite,
    directionBackToCenter: pos.direction,
    timeToSpendThere: "2–5 minutes daily",
  };
}

function resolveBackSphereAccess(answers: AssessmentAnswers): number {
  const accessMap: Record<string, number> = {
    seated_flexion: 8,
    standing_compressed: 12,
    driving_desk: 6,
    training_limited: 15,
    varied: 22,
  };
  return accessMap[answers.defaultPosition] ?? 12;
}

function resolveAwarenessCue(answers: AssessmentAnswers, distortion: string): string {
  if (answers.signalReading === "ignore" || answers.signalReading === "pain_fatigue") {
    return "Slow down. Feel before you move. The body gives signal — learn to listen.";
  }
  if (answers.painLimitation === "lower_back") {
    return "Notice when ribs flare or lower back arches — that's compensation, not center.";
  }
  if (answers.defaultPosition === "seated_flexion" || answers.defaultPosition === "driving_desk") {
    return "Notice forward drift — where does your head, shoulders, and hips settle by default?";
  }
  return `Track one signal related to: ${distortion.toLowerCase()}`;
}

function resolvePathway(answers: AssessmentAnswers) {
  return {
    name: "Return to Center",
    description:
      "The opening journey — scan the system, identify distorted signal, and reclaim your first coordinates. Mission 01 begins in the Breathe pillar.",
  };
}

function resolveFirstStep(_answers: AssessmentAnswers): string {
  return "recalibration-scan";
}

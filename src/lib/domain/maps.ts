import type { CenterProfile, SignalMapRegion } from "../types";

/** Map node — future-ready for 3D body / territory / universe visualization. */
export interface MapNode {
  id: string;
  label: string;
  layer: "body" | "territory" | "mission" | "skill" | "fog";
  signal: SignalMapRegion["signal"] | "unknown";
  /** 0 = fully fogged, 1 = fully revealed */
  clarity: number;
  unlocked: boolean;
  coordinates: { x: number; y: number; z: number };
  parentId?: string;
}

export interface TerritoryRegion {
  id: string;
  name: string;
  signal: "red" | "blue" | "integrated";
  fogDensity: number;
  description: string;
}

export function buildBodyMapNodes(profile: CenterProfile): MapNode[] {
  return profile.signalMap.map((region, index) => ({
    id: `body-${index}`,
    label: region.name,
    layer: "body" as const,
    signal: region.signal,
    clarity: region.signal === "integrated" ? 0.85 : region.signal === "blue" ? 0.55 : 0.35,
    unlocked: region.signal !== "red" || profile.fogClearedPercent > 10,
    coordinates: {
      x: 0.2 + (index % 3) * 0.28,
      y: 0.15 + Math.floor(index / 3) * 0.3,
      z: region.signal === "red" ? 0.1 : 0.5,
    },
  }));
}

export function buildTerritoryNodes(profile: CenterProfile): MapNode[] {
  const redTerritory = profile.assessmentMetrics?.redTerritory ?? [];
  const blueTerritory = profile.assessmentMetrics?.blueTerritory ?? [];

  return [
    ...redTerritory.map((name, i) => ({
      id: `territory-red-${i}`,
      label: name,
      layer: "territory" as const,
      signal: "red" as const,
      clarity: 0.25 + profile.fogClearedPercent / 200,
      unlocked: profile.fogClearedPercent >= 8,
      coordinates: { x: 0.15 + i * 0.2, y: 0.6, z: 0.2 },
    })),
    ...blueTerritory.map((name, i) => ({
      id: `territory-blue-${i}`,
      label: name,
      layer: "territory" as const,
      signal: "blue" as const,
      clarity: 0.45 + profile.fogClearedPercent / 150,
      unlocked: true,
      coordinates: { x: 0.55 + i * 0.15, y: 0.35, z: 0.6 },
    })),
    {
      id: "territory-center",
      label: "Center",
      layer: "territory" as const,
      signal: "integrated" as const,
      clarity: profile.fogClearedPercent / 100,
      unlocked: profile.fogClearedPercent >= 5,
      coordinates: { x: 0.5, y: 0.5, z: 0.8 },
    },
  ];
}

export function extractTerritoryRegions(profile: CenterProfile): TerritoryRegion[] {
  return profile.signalMap.map((region, index) => ({
    id: `region-${index}`,
    name: region.name,
    signal: region.signal,
    fogDensity: region.signal === "red" ? 0.75 : region.signal === "blue" ? 0.4 : 0.15,
    description:
      region.signal === "red"
        ? "Distorted signal — stretch and restore access"
        : region.signal === "blue"
          ? "Under-active — activate with control"
          : "Integrated — maintain and expand",
  }));
}

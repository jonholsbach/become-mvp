export type AppZone = "public" | "member" | "studio";

export interface AppRoute {
  path: string;
  zone: AppZone;
  label: string;
  /** Member routes may require progression unlock */
  memberUnlock?: import("./progression").UnlockId;
}

export const ROUTES = {
  home: { path: "/", zone: "public", label: "Home" },
  become: { path: "/become", zone: "public", label: "Become" },
  be: { path: "/be", zone: "public", label: "Be" },
  mapPreview: { path: "/map", zone: "public", label: "Map" },
  about: { path: "/about", zone: "public", label: "Mission" },
  join: { path: "/join", zone: "public", label: "Join" },
  enter: { path: "/enter", zone: "public", label: "Enter the Body" },

  assessment: { path: "/assessment", zone: "member", label: "Enter the Body", memberUnlock: "enter" },
  profile: { path: "/profile", zone: "member", label: "Body Map", memberUnlock: "body_map" },
  dashboard: { path: "/dashboard", zone: "member", label: "Command Center", memberUnlock: "dashboard" },
  module: { path: "/module", zone: "member", label: "Current Mission", memberUnlock: "mission" },
  today: { path: "/today", zone: "member", label: "Workout Mode", memberUnlock: "workout" },
  reflection: { path: "/reflection", zone: "member", label: "Map Update", memberUnlock: "mission" },
  territory: { path: "/territory", zone: "member", label: "Territory Map", memberUnlock: "territory" },
  universe: { path: "/universe", zone: "member", label: "Universe", memberUnlock: "universe" },
  paths: { path: "/paths", zone: "member", label: "Skill Paths", memberUnlock: "paths" },
  journal: { path: "/journal", zone: "member", label: "Journal", memberUnlock: "journal" },

  missionControl: { path: "/mission-control", zone: "studio", label: "Mission Control" },
  coachLegacy: { path: "/coach", zone: "studio", label: "Mission Control (redirect)" },
} as const satisfies Record<string, AppRoute>;

export type RouteKey = keyof typeof ROUTES;

export function routePath(key: RouteKey): string {
  return ROUTES[key].path;
}

export function routesInZone(zone: AppZone): AppRoute[] {
  return Object.values(ROUTES).filter((r) => r.zone === zone);
}

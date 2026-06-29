/**
 * Brand arm asset pipeline — see docs/BRAND_ASSET_PIPELINE.md
 *
 * Never crop, filter, blur, or mask the arm image in code.
 * Never edit derived PNGs in the repo — only replace the master file.
 */

/** Single source of truth — must be true PNG RGBA with alpha outside the arm */
export const ARM_MASTER = {
  path: "/images/mbn-arm-master.png",
  width: 1024,
  height: 1024,
} as const;

/**
 * Prior best placeholder — true RGBA transparency.
 * Used until a valid master is provided.
 */
export const ARM_PLACEHOLDER = {
  path: "/images/mbn-arm.png",
  width: 1024,
  height: 1024,
} as const;

/**
 * Set `true` only after verifying the master file:
 * - Real PNG (not JPEG renamed)
 * - RGBA with alpha = 0 outside the arm (not solid black/white)
 */
export const ARM_MASTER_VALID = false;

/** Nav / brand mark — verified transparent PNG (same asset as hero placeholder) */
export const NAV_LOGO = {
  path: "/images/mbn-arm.png",
  width: 1024,
  height: 1024,
} as const;

/** Future animation layer prefix — exports derived from master, never edited in repo */
export const ARM_ANIMATION_LAYERS = {
  basePath: "/images/mbn-arm-layers",
} as const;

function activeHeroSource() {
  return ARM_MASTER_VALID ? ARM_MASTER : ARM_PLACEHOLDER;
}

/** Homepage hero — master when valid, otherwise placeholder */
export function getArmHeroSrc(): string {
  return activeHeroSource().path;
}

export function getArmHeroDimensions(): { width: number; height: number } {
  const source = activeHeroSource();
  return { width: source.width, height: source.height };
}

/** Hero display scale — CSS downscale cap only; never upscale the bitmap */
export const ARM_HERO_DISPLAY_SCALE = 1.15;

export function getArmHeroMaxCssWidth(): number {
  const source = activeHeroSource();
  return Math.floor((source.width / 2) * ARM_HERO_DISPLAY_SCALE);
}

export function getArmHeroMaxCssHeight(): number {
  const source = activeHeroSource();
  const maxWidth = getArmHeroMaxCssWidth();
  return Math.round(maxWidth * (source.height / source.width));
}

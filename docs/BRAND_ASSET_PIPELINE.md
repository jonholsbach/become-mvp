# Brand Asset Pipeline

Single canonical source for all Mechanical by Nature arm imagery. **Never edit derived PNGs in the codebase.** All visual fixes happen in the master file or in surrounding atmosphere (CSS), not on the arm bitmap.

## Pipeline

```
Master Asset (mbn-arm-master.png) — must pass transparency validation
        ↓
Homepage Hero (full master, unmodified)
        ↓
Navbar Logo (separate export from master)
        ↓
Future animation layers (external exports from master)
```

Until a valid master exists, the homepage uses **`mbn-arm.png`** (placeholder) automatically.

## Files in `public/images/`

| File | Role | Edit in code? |
|------|------|---------------|
| `mbn-arm-master.png` | **Single source of truth** when valid | Replace file only |
| `mbn-arm.png` | **Verified transparent PNG** — hero + nav brand mark | Read-only; replace when master validates |
| `mbn-arm-layers/*` | Future animation layers | Add exports only |

### Invalid master (do not enable)

The file at `public/images/mbn-arm-master.png` may exist on disk but **must not be used** until it passes validation. A common failure:

- JPEG content saved with a `.png` extension
- Solid **black** (or white) pixels outside the arm instead of **alpha = 0**
- No transparent pixels at all (100% opaque canvas)

**Do not fix invalid masters with CSS masks, blend modes, or cropping.**

## Transparency validation (required before `ARM_MASTER_VALID = true`)

Before enabling the master in `src/lib/brand-assets.ts`:

1. File must be **PNG**, not JPEG renamed
2. Color mode **RGBA**
3. Pixels outside the arm must have **alpha = 0** (fully transparent)
4. Background must **not** be solid black `#000000`, white, or checkerboard baked into RGB
5. Corners of the canvas should be transparent (alpha 0), not opaque black

Quick check (Python/Pillow):

```python
from PIL import Image
im = Image.open("public/images/mbn-arm-master.png")
assert im.format == "PNG" and im.mode in ("RGBA", "LA")
rgba = im.convert("RGBA")
alpha = rgba.split()[3]
assert any(a == 0 for a in alpha.getdata()), "No transparent pixels — invalid master"
```

Then set `ARM_MASTER_VALID = true` and update `ARM_MASTER.width` / `height`.

## Code references

All paths live in **`src/lib/brand-assets.ts`**.

| Consumer | Function / constant | When master invalid |
|----------|---------------------|---------------------|
| Homepage hero | `getArmHeroSrc()` | `mbn-arm.png` |
| Homepage dimensions | `getArmHeroDimensions()` | 1024×1024 |
| Nav logo | `NAV_LOGO.path` | `mbn-arm.png` |

Components: `HomeCinematic.tsx`, `BrandLogo.tsx`, `MechanicalArmVisual.tsx`

## Master asset requirements

- **True PNG RGBA** — alpha = 0 outside the arm
- Minimum **4096px** wide (ideal; interim placeholders may be smaller)
- Arm only — no embedded text, no ground shadow, no background plate
- Full arm visible with comfortable transparent padding
- Exported once at full quality — no JPEG conversion

## Rendering rules (homepage)

**Allowed on the arm image:** downscale only, native `width`/`height` attributes

**Not allowed on the arm image:** CSS filter, blur, mask, mix-blend-mode, upscaling, cropping

**Allowed around the arm:** fog, rim glow, ground shadow (separate layers)

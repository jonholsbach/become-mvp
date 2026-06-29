# Homepage Mechanical Arm — Asset Requirements

> **See [BRAND_ASSET_PIPELINE.md](./BRAND_ASSET_PIPELINE.md)** for the canonical asset pipeline.

## Master file (required)

`public/images/mbn-arm-master.png` must be a **true transparent PNG**:

- Format: PNG (not JPEG renamed)
- Mode: RGBA
- **Alpha = 0** outside the arm — not solid black, white, or checkerboard pixels

The current file on disk **failed validation** (JPEG content, 0% transparent pixels, baked background). Homepage and nav use **`mbn-arm.png`** (verified `hasAlpha: yes`) until a valid master is supplied.

## After a valid master arrives

1. Replace `public/images/mbn-arm-master.png`
2. Run transparency validation (see pipeline doc)
3. Set `ARM_MASTER.width` / `height` and `ARM_MASTER_VALID = true` in `src/lib/brand-assets.ts`

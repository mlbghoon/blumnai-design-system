# DS-only Icon Audit Decisions

Phase 0 audit completed. Per `scripts/audit-ds-only-icons.mjs` against Remixicon's official `tags.json`.

## Result

**Only 1 DS-only icon found** out of 2,782 registry entries — extremely low overlap risk for the migration.

## Decisions

### `font-sans` (editor category) → **alias to `font-sans-serif`**

| | |
|---|---|
| DS registry key | `fontsans` |
| DS component name | `FontSansIcon` |
| Closest Remixicon equivalent | `font-sans-serif` (Remixicon: `RiFontSansSerifLine` / `RiFontSansSerifFill`) |

**Decision:** Treat DS's `font-sans` as a **registry alias** for Remixicon's `font-sans-serif`. No `custom-icons.ts` overlay needed; instead, the registry's name-mapping table will include an explicit alias entry that maps `'fontsans' → 'RiFontSansSerifLine'`.

**Rationale:**
- Visually they represent the same concept (sans-serif font icon)
- Rename would be a breaking change for any consumer using `iconType={['editor', 'font-sans']}` — alias preserves back-compat
- No functional or visual regression expected
- Phase 1's `remixicon-export-map.ts` generator can hardcode this alias

**Validation in Phase 1:** when comparing the rendered glyph of DS's old `font-sans.svg` to Remixicon's `font-sans-serif`, confirm they're visually equivalent (or close enough for the use case). If they differ significantly, fallback to keeping `font-sans` in `custom-icons.ts` overlay with the original SVG path.

## What this means for the migration

- **`custom-icons.ts` overlay**: NOT NEEDED for Remixicon-derived categories. Empty file (or skip creation).
- **Phase 1 alias map**: 1 entry — `'fontsans' → 'RiFontSansSerifLine'`, `'fontsansfill' → 'RiFontSansSerifFill'`.
- **Phase 3 cleanup**: safe to delete all 18 Remixicon-derived category SVG sources and `.ts` files. No DS-custom logic hidden inside.

## Audit invariants

For future Remixicon updates, the audit script (`scripts/audit-ds-only-icons.mjs`) should be re-run as a `prebuild` step. New DS-only icons (e.g., when DS adds a custom icon to a registered category) will be flagged. CI should fail if new DS-only entries appear without corresponding `EXPLICIT_OVERRIDES` registration.

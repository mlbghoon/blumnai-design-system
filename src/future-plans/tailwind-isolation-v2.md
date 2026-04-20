# Future plan — True Tailwind isolation (v2.0.0)

**Status:** deferred. Implemented Fix A (transform-only post-build prefix) in v1.5.1. This document captures what a full structural fix (Option 4 / Option 5) would look like.

## Why this is deferred

v1.5.1 fixes the only **actually broken** case — v3↔v4 transform compounding — via a post-build rename of `rotate-*` / `translate-*` / `scale-*` / `skew-*` / `transform*` utility class names to `ds-`-prefixed versions in `dist/index.css` + `dist/**/*.mjs`.

That leaves untouched:

- Non-transform utility **value mismatches** (e.g. `rounded-lg` = 0.5rem in consumer v3 default vs DS theme token value). One rule wins in cascade — components render correctly, but the visual result depends on source order / specificity. Not broken, just potentially off-spec.
- Any **future** v3↔v4 (or v4↔v5) divergence in a NEW utility family that uses different CSS properties between versions. Would recur the same class of bug.
- **Universal-selector preflight leak**: DS ships `*, :before, :after, ::backdrop { --tw-translate-x: 0; --tw-rotate-x: initial; ... }` and similar v4-only custom-property defaults that land on every consumer element. Idempotent with v3 consumer preflight today (same names, same values), but a latent coupling.

## Goal of v2.0.0

DS's CSS is fully isolated from consumer's Tailwind, regardless of:
- Consumer Tailwind major version (v3, v4, future v5).
- Consumer theme overrides.
- Consumer adding or removing utilities.

DS internal utilities never collide with consumer utilities by name. Consumer's `className="flex"` on a consumer `<div>` works exactly as before; DS's internal `<div>` uses DS's own (prefixed or otherwise isolated) class name.

## Chosen direction: Tailwind v4 `prefix()` for DS-generated utilities

Source:
```css
@import "tailwindcss" prefix(ds);
```

Emits DS-generated utilities as `.ds\:flex`, `.ds\:rotate-180`, etc. Source code must reference them with the variant-style `ds:` prefix (`<div className="ds:flex ds:rotate-180">`).

Alternatives considered and rejected:
- **Scope everything under `.blumnai-ds` wrapper** — forces consumer to wrap DS trees; breaks all current usage.
- **Compile DS components to scoped CSS (CSS Modules / Panda)** — largest architectural change; loses the "compose with className" ergonomics consumers currently use.
- **Post-build rename of ALL utilities (not just transforms)** — same end result as prefix, but post-build string rewriting on hundreds of utility families is fragile; Tailwind's native `prefix()` feature is purpose-built.

## Concrete scope

### Build config
- `src/index.css`: change `@import "tailwindcss"` → `@import "tailwindcss" prefix(ds)`.
- Verify `tailwind.config.js` theme extensions (colors, borderRadius, fontWeight, fontFamily, boxShadow) compose with the prefix correctly.

### Codemod target: ~191 component `.tsx` files
Exact measurements (as of v1.5.0):
- 1,251 `className=` occurrences in non-story / non-test `.tsx`
- 620 `cn(` call sites (conditional classes live here)
- 121 story files (also need the codemod)
- 142 files use standard Tailwind atomics (`flex` / `grid` / `rounded-*` / `items-*` / `justify-*`)
- 12 files use `cva()` with variant class strings — manual review after codemod

### What to prefix (Tailwind-generated atomics)
Core set — ALL standard Tailwind v4 utilities. Examples of families:
- Layout: `flex`, `grid`, `inline-flex`, `items-*`, `justify-*`, `self-*`, `place-*`
- Sizing: `w-*`, `h-*`, `min-w-*`, `max-h-*`, etc. (NOTE: DS prefers `width-*` / `height-*` custom utilities; Tailwind `w-*` / `h-*` usage should be rare — quick audit needed)
- Spacing: `p-*`, `m-*`, `gap-*` (again, rare in DS — DS prefers `padding-*` / `margin-*` / `ds-gap-*`)
- Typography: `text-left`, `text-center`, `text-right`, `font-*` weight/family (some overlap with DS custom)
- Colors (theme-extended): `text-default`, `bg-default`, `border-default`, `text-subtle`, etc. — these ARE Tailwind-generated via theme extend, so they'd also get prefixed (likely 500+ occurrences across the codebase).
- Border radius (theme-extended): `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`, `rounded-none`, `rounded-2xs`, `rounded-xs` — all Tailwind-generated via DS theme.
- Shadow (theme-extended): `shadow-card`, `shadow-modal-sm/md/lg`, `shadow-component-*`.
- Transforms: already handled in v1.5.1.
- Effects / transitions / cursor / overflow / position / z-index / display — full Tailwind utility set.

### What NOT to prefix (DS hand-authored utilities, unchanged)
These live in `src/styles/utilities.css` — plain CSS, not Tailwind-generated:
- `ds-gap-*`
- `padding-*`, `padding-x-*`, `padding-y-*`, `padding-t-*`, etc.
- `width-*`, `height-*`
- `margin-*`, `margin-x-*`, `margin-y-*`, `margin-t/r/b/l-*`
- `size-xs` / `size-sm` / `size-md` / `size-lg` / `size-xl` / `size-2xl`
- `line-height-leading-*`
- `letter-spacing-tracking-*`
- `font-body`, `font-headline`, `font-quote`, `font-code`

### Codemod strategy
1. Pilot: pick 5 diverse files (one with `cva()`, one with heavy conditional `cn()`, one story, one `AccordionItem`-style simple component, one deeply-nested Dialog/Sidebar). Hand-convert to validate prefix format + Tailwind v4 resolution.
2. Build AST-based codemod (ts-morph): walk every `className=` / `cn(...)` arg / `cva` variant value / template literal; tokenize class strings; apply prefix to Tailwind atomics while leaving DS-authored utilities alone; re-emit.
3. Maintain a deny-list (DS-authored utilities) and a known-Tailwind-atomic list (generate from `tailwindcss` at build time).
4. Run on full `src/components/` + stories. Commit in one sweep to keep diff reviewable.
5. Manual audit of the 12 `cva()` files and any file the codemod didn't touch but should have.

### Docs to update in v2.0.0
- `CLAUDE.md` core rules section — new "DS-internal vs consumer utilities" table.
- `AI.md` — add "class name naming" section for consumers.
- `skills/design-system-rules` — update with prefix convention.
- `ux-guideline/*` — code examples throughout need prefix.
- `MIGRATION.md` — v1.x → v2.0 section (breaking: DS internal class names are prefixed; consumer API surface unchanged).

### Realistic effort
- Build config: 1h
- Codemod build & test: 6–10h
- Run on src + review: 2–4h
- Run on stories + review: 2h
- `shadcn-bridge.css` + tokens review: 1–2h
- Storybook visual regression across all components: 3–5h
- Docs: 2–3h
- Publish + happytalk-front integration test: 1–2h

**Total: 20–30 hours, 2–4 working days.** Ships as **v2.0.0**.

### Risks
1. **Variant chain resolution**: Tailwind v4 prefix syntax is `ds:hover:flex` (prefix-first). Codemod must handle arbitrary-depth modifier chains correctly (`md:hover:dark:flex` → `ds:md:hover:dark:flex`). Easy to botch order.
2. **Theme-extended utilities also get prefixed** (500+ occurrences of `bg-default`, `text-subtle`, `border-default`, `rounded-lg`, `shadow-modal-sm`, etc.). Noisy but mechanical.
3. **shadcn-ported components** in `dialog/`, `select/`, `popover/`, `context-menu/`, `menubar/`, `dropdown/`, `hover-card/`, etc. were pasted from shadcn-ui and embed Tailwind classes inline — highest regression risk after codemod.
4. **Consumer composition**: consumers passing `className="padding-16"` to DS components still works (custom DS util). Consumers passing `className="flex"` also works — that's consumer's own Tailwind utility on a consumer element, unrelated to DS internals.

## Decision log
- **v1.5.1** (this release): transform-only post-build prefix. Unblocks happytalk-front. Defers general isolation.
- **v2.0.0** (future): full `prefix(ds)` refactor via codemod. Trigger = another divergence bug, or second consumer onboarding, or scheduled maintenance window.

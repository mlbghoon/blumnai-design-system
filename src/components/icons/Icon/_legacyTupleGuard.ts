// Internal — shared runtime guard for the v1.x tuple-form icon API.
//
// The public TypeScript types no longer allow tuples (v2.0+), but tuples may still
// reach the runtime through:
//   - `as any` casts
//   - plain JS consumers (no TS)
//   - API-derived data assigned to `icon`/`leadIcon`/`iconType` props
//
// Centralized here so both `Icon.tsx` and `iconProp.tsx` share one detector + one
// "logged once in prod" flag (otherwise a tuple flowing through `renderIconProp` →
// `<Icon>` could log twice in production).

declare const process: { env: { NODE_ENV?: string } } | undefined;

/**
 * Runtime-detect a legacy `[category, name]` or `[category, name, isFill]` tuple.
 * Type guard is intentionally loose — anything array-shaped that looks tuple-like
 * counts so that the dev-mode error fires for malformed inputs too.
 */
export function looksLikeLegacyTuple(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    (value.length === 2 || value.length === 3) &&
    typeof value[0] === 'string' &&
    typeof value[1] === 'string'
  );
}

/** Where the tuple was detected — drives the user-facing error message. */
export type LegacyTupleSite = 'icon-prop' | 'renderIconProp';

/**
 * "Logged once in prod" flag.
 *
 * Stored on `globalThis` (not a plain module-scope variable) so that the guarantee
 * holds even when:
 *   - The DS gets bundled twice into a consumer build (e.g., monorepo with duplicate
 *     instances, or main + `…/icons/icon-legacy` both reachable)
 *   - Vite/Webpack HMR reloads this module during development (dev path throws anyway,
 *     but we keep the symmetry)
 * Using a string-keyed slot on `globalThis` is a deliberate cross-module singleton.
 */
const PROD_FLAG_KEY = '__blumnai_ds_legacyTupleProdLogged__';
type FlagHost = { [PROD_FLAG_KEY]?: boolean };
const flagHost = globalThis as unknown as FlagHost;

/**
 * In dev: throws with the migration command embedded.
 * In prod: logs `console.error` once (module-shared flag — no double-log) and returns.
 * Caller is responsible for rendering a fallback after this returns in prod.
 */
export function handleLegacyTupleAtRuntime(site: LegacyTupleSite): void {
  const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
  const intro =
    site === 'icon-prop'
      ? '<Icon iconType={...}> (tuple form)'
      : 'icon prop tuple form';

  if (isDev) {
    throw new Error(
      `[blumnai-design-system] ${intro} was removed in v2.0.0. ` +
      'Use a Remixicon component reference (e.g., `icon={RiCheckLine}`). ' +
      'Run `npx blumnai-icon-codemod migrate ./src` to auto-migrate, ' +
      'or import from `@blumnai-studio/blumnai-design-system/icons/icon-legacy` as an escape hatch. ' +
      'See MIGRATION.md.',
    );
  }

  if (!flagHost[PROD_FLAG_KEY]) {
    flagHost[PROD_FLAG_KEY] = true;
    console.error(
      `[blumnai-design-system] ${intro} was removed in v2.0.0 — rendering fallback. ` +
      'Migrate to component refs or import from `@blumnai-studio/blumnai-design-system/icons/icon-legacy`.',
    );
  }
}

/** Test helper — reset the "logged once" flag. Not exported from the public entry. */
export function __resetLegacyTupleGuardForTests(): void {
  flagHost[PROD_FLAG_KEY] = false;
}

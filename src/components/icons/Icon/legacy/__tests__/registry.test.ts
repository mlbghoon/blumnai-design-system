import { describe, it, expect } from 'vitest';
import { hasIcon, getIconLazy, getIconNamesByCategory } from '../ui-icon-registry';
import { REMIXICON_EXPORT_MAP, REMIXICON_CATEGORY_MANIFEST } from '../remixicon-export-map';

describe('icon registry', () => {
  describe('hasIcon', () => {
    it('returns true for known registry keys', () => {
      expect(hasIcon('check')).toBe(true);
      expect(hasIcon('add')).toBe(true);
      expect(hasIcon('close')).toBe(true);
      expect(hasIcon('search')).toBe(true);
    });

    it('returns true for fill variants', () => {
      expect(hasIcon('checkfill')).toBe(true);
      expect(hasIcon('addfill')).toBe(true);
    });

    it('returns false for unknown keys', () => {
      expect(hasIcon('definitelynotanicon')).toBe(false);
      expect(hasIcon('')).toBe(false);
    });

    it('returns true for the font-sans alias (Phase 0)', () => {
      expect(hasIcon('fontsans')).toBe(true);
      expect(hasIcon('fontsansfill')).toBe(true);
    });
  });

  describe('getIconLazy', () => {
    it('returns a lazy component for known keys', () => {
      const lazyComp = getIconLazy('check');
      expect(lazyComp).toBeTruthy();
    });

    it('returns null for unknown keys', () => {
      expect(getIconLazy('definitelynotanicon')).toBe(null);
    });

    it('returns the same lazy reference on repeated calls (cache)', () => {
      const a = getIconLazy('check');
      const b = getIconLazy('check');
      expect(a).toBe(b);
    });
  });

  describe('REMIXICON_EXPORT_MAP — invariants', () => {
    it('contains critical icons', () => {
      const critical = ['check', 'add', 'close', 'search', 'settings', 'menu', 'arrowdown', 'arrowup'];
      for (const key of critical) {
        expect(REMIXICON_EXPORT_MAP[key]).toBeDefined();
      }
    });

    it('all values follow Ri[PascalCase] naming convention', () => {
      const pattern = /^Ri[A-Z0-9][A-Za-z0-9]*$/;
      for (const value of Object.values(REMIXICON_EXPORT_MAP)) {
        expect(value).toMatch(pattern);
      }
    });

    it('has Phase 0 alias for font-sans', () => {
      expect(REMIXICON_EXPORT_MAP['fontsans']).toBe('RiFontSansSerif');
      expect(REMIXICON_EXPORT_MAP['fontsansfill']).toBe('RiFontSansSerif');
    });

    it('has at least 3000 entries (regression guard)', () => {
      // If this fails dramatically (icon count drops by half), the generator likely broke.
      expect(Object.keys(REMIXICON_EXPORT_MAP).length).toBeGreaterThan(3000);
    });
  });

  describe('REMIXICON_CATEGORY_MANIFEST — invariants', () => {
    it('contains expected DS categories', () => {
      const expected = ['arrows', 'buildings', 'business', 'communication', 'design',
        'development', 'device', 'document', 'editor', 'finance', 'food', 'logos',
        'map', 'media', 'others', 'system', 'weather'];
      for (const cat of expected) {
        expect(REMIXICON_CATEGORY_MANIFEST[cat]).toBeDefined();
        expect(REMIXICON_CATEGORY_MANIFEST[cat].length).toBeGreaterThan(0);
      }
    });

    it('system category has at least 100 icons', () => {
      expect(REMIXICON_CATEGORY_MANIFEST['system'].length).toBeGreaterThan(100);
    });
  });

  describe('getIconNamesByCategory', () => {
    it('returns a category map matching the manifest', () => {
      const result = getIconNamesByCategory();
      const manifestKeys = Object.keys(REMIXICON_CATEGORY_MANIFEST);
      expect(Object.keys(result).sort()).toEqual(manifestKeys.sort());
    });

    it('returns mutable arrays (back-compat with existing callers)', () => {
      const result = getIconNamesByCategory();
      const before = result['system']?.length ?? 0;
      result['system']?.push('test-mutation');
      // The function returns a fresh copy each call — mutating shouldn't affect the manifest.
      const fresh = getIconNamesByCategory();
      expect(fresh['system']?.length).toBe(before);
    });
  });
});

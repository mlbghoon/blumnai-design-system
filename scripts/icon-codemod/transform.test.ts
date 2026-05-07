import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyTransform } from 'jscodeshift/src/testUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line @typescript-eslint/no-require-imports
const transform = require('./transform.cjs');

const FIXTURES_DIR = path.join(__dirname, '__fixtures__');

interface FixturePair {
  name: string;
  input: string;
  expected: string;
}

function loadFixturePairs(): FixturePair[] {
  const files = fs.readdirSync(FIXTURES_DIR).filter((f) => f.endsWith('.input.tsx'));
  return files.map((inputFile) => {
    const name = inputFile.replace(/\.input\.tsx$/, '');
    const expectedFile = `${name}.expected.tsx`;
    const inputPath = path.join(FIXTURES_DIR, inputFile);
    const expectedPath = path.join(FIXTURES_DIR, expectedFile);
    if (!fs.existsSync(expectedPath)) {
      throw new Error(`Missing expected fixture for ${name} (looked for ${expectedFile})`);
    }
    return {
      name,
      input: fs.readFileSync(inputPath, 'utf8'),
      expected: fs.readFileSync(expectedPath, 'utf8'),
    };
  });
}

function normalize(source: string): string {
  // Normalize trailing whitespace and line endings for comparison robustness.
  return source.replace(/\s+$/gm, '').replace(/\r\n/g, '\n').trim();
}

describe('icon codemod', () => {
  const pairs = loadFixturePairs();

  it.each(pairs)('$name', ({ input, expected }) => {
    // applyTransform returns '' (empty string) when the transform function returns undefined
    // (i.e., no changes needed). In that case, the expected output should equal the input.
    const result = applyTransform(transform, {}, { source: input, path: 'fixture.tsx' }, { parser: 'tsx' });
    const output = result === '' ? input : result;
    expect(normalize(output)).toBe(normalize(expected));
  });
});

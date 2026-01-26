import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_OUTPUT_DIR = path.join(ROOT, 'src', 'components', 'icons', 'Icon', 'icons');
const ICONS_SOURCE_DIR = path.join(ROOT, 'src', 'icons', 'source');

const category = process.argv[2];
if (!category) {
  console.error('Usage: node scripts/generate-icons-category.mjs <CategoryName>');
  process.exit(1);
}

const categorySlug = category.toLowerCase();
const ICONS_CATEGORY_DIR = path.join(ICONS_OUTPUT_DIR, categorySlug);

const REMIX_CATEGORY_DIR = path.join(ROOT, 'node_modules', 'remixicon', 'icons', category);
if (!fs.existsSync(REMIX_CATEGORY_DIR)) {
  console.error(`Category folder not found: ${REMIX_CATEGORY_DIR}`);
  process.exit(1);
}

const isDirectory = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();

const cleanCategoryOutDir = () => {
  if (!isDirectory(ICONS_CATEGORY_DIR)) return;
  const entries = fs.readdirSync(ICONS_CATEGORY_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.tsx')) continue;
    fs.unlinkSync(path.join(ICONS_CATEGORY_DIR, entry.name));
  }
};

const toPascalCase = (name) =>
  name
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toValidComponentBaseName = (rawBaseName) => {
  const parts = rawBaseName
    .split('-')
    .filter(Boolean)
    .map((part) => {
      // e.g. "3d" -> "3D", "2fa" -> "2Fa"
      const match = /^(\d+)([a-z].*)$/i.exec(part);
      if (match) {
        const [, digits, rest] = match;
        return `${digits}${rest.charAt(0).toUpperCase()}${rest.slice(1)}`;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');

  // TS identifiers cannot start with a number
  if (/^\d/.test(parts)) return `_${parts}`;
  return parts;
};

const writeFile = (outPath, contents) => {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, contents);
};

const makeCategoryComponentTsx = (componentName, svgMarkup) => {
  return [
    "import type { Props } from '../../IconWrapper.types';",
    '',
    "import { Icon } from '../../IconWrapper';",
    '',
    `export const ${componentName} = (props: Props) => {`,
    '  return (',
    '    <Icon {...props}>',
    `      ${svgMarkup}`,
    '    </Icon>',
    '  );',
    '};',
    '',
  ].join('\n');
};

const files = fs.readdirSync(REMIX_CATEGORY_DIR).filter((f) => f.endsWith('.svg'));
const lineFiles = files.filter((f) => f.endsWith('-line.svg'));
const fillFiles = files.filter((f) => f.endsWith('-fill.svg'));

cleanCategoryOutDir();

// Some Remix categories (e.g. Editor) don't use -line/-fill naming; treat them as a single style.
const shouldUseSingleStyle = lineFiles.length === 0 && fillFiles.length === 0;

if (shouldUseSingleStyle) {
  const singleSnapshot = {};
  const sortedFiles = files.slice().sort((a, b) => a.localeCompare(b));

  for (const file of sortedFiles) {
    const baseName = file.replace(/\.svg$/, '');
    const pascal = toValidComponentBaseName(baseName);
    const svg = fs.readFileSync(path.join(REMIX_CATEGORY_DIR, file), 'utf8').trim();

    const componentName = `${pascal}Icon`;
    writeFile(path.join(ICONS_CATEGORY_DIR, `${componentName}.tsx`), makeCategoryComponentTsx(componentName, svg));
    singleSnapshot[baseName] = svg;
  }

  writeFile(path.join(ICONS_SOURCE_DIR, `remix.${categorySlug}.json`), JSON.stringify(singleSnapshot, null, 2) + '\n');
  console.log(`Generated ${Object.keys(singleSnapshot).length} icons for ${category}.`);
} else {
  const baseNames = new Set();
  for (const f of lineFiles) baseNames.add(f.replace(/-line\.svg$/, ''));
  for (const f of fillFiles) baseNames.add(f.replace(/-fill\.svg$/, ''));

  const sortedBaseNames = Array.from(baseNames).sort((a, b) => a.localeCompare(b));

  const lineSnapshot = {};
  const fillSnapshot = {};

  for (const baseName of sortedBaseNames) {
    const pascal = toValidComponentBaseName(baseName);

    const linePath = path.join(REMIX_CATEGORY_DIR, `${baseName}-line.svg`);
    if (fs.existsSync(linePath)) {
      const svg = fs.readFileSync(linePath, 'utf8').trim();
      const componentName = `${pascal}Icon`;
      writeFile(path.join(ICONS_CATEGORY_DIR, `${componentName}.tsx`), makeCategoryComponentTsx(componentName, svg));
      lineSnapshot[baseName] = svg;
    }

    const fillPath = path.join(REMIX_CATEGORY_DIR, `${baseName}-fill.svg`);
    if (fs.existsSync(fillPath)) {
      const svg = fs.readFileSync(fillPath, 'utf8').trim();
      const componentName = `${pascal}FillIcon`;
      writeFile(path.join(ICONS_CATEGORY_DIR, `${componentName}.tsx`), makeCategoryComponentTsx(componentName, svg));
      fillSnapshot[`${baseName}-fill`] = svg;
    }
  }

  writeFile(path.join(ICONS_SOURCE_DIR, `remix.${categorySlug}.line.json`), JSON.stringify(lineSnapshot, null, 2) + '\n');
  writeFile(path.join(ICONS_SOURCE_DIR, `remix.${categorySlug}.fill.json`), JSON.stringify(fillSnapshot, null, 2) + '\n');

  console.log(`Generated ${Object.keys(lineSnapshot).length} line + ${Object.keys(fillSnapshot).length} fill icons for ${category}.`);
}


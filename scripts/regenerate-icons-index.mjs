import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ICONS_DIR = path.join(ROOT, 'src', 'icons');

const alwaysExports = [
  "export { Icon } from './Icon';",
  "export type { Props as IconProps } from './Icon.types';",
];

const isDirectory = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();

const isCategoryDirName = (name) =>
  ![
    'source', // raw svg/json snapshots
  ].includes(name);

const listCategoryDirs = () => {
  const entries = fs.readdirSync(ICONS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter(isCategoryDirName)
    .sort((a, b) => a.localeCompare(b));
};

const listTsxFilesInDir = (dirAbsPath) => {
  const entries = fs.readdirSync(dirAbsPath, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => name.endsWith('.tsx'))
    .filter((name) => name !== 'index.tsx')
    .filter((name) => name !== 'index.ts')
    .sort((a, b) => a.localeCompare(b));
};

const writeCategoryIndex = (categoryDirName) => {
  const categoryDirAbs = path.join(ICONS_DIR, categoryDirName);
  const tsxFiles = listTsxFilesInDir(categoryDirAbs);

  const exports = tsxFiles.map((fileName) => {
    const exportName = fileName.replace(/\.tsx$/, '');
    return `export { ${exportName} } from './${exportName}';`;
  });

  fs.writeFileSync(path.join(categoryDirAbs, 'index.ts'), [...exports, ''].join('\n'));
  return exports.length;
};

const categoryDirs = listCategoryDirs();

// 1) Generate index.ts per category directory
let totalCategoryExports = 0;
for (const dirName of categoryDirs) {
  totalCategoryExports += writeCategoryIndex(dirName);
}

// 2) Root barrel index.ts that re-exports from categories (keeps file short)
const rootExports = categoryDirs.map((dirName) => `export * from './${dirName}';`);

const contents = [...alwaysExports, '', ...rootExports, ''].join('\n');
fs.writeFileSync(path.join(ICONS_DIR, 'index.ts'), contents);

console.log(
  `Regenerated src/icons/index.ts (barrel) and ${categoryDirs.length} category indexes (${totalCategoryExports} icon exports).`,
);


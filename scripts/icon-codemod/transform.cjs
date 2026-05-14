/**
 * jscodeshift transform — convert legacy icon-tuple usage to Remixicon component refs.
 *
 * Two modes, applied in a single pass:
 *
 * 1. `<Icon iconType={[cat, name]} isFill? />` → `<Icon icon={Ri*Line|Fill} />`
 *    `<CellIcon iconType={[cat, name, isFill?]} />` → `<CellIcon icon={Ri*Line|Fill} />`
 *    Renames the prop (`iconType` → `icon`), drops `isFill` (Icon only), swaps value.
 *    CellIcon never had a separate `isFill` attribute — fill comes from the 3rd tuple element.
 *
 * 2. `<AnyComponent leadIcon={['cat','name']}>` → `<AnyComponent leadIcon={RiNameLine}>`
 *    (and `tailIcon`, `icon`, `buttonLeadIcon`, `buttonTailIcon`)
 *    Same prop name, just swaps the value. Covers Button/Input/Select/etc.
 *
 * Static literal tuples only. Variables / function calls / conditionals → left alone
 * (they continue to work via dynamic-string back-compat).
 *
 * Usage:
 *   npx jscodeshift -t scripts/icon-codemod/transform.cjs --parser=tsx <files...>
 *   npx jscodeshift -t scripts/icon-codemod/transform.cjs --parser=tsx --dry --print <files>
 */

const path = require('path');
const fs = require('fs');

const MAP_PATH = path.join(__dirname, 'remixicon-export-map.json');
if (!fs.existsSync(MAP_PATH)) {
  throw new Error(
    `remixicon-export-map.json missing. Run \`npm run generate:remixicon-mapping\` first.`,
  );
}
const { exportMap } = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));

const kebabToRegistryKey = (s) => s.replace(/-/g, '').toLowerCase();

function lookupRemixiconExport(name, isFill) {
  const key = kebabToRegistryKey(name) + (isFill ? 'fill' : '');
  return exportMap[key] ?? null;
}

// Props on DS components (other than <Icon>/<CellIcon>) that accept the tuple form.
const ICON_PROP_NAMES = new Set([
  'icon',
  'leadIcon',
  'tailIcon',
  'buttonLeadIcon',
  'buttonTailIcon',
]);

// Components whose v1 `iconType` prop was renamed to `icon` (with separate or inline isFill).
// `Icon`     — separate `isFill` attribute supported; tuple may be 2- or 3-element.
// `CellIcon` — no separate `isFill`; fill is encoded as the 3rd tuple element only.
const ICONTYPE_COMPONENTS = new Map([
  ['Icon', { supportsSeparateIsFillAttr: true }],
  ['CellIcon', { supportsSeparateIsFillAttr: false }],
]);

/**
 * Read a JSX attribute value and extract `{ cat, name, isFill }` if it's a static
 * 2- or 3-element literal tuple of strings (3rd element optional boolean).
 * Returns null for dynamic values (variables, function calls, etc.) — those are
 * intentionally skipped.
 */
function extractTuple(attrValue) {
  if (!attrValue || attrValue.type !== 'JSXExpressionContainer') return null;
  const expr = attrValue.expression;
  if (expr.type !== 'ArrayExpression') return null;

  const elements = expr.elements;
  if (elements.length < 2 || elements.length > 3) return null;

  const catEl = elements[0];
  const nameEl = elements[1];
  const fillEl = elements[2];

  if (!catEl || (catEl.type !== 'StringLiteral' && catEl.type !== 'Literal')) return null;
  if (!nameEl || (nameEl.type !== 'StringLiteral' && nameEl.type !== 'Literal')) return null;
  if (fillEl && fillEl.type !== 'BooleanLiteral' && fillEl.type !== 'Literal') return null;

  let inlineFill = false;
  if (fillEl) {
    if (fillEl.type === 'BooleanLiteral') inlineFill = fillEl.value;
    else if (fillEl.type === 'Literal' && typeof fillEl.value === 'boolean') inlineFill = fillEl.value;
  }

  return { cat: catEl.value, name: nameEl.value, isFill: inlineFill };
}

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let modified = false;
  const importsToAdd = new Set();

  // --- Mode 1: <Icon iconType={[...]}> / <CellIcon iconType={[...]}> → icon={Ri*} ---
  root.find(j.JSXElement).forEach((elementPath) => {
    const opening = elementPath.value.openingElement;
    if (!opening.name || opening.name.type !== 'JSXIdentifier') return;
    const elementName = opening.name.name;

    const componentConfig = ICONTYPE_COMPONENTS.get(elementName);
    if (!componentConfig) return;

    const attrs = opening.attributes ?? [];

    const iconTypeAttr = attrs.find(
      (attr) =>
        attr.type === 'JSXAttribute' &&
        attr.name.type === 'JSXIdentifier' &&
        attr.name.name === 'iconType',
    );
    if (!iconTypeAttr) return;

    const tuple = extractTuple(iconTypeAttr.value);
    if (!tuple) return;

    let isFill = tuple.isFill;

    // Only <Icon> historically allowed a separate `isFill` attribute. <CellIcon> never did.
    let isFillAttr;
    if (componentConfig.supportsSeparateIsFillAttr) {
      isFillAttr = attrs.find(
        (attr) =>
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === 'isFill',
      );
      if (isFillAttr) {
        if (!isFillAttr.value) {
          // `<Icon iconType={...} isFill />` — boolean shorthand
          isFill = true;
        } else if (isFillAttr.value.type === 'JSXExpressionContainer') {
          const fillExpr = isFillAttr.value.expression;
          if (fillExpr.type === 'BooleanLiteral' || fillExpr.type === 'Literal') {
            isFill = Boolean(fillExpr.value);
          } else {
            return; // Dynamic isFill — bail
          }
        } else if (isFillAttr.value.type === 'StringLiteral' || isFillAttr.value.type === 'Literal') {
          isFill = isFillAttr.value.value === 'true' || isFillAttr.value.value === true;
        }
      }
    }

    const remixiconName = lookupRemixiconExport(tuple.name, isFill);
    if (!remixiconName) return;

    iconTypeAttr.name = j.jsxIdentifier('icon');
    iconTypeAttr.value = j.jsxExpressionContainer(j.identifier(remixiconName));

    if (isFillAttr) {
      opening.attributes = (opening.attributes ?? []).filter((a) => a !== isFillAttr);
    }

    importsToAdd.add(remixiconName);
    modified = true;
  });

  // --- Mode 2: <AnyComponent leadIcon/tailIcon/icon/buttonLeadIcon/buttonTailIcon={[...]}> ---
  root.find(j.JSXAttribute).forEach((path) => {
    const attr = path.value;
    if (attr.name.type !== 'JSXIdentifier') return;
    const propName = attr.name.name;
    if (!ICON_PROP_NAMES.has(propName)) return;

    // Skip if this is the <Icon icon={...}> direct-import API — already a component ref.
    // We only care if the value is a tuple literal. extractTuple bails on non-tuples.
    const tuple = extractTuple(attr.value);
    if (!tuple) return;

    const remixiconName = lookupRemixiconExport(tuple.name, tuple.isFill);
    if (!remixiconName) return;

    // Skip if the parent element is <Icon> and prop is `icon` — already handled by Mode 1 path
    // if it had been `iconType`. A literal tuple on `<Icon icon={[...]}>` is technically wrong
    // (the type expects a component ref), but if someone wrote it we'll fix it the same way.
    // No special-case needed — proceed.

    attr.value = j.jsxExpressionContainer(j.identifier(remixiconName));
    importsToAdd.add(remixiconName);
    modified = true;
  });

  if (!modified) return undefined;

  // --- Attach Ri* imports ---
  // Preference order for where to attach the new imports:
  //   1. An existing import that already pulls `Icon` or any `Ri*` specifier.
  //   2. Any existing import from `@blumnai-studio/blumnai-design-system`.
  //   3. Create a new import line from `@blumnai-studio/blumnai-design-system`.
  const DS_PACKAGE = '@blumnai-studio/blumnai-design-system';

  const allImports = root.find(j.ImportDeclaration);
  let candidateImport = allImports.filter((p) => {
    const specs = p.value.specifiers ?? [];
    return specs.some((spec) => {
      if (spec.type !== 'ImportSpecifier') return false;
      const importedName = (spec.imported && spec.imported.name) || '';
      const localName = (spec.local && spec.local.name) || '';
      return (
        importedName === 'Icon' ||
        localName === 'Icon' ||
        importedName.startsWith('Ri') ||
        localName.startsWith('Ri')
      );
    });
  });

  if (candidateImport.size() === 0) {
    candidateImport = allImports.filter(
      (p) => p.value.source && p.value.source.value === DS_PACKAGE,
    );
  }

  if (candidateImport.size() > 0) {
    const importNode = candidateImport.at(0).get().value;
    const existingNames = new Set(
      (importNode.specifiers ?? [])
        .filter((s) => s.type === 'ImportSpecifier')
        .map((s) => (s.imported && s.imported.name) || ''),
    );
    for (const name of importsToAdd) {
      if (existingNames.has(name)) continue;
      importNode.specifiers.push(j.importSpecifier(j.identifier(name)));
    }
    importNode.specifiers.sort((a, b) => {
      const an = (a.imported && a.imported.name) || '';
      const bn = (b.imported && b.imported.name) || '';
      return an.localeCompare(bn);
    });
  } else {
    const newImport = j.importDeclaration(
      [...importsToAdd].map((name) => j.importSpecifier(j.identifier(name))),
      j.stringLiteral(DS_PACKAGE),
    );
    root.get().node.program.body.unshift(newImport);
  }

  return root.toSource({ quote: 'single', reuseWhitespace: false });
};

module.exports.parser = 'tsx';

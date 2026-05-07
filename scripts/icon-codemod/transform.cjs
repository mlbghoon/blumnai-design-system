/**
 * jscodeshift transform: convert `<Icon iconType={[cat, name]} isFill? />` → `<Icon icon={Ri*Line|Fill} />`.
 *
 * Static literal tuples only. Variables, function calls, conditionals → left alone.
 * Looks up `Ri*` export name via `remixicon-export-map.json` (auto-generated).
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

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let modified = false;
  const importsToAdd = new Set();

  root
    .find(j.JSXElement, {
      openingElement: { name: { type: 'JSXIdentifier', name: 'Icon' } },
    })
    .forEach((path) => {
      const opening = path.value.openingElement;
      const attrs = opening.attributes ?? [];

      // Find iconType={...}
      const iconTypeAttr = attrs.find(
        (attr) =>
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === 'iconType',
      );
      if (!iconTypeAttr) return;

      // Validate value: { ['cat', 'name'] }
      const value = iconTypeAttr.value;
      if (!value || value.type !== 'JSXExpressionContainer') return;
      const expr = value.expression;
      if (expr.type !== 'ArrayExpression') return;

      const elements = expr.elements;
      if (elements.length < 2 || elements.length > 3) return;

      const catEl = elements[0];
      const nameEl = elements[1];
      const fillEl = elements[2];

      // Both must be string literals
      if (!catEl || (catEl.type !== 'StringLiteral' && catEl.type !== 'Literal')) return;
      if (!nameEl || (nameEl.type !== 'StringLiteral' && nameEl.type !== 'Literal')) return;
      if (fillEl && fillEl.type !== 'BooleanLiteral' && fillEl.type !== 'Literal') return;

      const iconName = nameEl.value;
      let inlineFill = false;
      if (fillEl) {
        if (fillEl.type === 'BooleanLiteral') inlineFill = fillEl.value;
        else if (fillEl.type === 'Literal' && typeof fillEl.value === 'boolean') inlineFill = fillEl.value;
      }

      // Check for separate isFill attr
      const isFillAttr = attrs.find(
        (attr) =>
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === 'isFill',
      );
      let isFill = inlineFill;
      if (isFillAttr) {
        if (!isFillAttr.value) {
          // <Icon iconType={...} isFill /> — boolean shorthand
          isFill = true;
        } else if (isFillAttr.value.type === 'JSXExpressionContainer') {
          const fillExpr = isFillAttr.value.expression;
          if (fillExpr.type === 'BooleanLiteral' || fillExpr.type === 'Literal') {
            isFill = Boolean(fillExpr.value);
          } else {
            // Dynamic — bail
            return;
          }
        } else if (isFillAttr.value.type === 'StringLiteral' || isFillAttr.value.type === 'Literal') {
          // <Icon isFill="true"> rare but possible
          isFill = isFillAttr.value.value === 'true' || isFillAttr.value.value === true;
        }
      }

      const remixiconName = lookupRemixiconExport(iconName, isFill);
      if (!remixiconName) return; // Unknown icon — leave as-is

      // Replace iconType → icon, value → identifier reference
      iconTypeAttr.name = j.jsxIdentifier('icon');
      iconTypeAttr.value = j.jsxExpressionContainer(j.identifier(remixiconName));

      // Remove isFill attr
      if (isFillAttr) {
        opening.attributes = (opening.attributes ?? []).filter((a) => a !== isFillAttr);
      }

      importsToAdd.add(remixiconName);
      modified = true;
    });

  if (!modified) return undefined;

  // Find the Icon import to attach Ri* imports.
  const iconImport = root
    .find(j.ImportDeclaration)
    .filter((p) => {
      const specs = p.value.specifiers ?? [];
      return specs.some(
        (spec) =>
          spec.type === 'ImportSpecifier' &&
          ((spec.imported && spec.imported.name === 'Icon') ||
            (spec.local && spec.local.name === 'Icon')),
      );
    });

  if (iconImport.size() > 0) {
    const importNode = iconImport.at(0).get().value;
    const existingNames = new Set(
      (importNode.specifiers ?? [])
        .filter((s) => s.type === 'ImportSpecifier')
        .map((s) => (s.imported && s.imported.name) || ''),
    );
    for (const name of importsToAdd) {
      if (existingNames.has(name)) continue;
      importNode.specifiers.push(j.importSpecifier(j.identifier(name)));
    }
    // Sort for stable output
    importNode.specifiers.sort((a, b) => {
      const an = (a.imported && a.imported.name) || '';
      const bn = (b.imported && b.imported.name) || '';
      return an.localeCompare(bn);
    });
  } else {
    // No existing Icon import — happens for tests/stories. Find any Ri* import or add new one.
    const newImport = j.importDeclaration(
      [...importsToAdd].map((name) => j.importSpecifier(j.identifier(name))),
      j.stringLiteral('@blumnai-studio/blumnai-design-system'),
    );
    root.get().node.program.body.unshift(newImport);
  }

  return root.toSource({ quote: 'single', reuseWhitespace: false });
};

module.exports.parser = 'tsx';

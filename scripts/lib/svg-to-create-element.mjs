/**
 * Shared SVG-to-createElement converter for icon generators.
 *
 * Parses SVG markup into a tree, then renders as nested h() calls.
 * Supports: dynamic attribute values, style objects, conditional children.
 */

/**
 * Parse SVG/HTML string into tree of nodes.
 * @param {string} svgString
 * @returns {Array<{tag: string, attrs: Record<string, string>, children: Array}>}
 */
export function parseSvgToTree(svgString) {
  const s = svgString.trim();
  const nodes = [];
  let pos = 0;

  while (pos < s.length) {
    while (pos < s.length && /\s/.test(s[pos])) pos++;
    if (pos >= s.length) break;

    if (s[pos] !== '<') {
      throw new Error(`Unexpected content at position ${pos}: "${s.slice(pos, pos + 30)}..."`);
    }

    const tagStart = pos;
    const tagEnd = s.indexOf('>', tagStart);
    if (tagEnd === -1) throw new Error(`Unclosed tag at position ${tagStart}`);

    const isSelfClosing = s[tagEnd - 1] === '/' || s.slice(tagStart, tagEnd + 1).endsWith('/>');

    const rawTag = isSelfClosing
      ? s.slice(tagStart + 1, tagEnd).replace(/\/$/, '').trim()
      : s.slice(tagStart + 1, tagEnd).trim();
    const tagNameMatch = rawTag.match(/^(\w[\w-]*)/);
    if (!tagNameMatch) throw new Error(`Cannot parse tag name from: "${rawTag}"`);
    const tag = tagNameMatch[1];

    const attrString = rawTag.slice(tag.length).trim();
    const attrs = {};
    const attrRegex = /([\w:-]+)="([^"]*)"/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }
    const residual = attrString.replace(/([\w:-]+)="([^"]*)"/g, '').trim();
    if (residual.length > 0) {
      throw new Error(`Unparsed attribute content in <${tag}>: "${residual}"`);
    }

    pos = tagEnd + 1;

    if (isSelfClosing) {
      nodes.push({ tag, attrs, children: [] });
    } else {
      const closingTag = `</${tag}>`;
      let depth = 1;
      let searchPos = pos;
      while (depth > 0 && searchPos < s.length) {
        const nextOpen = s.indexOf(`<${tag}`, searchPos);
        const nextClose = s.indexOf(closingTag, searchPos);
        if (nextClose === -1) throw new Error(`Missing closing tag for <${tag}>`);
        if (nextOpen !== -1 && nextOpen < nextClose) {
          const endOfOpen = s.indexOf('>', nextOpen);
          if (endOfOpen !== -1 && s[endOfOpen - 1] === '/') {
            searchPos = endOfOpen + 1;
          } else {
            depth++;
            searchPos = nextOpen + tag.length + 1;
          }
        } else {
          depth--;
          if (depth === 0) {
            const innerContent = s.slice(pos, nextClose).trim();
            const children = innerContent.length > 0 ? parseSvgToTree(innerContent) : [];
            nodes.push({ tag, attrs, children });
            pos = nextClose + closingTag.length;
          } else {
            searchPos = nextClose + closingTag.length;
          }
        }
      }
      if (depth !== 0) throw new Error(`Unmatched <${tag}> tag`);
    }
  }

  return nodes;
}

const REACT_PROP_MAP = {
  'clip-path': 'clipPath', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule',
  'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin', 'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray', 'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity', 'fill-opacity': 'fillOpacity',
  'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity',
  'flood-color': 'floodColor', 'flood-opacity': 'floodOpacity',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'xmlns:xlink': 'xmlnsXlink', 'xlink:href': 'xlinkHref',
  'font-family': 'fontFamily', 'font-size': 'fontSize', 'font-weight': 'fontWeight',
  'font-style': 'fontStyle', 'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration', 'letter-spacing': 'letterSpacing',
  'shape-rendering': 'shapeRendering', 'mask-type': 'maskType',
};

/**
 * Convert SVG attribute name to React prop name.
 * @param {string} attr
 * @returns {string}
 */
export function attrToReactProp(attr) {
  return REACT_PROP_MAP[attr] || attr;
}

/**
 * Render a single attribute value for createElement props.
 * @param {*} value - string, { __dynamic }, or { __template }
 * @returns {string}
 */
function renderAttrValue(value) {
  if (typeof value === 'object' && value !== null) {
    if (value.__dynamic) return value.__dynamic;
    if (value.__template) return `\`${value.__template}\``;
  }
  const escaped = String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `'${escaped}'`;
}

/**
 * Render tree node as h() call string.
 *
 * Node format:
 *   { tag, attrs: Record<string, string|{__dynamic}|{__template}>, children: [], style?: {} }
 *   { __conditional: 'expr', __trueNode: node }  (conditional child)
 *
 * @param {object} node
 * @param {number} indent
 * @returns {string}
 */
export function nodeToCreateElement(node, indent) {
  const pad = ' '.repeat(indent);

  // Conditional child node
  if (node.__conditional) {
    const trueExpr = nodeToCreateElement(node.__trueNode, indent + 2).trimStart();
    return `${pad}${node.__conditional} ? ${trueExpr} : null`;
  }

  // Build props
  const propParts = [];
  for (const [key, value] of Object.entries(node.attrs)) {
    const propName = attrToReactProp(key);
    propParts.push(`${propName}: ${renderAttrValue(value)}`);
  }

  // Style object
  if (node.style && Object.keys(node.style).length > 0) {
    const styleParts = Object.entries(node.style).map(([k, v]) =>
      `${k}: ${renderAttrValue(v)}`
    );
    propParts.push(`style: { ${styleParts.join(', ')} }`);
  }

  const propsStr = propParts.length === 0 ? 'null' : `{ ${propParts.join(', ')} }`;

  if (node.children.length === 0) {
    return `${pad}h('${node.tag}', ${propsStr})`;
  }

  const childStrs = node.children.map(c => nodeToCreateElement(c, indent + 2));
  return `${pad}h('${node.tag}', ${propsStr},\n${childStrs.join(',\n')}\n${pad})`;
}

/**
 * Convert SVG string to a single createElement h() expression.
 * @param {string} svgString - Complete <svg>...</svg> markup
 * @param {number} [baseIndent=4]
 * @returns {string}
 */
export function svgToCreateElement(svgString, baseIndent = 4) {
  const nodes = parseSvgToTree(svgString);
  if (nodes.length === 0) throw new Error('Empty SVG content');
  if (nodes.length > 1) throw new Error(`Expected single root <svg>, got ${nodes.length} roots`);
  if (nodes[0].tag !== 'svg') throw new Error(`Expected root <svg>, got <${nodes[0].tag}>`);
  return nodeToCreateElement(nodes[0], baseIndent);
}

/**
 * Walk tree and apply a transform function to every node (depth-first).
 * The transform receives each node and can modify it in-place.
 * @param {Array} nodes
 * @param {(node: object) => void} fn
 */
export function walkTree(nodes, fn) {
  for (const node of nodes) {
    if (node.__conditional) {
      fn(node.__trueNode);
      walkTree(node.__trueNode.children || [], fn);
    } else {
      fn(node);
      walkTree(node.children, fn);
    }
  }
}

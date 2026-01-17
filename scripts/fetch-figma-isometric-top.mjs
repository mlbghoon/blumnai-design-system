import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const DEFAULT_TOP_FRAME_NODE_ID = '3988:52051';
const DEFAULT_ISOMETRIC_ROOT_NAME = 'Isometric Icons';

const OUT_PATH = path.join(ROOT, 'src', 'icons', 'source', 'isocons.isometric.top.json');

const getArgValue = (name) => {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
};

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const fetchJson = async (url, token) => {
  const res = await fetch(url, {
    headers: {
      'X-Figma-Token': token,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Figma API error ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
};

const fetchText = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Asset fetch failed ${res.status} ${res.statusText} for ${url}`);
  return res.text();
};

const fetchFile = async (fileKey, token) => {
  const url = `https://api.figma.com/v1/files/${fileKey}`;
  return fetchJson(url, token);
};

const walk = (node, visitor) => {
  visitor(node);
  if (!node || !node.children) return;
  for (const child of node.children) walk(child, visitor);
};

const walkWithAncestors = (node, visitor, ancestors = []) => {
  visitor(node, ancestors);
  if (!node || !node.children) return;
  for (const child of node.children) {
    walkWithAncestors(child, visitor, [...ancestors, node]);
  }
};

const sanitizeId = (nodeId) => nodeId.replaceAll(':', '_').replaceAll('-', '_');

const buildUniqueKeys = (nodes) => {
  const byName = new Map();
  for (const n of nodes) {
    byName.set(n.name, (byName.get(n.name) ?? 0) + 1);
  }

  return nodes.map((n) => {
    const count = byName.get(n.name) ?? 0;
    if (count <= 1) return { key: n.name, nodeId: n.id, name: n.name };
    return { key: `${n.name}__${sanitizeId(n.id)}`, nodeId: n.id, name: n.name };
  });
};

const resolveFrameNodeIdByName = (fileDoc, { frameName, isometricRootName }) => {
  const matches = [];
  walkWithAncestors(fileDoc, (node, ancestors) => {
    if (!node || node.type !== 'FRAME') return;
    if (node.name !== frameName) return;
    const hasIsometricAncestor = ancestors.some((a) => a?.type === 'FRAME' && a?.name === isometricRootName);
    if (!hasIsometricAncestor) return;
    matches.push({ id: node.id, name: node.name });
  });

  if (matches.length === 0) {
    throw new Error(`Could not find FRAME "${frameName}" under "${isometricRootName}"`);
  }
  if (matches.length > 1) {
    throw new Error(
      `Found multiple frames named "${frameName}" under "${isometricRootName}": ${matches
        .map((m) => m.id)
        .join(', ')}`,
    );
  }

  return matches[0].id;
};

const main = async () => {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error(
      [
        'Missing FIGMA_TOKEN.',
        'Create a Figma Personal Access Token and export it locally (do NOT commit it):',
        '  export FIGMA_TOKEN=\"<your_token>\"',
        '',
        'Then rerun this script.',
      ].join('\n'),
    );
    process.exit(1);
  }

  const fileKey = getArgValue('--fileKey') ?? DEFAULT_FILE_KEY;
  const outPath = getArgValue('--out') ?? OUT_PATH;

  const isometricRootName = getArgValue('--isometricRootName') ?? DEFAULT_ISOMETRIC_ROOT_NAME;
  const frameName = getArgValue('--frameName');
  const nameSuffix = getArgValue('--suffix') ?? '-T';

  const topFrameNodeId =
    getArgValue('--topNodeId') ??
    getArgValue('--frameNodeId') ??
    (frameName
      ? resolveFrameNodeIdByName((await fetchFile(fileKey, token)).document, {
          frameName,
          isometricRootName,
        })
      : DEFAULT_TOP_FRAME_NODE_ID);

  const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(topFrameNodeId)}`;
  const nodesRes = await fetchJson(nodesUrl, token);
  const topDoc = nodesRes?.nodes?.[topFrameNodeId]?.document;
  if (!topDoc) throw new Error(`Could not find node document for ${topFrameNodeId}`);

  const found = [];
  walk(topDoc, (n) => {
    // Top frame contains many components; grab leaf components by name suffix.
    if (!n?.id || !n?.name) return;
    if (typeof n.name !== 'string') return;
    if (!n.name.endsWith(nameSuffix)) return;
    found.push({ id: n.id, name: n.name, type: n.type });
  });

  // De-dup by id, keep stable ordering.
  const seen = new Set();
  const topNodes = found
    .filter((n) => {
      if (seen.has(n.id)) return false;
      seen.add(n.id);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  if (topNodes.length === 0) throw new Error('No Top (-T) nodes found under the Top frame');

  const entries = buildUniqueKeys(topNodes);
  const ids = entries.map((e) => e.nodeId);

  const idToKey = new Map(entries.map((e) => [e.nodeId, e.key]));
  const out = {};

  const idBatches = chunk(ids, 50);
  for (let i = 0; i < idBatches.length; i += 1) {
    const batch = idBatches[i];
    const imagesUrl = `https://api.figma.com/v1/images/${fileKey}?format=svg&ids=${encodeURIComponent(batch.join(','))}`;
    const imagesRes = await fetchJson(imagesUrl, token);
    const images = imagesRes?.images ?? {};

    const assetPairs = Object.entries(images);
    for (const [nodeId, assetUrl] of assetPairs) {
      if (!assetUrl) continue;
      const key = idToKey.get(nodeId);
      if (!key) continue;
      out[key] = await fetchText(assetUrl);
    }

    // lightweight progress
    const done = Object.keys(out).length;
    // eslint-disable-next-line no-console
    console.log(`Fetched ${done}/${ids.length} Top SVGs... (batch ${i + 1}/${idBatches.length})`);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  // eslint-disable-next-line no-console
  console.log(`Wrote ${Object.keys(out).length} Top SVGs to ${path.relative(ROOT, outPath)}.`);

  // Warn if any missing
  const missing = ids.filter((id) => !out[idToKey.get(id)]);
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.log(
      `Warning: ${missing.length} nodes missing SVG URLs or failed to fetch (you can rerun).`,
    );
  }
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


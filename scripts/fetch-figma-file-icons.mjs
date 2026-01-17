import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const DEFAULT_FILE_ICONS_COMPONENT_SET_NODE_ID = '3886:28043'; // Icons > File Icons > Component Set: File Icons

const OUT_PATH = path.join(ROOT, 'src', 'icons', 'source', 'sortui.file-icons.json');

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const fetchJson = async (url, token) => {
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
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

const sanitizeId = (nodeId) => nodeId.replaceAll(':', '_').replaceAll('-', '_');

const parseVariantKey = (componentName) => {
  // e.g. "Variant=Thumbnail 4:3, Size=sm"
  const parts = String(componentName)
    .split(',')
    .map((p) => p.trim());

  const kv = new Map();
  for (const p of parts) {
    const idx = p.indexOf('=');
    if (idx === -1) continue;
    kv.set(p.slice(0, idx).trim(), p.slice(idx + 1).trim());
  }

  const variant = kv.get('Variant') ?? 'Unknown';
  const size = kv.get('Size') ?? 'md';

  return { variant, size };
};

const normalizeKey = ({ variant, size }) => {
  // Stable, human-readable snapshot key; generator converts to component names.
  // Example: "Thumbnail 4:3__sm", "Archive__lg"
  const v = String(variant).trim();
  const s = String(size).trim().toLowerCase();
  return `${v}__${s}`;
};

const main = async () => {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error(
      [
        'Missing FIGMA_TOKEN.',
        'Create a Figma Personal Access Token and export it locally (do NOT commit it):',
        '  export FIGMA_TOKEN="<your_token>"',
        '',
        'Then rerun this script.',
      ].join('\n'),
    );
    process.exit(1);
  }

  const fileKey = process.argv.includes('--fileKey')
    ? process.argv[process.argv.indexOf('--fileKey') + 1]
    : DEFAULT_FILE_KEY;

  const componentSetNodeId = process.argv.includes('--componentSetNodeId')
    ? process.argv[process.argv.indexOf('--componentSetNodeId') + 1]
    : DEFAULT_FILE_ICONS_COMPONENT_SET_NODE_ID;

  const outPath = process.argv.includes('--out')
    ? process.argv[process.argv.indexOf('--out') + 1]
    : OUT_PATH;

  const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(
    componentSetNodeId,
  )}`;
  const nodesRes = await fetchJson(nodesUrl, token);
  const setDoc = nodesRes?.nodes?.[componentSetNodeId]?.document;
  if (!setDoc) throw new Error(`Could not find node document for ${componentSetNodeId}`);

  const components = (setDoc.children ?? [])
    .filter((c) => c?.id && c?.name)
    .filter((c) => c.type === 'COMPONENT');
  if (components.length === 0) throw new Error(`"${setDoc.name}" has no COMPONENT children`);

  const parsed = components.map((c) => ({ id: c.id, ...parseVariantKey(c.name) }));
  const byKey = new Map();
  for (const item of parsed) {
    const key = normalizeKey(item);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(item.id);
  }

  // If any key duplicates (shouldn't), disambiguate by nodeId.
  const ids = [];
  const idToKey = new Map();
  for (const item of parsed) {
    const baseKey = normalizeKey(item);
    const dupCount = (byKey.get(baseKey) ?? []).length;
    const key = dupCount <= 1 ? baseKey : `${baseKey}__${sanitizeId(item.id)}`;
    ids.push(item.id);
    idToKey.set(item.id, key);
  }

  const out = {};
  const batches = chunk(ids, 50);

  for (let i = 0; i < batches.length; i += 1) {
    const batch = batches[i];
    const imagesUrl = `https://api.figma.com/v1/images/${fileKey}?format=svg&ids=${encodeURIComponent(
      batch.join(','),
    )}`;
    const imagesRes = await fetchJson(imagesUrl, token);
    const images = imagesRes?.images ?? {};

    for (const [nodeId, assetUrl] of Object.entries(images)) {
      if (!assetUrl) continue;
      const key = idToKey.get(nodeId);
      if (!key) continue;
      out[key] = await fetchText(assetUrl);
    }

    // eslint-disable-next-line no-console
    console.log(
      `Fetched ${Object.keys(out).length}/${ids.length} file icons... (batch ${i + 1}/${batches.length})`,
    );
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  // eslint-disable-next-line no-console
  console.log(`Wrote ${Object.keys(out).length} file icons to ${path.relative(ROOT, outPath)}.`);
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


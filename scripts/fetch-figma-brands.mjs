import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const DEFAULT_BRANDS_FRAME_NODE_ID = '3988:50695'; // Icons > Brands > Brands Icons

const OUT_PATH = path.join(ROOT, 'src', 'icons', 'source', 'sortui.brands.json');

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

const normalizeBrandName = (raw) => {
  const trimmed = String(raw).trim();
  // expected format: "Brand/<Name>"
  const withoutPrefix = trimmed.replace(/^Brand\s*\//i, '').trim();
  return withoutPrefix;
};

const buildUniqueKeys = (nodes) => {
  const byName = new Map();
  for (const n of nodes) {
    const normalized = normalizeBrandName(n.name);
    byName.set(normalized, (byName.get(normalized) ?? 0) + 1);
  }

  return nodes.map((n) => {
    const normalized = normalizeBrandName(n.name);
    const count = byName.get(normalized) ?? 0;
    if (count <= 1) return { key: normalized, nodeId: n.id, name: n.name };
    return { key: `${normalized}__${sanitizeId(n.id)}`, nodeId: n.id, name: n.name };
  });
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

  const frameNodeId = process.argv.includes('--frameNodeId')
    ? process.argv[process.argv.indexOf('--frameNodeId') + 1]
    : DEFAULT_BRANDS_FRAME_NODE_ID;

  const outPath = process.argv.includes('--out')
    ? process.argv[process.argv.indexOf('--out') + 1]
    : OUT_PATH;

  const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(frameNodeId)}`;
  const nodesRes = await fetchJson(nodesUrl, token);
  const frameDoc = nodesRes?.nodes?.[frameNodeId]?.document;
  if (!frameDoc) throw new Error(`Could not find node document for ${frameNodeId}`);

  const children = (frameDoc.children ?? [])
    .filter((c) => c?.id && c?.name)
    .filter((c) => c.type === 'COMPONENT' || c.type === 'FRAME');
  if (children.length === 0) throw new Error(`"${frameDoc.name}" has no children`);

  const entries = buildUniqueKeys(children);
  const ids = entries.map((e) => e.nodeId);
  const idToKey = new Map(entries.map((e) => [e.nodeId, e.key]));

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
      `Fetched ${Object.keys(out).length}/${ids.length} brand icons... (batch ${i + 1}/${batches.length})`,
    );
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  // eslint-disable-next-line no-console
  console.log(`Wrote ${Object.keys(out).length} brand icons to ${path.relative(ROOT, outPath)}.`);
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


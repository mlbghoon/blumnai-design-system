import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const DEFAULT_CURSORS_FRAME_NODE_ID = '4118:36836'; // Icons > Cursors > Cursors

const OUT_PATH = path.join(ROOT, 'src', 'icons', 'source', 'sortui.cursors.json');

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

const normalizeKey = (name) =>
  String(name)
    .trim()
    .replace(/^cursor-?/i, 'cursor-')
    .toLowerCase();

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
    : DEFAULT_CURSORS_FRAME_NODE_ID;

  const outPath = process.argv.includes('--out')
    ? process.argv[process.argv.indexOf('--out') + 1]
    : OUT_PATH;

  const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(frameNodeId)}`;
  const nodesRes = await fetchJson(nodesUrl, token);
  const frameDoc = nodesRes?.nodes?.[frameNodeId]?.document;
  if (!frameDoc) throw new Error(`Could not find node document for ${frameNodeId}`);

  const components = (frameDoc.children ?? [])
    .filter((c) => c?.id && c?.name)
    .filter((c) => c.type === 'COMPONENT');
  if (components.length === 0) throw new Error(`"${frameDoc.name}" has no COMPONENT children`);

  const ids = components.map((c) => c.id);
  const idToKey = new Map(components.map((c) => [c.id, normalizeKey(c.name)]));

  const imagesUrl = `https://api.figma.com/v1/images/${fileKey}?format=svg&ids=${encodeURIComponent(
    ids.join(','),
  )}`;
  const imagesRes = await fetchJson(imagesUrl, token);
  const images = imagesRes?.images ?? {};

  const out = {};
  for (const [nodeId, assetUrl] of Object.entries(images)) {
    if (!assetUrl) continue;
    const key = idToKey.get(nodeId);
    if (!key) continue;
    out[key] = await fetchText(assetUrl);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  // eslint-disable-next-line no-console
  console.log(`Wrote ${Object.keys(out).length} cursor icons to ${path.relative(ROOT, outPath)}.`);
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';

const DEFAULT_FLAGS_FRAME_NODE_ID = '3988:50395';
const DEFAULT_FLAGS_FRAME_NAME = 'Flags';
const DEFAULT_FLAGS_PAGE_NAME = 'Icons';

const OUT_PATH = path.join(ROOT, 'src', 'icons', 'source', 'sortui.flags.json');

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

const walkWithAncestors = (node, visitor, ancestors = []) => {
  visitor(node, ancestors);
  if (!node || !node.children) return;
  for (const child of node.children) walkWithAncestors(child, visitor, [...ancestors, node]);
};

const sanitizeId = (nodeId) => nodeId.replaceAll(':', '_').replaceAll('-', '_');

const resolveFlagsFrameNodeId = (fileDoc, { flagsFrameName, flagsPageName }) => {
  const matches = [];
  walkWithAncestors(fileDoc, (node, ancestors) => {
    if (!node || node.type !== 'FRAME') return;
    if (node.name !== flagsFrameName) return;
    const onIconsPage = ancestors.some((a) => a?.type === 'CANVAS' && a?.name === flagsPageName);
    const score = (node.children?.length ?? 0) + (onIconsPage ? 1000 : 0);
    matches.push({ node, score });
  });

  if (matches.length === 0) {
    throw new Error(`Could not find FRAME "${flagsFrameName}" in the file`);
  }

  matches.sort((a, b) => b.score - a.score);
  return matches[0].node.id;
};

const buildUniqueKeys = (nodes) => {
  const byName = new Map();
  for (const n of nodes) byName.set(n.name, (byName.get(n.name) ?? 0) + 1);

  return nodes.map((n) => {
    const count = byName.get(n.name) ?? 0;
    const normalized = String(n.name).trim().toUpperCase();
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

  const fileKey = getArgValue('--fileKey') ?? DEFAULT_FILE_KEY;
  const outPath = getArgValue('--out') ?? OUT_PATH;

  const flagsFrameNodeId = getArgValue('--frameNodeId') ?? DEFAULT_FLAGS_FRAME_NODE_ID;
  const flagsFrameName = getArgValue('--frameName') ?? DEFAULT_FLAGS_FRAME_NAME;
  const flagsPageName = getArgValue('--pageName') ?? DEFAULT_FLAGS_PAGE_NAME;

  const file = await fetchJson(`https://api.figma.com/v1/files/${fileKey}`, token);
  const resolvedFrameNodeId =
    getArgValue('--frameNodeId') ??
    resolveFlagsFrameNodeId(file.document, { flagsFrameName, flagsPageName });

  const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(resolvedFrameNodeId)}`;
  const nodesRes = await fetchJson(nodesUrl, token);
  const frameDoc = nodesRes?.nodes?.[resolvedFrameNodeId]?.document;
  if (!frameDoc) throw new Error(`Could not find node document for ${resolvedFrameNodeId}`);

  const children = (frameDoc.children ?? []).filter((c) => c?.id && c?.name);
  if (children.length === 0) throw new Error(`"${frameDoc.name}" has no children`);

  const entries = buildUniqueKeys(children);
  const ids = entries.map((e) => e.nodeId);
  const idToKey = new Map(entries.map((e) => [e.nodeId, e.key]));

  const out = {};
  const batches = chunk(ids, 50);

  for (let i = 0; i < batches.length; i += 1) {
    const batch = batches[i];
    const imagesUrl = `https://api.figma.com/v1/images/${fileKey}?format=svg&ids=${encodeURIComponent(batch.join(','))}`;
    const imagesRes = await fetchJson(imagesUrl, token);
    const images = imagesRes?.images ?? {};

    for (const [nodeId, assetUrl] of Object.entries(images)) {
      if (!assetUrl) continue;
      const key = idToKey.get(nodeId);
      if (!key) continue;
      out[key] = await fetchText(assetUrl);
    }

    // eslint-disable-next-line no-console
    console.log(`Fetched ${Object.keys(out).length}/${ids.length} flags... (batch ${i + 1}/${batches.length})`);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  // eslint-disable-next-line no-console
  console.log(`Wrote ${Object.keys(out).length} flags to ${path.relative(ROOT, outPath)}.`);
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


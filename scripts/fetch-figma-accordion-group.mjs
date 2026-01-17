#!/usr/bin/env node

/**
 * Fetch AccordionGroup component data from Figma
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const NODE_IDS = [
  { id: '3892:10913', name: 'AccordionGroup Variant 1' },
  { id: '3892:10912', name: 'AccordionGroup Variant 2' },
];
const OUT_PATH = path.join(ROOT, 'src', 'components', 'accordion', 'AccordionGroup', 'source', 'figma-data.json');

async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function extractStyles(node) {
  const styles = {};
  
  if (node.fills && Array.isArray(node.fills)) {
    styles.fills = node.fills;
  }
  
  if (node.strokes && Array.isArray(node.strokes)) {
    styles.strokes = node.strokes;
  }
  
  if (node.effects && Array.isArray(node.effects)) {
    styles.effects = node.effects;
  }
  
  if (node.cornerRadius !== undefined) {
    styles.cornerRadius = node.cornerRadius;
  }
  
  if (node.paddingLeft !== undefined || node.paddingRight !== undefined || 
      node.paddingTop !== undefined || node.paddingBottom !== undefined) {
    styles.padding = {
      left: node.paddingLeft,
      right: node.paddingRight,
      top: node.paddingTop,
      bottom: node.paddingBottom,
    };
  }
  
  if (node.itemSpacing !== undefined) {
    styles.itemSpacing = node.itemSpacing;
  }
  
  if (node.layoutMode) {
    styles.layoutMode = node.layoutMode;
  }
  
  return styles;
}

function extractChildren(node) {
  if (!node.children) return [];
  
  return node.children.map(child => ({
    id: child.id,
    name: child.name,
    type: child.type,
    styles: extractStyles(child),
    children: extractChildren(child),
  }));
}

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

  console.log(`Fetching AccordionGroup data from Figma...`);
  console.log(`File Key: ${FILE_KEY}`);
  console.log(`Node IDs: ${NODE_IDS.map(n => n.id).join(', ')}`);

  try {
    const nodeIdsString = NODE_IDS.map(n => n.id).join(',');
    const nodesUrl = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(nodeIdsString)}`;
    const nodesRes = await fetchJson(nodesUrl, token);
    
    const variants = NODE_IDS.map(({ id, name }) => {
      const doc = nodesRes?.nodes?.[id]?.document;
      if (!doc) {
        console.warn(`⚠️  Could not find node document for ${id} (${name})`);
        return null;
      }
      
      return {
        nodeId: id,
        name,
        type: doc.type,
        styles: extractStyles(doc),
        children: extractChildren(doc),
        fullDocument: doc, // 전체 문서도 포함
      };
    }).filter(Boolean);

    const output = {
      metadata: {
        fileKey: FILE_KEY,
        fetchedAt: new Date().toISOString(),
        description: 'AccordionGroup component data from Figma',
        source: 'Figma API',
      },
      variants,
    };

    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + '\n');
    
    console.log(`\n✅ AccordionGroup data written to: ${OUT_PATH}`);
    console.log(`   - Found ${variants.length} variants`);
    variants.forEach(v => {
      console.log(`     • ${v.name} (${v.nodeId})`);
    });
  } catch (error) {
    console.error('❌ Error fetching AccordionGroup data:', error.message);
    process.exit(1);
  }
};

main();

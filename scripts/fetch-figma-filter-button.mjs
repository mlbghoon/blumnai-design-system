#!/usr/bin/env node

/**
 * Fetch FilterButton component data from Figma
 * 
 * This script fetches the FilterButton component structure and styles from Figma
 * and saves it to source/figma-data.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const DEFAULT_NODE_ID = '3848:22263';
const OUT_PATH = path.join(ROOT, 'src', 'components', 'button', 'FilterButton', 'source', 'figma-data.json');

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : null;
}

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
  
  if (node.width !== undefined) {
    styles.width = node.width;
  }
  
  if (node.height !== undefined) {
    styles.height = node.height;
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

  const fileKey = getArgValue('--fileKey') ?? DEFAULT_FILE_KEY;
  const nodeId = getArgValue('--nodeId') ?? DEFAULT_NODE_ID;
  const outPath = getArgValue('--out') ?? OUT_PATH;

  console.log(`Fetching FilterButton data from Figma...`);
  console.log(`File Key: ${fileKey}`);
  console.log(`Node ID: ${nodeId}`);

  try {
    const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;
    const nodesRes = await fetchJson(nodesUrl, token);
    const nodeDoc = nodesRes?.nodes?.[nodeId]?.document;
    
    if (!nodeDoc) {
      throw new Error(`Could not find node document for ${nodeId}`);
    }

    console.log(`Found node: ${nodeDoc.name}`);
    console.log(`Node type: ${nodeDoc.type}`);

    // Extract component data
    const filterButtonData = {
      metadata: {
        fileKey,
        nodeId,
        nodeName: nodeDoc.name,
        fetchedAt: new Date().toISOString(),
        source: 'Figma REST API',
      },
      structure: {
        description: 'FilterButton component structure from Figma',
        node: {
          id: nodeDoc.id,
          name: nodeDoc.name,
          type: nodeDoc.type,
          styles: extractStyles(nodeDoc),
          children: extractChildren(nodeDoc),
        },
      },
      variants: {
        description: 'FilterButton variants (sizes, states)',
      },
    };

    // Process children to extract variants
    if (nodeDoc.children) {
      const variants = [];
      for (const child of nodeDoc.children) {
        if (child.type === 'FRAME' || child.type === 'COMPONENT' || child.type === 'INSTANCE') {
          variants.push({
            id: child.id,
            name: child.name,
            type: child.type,
            styles: extractStyles(child),
            children: extractChildren(child),
          });
        }
      }
      filterButtonData.variants.items = variants;
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(filterButtonData, null, 2) + '\n');
    
    console.log(`\n✅ FilterButton data written to: ${outPath}`);
    console.log(`   - Found ${filterButtonData.variants.items?.length || 0} variants`);
  } catch (error) {
    console.error('❌ Error fetching FilterButton data:', error.message);
    process.exit(1);
  }
};

main();

#!/usr/bin/env node

/**
 * Fetch Chart component data from Figma
 * 
 * This script fetches multiple chart-related nodes from Figma
 * and saves them to source/figma-data.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const NODE_IDS = [
  '4108:27371',
  '4108:28832',
  '3952:35038',
  '3947:10541',
  '3952:27599',
  '3952:35392',
  '3952:35473',
  '3934:11311',
  '3938:11677',
  '3938:11683',
  '3944:14298',
  '3944:14366',
  '3938:11419',
];
const OUT_PATH = path.join(ROOT, 'src', 'components', 'chart', 'Chart', 'source', 'figma-data.json');

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
  const nodeIds = getArgValue('--nodeIds') ? getArgValue('--nodeIds').split(',') : NODE_IDS;
  const outPath = getArgValue('--out') ?? OUT_PATH;

  console.log(`Fetching Chart data from Figma...`);
  console.log(`File Key: ${fileKey}`);
  console.log(`Node IDs: ${nodeIds.join(', ')}`);

  try {
    const nodeIdsString = nodeIds.join(',');
    const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeIdsString)}`;
    const nodesRes = await fetchJson(nodesUrl, token);
    
    const chartData = {
      metadata: {
        fileKey,
        nodeIds,
        fetchedAt: new Date().toISOString(),
        source: 'Figma REST API',
      },
      nodes: [],
    };

    for (const nodeId of nodeIds) {
      const nodeDoc = nodesRes?.nodes?.[nodeId]?.document;
      
      if (!nodeDoc) {
        console.warn(`⚠️  Could not find node document for ${nodeId}`);
        continue;
      }

      console.log(`Found node: ${nodeDoc.name} (${nodeId})`);

      chartData.nodes.push({
        nodeId,
        name: nodeDoc.name,
        type: nodeDoc.type,
        styles: extractStyles(nodeDoc),
        children: extractChildren(nodeDoc),
        fullDocument: nodeDoc, // Include full document for detailed analysis
      });
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(chartData, null, 2) + '\n');
    
    console.log(`\n✅ Chart data written to: ${outPath}`);
    console.log(`   - Found ${chartData.nodes.length} nodes`);
    chartData.nodes.forEach(node => {
      console.log(`     • ${node.name} (${node.nodeId})`);
    });
  } catch (error) {
    console.error('❌ Error fetching Chart data:', error.message);
    process.exit(1);
  }
};

main();

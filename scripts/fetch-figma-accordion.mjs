#!/usr/bin/env node

/**
 * Fetch AccordionItem component data from Figma
 * 
 * This script fetches the AccordionItem component structure and styles from Figma
 * and saves it to source/figma-data.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const DEFAULT_ACCORDION_FRAME_NODE_ID = '3892:9731';
const OUT_PATH = path.join(ROOT, 'src', 'components', 'accordion', 'AccordionItem', 'source', 'figma-data.json');

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
  const frameNodeId = getArgValue('--frameNodeId') ?? DEFAULT_ACCORDION_FRAME_NODE_ID;
  const outPath = getArgValue('--out') ?? OUT_PATH;

  // Use defaults if not provided

  console.log(`Fetching AccordionItem data from Figma...`);
  console.log(`File Key: ${fileKey}`);
  console.log(`Frame Node ID: ${frameNodeId}`);

  try {
    const nodesUrl = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(frameNodeId)}`;
    const nodesRes = await fetchJson(nodesUrl, token);
    const frameDoc = nodesRes?.nodes?.[frameNodeId]?.document;
    
    if (!frameDoc) {
      throw new Error(`Could not find node document for ${frameNodeId}`);
    }

    console.log(`Found frame: ${frameDoc.name}`);
    console.log(`Frame type: ${frameDoc.type}`);

    // Extract component data
    const accordionData = {
      metadata: {
        fileKey,
        frameNodeId,
        frameName: frameDoc.name,
        fetchedAt: new Date().toISOString(),
      },
      structure: {
        description: 'AccordionItem component structure from Figma',
        frame: {
          id: frameDoc.id,
          name: frameDoc.name,
          type: frameDoc.type,
          children: frameDoc.children?.map(child => ({
            id: child.id,
            name: child.name,
            type: child.type,
            visible: child.visible !== false,
          })) || [],
        },
      },
      styles: {
        description: 'Extracted styles from Figma',
        // Will be populated from frameDoc
      },
      states: {
        description: 'Component states (collapsed, hovered, expanded)',
        // Will be populated from children
      },
    };

    // Process children to extract states and styles
    if (frameDoc.children) {
      const states = [];
      for (const child of frameDoc.children) {
        if (child.type === 'FRAME' || child.type === 'COMPONENT' || child.type === 'INSTANCE') {
          states.push({
            id: child.id,
            name: child.name,
            type: child.type,
            styles: extractStyles(child),
            children: extractChildren(child),
          });
        }
      }
      accordionData.states.items = states;
    }

    // Extract styles from the frame itself
    accordionData.styles.frame = extractStyles(frameDoc);

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(accordionData, null, 2) + '\n');
    
    console.log(`\n✅ AccordionItem data written to: ${outPath}`);
    console.log(`   - Found ${accordionData.states.items?.length || 0} state variants`);
  } catch (error) {
    console.error('❌ Error fetching AccordionItem data:', error.message);
    process.exit(1);
  }
};

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

main();

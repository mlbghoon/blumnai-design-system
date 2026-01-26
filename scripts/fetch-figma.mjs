#!/usr/bin/env node

/**
 * Generalized Figma REST API Data Fetcher
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/fetch-figma.mjs --node=NODE_ID [--output=OUTPUT_PATH] [--file=FILE_KEY]
 *
 * Examples:
 *   # Fetch single node (outputs to console)
 *   FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118
 *
 *   # Fetch multiple nodes
 *   FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118 --node=2846-3119
 *
 *   # Save to file
 *   FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118 --output=src/components/checkbox/source/figma-data.json
 *
 *   # Use different Figma file
 *   FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=123-456 --file=DIFFERENT_FILE_KEY
 *
 * Arguments:
 *   --node=NODE_ID      Node ID to fetch (can be specified multiple times)
 *                       Format: "2846-3118" or "2846:3118" (both work)
 *   --output=PATH       Optional output file path (if not specified, prints to console)
 *   --file=FILE_KEY     Optional Figma file key (defaults to design system file)
 *   --raw               Output raw Figma data without processing
 *   --depth=N           Limit child traversal depth (default: unlimited)
 */

import fs from 'fs';
import path from 'path';

// Default Figma file key for blumnai design system
const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    nodes: [],
    output: null,
    fileKey: DEFAULT_FILE_KEY,
    raw: false,
    depth: Infinity,
  };

  for (const arg of args) {
    if (arg.startsWith('--node=')) {
      // Convert dash format to colon format for API
      const nodeId = arg.slice(7).replace('-', ':');
      result.nodes.push(nodeId);
    } else if (arg.startsWith('--output=')) {
      result.output = arg.slice(9);
    } else if (arg.startsWith('--file=')) {
      result.fileKey = arg.slice(7);
    } else if (arg === '--raw') {
      result.raw = true;
    } else if (arg.startsWith('--depth=')) {
      result.depth = parseInt(arg.slice(8), 10);
    }
  }

  return result;
}

/**
 * Fetch nodes from Figma REST API
 */
async function fetchFigmaNodes(fileKey, nodeIds, accessToken) {
  const idsParam = nodeIds.join(',');
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${idsParam}`;

  console.error(`Fetching from Figma...`);
  console.error(`File: ${fileKey}`);
  console.error(`Nodes: ${nodeIds.join(', ')}`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Figma-Token': accessToken,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Figma API error: ${response.status} ${response.statusText}\n${errorText}`);
  }

  return await response.json();
}

/**
 * Extract style information from a node
 */
function extractStyles(node) {
  const styles = {};

  // Visual styles
  if (node.fills) styles.fills = node.fills;
  if (node.strokes) styles.strokes = node.strokes;
  if (node.strokeWeight) styles.strokeWeight = node.strokeWeight;
  if (node.strokeAlign) styles.strokeAlign = node.strokeAlign;
  if (node.effects) styles.effects = node.effects;
  if (node.opacity !== undefined && node.opacity !== 1) styles.opacity = node.opacity;

  // Corner radius
  if (node.cornerRadius) styles.cornerRadius = node.cornerRadius;
  if (node.rectangleCornerRadii) styles.rectangleCornerRadii = node.rectangleCornerRadii;

  // Layout
  if (node.layoutMode) styles.layoutMode = node.layoutMode;
  if (node.primaryAxisAlignItems) styles.primaryAxisAlignItems = node.primaryAxisAlignItems;
  if (node.counterAxisAlignItems) styles.counterAxisAlignItems = node.counterAxisAlignItems;
  if (node.primaryAxisSizingMode) styles.primaryAxisSizingMode = node.primaryAxisSizingMode;
  if (node.counterAxisSizingMode) styles.counterAxisSizingMode = node.counterAxisSizingMode;
  if (node.layoutAlign) styles.layoutAlign = node.layoutAlign;
  if (node.layoutGrow !== undefined) styles.layoutGrow = node.layoutGrow;

  // Spacing & padding
  if (node.paddingLeft) styles.paddingLeft = node.paddingLeft;
  if (node.paddingRight) styles.paddingRight = node.paddingRight;
  if (node.paddingTop) styles.paddingTop = node.paddingTop;
  if (node.paddingBottom) styles.paddingBottom = node.paddingBottom;
  if (node.itemSpacing) styles.itemSpacing = node.itemSpacing;
  if (node.counterAxisSpacing) styles.counterAxisSpacing = node.counterAxisSpacing;

  // Constraints
  if (node.constraints) styles.constraints = node.constraints;

  // Blend mode
  if (node.blendMode && node.blendMode !== 'PASS_THROUGH') styles.blendMode = node.blendMode;

  return styles;
}

/**
 * Process a node and its children
 */
function processNode(node, currentDepth = 0, maxDepth = Infinity) {
  const result = {
    id: node.id,
    name: node.name,
    type: node.type,
  };

  // Size information
  if (node.absoluteBoundingBox) {
    result.size = {
      width: node.absoluteBoundingBox.width,
      height: node.absoluteBoundingBox.height,
    };
  }

  // Relative position within parent
  if (node.relativeTransform) {
    result.position = {
      x: node.relativeTransform[0][2],
      y: node.relativeTransform[1][2],
    };
  }

  // Extract styles
  const styles = extractStyles(node);
  if (Object.keys(styles).length > 0) {
    result.styles = styles;
  }

  // Text-specific properties
  if (node.type === 'TEXT') {
    result.characters = node.characters;
    if (node.style) {
      result.textStyle = {
        fontFamily: node.style.fontFamily,
        fontWeight: node.style.fontWeight,
        fontSize: node.style.fontSize,
        lineHeightPx: node.style.lineHeightPx,
        letterSpacing: node.style.letterSpacing,
        textAlignHorizontal: node.style.textAlignHorizontal,
        textAlignVertical: node.style.textAlignVertical,
      };
    }
  }

  // Vector-specific properties
  if (node.type === 'VECTOR' || node.type === 'BOOLEAN_OPERATION') {
    if (node.fillGeometry) result.fillGeometry = node.fillGeometry;
    if (node.strokeGeometry) result.strokeGeometry = node.strokeGeometry;
  }

  // Process children (if within depth limit)
  if (node.children && currentDepth < maxDepth) {
    result.children = node.children.map(child =>
      processNode(child, currentDepth + 1, maxDepth)
    );
  } else if (node.children) {
    result.childCount = node.children.length;
  }

  return result;
}

/**
 * Print usage information
 */
function printUsage() {
  console.error(`
Figma REST API Data Fetcher

Usage:
  FIGMA_ACCESS_TOKEN=your_token node scripts/fetch-figma.mjs --node=NODE_ID [options]

Options:
  --node=NODE_ID      Node ID to fetch (required, can specify multiple)
                      Format: "2846-3118" or "2846:3118"
  --output=PATH       Save output to file (otherwise prints to console)
  --file=FILE_KEY     Figma file key (default: ${DEFAULT_FILE_KEY})
  --raw               Output raw Figma data without processing
  --depth=N           Limit child traversal depth

Examples:
  # Fetch and display node data
  FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118

  # Fetch multiple nodes and save to file
  FIGMA_ACCESS_TOKEN=xxx node scripts/fetch-figma.mjs --node=2846-3118 --node=2846-3119 --output=data.json

Get your Figma access token at:
  https://www.figma.com/developers/api#access-tokens
`);
}

/**
 * Main function
 */
async function main() {
  const config = parseArgs();

  // Validate arguments
  if (config.nodes.length === 0) {
    printUsage();
    process.exit(1);
  }

  const accessToken = process.env.FIGMA_ACCESS_TOKEN;
  if (!accessToken) {
    console.error('Error: FIGMA_ACCESS_TOKEN environment variable is required\n');
    printUsage();
    process.exit(1);
  }

  try {
    // Fetch data from Figma
    const data = await fetchFigmaNodes(config.fileKey, config.nodes, accessToken);

    // Process results
    const result = {};

    for (const nodeId of config.nodes) {
      const nodeKey = nodeId.replace(':', '-');
      const nodeData = data.nodes?.[nodeId];

      if (!nodeData) {
        console.error(`Warning: Node ${nodeId} not found`);
        continue;
      }

      if (config.raw) {
        result[nodeKey] = nodeData.document;
      } else {
        result[nodeKey] = processNode(nodeData.document, 0, config.depth);
      }

      console.error(`Fetched: ${nodeId} (${nodeData.document.name})`);
    }

    // Add metadata
    result._metadata = {
      fileKey: config.fileKey,
      nodeIds: config.nodes,
      fetchedAt: new Date().toISOString(),
      source: 'Figma REST API',
    };

    // Output
    const jsonOutput = JSON.stringify(result, null, 2);

    if (config.output) {
      // Ensure directory exists
      const outputDir = path.dirname(config.output);
      fs.mkdirSync(outputDir, { recursive: true });

      // Write file
      fs.writeFileSync(config.output, jsonOutput);
      console.error(`\nSaved to: ${config.output}`);
    } else {
      // Print to stdout
      console.log(jsonOutput);
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();

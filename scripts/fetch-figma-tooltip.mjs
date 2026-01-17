import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const NODE_IDS = ['3844-16389', '3843-25853', '4100-18926', '3844-16387'];

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is not set');
  process.exit(1);
}

async function fetchFigmaNode(fileKey, nodeId) {
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching node ${nodeId}:`, error.message);
    throw error;
  }
}

function extractNodeData(node) {
  if (!node || !node.document) {
    return null;
  }

  const document = node.document;
  
  // Extract styles and computed styles
  const styles = {
    fills: document.fills,
    strokes: document.strokes,
    strokeWeight: document.strokeWeight,
    cornerRadius: document.cornerRadius,
    effects: document.effects,
    opacity: document.opacity,
    blendMode: document.blendMode,
  };

  // Extract layout properties
  const layout = {
    width: document.absoluteBoundingBox?.width,
    height: document.absoluteBoundingBox?.height,
    x: document.absoluteBoundingBox?.x,
    y: document.absoluteBoundingBox?.y,
    layoutMode: document.layoutMode,
    layoutGrow: document.layoutGrow,
    layoutAlign: document.layoutAlign,
    paddingLeft: document.paddingLeft,
    paddingRight: document.paddingRight,
    paddingTop: document.paddingTop,
    paddingBottom: document.paddingBottom,
    gap: document.counterAxisSpacing,
  };

  // Extract typography
  const typography = document.style ? {
    fontFamily: document.style.fontFamily,
    fontWeight: document.style.fontWeight,
    fontSize: document.style.fontSize,
    lineHeight: document.style.lineHeightPx,
    letterSpacing: document.style.letterSpacing,
    textCase: document.style.textCase,
    textDecoration: document.style.textDecoration,
  } : null;

  // Recursively extract children
  const children = document.children ? document.children.map(child => extractNodeData({ document: child })) : [];

  return {
    id: document.id,
    name: document.name,
    type: document.type,
    styles,
    layout,
    typography,
    children: children.filter(Boolean),
  };
}

async function main() {
  console.log('Fetching Tooltip data from Figma...\n');

  const allData = {};

  for (const nodeId of NODE_IDS) {
    console.log(`Fetching node ${nodeId}...`);
    const data = await fetchFigmaNode(DEFAULT_FILE_KEY, nodeId);
    
    if (data.nodes && Object.keys(data.nodes).length > 0) {
      const nodeKey = Object.keys(data.nodes)[0];
      const node = data.nodes[nodeKey];
      
      if (node) {
        const extracted = extractNodeData(node);
        if (extracted) {
          allData[nodeId] = extracted;
          console.log(`✓ Extracted data for ${extracted.name} (${nodeId})`);
        }
      }
    }
  }

  // Ensure directory exists
  const outputDir = path.join(__dirname, '../src/components/tooltip/Tooltip/source');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save consolidated data
  const outputPath = path.join(outputDir, 'figma-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2));

  console.log(`\n✓ Saved Figma data to: ${outputPath}`);
  console.log(`\nTotal nodes fetched: ${Object.keys(allData).length}`);
}

main().catch(console.error);

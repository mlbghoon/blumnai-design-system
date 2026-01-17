import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const DEFAULT_FILE_KEY = 'hNwky49HL9rYtxWb5smgqZ';
const COLORS_OUT_PATH = path.join(ROOT, 'src', 'tokens', 'source', 'sortui.colors.json');
const GLOBAL_COLORS_OUT_PATH = path.join(ROOT, 'src', 'tokens', 'source', 'sortui.global-colors.json');

const getArgValue = (name) => {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
};

const fetchJson = async (url, token) => {
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Figma API error ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
};

/**
 * Convert Figma variable path to token key
 * Example: "Border/default" -> "border/default"
 */
const normalizeKey = (path) => {
  return path.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Convert variable value to hex color string
 */
const valueToHex = (value) => {
  if (typeof value === 'string' && value.startsWith('#')) {
    return value;
  }
  if (typeof value === 'object' && value.r !== undefined) {
    // RGB/RGBA object
    const r = Math.round(value.r * 255);
    const g = Math.round(value.g * 255);
    const b = Math.round(value.b * 255);
    const a = value.a !== undefined ? Math.round(value.a * 255).toString(16).padStart(2, '0') : '';
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a}`;
  }
  return null;
};

/**
 * Resolve variable references (variables can reference other variables)
 */
const resolveVariableValue = (value, variables, modes, modeId) => {
  // If it's a direct color value
  if (typeof value === 'object' && (value.r !== undefined || value.type === 'VARIABLE_ALIAS')) {
    if (value.type === 'VARIABLE_ALIAS') {
      // This is a reference to another variable - resolve it
      const referencedVar = variables.find(v => v.id === value.id);
      if (referencedVar && referencedVar.valuesByMode?.[modeId]) {
        return resolveVariableValue(referencedVar.valuesByMode[modeId], variables, modes, modeId);
      }
    } else {
      // Direct RGB/RGBA value
      return valueToHex(value);
    }
  }
  // String value (hex)
  if (typeof value === 'string') {
    return value.startsWith('#') ? value : null;
  }
  return null;
};

/**
 * Process variables and separate into global colors (palette) and semantic tokens
 */
const processVariables = (variables, modes, collections) => {
  const globalColors = {};
  const colorTokens = {};
  
  // Identify which collections are global colors (palette) vs semantic tokens
  const globalColorCollections = new Set(['zinc', 'neutral', 'gray', 'slate', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'transparent']);
  
  // Group variables by collection
  const byCollection = new Map();
  const collectionMap = new Map();
  
  // Map collection IDs to names
  for (const collection of collections) {
    collectionMap.set(collection.id, collection.name);
  }
  
  for (const variable of variables) {
    // Only process COLOR variables
    if (variable.resolvedType !== 'COLOR') continue;
    
    const collectionId = variable.variableCollectionId;
    const collectionName = collectionMap.get(collectionId) || 'other';
    const firstPart = variable.name.split('/')[0]?.toLowerCase() || '';
    
    if (!byCollection.has(collectionName)) {
      byCollection.set(collectionName, []);
    }
    byCollection.get(collectionName).push(variable);
  }
  
  // Process variables - use first mode for now (can extend to all themes later)
  const modeId = modes && modes.length > 0 ? modes[0].modeId : Object.keys(variables[0]?.valuesByMode || {})[0];
  
  for (const [collectionName, vars] of byCollection.entries()) {
    for (const variable of vars) {
      const key = normalizeKey(variable.name);
      const firstPart = variable.name.split('/')[0]?.toLowerCase() || '';
      
      const value = variable.valuesByMode?.[modeId];
      if (!value) continue;
      
      const hex = resolveVariableValue(value, variables, modes, modeId);
      if (!hex) continue;
      
      // Determine if it's a global color (palette) or semantic token
      if (globalColorCollections.has(firstPart) || collectionName.toLowerCase().includes('global') || collectionName.toLowerCase().includes('palette')) {
        globalColors[key] = hex;
      } else {
        colorTokens[key] = hex;
      }
    }
  }
  
  return { globalColors, colorTokens };
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

  console.log(`Fetching variables from Figma file: ${fileKey}...`);

  try {
    // Fetch local variables
    const variablesUrl = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
    const variablesRes = await fetchJson(variablesUrl, token);
    
    const variables = variablesRes?.meta?.variables || [];
    const variableCollections = variablesRes?.meta?.variableCollections || [];
    
    console.log(`Found ${variables.length} variables`);
    console.log(`Found ${variableCollections.length} variable collections`);
    
    // Get all modes (themes) from collections
    const allModes = [];
    const modesByCollection = new Map();
    for (const collection of variableCollections) {
      if (collection.modes) {
        modesByCollection.set(collection.id, collection.modes);
        allModes.push(...collection.modes);
      }
    }
    
    // Get unique mode names
    const uniqueModes = Array.from(new Set(allModes.map(m => m.name)));
    console.log(`Found ${uniqueModes.length} unique modes/themes:`, uniqueModes.join(', '));
    
    // Process variables - separate global colors and semantic tokens
    const { globalColors, colorTokens } = processVariables(variables, allModes, variableCollections);
    
    console.log(`\nProcessed:`);
    console.log(`  - ${Object.keys(globalColors).length} global colors (palette)`);
    console.log(`  - ${Object.keys(colorTokens).length} semantic color tokens`);
    
    // Write global colors
    fs.mkdirSync(path.dirname(GLOBAL_COLORS_OUT_PATH), { recursive: true });
    fs.writeFileSync(GLOBAL_COLORS_OUT_PATH, JSON.stringify(globalColors, null, 2) + '\n');
    console.log(`\n✅ Global colors written to: ${GLOBAL_COLORS_OUT_PATH}`);
    
    // Write color tokens
    fs.mkdirSync(path.dirname(COLORS_OUT_PATH), { recursive: true });
    fs.writeFileSync(COLORS_OUT_PATH, JSON.stringify(colorTokens, null, 2) + '\n');
    console.log(`✅ Color tokens written to: ${COLORS_OUT_PATH}`);
    
    if (uniqueModes.length > 1) {
      console.log(`\n⚠️  Note: Found ${uniqueModes.length} themes. Current output uses the first theme.`);
      console.log(`   Themes found: ${uniqueModes.join(', ')}`);
      console.log(`   To support all themes, we'll need to restructure the token files.`);
    }
    
  } catch (error) {
    console.error('Error fetching variables:', error.message);
    if (error.message.includes('404')) {
      console.error('\nNote: Variables API might not be available for this file, or the file key is incorrect.');
      console.error('Make sure you have access to the file and that it uses Figma Variables.');
      console.error('\nFigma Variables API endpoint: /v1/files/:file_key/variables/local');
    }
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
};

main();

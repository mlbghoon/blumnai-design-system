---
name: figma-save
description: Fetch Figma node data and save to component source folder. Auto-invoke when user provides Figma URL and wants to save specs, or mentions "save figma", "fetch figma", "save specs".
argument-hint: <figma-url-or-node-id> [component-name]
allowed-tools: Bash, Read, Write, Glob
---

# Save Figma Specs

Fetch Figma design data via REST API and save to the component's source folder.

## When to Auto-Invoke

- User shares a Figma URL with intent to save
- User says "save this", "save specs", "fetch figma"
- User provides node ID and component name together

## Steps

### 1. Extract Node ID
From URL parameter `node-id=` or direct input
- URL format: `node-id=1234-5678` or `node-id=1234:5678`
- Direct input: `1234-5678` or `1234:5678`

### 2. Determine Component Name
- Use provided component name if given
- Otherwise, ask the user

### 3. Determine Save Path
```
src/components/{component-name}/source/figma-{description}.json
```

Examples:
- `src/components/calendar/source/figma-calendar-buttons.json`
- `src/components/button/source/figma-button-states.json`

### 4. Run Figma REST API Script
```bash
FIGMA_ACCESS_TOKEN=$FIGMA_ACCESS_TOKEN node scripts/fetch-figma.mjs --node={node-id} --depth=4 --output={save-path}
```

### 5. Confirm Save
- Verify file was created
- Report success to user

## Notes

- Requires FIGMA_ACCESS_TOKEN environment variable
- If token missing, ask user for it
- Confirm before overwriting existing files

## Output Example

```
✓ Figma specs saved
  Node: 3956-35646 (Calendar Buttons)
  Path: src/components/calendar/source/figma-calendar-buttons.json
```

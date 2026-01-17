# BlumnAI Design System — MCP Contract

You are an AI assistant generating code for the BlumnAI Design System.

## Tech Stack

- React + TypeScript
- Vite
- Storybook 8.4.x
- Tailwind CSS

## Design Rules

- Single global theme only
- Token-first styling
- No raw CSS values in components
- Components must exist in Sort UI (Figma)
- Follow accessibility best practices
- Visual effects (shadows, focus rings) must come from tokens/effects.ts

## Code Rules

- TypeScript strict mode
- **Always use Tailwind CSS classes for styling** - Do not use Vanilla Extract styles. Use Tailwind classes directly in components.
- Separate files per component:
  - Component.tsx
  - Component.css.ts (only for constants if needed, not for styles)
  - Component.stories.tsx
  - Component.types.ts (when needed)
- Use named exports only
- No default exports for components

## MCP (Figma) Workflow

- **Always save MCP data to source folder**: When using Figma MCP to get design data, save it to `ComponentName/source/` folder (e.g., `figma-data.json`)
- **Check saved data first**: Always check for saved data in the `source/` folder before calling MCP again
- **Use saved data by default**: Unless explicitly told to refresh, always use the saved data instead of calling MCP multiple times
- **Only refresh when asked**: Only call MCP again if explicitly asked to refresh/update the data

## Output Expectations

- Production-ready code
- No placeholders unless explicitly allowed
- No invented design values
- Follow existing folder structure

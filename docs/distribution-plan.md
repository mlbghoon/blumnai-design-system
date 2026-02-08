# Plan: Design System Distribution Strategy

> **Note**: User requested to save this plan to `docs/distribution-plan.md` for team review before implementation.

## Overview

Set up the blumnai-design-system for company-wide distribution:
- **Frontend Developers**: Install via private npm registry
- **Designers**: Access Storybook documentation + Figma integration

---

## Part 1: NPM Package for Developers

### 1.1 Create Library Entry Point

Create `src/index.ts` that exports all public components:

```ts
// Components
export * from './components/button';
export * from './components/input';
export * from './components/checkbox';
// ... all components

// Icons
export * from './components/icons';

// Hooks
export * from './hooks';

// Types
export type { ... } from './components/...';
```

### 1.2 Configure Vite for Library Build

Update `vite.config.ts` to add library build mode:

```ts
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/App.tsx', 'src/main.tsx', '**/*.stories.tsx'] })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BlumnaiDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    sourcemap: true,
    cssCodeSplit: true
  }
});
```

### 1.3 Update package.json

```json
{
  "name": "@blumnai/design-system",
  "version": "1.0.0",
  "private": false,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "scripts": {
    "build:lib": "vite build --mode lib",
    "prepublishOnly": "npm run build:lib"
  },
  "publishConfig": {
    "registry": "https://your-private-registry.com/"
  }
}
```

### 1.4 Add vite-plugin-dts

```bash
npm install -D vite-plugin-dts
```

### 1.5 Private Registry Setup (Detailed Guide for Beginners)

#### What is a Registry?

Think of npm (Node Package Manager) like an app store for code libraries. When you run `npm install react`, npm goes to a **registry** (a server that stores packages) and downloads React.

By default, npm uses the **public registry** at `registry.npmjs.org`. Anyone can download packages from there.

#### What is a Private Registry?

A **private registry** is your own "private app store" for code. Only people in your company can access it. This is important because:
- Your design system code stays confidential
- Only authorized team members can download/install it
- You control who has access

#### Your Options (Choose One)

| Option | Best For | Cost | Difficulty |
|--------|----------|------|------------|
| **GitHub Packages** | Teams already using GitHub | Free for private repos | Easy |
| **npm Pro/Teams** | Simple setup, official npm | $7-14/user/month | Very Easy |
| **Verdaccio** | Self-hosted, full control | Free (server costs only) | Medium |
| **AWS CodeArtifact** | AWS-based companies | Pay per use | Medium |
| **JFrog Artifactory** | Enterprise companies | Varies | Complex |

**Recommendation for most teams**: GitHub Packages (if you're already on GitHub) or npm Teams.

---

#### Option A: GitHub Packages (Recommended)

GitHub Packages lets you host npm packages directly in your GitHub repository.

**Step 1: Update package.json**

Change the package name to include your GitHub organization:
```json
{
  "name": "@your-github-org/design-system",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**Step 2: Create `.npmrc` file in project root**

This file tells npm where to find and publish packages.

Create a new file called `.npmrc` (note the dot at the beginning) in your project folder:
```
@your-github-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**What does this mean?**
- Line 1: "Any package starting with @your-github-org should be downloaded from GitHub Packages"
- Line 2: "Use this token to authenticate" (the `${GITHUB_TOKEN}` will be replaced with your actual token)

**Step 3: Create a Personal Access Token**

1. Go to GitHub.com → Click your profile picture → Settings
2. Scroll down to "Developer settings" (bottom of left sidebar)
3. Click "Personal access tokens" → "Tokens (classic)"
4. Click "Generate new token (classic)"
5. Give it a name like "npm-publish"
6. Select these permissions:
   - `write:packages` (to publish packages)
   - `read:packages` (to download packages)
   - `delete:packages` (optional, to delete old versions)
7. Click "Generate token"
8. **IMPORTANT**: Copy the token now! You won't see it again.

**Step 4: Save your token safely**

On your computer, add this to your shell profile (`~/.bashrc`, `~/.zshrc`, or `~/.bash_profile`):
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Replace `ghp_xxx...` with your actual token.

Then run:
```bash
source ~/.zshrc  # or ~/.bashrc
```

**Step 5: Publish your package**
```bash
npm run build:lib
npm publish
```

**For team members to install:**

They also need to:
1. Create their own GitHub token (with `read:packages` permission)
2. Add to their `~/.npmrc` file (in their home folder, not the project):
```
//npm.pkg.github.com/:_authToken=ghp_their_token_here
```
3. Then they can install:
```bash
npm install @your-github-org/design-system
```

---

#### Option B: npm Teams/Pro

This uses npm's official private registry. Simpler but costs money.

**Step 1: Sign up at npmjs.com**

1. Go to npmjs.com and create an account
2. Go to account settings → "Upgrade to Pro" or "Create Organization"
3. For teams: Create an organization (e.g., "blumnai")

**Step 2: Update package.json**
```json
{
  "name": "@blumnai/design-system",
  "publishConfig": {
    "access": "restricted"
  }
}
```

**Step 3: Login and publish**
```bash
npm login
# Enter your npm username, password, email

npm run build:lib
npm publish
```

**For team members:**
```bash
npm login  # Login with their npm account
npm install @blumnai/design-system
```

The organization admin needs to invite team members on npmjs.com.

---

#### Option C: Self-hosted with Verdaccio

Verdaccio is free software that creates your own npm registry on a server you control.

**Step 1: Install Verdaccio on a server**
```bash
npm install -g verdaccio
verdaccio  # Starts on http://localhost:4873
```

For production, you'd deploy this to a server (AWS EC2, DigitalOcean, etc.) and run it behind a domain like `npm.your-company.com`.

**Step 2: Create `.npmrc` in project**
```
@blumnai:registry=https://npm.your-company.com/
//npm.your-company.com/:_authToken=${NPM_TOKEN}
```

**Step 3: Create user and get token**
```bash
npm adduser --registry https://npm.your-company.com/
# Creates account and saves token locally
```

This option requires more DevOps knowledge but gives you full control.

---

#### Important: Never Commit Tokens!

Add `.npmrc` to `.gitignore` if it contains actual tokens:
```
# .gitignore
.npmrc
```

Instead, use environment variables (`${GITHUB_TOKEN}`) and let each developer set their own token locally.

---

#### Quick Summary

| What | Where | Purpose |
|------|-------|---------|
| `.npmrc` in project | Project root folder | Tells npm which registry to use |
| `.npmrc` in home | `~/.npmrc` | Stores your personal auth token |
| Token | Environment variable or ~/.npmrc | Proves you're allowed to access packages |

---

## Part 2: Storybook Deployment for Designers

### 2.1 Deployment Options

| Option | Pros | Cons |
|--------|------|------|
| **Chromatic** | Built for Storybook, visual testing included | Paid for private |
| **Vercel** | Free, easy GitHub integration | Public unless paid |
| **Internal hosting** | Full control, private | Requires infrastructure |
| **GitHub Pages** | Free, automatic | Public only |

**Recommendation**: Deploy to your company's internal hosting or use Vercel/Netlify with team access.

### 2.2 Build Command

Already configured:
```bash
npm run build-storybook  # Outputs to storybook-static/
```

### 2.3 Deployment Script (if using Vercel)

Add `vercel.json`:
```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "framework": null
}
```

---

## Part 3: Figma-to-Code Sync (Already in Place)

Your project already has:
- `scripts/fetch-figma.mjs` - Fetch component specs from Figma
- Design tokens in `src/tokens/` synced from Figma
- Color, typography, spacing tokens

**For designers**: Document the Figma file link and how tokens flow to code.

---

## Part 4: Optional CI/CD (GitHub Actions)

If you decide to automate later, create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://your-private-registry.com/'

      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build:lib

      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Implementation Steps

### Phase 1: Library Setup (Required)
1. [ ] Create `src/index.ts` entry point
2. [ ] Install `vite-plugin-dts`
3. [ ] Update `vite.config.ts` for library build
4. [ ] Update `package.json` with exports and publishing config
5. [ ] Create `.npmrc` for private registry
6. [ ] Test build: `npm run build:lib`
7. [ ] Test local install in another project

### Phase 2: Documentation (Required)
1. [ ] Deploy Storybook to chosen platform
2. [ ] Share Storybook URL with team
3. [ ] Document installation instructions for developers:
   ```bash
   npm install @blumnai/design-system
   ```
   ```tsx
   import { Button, Input } from '@blumnai/design-system';
   import '@blumnai/design-system/styles';
   ```

### Phase 3: Automation (Optional, Later)
1. [ ] Set up GitHub Actions for automated publishing
2. [ ] Configure semantic versioning (semantic-release or manual)
3. [ ] Add CHANGELOG.md

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/index.ts` | Create - library entry point |
| `vite.config.ts` | Modify - add library build config |
| `package.json` | Modify - add exports, files, peerDeps |
| `.npmrc` | Create - private registry config |
| `vercel.json` or hosting config | Create - Storybook deployment |
| `.github/workflows/release.yml` | Create (optional) - CI/CD |

---

## Verification

1. **Build test**: `npm run build:lib` produces `dist/` with `.mjs`, `.cjs`, `.d.ts` files
2. **Local test**: Install in a test project and import components
3. **Storybook**: Access deployed URL and verify all components render
4. **Publish test**: `npm publish --dry-run` to verify package contents

---

## Cross-Project Compatibility

The plan handles different environments:

### Node.js Versions (16, 18, 20+)
✅ **No issues** - The compiled output (ESM/CJS) uses standard JavaScript without Node-specific APIs. Works with Node 16+.

### React Versions (18.x, 19.x)
✅ **Handled** via `peerDependencies`:
```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```
Each project uses its own React version; the design system doesn't bundle React.

### Different Bundlers (Vite, Webpack, Next.js, etc.)
✅ **Handled** via dual format output:
- `.mjs` (ESM) - for Vite, modern bundlers, Next.js
- `.cjs` (CommonJS) - for older Webpack, Jest, Node require()

The `exports` field in package.json tells bundlers which format to use:
```json
"exports": {
  ".": {
    "import": "./dist/index.mjs",   // ESM for import
    "require": "./dist/index.cjs",  // CJS for require()
    "types": "./dist/index.d.ts"
  }
}
```

### CSS Compatibility
✅ **Universal** - CSS is output as plain `.css` file, works everywhere:
```tsx
import '@blumnai/design-system/styles';
```

### TypeScript Versions
✅ **Handled** - Pre-compiled `.d.ts` files work with any TypeScript version 4.7+.

---

## Developer Usage (Final Result)

```bash
# Install
npm install @blumnai/design-system

# In code
import { Button, Input, Checkbox } from '@blumnai/design-system';
import '@blumnai/design-system/styles';

function App() {
  return <Button style="primary">Click me</Button>;
}
```

### Works with:
- **Vite** projects
- **Next.js** (App Router & Pages Router)
- **Create React App** (Webpack)
- **Remix**
- **Any React project**

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

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'lib';

  return {
    plugins: [react()],
    build: isLibraryBuild
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            external: (id) => {
              if (id.startsWith('.') || path.isAbsolute(id)) return false;
              return true;
            },
            output: [
              {
                format: 'es',
                dir: 'dist',
                entryFileNames: '[name].mjs',
                preserveModules: true,
                preserveModulesRoot: 'src',
              },
              {
                format: 'cjs',
                dir: 'dist',
                entryFileNames: '[name].cjs',
                exports: 'named',
                preserveModules: true,
                preserveModulesRoot: 'src',
              },
            ],
          },
          sourcemap: true,
          cssCodeSplit: false,
          copyPublicDir: false,
          minify: 'esbuild',
        }
      : {},
  };
});
```

### 1.3 Update package.json

```json
{
  "name": "@mlbghoon/blumnai-design-system",
  "version": "1.0.0",
  "private": false,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./*": {
      "import": "./dist/*.mjs",
      "require": "./dist/*.cjs"
    },
    "./styles": "./dist/blumnai-design-system.css"
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
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 1.4 Add vite-plugin-dts

```bash
npm install -D vite-plugin-dts
```

### 1.5 GitHub Packages Setup

> **Decision**: We're using **GitHub Packages** for private npm hosting.

GitHub Packages lets you host npm packages directly in your GitHub repository. Free for private repos, easy setup.

**Step 1: Update package.json**

```json
{
  "name": "@mlbghoon/blumnai-design-system",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

**Step 2: Create `.npmrc` file in project root**

```ini
@mlbghoon:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**Step 3: Create a Personal Access Token**

1. Go to GitHub.com → Profile → Settings → Developer settings
2. Click "Personal access tokens" → "Tokens (classic)"
3. Click "Generate new token (classic)"
4. Name: "npm-publish"
5. Select permissions:
   - `write:packages` (to publish)
   - `read:packages` (to download)
   - `delete:packages` (optional)
6. Click "Generate token"
7. **Copy the token immediately!**

**Step 4: Save your token**

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):
```bash
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then run:
```bash
source ~/.zshrc
```

**Step 5: Publish**
```bash
npm run build:lib
npm publish
```

**For team members to install:**

**1. Create a GitHub Personal Access Token**

1. Log in to [GitHub.com](https://github.com)
2. Click your profile icon (top right) → **Settings**
3. Scroll down the left sidebar → click **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token (classic)**
6. Note (name): enter `design-system`
7. **Expiration**: choose your preferred expiry (e.g., 90 days)
8. Check `read:packages` ✅
9. Click **Generate token** at the bottom
10. ⚠️ **Copy the token (starts with `ghp_`) immediately!** You won't be able to see it again after leaving the page.

**2. Create `.npmrc` file in your home folder**

Pick your OS below and follow the instructions.
Replace `YOUR_TOKEN` with the token you just copied.

> ⚠️ **Renewing a token?** If you already have a `.npmrc` file, running these commands again will add duplicate lines.
> Delete the old file first, then re-run:
> - Mac/Linux: `rm ~/.npmrc`
> - Windows: `Remove-Item "$env:USERPROFILE\.npmrc"`

<details>
<summary><b>🍎 Mac (macOS) / Linux</b></summary>

Open **Terminal** and run these commands **one at a time**:

```bash
echo "@mlbghoon:registry=https://npm.pkg.github.com" >> ~/.npmrc
```
```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

**Verify:** Run `cat ~/.npmrc` — you should see **exactly these 2 lines**:
```
@mlbghoon:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxx...
```

If you see duplicate lines, delete and redo:
```bash
rm ~/.npmrc
```
Then run the two `echo` commands above again.

</details>

<details>
<summary><b>🪟 Windows</b></summary>

Open **PowerShell** and run these commands **one at a time**:

```powershell
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "@mlbghoon:registry=https://npm.pkg.github.com"
```
```powershell
Add-Content -Path "$env:USERPROFILE\.npmrc" -Value "//npm.pkg.github.com/:_authToken=YOUR_TOKEN"
```

**Verify:** Run `Get-Content "$env:USERPROFILE\.npmrc"` — you should see **exactly these 2 lines**:
```
@mlbghoon:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxx...
```

If you see duplicate lines, delete and redo:
```powershell
Remove-Item "$env:USERPROFILE\.npmrc"
```
Then run the two `Add-Content` commands above again.

> **Note:** `$env:USERPROFILE` is usually `C:\Users\YourName`.

</details>

**3. Install the package**

In your project folder, run:
```bash
npm install @mlbghoon/blumnai-design-system --legacy-peer-deps --legacy-peer-deps
```

**4. Import CSS (required, do this once)**

Add this line to your app's entry file (e.g., `main.tsx`, `App.tsx`, `layout.tsx`):
```tsx
import '@mlbghoon/blumnai-design-system/styles';
```

**5. Use components**
```tsx
import { Button, Input } from '@mlbghoon/blumnai-design-system';
```

---

#### Important: Never Commit Tokens!

The project `.npmrc` uses `${GITHUB_TOKEN}` environment variable. Each developer sets their own token locally.

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
          registry-url: 'https://npm.pkg.github.com'

      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build:lib

      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
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
   npm install @mlbghoon/blumnai-design-system --legacy-peer-deps
   ```
   ```tsx
   import { Button, Input } from '@mlbghoon/blumnai-design-system';
   import '@mlbghoon/blumnai-design-system/styles';
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

1. **Build test**: `npm run build:lib` produces `dist/` with `.mjs` (ESM), `.cjs` (CJS), and `.d.ts` files
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
✅ **Handled** via dual format output with `preserveModules`:
- `.mjs` files (ESM) - for Vite, modern bundlers, Next.js
- `.cjs` files (CJS) - for older Webpack, Jest, Node require()

Both formats coexist in `dist/` with different extensions. The `exports` field tells bundlers which format to use:
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
import '@mlbghoon/blumnai-design-system/styles';
```

### TypeScript Versions
✅ **Handled** - Pre-compiled `.d.ts` files work with any TypeScript version 4.7+.

---

## Developer Usage (Final Result)

```bash
# Install
npm install @mlbghoon/blumnai-design-system --legacy-peer-deps

# In code
import { Button, Input, Checkbox } from '@mlbghoon/blumnai-design-system';
import '@mlbghoon/blumnai-design-system/styles';

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

---

## v0.2.34 — Migration Gap Features

12 new features added to support the happytalk-front migration from custom UI / happytalk-design-guide (hdg).

### New Components

#### InfoBox (Callout)

Static inline info/callout box with variant colors, indicator bar, icon, optional title, and close button.

```tsx
import { InfoBox } from '@mlbghoon/blumnai-design-system';

<InfoBox variant="info" title="Information">
  This is an informational message.
</InfoBox>

<InfoBox variant="warning" closable onClose={() => {}}>
  Warning message with close button.
</InfoBox>

<InfoBox variant="error">
  Error details here.
</InfoBox>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Color variant |
| `icon` | `IconType` | Per-variant default | Override default icon |
| `visible` | `boolean` | `true` | Show/hide |
| `title` | `ReactNode` | — | Optional title |
| `closable` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | — | Close callback |
| `children` | `ReactNode` | Required | Body content |

### Enhanced Props

#### ConfirmDialog `description` → ReactNode

`description` now accepts `ReactNode` (previously `string` only). Supports styled text like bold names.

```tsx
<ConfirmDialog
  title="Delete user"
  description={<>Are you sure you want to delete <strong>John</strong>?</>}
/>
```

#### Select `renderOption`

Custom rendering for select option items. Works with all variants (default, avatar, multi-select, tags).

```tsx
<Select
  variant="default"
  options={options}
  renderOption={(option, isSelected) => (
    <div className="flex items-center ds-gap-8">
      <Avatar size="2xs" src={option.avatarSrc} />
      <span>{option.label}</span>
      {isSelected && <Icon iconType={['system', 'check']} size={16} />}
    </div>
  )}
/>
```

#### Select `minWidth`

```tsx
<Select minWidth={200} options={options} />
<Select minWidth="15rem" options={options} />
```

#### Checkbox `size` + `shape`

```tsx
<Checkbox size="sm" />   {/* 16×16 (default) */}
<Checkbox size="md" />   {/* 20×20 */}
<Checkbox size="lg" />   {/* 24×24 */}

<Checkbox shape="square" />  {/* default */}
<Checkbox shape="round" />   {/* rounded-full */}
```

#### Switch `size`

```tsx
<Switch size="sm" />   {/* 32×20 track (default) */}
<Switch size="md" />   {/* 40×24 track */}
<Switch size="lg" />   {/* 48×28 track */}
```

#### Input `xs` size

```tsx
<Input variant="default" size="xs" />  {/* 28px height */}
<Input variant="default" size="sm" />  {/* 32px height (default) */}
<Input variant="default" size="lg" />  {/* 36px height */}
```

#### TooltipTrigger `sideOffset` / `alignOffset`

```tsx
<TooltipTrigger content="Tooltip" sideOffset={12} alignOffset={4}>
  <button>Hover me</button>
</TooltipTrigger>
```

| Prop | Type | Default |
|------|------|---------|
| `sideOffset` | `number` | `8` |
| `alignOffset` | `number` | `0` |

#### Tooltip `width` / `minWidth`

```tsx
<TooltipTrigger content="Wide tooltip" width={300} minWidth={200}>
  <button>Hover</button>
</TooltipTrigger>
```

#### Dialog `fullScreen`

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent fullScreen>
    {/* Full-screen content for mobile */}
  </DialogContent>
</Dialog>
```

#### Pagination `size`

```tsx
<Pagination size="sm" page={1} totalPages={10} onPageChange={setPage} />
<Pagination size="lg" page={1} totalPages={10} onPageChange={setPage} />  {/* default */}
```

| Size | Items | Dots | Nav | Text |
|------|-------|------|-----|------|
| `sm` | 28×28 | 8×8 | 28×28 | size-xs |
| `lg` | 32×32 | 10×10 | 32×32 | size-sm |

#### DataGrid Column Header Tooltip

```tsx
const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    meta: {
      headerTooltip: 'Full name of the user',
    },
  },
];
```

### New Exports

```ts
// New component
export { InfoBox } from '@mlbghoon/blumnai-design-system';
export type { InfoBoxProps, InfoBoxVariant } from '@mlbghoon/blumnai-design-system';

// New types
export type {
  CheckboxSize,      // 'sm' | 'md' | 'lg'
  CheckboxShape,     // 'square' | 'round'
  SwitchSize,        // 'sm' | 'md' | 'lg'
  PaginationSize,    // 'sm' | 'lg'
} from '@mlbghoon/blumnai-design-system';

// InputSize now includes 'xs': 'xs' | 'sm' | 'lg'
```

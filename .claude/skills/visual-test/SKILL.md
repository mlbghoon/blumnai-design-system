---
name: visual-test
description: Run Playwright visual regression tests. Use when user says "visual test", "run visual tests", "check screenshots", or after making UI changes to verify no regressions.
---

# Visual Regression Testing

Run Playwright visual tests against Storybook components and report results.

## Prerequisites

- Storybook must be running on port 6006, OR Playwright will auto-start it
- Baseline screenshots must exist (run `npm run test:visual:update` first if not)

## Run Tests

```bash
npm run test:visual
```

## Parse Output

Look for these patterns in the output:

### ✓ ALL PASSED
```
X passed (Xs)
```
No failures mentioned = all tests passed.

### ✗ FAILURES DETECTED
```
X failed
```
Or individual test failures like:
```
✘  [chromium] › e2e/example.spec.ts:4:3 › Test Name
```

## Pass/Fail Criteria

| Output Pattern | Result |
|----------------|--------|
| `X passed` with no `failed` | ✓ PASS |
| `X failed` in output | ✗ FAIL |
| `Error:` or `TimeoutError:` | ✗ FAIL |
| Screenshot mismatch | ✗ FAIL |

## On Failure

1. **Identify which tests failed** from the output
2. **Run the HTML report** to see visual diffs:
   ```bash
   npx playwright show-report
   ```
3. **Fix the issue** in the component code
4. **Re-run tests** until all pass
5. **If change was intentional**, update baselines:
   ```bash
   npm run test:visual:update
   ```

## Loop Until Pass

Keep running tests and fixing issues until output shows:
```
X passed (Xs)
```
with NO failures.

## Report Format

After running, report to user:

```
## Visual Test Results

✓ PASSED (X tests)
- test name 1
- test name 2

OR

✗ FAILED (X of Y tests)

Failed tests:
- test name: [reason]

Next steps:
1. Run `npx playwright show-report` to see diffs
2. Fix the visual issues
3. Re-run `/visual-test`
```

## Available Commands

| Command | Purpose |
|---------|---------|
| `npm run test:visual` | Run tests against baselines |
| `npm run test:visual:update` | Update baselines (after intentional changes) |
| `npm run test:visual:ui` | Interactive UI mode |
| `npx playwright show-report` | View HTML report with diffs |

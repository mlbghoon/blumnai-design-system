---
name: component-checklist
description: Verification checklist before completing a component. Auto-invoke when implementation appears complete, before telling user the work is done. Also invoke when user asks "check", "verify", "done?".
---

# Component Verification Checklist

Verify these items before considering implementation complete.

## When to Auto-Invoke

- After completing component implementation
- Before reporting "done" or "complete" to user
- When user asks to verify or check the component

## Code Quality (MUST RUN)

Run this command and fix any errors before proceeding:
```bash
npm run typecheck && npm run lint
```

- [ ] No TypeScript errors
- [ ] No ESLint errors (including React hooks rules)
- [ ] CLAUDE.md rules followed
  - [ ] Typography: using `size-*`, `line-height-leading-*`, `letter-spacing-tracking-*`
  - [ ] Spacing: using `padding-*`, `width-*`, `height-*`, `gap-*`
  - [ ] Colors: using `text-*`, `bg-*`, `border-*` semantic classes
  - [ ] No Tailwind defaults (`text-sm`, `p-4`, `w-16`, etc.)
  - [ ] No arbitrary values (`w-[14px]`, `bg-[#fff]`, etc.)
- [ ] No unnecessary comments
- [ ] No English comments (except JSDoc)

## Figma Spec Match

- [ ] Size (width, height)
- [ ] Padding
- [ ] Gap/spacing
- [ ] Colors (background, text, border)
- [ ] Border radius
- [ ] Typography (size, weight, line-height)

## States

- [ ] Default state
- [ ] Hover state
- [ ] Active/Pressed state
- [ ] Focus state (focus-visible styling)
- [ ] Disabled state
- [ ] Loading state (if applicable)
- [ ] Error state (if applicable)

## Keyboard Accessibility

- [ ] Tab navigation works
- [ ] Enter/Space activates
- [ ] Escape closes (for modals/popovers)
- [ ] Arrow key navigation (if applicable)
- [ ] Focus trap (for modals/dialogs)

## Accessibility (a11y)

- [ ] Appropriate aria-label
- [ ] aria-describedby (if needed)
- [ ] role attribute (if needed)

## Storybook

- [ ] Story file exists
- [ ] Default story has controls enabled
- [ ] Other stories have controls disabled
- [ ] argTypes have Korean descriptions
- [ ] Stories exist for major states

---

## Report to User

After checking, report in this format:

```
## Verification Results

✓ Completed:
- No TypeScript errors
- Figma specs match
- Keyboard accessibility verified

⚠ Needs User Testing:
- Visual verification (screenshot comparison)
- Actual keyboard navigation test
- Dark mode check

✗ Incomplete:
- (list if any)
```

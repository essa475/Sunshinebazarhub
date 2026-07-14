---
name: Clerk + Tailwind v4 setup
description: Required config to make Clerk's default components render with correct branding under Tailwind v4
---

When wiring Replit-managed Clerk into a Tailwind v4 (Vite) app:
- `vite.config.ts` needs `tailwindcss({ optimize: false })` in the Tailwind plugin call.
- `index.css` needs `@layer theme, base, clerk, components, utilities;` declared before `@import "tailwindcss";` so Clerk's own `clerk` layer sorts correctly against the app's utility classes.

**Why:** Without both, Clerk's SignIn/SignUp components either render unstyled or fight with app Tailwind utilities (wrong stacking/overrides), even though the `appearance` prop and custom `elements` classes look correct in code.

**How to apply:** Apply both changes together whenever adding Clerk to a Tailwind v4 project; skipping either one causes subtle, hard-to-diagnose style bugs rather than a hard error.

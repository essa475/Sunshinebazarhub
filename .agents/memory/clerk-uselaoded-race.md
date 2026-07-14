---
name: Clerk useUser() isLoaded race on fresh page loads
description: Why "signed in but app acts like signed out" bugs happen with Clerk's useUser() and how to avoid them.
---

Any client-side check that branches on `isSignedIn` from `@clerk/react`'s `useUser()` must also check `isLoaded` first. On a fresh mount (e.g. navigating straight to `/cart` or refreshing), Clerk hasn't resolved the session yet, so `isSignedIn` is `undefined` for a brief window — code that does `if (!isSignedIn) redirectToSignIn()` fires a false redirect even for an already-authenticated user, and the corresponding backend request (if the check is skipped) 401s.

**Why:** Traced a real bug report ("Place Order button doesn't work") to exactly this: `Cart.tsx` read `isSignedIn` without `isLoaded`, so a bare page load + immediate click sent an authenticated-looking action before Clerk resolved, producing spurious sign-in redirects / 401s that looked like broken checkout.

**How to apply:** Wherever a component guards an action on auth state (submit handlers, redirects, protected buttons), destructure both `{ isSignedIn, isLoaded }` and no-op (or show a loading state) until `isLoaded` is true, only redirect/branch once loaded. Same applies to any `Show when="signed-in"`-style gating around an *imperative* action (not just conditional rendering, which Clerk's `<Show>` already handles internally).

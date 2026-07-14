---
name: Generated API hook options typing
description: TS friction when passing extra react-query options to orval-generated useList*/useGet* hooks
---

Orval-generated hooks (`@workspace/api-client-react`, generated from openapi.yaml via orval) type their `options.query` parameter as a full `UseQueryOptions<...>` that requires `queryKey`, even though the hook itself supplies the queryKey internally. Passing a partial object like `{ enabled: someBool }` or `{ placeholderData: (prev) => prev }` fails type-checking with "Property 'queryKey' is missing".

**Why:** The generated type doesn't use `Partial<UseQueryOptions<...>>` for the pass-through options — it's the full interface, which is a codegen limitation, not a real runtime requirement (the queryKey the hook builds internally is what's actually used).

**How to apply:** Cast the options object as `as any` when passing `enabled`, `placeholderData`, or similar react-query passthrough options to these generated hooks, e.g. `{ query: { enabled: !!isSignedIn } as any }`. This is safe because the hook overrides/merges queryKey itself; don't spend time trying to satisfy the strict generic.

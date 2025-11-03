---
layout: default
---

# useSyncExternalStore API

<div class="flex gap-5 mt-5">

<div class="flex flex-col gap-2">

<div>

## Parameters

- **subscribe**: `(callback: () => void) => () => void`
  - Subscribe to store changes
  - Returns unsubscribe function

</div>

<div>

- **getSnapshot**: `() => T`
  - Returns current snapshot value
  - Must be stable (same input = same output)

</div>

<div>

- **getServerSnapshot**: `() => T` (optional)
  - Server-side initial value
  - Prevents hydration mismatches

</div>

</div>

<div>

## The Signature

```typescript
const snapshot = useSyncExternalStore(
  subscribe,      // Function to subscribe to the store
  getSnapshot,    // Function to get current value
  getServerSnapshot? // Optional: for SSR
)
```

<div v-click class="mt-6 text-xl font-bold text-green-400">

Returns: Current snapshot value

</div>

</div>

</div>


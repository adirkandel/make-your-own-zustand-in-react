---
layout: default
---

# useSyncExternalStore API

<div class="text-left mt-4">

## The Signature

```typescript
const snapshot = useSyncExternalStore(
  subscribe,      // Function to subscribe to the store
  getSnapshot,    // Function to get current value
  getServerSnapshot? // Optional: for SSR
)
```

<div v-click class="mt-6">

## Parameters

- **subscribe**: `(callback: () => void) => () => void`
  - Subscribe to store changes
  - Returns unsubscribe function

</div>

<div v-click class="mt-4">

- **getSnapshot**: `() => T`
  - Returns current snapshot value
  - Must be stable (same input = same output)

</div>

<div v-click class="mt-4">

- **getServerSnapshot**: `() => T` (optional)
  - Server-side initial value
  - Prevents hydration mismatches

</div>

<div v-click class="mt-8 text-xl font-bold text-green-400">

Returns: Current snapshot value

</div>

</div>


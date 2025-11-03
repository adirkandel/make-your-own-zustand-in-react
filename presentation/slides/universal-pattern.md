---
layout: default
---

# The Universal Store Pattern

<div class="mt-6 flex gap-5">

<div v-click>

## What We Learned

The **store pattern** is universal and works everywhere:

<div class="mt-6">

```typescript
// Create store with getState, setState, subscribe
const store = createStore(initialState);

// Connect to React
const useStore = (selector) => {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState())
  );
};
```

</div>

</div>

<div>

<div v-click>

## This Pattern Powers

- Zustand
- Redux (with hooks)
- Any external state source
- Browser APIs (navigator.onLine, etc.)

</div>

<div v-click class="mt-8 text-xl font-bold">

The store pattern is universal - React integration is what changed!

</div>

</div>

</div>


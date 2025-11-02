---
layout: default
---

# The Universal Store Pattern

<div class="text-left mt-8">

## What We Learned

<div v-click>

The **store pattern** is universal and works everywhere:

</div>

<div v-click class="mt-6">

```typescript
// 1. Create store with getState, setState, subscribe
const store = createStore(initialState);

// 2. Connect to React
const useStore = (selector) => {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState())
  );
};

// 3. Done! ✅
```

</div>

<div v-click class="mt-8">

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


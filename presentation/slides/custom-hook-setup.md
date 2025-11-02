---
layout: default
---

# The Custom Hook - Initial Setup

<div class="text-left mt-4">

## Getting the Store from Context

```typescript {108-118:src/lib/context-store.tsx}
export function useStore<T>(
  selector: (state: Pick<TodoStore, "todos" | "filter">) => T,
  equalityFn?: (a: T, b: T) => boolean
): T {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("useStore must be used within a TodoProvider");
  }

  const [state, setState] = useState(() => selector(store.getState()));
```

<div v-click class="mt-6">

## What We Have So Far

1. Get store from Context
2. Select initial value using selector
3. Store in local `useState`

</div>

<div v-click class="mt-6">

## But... How do we update when store changes?

We need to **subscribe** to store updates!

</div>

</div>


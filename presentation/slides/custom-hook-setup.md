---
layout: default-new
---

# The Custom Hook - Initial Setup

<div class="mt-4 flex gap-5">

<div>

## Getting the Store from Context

<div class="mt-4">

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

</div>

</div>

<div>

<div v-click>

## What We Have So Far

1. Get store from Context
2. Select initial value using selector
3. Store in local `useState`

</div>

</div>

</div>

<div v-click class="mt-16">

# But... How do we update when store changes?

</div>


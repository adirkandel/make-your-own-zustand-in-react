---
layout: default
---

# Building the Store

<div class="mt-4 flex gap-5">

<div>

```typescript {67-95:src/lib/utils.ts}
export const createStore = <T>(initialState: T) => {
  let state = initialState;
  const listeners = new Set<() => void>();

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getState = () => state;

  const setState = (partial: ((state: T) => Partial<T>)) => {
    const nextPartial = partial(state);

    // Only update if there are changes
    if (!Object.keys(nextPartial).length) return;

    state = { ...state, ...nextPartial };

    listeners.forEach(listener => listener());
  };

  return { getState, setState, subscribe };
};
```

</div>

<div v-click>

## Three Key Functions

- `getState()` - Read current state
- `setState()` - Update state & notify listeners
- `subscribe()` - Register listener, returns unsubscribe

</div>

</div>


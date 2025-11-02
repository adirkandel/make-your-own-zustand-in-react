---
layout: default
---

# Building the Store

<div class="text-left mt-4">

## The Store Pattern

```typescript {67-95:src/lib/utils.ts}
export const createStore = <T extends Record<string, any>>(initialState: T) => {
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

  return {
    getState,
    setState,
    subscribe,
  };
};
```

<div v-click class="mt-6">

## Three Key Functions

- `getState()` - Read current state
- `setState()` - Update state & notify listeners
- `subscribe()` - Register listener, returns unsubscribe

</div>

</div>


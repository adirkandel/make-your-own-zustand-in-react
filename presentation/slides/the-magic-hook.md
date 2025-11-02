---
layout: two-cols
---

# The Magic Hook

## Context Approach

```typescript {108-142:src/lib/context-store.tsx}
export function useStore<T>(
  selector: (state: Pick<TodoStore, "todos" | "filter">) => T,
  equalityFn?: (a: T, b: T) => boolean
): T {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within a TodoProvider");
  }
  const [state, setState] = useState(() => selector(store.getState()));
  const snapshotCache = useRef<T | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const nextSnapshot = selector(todoStore.getState());
      if (
        snapshotCache.current &&
        (equalityFn?.(nextSnapshot, snapshotCache.current) ||
          nextSnapshot === snapshotCache.current)
      ) {
        return;
      }
      snapshotCache.current = nextSnapshot;
      return setState(nextSnapshot);
    });
    return () => {
      unsubscribe();
    };
  }, [store, selector, equalityFn]);
  return state;
}
```

<div class="text-xl font-bold mt-4">
~35 lines
</div>

::right::

## useSyncExternalStore Approach

```typescript {115-131:src/lib/sync-store.ts}
export const useStore = <T>(
  selector: (state: Pick<TodoStore, "todos" | "filter">) => T,
  equalityFn?: (a: T, b: T) => boolean
): T => {
  const snapshotCache = useRef<T | undefined>(undefined);
  return useSyncExternalStore(todoStore.subscribe, () => {
    const nextSnapshot = selector(todoStore.getState());
    if (
      snapshotCache.current &&
      (equalityFn?.(nextSnapshot, snapshotCache.current) || 
        nextSnapshot === snapshotCache.current)
    ) {
      return snapshotCache.current;
    }
    snapshotCache.current = nextSnapshot;
    return nextSnapshot;
  });
};
```

<div class="text-xl font-bold mt-4">
~17 lines
</div>

<div v-click class="mt-8 text-2xl font-bold text-green-400">
All that complexity? Gone! 🎉
</div>


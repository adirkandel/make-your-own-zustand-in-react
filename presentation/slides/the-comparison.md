---
layout: section
class: text-center
---

# The Comparison

---
layout: two-cols
---

<div class="mb-1">

## Context ~35 lines

</div>

```typescript {all|5-8|9|11|12|24|all}
export function useStore<T>(
  selector: (state: object) => T,
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

::right::

<div class="mb-1">

## useSyncExternalStore ~17 lines

</div>

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
      (equalityFn?.(nextSnapshot, snapshotCache.current) || nextSnapshot === snapshotCache.current)
    ) {
      return snapshotCache.current;
    }
    snapshotCache.current = nextSnapshot;
    return nextSnapshot;
  });
};
```

<div v-click class="mt-8 text-2xl font-bold text-green-400">
All that complexity? Gone! 🎉
</div>

<style>
.slidev-code {
  --slidev-code-font-size: 10.5px;
  --slidev-code-line-height: 1.5;
}
</style>

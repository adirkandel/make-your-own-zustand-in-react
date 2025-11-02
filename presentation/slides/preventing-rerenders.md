---
layout: default
---

# Preventing Re-renders - The Key! 🔑

<div class="text-left mt-4">

## The Magic: Ref Comparison

```typescript {120-139:src/lib/context-store.tsx}
  const snapshotCache = useRef<T | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const nextSnapshot = selector(todoStore.getState());
      if (
        snapshotCache.current &&
        (equalityFn?.(nextSnapshot, snapshotCache.current) ||
          nextSnapshot === snapshotCache.current)
      ) {
        return; // Skip re-render if unchanged!
      }
      snapshotCache.current = nextSnapshot;
      return setState(nextSnapshot);
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector, equalityFn]);

  return state;
```

<div v-click class="mt-6">

## How It Works

1. `snapshotCache` ref tracks the **previous** selected value
2. When store notifies, we check if selected value **actually changed**
3. Only call `setState` if it changed → **Prevents unnecessary re-renders!**

</div>

<div v-click class="mt-8 text-xl font-bold text-green-400">

✅ This is how we overcome Context's re-render issue!

</div>

</div>


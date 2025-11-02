---
layout: default
---

# Code Complexity Comparison

<div class="text-left mt-4">

## Context Approach Hook

```typescript
// 35 lines including:
- Context access
- useState for local state
- useRef for snapshot cache
- useEffect for subscription
- Manual unsubscribe cleanup
- Manual comparison logic
- Error handling
```

<div v-click class="mt-6">

## useSyncExternalStore Approach Hook

```typescript
// 17 lines including:
- useRef for snapshot cache (still useful for custom equality)
- useSyncExternalStore call
- That's it!
```

</div>

<div v-click class="mt-8 text-xl font-bold">

Both use ref comparison, but React handles subscription & lifecycle!

</div>

</div>


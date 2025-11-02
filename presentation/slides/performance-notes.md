---
layout: default
---

# Performance Considerations

<div class="text-left mt-8">

<div v-click>

## Selective Rendering

Both approaches achieve the same goal - **selective re-renders** based on selected state.

</div>

<div v-click class="mt-6">

## Similar Performance

- Both use ref-based comparison
- Both skip re-renders when selected value unchanged
- Both have minimal overhead

</div>

<div v-click class="mt-6">

## Additional Benefits of useSyncExternalStore

- SSR support (no hydration mismatches)
- Concurrent rendering compatibility
- Tearing prevention
- Official React solution (future-proof)

</div>

<div v-click class="mt-8 text-xl font-bold text-green-400">

Same performance, less code, more robust! 🎉

</div>

</div>


---
layout: center
class: text-center
---

# Pattern Evolution

<div class="mt-8 text-left">

## Both Approaches Use the Same Store Pattern

<div v-click class="mt-4">

```typescript
const store = {
  getState: () => state,
  setState: (updater) => { /* update & notify */ },
  subscribe: (listener) => { /* subscribe & return unsubscribe */ }
};
```

</div>

<div v-click class="mt-8">

## The Evolution

<div class="text-xl mt-4">

**Context Approach**: Store + Context + Manual Hook Logic  
↓  
**useSyncExternalStore**: Store + Built-in React Hook

</div>

</div>

<div v-click class="mt-8 text-2xl font-bold">

The store pattern is universal - React integration evolved!

</div>

</div>


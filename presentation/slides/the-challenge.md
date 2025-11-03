---
layout: default-new
---

# The State Management Challenge

<div class="mt-5">

## What We Want

- Global state accessible anywhere
- **Selective subscriptions** - only re-render when your slice changes
- Simple API - no boilerplate

<div v-click class="mt-5">

## The Dream API

```tsx
const todos = useStore(state => state.todos);
const filter = useStore(state => state.filter);

// Only re-renders when todos change, not when filter changes!
```

</div>

</div>


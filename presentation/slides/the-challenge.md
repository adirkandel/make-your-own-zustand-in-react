---
layout: default
---

# The State Management Challenge

<div class="text-left mt-8">

## What We Want

- Global state accessible anywhere
- **Selective subscriptions** - only re-render when your slice changes
- Simple API - no boilerplate

<div v-click class="mt-8">

## The Dream API

```tsx
const todos = useStore(state => state.todos);
const filter = useStore(state => state.filter);

// Only re-renders when todos change, not when filter changes!
```

</div>

<div v-click class="mt-8">

## What We're Building

A Todo app demonstrating selective re-renders

</div>

</div>


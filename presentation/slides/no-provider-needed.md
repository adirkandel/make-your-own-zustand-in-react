---
layout: default
---

# No Provider Needed!

<div class="text-left mt-8">

## Context Approach

```tsx
// Needs Provider wrapper
<TodoProvider>
  <App />
</TodoProvider>

// Store lives in Context
const store = useContext(StoreContext);
```

<div v-click class="mt-6">

## useSyncExternalStore Approach

```tsx
// Just use it anywhere!
function App() {
  const todos = useTodos(); // Works anywhere!
  const filter = useFilter();
}

// Store lives outside React
const todoStore = createStore({ ... });
```

</div>

<div v-click class="mt-8 text-xl font-bold text-blue-400">

The store can be imported as a regular module - no React tree dependency!

</div>

</div>


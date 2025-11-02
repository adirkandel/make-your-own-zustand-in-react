---
layout: default
---

# Rebuilding the Store

<div class="text-left mt-4">

## Same Pattern!

```typescript {6-9:src/lib/sync-store.ts}
// Create our todo store
const todoStore = createStore<Pick<TodoStore, "todos" | "filter">>({
  todos: initialTodos,
  filter: "all",
});
```

<div v-click class="mt-6">

## Same `createStore` Function

We use the exact same `createStore` from `utils.ts`!

</div>

<div v-click class="mt-6">

## The Store Structure

- `getState()` - Read state
- `setState()` - Update state
- `subscribe()` - Subscribe to changes

</div>

<div v-click class="mt-8 text-xl font-bold">

The difference is in the **hook**, not the store!

</div>

</div>


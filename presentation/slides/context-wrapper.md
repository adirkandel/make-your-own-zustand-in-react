---
layout: default-new
---

# Wrapping with Context

<div class="text-left mt-4">

## Store Creation

```typescript {6-9:src/lib/context-store.tsx}
// Create the store
const todoStore = createStore<Pick<TodoStore, "todos" | "filter">>({
  todos: initialTodos,
  filter: "all",
});
```

<div v-click class="mt-6">

## Expose via Context

```typescript {102-106:src/lib/context-store.tsx}
const StoreContext = createContext<typeof todoStore | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  return <StoreContext.Provider value={todoStore}>{children}</StoreContext.Provider>;
}
```

</div>

<div v-click class="mt-6">

## Key Point 💡

Context is just the **pipe** to get the store - the store lives outside React!

</div>

</div>


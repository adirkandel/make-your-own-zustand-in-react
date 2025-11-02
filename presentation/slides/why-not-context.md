---
layout: default
---

# Why Not Just Context?

<div class="text-left mt-8">

## The Naive Approach

```tsx
const TodoContext = createContext();

const useStore = () => useContext(TodoContext);
```

<div v-click class="mt-6">

## The Problem ❌

Changing **ANY** state → Re-renders **ALL** consumers

</div>

<div v-click class="mt-6">

```tsx
// Component A
const todos = useStore(); // Gets all state

// Component B  
const filter = useStore(); // Gets all state

// When filter changes → Both components re-render! 😱
```

</div>

<div v-click class="mt-6">

## Key Insight 💡

Context alone doesn't give us selective subscriptions - we need manual comparison logic!

</div>

</div>


---
layout: two-cols
---

# Why Not Just Context?

<div class="mt-5">

## The Naive Approach

```tsx
const TodoContext = createContext();

const useStore = () => useContext(TodoContext);
```

<div v-click class="mt-6">

## The Problem ❌

Changing **ANY** state → Re-renders **ALL** consumers

<div v-click class="mt-6">

```tsx
// Component A
const todos = useStore(); // Gets all state

// Component B  
const filter = useStore(); // Gets all state

// When filter changes → Both components re-render! 😱
```

</div>

</div>

</div>

::right::

<div v-click class="mt-18">

## Key Insight 💡

<p class="!my-1">
Context alone doesn't give us selective subscriptions - we need manual comparison logic!
</p>
</div>


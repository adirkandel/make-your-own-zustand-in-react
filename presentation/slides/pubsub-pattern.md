---
layout: section
---

# Solution 1: Context Approach

---
layout: two-cols
---

# The Pub/Sub Pattern

<div class="mt-5">

## Core Concept

**Publisher** → Notifies → **Subscribers**


```typescript
// Store has a set of listeners
const listeners = new Set<() => void>();

// When state changes, notify all listeners
const notify = () => {
  listeners.forEach(listener => listener());
};

// Components subscribe to get notified
const unsubscribe = store.subscribe(() => {
  // Re-render when state changes
});
```

</div>

::right::

<div v-click class="mt-5">

## Key Insight 💡

We can build a store **outside React**, then connect it via Context

</div>


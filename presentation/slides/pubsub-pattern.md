---
layout: section
---

# Solution 1: Context Approach

---

# The Pub/Sub Pattern

<div class="text-left mt-8">

## Core Concept

<div v-click>

**Publisher** → Notifies → **Subscribers**

</div>

<div v-click class="mt-6">

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

<div v-click class="mt-8">

## Key Insight

We can build a store **outside React**, then connect it via Context

</div>

</div>


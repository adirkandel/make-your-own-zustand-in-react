---
layout: default
---

# What useSyncExternalStore Handles

<div class="text-left mt-8">

<div v-click>

## Automatic Features

- ✅ Subscription management (subscribe/unsubscribe)
- ✅ Value comparison (React optimizes this)
- ✅ SSR safety (getSnapshot for server rendering)
- ✅ Concurrent rendering support
- ✅ Tearing prevention

</div>

<div v-click class="mt-6">

## What is "Tearing"?

When different parts of UI show different values from the same store during render.

</div>

<div v-click class="mt-6">

## How React Prevents It

`useSyncExternalStore` ensures all components read the same snapshot during a render cycle.

</div>

<div v-click class="mt-8 text-xl font-bold text-green-400">

This is why React added this hook - to solve these edge cases!

</div>

</div>


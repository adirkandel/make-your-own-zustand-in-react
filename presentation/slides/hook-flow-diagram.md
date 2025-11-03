---
layout: default
---

# How It Works - The Flow

<div class="flex gap-5">

<div class="mt-4">

<div v-click>

1. Component calls `useStore(selector)`

</div>

<div v-click class="mt-4">

2. Gets store from Context

</div>

<div v-click class="mt-4">

3. Gets initial value: `selector(store.getState())`

</div>

<div v-click class="mt-4">

4. Stores in local `useState`

</div>

<div v-click class="mt-4">

5. Subscribes to store changes in `useEffect`

</div>

<div v-click class="mt-4">

6. When store changes → Select new value → Compare with cached value

</div>

<div v-click class="mt-4">

7. If changed → Update state → Trigger re-render ✅

</div>

<div v-click class="mt-4">

8. If unchanged → Skip update → No re-render ✅

</div>

</div>

<div v-click class="mt-4">

## Complexity

~35 lines of hook code

<div class="mt-4">

## Key Point 💡

Context **CAN** work, but requires manual optimization!

</div>

</div>

</div>
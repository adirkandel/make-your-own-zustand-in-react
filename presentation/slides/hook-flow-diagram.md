---
layout: center
class: text-center
---

# How It Works - The Flow

<div class="mt-8 text-left">

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


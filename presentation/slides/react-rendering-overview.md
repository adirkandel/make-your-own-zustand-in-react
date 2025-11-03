---
layout: default-new
---

# React Rendering Behavior

<div class="mt-5">

## When do components get re-rendered?

<div v-click class="mt-4">

- Props change
- State changes (`useState`, `useReducer`)
- Context value changes → **ALL** consumers re-render
- Parent component re-renders (unless memoized)

</div>

<div v-click class="mt-5">

## What We Need

Re-render **ONLY** when the selected slice of state changes

</div>

<div v-click class="mt-5">

## The Challenge

How do we selectively subscribe to state changes?

</div>

</div>


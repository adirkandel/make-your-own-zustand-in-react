---
layout: default
---

# React Rendering Behavior

<div class="text-left mt-8">

## When Components Re-render

<div v-click>

- Props change
- State changes (`useState`, `useReducer`)
- Context value changes → **ALL** consumers re-render
- Parent component re-renders (unless memoized)

</div>

<div v-click class="mt-8">

## What We Need

Re-render **ONLY** when the selected slice of state changes

</div>

<div v-click class="mt-8">

## The Challenge

How do we selectively subscribe to state changes?

</div>

</div>


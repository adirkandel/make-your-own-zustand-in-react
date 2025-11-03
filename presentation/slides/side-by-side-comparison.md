---
layout: default
---

# Side-by-Side Comparison

<div class="text-left mt-4">

| Feature | Context Approach | useSyncExternalStore |
|---------|-----------------|---------------------|
| **Selective re-renders** | ✅ Manual ref comparison | ✅ Built-in optimization |
| **Hook complexity** | ~35 lines | ~17 lines |
| **Provider required** | 👎 Yes | 👍 No |
| **React features** | useState, useEffect, useRef | useSyncExternalStore |
| **SSR safe** | ⚠️ Manual handling needed | ✅ Built-in |
| **Concurrent safe** | ⚠️ Potentially issues | ✅ Built-in |
| **Tearing prevention** | ⚠️ Manual | ✅ Built-in |

</div>


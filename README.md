# Build Your Own Zustand

This project is a demo for a talk on building your own state management solution inspired by Zustand.

## Overview

The demo showcases different implementations of state management in React:

1. **Context + Refs + useEffect**: A naive implementation using React Context with refs and useEffect for subscriptions
2. **Basic useSyncExternalStore**: A simple implementation using React's useSyncExternalStore hook
3. **Shallow Comparison**: Enhanced implementation with shallow equality checks
4. **Deep Comparison**: Advanced implementation with deep equality checks for nested data

## Running the Demo

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

- `src/lib/`: Contains the different state management implementations
  - `context-store.tsx`: Context + refs + useEffect implementation
  - `basic-sync-store.ts`: Basic useSyncExternalStore implementation
  - `shallow-compare-store.ts`: useSyncExternalStore with shallow comparison
  - `deep-compare-store.ts`: useSyncExternalStore with deep comparison
- `src/pages/`: Contains the demo pages for each implementation
- `src/components/`: Shared UI components
- `src/App.tsx`: Main application with navigation

## Key Concepts Demonstrated

1. **Subscribe/Notify Pattern**: How to implement a pub/sub system for state updates
2. **useSyncExternalStore**: How to use React's built-in hook for external stores
3. **Selectors**: How to select specific parts of state to prevent unnecessary re-renders
4. **Shallow/Deep Comparison**: How to optimize re-renders with equality checks

## About the Talk

This demo is part of a talk titled "Build Your Own Zustand" presented at React IL community meetup by Adir Kandel, Frontend lead @ Tenable.
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shallowEqual = (objA: any, objB: any): boolean => {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(objB, key) || objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};

export const deepEqual = (objA: any, objB: any): boolean => {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    if (typeof objA[key] === "object" && objA[key] !== null) {
      if (!deepEqual(objA[key], objB[key])) {
        return false;
      }
    } else if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};

export const createStore = <T extends Record<string, any>>(initialState: T) => {
  let state = initialState;

  const listeners = new Set<() => void>();

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getState = () => state;

  const setState = (partial: ((state: T) => Partial<T>)) => {
    const nextPartial = partial(state);

    // Only update if there are changes
    if (!Object.keys(nextPartial).length) return;

    state = { ...state, ...nextPartial };

    listeners.forEach(listener => listener());
  };

  return {
    getState,
    setState,
    subscribe,
  };
};

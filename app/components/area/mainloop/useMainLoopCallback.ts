import { useCallback, useEffect } from "react";
import { useMainLoopContext } from ".";

export function useMainLoopCallback(
  callback: () => void,
  deps: readonly unknown[]
): void {
  const { registerMainLoopCallback, unregisterMainLoopCallback } =
    useMainLoopContext();

  const memoedCallback = useCallback(callback, deps);
  useEffect(() => {
    registerMainLoopCallback(memoedCallback);
    return () => {
      unregisterMainLoopCallback(memoedCallback);
    };
  }, [memoedCallback]);
}

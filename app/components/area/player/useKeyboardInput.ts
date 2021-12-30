import { useEffect, useRef } from "react";
import { useMainLoopCallback } from "../mainloop/useMainLoopCallback";

export type KeyType = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

type UseKeyboardInputInput = {
  onKeyInput: (key: KeyType) => void;
};

export function useKeyboardInput({ onKeyInput }: UseKeyboardInputInput) {
  const keyStack = useRef<KeyType[]>([]);
  useMainLoopCallback(() => {
    if (keyStack.current.length > 0) {
      onKeyInput(keyStack.current[keyStack.current.length - 1]);
    }
  }, [onKeyInput]);

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };

    function keydownHandler(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          if (
            keyStack.current.length === 0 ||
            keyStack.current[keyStack.current.length - 1] !== event.key
          ) {
            keyStack.current.push(event.key);
          }
          break;
        default:
          break;
      }
    }
    function keyupHandler(event: KeyboardEvent) {
      keyStack.current = keyStack.current.filter((key) => key !== event.key);
    }
  }, [onKeyInput]);
}

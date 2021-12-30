import { useEffect, useRef } from "react";
import { useMainLoopCallback } from "../mainloop/useMainLoopCallback";

export type KeyType = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

type InstantKeyState = {
  /**
   * 0 means not used.
   * 1 means pressed within last frame.
   * 2 means released within the same frame.
   */
  state: 0 | 1 | 2;
  keyType: KeyType;
};

type UseKeyboardInputInput = {
  onKeyInput: (key: KeyType) => void;
};

export function useKeyboardInput({ onKeyInput }: UseKeyboardInputInput) {
  /**
   * Stack of keys that are currently pressed.
   * (last one is effective)
   */
  const keyStack = useRef<KeyType[]>([]);
  const instantKey = useRef<InstantKeyState>({ state: 0, keyType: "ArrowUp" });

  useMainLoopCallback(() => {
    if (instantKey.current.state === 2) {
      onKeyInput(instantKey.current.keyType);
    } else if (keyStack.current.length > 0) {
      onKeyInput(keyStack.current[keyStack.current.length - 1]);
    }
    instantKey.current.state = 0;
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
          instantKey.current.state = 1;
          instantKey.current.keyType = event.key;
          break;
        default:
          break;
      }
    }
    function keyupHandler(event: KeyboardEvent) {
      keyStack.current = keyStack.current.filter((key) => key !== event.key);
      if (
        instantKey.current.state === 1 &&
        instantKey.current.keyType === event.key
      ) {
        instantKey.current.state = 2;
      }
    }
  }, [onKeyInput]);
}

import { useEffect, useRef } from "react";
import { useInputContext } from "~/components/control/InputContext";
import { useMainLoopCallback } from "../mainloop/useMainLoopCallback";
import { KeyType, InputEvent } from "~/components/control/InputContext";

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

export function useRunInput({ onKeyInput }: UseKeyboardInputInput) {
  /**
   * Stack of keys that are currently pressed.
   * (last one is effective)
   */
  const keyStack = useRef<KeyType[]>([]);
  const instantKey = useRef<InstantKeyState>({ state: 0, keyType: "ArrowUp" });
  const { inputDownEvent, inputUpEvent } = useInputContext();

  useMainLoopCallback(() => {
    if (instantKey.current.state === 2) {
      onKeyInput(instantKey.current.keyType);
    } else if (keyStack.current.length > 0) {
      onKeyInput(keyStack.current[keyStack.current.length - 1]);
    }
    instantKey.current.state = 0;
  }, [onKeyInput]);

  useEffect(() => {
    inputDownEvent.on(keydownHandler);
    inputUpEvent.on(keyupHandler);
    return () => {
      inputDownEvent.off(keydownHandler);
      inputUpEvent.off(keyupHandler);
    };

    function keydownHandler({ key }: InputEvent) {
      if (
        keyStack.current.length === 0 ||
        keyStack.current[keyStack.current.length - 1] !== key
      ) {
        keyStack.current.push(key);
      }
      instantKey.current.state = 1;
      instantKey.current.keyType = key;
    }
    function keyupHandler({ key }: InputEvent) {
      keyStack.current = keyStack.current.filter((k) => k !== key);
      if (
        instantKey.current.state === 1 &&
        instantKey.current.keyType === key
      ) {
        instantKey.current.state = 2;
      }
    }
  }, [onKeyInput]);
}

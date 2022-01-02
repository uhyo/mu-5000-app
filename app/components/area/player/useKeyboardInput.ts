import { useEffect } from "react";
import { useInputContext } from "~/components/control/InputContext";

export function useKeyboardInput() {
  const { inputUp, inputDown } = useInputContext();

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
          inputDown(event.key);
          break;
        default:
          break;
      }
    }
    function keyupHandler(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          inputUp(event.key);
          break;
        default:
          break;
      }
    }
  }, [inputUp, inputDown]);
}

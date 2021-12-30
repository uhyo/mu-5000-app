import { useCallback, useState } from "react";
import { mapSize } from "~/logic/area/params";
import { KeyType, useKeyboardInput } from "./useKeyboardInput";

export type PlayerInfo = {
  x: number;
  y: number;
};

export function usePlayer(): PlayerInfo {
  const [playerX, setPlayerX] = useState(Math.floor(mapSize / 2));
  const [playerY, setPlayerY] = useState(Math.floor(mapSize / 2));

  const keyInputHandler = useCallback((keyType: KeyType) => {
    switch (keyType) {
      case "ArrowUp":
        setPlayerY((y) => y - 1);
        break;
      case "ArrowDown":
        setPlayerY((y) => y + 1);
        break;
      case "ArrowLeft":
        setPlayerX((x) => x - 1);
        break;
      case "ArrowRight":
        setPlayerX((x) => x + 1);
        break;
    }
  }, []);

  useKeyboardInput({ onKeyInput: keyInputHandler });

  return {
    x: playerX,
    y: playerY,
  };
}

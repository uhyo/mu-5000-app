import { useCallback, useState } from "react";
import { Area } from "~/logic/area";
import { isWall } from "~/logic/area/landDef";
import { mapSize } from "~/logic/area/params";
import { KeyType, useKeyboardInput } from "./useKeyboardInput";

export type PlayerInfo = {
  x: number;
  y: number;
};

type UsePlayerInput = {
  area: Area;
};

export function usePlayer({ area }: UsePlayerInput): PlayerInfo {
  const [playerPosition, setPlayerPosition] = useState<PlayerInfo>(() => ({
    x: Math.floor(mapSize / 2),
    y: Math.floor(mapSize / 2),
  }));

  const keyInputHandler = useCallback(
    (keyType: KeyType) => {
      switch (keyType) {
        case "ArrowUp":
          setPlayerPosition(({ x, y }) => ({
            x,
            y: maybeMove(y, y - 1, getLand(area, x, y - 1)),
          }));
          break;
        case "ArrowDown":
          setPlayerPosition(({ x, y }) => ({
            x,
            y: maybeMove(y, y + 1, getLand(area, x, y + 1)),
          }));
          break;
        case "ArrowLeft":
          setPlayerPosition(({ x, y }) => ({
            x: maybeMove(x, x - 1, getLand(area, x - 1, y)),
            y,
          }));
          break;
        case "ArrowRight":
          setPlayerPosition(({ x, y }) => ({
            x: maybeMove(x, x + 1, getLand(area, x + 1, y)),
            y,
          }));
          break;
      }
    },
    [area]
  );

  useKeyboardInput({ onKeyInput: keyInputHandler });

  return playerPosition;
}

function getLand(area: Area, x: number, y: number): number {
  return area.map[y]?.[x] ?? 0;
}

function maybeMove(originalAt: number, newAt: number, newLand: number): number {
  if (newAt < 0 || newAt >= mapSize) {
    return originalAt;
  }
  if (isWall(newLand)) {
    return originalAt;
  }
  return newAt;
}

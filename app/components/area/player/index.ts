import { useCallback, useState } from "react";
import { Area, AreaMap, AreaMinusMap } from "~/logic/area";
import { isWall } from "~/logic/area/landDef";
import { mapSize } from "~/logic/area/params";
import { useAreaTransition } from "../transition/useAreaTransition";
import { UseKeyboardInput } from "./useKeyboardInput";
import { KeyType, useRunInput } from "./useRunInput";

export type PlayerInfo = {
  x: number;
  y: number;
};

type UsePlayerInput = {
  map: AreaMap;
  areaIsLoading: boolean;
};
type UsePlayerOutput = {
  player: PlayerInfo;
  setPlayerPosition: (position: { x: number; y: number }) => void;
};

export function usePlayer({
  map,
  areaIsLoading,
}: UsePlayerInput): UsePlayerOutput {
  const [playerPosition, setPlayerPosition] = useState<PlayerInfo>(() => ({
    x: Math.floor(mapSize / 2),
    y: Math.floor(mapSize / 2),
  }));

  const keyInputHandler = useCallback(
    (keyType: KeyType) => {
      if (areaIsLoading) {
        return;
      }
      switch (keyType) {
        case "ArrowUp":
          setPlayerPosition(({ x, y }) => ({
            x,
            y: maybeMove(y, y - 1, getLand(map, x, y - 1)),
          }));
          break;
        case "ArrowDown":
          setPlayerPosition(({ x, y }) => ({
            x,
            y: maybeMove(y, y + 1, getLand(map, x, y + 1)),
          }));
          break;
        case "ArrowLeft":
          setPlayerPosition(({ x, y }) => ({
            x: maybeMove(x, x - 1, getLand(map, x - 1, y)),
            y,
          }));
          break;
        case "ArrowRight":
          setPlayerPosition(({ x, y }) => ({
            x: maybeMove(x, x + 1, getLand(map, x + 1, y)),
            y,
          }));
          break;
      }
    },
    [map, areaIsLoading]
  );

  useRunInput({ onKeyInput: keyInputHandler });

  return {
    player: playerPosition,
    setPlayerPosition,
  };
}

function getLand(map: AreaMap, x: number, y: number): number {
  return map[y]?.[x] ?? 0;
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

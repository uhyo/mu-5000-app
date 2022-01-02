import { useCallback, useMemo, useState } from "react";
import { Area, AreaMap, AreaMinusMap } from "~/logic/area";
import { isWall } from "~/logic/area/landDef";
import { mapSize } from "~/logic/area/params";
import { useRunInput } from "./useRunInput";
import { KeyType } from "~/components/control/InputContext";

export type PlayerInfo = {
  x: number;
  y: number;
};

type UsePlayerInput = {
  area: AreaMinusMap;
  map: AreaMap;
  areaIsLoading: boolean;
};
type UsePlayerOutput = {
  player: PlayerInfo;
  setPlayerPosition: (position: { x: number; y: number }) => void;
  areaPrefetch: readonly Direction[];
};

export type Direction = "north" | "east" | "south" | "west";

type PrefetchState = {
  currentAreaId: string;
  prefetchDirections: readonly Direction[];
};

const mapCenter = Math.floor(mapSize / 2);

export function usePlayer({
  area,
  map,
  areaIsLoading,
}: UsePlayerInput): UsePlayerOutput {
  const [playerAndPrefetch, setPlayerAndPrefetch] = useState<
    PlayerInfo & PrefetchState
  >(() => ({
    x: Math.floor(mapSize / 2),
    y: Math.floor(mapSize / 2),
    currentAreaId: area.id,
    prefetchDirections: [],
  }));

  const setPlayerPosition = useCallback(
    (position: { x: number; y: number }) => {
      setPlayerAndPrefetch((prev) => ({
        ...prev,
        x: position.x,
        y: position.y,
      }));
    },
    [setPlayerAndPrefetch]
  );

  const movePlayer = useCallback(
    (keyType: KeyType, move: (prev: PlayerInfo) => PlayerInfo) => {
      setPlayerAndPrefetch((prev) => {
        const { x, y } = move(prev);
        const prefetchBase =
          prev.currentAreaId === area.id ? prev.prefetchDirections : [];
        let prefetchAreaIds: readonly Direction[];
        if (x < mapCenter - 2 && keyType === "ArrowLeft") {
          // prefetch left area
          prefetchAreaIds = [...prefetchBase, "west"];
        } else if (x > mapCenter + 2 && keyType === "ArrowRight") {
          // prefetch right area
          prefetchAreaIds = [...prefetchBase, "east"];
        } else if (y < mapCenter - 2 && keyType === "ArrowUp") {
          // prefetch up area
          prefetchAreaIds = [...prefetchBase, "north"];
        } else if (y > mapCenter + 2 && keyType === "ArrowDown") {
          // prefetch down area
          prefetchAreaIds = [...prefetchBase, "south"];
        } else {
          prefetchAreaIds = prefetchBase;
        }
        return {
          x,
          y,
          currentAreaId: area.id,
          prefetchDirections: prefetchAreaIds,
        };
      });
    },
    [area]
  );

  const keyInputHandler = useCallback(
    (keyType: KeyType) => {
      if (areaIsLoading) {
        return;
      }
      switch (keyType) {
        case "ArrowUp":
          movePlayer(keyType, ({ x, y }) => ({
            x,
            y: maybeMove(y, y - 1, getLand(map, x, y - 1)),
          }));
          break;
        case "ArrowDown":
          movePlayer(keyType, ({ x, y }) => ({
            x,
            y: maybeMove(y, y + 1, getLand(map, x, y + 1)),
          }));
          break;
        case "ArrowLeft":
          movePlayer(keyType, ({ x, y }) => ({
            x: maybeMove(x, x - 1, getLand(map, x - 1, y)),
            y,
          }));
          break;
        case "ArrowRight":
          movePlayer(keyType, ({ x, y }) => ({
            x: maybeMove(x, x + 1, getLand(map, x + 1, y)),
            y,
          }));
          break;
      }
    },
    [map, areaIsLoading, movePlayer]
  );

  useRunInput({ onKeyInput: keyInputHandler });

  const player = useMemo(
    () => ({
      x: playerAndPrefetch.x,
      y: playerAndPrefetch.y,
    }),
    [playerAndPrefetch.x, playerAndPrefetch.y]
  );

  return {
    player,
    setPlayerPosition,
    areaPrefetch: playerAndPrefetch.prefetchDirections,
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

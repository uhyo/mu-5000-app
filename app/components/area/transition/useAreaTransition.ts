import { useEffect, useRef } from "react";
import { useNavigate } from "remix";
import { ItemMap } from "~/components/items/ItemsStoreContext";
import { AreaMinusMap } from "~/logic/area";
import { mapSize } from "~/logic/area/params";
import { getOrElse } from "~/utils/getOrElse";
import { PlayerInfo } from "../player";

type UseAreaTransitionInput = {
  area: AreaMinusMap;
  player: PlayerInfo;
  items: ItemMap;
  setPlayerPosition: (position: { x: number; y: number }) => void;
};

export function useAreaTransition({
  area,
  player,
  items,
  setPlayerPosition,
}: UseAreaTransitionInput) {
  const nextPlayerPosition = useRef<{
    areaId: string;
    x: number;
    y: number;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // transition happens once per area
    if (nextPlayerPosition.current !== null) {
      return;
    }
    // if player is at the edge of area, transition to the next area
    // north
    if (player.y === 0) {
      const nextArea = getNextArea(items, area.connections.north);
      navigate(getAreaPath(nextArea));
      nextPlayerPosition.current = {
        areaId: nextArea,
        x: player.x,
        y: mapSize - 2,
      };
      return;
    }
    // east
    if (player.x === mapSize - 1) {
      const nextArea = getNextArea(items, area.connections.east);
      navigate(getAreaPath(nextArea));
      nextPlayerPosition.current = {
        areaId: nextArea,
        x: 1,
        y: player.y,
      };
      return;
    }
    // south
    if (player.y === mapSize - 1) {
      const nextArea = getNextArea(items, area.connections.south);
      navigate(getAreaPath(nextArea));
      nextPlayerPosition.current = {
        areaId: nextArea,
        x: player.x,
        y: 1,
      };
      return;
    }
    // west
    if (player.x === 0) {
      const nextArea = getNextArea(items, area.connections.west);
      navigate(getAreaPath(nextArea));
      nextPlayerPosition.current = {
        areaId: nextArea,
        x: mapSize - 2,
        y: player.y,
      };
      return;
    }
  }, [area, player, items, navigate]);

  useEffect(() => {
    if (nextPlayerPosition.current?.areaId === area.id) {
      setPlayerPosition({
        x: nextPlayerPosition.current.x,
        y: nextPlayerPosition.current.y,
      });
      nextPlayerPosition.current = null;
    }
  }, [area.id, setPlayerPosition]);
}

function getNextArea(items: ItemMap, nextAreaId: string) {
  let next = parseInt(nextAreaId, 16);
  // if items are not enough, area is restricted
  const sparkle = getOrElse(items, "sparkle", 0);
  if (sparkle < 50) {
    next &= 0x0fff;
  } else if (sparkle < 500) {
    next &= 0x1fff;
  } else if (sparkle < 1000) {
    next &= 0x3fff;
  } else if (sparkle < 2000) {
    next &= 0x7fff;
  }
  return next.toString(16).padStart(4, "0");
}

export function getAreaPath(areaId: string) {
  return `/area/${areaId}`;
}

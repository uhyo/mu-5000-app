import { useEffect, useRef } from "react";
import { useNavigate } from "remix";
import { Area } from "~/logic/area";
import { mapSize } from "~/logic/area/params";
import { PlayerInfo } from "../player";

type UseAreaTransitionInput = {
  area: Area;
  player: PlayerInfo;
  setPlayerPosition: (position: { x: number; y: number }) => void;
};

export function useAreaTransition({
  area,
  player,
  setPlayerPosition,
}: UseAreaTransitionInput) {
  const didAreaTransition = useRef<string | null>(null);

  const navigate = useNavigate();

  // transition happens once per area
  if (didAreaTransition.current === area.id) {
    return;
  }
  // if player is at the edge of area, transition to the next area
  // north
  if (player.y === 0) {
    didAreaTransition.current = area.id;
    navigate(getAreaPath(area.connections.north));
    setPlayerPosition({ x: player.x, y: mapSize - 2 });
    return;
  }
  // east
  if (player.x === mapSize - 1) {
    didAreaTransition.current = area.id;
    navigate(getAreaPath(area.connections.east));
    setPlayerPosition({ x: 1, y: player.y });
    return;
  }
  // south
  if (player.y === mapSize - 1) {
    didAreaTransition.current = area.id;
    navigate(getAreaPath(area.connections.south));
    setPlayerPosition({ x: player.x, y: 1 });
    return;
  }
  // west
  if (player.x === 0) {
    didAreaTransition.current = area.id;
    navigate(getAreaPath(area.connections.west));
    setPlayerPosition({ x: mapSize - 2, y: player.y });
    return;
  }
}

function getAreaPath(areaId: string) {
  return `/area/${areaId}`;
}

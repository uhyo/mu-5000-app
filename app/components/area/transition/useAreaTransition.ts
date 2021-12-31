import { useEffect, useRef } from "react";
import { useNavigate } from "remix";
import { AreaMinusMap } from "~/logic/area";
import { mapSize } from "~/logic/area/params";
import { PlayerInfo } from "../player";

type UseAreaTransitionInput = {
  area: AreaMinusMap;
  player: PlayerInfo;
  setPlayerPosition: (position: { x: number; y: number }) => void;
};

export function useAreaTransition({
  area,
  player,
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
      navigate(getAreaPath(area.connections.north));
      nextPlayerPosition.current = {
        areaId: area.connections.north,
        x: player.x,
        y: mapSize - 2,
      };
      return;
    }
    // east
    if (player.x === mapSize - 1) {
      navigate(getAreaPath(area.connections.east));
      nextPlayerPosition.current = {
        areaId: area.connections.east,
        x: 1,
        y: player.y,
      };
      return;
    }
    // south
    if (player.y === mapSize - 1) {
      navigate(getAreaPath(area.connections.south));
      nextPlayerPosition.current = {
        areaId: area.connections.south,
        x: player.x,
        y: 1,
      };
      return;
    }
    // west
    if (player.x === 0) {
      navigate(getAreaPath(area.connections.west));
      nextPlayerPosition.current = {
        areaId: area.connections.west,
        x: mapSize - 2,
        y: player.y,
      };
      return;
    }
  }, [area, player, navigate]);

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

function getAreaPath(areaId: string) {
  return `/area/${areaId}`;
}

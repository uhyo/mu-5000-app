import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AreaMap } from "~/logic/area";
import { isItem } from "~/logic/area/landDef";
import { touchItem } from "~/logic/item/itemTouch";
import { PlayerInfo } from "../area/player";
import { getAreaPath } from "../area/transition/useAreaTransition";
import { useLogs } from "../logs/LogsContext";
import { useItemsStore } from "./ItemsStoreContext";

export function useItemTouch(
  map: AreaMap,
  player: PlayerInfo,
  updateMap: (x: number, y: number, land: number) => void
) {
  const navigate = useNavigate();
  const { items, addItem } = useItemsStore();
  const { addLog } = useLogs();
  const mapChip = map[player.y][player.x];
  useEffect(() => {
    if (isItem(mapChip)) {
      touchItem({
        mapItem: mapChip,
        getItem: (itemType) => items.get(itemType) || 0,
        addItem,
        addLog,
        navigate: (areaId) => {
          navigate(getAreaPath(areaId));
        },
      });
      updateMap(player.x, player.y, 0);
    }
  }, [mapChip, addItem, addLog]);
}

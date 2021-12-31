import { useEffect } from "react";
import { AreaMap } from "~/logic/area";
import { isItem } from "~/logic/area/landDef";
import { touchItem } from "~/logic/item/itemTouch";
import { PlayerInfo } from "../area/player";
import { useLogs } from "../logs/LogsContext";
import { useItemsStore } from "./ItemsStoreContext";

export function useItemTouch(
  map: AreaMap,
  player: PlayerInfo,
  updateMap: (x: number, y: number, land: number) => void
) {
  const { addItem } = useItemsStore();
  const { addLog } = useLogs();
  const mapChip = map[player.y][player.x];
  useEffect(() => {
    if (isItem(mapChip)) {
      touchItem({
        mapItem: mapChip,
        addItem,
        addLog,
      });
      updateMap(player.x, player.y, 0);
    }
  }, [mapChip, addItem, addLog]);
}

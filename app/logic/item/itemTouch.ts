import { landDef } from "../area/landDef";
import { ItemType, itemTypes } from "./itemDef";

export type TouchItemInput = {
  mapItem: number;
  addItem: (itemType: ItemType, itemNum: number) => void;
  addLog: (content: string) => void;
};

export function touchItem({ mapItem, addItem, addLog }: TouchItemInput): void {
  switch (mapItem) {
    case landDef.mu:
      addItem("mu", 1);
      addLog("You found a 🈚️!");
      break;
  }
}

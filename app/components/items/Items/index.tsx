import { itemNames } from "~/logic/item/itemDef";
import { useItemsStore } from "../ItemsStoreContext";

export const Items: React.VFC = () => {
  const { items } = useItemsStore();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 10ch)",
        gridTemplateRows: "repeat(4, minmax(1em, auto))",
      }}
    >
      {Array.from(items.entries(), ([itemType, itemNum]) => {
        if (itemNum <= 0) {
          return null;
        }
        const itemChar = itemNames[itemType];

        return (
          <div key={itemType}>
            ${itemChar} ${String(Math.min(itemNum, 9999)).padStart(4, "0")}
          </div>
        );
      })}
    </div>
  );
};

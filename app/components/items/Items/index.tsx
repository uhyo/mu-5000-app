import { Twemoji } from "~/components/utils/Twemoji";
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
        padding: "2px",
        gap: "2px",
      }}
    >
      {Array.from(items.entries(), ([itemType, itemNum]) => {
        if (itemNum <= 0) {
          return null;
        }
        const itemChar = itemNames[itemType];

        return (
          <div key={itemType}>
            <Twemoji wrapper="span">{itemChar}</Twemoji>{" "}
            {String(itemNum).padStart(4, "0")}
          </div>
        );
      })}
    </div>
  );
};

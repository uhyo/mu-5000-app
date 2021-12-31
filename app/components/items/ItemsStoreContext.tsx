import { createContext, useContext, useMemo, useState } from "react";
import { ItemType } from "~/logic/item/itemDef";

type ItemsStore = {
  items: Map<ItemType, number>;
};

const ItemsStoreContext = createContext<ItemsStore>({
  items: new Map(),
});

export const useItemsStore = () => {
  return useContext(ItemsStoreContext);
};

export const ItemsStoreProvider: React.VFC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useItemsStoreLogic();
  return (
    <ItemsStoreContext.Provider value={value}>
      {children}
    </ItemsStoreContext.Provider>
  );
};

function useItemsStoreLogic(): ItemsStore {
  const [items, setItems] = useState<Map<ItemType, number>>(new Map());

  return useMemo(
    () => ({
      items,
    }),
    [items]
  );
}

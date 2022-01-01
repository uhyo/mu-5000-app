import { getMany, setMany } from "idb-keyval";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ItemType, itemTypes } from "~/logic/item/itemDef";

type ItemsStore = {
  items: ItemMap;
  addItem: (itemType: ItemType, itemNum: number) => void;
};

export type ItemMap = Map<ItemType, number>;

const ItemsStoreContext = createContext<ItemsStore>({
  items: new Map(),
  addItem: () => {},
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

type ItemsState = {
  generation: number;
  items: Map<ItemType, number>;
  loadingState: "loading" | "loaded" | "error";
  pendingUpdates: readonly {
    itemType: ItemType;
    itemNum: number;
  }[];
};

function useItemsStoreLogic(): ItemsStore {
  const [state, setItems] = useState<ItemsState>({
    generation: 0,
    items: new Map(),
    loadingState: "loading",
    pendingUpdates: [],
  });

  useIDBDataSync(state, setItems);
  const addItem = useAddItemFunction(state, setItems);

  return useMemo(
    () => ({
      items: state.items,
      addItem,
    }),
    [state.items, addItem]
  );
}

function useIDBDataSync(
  state: ItemsState,
  setItems: React.Dispatch<React.SetStateAction<ItemsState>>
): void {
  // Initial load from IDB
  useEffect(() => {
    if (state.loadingState === "loading") {
      let canceled = false;
      getMany(itemTypes.map((type) => `item:${type}`))
        .then((itemNumbers) => {
          if (canceled) {
            return;
          }
          setItems((items) => {
            if (items.loadingState !== "loading") {
              // ?
              return items;
            }
            return {
              generation: 0,
              items: new Map(
                itemTypes.map((type, i) => [type, Number(itemNumbers[i]) || 0])
              ),
              loadingState: "loaded",
              pendingUpdates: items.pendingUpdates,
            };
          });
        })
        .catch((err) => {
          if (canceled) {
            return;
          }
          console.error(err);
          setItems((items) => ({
            generation: 0,
            items: new Map(),
            loadingState: "error",
            pendingUpdates: items.pendingUpdates,
          }));
        });
      return () => {
        canceled = true;
      };
    }
    return undefined;
  }, [state.loadingState]);

  // perioidic save to IDB
  const itemStateRef = useRef(state);
  itemStateRef.current = state;
  useEffect(() => {
    let lastSavedGeneration = 0;
    const interval = setInterval(() => {
      if (lastSavedGeneration === itemStateRef.current.generation) {
        return;
      }
      setMany(
        Array.from(itemStateRef.current.items, ([itemType, itemNum]) => [
          `item:${itemType}`,
          itemNum,
        ])
      ).catch(console.error);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
}

function useAddItemFunction(
  items: ItemsState,
  setItems: React.Dispatch<React.SetStateAction<ItemsState>>
): (itemType: ItemType, itemNum: number) => void {
  // If items has pendingupdates, we wait for items to be loaded and
  // then apply the pending updates.
  useEffect(() => {
    if (items.loadingState !== "loaded" || items.pendingUpdates.length === 0) {
      return;
    }
    setItems((items) => {
      const newItems = new Map(items.items);
      for (const { itemType, itemNum } of items.pendingUpdates) {
        newItems.set(itemType, (newItems.get(itemType) || 0) + itemNum);
      }
      return {
        ...items,
        generation: items.generation + 1,
        items: newItems,
        pendingUpdates: [],
      };
    });
  }, [items]);

  return useCallback(
    (itemType: ItemType, itemNum: number) => {
      setItems((items) => {
        switch (items.loadingState) {
          case "loading":
          case "error":
            return {
              ...items,
              pendingUpdates: [...items.pendingUpdates, { itemType, itemNum }],
            };
          case "loaded": {
            const newItems = new Map(items.items);
            newItems.set(itemType, (newItems.get(itemType) || 0) + itemNum);
            return {
              ...items,
              generation: items.generation + 1,
              items: newItems,
            };
          }
        }
      });
    },
    [setItems]
  );
}

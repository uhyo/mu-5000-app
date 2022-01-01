import { landDef } from "../area/landDef";
import { ItemType, itemTypes } from "./itemDef";

export type TouchItemInput = {
  mapItem: number;
  getItem: (itemType: ItemType) => number;
  addItem: (itemType: ItemType, itemNum: number) => void;
  addLog: (content: string) => void;
};

export function touchItem({
  mapItem,
  getItem,
  addItem,
  addLog,
}: TouchItemInput): void {
  switch (mapItem) {
    case landDef.mu:
      addItem("mu", 1);
      addLog("You found a 🈚️!");
      break;
    case landDef.moneyBag:
      addItem("moneyBag", 1);
      addLog("You found a 💰!");
      break;
    case landDef.nightMarket: {
      const moneyBags = getItem("moneyBag");
      if (moneyBags === 0) {
        addLog("🌃 Nightmarket: you don't have any 💰!");
      } else {
        addItem("moneyBag", -moneyBags);
        addItem("mu", moneyBags * 10);
        addLog(
          `🌃 Nightmarket: you used up ${moneyBags} 💰s and bought ${
            moneyBags * 10
          } 🈚s️!`
        );
      }
    }
    case landDef.pig: {
      addItem("pig", 1);
      addLog("You caught a 🐖!");
      break;
    }
    case landDef.sheep: {
      addItem("sheep", 1);
      addLog("You caught a 🐑!");
      break;
    }
    case landDef.rooster: {
      addItem("rooster", 1);
      addLog("You caught a 🐓!");
      break;
    }
    case landDef.fire: {
      const pigs = getItem("pig");
      const sheeps = getItem("sheep");
      const roosters = getItem("rooster");
      if (pigs === 0 && sheeps === 0 && roosters === 0) {
        addLog("🔥 Ouch!");
        break;
      }
      if (pigs >= sheeps && pigs >= roosters) {
        // cook pigs to get meat
        addItem("meat", pigs);
        addItem("pig", -pigs);
        addLog(`🔥 You cooked ${pigs} 🐖s to get ${pigs} 🍖s!`);
      } else if (sheeps >= pigs && sheeps >= roosters) {
        // cook sheeps to get meat
        addItem("meat", sheeps);
        addItem("sheep", -sheeps);
        addLog(`🔥 You cooked ${sheeps} 🐑s to get ${sheeps} 🍖s!`);
      } else {
        // cook roosters to get meat
        addItem("meat", roosters);
        addItem("rooster", -roosters);
        addLog(`🔥 You cooked ${roosters} 🐓s to get ${roosters} 🍖s!`);
      }
      break;
    }
  }
}

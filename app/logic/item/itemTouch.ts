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
      const moneyBags = clearItem("moneyBag");
      if (moneyBags === 0) {
        addLog("🌃 Nightmarket: you don't have any 💰!");
      } else {
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
      const axes = clearItem("axe");
      if (axes > 0) {
        addItem("gear", axes);
        addLog(`🔥 You used up ${axes} 🪓s and crafted ${axes} ⚙️s!`);
        break;
      }
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
    case landDef.zombie: {
      const police = getItem("police");
      if (police) {
        // You are a police now!
        addItem("axe", 1);
        addLog("You beated a 🧟 and got a 🪓!");
        break;
      }
      const meat = clearItem("meat");
      if (meat === 0) {
        addLog("🧟 Ouch!");
      } else {
        addItem("poop", meat);
        addLog(`️You gave ${meat} 🍖s to 🧟 and got ${meat} 💩s!`);
      }
      break;
    }
    case landDef.toilet: {
      const poop = clearItem("poop");
      if (poop === 0) {
        addLog("🚽 You got some rest.");
      } else {
        addItem("sparkle", poop);
        addLog(`🚽 You cleaned ${poop} 💩s to get ${poop} ✨s!`);
      }
      break;
    }
    case landDef.gift: {
      addItem("gift", 1);
      addLog("You found a 🎁!");
      break;
    }
    case landDef.hat: {
      clearHats();
      const hats = ["santaClaus", "police"] as const;
      const hat = hats[Math.floor(Math.random() * hats.length)];
      addItem(hat, 1);
      switch (hat) {
        case "santaClaus":
          addLog("🎩 You got a Santa Claus hat!");
          break;
        case "police":
          addLog("🎩 You got a Police hat!");
          break;
      }
      break;
    }
    case landDef.kid: {
      const santaClaus = getItem("santaClaus");
      if (santaClaus > 0) {
        // You are Santa now
        addItem("santaClaus", -santaClaus);
        const gift = clearItem("gift");
        if (gift > 0) {
          addItem("sparkle", gift * 5);
          addLog(`🎅 You gave ${gift} 🎁s to 👦 and got ${gift * 5} ✨s!`);
        } else {
          addLog("🎅 You don't have any 🎁s!");
        }
      } else {
        addLog("👦: Hello!");
      }
      break;
    }
    case landDef.robot: {
      const gears = clearItem("gear");
      if (gears === 0) {
        addLog("🤖 does not respond.");
        break;
      }
      addItem("sparkle", gears * 10);
      addLog(
        `You used up ${gears} ⚙️s and repaired 🤖. You got ${gears * 10} ✨s!`
      );
      break;
    }
  }

  function clearItem(itemType: ItemType): number {
    const itemNum = getItem(itemType);
    addItem(itemType, -itemNum);
    return itemNum;
  }

  function clearHats() {
    clearItem("santaClaus");
    clearItem("police");
  }
}

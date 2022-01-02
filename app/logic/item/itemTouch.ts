import { landDef } from "../area/landDef";
import { ItemType, itemTypes } from "./itemDef";

export type TouchItemInput = {
  mapItem: number;
  getItem: (itemType: ItemType) => number;
  addItem: (itemType: ItemType, itemNum: number) => void;
  addLog: (content: string) => void;
  navigate: (areaId: string) => void;
};

export function touchItem({
  mapItem,
  getItem,
  addItem,
  addLog,
  navigate,
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
      if (getItem("vampire")) {
        const blood = Math.floor(Math.random() * 5) + 1;
        addItem("blood", blood);
        addLog(`You attacked 🌃 and got ${blood} 🩸s!`);
        break;
      }
      const gems = clearItem("gem");
      if (gems > 0) {
        addItem("mu", gems * 30);
        addLog(`🌃 Nightmarket: you sold ${gems} 💎s for ${gems * 30} 🈚️s!`);
        break;
      }
      const moneyBags = clearItem("moneyBag");
      if (moneyBags > 0) {
        addItem("mu", moneyBags * 10);
        addLog(
          `🌃 Nightmarket: you used up ${moneyBags} 💰s and bought ${
            moneyBags * 10
          } 🈚s️!`
        );
        break;
      }
      const meats = clearItem("meat");
      if (meats > 0) {
        addItem("mu", meats * 3);
        addLog(
          `🌃 Nightmarket: you exchaged ${meats} 🍖s with ${meats * 3} 🈚s️!`
        );
        break;
      }
      addLog("🌃 Nightmarket: you don't have any 💰!");
      break;
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
      if (getItem("vampire")) {
        addLog("🧟: Hello!");
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
      const soap = clearItem("soap");
      if (soap > 0) {
        addItem("sparkle", soap * 8);
        addLog(
          ` You used up ${soap} 🧼s to clean 🚽 and produced ${soap * 8} ✨s!`
        );
        break;
      }
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
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked 🩸 from 👦!");
        break;
      }

      const santaClaus = clearItem("santaClaus");
      if (santaClaus > 0) {
        // You are Santa now
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
    case landDef.farmer: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked 🩸 from 🧑‍🌾!");
        break;
      }
      const seedings = getItem("seeding");
      if (seedings > 0) {
        addItem("seeding", -1);
        addItem("sparkle", 150);
        addLog(`🧑‍🌾: You planted a 🌱 and received 150 ✨s!`);
        break;
      }

      const pigs = getItem("pig");
      const sheeps = getItem("sheep");
      const roosters = getItem("rooster");
      if (pigs === 0 && sheeps === 0 && roosters === 0) {
        addLog("🧑‍🌾: Hello!");
        break;
      }
      if (pigs >= sheeps && pigs >= roosters) {
        // sell pigs to get mu
        addItem("mu", pigs);
        addItem("pig", -pigs);
        addLog(`🧑‍🌾 You sold ${pigs} 🐖s to get ${pigs} 🈚s!`);
        break;
      } else if (sheeps >= pigs && sheeps >= roosters) {
        // sell sheeps to get mu
        addItem("mu", sheeps);
        addItem("sheep", -sheeps);
        addLog(`🧑‍🌾 You sold ${sheeps} 🐑s to get ${sheeps} 🈚s!`);
        break;
      } else {
        // sell roosters to get mu
        addItem("mu", roosters);
        addItem("rooster", -roosters);
        addLog(`🧑‍🌾 You sold ${roosters} 🐓s to get ${roosters} 🈚s!`);
        break;
      }
    }
    case landDef.scissors: {
      const gifts = clearItem("gift");
      if (gifts > 0) {
        const randomFactor = Math.floor(Math.random() * 3) + 8;
        addItem("mu", gifts * randomFactor);
        addLog(
          `✂️ You opened ${gifts} 🎁s and got ${gifts * randomFactor} 🈚s!`
        );
        break;
      }
      addLog("✂️ You have nothing to cut.");
    }
    case landDef.departmentStore: {
      if (getItem("vampire")) {
        const blood = Math.floor(Math.random() * 10) + 1;
        addItem("blood", blood);
        addLog(`You attacked 🏢 and got ${blood} 🩸s!`);
        break;
      }
      const slotMachines = clearItem("slotMachine");
      if (slotMachines > 0) {
        addItem("moneyBag", slotMachines * 100);
        addLog(
          `You sold ${slotMachines} 🎰s at 🏢Department Store and got ${
            slotMachines * 50
          } 💰s!`
        );
        break;
      }
      const moneyBags = clearItem("moneyBag");
      if (moneyBags === 0) {
        addLog("🏢Department Store: you have no 💰!");
        break;
      }
      addItem("gift", moneyBags * 5);
      addLog(
        `🏢Department Store: you spent ${moneyBags} 💰s to buy ${
          moneyBags * 5
        } 🎁s!`
      );
      break;
    }
    case landDef.blood: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You picked up 🩸!");
        break;
      }
      clearHats();
      addItem("vampire", 1);
      addLog(`You drunk 🩸 and became a 🧛!`);
      break;
    }
    case landDef.mage: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked 🩸 from 🧙!");
        break;
      }
      const documents = clearItem("document");
      if (documents > 0) {
        addItem("scroll", documents);
        addLog(`🧙 converted ${documents} 📄s into ${documents} 📜s!`);
        break;
      }
      const blood = clearItem("blood");
      if (blood === 0) {
        addLog("🧙: You have no 🩸!");
        break;
      }
      addItem("sparkle", blood * 10);
      addLog(`🧙 converted ${blood} 🩸s into ${blood * 10} ✨s!`);
      break;
    }
    case landDef.soap: {
      addItem("soap", 1);
      addLog("You found a 🧼!");
      break;
    }
    case landDef.bathtub: {
      const soap = clearItem("soap");
      if (soap === 0) {
        addLog("🛁: You have no 🧼!");
        break;
      }
      const blood = clearItem("blood");
      if (blood === 0) {
        addItem("sparkle", soap * 3);
        addLog(`🛁 You used ${soap} 🧼s and got ${soap * 3} ✨s!`);
        break;
      }
      addItem("water", blood * soap);
      addLog(
        `🛁 You cleaned ${blood} 🩸s with ${soap} 🧼s and got ${
          blood * soap
        } 💧s!`
      );
      break;
    }
    case landDef.mechanic: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked 🩸 from 🧑‍🔧!");
        break;
      }
      const documents = clearItem("document");
      if (documents > 0) {
        addItem("envelope", documents);
        addLog(`🧑‍🔧 received ${documents} 📄s and wrote ${documents} ✉️s!`);
        break;
      }
      const gears = getItem("gear");
      if (gears < 10) {
        addLog("🧑‍🔧: I need 10 ⚙️s!");
        break;
      }
      addItem("gear", -10);
      addItem("slotMachine", 1);
      addLog(`🧑‍🔧 created a 🎰 from 10 ⚙️s for you!`);
      break;
    }
    case landDef.desert: {
      const water = getItem("water");
      if (water < 100) {
        addLog("🏜Desert: you need 100 💧s for greening!");
        break;
      }
      addItem("water", -100);
      addItem("seeding", 1);
      addLog("🏜Desert: you used 100 💧s to grow a 🌱!");
      break;
    }
    case landDef.sa: {
      addItem("sa", 1);
      addLog("You found a 🈂️!");
      break;
    }
    case landDef.officeWorker: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked 🩸 from 🧑‍💼!");
        break;
      }
      const sa = clearItem("sa");
      if (sa === 0) {
        addLog("🧑‍💼: You need 🈂️s to have them work!");
        break;
      }
      addItem("document", sa);
      addLog(`🧑‍💼 produced ${sa} 📄s from ${sa} 🈂️s.`);
      break;
    }
    case landDef.postOffice: {
      if (getItem("vampire")) {
        const blood = Math.floor(Math.random() * 10) + 5;
        addItem("blood", blood);
        addLog(`You attacked 🏣 and got ${blood} 🩸s!`);
        break;
      }
      const envelopes = clearItem("envelope");
      if (envelopes === 0) {
        addLog("🏣: you have no ✉️s!");
        break;
      }
      addItem("mu", envelopes * 30);
      addLog(
        `🏣: you posted ${envelopes} ✉️s and got ${
          envelopes * 30
        } 🈚️s instead!`
      );
      break;
    }
    case landDef.elf: {
      const scrolls = clearItem("scroll");
      if (scrolls > 0) {
        addItem("gem", scrolls);
        addLog(`🧝🏻‍♀️ read ${scrolls} 📜s and generated ${scrolls} 💎s!`);
        break;
      }
      addLog("🧝🏻‍♀️: Hello!");
      break;
    }
    case landDef.tada: {
      addItem("tada", 1);
      addLog(`🎉 Congratulations!`);
      navigate("ffff");
      break;
    }
    case landDef.gem: {
      addItem("gem", 10);
      addLog("You found 10 💎s!");
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
    clearItem("vampire");
  }
}

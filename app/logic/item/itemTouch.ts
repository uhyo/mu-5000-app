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
      addLog("You found a đī¸!");
      break;
    case landDef.moneyBag:
      addItem("moneyBag", 1);
      addLog("You found a đ°!");
      break;
    case landDef.nightMarket: {
      if (getItem("vampire")) {
        const blood = Math.floor(Math.random() * 5) + 1;
        addItem("blood", blood);
        addLog(`You attacked đ and got ${blood} đŠ¸s!`);
        break;
      }
      const gems = clearItem("gem");
      if (gems > 0) {
        addItem("mu", gems * 30);
        addLog(`đ Nightmarket: you sold ${gems} đs for ${gems * 30} đī¸s!`);
        break;
      }
      const moneyBags = clearItem("moneyBag");
      if (moneyBags > 0) {
        addItem("mu", moneyBags * 10);
        addLog(
          `đ Nightmarket: you used up ${moneyBags} đ°s and bought ${
            moneyBags * 10
          } đsī¸!`
        );
        break;
      }
      const meats = clearItem("meat");
      if (meats > 0) {
        addItem("mu", meats * 3);
        addLog(
          `đ Nightmarket: you exchaged ${meats} đs with ${meats * 3} đsī¸!`
        );
        break;
      }
      addLog("đ Nightmarket: you don't have any đ°!");
      break;
    }
    case landDef.pig: {
      addItem("pig", 1);
      addLog("You caught a đ!");
      break;
    }
    case landDef.sheep: {
      addItem("sheep", 1);
      addLog("You caught a đ!");
      break;
    }
    case landDef.rooster: {
      addItem("rooster", 1);
      addLog("You caught a đ!");
      break;
    }
    case landDef.fire: {
      const axes = clearItem("axe");
      if (axes > 0) {
        addItem("gear", axes);
        addLog(`đĨ You used up ${axes} đĒs and crafted ${axes} âī¸s!`);
        break;
      }
      const pigs = getItem("pig");
      const sheeps = getItem("sheep");
      const roosters = getItem("rooster");
      if (pigs === 0 && sheeps === 0 && roosters === 0) {
        addLog("đĨ Ouch!");
        break;
      }
      if (pigs >= sheeps && pigs >= roosters) {
        // cook pigs to get meat
        addItem("meat", pigs);
        addItem("pig", -pigs);
        addLog(`đĨ You cooked ${pigs} đs to get ${pigs} đs!`);
      } else if (sheeps >= pigs && sheeps >= roosters) {
        // cook sheeps to get meat
        addItem("meat", sheeps);
        addItem("sheep", -sheeps);
        addLog(`đĨ You cooked ${sheeps} đs to get ${sheeps} đs!`);
      } else {
        // cook roosters to get meat
        addItem("meat", roosters);
        addItem("rooster", -roosters);
        addLog(`đĨ You cooked ${roosters} đs to get ${roosters} đs!`);
      }
      break;
    }
    case landDef.zombie: {
      const police = getItem("police");
      if (police) {
        // You are a police now!
        addItem("axe", 1);
        addLog("You beated a đ§ and got a đĒ!");
        break;
      }
      if (getItem("vampire")) {
        addLog("đ§: Hello!");
        break;
      }
      const meat = clearItem("meat");
      if (meat === 0) {
        addLog("đ§ Ouch!");
      } else {
        addItem("poop", meat);
        addLog(`ī¸You gave ${meat} đs to đ§ and got ${meat} đŠs!`);
      }
      break;
    }
    case landDef.toilet: {
      const soap = clearItem("soap");
      if (soap > 0) {
        addItem("sparkle", soap * 8);
        addLog(
          ` You used up ${soap} đ§ŧs to clean đŊ and produced ${soap * 8} â¨s!`
        );
        break;
      }
      const poop = clearItem("poop");
      if (poop === 0) {
        addLog("đŊ You got some rest.");
      } else {
        addItem("sparkle", poop);
        addLog(`đŊ You cleaned ${poop} đŠs to get ${poop} â¨s!`);
      }
      break;
    }
    case landDef.gift: {
      addItem("gift", 1);
      addLog("You found a đ!");
      break;
    }
    case landDef.hat: {
      clearHats();
      const hats = ["santaClaus", "police"] as const;
      const hat = hats[Math.floor(Math.random() * hats.length)];
      addItem(hat, 1);
      switch (hat) {
        case "santaClaus":
          addLog("đŠ You got a Santa Claus hat!");
          break;
        case "police":
          addLog("đŠ You got a Police hat!");
          break;
      }
      break;
    }
    case landDef.kid: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked đŠ¸ from đĻ!");
        break;
      }

      const santaClaus = clearItem("santaClaus");
      if (santaClaus > 0) {
        // You are Santa now
        const gift = clearItem("gift");
        if (gift > 0) {
          addItem("sparkle", gift * 5);
          addLog(`đ You gave ${gift} đs to đĻ and got ${gift * 5} â¨s!`);
        } else {
          addLog("đ You don't have any đs!");
        }
      } else {
        addLog("đĻ: Hello!");
      }
      break;
    }
    case landDef.robot: {
      const gears = clearItem("gear");
      if (gears === 0) {
        addLog("đ¤ does not respond.");
        break;
      }
      addItem("sparkle", gears * 10);
      addLog(
        `You used up ${gears} âī¸s and repaired đ¤. You got ${gears * 10} â¨s!`
      );
      break;
    }
    case landDef.farmer: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked đŠ¸ from đ§âđž!");
        break;
      }
      const seedings = getItem("seeding");
      if (seedings > 0) {
        addItem("seeding", -1);
        addItem("sparkle", 150);
        addLog(`đ§âđž: You planted a đą and received 150 â¨s!`);
        break;
      }

      const pigs = getItem("pig");
      const sheeps = getItem("sheep");
      const roosters = getItem("rooster");
      if (pigs === 0 && sheeps === 0 && roosters === 0) {
        addLog("đ§âđž: Hello!");
        break;
      }
      if (pigs >= sheeps && pigs >= roosters) {
        // sell pigs to get mu
        addItem("mu", pigs);
        addItem("pig", -pigs);
        addLog(`đ§âđž You sold ${pigs} đs to get ${pigs} đs!`);
        break;
      } else if (sheeps >= pigs && sheeps >= roosters) {
        // sell sheeps to get mu
        addItem("mu", sheeps);
        addItem("sheep", -sheeps);
        addLog(`đ§âđž You sold ${sheeps} đs to get ${sheeps} đs!`);
        break;
      } else {
        // sell roosters to get mu
        addItem("mu", roosters);
        addItem("rooster", -roosters);
        addLog(`đ§âđž You sold ${roosters} đs to get ${roosters} đs!`);
        break;
      }
    }
    case landDef.scissors: {
      const gifts = clearItem("gift");
      if (gifts > 0) {
        const randomFactor = Math.floor(Math.random() * 3) + 8;
        addItem("mu", gifts * randomFactor);
        addLog(
          `âī¸ You opened ${gifts} đs and got ${gifts * randomFactor} đs!`
        );
        break;
      }
      addLog("âī¸ You have nothing to cut.");
      break;
    }
    case landDef.departmentStore: {
      if (getItem("vampire")) {
        const blood = Math.floor(Math.random() * 10) + 1;
        addItem("blood", blood);
        addLog(`You attacked đĸ and got ${blood} đŠ¸s!`);
        break;
      }
      const slotMachines = clearItem("slotMachine");
      if (slotMachines > 0) {
        addItem("moneyBag", slotMachines * 50);
        addLog(
          `You sold ${slotMachines} đ°s at đĸDepartment Store and got ${
            slotMachines * 50
          } đ°s!`
        );
        break;
      }
      const moneyBags = clearItem("moneyBag");
      if (moneyBags === 0) {
        addLog("đĸDepartment Store: you have no đ°!");
        break;
      }
      addItem("gift", moneyBags * 5);
      addLog(
        `đĸDepartment Store: you spent ${moneyBags} đ°s to buy ${
          moneyBags * 5
        } đs!`
      );
      break;
    }
    case landDef.blood: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You picked up đŠ¸!");
        break;
      }
      clearHats();
      addItem("vampire", 1);
      addLog(`You drunk đŠ¸ and became a đ§!`);
      break;
    }
    case landDef.mage: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked đŠ¸ from đ§!");
        break;
      }
      const documents = clearItem("document");
      if (documents > 0) {
        addItem("scroll", documents);
        addLog(`đ§ converted ${documents} đs into ${documents} đs!`);
        break;
      }
      const blood = clearItem("blood");
      if (blood === 0) {
        addLog("đ§: You have no đŠ¸!");
        break;
      }
      addItem("sparkle", blood * 10);
      addLog(`đ§ converted ${blood} đŠ¸s into ${blood * 10} â¨s!`);
      break;
    }
    case landDef.soap: {
      addItem("soap", 1);
      addLog("You found a đ§ŧ!");
      break;
    }
    case landDef.bathtub: {
      const soap = clearItem("soap");
      if (soap === 0) {
        addLog("đ: You have no đ§ŧ!");
        break;
      }
      const blood = clearItem("blood");
      if (blood === 0) {
        addItem("sparkle", soap * 3);
        addLog(`đ You used ${soap} đ§ŧs and got ${soap * 3} â¨s!`);
        break;
      }
      addItem("water", blood * soap);
      addLog(
        `đ You cleaned ${blood} đŠ¸s with ${soap} đ§ŧs and got ${
          blood * soap
        } đ§s!`
      );
      break;
    }
    case landDef.mechanic: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked đŠ¸ from đ§âđ§!");
        break;
      }
      const documents = clearItem("document");
      if (documents > 0) {
        addItem("envelope", documents);
        addLog(`đ§âđ§ received ${documents} đs and wrote ${documents} âī¸s!`);
        break;
      }
      const gears = getItem("gear");
      if (gears < 25) {
        addLog("đ§âđ§: I need 25 âī¸s!");
        break;
      }
      addItem("gear", -25);
      addItem("slotMachine", 1);
      addLog(`đ§âđ§ created a đ° from 25 âī¸s for you!`);
      break;
    }
    case landDef.desert: {
      const water = getItem("water");
      if (water < 100) {
        addLog("đDesert: you need 100 đ§s for greening!");
        break;
      }
      addItem("water", -100);
      addItem("seeding", 1);
      addLog("đDesert: you used 100 đ§s to grow a đą!");
      break;
    }
    case landDef.sa: {
      addItem("sa", 1);
      addLog("You found a đī¸!");
      break;
    }
    case landDef.officeWorker: {
      if (getItem("vampire")) {
        addItem("blood", 1);
        addLog("You sucked đŠ¸ from đ§âđŧ!");
        break;
      }
      const sa = clearItem("sa");
      if (sa === 0) {
        addLog("đ§âđŧ: You need đī¸s to have them work!");
        break;
      }
      addItem("document", sa);
      addLog(`đ§âđŧ produced ${sa} đs from ${sa} đī¸s.`);
      break;
    }
    case landDef.postOffice: {
      if (getItem("vampire")) {
        const blood = Math.floor(Math.random() * 10) + 5;
        addItem("blood", blood);
        addLog(`You attacked đŖ and got ${blood} đŠ¸s!`);
        break;
      }
      const envelopes = clearItem("envelope");
      if (envelopes === 0) {
        addLog("đŖ: you have no âī¸s!");
        break;
      }
      addItem("mu", envelopes * 30);
      addLog(
        `đŖ: you posted ${envelopes} âī¸s and got ${
          envelopes * 30
        } đī¸s instead!`
      );
      break;
    }
    case landDef.elf: {
      const scrolls = clearItem("scroll");
      if (scrolls > 0) {
        addItem("gem", scrolls);
        addLog(`đ§đģââī¸ read ${scrolls} đs and generated ${scrolls} đs!`);
        break;
      }
      addLog("đ§đģââī¸: Hello!");
      break;
    }
    case landDef.tada: {
      addItem("tada", 1);
      addLog(`đ Congratulations!`);
      navigate("ffff");
      break;
    }
    case landDef.gem: {
      addItem("gem", 10);
      addLog("You found 10 đs!");
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

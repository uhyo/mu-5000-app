import seedrandom from "seedrandom";
import { range } from "~/utils/range";
import { Edge } from "./edge";
import { landDef } from "./landDef";
import { mapSize } from "./params";

type Rng = ReturnType<typeof seedrandom>;

export function addRandomItems(
  areaId: string,
  map: number[][],
  rng: Rng,
  edges: Edge
) {
  const itemCountRnd = rng.int32();

  // additional walls
  const additionalWallCount = (itemCountRnd & 0xff) % 8;

  const insetAreaSize = mapSize - 2;
  for (const _ of range(0, additionalWallCount)) {
    const x = Math.floor(rng.double() * insetAreaSize) + 1;
    const y = Math.floor(rng.double() * insetAreaSize) + 1;
    map[y][x] = landDef[edges.default];
  }

  const areaIdNum = parseInt(areaId, 16);
  const itemRandomList =
    areaIdNum <= 0x0fff
      ? itemRandomListLevel1
      : areaIdNum <= 0x1fff
      ? itemRandomListLevel2
      : areaIdNum <= 0x3fff
      ? itemRandomListLevel3
      : areaIdNum <= 0x7fff
      ? itemRandomListLevel4
      : itemRandomListLevel5;

  const itemCount = (((itemCountRnd >>> 8) & 0xff) % 6) + 1;
  for (const _ of range(0, itemCount)) {
    const x = Math.floor(rng.double() * insetAreaSize) + 1;
    const y = Math.floor(rng.double() * insetAreaSize) + 1;
    map[y][x] =
      itemRandomList[Math.floor(rng.double() * itemRandomList.length)];
  }
}

const itemRandomListLevel1 = [
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.moneyBag,
  landDef.moneyBag,
  landDef.pig,
  landDef.pig,
  landDef.pig,
  landDef.sheep,
  landDef.sheep,
  landDef.sheep,
  landDef.rooster,
  landDef.rooster,
  landDef.rooster,
  landDef.fire,
  landDef.nightMarket,
  landDef.zombie,
  landDef.zombie,
  landDef.toilet,
  landDef.kid,
];

const itemRandomListLevel2 = [
  landDef.mu,
  landDef.mu,
  landDef.gift,
  landDef.gift,
  landDef.gift,
  landDef.moneyBag,
  landDef.moneyBag,
  landDef.pig,
  landDef.sheep,
  landDef.rooster,
  landDef.fire,
  landDef.zombie,
  landDef.zombie,
  landDef.zombie,
  landDef.toilet,
  landDef.hat,
  landDef.hat,
  landDef.robot,
];

const itemRandomListLevel3 = [
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.gift,
  landDef.moneyBag,
  landDef.moneyBag,
  landDef.fire,
  landDef.zombie,
  landDef.zombie,
  landDef.hat,
  landDef.kid,
  landDef.farmer,
  landDef.farmer,
  landDef.farmer,
  landDef.scissors,
  landDef.departmentStore,
  landDef.blood,
  landDef.mage,
];

const itemRandomListLevel4 = [
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.soap,
  landDef.soap,
  landDef.zombie,
  landDef.zombie,
  landDef.fire,
  landDef.toilet,
  landDef.hat,
  landDef.hat,
  landDef.farmer,
  landDef.departmentStore,
  landDef.blood,
  landDef.mage,
  landDef.bathtub,
  landDef.mechanic,
  landDef.desert,
];

const itemRandomListLevel5 = [
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.mu,
  landDef.moneyBag,
  landDef.soap,
  landDef.soap,
  landDef.sa,
  landDef.sa,
  landDef.sa,
  landDef.sa,
  landDef.blood,
  landDef.officeWorker,
  landDef.officeWorker,
  landDef.zombie,
  landDef.mechanic,
  landDef.postOffice,
  landDef.elf,
];

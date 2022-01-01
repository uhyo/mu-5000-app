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
    areaIdNum <= 0x0fff ? itemRandomListLevel1 : itemRandomListLevel2;

  const itemCount = ((itemCountRnd >>> 8) & 0xff) % 6;
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
];

const itemRandomListLevel2 = [
  landDef.mu,
  landDef.gift,
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
  landDef.toilet,
  landDef.hat,
];

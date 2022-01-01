import seedrandom from "seedrandom";
import { range } from "~/utils/range";
import { Edge } from "./edge";
import { landDef } from "./landDef";
import { mapSize } from "./params";

type Rng = ReturnType<typeof seedrandom>;

export function addRandomItems(map: number[][], rng: Rng, edges: Edge) {
  const itemCountRnd = rng.int32();

  // additional walls
  const additionalWallCount = (itemCountRnd & 0xff) % 8;

  const insetAreaSize = mapSize - 2;
  for (const _ of range(0, additionalWallCount)) {
    const x = Math.floor(rng.double() * insetAreaSize) + 1;
    const y = Math.floor(rng.double() * insetAreaSize) + 1;
    map[y][x] = landDef[edges.default];
  }

  const itemCount = ((itemCountRnd >>> 8) & 0xff) % 4;
  for (const _ of range(0, itemCount)) {
    const x = Math.floor(rng.double() * insetAreaSize) + 1;
    const y = Math.floor(rng.double() * insetAreaSize) + 1;
    map[y][x] =
      itemRandomList[Math.floor(rng.double() * itemRandomList.length)];
  }
}

const itemRandomList = [landDef.moneyBag, landDef.mu];

import { range } from "~/utils/range";
import { Area, AreaMap } from ".";
import { landDef } from "./landDef";
import { mapSize } from "./params";

export function getErrorArea(): Area {
  return {
    id: "404",
    name: "The Abyss of Not Found",
    floorType: "red",
    connections: {
      north: "0000",
      east: "0000",
      south: "0000",
      west: "0000",
    },
    map: getErrorAreaMap(),
  };
}

function getErrorAreaMap(): AreaMap {
  const result: number[][] = [];
  for (const y of range(0, mapSize)) {
    const row: number[] = [];
    if (y === 0 || y === mapSize - 1) {
      for (const _ of range(0, mapSize)) {
        row.push(landDef.kin);
      }
    } else {
      for (const x of range(0, mapSize)) {
        if (x === 0 || x === mapSize - 1) {
          row.push(landDef.kin);
        } else {
          row.push(landDef.nothing);
        }
      }
    }
    result.push(row);
  }
  return result;
}

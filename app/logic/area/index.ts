import seedrandom from "seedrandom";
import { range } from "~/utils/range";
import { Edge, EdgeItem, EdgeKind, generateEdge } from "./edge";
import { Floor, FloorType, generateFloor } from "./floor";
import { landDef } from "./landDef";
import { mapSize } from "./params";

export type Area = {
  floorType: FloorType;
  map: readonly (readonly number[])[];
};

export function createArea(areaId: string): Area | undefined {
  if (!validateAreaId(areaId)) {
    return undefined;
  }
  const rng = seedrandom(areaId);
  const edges = generateEdge(rng);
  const floor = generateFloor(rng);

  const land = generateLand(edges, floor);
  return land;
}

function validateAreaId(areaId: string): boolean {
  return /^[0-9a-fA-F]{4}$/.test(areaId);
}

function generateLand(edges: Edge, floor: Floor) {
  const floorType = floor.floorType;

  const map: number[][] = [];
  for (const y of range(0, mapSize)) {
    const row: number[] = [];
    for (const x of range(0, mapSize)) {
      row.push(0);
    }
    map.push(row);
  }
  // put walls
  const cornerWall =
    landFromEdge(edges.north) ||
    landFromEdge(edges.east) ||
    landFromEdge(edges.south) ||
    landFromEdge(edges.west) ||
    landDef.mountain;

  map[0][0] = cornerWall;
  map[0][mapSize - 1] = cornerWall;
  map[mapSize - 1][0] = cornerWall;
  map[mapSize - 1][mapSize - 1] = cornerWall;

  // north edge
  if (edges.north.hasEdge) {
    for (const x of range(0, mapSize)) {
      map[0][x] = landFromEdge(edges.north);
    }
  }
  // east edge
  if (edges.east.hasEdge) {
    for (const y of range(0, mapSize)) {
      map[y][mapSize - 1] = landFromEdge(edges.east);
    }
  }
  // south edge
  if (edges.south.hasEdge) {
    for (const x of range(0, mapSize)) {
      map[mapSize - 1][x] = landFromEdge(edges.south);
    }
  }
  // west edge
  if (edges.west.hasEdge) {
    for (const y of range(0, mapSize)) {
      map[y][0] = landFromEdge(edges.west);
    }
  }

  return {
    floorType,
    map,
  };
}

function landFromEdge(edge: EdgeItem): number {
  if (edge.hasEdge) {
    return landDef[edge.kind];
  }
  return 0;
}

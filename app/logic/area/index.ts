import seedrandom from "seedrandom";
import { range } from "~/utils/range";
import { getAreaName } from "./areaName";
import { generateConnection as generateConnections } from "./connection";
import { Edge, EdgeItem, generateEdge } from "./edge";
import { Floor, FloorType, generateFloor } from "./floor";
import { addRandomItems } from "./items";
import { landDef } from "./landDef";
import { mapSize } from "./params";

type Rng = ReturnType<typeof seedrandom>;

export type Area = {
  id: string;
  name: string;
  floorType: FloorType;
  map: AreaMap;
  connections: {
    north: string;
    east: string;
    south: string;
    west: string;
  };
};

export type AreaMap = readonly (readonly number[])[];

export type AreaMinusMap = Omit<Area, "map">;

export function createArea(areaId: string): Area | undefined {
  if (!validateAreaId(areaId)) {
    return undefined;
  }
  const rng = seedrandom(areaId);
  const edges = generateEdge(areaId, rng);
  const floor = generateFloor(rng);
  const connections = generateConnections(rng);
  const name = getAreaName(rng, areaId);

  const land = generateLand(areaId, edges, floor, rng);
  return {
    id: areaId,
    name,
    ...land,
    connections,
  };
}

function validateAreaId(areaId: string): boolean {
  return /^[0-9a-fA-F]{4}$/.test(areaId);
}

function generateLand(areaId: string, edges: Edge, floor: Floor, rng: Rng) {
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
    landDef[edges.default];

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

  // add random walls
  addRandomItems(areaId, map, rng, edges);

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

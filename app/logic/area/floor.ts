import seedrandom from "seedrandom";

type Rng = ReturnType<typeof seedrandom>;

const floorTypeList = [
  "green",
  "red",
  "orange",
  "yellow",
  "blue",
  "purple",
  "brown",
  "black",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
] as const;

export type FloorType = typeof floorTypeList[number];

export type Floor = {
  floorType: FloorType;
};

export function generateFloor(rng: Rng): Floor {
  const floorRnd = rng.int32();
  const floorType = floorTypeList[floorRnd & 15];
  return {
    floorType,
  };
}

import seedrandom from "seedrandom";

type Rng = ReturnType<typeof seedrandom>;

export type Edge = {
  north: EdgeItem;
  east: EdgeItem;
  south: EdgeItem;
  west: EdgeItem;
  default: EdgeKind;
};

const edgeKindList = [
  "woods1", // 🌲
  "woods1", // 🌲
  "woods1", // 🌲
  "woods2", // 🌳
  "woods2", // 🌳
  "woods3", // 🌴
  "mountain", // ⛰
  "mountain", // ⛰
  "mountain", // ⛰
  "rock", // 🗿
  "rock", // 🗿
  "cyclone1", // 🌀
  "cyclone2", // 🌪
  "snowman", // ⛄
  "ruins", // 🏚
  "barber", // 💈
] as const;

export type EdgeKind = typeof edgeKindList[number];

export type EdgeItem =
  | {
      hasEdge: true;
      kind: EdgeKind;
    }
  | {
      hasEdge: false;
    };

export function generateEdge(rng: Rng): Edge {
  const edgeProb = 5; // 5 / 16
  const edgeRand = rng.int32();
  let hasNorthEdge = edgeRand % 16 < edgeProb;
  let hasEastEdge = (edgeRand >> 4) % 16 < edgeProb;
  let hasSouthEdge = (edgeRand >> 8) % 16 < edgeProb;
  let hasWestEdge = (edgeRand >> 12) % 16 < edgeProb;

  if (hasNorthEdge && hasEastEdge && hasSouthEdge && hasWestEdge) {
    // all edges are present
    hasNorthEdge = false;
    hasEastEdge = false;
    hasSouthEdge = false;
    hasWestEdge = false;
  }
  const edgeKind = edgeKindList[(edgeRand >> 16) & 15];

  return {
    north: hasNorthEdge
      ? { hasEdge: true, kind: edgeKind }
      : { hasEdge: false },
    east: hasEastEdge ? { hasEdge: true, kind: edgeKind } : { hasEdge: false },
    south: hasSouthEdge
      ? { hasEdge: true, kind: edgeKind }
      : { hasEdge: false },
    west: hasWestEdge ? { hasEdge: true, kind: edgeKind } : { hasEdge: false },
    default: edgeKind,
  };
}

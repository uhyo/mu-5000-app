import seedrandom from "seedrandom";

type Rng = ReturnType<typeof seedrandom>;

export function generateConnection(rng: Rng) {
  const connectionRand1 = rng.int32();
  const connectionRand2 = rng.int32();
  const north = toAreaId(connectionRand1 & 0xffff);
  const east = toAreaId((connectionRand1 >>> 16) & 0xffff);
  const south = toAreaId(connectionRand2 & 0xffff);
  const west = toAreaId((connectionRand2 >>> 16) & 0xffff);

  return {
    north,
    east,
    south,
    west,
  };
}

function toAreaId(num: number) {
  return num.toString(16).padStart(4, "0");
}

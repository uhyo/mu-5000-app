export const landDef = {
  nothing: 0,
  // walls
  woods1: 1,
  woods2: 2,
  woods3: 3,
  mountain: 4,
  rock: 5,
  cyclone1: 6,
  cyclone2: 7,
  snowman: 8,
  ruins: 9,
  barber: 10,
  // special lands
  cloud: 11,
  kin: 12,
  // items
  mu: 32,
  moneyBag: 33,
  nightMarket: 34,
  pig: 35,
  sheep: 36,
  rooster: 37,
  fire: 38,
  zombie: 39,
  toilet: 40,
  gift: 41,
  hat: 42,
  kid: 43,
  robot: 44,
  farmer: 45,
  scissors: 46,
  departmentStore: 47,
  blood: 48,
  mage: 49,
  soap: 50,
  bathtub: 51,
  mechanic: 52,
  desert: 53,
  sa: 54,
  officeWorker: 55,
  postOffice: 56,
  elf: 57,
  tada: 58,
  gem: 59,
};

export const landChars: Record<number, string | undefined> = {
  [landDef.woods1]: "🌲",
  [landDef.woods2]: "🌳",
  [landDef.woods3]: "🌴",
  [landDef.mountain]: "⛰",
  [landDef.rock]: "🗿",
  [landDef.cyclone1]: "🌀",
  [landDef.cyclone2]: "🌪",
  [landDef.snowman]: "⛄",
  [landDef.ruins]: "🏚",
  [landDef.barber]: "💈",
  [landDef.cloud]: "☁️",
  [landDef.kin]: "🈲",
  [landDef.mu]: "🈚️",
  [landDef.moneyBag]: "💰",
  [landDef.nightMarket]: "🌃",
  [landDef.pig]: "🐖",
  [landDef.sheep]: "🐑",
  [landDef.rooster]: "🐓",
  [landDef.fire]: "🔥",
  [landDef.zombie]: "🧟",
  [landDef.toilet]: "🚽",
  [landDef.gift]: "🎁",
  [landDef.hat]: "🎩",
  [landDef.kid]: "👦",
  [landDef.robot]: "🤖",
  [landDef.farmer]: "🧑‍🌾",
  [landDef.scissors]: "✂️",
  [landDef.departmentStore]: "🏢",
  [landDef.blood]: "🩸",
  [landDef.mage]: "🧙",
  [landDef.soap]: "🧼",
  [landDef.bathtub]: "🛁",
  [landDef.mechanic]: "🧑‍🔧",
  [landDef.desert]: "🏜️",
  [landDef.sa]: "🈂️",
  [landDef.officeWorker]: "🧑‍💼",
  [landDef.postOffice]: "🏣️",
  [landDef.elf]: "🧝",
  [landDef.tada]: "🎉",
  [landDef.gem]: "💎",
};

export function isWall(land: number): boolean {
  return land >= landDef.woods1 && land <= landDef.kin;
}

export function isItem(land: number): boolean {
  return land >= landDef.mu;
}

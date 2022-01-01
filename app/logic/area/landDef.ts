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
};

export function isWall(land: number): boolean {
  return land >= landDef.woods1 && land <= landDef.barber;
}

export function isItem(land: number): boolean {
  return land >= landDef.mu;
}

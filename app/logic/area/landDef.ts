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
};

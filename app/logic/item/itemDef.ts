export const itemTypes = [
  "mu",
  "moneyBag",
  "pig",
  "sheep",
  "rooster",
  "meat",
  "poop",
  "sparkle",
  "gift",
  "santaClaus",
  "police",
  "axe",
  "gear",
] as const;

export type ItemType = typeof itemTypes[number];

export const itemNames: Record<ItemType, string> = {
  mu: "🈚️",
  moneyBag: "💰",
  pig: "🐖",
  sheep: "🐑",
  rooster: "🐓",
  meat: "🍖",
  poop: "💩",
  sparkle: "✨",
  gift: "🎁",
  santaClaus: "🎅",
  police: "👮",
  axe: "🪓",
  gear: "⚙️",
};

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
  "vampire",
  "blood",
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
  vampire: "🧛",
  blood: "🩸",
};

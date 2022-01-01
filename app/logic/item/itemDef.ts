export const itemTypes = ["mu", "moneyBag"] as const;

export type ItemType = typeof itemTypes[number];

export const itemNames: Record<ItemType, string> = {
  mu: "🈚️",
  moneyBag: "💰",
};

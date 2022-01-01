import { ItemMap } from "~/components/items/ItemsStoreContext";

export function getPlayerIcon(items: ItemMap): string {
  if (items.get("santaClaus")) {
    return "🎅";
  }
  if (items.get("police")) {
    return "👮";
  }
  if (items.get("vampire")) {
    return "🧛";
  }
  return "🏃";
}

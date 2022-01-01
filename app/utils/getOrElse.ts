export function getOrElse<K, V>(
  map: ReadonlyMap<K, V>,
  key: K,
  defaultValue: V
): V {
  return map.get(key) ?? defaultValue;
}

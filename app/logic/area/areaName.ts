import seedrandom from "seedrandom";

type Rng = ReturnType<typeof seedrandom>;

export function getAreaName(rng: Rng, areaId: string): string {
  // Special names
  switch (areaId) {
    case "0000":
      return "The Beginning";
    case "ffff":
      return "The Eden";
  }
  const areaIdNum = parseInt(areaId, 16);

  // Generate area name
  const areaNameRnd1 = rng.double();
  const areaNameRnd2 = rng.double();
  const areaNameRnd3 = rng.double();

  const adjective =
    areaIdNum >= 0xfff0
      ? "The Holy"
      : adjectives[Math.floor(areaNameRnd1 * adjectives.length)];
  const noun = nouns[Math.floor(areaNameRnd2 * nouns.length)];
  const suffix =
    areaNameRnd3 < 0.2
      ? " " + adverbs[Math.floor(areaNameRnd3 * adverbs.length)]
      : "";

  const areaName = adjective + " " + noun + suffix;

  return areaName;
}

const adjectives = [
  "Abandoned",
  "Alpine",
  "Brilliant",
  "Barren",
  "Crazy",
  "Curly",
  "Dark",
  "Dangerous",
  "Eerie",
  "Elegant",
  "Fancy",
  "Fantastic",
  "Great",
  "Gorgeous",
  "Haunted",
  "Hazy",
  "Industrial",
  "Intrepid",
  "Jazzy",
  "Jolly",
  "Knitted",
  "Kinky",
  "Lively",
  "Lonely",
  "Majestic",
  "Medieval",
  "Narrow",
  "Nasty",
  "Old",
  "Ominous",
  "Pleasant",
  "Proud",
  "Quaint",
  "Quirky",
  "Rough",
  "Rustic",
  "Stunning",
  "Spiral",
  "Tiny",
  "Tranquil",
  "Ugly",
  "Unusual",
  "Vast",
  "Vibrant",
  "Wicked",
  "Wild",
  "Xenophobic",
  "Xanthic",
  "Yummy",
  "Young",
  "Zany",
  "Zealous",
];

const nouns = [
  "Alley",
  "Anchor",
  "Bazaar",
  "Bay",
  "Canyon",
  "Cove",
  "Dock",
  "Dunes",
  "Estate",
  "Expanse",
  "Field",
  "Forest",
  "Garden",
  "Gulch",
  "Haven",
  "Heights",
  "Island",
  "Isle",
  "Jungle",
  "Junction",
  "Knoll",
  "Kiosk",
  "Lane",
  "Ledge",
  "Meadow",
  "Mesa",
  "Nook",
  "Neighborhood",
  "Oasis",
  "Oval",
  "Pier",
  "Plaza",
  "Quay",
  "Queens",
  "Ridge",
  "Rise",
  "Shore",
  "Shrine",
  "Terrace",
  "Tower",
  "Upland",
  "Underpass",
  "Vale",
  "Village",
  "Walk",
  "Way",
  "Yard",
  "Yurt",
  "Zoo",
];

const adverbs = [
  "of Sorrow",
  "in the Shadow",
  "of the Night",
  "dominated by the Dark",
  "in the Abyss",
  "of Death",
  "of Twilight",
  "from the Hells",
  "of the Dead",
  "of Time",
  "in the Memory",
  "of Happiness",
];

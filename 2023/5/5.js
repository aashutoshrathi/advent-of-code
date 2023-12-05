const { getInputs, sumOfArray } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n\n");

// string looks like this: `a-to-b`
const findAandB = (s) => {
  const [from, to] = s.replace(" map:", "").split("-to-");
  return {
    from,
    to,
  };
};

const partOne = () => {
  const mappings = {};
  const [seedInfo, ...rest] = inputs;
  const seedsToPlant = seedInfo.split(": ")[1].split(" ");

  for (let map of rest) {
    const [mapInfo, ...maps] = map.split("\n");
    const { from, to } = findAandB(mapInfo);

    for (let m of maps) {
      const [dest, source, range] = m.split(" ");
      if (!mappings[from]) {
        mappings[from] = {};
      }
      if (!mappings[from][to]) {
        mappings[from][to] = [];
      }
      mappings[from][to].push([Number(dest), Number(source), Number(range)]);
    }
  }

  const returnValue = (rangesInfo, value) => {
    for (let i = 0; i < rangesInfo.length; i++) {
      const [d, s, r] = rangesInfo[i];
      if (value >= s && value < s + r) {
        return d + (value - s);
      }
    }
    return value;
  };

  const allLocations = seedsToPlant
    .map((s) => {
      const soil = returnValue(mappings["seed"]["soil"], Number(s));

      const fertilizer = returnValue(mappings["soil"]["fertilizer"], soil);

      const water = returnValue(mappings["fertilizer"]["water"], fertilizer);

      const light = returnValue(mappings["water"]["light"], water);

      const temperature = returnValue(mappings["light"]["temperature"], light);

      const humidity = returnValue(
        mappings["temperature"]["humidity"],
        temperature
      );

      return returnValue(mappings["humidity"]["location"], humidity);
    })
    .filter((l) => l !== undefined);

  // console.log(seedsToPlant);
  // console.log(allLocations);
  // min of all locations
  return Math.min(...allLocations);
};

// 24261545
const partTwo = () => {
  let [seedInfo, ...rest] = inputs;
  const seeds = seedInfo.split(": ")[1].split(" ").map(Number);
  let seedRanges = [];

  for (let i = 0; i < seeds.length; ) {
    const min = seeds[i];
    const max = seeds[i] + seeds[i + 1] - 1;
    seedRanges.push([min, max]);
    i += 2;
  }

  const maps = rest.map((r) =>
    r
      .split("\n")
      .slice(1)
      .map((line) => line.split(" ").map(Number))
  );

  for (let map of maps) {
    const movedSeeds = [];

    for (const [d, s, r] of map) {
      const nextRanges = [];
      while (seedRanges.length) {
        const [start, end] = seedRanges.shift();
        if (start >= s && start < s + r) {
          if (end < s + r) {
            movedSeeds.push([start - s + d, end - s + d]);
          } else {
            movedSeeds.push([start - s + d, r - 1 + d]);
            nextRanges.push([s + r, end]);
          }
        } else if (end >= s && end < s + r) {
          movedSeeds.push([d, end - s + d]);
          nextRanges.push([start, s - 1]);
        } else {
          nextRanges.push([start, end]);
        }
      }

      seedRanges = nextRanges;
    }
    seedRanges.push(...movedSeeds);
  }
  return Math.min(...seedRanges.flat());
};

console.log("Res:", partTwo());

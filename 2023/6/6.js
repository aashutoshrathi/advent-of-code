const { getInputs } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

// Quadratic equation
// x^2 - (t)x + d + 1 <= 0
// so between the roots
const findRoots = (b, c) => {
  const D = Math.sqrt(b * b - 4 * c);
  const root1 = (-b + D) / 2;
  const root2 = (-b - D) / 2;
  const roots = [root1, root2].sort((a, b) => a - b);
  return [Math.ceil(roots[0]), Math.floor(roots[1])];
};

const waysToWinARace = (time, distance) => {
  const roots = findRoots(-time, distance + 1);

  const intersection = [Math.max(0, roots[0]), Math.min(roots[1], time)];

  console.log(intersection);
  return intersection[1] - intersection[0] + 1;
};

// 170000
const partOne = () => {
  const [time, distance] = inputs;
  const raceTimes = time
    .split(" ")
    .map((x) => x.match(/(\d+)/))
    .filter((x) => !!x?.[0])
    .map((x) => parseInt(x[0]));

  const raceDistances = distance
    .split(" ")
    .map((x) => x.match(/(\d+)/))
    .filter((x) => !!x?.[0])
    .map((x) => parseInt(x[0]));

  const waysToWinRaces = [];
  for (let i = 0; i < raceTimes.length; i++) {
    waysToWinRaces.push(waysToWinARace(raceTimes[i], raceDistances[i]));
  }

  console.log(waysToWinRaces);
  return waysToWinRaces.reduce((acc, curr) => acc * curr, 1);
};

// 20537782
const partTwo = () => {
  const [time, distance] = inputs;
  const raceTime = Number(
    time
      .split(": ")
      .at(1)
      .split(" ")
      .map((x) => x.trim())
      .join("")
  );

  const raceDistance = Number(
    distance
      .split(": ")
      .at(1)
      .split(" ")
      .map((x) => x.trim())
      .join("")
  );

  return waysToWinARace(raceTime, raceDistance);
};

console.log("Res:", partTwo());

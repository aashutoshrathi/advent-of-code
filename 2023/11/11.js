const { getInputs, sumOfArray } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

const partOne = () => {
  let expandedInputs = [...inputs];

  const numberOfColumns = inputs[0].length;

  // expand columns
  let expandedCols = 0;
  for (let i = 0; i < numberOfColumns; i++) {
    const col = inputs.map((row) => row[i]).join("");
    console.log(`Col ${i}: ${col}`);
    if (!col.includes("#")) {
      expandedCols++;
      console.log(`Expanding col ${i}`);
      expandedInputs = expandedInputs.map((r) => {
        // add a dot next to it.
        return r.slice(0, i + expandedCols) + "." + r.slice(i + expandedCols);
      });
    }
  }

  // expand rows
  expandedInputs = expandedInputs.flatMap((row, i) => {
    if (!row.includes("#")) {
      console.log(`Expanding row ${i}`);
      const newRow = ".".repeat(numberOfColumns + expandedCols);
      return [row, newRow];
    }
    return row;
  });

  const galaxies = [];

  for (let i = 0; i < expandedInputs.length; i++) {
    const row = expandedInputs[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === "#") {
        galaxies.push({ x: j, y: i });
      }
    }
  }

  const distancesBetweenGalaxies = [];

  for (let i = 0; i < galaxies.length; i++) {
    const galaxy1 = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxy2 = galaxies[j];
      const distance =
        Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
      distancesBetweenGalaxies.push(distance);
    }
  }

  console.log(`Input\n${inputs.join("\n")}`, "\n");
  console.log(`Expanded\n${expandedInputs.join("\n")}`, "\n");
  console.log(galaxies);
  console.log(distancesBetweenGalaxies);
  return sumOfArray(distancesBetweenGalaxies);
};

const partTwo = () => {};

console.log("Res:", partOne());

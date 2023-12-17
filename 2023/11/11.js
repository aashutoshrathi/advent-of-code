const { getInputs, sumOfArray, swap } = require("../../lib/utils");

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

const partTwo = (exp_factor = 2) => {
  const emptyColumns = [];
  inputs[0].split("").forEach((_, i) => {
    const col = inputs.map((row) => row[i]).join("");
    if (!col.includes("#")) {
      emptyColumns.push(i);
    }
  });

  const emptyRows = [];
  inputs.forEach((row, i) => {
    if (!row.includes("#")) {
      emptyRows.push(i);
    }
  });

  console.log(`Empty cols: ${emptyColumns}`);
  console.log(`Empty rows: ${emptyRows}`);

  const galaxies = [];

  for (let i = 0; i < inputs.length; i++) {
    const row = inputs[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === "#") {
        galaxies.push({ x: j, y: i });
      }
    }
  }
  console.log(galaxies);

  const numberOfEmptyColumns = (xa, xb) => {
    if (xa > xb) {
      [xa, xb] = swap(xa, xb);
    }
    let cols = 0;
    for (let i = xa; i < xb; i++) {
      if (emptyColumns.includes(i)) {
        cols++;
      }
    }
    return cols;
  };

  const numberOfEmptyRows = (ya, yb) => {
    if (ya > yb) {
      [ya, yb] = swap(ya, yb);
    }
    let rows = 0;
    for (let i = ya; i < yb; i++) {
      if (emptyRows.includes(i)) {
        rows++;
      }
    }
    return rows;
  };

  const distancesBetweenGalaxies = [];

  for (let i = 0; i < galaxies.length; i++) {
    const g1 = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const g2 = galaxies[j];
      let distance = Math.abs(g1.x - g2.x) + Math.abs(g1.y - g2.y);

      distance +=
        (exp_factor - 1) *
        (numberOfEmptyColumns(g1.x, g2.x) + numberOfEmptyRows(g1.y, g2.y));
      distancesBetweenGalaxies.push(distance);
    }
  }

  console.log(distancesBetweenGalaxies);
  return sumOfArray(distancesBetweenGalaxies);
};

console.log("Res:", partTwo(1_000_000));

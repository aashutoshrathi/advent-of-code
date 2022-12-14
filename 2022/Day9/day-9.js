const fs = require("fs");

const parseInputToObjects = (input) => {
  const lines = input.split("\n");
  return lines.map((line) => {
    const vals = line.split(" ");
    return [vals[0], parseInt(vals[1])];
  });
};

const getDelta = (direction) => {
  let x = 0,
    y = 0;
  switch (direction) {
    case "R":
      x = 1;
      break;
    case "L":
      x = -1;
      break;
    case "U":
      y = 1;
      break;
    case "D":
      y = -1;
      break;
  }
  return [x, y];
};

const solveIt = (parsedInputs, knots) => {
  const visitedCoords = new Set();
  H = [0, 0];
  T = [0, 0];
  const knotMemory = Array(knots)
    .fill(0)
    .map(() => [0, 0]);

  const updateTailCoords = (H, T) => {
    const diffs = [H[0] - T[0], H[1] - T[1]];

    if (Math.abs(diffs[0]) > 1 || Math.abs(diffs[1]) > 1) {
      if (diffs[0] && diffs[1]) {
        T[0] += Math.sign(diffs[0]);
        T[1] += Math.sign(diffs[1]);
      } else {
        T[0] += Math.floor(diffs[0] / 2);
        T[1] += Math.floor(diffs[1] / 2);
      }
    }
  };

  parsedInputs.forEach((input) => {
    const [direction, distance] = input;

    for (let i = 0; i < distance; i++) {
      const [deltaX, deltaY] = getDelta(direction);

      knotMemory[0][0] += deltaX;
      knotMemory[0][1] += deltaY;

      if (knots === 1) {
        H = knotMemory[0];
        updateTailCoords(H, T);
        visitedCoords.add(T.join(","));
      } else {
        for (let j = 0; j < knots - 1; j++) {
          H = knotMemory[j];
          T = knotMemory[j + 1];
          updateTailCoords(H, T);
        }
        visitedCoords.add(knotMemory.at(-1).join(","));
      }
    }
  });

  return visitedCoords.size;
};

const main = (args) => {
  const useSampleInput = args[0] === "y";
  const useB = args[1] === "b"; // can be or 'a' or 'b'

  const input = fs
    .readFileSync(`./${useSampleInput ? "sample-" : ""}input.txt`)
    .toString();

  const parsedInputs = parseInputToObjects(input);
  const uniquePlaces = solveIt(parsedInputs, useB ? 10 : 1);
  console.log(uniquePlaces);
};

main(process.argv.slice(2));

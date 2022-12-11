const fs = require("fs");

const parseInputToObjects = (input) => {
  const lines = input.split("\n");
  return lines.map((line) => {
    if (line === "noop") {
      return [1, 0];
    } else {
      return [2, parseInt(line.split(" ")[1])];
    }
  });
};

const solveIt = (parsedInputs) => {
  const signalStrengths = [];
  const CRT_WIDTH = 40;

  let currentCycle = 0;
  let spritePosition = 1;

  parsedInputs.forEach((input) => {
    const [cyclesTaken, addition] = input;
    for (let i = 0; i < cyclesTaken; i++) {
      // console.log("Sprite", spritePosition, "Cycle", currentCycle);
      const modCycle = currentCycle % CRT_WIDTH;

      if (Math.abs(spritePosition - modCycle) <= 1) {
        process.stdout.write(modCycle === 0 ? "\n#" : "#");
      } else {
        process.stdout.write(modCycle === 0 ? "\n." : ".");
      }
      currentCycle++;
    }
    // console.log("Now add,", addition);
    spritePosition = (spritePosition + addition) % CRT_WIDTH;
  });

  return signalStrengths;
};

const main = (args) => {
  const useSampleInput = args[0] === "y";

  const input = fs
    .readFileSync(`./${useSampleInput ? "sample-" : ""}input.txt`)
    .toString();

  const parsedInputs = parseInputToObjects(input);
  const signalStrengths = solveIt(parsedInputs);
};

// node day-10.b.js n
main(process.argv.slice(2));

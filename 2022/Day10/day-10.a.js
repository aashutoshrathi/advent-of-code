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

const solveIt = (parsedInputs, useB) => {
  const signalStrengths = [];
  const measureCycles = [20, 60, 100, 140, 180, 220];

  let measureCycleIndex = 0;
  let currentCycle = 0;
  let signalStrength = 1;

  parsedInputs.forEach((input) => {
    const [cyclesTaken, addition] = input;
    if (currentCycle + cyclesTaken >= measureCycles[measureCycleIndex]) {
      // console.log(measureCycles[measureCycleIndex], signalStrength);
      signalStrengths.push(signalStrength * measureCycles[measureCycleIndex]);
      measureCycleIndex++;
    }
    signalStrength += addition;
    currentCycle += cyclesTaken;
  });

  return signalStrengths;
};

const main = (args) => {
  const useSampleInput = args[0] === "y";
  const useB = args[1] === "b"; // can be or 'a' or 'b'

  const input = fs
    .readFileSync(`./${useSampleInput ? "sample-" : ""}input.txt`)
    .toString();

  const parsedInputs = parseInputToObjects(input);
  const signalStrengths = solveIt(parsedInputs, useB);
  // console.log(signalStrengths);
  const result = signalStrengths.reduce((a, b) => a + b, 0);
  console.log(result);
};

main(process.argv.slice(2));

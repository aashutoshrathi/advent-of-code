const { getInputs, sumOfArray, swap } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

const countOfChar = (str, char) => {
  return str.split("").reduce((acc, curr) => {
    if (curr === char) return acc + 1;
    return acc;
  }, 0);
};

const solveForRow = (g, s) => {
  const minDotsReq = s.length - 1;
  const numberOfHashes = countOfChar(g, "#");

  const hashesReq = sumOfArray(s) - numberOfHashes;
  const numberOfUnknows = countOfChar(g, "?");
  console.log({ minDotsReq, hashesReq, numberOfUnknows });
};

const partOne = () => {
  const groups = [];
  const sequences = [];
  inputs.forEach((input) => {
    const [g, s] = input.split(" ");
    // groups.push(g);
    // sequences.push(s.split(",").map(Number));

    solveForRow(g, s.split(",").map(Number));
  });

  console.log(groups);
  console.log(sequences);
};

const partTwo = () => {};

console.log("Res:", partOne());

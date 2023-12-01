const fs = require("fs");

const parseInputs = (input) => {
  const lines = input.split("\n");
  return lines.map((line) => {
    const vals = line.split("\n").map((val) => parseInt(val));
    return vals.reduce((acc, val) => acc + val, 0);
  });
};

const solveIt = (parsedInputs) => {
  return parsedInputs.sort((a, b) => b - a);
};

const main = (args) => {
  const useSampleInput = args[0] === "y";
  const useB = args[1] === "b"; // can be or 'a' or 'b'

  const input = fs
    .readFileSync(`./${useSampleInput ? "sample-" : ""}input.txt`)
    .toString();

  const parsedInputs = parseInputs(input);
};

main(process.argv.slice(2));

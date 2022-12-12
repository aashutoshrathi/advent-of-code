const fs = require("fs");

const findAllUniqueMatches = (strs) => {
  const [first, ...rest] = strs;
  const matches = [];
  first.split("").forEach((c) => {
    if (rest.every((r) => r.includes(c))) {
      matches.push(c);
    }
  });
  return [...new Set(matches)];
};

const parseInputs = (input, useB) => {
  const lines = input.split("\n");
  if (useB) {
    const mergedLines = [];
    for (let i = 0; i < lines.length - 2; i += 3) {
      mergedLines.push([lines[i], lines[i + 1], lines[i + 2]]);
    }
    return mergedLines;
  }
  return lines.map((line) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2),
  ]);
};

const solveIt = (parsedInputs) => {
  let priorities = 0;
  parsedInputs.forEach((i) => {
    const uniq = findAllUniqueMatches(i);
    priorities += uniq.reduce((acc, c) => {
      if (c.charCodeAt(0) >= 98) {
        return acc + c.charCodeAt(0) - 96;
      }
      return acc + c.charCodeAt(0) - 38;
    }, 0);
  });
  return priorities;
};

const main = (args) => {
  const useSampleInput = args[0] === "y";
  const useB = args[1] === "b"; // can be or 'a' or 'b'

  const input = fs
    .readFileSync(`./${useSampleInput ? "sample-" : ""}input.txt`)
    .toString();

  const parsedInputs = parseInputs(input, useB);
  const res = solveIt(parsedInputs);
  console.log(res);
};

main(process.argv.slice(2));

const fs = require("fs");

const parseInputs = (input) => {
  const lines = input.split("\n");
  return lines.map((line) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2),
  ]);
};

const solveIt = (parsedInputs) => {
  let priorities = 0;
  parsedInputs.forEach((i) => {
    const matches = [];
    i[0].split("").forEach((c) => {
      if (i[1].includes(c)) {
        matches.push(c);
      }
    });
    const uniq = [...new Set(matches)];
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

  const parsedInputs = parseInputs(input);
  const res = solveIt(parsedInputs);
  console.log(res);
};

main(process.argv.slice(2));

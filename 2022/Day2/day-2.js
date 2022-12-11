const fs = require("fs");

const parseInput = (input, useB) => {
  const lines = input.split("\n");
  return lines.map((line) =>
    line.split(" ").map((val) => {
      if (val <= "C") {
        return val.charCodeAt(0) - 64;
      } else if (val <= "Z") {
        const charCode = val.charCodeAt(0) - 88;
        return useB ? charCode * 3 : charCode + 1;
      }
    })
  );
};

const solveItA = (parsedInput) => {
  let score = 0;
  parsedInput.forEach((i) => {
    score += i[1];
    if (i[0] === i[1]) {
      score += 3;
    }
    if ((i[0] - i[1] + 3) % 3 === 2) {
      score += 6;
    }
  });

  return score;
};

const solveItB = (parsedInput) => {
  let score = 0;
  parsedInput.forEach((i) => {
    score += i[1];

    if (i[1] === 0) {
      score += ((i[0] - 1) % 3) + 3 * ((i[0] - 1) % 3 === 0);
    }
    if (i[1] === 3) {
      score += i[0];
    }
    if (i[1] === 6) {
      score += ((i[0] + 1) % 3) + 3 * ((i[0] + 1) % 3 === 0);
    }
  });

  return score;
};

const main = (args) => {
  const useSampleInput = args[0] === "y";
  const useB = args[1] === "b"; // can be or 'a' or 'b'

  const input = fs
    .readFileSync(`./${useSampleInput ? "sample-" : ""}input.txt`)
    .toString();

  const parsedInputs = parseInput(input, useB);
  const score = useB ? solveItB(parsedInputs) : solveItA(parsedInputs);
  console.log(score);
};

main(process.argv.slice(2));

const { getInputs } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

const partOne = () => {
  const [x] = inputs;
  return 1;
};

const partTwo = () => {
  return 2;
};

console.log("Res:", partOne());

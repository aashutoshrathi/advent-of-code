const fs = require("fs");

const sumOfArray = (arr) => arr.reduce((acc, curr) => acc + curr, 0);
const getInputs = (filePath) => fs.readFileSync(filePath, "utf8").split("\n");

const isNonAlphaNonDotNumeric = (str) => {
  return str.length === 1 && str.match(/[^a-zA-Z0-9.]/i);
};

module.exports = {
  sumOfArray,
  getInputs,
  isNonAlphaNonDotNumeric,
};

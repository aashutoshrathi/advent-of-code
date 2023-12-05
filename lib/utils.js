const fs = require("fs");

const sumOfArray = (arr) => arr.reduce((acc, curr) => acc + curr, 0);
const getInputs = (filePath, splitter = "\n") =>
  fs.readFileSync(filePath, "utf8").split(splitter);

const isNonAlphaNumeric = (str) => {
  return str.match(/[^a-zA-Z0-9]/);
};

const isNonAlphaNumericNonDot = (str) => {
  return str.match(/[^a-zA-Z0-9.]/);
};

module.exports = {
  sumOfArray,
  getInputs,
  isNonAlphaNumericNonDot,
  isNonAlphaNumeric,
};

const {
  getInputs,
  sumOfArray,
  isNonAlphaNumericNonDot,
} = require("../../lib/utils");

// check if there is a symbol around the number in matrix, even diagonally
const hasSymbolAroundIt = (matrix, x, y, len) => {
  let above = false;
  let below = false;
  let around = false;

  if (x > 0) {
    if (isNonAlphaNumericNonDot(matrix[y][x - 1])) {
      around = true;
    }
  }

  if (x + len < matrix[y].length) {
    if (isNonAlphaNumericNonDot(matrix[y][x + len])) {
      around = true;
    }
  }

  if (around) {
    return true;
  }

  if (y > 0) {
    above = Array.from({ length: len }).some((_, i) => {
      if (x + i < matrix[y - 1].length) {
        if (isNonAlphaNumericNonDot(matrix[y - 1][x + i])) {
          return true;
        }
      }
      return false;
    });

    // check -1
    if (x - 1 >= 0) {
      if (isNonAlphaNumericNonDot(matrix[y - 1][x - 1])) {
        above = true;
      }
    }

    if (x + len < matrix[y - 1].length) {
      if (isNonAlphaNumericNonDot(matrix[y - 1][x + len])) {
        above = true;
      }
    }
  }

  if (above) {
    return true;
  }

  if (y < matrix.length - 1) {
    below = Array.from({ length: len }).some((_, i) => {
      if (isNonAlphaNonDotNumeric(matrix[y + 1][x + i])) {
        return true;
      }
    });

    // check -1
    if (x - 1 >= 0) {
      if (isNonAlphaNonDotNumeric(matrix[y + 1][x - 1])) {
        below = true;
      }
    }

    if (x + len < matrix[y + 1].length) {
      if (isNonAlphaNonDotNumeric(matrix[y + 1][x + len])) {
        below = true;
      }
    }
  }

  if (below) {
    return true;
  }
};

const main = () => {
  const input = getInputs(`${__dirname}/input.txt`);
  const toSum = [];
  const copy = [...input];
  for (let i = 0; i < input.length; ) {
    const match = copy[i].match(/\d+/);
    if (match) {
      const number = Number(match[0]);

      if (hasSymbolAroundIt(input, match.index, i, match[0].length)) {
        toSum.push(number);
      }
      // replace the matched number with dots
      copy[i] = copy[i].replace(match[0], ".".repeat(match[0].length));
    } else {
      i++;
    }
  }

  const sum = sumOfArray(toSum);
  console.log(toSum);
  return sum;
};

console.log(main());

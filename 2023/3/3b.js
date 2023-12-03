const { getInputs, sumOfArray } = require("../../lib/utils");

const isStar = (str) => {
  return str.length === 1 && str.match(/[*]/);
};

// check if there is a symbol around the number in matrix, even diagonally
const findGear = (matrix, x, y, len) => {
  if (x > 0) {
    if (isStar(matrix[y][x - 1])) {
      return [x - 1, y];
    }
  }

  if (x + len < matrix[y].length) {
    if (isStar(matrix[y][x + len])) {
      return [x + len, y];
    }
  }

  if (y > 0) {
    for (let i = 0; i < len; i++) {
      if (x + i < matrix[y - 1].length) {
        if (isStar(matrix[y - 1][x + i])) {
          return [x + i, y - 1];
        }
      }
    }

    // check -1
    if (x - 1 >= 0) {
      if (isStar(matrix[y - 1][x - 1])) {
        return [x - 1, y - 1];
      }
    }

    if (x + len < matrix[y - 1].length) {
      if (isStar(matrix[y - 1][x + len])) {
        return [x + len, y - 1];
      }
    }
  }

  if (y < matrix.length - 1) {
    for (let i = 0; i < len; i++) {
      if (x + i < matrix[y + 1].length) {
        if (isStar(matrix[y + 1][x + i])) {
          return [x + i, y + 1];
        }
      }
    }

    // check -1
    if (x - 1 >= 0) {
      if (isStar(matrix[y + 1][x - 1])) {
        return [x - 1, y + 1];
      }
    }

    if (x + len < matrix[y + 1].length) {
      if (isStar(matrix[y + 1][x + len])) {
        return [x + len, y + 1];
      }
    }
  }
};

const main = () => {
  const input = getInputs(`${__dirname}/input.txt`);
  const toSum = [];
  const gearNumbers = {};

  const copy = [...input];

  for (let i = 0; i < input.length; ) {
    const match = copy[i].match(/\d+/);
    if (match) {
      const gearCoords = findGear(input, match.index, i, match[0].length);
      if (gearCoords) {
        const key = gearCoords.join("--");
        if (!gearNumbers[key]) {
          gearNumbers[key] = [];
        }
        gearNumbers[key].push(Number(match[0]));
      }
      // replace the matched number with dots
      copy[i] = copy[i].replace(match[0], ".".repeat(match[0].length));
    } else {
      i++;
    }
  }

  Object.keys(gearNumbers).forEach((key) => {
    if (gearNumbers[key].length === 2) {
      // console.log(gearNumbers[key]);
      toSum.push(gearNumbers[key][0] * gearNumbers[key][1]);
    }
  });

  console.log(toSum);
  return sumOfArray(toSum);
};

console.log(main());
// 72246648

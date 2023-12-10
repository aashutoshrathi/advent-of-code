const { getInputs } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

/**
 * The pipes are arranged in a two-dimensional grid of tiles:

| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
*/

const getNextPipes = (matrix, x, y) => {
  const currentPipe = matrix[x][y];
  const nextPipes = [];
  if (
    x > 0 &&
    "|7F".includes(matrix[x - 1][y]) &&
    "|LJS".includes(currentPipe)
  ) {
    nextPipes.push([x - 1, y]);
  }
  if (
    x < matrix.length - 1 &&
    "|LJ".includes(matrix[x + 1][y]) &&
    "|7FS".includes(currentPipe)
  ) {
    nextPipes.push([x + 1, y]);
  }
  if (
    y > 0 &&
    "-LF".includes(matrix[x][y - 1]) &&
    "-J7S".includes(currentPipe)
  ) {
    nextPipes.push([x, y - 1]);
  }
  if (
    y < matrix[x].length - 1 &&
    "-J7".includes(matrix[x][y + 1]) &&
    "-LFS".includes(currentPipe)
  ) {
    nextPipes.push([x, y + 1]);
  }
  console.log(
    currentPipe,
    "->",
    nextPipes.map(([x, y]) => matrix[x][y])
  );

  return nextPipes;
};

const getLongestPath = (matrix, startingPoint) => {
  const [x, y] = startingPoint;
  const queue = [[x, y, 0]];
  const visited = [];
  for (let i = 0; i < matrix.length; i++) {
    visited[i] = Array(matrix[i].length).fill(false);
  }

  let longestPath = 0;
  while (queue.length > 0) {
    const [x, y, path] = queue.shift();
    visited[x][y] = true;
    const nextPipes = getNextPipes(matrix, x, y).filter(
      ([x, y]) => !visited[x][y]
    );
    if (nextPipes.length === 0) {
      longestPath = Math.max(longestPath, path);
      continue;
    }
    for (let i = 0; i < nextPipes.length; i++) {
      const [x, y] = nextPipes[i];
      visited[x][y] = true;
      queue.push([x, y, path + 1]);
    }
  }

  return longestPath;
};

const partOne = () => {
  const matrix = inputs;
  let startingPoint = [0, 0];
  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    const startingIndex = row.indexOf("S");
    if (startingIndex > -1) {
      startingPoint = [i, startingIndex];
      break;
    }
  }

  const longestPath = getLongestPath(matrix, startingPoint);

  return longestPath;
};

const partTwo = () => {};

console.log("Res ->", partOne());

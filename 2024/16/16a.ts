const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const INT_MAX = Infinity;

const main = () => {
  const inputs = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const maze = inputs.map((row) => row.split(""));
  const start = [0, 0]
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === "S") {
        start[0] = i
        start[1] = j
      }
    }
  }

  function printMaze(pt: number[]) {
    console.log("\x1Bc")
    const temp = Array.from({ length: maze.length }, () => Array.from({ length: maze[0].length }, () => ""));

    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (pt[0] === i && pt[1] === j) {
          temp[i][j] = "@"
        } else {
          temp[i][j] = maze[i][j]
        }
      }
    }

    console.log(temp.map(row => row.join("")).join("\n"));
    let wait = 100;
    if (maze[pt[0]][pt[1]] === "E") {
      wait = 1000;
    }
    const waitTill = new Date(new Date().getTime() + wait);
    while (waitTill > new Date()) { }
    console.log("\n")
  }

  const DIR_TO_MOVEMENT: Record<number, number[]> = {
    0: [-1, 0],  // UP
    1: [0, 1],   // RIGHT
    2: [1, 0],   // DOWN
    3: [0, -1]   // LEFT
  };

  const cache: Record<string, number> = {}

  const walkTheMaze = (
    curr: number[],
    currentFace: number,
    score: number,
    visited: Set<string> = new Set()
  ): number => {
    const [x, y] = curr;
    const posKey = `${x},${y}`;
    const cacheKey = `${posKey},${currentFace}`;
    // Bounds and wall check
    if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length || maze[x][y] === "#" || visited.has(posKey)) {
      return INT_MAX;
    }

    // printMaze([x, y])

    // End condition
    if (maze[x][y] === "E") {
      return 0;
    }

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
    // Mark position as visited
    visited.add(posKey);
    const availableMoves = [currentFace, (currentFace + 1) % 4, (currentFace + 3) % 4];

    let min = INT_MAX;
    for (const move of availableMoves) {
      const [dx, dy] = DIR_TO_MOVEMENT[move];
      const nextPos = [x + dx, y + dy];

      const nextVisited = new Set(visited);
      const res = walkTheMaze(nextPos, move, 0, nextVisited);
      // printMaze([x, y])
      const nextScore = res + score + (move !== currentFace ? 1001 : 1)
      min = Math.min(min, nextScore);
    }

    visited.delete(posKey);
    cache[cacheKey] = min;
    return min;
  }

  const res = walkTheMaze(start, 1, 0)
  return res;
}
console.log(main());
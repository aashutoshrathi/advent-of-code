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

  const DIR_TO_MOVEMENT: Record<number, number[]> = {
    0: [-1, 0],
    1: [0, 1],
    2: [1, 0],
    3: [0, -1]
  }

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

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    // End condition
    if (maze[x][y] === "E") {
      return 0;
    }

    // Mark position as visited
    visited.add(posKey);

    // Try moves: straight, right turn, left turn
    const availableMoves = [currentFace, (currentFace + 1) % 4, (currentFace + 3) % 4];

    let min = INT_MAX;
    for (const move of availableMoves) {
      const [dx, dy] = DIR_TO_MOVEMENT[move];
      const nextPos = [x + dx, y + dy];
      // Create new visited set for each path
      const nextVisited = new Set(visited);
      const res = walkTheMaze(nextPos, move, 0, nextVisited);
      if (res !== INT_MAX) {
        const nextScore = res + score + (move !== currentFace ? 1001 : 1);
        // console.log(`At ${x},${y} with face ${currentFace} trying move ${move} to ${nextPos} with score ${nextScore} got ${res}`)
        min = Math.min(min, nextScore);
      }
    }

    visited.delete(posKey);
    cache[cacheKey] = min;
    return min;
  }

  const res = walkTheMaze(start, 1, 0)
  // console.log(visited.map((row) => row.map((cell) => cell ? "X" : ".").join("")).join("\n"))
  return res;
}
console.log(main());
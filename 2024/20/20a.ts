const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const bfs = (grid: string[][], start: number[], end: number[]) => {
  const queue = [start];
  const visited = new Set<string>();
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let steps = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift() || [];
      if (x === end[0] && y === end[1]) {
        return steps;
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length || grid[nx][ny] === "#" || visited.has(`${nx},${ny}`)) {
          continue;
        }
        queue.push([nx, ny]);
        visited.add(`${nx},${ny}`);
      }
    }
    steps += 1;
  }

  return -1;
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const grid = Array.from({ length: ips.length }, () => Array.from({ length: ips[0].length }, () => "."));
  const start = [0, 0];
  const end = [grid.length - 1, grid[0].length - 1];

  const walls = new Set<string>();

  for (let i = 0; i < ips.length; i++) {
    for (let j = 0; j < ips[i].length; j++) {
      grid[i][j] = ips[i][j];
      if (grid[i][j] === "S") {
        start[0] = i;
        start[1] = j;
      }
      if (grid[i][j] === "E") {
        end[0] = i;
        end[1] = j;
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "#") {
        let canBeReached = 4;
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = i + dx;
          const ny = j + dy;
          if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length || grid[nx][ny] === "#") {
            canBeReached -= 1;
          }
        }
        if (canBeReached > 0) {
          walls.add(`${i},${j}`);
        }
      }
    }
  }

  const cheats: Record<number, Set<string>> = {};

  const best = bfs(grid, start, end);

  for (const wall of walls) {
    const [x, y] = wall.split(",").map(Number);
    const copyGrid = grid.map((row) => [...row]);
    copyGrid[x][y] = ".";
    const steps = bfs(copyGrid, start, end);

    if (steps !== -1 && best - steps >= 100) {
      console.log(`Wall: ${x},${y} saves ${best - steps} steps`);
      if (!cheats[best - steps]) {
        cheats[best - steps] = new Set();
      }
      cheats[best - steps].add(`${x},${y}`);
    }
  }

  const sum = Object.keys(cheats).reduce((acc, key) => acc + Number(cheats[key as any as number].size), 0);
  console.log(`Total cheats: ${sum}`);
}

console.time("Time");
console.log(main());
console.timeEnd("Time");

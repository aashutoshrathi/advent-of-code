const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const printGrid = (grid: string[][]) => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
}

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
    steps++;
  }

  return -1;
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const DIM = 71;
  const BYTES_TO_SIMULATE = 1024;
  const GRID = Array.from({ length: DIM }, () => Array.from({ length: DIM }, () => "."));
  const bytes = ips.map((ip) => ip.split(',').map((x) => Number(x)));

  for (let i = 0; i < BYTES_TO_SIMULATE; i++) {
    const [y, x] = bytes[i];
    if (x < 0 || x >= DIM || y < 0 || y >= DIM) {
      console.log("Invalid coordinates");
      continue;
    }
    GRID[x][y] = "#";
  }

  printGrid(GRID);

  const start = [0, 0];
  const end = [DIM - 1, DIM - 1];

  const shortestPath = bfs(GRID, start, end);

  return shortestPath;
}

console.time("Time");
console.log(main());
console.timeEnd("Time");

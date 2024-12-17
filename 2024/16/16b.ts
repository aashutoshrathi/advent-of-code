const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

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

  const ptWiseMinScore: Record<string, number> = {}

  let queue: any[][] = [[...start, 1, 0, '']];
  let res = Infinity;
  const paths = [];

  while (queue.length) {
    const newQueue: number[][] = [];
    for (const pt of queue) {
      const [x, y, face, score] = pt;
      let path = pt[4];
      const posKey = `${x},${y}`;
      const cacheKey = `${posKey},${face}`;
      // Bounds and wall check
      if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length || maze[x][y] === "#") {
        continue;
      }

      path += `${posKey}->`;

      if (ptWiseMinScore[cacheKey] && ptWiseMinScore[cacheKey] < score) {
        continue;
      }

      ptWiseMinScore[cacheKey] = score;
      // printMaze([x, y])

      // End condition
      if (maze[x][y] === "E") {
        console.log(path, score, path.split("->").length)
        paths.push([path, score]);
        if (score < res) {
          res = score;
        }
        continue;
      }
      const availableMoves = [face, (face + 1) % 4, (face + 3) % 4];

      for (const move of availableMoves) {
        const [dx, dy] = DIR_TO_MOVEMENT[move];
        const nextPos = [x + dx, y + dy];
        const nextScore = score + (face === move ? 1 : 1001);
        newQueue.push([...nextPos, move, nextScore, path]);
      }
    }

    queue = newQueue;
  }

  const uniqueSeats: Set<string> = new Set();
  const bestPaths = paths.filter((path) => path[1] === res);

  for (const [path] of bestPaths) {
    const seats = path.split("->");
    for (const seat of seats) {
      if (seat === "") {
        continue;
      }
      uniqueSeats.add(seat);
    }
  }

  console.log(uniqueSeats.size, [...uniqueSeats])
  return res;
}
console.log(main());
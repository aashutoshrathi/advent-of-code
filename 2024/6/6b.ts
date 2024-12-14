const INPUT_FILE = "./input.txt";

const GUARD = "^";
const OBSTACLE = "#";

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const map = Array.from({ length: ips.length }, () => Array.from({ length: ips[0].length }, () => ''));

  let gLoc = [0, 0];
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < ips.length; i++) {
    for (let j = 0; j < ips[0].length; j++) {
      map[i][j] = ips[i][j];
      if (ips[i][j] === GUARD) {
        gLoc = [i, j];
      }
    }
  }

  const walkThePath = (grid: string[][]) => {
    let cur = [...gLoc];
    const obTracking: Set<string> = new Set();
    let gDir: 0 | 1 | 2 | 3 = 0;

    while (1) {
      const intent = directions[gDir];
      const next = [cur[0] + intent[0], cur[1] + intent[1]];

      if (next[0] < 0 || next[0] >= map.length || next[1] < 0 || next[1] >= map[0].length) {
        break;
      }

      if (grid[next[0]][next[1]] === OBSTACLE) {
        gDir = (gDir + 1) % 4;
        continue;
      }

      const id = [...next, gDir].join(',');
      if (obTracking.has(id)) {
        return 1;
      }
      obTracking.add(id);

      cur = [...next];
    }
    console.log(`Exiting path: ${cur}`);
    return 0;
  };

  let res = 0;
  for (let i = 0; i < ips.length; i++) {
    for (let j = 0; j < ips[0].length; j++) {
      if (map[i][j] === OBSTACLE) {
        continue;
      }
      const grid = JSON.parse(JSON.stringify(map));
      grid[i][j] = OBSTACLE;
      const walk = walkThePath(grid);
      if (walk) {
        res += 1;
        console.log(`Path: ${i}, ${j} has a loop`);
      } else {
        console.log(`Path: ${i}, ${j} has no loop`);
      }
    }
  }

  return res;
};

// your answer is too low
console.log(main());

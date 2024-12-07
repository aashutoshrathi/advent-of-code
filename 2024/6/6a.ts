const INPUT_FILE = "./input.txt";

const printMap = (map: string[][]) => {
  for (let i = 0; i < map.length; i++) {
    console.log(map[i].join(""));
  }
}

const GUARD = "^";
const OBSTACLE = "#";

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const map = Array.from({ length: ips.length }, () => Array.from({ length: ips[0].length }, () => ''));
  const visited = Array.from({ length: ips.length }, () => Array.from({ length: ips[0].length }, () => false));

  let gLoc = [0, 0];
  let gDir: 0 | 1 | 2 | 3 = 0;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  const obstacleMap: Record<string, boolean> = {}
  for (let i = 0; i < ips.length; i++) {
    for (let j = 0; j < ips[0].length; j++) {
      map[i][j] = ips[i][j];
      if (ips[i][j] === GUARD) {
        gLoc = [i, j];
      }
      if (ips[i][j] === OBSTACLE) {
        obstacleMap[`${i},${j}`] = true;
      }
    }
  }

  let res = 1;
  while (1) {
    // console.log(`Guard Location: ${gLoc}, Guard Direction: ${gDir}`);
    const next = [gLoc[0] + directions[gDir][0], gLoc[1] + directions[gDir][1]];

    if (next[0] < 0 || next[0] >= map.length || next[1] < 0 || next[1] >= map[0].length) {
      break;
    }

    if (map[next[0]][next[1]] === OBSTACLE) {
      gDir = (gDir + 1) % 4;
      // console.log(printMap(mapCopy));
      continue;
    }

    if (!visited[gLoc[0]][gLoc[1]]) {
      res += 1;
      visited[gLoc[0]][gLoc[1]] = true;
    }

    gLoc = next;
  }

  return res;
};

console.log(main());

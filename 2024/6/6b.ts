const INPUT_FILE = "./input.txt";

const GUARD = "^";
const OBSTACLE = "#";

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const map = Array.from({ length: ips.length }, () => Array.from({ length: ips[0].length }, () => ''));

  let gLoc = [0, 0];
  let gDir: 0 | 1 | 2 | 3 = 0;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < ips.length; i++) {
    for (let j = 0; j < ips[0].length; j++) {
      map[i][j] = ips[i][j];
      if (ips[i][j] === GUARD) {
        gLoc = [i, j];
      }
    }
  }

  const gInit = [...gLoc];

  const obstruction: Set<string> = new Set();
  const lastObstacles: number[][] = [];
  const obstaclesMap: Record<string, Set<number>> = {};

  while (1) {
    // console.log(`Guard Location: ${gLoc}, Guard Direction: ${gDir}`);
    const intent = directions[gDir];
    const next = [gLoc[0] + intent[0], gLoc[1] + intent[1]];

    if (next[0] < 0 || next[0] >= map.length || next[1] < 0 || next[1] >= map[0].length) {
      break;
    }

    if (map[next[0]][next[1]] === OBSTACLE) {
      const obCord = `${next[0]},${next[1]}`;
      if (!obstaclesMap[obCord]) {
        obstaclesMap[obCord] = new Set();
      }
      obstaclesMap[obCord].add(gDir);
      lastObstacles.push([next[0], next[1]]);
      gDir = (gDir + 1) % 4;
      continue;
    }

    // the idea here being, if we check the obstacles except last 2, and if any of them are either in exactly in our right direction OR we have already visited them facing the same direction as we would if we turn right now.

    if (next.join(',') !== gInit.join(',')) { // since start location can't be one of the obstruction
      for (let i = lastObstacles.length - 3; i >= 0; i -= 1) {
        const targetOb = lastObstacles[i];
        const nextDir = (gDir + 1) % 4;
        if ((targetOb?.[0] === gLoc[0] || targetOb?.[1] === gLoc[1]) && obstaclesMap[`${targetOb[0]},${targetOb[1]}`]?.has(nextDir)) {
          // console.log(`I'm at ${gLoc}`);
          // console.log(`Obstruction at ${targetOb}`);

          if (Math.sign(directions[nextDir][0]) === Math.sign(targetOb[0] - gLoc[0]) && Math.sign(directions[nextDir][1]) === Math.sign(targetOb[1] - gLoc[1])) {
            console.log(`It's an obstacle, Huston! at ${next}`);
            obstruction.add(`${next[0]},${next[1]}`);
          }
        }
      }
    }

    gLoc = [...next];
  }

  return obstruction.size;
};

// your answer is too low
console.log(main());

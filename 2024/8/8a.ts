const INPUT_FILE = "./input.txt";


const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const antennas: Record<string, number[][]> = {}

  for (let i = 0; i < ips.length; i++) {
    for (let j = 0; j < ips[i].length; j++) {
      if (ips[i][j] !== ".") {
        if (!antennas[ips[i][j]]) {
          antennas[ips[i][j]] = []
        }
        antennas[ips[i][j]].push([i, j])
      }
    }
  }

  const isInside = (x: number, y: number) => {
    return x >= 0 && x < ips.length && y >= 0 && y < ips[0].length;
  }

  const antiNodes: Set<string> = new Set();

  Object.values(antennas).forEach((cousins) => {
    for (let i = 0; i < cousins.length; i++) {
      for (let j = i + 1; j < cousins.length; j++) {
        const [x1, y1] = cousins[i];
        const [x2, y2] = cousins[j];
        const oppX1 = x1 + (x1 - x2);
        const oppY1 = y1 + (y1 - y2);

        if (isInside(oppX1, oppY1) && !antiNodes.has(`${oppX1},${oppY1}`)) {
          antiNodes.add(`${oppX1},${oppY1}`);
        }

        const oppX2 = x2 + (x2 - x1);
        const oppY2 = y2 + (y2 - y1);

        if (isInside(oppX2, oppY2) && !antiNodes.has(`${oppX2},${oppY2}`)) {
          antiNodes.add(`${oppX2},${oppY2}`);
        }
      }
    }
  });

  // console.log(antiNodes)

  // for (let i = 0; i < ips.length; i++) {
  //   let line = '';
  //   for (let j = 0; j < ips[i].length; j++) {
  //     if (antiNodes.has(`${i},${j}`)) {
  //       line += '#';
  //     } else {
  //       line += ips[i][j];
  //     }
  //   }
  //   console.log(line)
  // }

  return antiNodes.size;
};

console.log(main());

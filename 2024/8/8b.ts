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
  let overlappingAntinodes: Set<string> = new Set()

  const addAntiNodes = (x: number, y: number, diffX: number, diffY: number) => {
    let iterX = x + diffX;
    let iterY = y + diffY;
    while (isInside(iterX, iterY)) {
      if (ips[iterX][iterY] !== ".") {
        overlappingAntinodes.add(`${iterX},${iterY}`);
      }
      antiNodes.add(`${iterX},${iterY}`);
      iterX += diffX;
      iterY += diffY;
    }
  }

  const atleastTwoAntennas = Object.values(antennas).filter((i) => i.length > 1);

  atleastTwoAntennas.forEach((cousins) => {
    for (let i = 0; i < cousins.length; i++) {
      for (let j = i + 1; j < cousins.length; j++) {
        const [x1, y1] = cousins[i];
        const [x2, y2] = cousins[j];
        addAntiNodes(x1, y1, x1 - x2, y1 - y2);
        addAntiNodes(x2, y2, x2 - x1, y2 - y1);
      }
    }
  });

  // console.log(antiNodes)

  for (let i = 0; i < ips.length; i++) {
    let line = '';
    for (let j = 0; j < ips[i].length; j++) {
      if (antiNodes.has(`${i},${j}`)) {
        line += '#';
      } else {
        line += ips[i][j];
      }
    }
    console.log(line)
  }
  console.log(overlappingAntinodes.size, atleastTwoAntennas.flat().length)

  return antiNodes.size - overlappingAntinodes.size + atleastTwoAntennas.flat().length;
};

console.log(main());

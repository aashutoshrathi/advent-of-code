const INPUT_FILE = "./input.txt";

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const garden = ips.map((row) => row.split(""));
  console.log(garden)

  let totalCost = 0;

  const visited = Array.from({ length: garden.length }, () => Array(garden[0].length).fill(false));

  const countCorners = (apne: Set<string>): number => {
    let corners = 0;
    for (const p of apne) {
      const [i, j] = p.split(',').map(Number);
      const padosi = [
        [i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]
      ];

      const paraye = padosi.filter(([ni, nj]) => {
        return ni < 0 || ni >= garden.length || nj < 0 || nj >= garden[0].length || garden[ni][nj] !== garden[i][j];
      });

      if (paraye.length === 4) {
        corners += 4;
      }

      if (paraye.length === 3) {
        corners += 2;
      }

      if (paraye.length === 2 && paraye[0][0] !== paraye[1][0] && paraye[0][1] !== paraye[1][1]) {
        corners += 1;
      }

      // corners inside shitty garden
      for (const [x, y] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
        const ni = i + x;
        const nj = j + y;
        const ptA = [ni, j];
        const ptB = [i, nj];
        if (ni >= 0 && ni < garden.length && nj >= 0 && nj < garden[0].length && apne.has(ptA.join(',')) && apne.has(ptB.join(',')) && garden[ni][nj] !== garden[i][j]) {
          corners += 1;
        }
      }
    }

    return corners;
  }

  const dfs = (i: number, j: number, value: string): [number, Set<string>] => {
    if (i < 0 || i >= garden.length || j < 0 || j >= garden[0].length ||
      visited[i][j] || garden[i][j] !== value) {
      return [0, new Set()];
    }
    const path: Set<string> = new Set();

    visited[i][j] = true;
    path.add(`${i},${j}`);

    const neighbors = [
      [i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]
    ];

    let area = 1;
    for (const [ni, nj] of neighbors) {
      if (ni >= 0 && ni < garden.length &&
        nj >= 0 && nj < garden[0].length &&
        garden[ni][nj] === value) {
        const [subArea, subPaths] = dfs(ni, nj, value);
        area += subArea;
        for (const p of subPaths) {
          path.add(p);
        }
      }
    }

    return [area, path];
  }

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      if (!visited[i][j]) {
        const [area, path] = dfs(i, j, garden[i][j]);
        const corners = countCorners(path);
        console.log(`Cell: ${garden[i][j]}, Area: ${area}, Corners: ${corners}, Path: ${[...path].join('->')}`);
        totalCost += area * corners;
        // break;
      }
    }
  }

  return totalCost;
}

console.log(main())

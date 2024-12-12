const INPUT_FILE = "./input.txt";

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const garden = ips.map((row) => row.split(""));
  console.log(garden)

  // area seems to be simply the number of plots containing same plot and touching one another either horizontally or vertically
  // perimeter is little more tricky to calculate as we have to remove the shared walls in the same region or don't count them at all.

  let totalCost = 0;

  // what we should do is go through each plot in the garden, pick one plot, do a dfs on it to find all plots in same region and calculating the area and perimeter of that region, marking the plots as visited so that we don't visit them again. and then move to the next unvisited plot and do the same thing.

  // also, note that area is easy to calculate as it's number of plots, perimeter can be said to be 4*area - 2*shared walls

  const visited = Array.from({ length: garden.length }, () => Array(garden[0].length).fill(false));

  function dfs(i: number, j: number, value: string): [number, number] {
    if (i < 0 || i >= garden.length || j < 0 || j >= garden[0].length ||
      visited[i][j] || garden[i][j] !== value) {
      return [0, 0];
    }

    visited[i][j] = true;
    let perimeter = 4; // Start with 4 walls for current cell

    // Check each neighbor
    const neighbors = [
      [i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]
    ];

    let area = 1;
    for (const [ni, nj] of neighbors) {
      // If neighbor exists and has same value, subtract shared wall
      if (ni >= 0 && ni < garden.length &&
        nj >= 0 && nj < garden[0].length &&
        garden[ni][nj] === value) {
        perimeter--;
        const [subArea, subPerimeter] = dfs(ni, nj, value);
        area += subArea;
        perimeter += subPerimeter;
      }
    }

    return [area, perimeter];
  }

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      if (!visited[i][j]) {
        const [area, perimeter] = dfs(i, j, garden[i][j]);
        console.log(`Cell: ${garden[i][j]}, Area: ${area}, Perimeter: ${perimeter}`);
        totalCost += area * perimeter;
        // break;
      }
    }
  }

  return totalCost;
}

console.log(main())

const INPUT_FILE = "./input.txt";

const main = () => {
  const rows = Deno.readTextFileSync(INPUT_FILE).split("\n");
  const trailheads: number[][] = [];

  let trails = 0;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === "0") {
        trailheads.push([i, j]);
      }
    }
  }

  // let's move in the matrix from each trailhead
  for (let i = 0; i < trailheads.length; i++) {
    let localTrails = 0;
    let [x, y] = trailheads[i];
    const stack = [[x, y]];

    while (stack.length) {
      const [x, y] = stack.pop()!;
      const curHeight = Number(rows[x][y]);


      if (x < 0 || x >= rows.length || y < 0 || y >= rows[0].length) {
        continue;
      }

      if (rows[x][y] === '9') {
        localTrails += 1;
        continue;
      }

      const nextHeight = `${curHeight + 1}`;
      if (rows[x + 1]?.[y] === nextHeight) {
        stack.push([x + 1, y]);
      }
      if (rows[x - 1]?.[y] === nextHeight) {
        stack.push([x - 1, y]);
      }
      if (rows[x]?.[y + 1] === nextHeight) {
        stack.push([x, y + 1]);
      }
      if (rows[x]?.[y - 1] === nextHeight) {
        stack.push([x, y - 1]);
      }
    }
    trails += localTrails;
    console.log(`Trailhead at ${x},${y} has ${localTrails} trails`);
  }

  console.log("Res =>", trails)

}

console.log(main())

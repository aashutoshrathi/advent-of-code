const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";


const main = () => {
  const inputs = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  let [map, movesBroken] = inputs;
  const moves = movesBroken.split("\n").join("");
  // console.log(moves)

  // update the map
  map = map.replace(/#/g, "##").replace(/O/g, "[]").replace(/\./g, "..").replace(/@/g, "@.");

  const matrix = map.split("\n").map((row) => row.split(""));
  console.log(matrix.map((row) => row.join("")).join("\n"));

  const botLocation = { x: 0, y: 0 };
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "@") {
        botLocation.x = i;
        botLocation.y = j;
      }
    }
  }

  console.log(botLocation)

  // so now the boxes look like [] over O and they also move if one side of box is pushed
  for (let i = 0; i < moves.length; i++) {
    // ^, v, <, or >
    const move = moves[i];
    const { x, y } = botLocation;
    // we can only move if the next position is . or ] or [ or if there is space between [] or the contiguous [] can be moved without hitting a wall (#)
    if (move === "<") {
      let k = y - 1;
      if (matrix[x][k] === "]") {
        // find if we can push the O
        while (k >= 0 && matrix[x][k] === "]") {
          k -= 2;
        }
      }

      if (matrix[x][k] === "#") {
        continue;
      }

      if (matrix[x][k] === ".") {
        botLocation.y = y - 1;
        // move all the contiguous O
        while (k < y - 1) {
          matrix[x][k] = "[";
          matrix[x][k + 1] = "]";
          k += 2;
        }
        matrix[x][k] = "@";
        matrix[x][y] = ".";
      }
    } else if (move === ">") {
      let k = y + 1;
      if (matrix[x][k] === "[") {
        // find if we can push the O
        while (k < matrix[0].length && matrix[x][k] === "[") {
          k += 2;
        }
      }

      if (matrix[x][k] === "#") {
        continue;
      }
      if (matrix[x][k] === ".") {
        botLocation.y = y + 1;
        // move all the contiguous O
        while (k > y + 1) {
          matrix[x][k] = "]";
          matrix[x][k - 1] = "[";
          k -= 2;
        }
        matrix[x][k] = "@";
        matrix[x][y] = ".";
      }
    } else if (move === "^") { // hard cases now
      // console.log(botLocation)
      const pts = new Set<string>();
      let k = x;
      let q = [y];
      let hasWall = false;
      while (q.length) {
        if (k <= 0) {
          break;
        }
        const localQ = [];
        for (let i = 0; i < q.length; i++) {
          const b = q[i];
          const ptUp = matrix[k - 1][b];
          if (ptUp === "#") {
            hasWall = true;
            q = [];
            break;
          }
          if (ptUp === "]") {
            pts.add([k - 1, b].join(','));
            pts.add([k - 1, b - 1].join(','));
            localQ.push(b - 1);
            localQ.push(b);
          }
          if (ptUp === "[") {
            pts.add([k - 1, b].join(','));
            pts.add([k - 1, b + 1].join(','));
            localQ.push(b + 1);
            localQ.push(b);
          }
        }
        k -= 1;
        q = [...new Set(localQ)];
        console.log(`k: ${k}, q: ${q}`);
      }

      if (hasWall) {
        continue;
      } else {
        // move everything in pts up by 1
        botLocation.x = x - 1;
        // reverse the order of the pts
        const points = Array.from(pts).reverse();
        for (const pt of points) {
          const [p, q] = pt.split(',').map(Number);
          console.log(`up at p: ${p}, q: ${q}`);
          matrix[p - 1][q] = matrix[p][q];
          matrix[p][q] = ".";
        }
        matrix[x - 1][y] = "@";
        matrix[x][y] = ".";
      }
    } else if (move === "v") {
      const pts = new Set<string>();
      let k = x;
      let q = [y];
      let hasWall = false;
      while (q.length) {
        if (k >= matrix.length - 1) {
          break;
        }
        const localQ = [];
        for (let i = 0; i < q.length; i++) {
          const b = q[i];
          const ptUp = matrix[k + 1][b];
          if (ptUp === "#") {
            hasWall = true;
            q = [];
            break;
          }
          if (ptUp === "]") {
            pts.add([k + 1, b].join(','));
            pts.add([k + 1, b - 1].join(','));
            localQ.push(b - 1);
            localQ.push(b);
          }
          if (ptUp === "[") {
            pts.add([k + 1, b].join(','));
            pts.add([k + 1, b + 1].join(','));
            localQ.push(b + 1);
            localQ.push(b);
          }
        }
        k += 1;
        q = [...new Set(localQ)];
        console.log(`k: ${k}, q: ${q}`);
      }

      if (hasWall) {
        continue;
      } else {
        // move everything in pts up by 1
        botLocation.x = x + 1;
        // reverse the order of the pts
        const points = Array.from(pts).reverse();
        for (const pt of points) {
          const [p, q] = pt.split(',').map(Number);
          console.log(`down at p: ${p}, q: ${q}`);
          matrix[p + 1][q] = matrix[p][q];
          matrix[p][q] = ".";
        }
        matrix[x + 1][y] = "@";
        matrix[x][y] = ".";
      }
    }
    // console.log(`--------- moving ${move}\n` + matrix.map((row) => row.join("")).join("\n"));
  }

  let res = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "[") {
        res += i * 100 + j;
      }
    }
  }
  return res;
}
console.log(main());
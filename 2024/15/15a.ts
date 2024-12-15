const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

// const pushTheBoxes = (map: string, moves: string) => {}

const main = () => {
  const inputs = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const [map, movesBroken] = inputs;
  const moves = movesBroken.split("\n").join("");
  // console.log(moves)

  const matrix = map.split("\n").map((row) => row.split(""));

  const botLocation = { x: 0, y: 0 };
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "@") {
        botLocation.x = i;
        botLocation.y = j;
      }
    }
  }

  for (let i = 0; i < moves.length; i++) {
    // ^, v, <, or >
    const move = moves[i];
    const { x, y } = botLocation;
    // we can only move if the next position is . or O or if there is space between O or the contiguous O can be moved without hitting a wall (#)
    if (move === "^") {
      let k = x - 1;
      if (matrix[k][y] === "O") {
        // find if we can push the O
        while (k >= 0 && matrix[k][y] === "O") {
          k -= 1;
        }
      }

      if (matrix[k][y] === "#") {
        continue;
      }
      if (matrix[k][y] === ".") {
        botLocation.x = x - 1;
        // move all the contiguous O
        while (k < x - 1) {
          matrix[k][y] = "O";
          k += 1;
        }
        matrix[k][y] = "@";
        matrix[x][y] = ".";
      }
    } else if (move === "v") {
      let k = x + 1;
      if (matrix[k][y] === "O") {
        // find if we can push the O
        while (k < matrix.length && matrix[k][y] === "O") {
          k += 1;
        }
      }

      if (matrix[k][y] === "#") {
        continue;
      }
      if (matrix[k][y] === ".") {
        botLocation.x = x + 1;
        // move all the contiguous O
        while (k > x + 1) {
          matrix[k][y] = "O";
          k -= 1;
        }
        matrix[k][y] = "@";
        matrix[x][y] = ".";
      }
    } else if (move === "<") {
      let k = y - 1;
      if (matrix[x][k] === "O") {
        // find if we can push the O
        while (k >= 0 && matrix[x][k] === "O") {
          k -= 1;
        }
      }

      if (matrix[x][k] === "#") {
        continue;
      }
      if (matrix[x][k] === ".") {
        botLocation.y = y - 1;
        // move all the contiguous O
        while (k < y - 1) {
          matrix[x][k] = "O";
          k += 1;
        }
        matrix[x][k] = "@";
        matrix[x][y] = ".";
      }
    } else if (move === ">") {
      let k = y + 1;
      if (matrix[x][k] === "O") {
        // find if we can push the O
        while (k < matrix[0].length && matrix[x][k] === "O") {
          k += 1;
        }
      }

      if (matrix[x][k] === "#") {
        continue;
      }
      if (matrix[x][k] === ".") {
        botLocation.y = y + 1;
        // move all the contiguous O
        while (k > y + 1) {
          matrix[x][k] = "O";
          k -= 1;
        }
        matrix[x][k] = "@";
        matrix[x][y] = ".";
      }
    }
  }

  let res = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "O") {
        res += i * 100 + j;
      }
    }

  }
  console.log(matrix.map((row) => row.join("")));
  return res;
}
console.log(main());
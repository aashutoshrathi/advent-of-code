const INPUT_FILE = "./input.txt";

const main = () => {
  const rawInputs = Deno.readTextFileSync(INPUT_FILE);
  const inputs = rawInputs.split("\n");

  let res = 0;

  const countXMas = (i: number, j: number): number => {
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    let count = 0;

    for (const [dx, dy] of directions) {
      let x = i + dx;
      let y = j + dy;

      if (x < 0 || x >= inputs.length || y < 0 || y >= inputs[i].length) {
        continue;
      }

      if (inputs[x][y] === 'M') {
        if (inputs[x + dx]?.[y + dy] === 'A') {
          if (inputs[x + dx * 2]?.[y + dy * 2] === 'S') {
            count += 1;
          }
        }
      }
    }

    return count;
  }

  for (let i = 0; i < inputs.length; i += 1) {
    for (let j = 0; j < inputs[i].length; j += 1) {
      if (inputs[i][j] === 'X') {
        res += countXMas(i, j);
      }
    }
  }

  return res;
};

console.log(main());

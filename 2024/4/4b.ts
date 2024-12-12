const INPUT_FILE = "./input.txt";

const main = () => {
  const rawInputs = Deno.readTextFileSync(INPUT_FILE);
  const inputs = rawInputs.split("\n");

  let res = 0;

  const countXShapedMas = (i: number, j: number): number => {
    const sides = [[[-1, 1], [-1, -1]], [[-1, -1], [1, -1]]];
    let count = 0;

    const getVal = (pair: number[]): string => {
      return inputs?.[i + pair[0]]?.[j + pair[1]];
    }

    for (const edge of sides) {
      const [vA, vB] = edge;
      const hA = vA.map((v) => v * -1);
      const hB = vB.map((v) => v * -1);

      if (getVal(vA) === 'M' && getVal(vB) === 'M' && getVal(hA) === 'S' && getVal(hB) === 'S') {
        count += 1;
      }
      if (getVal(vA) === 'S' && getVal(vB) === 'S' && getVal(hA) === 'M' && getVal(hB) === 'M') {
        count += 1;
      }
    }

    return count;
  }

  for (let i = 0; i < inputs.length; i += 1) {
    for (let j = 0; j < inputs[i].length; j += 1) {
      if (inputs[i][j] === 'A') {
        res += countXShapedMas(i, j);
      }
    }
  }

  return res;
};

console.log(main());

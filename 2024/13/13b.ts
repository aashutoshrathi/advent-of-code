const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const isDivisible = (num: number, by: number) => {
  if (num > by) {
    return num % by === 0;
  }
  return by % num === 0;
}

const determinant = (matrix: number[][]) => {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

// invert without dividing
const invertMatrix = (matrix: number[][]) => {
  return [
    [matrix[1][1], -matrix[0][1]],
    [-matrix[1][0], matrix[0][0]]
  ];
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n\n");

  let totalCost = 0;

  for (const machines of ips) {
    const [aInfo, bInfo, prizeInfo] = machines.split("\n");
    const [aX, aY] = aInfo.match(/Button A: X\+(\d+), Y\+(\d+)/)?.slice(1).map(Number) || [];
    const [bX, bY] = bInfo.match(/Button B: X\+(\d+), Y\+(\d+)/)?.slice(1).map(Number) || [];
    let [prizeX, prizeY] = prizeInfo.match(/X=(\d+), Y=(\d+)/)?.slice(1).map(Number) || [];

    prizeX += 10000000000000;
    prizeY += 10000000000000;

    // console.log(`A: ${aX}, ${aY}`, `B: ${bX}, ${bY}`, `Prize: ${prizeX}, ${prizeY}`);

    let cost = 0;
    // pressing A costs 3, B costs 1 and max we can press is 100 times each

    // so need to solve this linear equations
    // aX * a + bX * b = prizeX
    // aY * a + bY * b = prizeY
    // 0 <= a <= 100, 0 <= b <= 100
    // and minimize a * 3 + b

    const matrix = [[aX, bX], [aY, bY]];

    // if it has solution then determinant of matrix should not be 0
    const det = determinant(matrix);
    if (det === 0 && !(isDivisible(prizeX, aX) && isDivisible(prizeY, aY))) {
      console.log(`No solution for ${prizeX}, ${prizeY}`);
      continue;
    }

    // so solution = matrix^-1 * [prizeX, prizeY]
    const invertedMatrix = invertMatrix(matrix);
    let [a, b] = invertedMatrix.map(row => row[0] * prizeX + row[1] * prizeY);
    a = a / det;
    b = b / det;

    // if positive and integer then only we can consider it
    if (a >= 0 && b >= 0 && Number.isInteger(a) && Number.isInteger(b)) {
      cost = a * 3 + b;
      console.log(`Solution for ${prizeX}, ${prizeY} is ${a}, ${b} with cost ${cost}`);
    } else {
      console.log(`No solution for ${prizeX}, ${prizeY}, as a: ${a}, b: ${b}`);
    }

    totalCost += cost;
  }


  return totalCost;
}

console.log(main());

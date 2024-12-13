const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const MAX_BUTTON_PRESS = 100;

  let totalCost = 0;

  for (const machines of ips) {
    const [aInfo, bInfo, prizeInfo] = machines.split("\n");
    const [aX, aY] = aInfo.match(/Button A: X\+(\d+), Y\+(\d+)/)?.slice(1).map(Number) || [];
    const [bX, bY] = bInfo.match(/Button B: X\+(\d+), Y\+(\d+)/)?.slice(1).map(Number) || [];
    const [prizeX, prizeY] = prizeInfo.match(/X=(\d+), Y=(\d+)/)?.slice(1).map(Number) || [];

    console.log(`A: ${aX}, ${aY}`, `B: ${bX}, ${bY}`, `Prize: ${prizeX}, ${prizeY}`);

    let cost = -1;
    // pressing A costs 3, B costs 1 and max we can press is 100 times each

    // so need to solve this linear equations
    // aX * a + bX * b = prizeX
    // aY * a + bY * b = prizeY
    // 0 <= a <= 100, 0 <= b <= 100
    // and minimize a * 3 + b

    for (let a = 0; a <= MAX_BUTTON_PRESS; a++) {
      for (let b = 0; b <= MAX_BUTTON_PRESS; b++) {
        if (aX * a + bX * b === prizeX && aY * a + bY * b === prizeY) {
          const curCost = a * 3 + b;
          if (cost === -1 || curCost < cost) {
            cost = curCost;
          }
        }
      }
    }

    if (cost !== -1) {
      totalCost += cost;
    }
  }


  return totalCost;
}

console.log(main());

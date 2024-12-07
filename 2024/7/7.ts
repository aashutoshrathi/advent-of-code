const INPUT_FILE = "./input.txt";

const checkEqn = (res: number, inputs: number[]) => {
  let queue = [inputs[0]];
  for (let i = 1; i < inputs.length; i += 1) {
    const lvlQ: number[] = [];
    console.log(`Checking Level: ${i}`);
    while (queue.length > 0) {
      const currVal = queue.shift() as number;
      const values = [
        currVal + inputs[i],
        currVal * inputs[i],
        Number(`${currVal}${inputs[i]}`) // part 2
      ];
      if (i === inputs.length - 1 && values.includes(res)) {
        return res;
      }
      values.forEach((val) => {
        if (val <= res) {
          lvlQ.push(val);
        }
      })
      // console.log(`Queue: ${queue}`, `lvlQ: ${lvlQ}`);
    }
    queue = lvlQ;
  }
  return 0;
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");

  let res = 0;
  for (let i = 0; i < ips.length; i++) {
    console.log(`Checking Eqn: ${i}`);
    const [eqn, rest] = ips[i].split(": ") as [string, string];
    const expectedRes = Number(eqn);
    const inputs = rest.split(" ").map((x) => Number(x));
    res += checkEqn(expectedRes, inputs);
  }

  return res;
};

console.log(main());

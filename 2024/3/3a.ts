const INPUT_FILE = "./input.txt";

const main = () => {
  const rawInputs = Deno.readFileSync(INPUT_FILE);
  const inputs = new TextDecoder().decode(rawInputs).split("\n");

  let res = 0;
  for (let i = 0; i < inputs.length; i++) {
    const muls = inputs[i].match(/mul\((\d+),(\d+)\)/g)
    if (muls) {
      for (let j = 0; j < muls.length; j++) {
        const [_, a, b] = muls[j].match(/mul\((\d+),(\d+)\)/) || [];
        res += Number(a) * Number(b);
        console.log(`mul(${a},${b}) = ${Number(a) * Number(b)}`);
      }
    }
  }

  return res;
};

console.log(main());

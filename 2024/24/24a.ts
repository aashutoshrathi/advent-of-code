const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const main = () => {
  const [initialVals, config] = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const iV: Record<string, number> = {};

  initialVals.split("\n").forEach((line) => {
    const [key, val] = line.split(": ");
    iV[key] = Number(val);
  });

  const uzWires = new Set<string>();
  let configs = config.split("\n")

  while (configs.length > 0) {
    const localConfig: string[] = [];
    configs.forEach((line) => {
      const [inp, out] = line.split(" -> ");
      const [a, op, b] = inp.split(" ");
      if (iV[a] === undefined || iV[b] === undefined) {
        localConfig.push(line);
        return;
      }

      if (op === "AND") {
        iV[out] = iV[a] & iV[b];
      } else if (op === "OR") {
        iV[out] = iV[a] | iV[b];
      } else if (op === "XOR") {
        iV[out] = iV[a] ^ iV[b];
      }

      if (out.startsWith("z")) {
        uzWires.add(out);
      }
    });
    configs = localConfig;
  }

  const zWires = [...uzWires].sort();
  let res = 0;
  let i = 0;
  for (const wire of zWires) {
    console.log(wire, iV[wire]);
    res += iV[wire] << i;
    i++;
  }
  return res;
}

console.time("Time");
console.log(main());
console.timeEnd("Time");

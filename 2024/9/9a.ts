const INPUT_FILE = "./input.txt";


const compress = (expanded: number[]) => {
  let leftPtr = 0;
  while (leftPtr < expanded.length) {
    if (expanded[leftPtr] === -1) {
      const lastIdx = expanded.length - 1;
      [expanded[leftPtr], expanded[lastIdx]] = [expanded[lastIdx], expanded[leftPtr]];
      expanded.pop();
    } else {
      leftPtr += 1;
    }
  }

  return expanded;
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE);

  const expandedRep: number[] = [];
  for (let i = 0; i < ips.length; i += 1) {
    const value = Number(ips[i]);
    const item = i & 1 ? -1 : i / 2;
    for (let j = 0; j < value; j += 1) {
      expandedRep.push(item);
    }
  }

  // console.log(`Expanded: ${expandedRep}`);
  // const compressed = compress(expandedRep);
  const compressed = compress(expandedRep);
  // console.log(`Nums: ${nums}, Dots: ${dots}`);
  // console.log(`Compressed: ${compressed}`);

  return compressed
    .reduce((acc, val, idx) => acc + val * idx, 0);
};
// 6200294120911
console.log(main());

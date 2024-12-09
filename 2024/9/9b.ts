const INPUT_FILE = "./input.txt";


const compressBlocks = (expanded: number[], freq: Record<number, number>) => {
  let rightPtr = expanded.length - 1;
  while (rightPtr >= 0) {
    if (expanded[rightPtr] !== -1) {
      // console.log(`RightPtr: ${rightPtr} - ${expanded[rightPtr]}`);
      const freqVal = freq[expanded[rightPtr]];
      for (let i = 0; i < rightPtr - freqVal; i += 1) {
        if (expanded[i] === -1) {
          let found = true;
          for (let j = 1; j < freqVal; j++) {
            if (expanded[i + j] !== -1) {
              found = false;
              break;
            }
          }
          if (found) {
            for (let j = 0; j < freqVal; j++) {
              expanded[i + j] = expanded[rightPtr - j];
              expanded[rightPtr - j] = -1;
            }
            break;
          }
        }
      }
      // console.log(`rightPtr: ${rightPtr}, as removing ${freqVal} of ${expanded[rightPtr]}`);
      rightPtr = rightPtr - freqVal;
    } else {
      rightPtr -= 1;
    }
  }
  console.log(expanded.map((v) => v === -1 ? "." : v).join(""));
  return expanded;
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE);

  const expandedRep: number[] = [];
  const freq: Record<number, number> = {};
  for (let i = 0; i < ips.length; i += 1) {
    const value = Number(ips[i]);
    const item = i & 1 ? -1 : i / 2;
    if (item !== -1) {
      freq[item] = value;
    }
    for (let j = 0; j < value; j += 1) {
      expandedRep.push(item);
    }
  }

  // console.log(`Freq: ${JSON.stringify(freq)}`);
  console.log(`Expanded: ${expandedRep.map((v) => v === -1 ? "." : v).join("")}`);
  const compressed = compressBlocks(expandedRep, freq);

  return compressed
    .reduce((acc, val, idx) => {
      if (val === -1) {
        return acc;
      }
      return acc + val * idx;
    }, 0);
};
console.log(main());

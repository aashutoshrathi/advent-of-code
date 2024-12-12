const INPUT_FILE = "./input.txt";

const getBadIdx = (lvl: number[]) => {
  let badIdx = -1;
  const isIncr = lvl[1] > lvl[0];
  for (let i = 1; i < lvl.length; i++) {
    const diff = lvl[i] - lvl[i - 1];
    if (Math.abs(diff) > 3 || diff === 0 || (diff > 0) !== isIncr) {
      badIdx = i;
      break;
    }
  }
  return badIdx;
}

const deleteNth = (arr: number[], n: number) => {
  if (n < 0 || n >= arr.length) {
    return arr;
  }
  return arr.filter((_, i) => i !== n);
}

const main = () => {
  const rawInputs = Deno.readFileSync(INPUT_FILE);
  const inputs = new TextDecoder().decode(rawInputs).split("\n");
  const levels = inputs.map((input) => input.split(" ").map((x) => parseInt(x)));
  let safeCount = 0;

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const badIdx = getBadIdx(level);
    let isSafe = badIdx === -1;
    if (!isSafe) {
      console.log(`Level ${i + 1} is not safe, badIdx: ${badIdx}`);
      isSafe = getBadIdx(deleteNth(level, badIdx)) === -1 || getBadIdx(deleteNth(level, badIdx - 1)) === -1 || getBadIdx(deleteNth(level, 0)) === -1;
      if (isSafe) {
        console.log(`Level ${i + 1} is safe after removing badIdx: ${badIdx}`);
      }
    }

    if (isSafe) {
      safeCount += 1;
    }
  }

  return safeCount;
};

console.log(main());

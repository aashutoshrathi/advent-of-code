const INPUT_FILE = "./input.txt";

const isSafeDiff = (diff: number) => {
  const absDiff = Math.abs(diff);
  return absDiff >= 1 && absDiff <= 3;
}

const isSafeNow = (arr: number[]) => {
  for (let i = 1; i < arr.length; i += 1) {
    const diff = arr[i] - arr[i - 1];
    if (!isSafeDiff(diff)) {
      return false;
    }
  }

  return true;
}

const main = () => {
  const rawInputs = Deno.readFileSync(INPUT_FILE);
  const inputs = new TextDecoder().decode(rawInputs).split("\n");
  const levels = inputs.map((input) => input.split(" ").map((x) => parseInt(x)));
  let safeCount = 0;

  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    let tolerateCount = 0;

    const sign = Math.sign(level[1] - level[0]);
    for (let j = 1; j < level.length; j += 1) {
      const diff = level[j] - level[j - 1];
      if (Math.sign(diff) !== sign || !isSafeDiff(diff) || diff === 0) {
        console.log(`Increasing tolerance for ${i} at ${j - 1} as getting diff ${diff}`)
        tolerateCount += 1;
      }
    }

    if (tolerateCount <= 1) {
      console.log(`Marking level ${i} as safe`);
      safeCount += 1;
    }
  }

  return safeCount;
};

console.log(main());

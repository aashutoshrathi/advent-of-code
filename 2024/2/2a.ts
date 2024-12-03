const INPUT_FILE = "./input.txt";

const isSafeDiff = (diff: number) => {
  const absDiff = Math.abs(diff);
  return absDiff >= 1 && absDiff <= 3;
}
// 564
const main = () => {
  const rawInputs = Deno.readFileSync(INPUT_FILE);
  const inputs = new TextDecoder().decode(rawInputs).split("\n");
  const levels = inputs.map((input) => input.split(" ").map((x) => parseInt(x)));

  const diffLevels = levels.map((level) => level.map((x, i) => x - (level[i - 1] || 0)).slice(1));

  let safeCount = 0;

  for (let i = 0; i < diffLevels.length; i++) {
    const level = diffLevels[i];
    const isSafe = level.every((diff, i) => {
      if (isSafeDiff(diff)) {
        if (i > 0) {
          return Math.sign(diff) === Math.sign(level[i - 1])
        }
        return true;
      }
      return false;
    });

    if (isSafe) {
      safeCount += 1;
    }
  }

  return safeCount;
};

console.log(main());

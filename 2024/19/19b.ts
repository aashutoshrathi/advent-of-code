const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const main = () => {
  const [patternList, designString] = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const patterns = patternList.split(", ");
  const designs = designString.split("\n");

  let res = 0;

  const waysToMake = (design: string) => {
    const dp = new Array(design.length + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= design.length; i++) {
      for (const pattern of patterns) {
        if (design.slice(i - pattern.length, i) === pattern) {
          dp[i] += dp[i - pattern.length];
        }
      }
    }

    console.log(dp);
    return dp[design.length];
  }

  for (const design of designs) {
    res += waysToMake(design);
  }

  return res;
}

console.time("Time");
console.log(main());
console.timeEnd("Time");

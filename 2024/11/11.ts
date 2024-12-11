const INPUT_FILE = "./input.txt";

const getStoneNextState = (stone: string): string[] => {
  if (stone === "0") {
    return ["1"];
  }
  if (stone.length % 2 === 0) {
    const half = stone.length / 2;
    const [left, right] = [stone.slice(0, half), stone.slice(half)];
    return [`${Number(left)}`, `${Number(right)}`];
  }
  return [`${Number(stone) * 2024}`];
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split(" ");

  const NUMBER_OF_BLINKS = 75;
  let uniqueStones: Map<string, number> = new Map();

  // simply add duplicate stone counts here, iterate once for each
  ips.forEach((ip) => {
    uniqueStones.set(ip, (uniqueStones.get(ip) ?? 0) + 1);
  });

  for (let i = 0; i < NUMBER_OF_BLINKS; i++) {
    const nextUniqStones: Map<string, number> = new Map();
    for (const [stone, count] of uniqueStones) {
      const fStates = getStoneNextState(stone);
      for (const nextState of fStates) {
        nextUniqStones.set(nextState, (nextUniqStones.get(nextState) ?? 0) + count);
      }
    }
    uniqueStones = nextUniqStones;
  }

  const total = Array.from(uniqueStones.values()).reduce((acc, curr) => acc + curr, 0);
  return total;
}

console.log(main())

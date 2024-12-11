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
  let ips = Deno.readTextFileSync(INPUT_FILE).split(" ");

  const NUMBER_OF_BLINKS = 25;

  for (let i = 0; i < NUMBER_OF_BLINKS; i++) {
    const newStones = [];
    for (let j = 0; j < ips.length; j++) {
      newStones.push(...getStoneNextState(ips[j]));
    }
    ips = [...newStones];
  }

  console.log(ips);
  return ips.length;
}

console.log(main())

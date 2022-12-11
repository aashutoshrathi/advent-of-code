const fs = require("fs");

let allDivisors = 1;
const INPUT_REGEX =
  /Monkey (\d+):\n  Starting items: ([0-9|,| ]+)\n  Operation: (.*)\n  Test: divisible by (\d+)\n    If true: throw to monkey (\d+)\n    If false: throw to monkey (\d+)/;

const parseInputToObjects = (input) => {
  const inputs = [];
  const lines = input.split("\n\n");
  lines.forEach((line) => {
    const [_, index, items, operation, divisor, ifTrue, ifFalse] =
      line.match(INPUT_REGEX);

    currentMonkey = {
      monkeyIndex: parseInt(index),
      startingItems: items.split(", ").map((item) => parseInt(item)),
      operation: Function("old", `return ${operation.split("=")[1].trim()};`),
      test: Function("arg", `return arg % ${divisor} === 0;`),
      ifTrue: parseInt(ifTrue),
      ifFalse: parseInt(ifFalse),
      inspections: 0,
    };
    allDivisors = allDivisors * parseInt(divisor);
    inputs.push(currentMonkey);
  });

  return inputs;
};

const solveIt = (parsedInputs, isLarge) => {
  const monkeys = [...parsedInputs];

  for (let j = 0; j < (isLarge ? 10000 : 20); j++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      const { startingItems, operation, test, ifTrue, ifFalse } = monkey;
      monkeys[i].inspections += startingItems.length;

      const items = [];

      startingItems.forEach((item) => {
        const newValue = Math.floor(
          isLarge ? operation(item) : operation(item) / 3
        );

        const result = test(newValue);
        const newIndex = result ? ifTrue : ifFalse;
        monkeys[newIndex].startingItems.push(newValue % allDivisors);
        if (newIndex === i) {
          items.push(newValue % allDivisors);
        }
      });
      monkey.startingItems = items;
    }
  }

  return monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a);
};

const main = (args) => {
  const fileName = args[0].split("/").pop().split(".")[0];
  const useSampleInput = args[1] === "y";
  const useLargeInputs = args[2] === "b"; // can be or 'a' or 'b'

  const input = fs
    .readFileSync(`./${fileName}${useSampleInput ? ".sample" : ""}.input.txt`)
    .toString();

  const parsedInputs = parseInputToObjects(input);

  const inspections = solveIt(parsedInputs, useLargeInputs);

  const result = inspections[0] * inspections[1];
  console.log(result);
};

main(process.argv.slice(1));

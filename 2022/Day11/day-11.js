const fs = require("fs");
const { toCamelCase } = require("../../utils");

let allDivisors = 1;

const parseInputToObjects = (input) => {
  const parseValue = (key, value) => {
    switch (key) {
      case "Starting items":
        return value.split(", ").map((item) => parseInt(item));
      case "Operation":
        const rhs = value.split("=")[1].trim();
        const fun = Function("old", `return ${rhs};`);
        return fun;
      case "Test":
        const divisor = parseInt(value.split("divisible by ")[1]);
        allDivisors = allDivisors * divisor;
        return Function("arg", `return arg % ${divisor} === 0;`);
      case "If true":
      case "If false":
        return parseInt(value.split("throw to monkey ")[1]);
      default:
        return value;
    }
  };

  const inputs = [];
  const lines = input.split("\n");
  let currentMonkey = {};
  lines.forEach((line) => {
    if (line.length === 0) {
      inputs.push(currentMonkey);
    }

    if (line.startsWith("Monkey ")) {
      const monkeyIndex = parseInt(line.split(" ")[1].split(":")[0]);
      currentMonkey = { monkeyIndex };
    }

    if (line.startsWith("  ")) {
      const [key, value] = line.split(":");
      const k = key.trim();
      currentMonkey[toCamelCase(k)] = parseValue(k, value.trim());
    }
  });
  return inputs;
};

const solveIt = (parsedInputs, isLarge) => {
  const monkeys = [...parsedInputs];
  const inspections = {};

  for (let j = 0; j < (isLarge ? 10000 : 20); j++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      const { startingItems, operation, test, ifTrue, ifFalse } = monkey;
      const items = [];

      if (!inspections[i]) {
        inspections[i] = 0;
      }
      inspections[i] += startingItems.length;

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

  return inspections;
};

const main = (args) => {
  const fileName = args[0].split("/").pop().split(".")[0];
  const useSampleInput = args[1] === "y";
  const useLargeInputs = args[2] === "b"; // can be or 'a' or 'b'

  const input = fs
    .readFileSync(`./${fileName}${useSampleInput ? ".sample" : ""}.input.txt`)
    .toString();

  const parsedInputs = parseInputToObjects(input);

  const monkeyWiseInspections = solveIt(parsedInputs, useLargeInputs);

  const totalInspections = Object.values(monkeyWiseInspections).sort(
    (a, b) => b - a
  );

  const result = totalInspections[0] * totalInspections[1];
  console.log(result);
};

main(process.argv.slice(1));

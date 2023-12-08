const { getInputs } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

const partOne = () => {
  const [instruction, _, ...network] = inputs;

  const networkMap = network.reduce((acc, curr) => {
    const [s, conns] = curr.split(" = ");
    if (!acc[s]) {
      acc[s] = {};
    }
    const cleanConns = conns.replace("(", "").replace(")", "").split(", ");
    acc[s]["L"] = cleanConns[0];
    acc[s]["R"] = cleanConns[1];
    return acc;
  }, {});

  let numOfSteps = 0;
  let currNode = "AAA";

  console.log(instruction, networkMap);
  let instructionIdx = 0;

  while (currNode !== "ZZZ") {
    if (instructionIdx === instruction.length) {
      instructionIdx = 0;
    }
    currNode = networkMap[currNode][instruction[instructionIdx]];
    numOfSteps++;
    instructionIdx++;
    console.log(`After ${numOfSteps} at ${currNode}`);
  }

  return numOfSteps;
};

const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

const partTwo = () => {
  const [instruction, _, ...network] = inputs;

  const networkMap = network.reduce((acc, curr) => {
    const [s, conns] = curr.split(" = ");
    if (!acc[s]) {
      acc[s] = {};
    }
    const cleanConns = conns.replace("(", "").replace(")", "").split(", ");
    acc[s]["L"] = cleanConns[0];
    acc[s]["R"] = cleanConns[1];
    return acc;
  }, {});

  let numOfSteps = 0;
  let currNodes = Object.keys(networkMap).filter((k) => k.endsWith("A"));

  // console.log(instruction, networkMap);
  let instructionIdx = 0;

  const finalNums = [];

  for (let k = 0; k < currNodes.length; k++) {
    instructionIdx = 0;
    numOfSteps = 0;
    let currNode = currNodes[k];
    while (!currNode.endsWith("Z")) {
      if (instructionIdx === instruction.length) {
        instructionIdx = 0;
      }
      currNode = networkMap[currNode][instruction[instructionIdx]];
      numOfSteps++;
      instructionIdx++;
      console.log(`After ${numOfSteps} at ${currNode}`);
    }
    finalNums.push(numOfSteps);
  }

  console.log(finalNums);

  const answer = finalNums.reduce((acc, curr) => lcm(acc, curr), 1);

  return answer;
};

console.log("Res:", partTwo());

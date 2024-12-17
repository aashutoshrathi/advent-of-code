const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const runProgram = (instructions: number[], registers: string[], valueOfA = registers[0]) => {
  const output: number[] = [];

  let instructionPointer = 0;

  const REGISTERS = {
    a: Number(valueOfA),
    b: Number(registers[1]),
    c: Number(registers[2]),
  }

  const makeComboOperand = (operand: number) => {
    if (operand === 4) {
      return REGISTERS.a;
    }
    if (operand === 5) {
      return REGISTERS.b;
    }
    if (operand === 6) {
      return REGISTERS.c;
    }
    if (operand === 7) {
      throw new Error("Invalid operand");
    }
    return operand;
  }

  const operate = (instruction: number, operand: number) => {
    const advOutput = Math.floor(REGISTERS.a / Math.pow(2, makeComboOperand(operand)));
    let jump = 2;
    switch (instruction) {
      case 0:
        REGISTERS.a = advOutput;
        break;
      case 1:
        REGISTERS.b = REGISTERS.b ^ operand;
        break;
      case 2:
        REGISTERS.b = makeComboOperand(operand) % 8;
        break;
      case 3:
        if (REGISTERS.a !== 0) {
          instructionPointer = operand;
          // console.log("Jumping to", operand);
          jump = 0;
        }
        break;
      case 4:
        REGISTERS.b = REGISTERS.b ^ REGISTERS.c;
        break;
      case 5:
        output.push(makeComboOperand(operand) % 8);
        break;
      case 6:
        REGISTERS.b = advOutput;
        break;
      case 7:
        REGISTERS.c = advOutput;
        break;
    }
    // console.log(REGISTERS)
    return jump;
  }

  while (instructionPointer < instructions.length) {
    const instruction = instructions[instructionPointer];
    const operand = instructions[instructionPointer + 1];
    // console.log(`Instruction: ${instruction}, Operand: ${operand}`);
    const jump = operate(instruction, operand);
    instructionPointer += jump;

    if (output.length && output[output.length - 1] !== instructions[output.length - 1]) {
      return [];
    }
  }

  return output;
}

const main = () => {
  const [registerVals, program] = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const instructions = program.match(/Program: (.*)/)?.[1].split(",").map(Number) || [];

  const registers = registerVals.match(/Register A: (.*)\nRegister B: (.*)\nRegister C: (.*)/) || [];

  const operandsOfOut = [];
  for (let i = 0; i < instructions.length; i += 2) {
    if (instructions[i] === 5) {
      operandsOfOut.push(instructions[i + 1]);
    }
  }
  // console.log(operandsOfOut);


  // for my input, (a >> (a%8 ^ 3)) % 8
  const outFromA = (a: number) => {
    const interim = (a % 8) ^ 3;
    const c = Math.floor(a / Math.pow(2, interim));
    const postC = c ^ 6;
    return (postC ^ (a % 8)) % 8;
    // return (a >> 3) % 8; // for example
  }

  let candidates = [0];
  for (let i = instructions.length - 1; i >= 0; i--) {
    const newCandidates = [];
    console.log(`Instruction: ${instructions[i]}, candidates: ${candidates}`);
    for (const c of candidates) {
      for (let j = 0; j < 8; j++) {
        const num = (c << 3) + j;
        const out = outFromA(num);
        console.log(`Num: ${num}, Out: ${out}, Instruction: ${instructions[i]}`);
        if (out === instructions[i]) {
          newCandidates.push(num);
        }
      }
    }
    candidates = newCandidates;
  }

  console.log(candidates);
  return Math.min(...candidates);
}

console.time("Time");
console.log(main());
console.timeEnd("Time");

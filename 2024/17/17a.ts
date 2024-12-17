const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const main = () => {
  const [registerVals, program] = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const instructions = program.match(/Program: (.*)/)?.[1].split(",").map(Number) || [];

  const registers = registerVals.match(/Register A: (.*)\nRegister B: (.*)\nRegister C: (.*)/) || [];
  const output: number[] = [];

  let instructionPointer = 0;

  const REGISTERS = {
    a: Number(registers[1]),
    b: Number(registers[2]),
    c: Number(registers[3]),
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
          console.log("Jumping to", operand);
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
    console.log(REGISTERS)
    return jump;
  }

  while (instructionPointer < instructions.length) {
    const instruction = instructions[instructionPointer];
    const operand = instructions[instructionPointer + 1];
    console.log(`Instruction: ${instruction}, Operand: ${operand}`);
    const jump = operate(instruction, operand);
    instructionPointer += jump;
  }

  // console.log(REGISTERS)
  console.log(output);
  return output.join(",");

}
console.log(main());
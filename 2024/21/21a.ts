const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const movesFromANumPad = ['<', '^<<', '^<', '^', '^^<<', '^^<', '^^', '<<^^^', '<^^^', '^^^', ''];
const movesFromADirPad: Record<string, string> = {
  'A': '',
  '^': '<',
  '>': 'v',
  'v': 'v<',
  '<': 'v<<',
}
const reverseMove: Record<string, string> = {
  '>': '<',
  '^': 'v',
  '<': '>',
  'v': '^'
}

/**
 *  +---+---+---+
    | 7 | 8 | 9 |
    +---+---+---+
    | 4 | 5 | 6 |
    +---+---+---+
    | 1 | 2 | 3 |
    +---+---+---+
        | 0 | A |
        +---+---+
    029A - <A^A>^^AvvvA
 */
const navigatingOnMainPad = (code: string) => {
  let curr = 10;
  let path = '';
  for (const c of code) {
    const digit = Number(`0x${c}`);
    let movePath = movesFromANumPad[digit];
    const pathToCurr = movesFromANumPad[curr];
    for (let i = 0; i < pathToCurr.length; i++) {
      if (movePath.includes(pathToCurr[i])) {
        movePath = movePath.replace(pathToCurr[i], '');
      } else {
        movePath += reverseMove[pathToCurr[i]];
      }
    }
    // console.log(`Adding ${movePath} when moving from ${curr} to ${digit}`);
    path += movePath + 'A';
    curr = digit;
  }
  return path;
};

/**
 *     +---+---+
      | ^ | A |
  +---+---+---+
  | < | v | > |
  +---+---+---+
  <A^A>^^AvvvA - v<<A>>^A<A>AvA^<>A
 */
const expandForDirPad = (codePath: string) => {
  let path = '';
  let cur = 'A';

  for (const c of codePath) {
    let localPath = movesFromADirPad[c];
    const pathToCurr = movesFromADirPad[cur];
    for (let i = 0; i < pathToCurr.length; i++) {
      if (localPath.includes(pathToCurr[i])) {
        localPath = localPath.replace(pathToCurr[i], '');
      } else {
        localPath += reverseMove[pathToCurr[i]];
      }
    }
    path += localPath + 'A';
    cur = c;
  }

  return path;
}

const getCodeComplexity = (code: string) => {
  const [numPart] = code.split("A");
  const numericPart = Number(numPart);
  const minPath = navigatingOnMainPad(code)
  const seq = expandForDirPad(expandForDirPad(minPath));
  const lenOfSeq = seq.length;
  const complexity = lenOfSeq * numericPart;
  console.log(`Code: ${code}, Len: ${lenOfSeq}, Num: ${numericPart} -> Complexity: ${complexity}, minPath: ${minPath}`);
  return complexity;
}

const main = () => {
  const codes = Deno.readTextFileSync(INPUT_FILE).split("\n");

  let res = 0;
  for (const code of codes) {
    res += getCodeComplexity(code);
  }

  return res;
}

console.time("Time");
console.log(main());
// console.log();
// console.log(expandForDirPad('v<A').length);
// console.log(expandForDirPad(expandForDirPad(navigatingOnMainPad('AA'))).length);
console.timeEnd("Time");
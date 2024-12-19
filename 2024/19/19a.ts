const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";



const main = () => {
  const [patternList, designString] = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const patterns = patternList.split(", ");
  const designs = designString.split("\n");

  const patternSet = new Set(patterns);
  let possibleDesigns = 0;

  const isDesignPossible = (design: string) => {
    if (patternSet.has(design)) {
      return true;
    }

    for (let i = 1; i < design.length; i++) {
      const left = design.slice(0, i);
      const right = design.slice(i);

      if (patternSet.has(left) && isDesignPossible(right)) {
        return true;
      }
    }

    return false;
  }

  for (const design of designs) {
    if (isDesignPossible(design)) {
      possibleDesigns++;
    }
  }

  return possibleDesigns;
}

console.time("Time");
console.log(main());
console.timeEnd("Time");

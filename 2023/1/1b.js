const fs = require("fs");
const main = () => {
  const input = fs.readFileSync("./input.txt", "utf8").split("\n");

  const toAdd = [];

  for (let line of input) {
    // replace words with numbers

    const newLine = line
      .replaceAll("one", "o1e")
      .replaceAll("two", "t2o")
      .replaceAll("three", "t3e")
      .replaceAll("four", "f4r")
      .replaceAll("five", "f5e")
      .replaceAll("six", "s6x")
      .replaceAll("seven", "s7n")
      .replaceAll("eight", "e8t")
      .replaceAll("nine", "n9e");

    let unit = 0,
      dec = 0;

    // find first digit
    for (let i = 0; i < newLine.length; i++) {
      if (newLine[i] >= "0" && newLine[i] <= "9") {
        dec = newLine[i];
        break;
      }
    }

    for (let i = newLine.length - 1; i >= 0; i--) {
      if (newLine[i] >= "0" && newLine[i] <= "9") {
        unit = newLine[i];
        break;
      }
    }
    toAdd.push(parseInt(dec) * 10 + parseInt(unit));
  }
  console.log(toAdd);
  return toAdd.reduce((a, b) => a + b, 0);
};

console.log(main());

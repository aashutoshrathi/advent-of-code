const { getInputs, sumOfArray } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`);

const partOne = () => {
  const toAdd = [];
  for (const line of inputs) {
    const [_, numbers] = line.split(": ");
    const [winning, have] = numbers
      .split(" | ")
      .map((n) => n.split(" ").filter(Boolean));
    // console.log(winning, have);
    let matchedInLine = 0;
    winning.forEach((n) => {
      if (have.includes(n)) {
        matchedInLine++;
      }
    });

    console.log(matchedInLine);
    if (matchedInLine !== 0) {
      toAdd.push(Math.pow(2, matchedInLine - 1));
    }
  }
  // console.log("Array", toAdd);
  return sumOfArray(toAdd);
};

const partTwo = () => {
  const cardCounts = inputs.reduce((acc, line) => {
    const [cardDetails] = line.split(": ");
    const cardNumber = cardDetails.split("Card")[1].trim();
    if (!acc[cardNumber]) {
      acc[cardNumber] = 0;
    }
    acc[cardNumber]++;
    return acc;
  }, {});

  for (const line of inputs) {
    const [cardDetails, numbers] = line.split(": ");
    const cardNumber = cardDetails.split("Card")[1].trim();

    const [winning, have] = numbers
      .split(" | ")
      .map((n) => n.split(" ").filter(Boolean));

    // console.log(winning, have);
    let matchedInLine = 0;
    winning.forEach((n) => {
      if (have.includes(n)) {
        matchedInLine++;
      }
    });

    for (let j = 1; j <= matchedInLine; j++) {
      const idx = Number(cardNumber) + j;
      // FML, this was not mentioned in the question
      // if (idx >= inputs.length) {
      //   continue;
      // }
      // console.log(idx);
      if (!cardCounts[idx]) {
        cardCounts[idx] = 0;
      }
      cardCounts[idx] += cardCounts[cardNumber];
    }

    // console.log(matchedInLine);
  }

  console.log(cardCounts);
  return sumOfArray(Object.values(cardCounts));
};

console.log("Res:", partTwo());

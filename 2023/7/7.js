const { getInputs } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

const cards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const handTypeScore = (set) => {
  // consider this has J, which can act as any card
  const uniqCardsSet = new Set(set);
  const uniqueCards = [...uniqCardsSet];
  const uniqCardsExceptJ = uniqueCards.filter((c) => c !== "J");

  const freqOfCards = uniqueCards.reduce((acc, card) => {
    const freq = set.filter((setCard) => setCard === card).length;
    return { ...acc, [card]: freq };
  }, {});

  const uniqCardsExceptJOrderedByFreq = uniqCardsExceptJ.sort(
    (a, b) => freqOfCards[b] - freqOfCards[a]
  );

  const fiveOfAKind = () => {
    if (uniqCardsSet.has("J")) {
      return uniqCardsSet.size <= 2;
    }
    return uniqCardsSet.size === 1;
  };
  if (fiveOfAKind()) return 6000;

  const isFourOfAKind = () => {
    if (uniqCardsSet.has("J")) {
      return (
        freqOfCards[uniqCardsExceptJOrderedByFreq[0]] + freqOfCards["J"] === 4
      );
    }

    return (
      (uniqCardsSet.size === 2 && freqOfCards[uniqueCards[0]] === 4) ||
      freqOfCards[uniqueCards[1]] === 4
    );
  };

  if (isFourOfAKind()) return 5000;

  const isFullHouse = () => {
    if (uniqCardsSet.has("J")) {
      return uniqCardsExceptJ.length === 2;
    }
    return (
      (uniqCardsSet.size === 2 &&
        freqOfCards[uniqueCards[0]] === 3 &&
        freqOfCards[uniqueCards[1]] === 2) ||
      (freqOfCards[uniqueCards[0]] === 2 && freqOfCards[uniqueCards[1]] === 3)
    );
  };
  if (isFullHouse()) return 4000;

  const isThreeOfAKind = () => {
    if (uniqCardsSet.has("J")) {
      return (
        freqOfCards[uniqCardsExceptJOrderedByFreq[0]] + freqOfCards["J"] === 3
      );
    }

    return (
      uniqueCards.length === 3 &&
      (freqOfCards[uniqueCards[0]] === 3 ||
        freqOfCards[uniqueCards[1]] === 3 ||
        freqOfCards[uniqueCards[2]] === 3)
    );
  };

  if (isThreeOfAKind()) return 3000;

  const isTwoPair = () => {
    if (uniqCardsSet.has("J")) {
      return uniqCardsExceptJ.length < 4;
    }
    return (
      (uniqueCards.length === 3) &
        (freqOfCards[uniqueCards[0]] === 2 &&
          freqOfCards[uniqueCards[1]] === 2) ||
      (freqOfCards[uniqueCards[0]] === 2 &&
        freqOfCards[uniqueCards[2]] === 2) ||
      (freqOfCards[uniqueCards[1]] === 2 && freqOfCards[uniqueCards[2]] === 2)
    );
  };

  if (isTwoPair()) return 2000;

  const isOnePair = () => {
    if (uniqCardsSet.has("J")) {
      return (
        freqOfCards[uniqCardsExceptJOrderedByFreq[0]] + freqOfCards["J"] === 2
      );
    }

    return (
      (uniqueCards.length === 4) &
      Object.keys(freqOfCards).some((card) => freqOfCards[card] === 2)
    );
  };

  if (isOnePair()) return 1000;

  return 10;
};

const rankHands = (a, b) => {
  const handA = a.split("");
  const handB = b.split("");
  const handAScore = handTypeScore(handA);
  const handBScore = handTypeScore(handB);

  console.log(a, "->", handAScore);
  console.log(b, "->", handBScore);

  if (handAScore === handBScore) {
    console.log("Same Rank", a, b);
    for (let i = 0; i < handA.length; i++) {
      if (handA[i] !== handB[i]) {
        console.log(
          "setA",
          cards.indexOf(handA[i]),
          "setB",
          cards.indexOf(handB[i])
        );
        return cards.indexOf(handB[i]) - cards.indexOf(handA[i]);
      }
    }
  }

  return handAScore - handBScore;
};

const partOne = () => {
  const handWiseScore = {};
  inputs.forEach((input) => {
    const [h, s] = input.split(" ");
    handWiseScore[h] = Number(s);
  });

  const rankedHands = Object.keys(handWiseScore).sort(rankHands);
  console.log(JSON.stringify(rankedHands, null, 2));

  const sum = rankedHands.reduce((acc, hand, i) => {
    const score = handWiseScore[hand] * (i + 1);
    console.log(handWiseScore[hand], i + 1, score);
    return acc + score;
  }, 0);
  return sum;
};

const partTwo = () => {
  const handWiseScore = {};
  inputs.forEach((input) => {
    const [h, s] = input.split(" ");
    handWiseScore[h] = Number(s);
  });

  const rankedHands = Object.keys(handWiseScore).sort(rankHands);
  console.log(JSON.stringify(rankedHands, null, 2));

  const sum = rankedHands.reduce((acc, hand, i) => {
    const score = handWiseScore[hand] * (i + 1);
    console.log(handWiseScore[hand], i + 1, score);
    return acc + score;
  }, 0);
  return sum;
};

console.log("Res:", partTwo());

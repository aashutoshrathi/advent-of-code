const fs = require("fs");
const main = () => {
  const input = fs.readFileSync("./input.txt", "utf8").split("\n");

  const available = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const goodGames = [];
  const gameRequirements = {};

  for (const line of input) {
    const [game, config] = line.split(":").map((x) => x.trim());
    const gameId = Number(game.split(" ").at(1));
    gameRequirements[gameId] = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const subgames = config.split(";").map((x) => x.trim());

    for (const sg of subgames) {
      const colorConfig = sg.split(", ");
      for (const cc of colorConfig) {
        const [amount, color] = cc.split(" ");
        const numAmount = Number(amount);
        if (numAmount >= gameRequirements[gameId][color]) {
          gameRequirements[gameId][color] = numAmount;
        }
      }
    }

    if (gameRequirements[gameId].red > available.red) {
      continue;
    }
    if (gameRequirements[gameId].green > available.green) {
      continue;
    }
    if (gameRequirements[gameId].blue > available.blue) {
      continue;
    }
    goodGames.push(gameId);
  }

  const sumOfGoodGames = goodGames.reduce((acc, cur) => acc + cur, 0);
  console.log(goodGames);
  return sumOfGoodGames;
};

console.log(main());

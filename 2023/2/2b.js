const fs = require("fs");
const main = () => {
  const input = fs.readFileSync("./input.txt", "utf8").split("\n");

  const gamePowers = {};
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

    gamePowers[gameId] =
      gameRequirements[gameId].red *
      gameRequirements[gameId].green *
      gameRequirements[gameId].blue;
  }

  console.log(gamePowers);
  const sumOfGoodGames = Object.values(gamePowers).reduce(
    (acc, cur) => acc + cur,
    0
  );
  return sumOfGoodGames;
};

console.log(main());

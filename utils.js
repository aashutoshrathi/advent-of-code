const toCamelCase = (str) => {
  return str.split(" ").reduce((acc, word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return acc + word[0].toUpperCase() + word.slice(1).toLowerCase();
  }, "");
};

module.exports = { toCamelCase };

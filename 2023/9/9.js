const { getInputs } = require("../../lib/utils");

const inputs = getInputs(`${__dirname}/input.txt`, "\n");

const partOne = () => {
  const toSum = [];
  inputs.forEach((input) => {
    let nums = input.split(" ").map(Number);
    const lastNum = nums.at(-1);
    let d = 0;

    while (!nums.every((num) => num === 0)) {
      const arrayOfDiff = [];
      for (let i = 1; i < nums.length; i++) {
        arrayOfDiff.push(nums[i] - nums[i - 1]);
      }
      d += arrayOfDiff.at(-1);
      nums = arrayOfDiff;
    }
    toSum.push(lastNum + d);
  });
  console.log(toSum);
  return toSum.reduce((acc, cur) => acc + cur, 0);
};

const partTwo = () => {
  const toSum = [];

  inputs.forEach((input, idx) => {
    let nums = input.split(" ").map(Number);
    const firstNum = nums.at(0);
    const ds = [];

    while (!nums.every((num) => num === 0)) {
      const arrayOfDiff = [];
      for (let i = 1; i < nums.length; i++) {
        arrayOfDiff.push(nums[i] - nums[i - 1]);
      }
      ds.unshift(arrayOfDiff.at(0));
      nums = arrayOfDiff;
    }

    let finalDiff = ds[0];
    for (let i = 0; i < ds.length - 1; i++) {
      finalDiff = ds[i + 1] - finalDiff;
    }
    toSum.push(firstNum - finalDiff);
  });
  return toSum.reduce((acc, cur) => acc + cur, 0);
};

console.log("Res:", partTwo());

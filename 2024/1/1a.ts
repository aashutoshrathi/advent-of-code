import { readFileSync } from "node:fs";

const main = () => {
    const input = readFileSync("./input.txt", "utf8").split("\n");
    let result = 0;
    const listA: number[] = []
    const listB: number[] = []
    for (const line of input) {
        const [a, b] = line.split("   ").map((x) => parseInt(x, 10));
        listA.push(a);
        listB.push(b);
    }
    listA.sort((a, b) => a - b);
    listB.sort((a, b) => a - b);

    for (let i = 0; i < listA.length; i++) {
        result += Math.abs(listA[i] - listB[i]);
    }
    return result;
};

console.log(main());

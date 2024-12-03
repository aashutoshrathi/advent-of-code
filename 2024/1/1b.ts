// 23963899
const main = () => {
    const input = new TextDecoder().decode(Deno.readFileSync("./input.txt")).split("\n");
    let result = 0;
    const listA: number[] = []
    const freqInB: Record<number, number> = {}
    for (const line of input) {
        const [a, b] = line.split("   ").map((x) => parseInt(x, 10));
        listA.push(a);
        freqInB[b] = (freqInB[b] || 0) + 1;
    }

    for (let i = 0; i < listA.length; i++) {
        result += listA[i] * (freqInB[listA[i]] || 0);
    }
    return result;
};

console.log(main());

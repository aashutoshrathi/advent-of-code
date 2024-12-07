const INPUT_FILE = "./input.txt";

const main = () => {
    const rawInputs = Deno.readFileSync(INPUT_FILE);
    const inputs = new TextDecoder().decode(rawInputs).split("\n").join(""); // fuck the newlines were false

    let res = 0;
    const cleanInput = inputs.replace(/don't\(\)[\s\S]*?do\(\)/g, '');
    console.log(cleanInput)
    const muls = cleanInput.match(/mul\((\d+),(\d+)\)/g)
    if (muls) {
        for (let j = 0; j < muls.length; j++) {
            const [_, a, b] = muls[j].match(/mul\((\d+),(\d+)\)/) || [];
            res += Number(a) * Number(b);
            // console.log(`mul(${a},${b}) = ${Number(a) * Number(b)}`);
        }
    }

    return res;
};

console.log(main());

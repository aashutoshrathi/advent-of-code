// wow fuck js
const outFromA = (a: number) => {
    const interim = (a % 8) ^ 3;
    const c = Math.floor(a / Math.pow(2, interim));
    const postC = c ^ 6;
    console.log(postC)
    return (postC ^ (a % 8)) % 8;
    // return (a >> 3) % 8; // for example
}

console.log(outFromA(902325540 * 8 + 2))

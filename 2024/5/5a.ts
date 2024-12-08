const INPUT_FILE = "./input.txt";

const main = () => {
  const [pairsString, updatesString] = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const pairs = pairsString.split('\n').map((i) => i.split('|').map(Number))
  const updates = updatesString.split('\n').map((i) => i.split(',').map(Number))
  let res = 0;

  const graph: Record<number, Set<number>> = {};
  pairs.forEach(([a, b]) => {
    if (!graph[a]) {
      graph[a] = new Set();
    }
    if (!graph[b]) {
      graph[b] = new Set();
    }
    if (!graph[a].has(b)) {
      graph[a].add(b);
    }
  });

  for (const update of updates) {
    let isOk = true;
    const visited: Record<number, boolean> = {}
    for (let i = 0; i < update.length; i += 1) {
      for (const node of graph[update[i]]) {
        if (visited[node]) {
          isOk = false;
          break;
        }
      }
      visited[update[i]] = true;
    }

    if (isOk) {
      res += update[Math.floor(update.length / 2)];
    } else {
      // console.log(`Update ${update} is not valid`)
    }
  }

  return res;
};

console.log("Res ==>", main());

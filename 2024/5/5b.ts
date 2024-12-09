const INPUT_FILE = "./input.txt";

const main = () => {
  const [pairsString, updatesString] = Deno.readTextFileSync(INPUT_FILE).split("\n\n");
  const pairs = pairsString.split('\n').map((i) => i.split('|').map(Number))
  const updates = updatesString.split('\n').map((i) => i.split(',').map(Number))

  const edges: Record<number, Set<number>> = {};
  const inDegree: Record<number, number> = {};

  pairs.forEach(([a, b]) => {
    if (!edges[a]) {
      edges[a] = new Set();
    }

    if (!edges[b]) {
      edges[b] = new Set();
    }

    if (!edges[a].has(b)) {
      edges[a].add(b);
      inDegree[b] = (inDegree[b] || 0) + 1;
    }

    if (!inDegree[a]) {
      inDegree[a] = 0;
    }
  });

  const incorrectUpdates = [];

  for (const update of updates) {
    let isOk = true;
    const visited: Record<number, boolean> = {}
    for (let i = 0; i < update.length; i += 1) {
      for (const node of edges[update[i]]) {
        if (visited[node]) {
          isOk = false;
          break;
        }
      }
      visited[update[i]] = true;
    }

    if (!isOk) {
      incorrectUpdates.push(update)
    }
  }

  console.log(incorrectUpdates)

  const dfs = (node: number, visited: Record<number, boolean>, stack: number[]) => {
    visited[node] = true;
    for (const neighbor of edges[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor, visited, stack);
      }
    }
    stack.push(node);
  }

  let res = 0;
  // fix the incorrect updates using topological sorting
  for (const icU of incorrectUpdates) {
    const stack: number[] = [];
    const visited: Record<number, boolean> = {};
    for (let num of icU) {
      if (icU.includes(num)) {
        if (!visited[num]) {
          dfs(num, visited, stack);
        }
        visited[num] = true;
      }
    }
    const fixedUpdate: number[] = [];
    stack.forEach((node) => {
      if (icU.includes(node) && !fixedUpdate.includes(node)) {
        fixedUpdate.push(node);
      }
    })
    console.log(fixedUpdate.reverse())
    res += fixedUpdate[Math.floor(fixedUpdate.length / 2)]
  }

  return res;
};

console.log("Res ==>", main());

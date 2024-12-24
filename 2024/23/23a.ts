const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");

  const startsWithT = [];
  const adjList: Record<string, Set<string>> = {};

  for (const ip of ips) {
    const [a, b] = ip.split("-");

    if (a.startsWith("t")) {
      startsWithT.push(a);
    }

    if (b.startsWith("t")) {
      startsWithT.push(b);
    }

    if (!adjList[a]) {
      adjList[a] = new Set();
    }
    adjList[a].add(b);
    if (!adjList[b]) {
      adjList[b] = new Set();
    }
    adjList[b].add(a);
  }

  const connections = new Set();

  for (const start of startsWithT) {
    const neighbors = adjList[start];
    for (const neighbor of neighbors) {
      for (const neighbor2 of adjList[neighbor]) {
        if (adjList[start].has(neighbor2)) {
          connections.add([start, neighbor, neighbor2].sort().join("-"));
        }
      }
    }
  }

  return connections.size;
}

console.time("Time");
console.log(main());
console.timeEnd("Time");

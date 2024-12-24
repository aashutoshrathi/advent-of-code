INPUT_FILE = "main_input.txt"

def main():
    with open(INPUT_FILE) as f:
        initialVals, config = f.read().split("\n\n")
    iV = {}

    for line in initialVals.split("\n"):
        key, val = line.split(": ")
        iV[key] = int(val)

    zWires = set()
    pendingLines = config.split("\n")

    while len(pendingLines) > 0:
        localLines = []
        for line in pendingLines:
            inp, out = line.split(" -> ")
            a, op, b = inp.split(" ")
            if iV.get(a) == None or iV.get(b) == None:
                localLines.append(line)
                continue
            if op == "AND":
                iV[out] = iV[a] & iV[b]
            elif op == "OR":
                iV[out] = iV[a] | iV[b]
            elif op == "XOR":
                iV[out] = iV[a] ^ iV[b]

            if out.startswith("z"):
                zWires.add(out)
        pendingLines = localLines

    res = 0
    i = 0
    sortedZWires = sorted(zWires)
    for wire in sortedZWires:
        print(wire, iV[wire])
        res += iV[wire] << i
        i += 1
    return res

print(main())
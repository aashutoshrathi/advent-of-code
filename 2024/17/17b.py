# JS sucks
for line in open('main_input.txt'):
    if line.startswith('Program:'):
        instructions = list(map(int, line.split(': ')[1].split(',')))

def outFromA(a):
    interim = (a % 8) ^ 3
    c = a // (2 ** interim)
    postC = c ^ 6
    return (postC ^ (a % 8)) % 8

candidates = [0]
for i in range(len(instructions) - 1, -1, -1):
    newCandidates = []
    # print(f'Instruction: {instructions[i]}, candidates: {candidates}')
    for c in candidates:
        for j in range(8):
            num = (c << 3) + j
            out = outFromA(num)
            # print(f'Num: {num}, Out: {out}, Instruction: {instructions[i]}')
            if out == instructions[i]:
                newCandidates.append(num)
    candidates = newCandidates

# print(candidates)
print(min(candidates))
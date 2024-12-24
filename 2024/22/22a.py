INPUT_FILE = "main_input.txt"
MOD = 16777216

def get_next_secret(seed):
  a = ((seed << 6) ^ seed) % MOD
  b = ((a >> 5) ^ a) % MOD
  return ((b << 11) ^ b) % MOD

def main():
  with open(INPUT_FILE) as f:
      numbers = f.read().split("\n")
  
  res = 0

  for n in numbers:
    iter = 2_000
    seed = int(n)
    while iter > 0:
      seed = get_next_secret(seed)
      iter -= 1
      if seed == int(n):
        print("Cycle for", n, "is", 2_000 - iter)

    print("Seed for", n, "is", seed)
    res += seed

  return res

print(main())
import { createCanvas } from "https://deno.land/x/canvas/mod.ts";

const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";

const MAX_COL = 101;
const MAX_ROW = 103;

const moveRobot = (px: number, py: number, vx: number, vy: number, seconds: number) => {
  const fX = (px + vx * seconds) % MAX_ROW;
  const fY = (py + vy * seconds) % MAX_COL;
  return [fX >= 0 ? fX : MAX_ROW + fX, fY >= 0 ? fY : MAX_COL + fY];
}

const saveMatrixAsImage = (pts: number[][], name: string) => {
  const file = `${name.padStart(4, '0')}`
  const canvas = createCanvas(MAX_ROW + 1, MAX_COL + 101);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  for (let i = 0; i < pts.length; i++) {
    ctx.fillRect(pts[i][1], pts[i][0], 1, 1);
  }
  ctx.font = "10px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(file, 50, MAX_COL + 50, 50);

  const buf = canvas.toBuffer();
  Deno.writeFileSync(`${file}.png`, buf);
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  // console.log(ips)
  let timeElapsed = 0;
  while (timeElapsed < 10_000) {
    const unique = new Set();
    for (let i = 0; i < ips.length; i++) {
      const [py, px, vy, vx] = ips[i].match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)?.slice(1).map(Number) || [];
      const position = moveRobot(px, py, vx, vy, timeElapsed);
      unique.add(position.join(","));
    }

    saveMatrixAsImage(Array.from(unique).map((x) => (x as any).split(",").map(Number)), `${timeElapsed}`);
    // can make video using
    // ffmpeg -framerate 60 -i %04d.png -c:v libx264 -pix_fmt yuv420p output.mp4

    // when all points are at uniq locations
    if (unique.size === ips.length) {
      console.log(`Time Elapsed: ${timeElapsed}`);
      break;
    }
    timeElapsed += 1;
  }

  return timeElapsed
}

console.log(main());

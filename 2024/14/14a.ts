const INPUT_FILE = Deno.args[0] === "prod" ? "./main_input.txt" : "./input.txt";


const MAX_COL = 101;
const MAX_ROW = 103;
const SECONDS = 100;

const moveRobot = (px: number, py: number, vx: number, vy: number, seconds: number) => {
  const fX = (px + vx * seconds) % MAX_ROW;
  const fY = (py + vy * seconds) % MAX_COL;
  return [fX >= 0 ? fX : MAX_ROW + fX, fY >= 0 ? fY : MAX_COL + fY];
}

const findQuadrantOfRobot = (px: number, py: number) => {
  const MID_ROW = Math.floor(MAX_ROW / 2);
  const MID_COL = Math.floor(MAX_COL / 2);
  // console.log(`Mid Row: ${MID_ROW}, Mid Col: ${MID_COL}`);
  if (px === MID_ROW || py === MID_COL) {
    return 0;
  }
  if (px < MID_ROW && py < MID_COL) {
    return 1;
  }
  if (px < MID_ROW && py > MID_COL) {
    return 2;
  }
  if (px > MID_ROW && py < MID_COL) {
    return 3;
  }
  return 4;
}

const main = () => {
  const ips = Deno.readTextFileSync(INPUT_FILE).split("\n");
  // console.log(ips)
  const quadrantWise = [0, 0, 0, 0];
  for (let i = 0; i < ips.length; i++) {
    const [py, px, vy, vx] = ips[i].match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)?.slice(1).map(Number) || [];
    const sec = SECONDS;
    const position = moveRobot(px, py, vx, vy, sec);
    // console.log(`Robot at ${px}, ${py} will be at ${position} after ${sec} second`);
    const quad = findQuadrantOfRobot(position[0], position[1]);
    if (quad) {
      console.log(`Robot at ${px}, ${py} will be at ${position} after ${sec} second in quadrant ${quad}`);
      quadrantWise[quad - 1] += 1;
    } else {
      console.log(`Robot at ${px}, ${py} will be at ${position} after ${sec} second in quadrant ${quad}`);
    }
  }

  console.log(quadrantWise)


  return quadrantWise.reduce((acc, curr) => acc * curr, 1);
}

console.log(main());

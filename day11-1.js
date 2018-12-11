const computePower = (x, y, serial) => {
  const rackID = x + 10;
  let power = rackID;
  power *= y;
  power += serial;
  power *= rackID;
  power = Math.floor((power % 1000) / 100);
  power -= 5;

  return power;
};

const SIZE = 300;
const SERIAL = 5719;
const GRID = new Array(SIZE);
for (let i = 0; i < SIZE; i += 1) {
  GRID[i] = new Array(SIZE).fill(0, 0, SIZE);
}

for (let i = 0; i < SIZE; i += 1) {
  for (let j = 0; j < SIZE; j += 1) {
    GRID[i][j] = computePower(i, j, SERIAL);
  }
}

const computeSquare = (x, y, size) => {
  let sum = 0;
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      sum += GRID[x + i][y + j];
    }
  }
  return sum;
};

let maxX;
let maxY;
let maxS;
let max = 0;

for (let s = 0; s < SIZE; s += 1) {
  if (s % 10 === 0) {
    console.log(`${Math.floor((s / SIZE) * 100)}%`);
  }
  for (let i = 0; i < SIZE - s; i += 1) {
    for (let j = 0; j < SIZE - s; j += 1) {
      const sum = computeSquare(i, j, s);
      if (sum > max) {
        maxX = i;
        maxY = j;
        max = sum;
        maxS = s;
      }
    }
  }
}

console.log(`x: ${maxX} y: ${maxY} size: ${maxS} max: ${max}`);
// dump();
// console.log(computePower(122, 79, 57));
// console.log(computePower(217, 196, 39));
console.log(computePower(33, 45, SERIAL));

console.log(GRID[35][45]);

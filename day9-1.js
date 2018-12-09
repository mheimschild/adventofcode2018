const PLAYERS = 455;
const HIGHEST = 71223;

const MARBLES = [0];
let CURRENT = 0;

const next = (marbles, idx) => {
  let nextIdx = idx + 2;
  if (nextIdx > marbles.length) {
    nextIdx = 1;
  }
  return nextIdx;
};

const nextNeg = (marbles, idx) => {
  const nextIdx = idx - 7;
  if (nextIdx < 0) {
    return marbles.length + nextIdx;
  }
  return nextIdx;
};

const printMarbles = (marbles, idx) => console.log(marbles.map((m, i) => {
  if (i === idx) {
    return `(${m})`;
  }
  return `${m}`;
}).join(' '));

printMarbles(MARBLES, CURRENT);

const POINTS = {};
for (let i = 1; i <= HIGHEST; i += 1) {
  if (i % 100000 === 0) {
    console.log(`${i} ${HIGHEST} ${Math.floor((i / HIGHEST) * 100)}%`);
  }
  const PLAYER = ((i - 1) % PLAYERS) + 1;
  POINTS[PLAYER] = POINTS[PLAYER] || 0;
  if (i % 23 === 0) {
    const idx = nextNeg(MARBLES, CURRENT);
    CURRENT = idx;
    const removed = MARBLES.splice(idx, 1);
    POINTS[PLAYER] += (i + removed[0]);
  } else {
    const idx = next(MARBLES, CURRENT);
    CURRENT = idx;
    MARBLES.splice(idx, 0, i);
    // printMarbles(MARBLES, CURRENT);
    // POINTS[PLAYER] += i;
  }
}

let max = 1;
for (let i = 1; i <= PLAYERS; i += 1) {
  if (POINTS[i] > POINTS[max]) {
    max = i;
  }
}
console.log(max, POINTS[max]);

const INPUT = '#.#####.#.#.####.####.#.#...#.......##..##.#.#.#.###..#.....#.####..#.#######.#....####.#....##....#';
const RULES = {
  '##.##': '.',
  '#.#..': '.',
  '.....': '.',
  '##..#': '#',
  '###..': '#',
  '.##.#': '.',
  '..#..': '#',
  '##.#.': '#',
  '.##..': '.',
  '#..#.': '.',
  '###.#': '#',
  '.####': '#',
  '.#.##': '.',
  '#.##.': '#',
  '.###.': '#',
  '#####': '.',
  '..##.': '.',
  '#.#.#': '.',
  '...#.': '#',
  '..###': '.',
  '.#.#.': '#',
  '.#...': '#',
  '##...': '#',
  '.#..#': '#',
  '#.###': '#',
  '#..##': '#',
  '....#': '.',
  '####.': '.',
  '#...#': '#',
  '#....': '.',
  '...##': '.',
  '..#.#': '#',
};

const POTS = {};

const getFour = p => `${POTS[p - 2].c}${POTS[p - 1].c}${POTS[p].c}${POTS[p + 1].c}${POTS[p + 2].c}`;

for (let i = -3; i < INPUT.length + 3; i += 1) {
  POTS[i] = {
    c: INPUT[i] || '.',
    had: INPUT[i] === '#',
  };
}

const print = (iter, lastSum) => {
  const keys = Object.keys(POTS).map(k => Number.parseInt(k, 10));
  keys.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  // keys.forEach(k => process.stdout.write(POTS[k].c));
  const sum = Object.keys(POTS).map(k => Number.parseInt(k, 10)).filter(k => POTS[k].c === '#').reduce((a, i) => a + i, 0);
  // process.stdout.write(`${sum} ${iter} ${(sum - lastSum)}`);
  // process.stdout.write('\n');
  return sum;
};

const transform = input => RULES[input] || '.';

let min = -1;
let max = INPUT.length;
const SIZE = 2000;
let lastSum;

print();
for (let j = 0; j < SIZE; j += 1) {
  let minPod = max;
  for (let i = min; i <= max; i += 1) {
    const four = getFour(i);
    const output = transform(four);
    if (output === '#') {
      if (i < minPod) {
        minPod = i;
      }
      if (i <= min) {
        min -= 1;
        POTS[i - 3] = { c: '.' };
      }
      if (i >= max) {
        max += 1;
        POTS[i + 3] = { c: '.' };
      }
    }
    POTS[i].n = output;
    POTS[i].had = POTS[i].had || output === '#';
  }

  Object.keys(POTS).forEach((k) => {
    POTS[k].c = POTS[k].n || '.';
  });

  const s = print();
  console.log(`${Math.floor(j / SIZE * 100)}% ${j} minPod: ${minPod} ${s} ${s - lastSum}`);
  lastSum = s;
}

const sum2000 = print();

console.log(sum2000 + (50000000000 - 2000) * 57);

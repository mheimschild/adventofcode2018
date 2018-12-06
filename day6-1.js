const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day6.input'),
});

const manhattan = (x1, y1, x2, y2) => Math.abs(x2 - x1) + Math.abs(y2 - y1);
const POINT = /(\d+),\s+(\d+)/;
const POINTS = [];
let max = 0;

rl
  .on('line', (line) => {
    const [, x, y] = POINT.exec(line);
    const numX = Number.parseInt(x, 10);
    const numY = Number.parseInt(y, 10);
    if (numX > max) {
      max = numX;
    }
    if (numY > max) {
      max = numY;
    }
    POINTS.push([numX, numY]);
  })
  .on('close', () => {
    const GRID = new Array(max + 1);
    for (let i = 0; i <= max; i += 1) {
      GRID[i] = new Array(max + 1).fill(' ', 0, max + 1);
    }

    POINTS.forEach((p) => {
      GRID[p[0]][p[1]] = POINTS.indexOf(p);
    });

    for (let i = 0; i <= max; i += 1) {
      for (let j = 0; j <= max; j += 1) {
        const distances = POINTS.map(p => manhattan(i, j, p[0], p[1]));
        const min = Math.min(...distances);
        const f = distances.indexOf(min);
        const l = distances.lastIndexOf(min);
        if (f !== l) {
          GRID[i][j] = '.';
        } else {
          GRID[i][j] = f;
        }
      }
    }

    const INFINITE = {};
    for (let i = 0; i <= max; i += 1) {
      INFINITE[GRID[0][i]] = true;
      INFINITE[GRID[i][0]] = true;
      INFINITE[GRID[max][i]] = true;
      INFINITE[GRID[i][max]] = true;
    }
    delete INFINITE['.'];

    // console.log(GRID);
    const INFINITE_NUMS = Object.keys(INFINITE).map(i => Number.parseInt(i, 10));
    const FINITE = [];
    for (let i = 0; i < POINTS.length; i += 1) {
      if (INFINITE_NUMS.indexOf(i) === -1) {
        FINITE.push(i);
      }
    }
    const AREAS = new Array(FINITE.length).fill(0, 0, FINITE.length);
    for (let i = 0; i <= max; i += 1) {
      for (let j = 0; j <= max; j += 1) {
        for (let k = 0; k < FINITE.length; k += 1) {
          if (GRID[i][j] === FINITE[k]) {
            AREAS[k] += 1;
          }
        }
      }
    }
    console.log(Math.max(...AREAS));
  });

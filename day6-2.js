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

    let count = 0;
    for (let i = 0; i <= max; i += 1) {
      for (let j = 0; j <= max; j += 1) {
        const distances = POINTS
          .map(p => manhattan(i, j, p[0], p[1]))
          .reduce((a, item) => a + item, 0);
        if (distances < 10000) {
          GRID[i][j] = '#';
          count += 1;
        }
      }
    }

    // console.log(GRID);
    console.log(count);
  });

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day10.input'),
});

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise(resolve => process.stdin.once('data', (data) => {
    const byteArray = [...data];
    if (byteArray.length > 0 && byteArray[0] === 3) {
      process.exit(1);
    }
    process.stdin.setRawMode(false);
    resolve();
  }));
};

const RE = /position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d*)>/;
const readLine = (line) => {
  const [, x, y, vx, vy] = RE.exec(line);
  return [
    Number.parseInt(x, 10),
    Number.parseInt(y, 10),
    Number.parseInt(vx, 10),
    Number.parseInt(vy, 10),
  ];
};

const POINTS = [];
const tick = (point) => {
  point[0] += point[2];
  point[1] += point[3];
};
const SIZE = 100;
const render = (minX, minY) => {
  const CANVAS = new Array(SIZE);
  for (let i = 0; i < SIZE; i += 1) {
    CANVAS[i] = new Array(SIZE).fill(' ', 0, SIZE);
  }

  POINTS.forEach(([x, y]) => {
    const trX = x - minX;
    const trY = x - minY;
    console.log(x, trX, y, trY);
    CANVAS[y - minY][x - minX] = 'X';
  });

  CANVAS.forEach(row => console.log(row.join('|')));
};

rl
  .on('line', (line) => {
    POINTS.push(readLine(line));
  })
  .on('close', async () => {
    let minX;
    let minY;
    let maxX;
    let maxY;
    let count = 0;
    while (true) {
      POINTS.forEach((point) => {
        tick(point);
      });
      count += 1;

      minX = Math.min(...POINTS.map(([x]) => x));
      minY = Math.min(...POINTS.map(([, y]) => y));
      maxX = Math.max(...POINTS.map(([x]) => x));
      maxY = Math.max(...POINTS.map(([, y]) => y));
      if (maxX - minX < SIZE) {
        render(minX, minY);
        console.log(count, minX, minY, maxX, maxY);
        await keypress();
      }
    }
  });

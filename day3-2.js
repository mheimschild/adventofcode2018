const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day3.input'),
});

// #1 @ 661,227: 29x11
const getClaim = (input) => {
  const regex = /#(\d+)\s+@\s+(\d+),(\d+):\s+(\d+)x(\d+)/;
  return regex.exec(input);
};

let maxWidth = 0;
let maxHeight = 0;
const fabric = [];
const lines = [];

rl
  .on('line', (line) => {
    let [, id, offsetX, offsetY, width, height] = getClaim(line);
    id = Number.parseInt(id, 10);
    offsetX = Number.parseInt(offsetX, 10);
    offsetY = Number.parseInt(offsetY, 10);
    width = Number.parseInt(width, 10);
    height = Number.parseInt(height, 10);
    lines.push({
      id, offsetX, offsetY, width, height,
    });
    const newWidth = offsetX + width;
    const newHeight = offsetY + height;
    if (newWidth > maxWidth) {
      maxWidth = newWidth;
    }

    if (newHeight > maxHeight) {
      maxHeight = newHeight;
    }
  })
  .on('close', () => {
    // init fabric
    for (let i = 0; i < maxWidth; i += 1) {
      fabric[i] = [];
      for (let j = 0; j < maxHeight; j += 1) {
        fabric[i][j] = 0;
      }
    }
    console.log(`${maxWidth} ${maxHeight}`);

    lines.forEach((line) => {
      const {
        offsetX, offsetY, width, height,
      } = line;

      for (let i = offsetX; i < offsetX + width; i += 1) {
        for (let j = offsetY; j < offsetY + height; j += 1) {
          fabric[i][j] += 1;
        }
      }
    });

    let winner;

    lines.forEach((line) => {
      const {
        offsetX, offsetY, width, height,
      } = line;

      let isWinner = true;
      for (let i = offsetX; i < offsetX + width; i += 1) {
        for (let j = offsetY; j < offsetY + height; j += 1) {
          if (fabric[i][j] > 1) {
            isWinner = false;
            break;
          }
        }
        if (!isWinner) {
          break;
        }
      }

      if (isWinner) {
        winner = line;
      }
    });

    console.log(winner);
  });

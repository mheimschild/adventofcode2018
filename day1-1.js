const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day1.input'),
});

let stack = 0;

rl
  .on('line', (line) => {
    stack += parseInt(line, 10);
  })
  .on('close', () => console.log(stack));

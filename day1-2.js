const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day1.input'),
});

let stack = 0;
let found = false;
const results = [0];
const changes = [];

rl
  .on('line', line => changes.push(Number.parseInt(line, 10)))
  .on('close', () => {
    while (!found) {
      for (let i = 0; i < changes.length; i += 1) {
        stack += changes[i];
        if (results.includes(stack)) {
          console.log(stack);
          found = true;
          break;
        }
        results.push(stack);
      }
    }
  });

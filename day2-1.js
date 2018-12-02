const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day2.input'),
});

const makeMap = word => Array.from(word).reduce((a, i) => {
  const val = a[i] || 0;
  return {
    ...a,
    [i]: val + 1,
  };
}, {});

let two = 0;
let three = 0;

rl
  .on('line', (line) => {
    const charMap = makeMap(line);
    const values = Object.values(charMap);

    console.log(values);

    if (values.indexOf(2) > -1) {
      two += 1;
    }

    if (values.indexOf(3) > -1) {
      three += 1;
    }
  })
  .on('close', () => console.log(`two: ${two} three: ${three} result: ${two * three}`));

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day5.input'),
});

const findAndDestroyFirstPair = (line) => {
  let newLine = '';
  for (let i = 0; i < (line.length - 1); i += 1) {
    const f = line[i];
    const s = line[i + 1];
    if (f !== s && f.toUpperCase() === s.toUpperCase()) {
      // console.log(`${f}${s}`);
      return newLine + line.substr(i + 2);
    }
    newLine += line[i];
  }

  return null;
};

rl
  .on('line', (line) => {
    for (let i = 65; i <= 90; i += 1) {
      let myLine = line;
      let lastNotZeroLength = 0;
      const capital = String.fromCharCode(i);
      const nonCapital = String.fromCharCode(i + 32);
      myLine = myLine
        .replace(new RegExp(capital, 'g'), '')
        .replace(new RegExp(nonCapital, 'g'), '');
      do {
        myLine = findAndDestroyFirstPair(myLine);
        if (myLine) {
          lastNotZeroLength = myLine.length;
        }
      } while (myLine);

      console.log(`${capital}${nonCapital} ${lastNotZeroLength}`);
    }
  })
  .on('close', () => {});

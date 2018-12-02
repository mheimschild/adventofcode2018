const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day2.input'),
});

const distance = (w1, w2) => {
  const a1 = Array.from(w1);
  const a2 = Array.from(w2);

  let d = 0;
  for (let i = 0; i < a1.length; i += 1) {
    if (a1[i] !== a2[i]) {
      d += 1;
    }
  }

  return d;
};

const words = [];

rl
  .on('line', (line) => {
    words.push(line);
  })
  .on('close', () => {
    for (let i = 0; i < words.length; i += 1) {
      for (let j = 0; j < words.length; j += 1) {
        const word1 = words[i];
        const word2 = words[j];
        const d = distance(word1, word2);
        if (d === 1) {
          console.log(`distance 1 was ${word1} and ${word2}`);
        }
      }
    }
  });

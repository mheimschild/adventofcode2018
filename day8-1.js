const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day8.input'),
});

const read = (stream) => {
  if (stream.length === 0) {
    return 0;
  }

  const subnodes = stream.pop();
  const metadates = stream.pop();

  let sum = 0;
  for (let i = 0; i < subnodes; i += 1) {
    sum += read(stream);
  }

  for (let i = 0; i < metadates; i += 1) {
    const metadata = stream.pop();
    sum += metadata;
  }
  return sum;
};

rl
  .on('line', (line) => {
    const stream = line.split(' ').reverse().map(s => Number.parseInt(s, 10));
    console.log(read(stream, 0));
  })
  .on('close', () => {});

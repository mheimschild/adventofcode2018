const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day4.input'),
});

const lineRe = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (.+)$/;
const eventBeginRe = /Guard #(\d+).+/;
const lines = [];
const stack = {};
let currentAgent;
let currentMin = 0;

rl
  .on('line', (line) => {
    lines.push(line);
  })
  .on('close', () => {
    lines.sort();
    lines
      .map(line => lineRe.exec(line))
      .map(([, year, month, day, hour, min, event]) => [Number.parseInt(year, 10), Number.parseInt(month, 10), Number.parseInt(day, 10), Number.parseInt(hour, 10), Number.parseInt(min, 10), event])
      .forEach(([, , , , min, event]) => {
        const parsedEvent = eventBeginRe.exec(event);
        if (parsedEvent) {
          const [, id] = parsedEvent;
          stack[id] = stack[id] || new Array(60).fill(0, 0, 60);
          currentAgent = id;
        } else if (event.indexOf('falls asleep') > -1) {
          currentMin = min;
        } else if (event.indexOf('wakes up') > -1) {
          for (let i = currentMin; i < min; i += 1) {
            stack[currentAgent][i] += 1;
          }
        }
      });

    Object.entries(stack)
      .map(([key, value]) => {
        const max = Math.max(...value);
        const idx = value.indexOf(max);
        const sum = value.reduce((a, i) => a + i, 0);
        return [key, sum, idx, max];
      }).forEach(([key, sum, idx, max]) => console.log(`key ${key} sum ${sum} idx ${idx} max: ${max}`));
  });

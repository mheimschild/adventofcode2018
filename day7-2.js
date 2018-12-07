const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day7.input'),
});

const STEP_RE = /Step (\w+) must be finished before step (\w+) can begin./;
const STEPS = {};
const getFirstEmpty = () => {
  const sortedSteps = Object.keys(STEPS);
  sortedSteps.sort();
  for (let i = 0; i < sortedSteps.length; i += 1) {
    if (STEPS[sortedSteps[i]].length === 0) {
      return sortedSteps[i];
    }
  }
  return null;
};
const removeStepFromAll = (step) => {
  Object.values(STEPS).forEach((dependencies) => {
    const idx = dependencies.indexOf(step);
    if (idx > -1) {
      dependencies.splice(idx, 1);
    }
  });
};

class Worker {
  constructor(id) {
    this.id = id;
  }

  tick() {
    if (this.work === 0) {
      removeStepFromAll(this.step);
      delete this.work;
    }

    if (!this.work) {
      this.step = getFirstEmpty();
      if (this.step) {
        this.work = this.step.charCodeAt(0) - 64 + 60;
        delete STEPS[this.step];
      } else {
        console.log(this.id, this.step);
        return false;
      }
    }

    console.log(this.id, this.step);

    this.work -= 1;

    return true;
  }

  dump() {
    return this.work ? this.step : '.';
  }
}

rl
  .on('line', (line) => {
    const [, dependency, step] = STEP_RE.exec(line);
    STEPS[step] = STEPS[step] || [];
    STEPS[dependency] = STEPS[dependency] || [];
    STEPS[step].push(dependency);
  })
  .on('close', () => {
    const WC = 5;
    const WORKERS = [];
    for (let i = 0; i < WC; i += 1) {
      WORKERS.push(new Worker(i));
    }
    let iterations = 0;
    let working = true;

    debugger;
    while (working) {
      working = false;
      for (let i = 0; i < WC; i += 1) {
        working = WORKERS[i].tick() || working;
      }

      if (working) {
        iterations += 1;
      }
    }

    console.log(iterations);
  });

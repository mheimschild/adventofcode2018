const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day7.input'),
});

const STEP_RE = /Step (\w+) must be finished before step (\w+) can begin./;
const STEPS = {};
const getFirstEmpty = (sortedSteps) => {
  for (let i = 0; i < sortedSteps.length; i += 1) {
    if (STEPS[sortedSteps[i]].length === 0) {
      return sortedSteps[i];
    }
  }
};
const removeStepFromAll = (step) => {
  Object.values(STEPS).forEach((dependencies) => {
    const idx = dependencies.indexOf(step);
    if (idx > -1) {
      dependencies.splice(idx, 1);
    }
  });
};

rl
  .on('line', (line) => {
    const [, dependency, step] = STEP_RE.exec(line);
    STEPS[step] = STEPS[step] || [];
    STEPS[dependency] = STEPS[dependency] || [];
    STEPS[step].push(dependency);
  })
  .on('close', () => {
    let sortedSteps = Object.keys(STEPS);
    sortedSteps.sort();

    const RESULT = [];

    while (sortedSteps.length > 0) {
      const firstStep = getFirstEmpty(sortedSteps);
      removeStepFromAll(firstStep);
      delete STEPS[firstStep];
      RESULT.push(firstStep);

      sortedSteps = Object.keys(STEPS);
      sortedSteps.sort();
    }

    console.log(RESULT.join(''));
  });

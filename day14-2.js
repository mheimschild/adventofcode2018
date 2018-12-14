const RECIPES = [3, 7];
const Es = [0, 1];
const PATTERN = '047801';
const computeNew = () => RECIPES[Es[0]] + RECIPES[Es[1]];
const createNewNodes = (val) => {
  const values = `${val}`.split('');
  for (let i = 0; i < values.length; i += 1) {
    RECIPES.push(Number.parseInt(values[i], 10));
    const last = RECIPES.length - 1;
    const TEST = `${RECIPES[last - 5]}${RECIPES[last - 4]}${RECIPES[last - 3]}${RECIPES[last - 2]}${RECIPES[last - 1]}${RECIPES[last]}`;
    if (TEST === PATTERN) {
      console.log(RECIPES.length - 6);
      process.exit(0);
    }
  }

  const Es0Value = RECIPES[Es[0]];
  Es[0] = (Es[0] + 1 + Es0Value) % RECIPES.length;

  const Es1Value = RECIPES[Es[1]];
  Es[1] = (Es[1] + 1 + Es1Value) % RECIPES.length;
};

for (let i = 0; i < Number.MAX_VALUE; i += 1) {
  createNewNodes(computeNew());
}

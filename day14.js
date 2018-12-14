class Node {
  constructor(value, prev, next) {
    this.next = this;
    this.last = this;
    this.value = value;
  }
}

const R1 = new Node(3);
const R2 = new Node(7);
const FIRST = R1;
let LAST = R2;
let LENGTH = 2;

R1.next = R2;
R1.prev = R2;
R2.next = R1;
R2.prev = R1;

const Es = [R1, R2];

const computeNew = () => Es[0].value + Es[1].value;
const createNewNodes = (val) => {
  const values = `${val}`.split('');
  for (let i = 0; i < values.length; i += 1) {
    const newNode = new Node(Number.parseInt(values[i], 10));
    newNode.prev = LAST;
    LAST.next = newNode;
    LAST = newNode;
    LENGTH += 1;
  }
  LAST.next = FIRST;
  FIRST.prev = LAST;

  const Es0Value = Es[0].value;
  for (let i = 0; i < Es0Value + 1; i += 1) {
    Es[0] = Es[0].next;
  }

  const Es1Value = Es[1].value;
  for (let i = 0; i < Es1Value + 1; i += 1) {
    Es[1] = Es[1].next;
  }
};

const printRecipt = (node) => {
  if (Es[0] === node) {
    return process.stdout.write(`(${node.value}) `);
  }

  if (Es[1] === node) {
    return process.stdout.write(`[${node.value}] `);
  }

  return process.stdout.write(` ${node.value}  `);
};
const print = (first) => {
  let node = first || FIRST;
  printRecipt(node);
  do {
    node = node.next;
    printRecipt(node);
  } while (node !== LAST);
  process.stdout.write('\n');
};

print();
const STEPS = 47801;
while (LENGTH < STEPS + 10) {
  createNewNodes(computeNew());
  // print();
}

let node = FIRST;
for (let i = 0; i < STEPS; i += 1) {
  node = node.next;
}

print(node);

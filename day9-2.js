const PLAYERS = 455;
const HIGHEST = 71223 * 100;

class Node {
  constructor(value) {
    this.value = value;
    this.prev = this;
    this.next = this;
  }
}

const MARBLES = new Node(0);
let CURRENT = MARBLES;

const printMarbles = (first) => {
  let node = first;
  do {
    if (node === CURRENT) {
      process.stdout.write(`(${node.value}) `);
    } else {
      process.stdout.write(`${node.value} `);
    }
    node = node.next;
  } while (node !== first);
  process.stdout.write('\n');
};

printMarbles(MARBLES);

const insert = (value) => {
  CURRENT = CURRENT.next;
  const newNode = new Node(value);
  CURRENT.next.prev = newNode;
  newNode.next = CURRENT.next;
  CURRENT.next = newNode;
  newNode.prev = CURRENT;

  CURRENT = newNode;
};

const insertNeg = () => {
  CURRENT = CURRENT.prev;
  CURRENT = CURRENT.prev;
  CURRENT = CURRENT.prev;
  CURRENT = CURRENT.prev;
  CURRENT = CURRENT.prev;
  CURRENT = CURRENT.prev;

  const ret = CURRENT.prev;
  CURRENT.prev.prev.next = CURRENT;
  CURRENT.prev = CURRENT.prev.prev;
  return ret;
};

const POINTS = {};
debugger;
for (let i = 1; i <= HIGHEST; i += 1) {
  if (i % 100000 === 0) {
    console.log(`${i} ${HIGHEST} ${Math.floor((i / HIGHEST) * 100)}%`);
  }
  const PLAYER = ((i - 1) % PLAYERS) + 1;
  POINTS[PLAYER] = POINTS[PLAYER] || 0;
  if (i % 23 === 0) {
    const removed = insertNeg();
    POINTS[PLAYER] += (i + removed.value);
  } else {
    insert(i);
  }
  // printMarbles(MARBLES);
}

let max = 1;
for (let i = 1; i <= PLAYERS; i += 1) {
  if (POINTS[i] > POINTS[max]) {
    max = i;
  }
}
console.log(max, POINTS[max]);
